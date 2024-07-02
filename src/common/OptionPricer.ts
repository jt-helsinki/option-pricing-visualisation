/**
 * Calculates the price of an option (call/put) along with the greeks for a given set of variables.
 *
 */
export class OptionPricer {

    private s: number;

    private k: number;

    private t: number;

    private v: number;

    private r: number;

    private readonly DAYS_IN_YEAR = 365.

    /*
     * @param underlyingPrice Current price of the underlying
     * @param strike Strike price
     * @param expiryDays Time to experiation in days
     * @param volatility Volatility as a decimal
     * @param riskFreeRate Anual risk-free interest rate as a decimal
     */
    constructor(underlyingPrice: number, strike: number, expiryDays: number, volatility: number, riskFreeRate: number) {
        this.s = underlyingPrice;
        this.k = strike;
        this.v = volatility;
        this.t = expiryDays / this.DAYS_IN_YEAR;
        this.r = riskFreeRate;
    }

    /**
     * Calculates the delta of an option.
     *
     * @param callPut The type of option - 'call' or 'put'
     * @return The delta of the option
     */
    public delta(callPut: 'call' | 'put'): number {
        return OptionPricer.delta(callPut, this.s, this.k, this.t, this.v, this.r);
    }

    public get deltaCall(): number {
        return this.delta('call');
    }

    public get deltaPut(): number {
        return this.delta('put');
    }

    /**
     * Calculates the delta of an option.
     *
     * @param callPut The type of option - 'call' or 'put'
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @return The delta of the option
     */
    public static delta(callPut: 'call' | 'put', s: number, k: number, t: number, v: number, r: number): number {
        if (callPut === 'call') {
            return OptionPricer.callDelta(s, k, t, v, r);
        }
        return OptionPricer.putDelta(s, k, t, v, r);
    }

    /**
     * Calculates the rho of an option.
     *
     * @param callPut The type of option - 'call' or 'put'
     * @param [scale=100] The value to scale rho by (100=100BPS=1%, 10000=1BPS=.01%)
     * @return The rho of the option
     */
    public rho(callPut: 'call' | 'put', scale: number = 100): number {
        return OptionPricer.rho(callPut, scale, this.s, this.k, this.t, this.v, this.r);
    }

    public get rhoCall(): number {
        return this.rho('call');
    }

    public get rhoPut(): number {
        return this.rho('put');
    }

    /**
     * Calculates the rho of an option.
     *
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @param callPut The type of option - 'call' or 'put'
     * @param [scale=100] The value to scale rho by (100=100BPS=1%, 10000=1BPS=.01%)
     * @return The rho of the option
     */
    public static rho(callPut: 'call' | 'put', scale: number = 100, s: number, k: number, t: number, v: number, r: number): number {
        if (callPut === 'call') {
            return OptionPricer.callRho(s, k, t, v, r) / scale;
        }
        return OptionPricer.putRho(s, k, t, v, r) / scale;
    }

    /**
     * Calculates the vega of a call and put option.
     *
     * @return The vega of the option
     */
    public vega(): number {
        return OptionPricer.vega(this.s, this.k, this.t, this.v, this.r);
    }

    public get vegaCall(): number {
        return this.vega();
    }

    public get vegaPut(): number {
        return this.vega();
    }

    /**
     * Calculates the vega of a call and put option.
     *
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @return The vega of the option
     */
    public static vega(s: number, k: number, t: number, v: number, r: number): number {
        let omega = OptionPricer.omega(s, k, t, v, r);
        return (isFinite(omega)) ? (s * Math.sqrt(t) * OptionPricer.standardNormalProbabilityDensityFunction(omega) / 100) : 0;
    }

    /**
     * Calculates the theta of an option.
     *
     * @param callPut The type of option - 'call' or 'put'
     * @param [scale=252] The number of days to scale theta by - usually 365 or 252
     * @return The theta of the option
     */
    public theta(callPut: 'call' | 'put', scale: number = 252): number {
        return OptionPricer.theta(callPut, scale, this.s, this.k, this.t, this.v, this.r);
    }

    public get thetaCall(): number {
        return this.theta('call');
    }

    public get thetaPut(): number {
        return this.theta('put');
    }

    /**
     * Calculates the theta of an option.
     *
     * @param callPut The type of option - 'call' or 'put'
     * @param scale The number of days to scale theta by - usually 365 or 252
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @return The theta of the option
     */
    public static theta(callPut: 'call' | 'put', scale: number, s: number, k: number, t: number, v: number, r: number): number {
        if (callPut === 'call') {
            return OptionPricer.callTheta(s, k, t, v, r) / scale;
        }
        return OptionPricer.putTheta(s, k, t, v, r) / scale;
    }

    /**
     * Calculates the gamma of a call and put option.
     *
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @return The gamma of the option
     */
    public gamma(s: number = this.s, k: number = this.k, t: number = this.t, v: number = this.v, r: number = this.r): number {
        return OptionPricer.gamma(s, k, t, v, r);
    }

    public get gammCall(): number {
        return this.gamma();
    }

    public get gammaPut(): number {
        return this.gamma();
    }

    /**
     * Calculates the gamma of a call and put option.
     *
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @return The gamma of the option
     */
    public static gamma(s: number, k: number, t: number, v: number, r: number): number {
        let w = this.omega(s, k, t, v, r);
        return (isFinite(w)) ? (OptionPricer.standardNormalProbabilityDensityFunction(w) / (s * v * Math.sqrt(t))) : 0;
    }

    /**
     * Calcuate omega as defined in the Black-Scholes formula.
     * @return The value of omega
     */
    public omega(): number {
        return OptionPricer.omega(this.s, this.k, this.t, this.v, this.r);
    }

    public get omegaCall(): number {
        return this.omega();
    }

    public get omegaPut(): number {
        return this.omega();
    }

    /**
     * Calcuate omega as defined in the Black-Scholes formula.
     *
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @return The value of omega
     */
    public static omega(s: number, k: number, t: number, v: number, r: number): number {
        return (r * t + Math.pow(v, 2) * t / 2 - Math.log(k / s)) / (v * Math.sqrt(t));
    }

    /**
     * Black-Scholes option pricing formula.
     * See {@link http://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model#Black-Scholes_formula|Wikipedia page}
     * for pricing puts in addition to calls.
     *
     * @param   callPut The type of option to be priced - 'call' or 'put'
     * @return         Price of the option
     */
    public blackScholes(callPut: 'call' | 'put'): number {
        return OptionPricer.blackScholes(callPut, this.s, this.k, this.t, this.v, this.r);
    }

    public get blackScholesCall(): number {
        return this.blackScholes('call');
    }

    public get blackScholesPut(): number {
        return this.blackScholes('put');
    }

    /**
     * Black-Scholes option pricing formula.
     * See {@link http://en.wikipedia.org/wiki/Black%E2%80%93Scholes_model#Black-Scholes_formula|Wikipedia page}
     * for pricing puts in addition to calls.
     *
     * @param s       Current price of the underlying
     * @param k       Strike price
     * @param t       Time to experiation in years
     * @param v       Volatility as a decimal
     * @param r       Anual risk-free interest rate as a decimal
     * @param   callPut The type of option to be priced - 'call' or 'put'
     * @return         Price of the option
     */
    public static blackScholes(callPut: 'call' | 'put', s: number, k: number, t: number, v: number, r: number): number {
        let w = (r * t + Math.pow(v, 2) * t / 2 - Math.log(k / s)) / (v * Math.sqrt(t));
        if (callPut === 'call') {
            return s * OptionPricer.standardNormalCumulativeDistributionFunction(w) - k * Math.pow(Math.E, -1 * r * t) *
                OptionPricer.standardNormalCumulativeDistributionFunction(w - v * Math.sqrt(t));
        }
        return k * Math.pow(Math.E, -1 * r * t) * OptionPricer.standardNormalCumulativeDistributionFunction(v * Math.sqrt(t) - w) -
            s * OptionPricer.standardNormalCumulativeDistributionFunction(-w);
    }

    /**
     * Calculate a close estimate of implied volatility given an option price.  A
     * binary search type approach is used to determine the implied volatility.
     *
     * @param callPut The type of option priced - 'call' or 'put'
     * @param currentMarketPriceOption The market price of the option
     * @param [estimate=.1] An initial estimate of implied volatility
     * @returns The implied volatility estimate
     */
    public impliedVolatility(callPut: 'call' | 'put', currentMarketPriceOption: number, estimate: number = 0.01): number {
        return OptionPricer.impliedVolatility(callPut, currentMarketPriceOption, estimate, this.s, this.k, this.t, this.v, this.r);
    }

    /**
     * Calculate a close estimate of implied volatility given an option price.  A
     * binary search type approach is used to determine the implied volatility.
     *
     * @param callPut The type of option priced - 'call' or 'put'
     * @param currentMarketPriceOption The market price of the option
     * @param [estimate=.1] An initial estimate of implied volatility
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param r Anual risk-free interest rate as a decimal
     * @returns The implied volatility estimate
     */
    public static impliedVolatility(callPut: 'call' | 'put', currentMarketPriceOption: number, estimate: number, s: number, k: number,
                                    t: number, v: number, r: number): number {
        let low = 0;
        let high = Infinity;
        // perform 100 iterations max
        for (let i = 0; i < 100; i++) {
            let actualCost = this.blackScholes(callPut, s, k, t, estimate, r);
            // compare the price down to the cent
            if (currentMarketPriceOption * 100 === Math.floor(actualCost * 100)) {
                break;
            } else if (actualCost > currentMarketPriceOption) {
                high = estimate;
                estimate = (estimate - low) / 2 + low;
            } else {
                low = estimate;
                estimate = (high - estimate) / 2 + estimate;
                if (!isFinite(estimate)) {
                    estimate = low * 2;
                }
            }
        }
        return estimate;
    }

    /**
     * Calculates the delta of a call option.
     *
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @return The delta of the call option
     */
    private static callDelta(s: number, k: number, t: number, v: number, r: number): number {
        let w = OptionPricer.omega(s, k, t, v, r);
        if (!isFinite(w)) {
            return (s > k) ? 1 : 0;
        }
        return this.standardNormalCumulativeDistributionFunction(w);
    }

    /**
     * Calculates the delta of a put option.
     *
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @return The delta of the put option
     */
    private static putDelta(s: number, k: number, t: number, v: number, r: number): number {
        let delta = this.callDelta(s, k, t, v, r) - 1;
        return (delta === -1 && k === s) ? 0 : delta;
    }

    /**
     * Calculates the rho of a call option.
     *
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @return The rho of the call option
     */
    private static callRho(s: number, k: number, t: number, v: number, r: number): number {
        let w = OptionPricer.omega(s, k, t, v, r);
        if (!isNaN(w)) {
            return k * t * Math.pow(Math.E, -1 * r * t) * this.standardNormalCumulativeDistributionFunction(w - v * Math.sqrt(t));
        }
        return 0;
    }

    /**
     * Calculates the rho of a put option.
     *
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @return The rho of the put option
     */
    private static putRho(s: number, k: number, t: number, v: number, r: number): number {
        let w = OptionPricer.omega(s, k, t, v, r);
        if (!isNaN(w)) {
            let rho = -1 * k * t * Math.pow(Math.E, -1 * r * t) * this.standardNormalCumulativeDistributionFunction(v * Math.sqrt(t) - w);
            if (rho === -0) {
                return 0;
            }
            return rho;
        }
        return 0;
    }

    /**
     * Calculates the theta of a call option.
     *
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @return The theta of the call option
     */
    private static callTheta(s: number, k: number, t: number, v: number, r: number): number {
        let w = OptionPricer.omega(s, k, t, v, r);
        if (isFinite(w)) {
            return -1 * v * s * this.standardNormalProbabilityDensityFunction(w) / (2 * Math.sqrt(t)) - k * r * Math.pow(Math.E, -1 * r * t) *
                this.standardNormalCumulativeDistributionFunction(w - v * Math.sqrt(t));
        }
        return 0;
    }

    /**
     * Calculates the theta of a put option.
     *
     * @param s Current price of the underlying
     * @param k Strike price
     * @param t Time to experiation in years
     * @param v Volatility as a decimal
     * @param r Anual risk-free interest rate as a decimal
     * @return The theta of the put option
     */
    private static putTheta(s: number, k: number, t: number, v: number, r: number): number {
        let w = OptionPricer.omega(s, k, t, v, r);
        if (isFinite(w)) {
            return -1 * v * s * this.standardNormalProbabilityDensityFunction(w) / (2 * Math.sqrt(t)) + k * r * Math.pow(Math.E, -1 * r * t) *
                this.standardNormalCumulativeDistributionFunction(v * Math.sqrt(t) - w);
        }
        return 0;
    }

    /**
     * Standard normal cumulative distribution function.  The probability is estimated
     * by expanding the CDF into a series using the first 100 terms.
     * See {@link http://en.wikipedia.org/wiki/Normal_distribution#Cumulative_distribution_function|Wikipedia page}.
     *
     * @param x The upper bound to integrate over.  This is P{Z <= x} where Z is a standard normal random variable.
     * @return The probability that a standard normal random variable will be less than or equal to x
     */
    private static standardNormalCumulativeDistributionFunction(x: number): number {
        let probability = 0;
        // avoid divergence in the series which happens around +/-8 when summing the
        // first 100 terms
        if (x >= 8) {
            probability = 1;
        } else if (x <= -8) {
            probability = 0;
        } else {
            for (let i = 0; i < 100; i++) {
                probability += (Math.pow(x, 2 * i + 1) / this.doubleFactorial(2 * i + 1));
            }
            probability *= Math.pow(Math.E, -0.5 * Math.pow(x, 2));
            probability /= Math.sqrt(2 * Math.PI);
            probability += 0.5;
        }
        return probability;
    }

    /**
     * Standard normal density.
     *
     * @param x The value to calculate the standard normal density of
     * @return The value of the standard normal density public at x
     */
    private static standardNormalProbabilityDensityFunction(x: number) {
        return Math.pow(Math.E, -1 * Math.pow(x, 2) / 2) / Math.sqrt(2 * Math.PI);
    }

    /**
     * Double factorial.  See {@link http://en.wikipedia.org/wiki/Double_factorial|Wikipedia page}.
     *
     * @param n The number to calculate the double factorial of
     * @return The double factorial of n
     */
    private static doubleFactorial(n: number): number {
        let val = 1;
        for (let i = n; i > 1; i -= 2) {
            val *= i;
        }
        return val;
    }

}