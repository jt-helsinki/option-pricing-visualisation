import { beforeEach, describe, expect, test } from 'vitest';
import { OptionPricer } from '../../src/common/OptionPricer';

let optionPricer: OptionPricer;
describe('Tests the outputs returned from the OptionPricer.', () => {

    beforeEach(() => {
        // 360 day year -> 0.086 ~ 1 month ~ 30 days.
        optionPricer = new OptionPricer(99.3, 105, 0.086, 0.14, 0.015);
    });

    test('if delta() should return values based on globally created object.', () => {
        expect(optionPricer.delta('call')).toEqual(0);
        expect(optionPricer.delta('put')).toEqual(-1);
    });

    test('if delta() returns ~50', () => {
        expect(OptionPricer.delta('call', 100, 100, 0.086, 0.14, 0.012)).toEqual(0.5182111275382658);
        expect(OptionPricer.delta('put', 100, 100, 0.086, 0.14, 0.012)).toEqual(-0.4817888724617342);
    });

    test('if delta() returns 0', () => {
        expect(OptionPricer.delta('call', 100, 100, 0, 0.1, 0.012)).toEqual(0);
        expect(OptionPricer.delta('call', 99.99, 100, 0, 0.1, 0.012)).toEqual(0);
        expect(OptionPricer.delta('put', 100, 100, 0, 0.1, 0.012)).toEqual(0);
        expect(OptionPricer.delta('put', 100.01, 100, 0, 0.1, 0.012)).toEqual(0);
        expect(OptionPricer.delta('call', 100, 100, 0.1, 0, 0.012)).toEqual(0);
        expect(OptionPricer.delta('call', 99.99, 100, 0.1, 0, 0.012)).toEqual(0);
        expect(OptionPricer.delta('put', 100, 100, 0.1, 0, 0.012)).toEqual(0);
        expect(OptionPricer.delta('put', 100.01, 100, 0.1, 0, 0.012)).toEqual(0);
        expect(OptionPricer.delta('call', 100, 100, 0, 0, 0.012)).toEqual(0);
        expect(OptionPricer.delta('call', 99.99, 100, 0, 0, 0.012)).toEqual(0);
        expect(OptionPricer.delta('put', 100, 100, 0, 0, 0.012)).toEqual(0);
        expect(OptionPricer.delta('put', 100.01, 100, 0, 0, 0.012)).toEqual(0);
    });

    test('if delta() returns 1 for calls, -1 for puts', () => {
        expect(OptionPricer.delta('call', 100.01, 100, 0, 0.1, 0.012)).toEqual(1);
        expect(OptionPricer.delta('put', 99.99, 100, 0, 0.1, 0.012)).toEqual(-1);
        expect(OptionPricer.delta('call', 100.01, 100, 0.1, 0, 0.012)).toEqual(1);
        expect(OptionPricer.delta('put', 99.99, 100, 0.1, 0, 0.012)).toEqual(-1);
        expect(OptionPricer.delta('call', 100.01, 100, 0, 0, 0.012)).toEqual(1);
        expect(OptionPricer.delta('put', 99.99, 100, 0, 0, 0.012)).toEqual(-1);
    });

    test('if gamma() returns values based on globally created object.', () => {
        // Gamma - call and put gammas are equal at a given strike
        expect(optionPricer.gamma()).toEqual(6.578094735213071e-147);
    });

    test('if gamma() returns ~.065', () => {
        expect(optionPricer.gamma(23.05, 22, 0.086, 0.14, 0.012)).toEqual(0.2098249167077295);
    });

    test('if gamma() returns 0', () => {
        expect(optionPricer.gamma(100, 100, 0, 0.14, 0.012)).toEqual(0);
        expect(optionPricer.gamma(100, 100, 0.1, 0, 0.012)).toEqual(0);
        expect(optionPricer.gamma(100, 100, 0, 0, 0.012)).toEqual(0);
    });

    test('if vega() returns values based on globally created object.', () => {
        // Vega - call and put vegas are equal at a given strike
        // Note: vega is calculated per 1 percentage point change in volatility
        expect(optionPricer.vega()).toEqual(2.1395982952374753e-149);
    });

    test('if vega() returns ~.24', () => {
        expect(OptionPricer.vega(24.35, 21, 0.086, 0.14, 0.012)).toEqual(0.000036355602004098955);
    });

    test('if vega() returns 0', () => {
        expect(OptionPricer.vega(100, 100, 0, 0.1, 0.012)).toEqual(0);
        expect(OptionPricer.vega(100, 100, 0, 0, 0.012)).toEqual(0);
        expect(OptionPricer.vega(100, 100, 0.1, 0, 0.012)).toEqual(0);
    });

    test('if theta() returns values based on globally created object.', () => {
        // Theta - the default scale is 365 (days per year). 252 = trading days in a year
        expect(optionPricer.theta('call')).toEqual(-2.522459230496378e-147);
        expect(optionPricer.theta('put')).toEqual(0.006249977910997938);
    });

    test('if theta() returns non-zero theta', () => {
        // Theta - set scale to a value like 252 (trading days per year)
        expect(optionPricer.theta('call', 252)).toEqual(-2.522459230496378e-147);
        expect(optionPricer.theta('put', 252)).toEqual(0.006249977910997938);
        expect(OptionPricer.theta('call', 365, 206.35, 206, 0.086, 0.1, 0.012)).toEqual(-0.04182578066047898);
        expect(OptionPricer.theta('put', 365, 206.35, 206, 0.086, 0.1, 0.012)).toEqual(-0.035060163641528426);
        expect(OptionPricer.theta('call', 252, 206.35, 206, 0.086, 0.1, 0.012)).toEqual(-0.060580991829662006);
        expect(OptionPricer.theta('put', 252, 206.35, 206, 0.086, 0.1, 0.012)).toEqual(-0.05078158622681697);
    });

    test('if theta() returns 0', () => {
        expect(OptionPricer.theta('call', 365, 100, 100, 0, 0.1, 0.012)).toEqual(0);
        expect(OptionPricer.theta('put', 365, 100, 100, 0, 0.1, 0.012)).toEqual(0);
        expect(OptionPricer.theta('call', 252, 100, 100, 0, 0.1, 0.012)).toEqual(0);
        expect(OptionPricer.theta('put', 252, 100, 100, 0, 0.1, 0.012)).toEqual(0);
        expect(OptionPricer.theta('call', 365, 100, 100, 0.1, 0, 0.012)).toEqual(0);
        expect(OptionPricer.theta('put', 365, 100, 100, 0.1, 0, 0.012)).toEqual(0);
        expect(OptionPricer.theta('call', 252, 100, 100, 0.1, 0, 0.012)).toEqual(0);
        expect(OptionPricer.theta('put', 252, 100, 100, 0.1, 0, 0.012)).toEqual(0);
        expect(OptionPricer.theta('call', 365, 100, 100, 0, 0, 0.012)).toEqual(0);
        expect(OptionPricer.theta('put', 365, 100, 100, 0, 0, 0.012)).toEqual(0);
        expect(OptionPricer.theta('call', 252, 100, 100, 0, 0, 0.012)).toEqual(0);
        expect(OptionPricer.theta('put', 252, 100, 100, 0, 0, 0.012)).toEqual(0);
    });

    test('if rho() returns values based on globally created object.', () => {
        // Rho - the default scale is 100 (rho per 1%, or 100BP, change in the risk-free interest rate)
        expect(optionPricer.rho('call')).toEqual(0);
        expect(optionPricer.rho('put')).toEqual(-0.00024739638591259776);
        // Rho - set the scale to a value like 10000 (rho per .01%, or 1BP, change in the risk-free interest rate)
        expect(optionPricer.rho('call', 10000)).toEqual(0);
        expect(optionPricer.rho('put', 10000)).toEqual(-0.0000024739638591259778);
    });

    test('if rho() returns non-zero rho', () => {
        expect(OptionPricer.rho('call', 100, 206.35, 206, 0.086, .1, 0.012)).toEqual(0.09401937393521044);
        expect(OptionPricer.rho('put', 100, 206.35, 206, 0.086, .1, 0.012)).toEqual(-0.08295789125217093);
        expect(OptionPricer.rho('call', 10000, 206.35, 206, 0.086, .1, 0.012)).toEqual(0.0009401937393521044);
        expect(OptionPricer.rho('put', 10000, 206.35, 206, 0.086, .1, 0.012)).toEqual(-0.0008295789125217093);
        // only the call has a non-zero rho when: v=0, t>0, s>k
        expect(OptionPricer.rho('call', 100, 206.35, 206, 0.086, 0, 0.012)).toEqual(0.17697726518738136);
        // only the put has a non-zero rho when: v=0, t>0, s<k
        expect(OptionPricer.rho('put', 100, 205.35, 206, 0.086, 0, 0.012)).toEqual(-0.17697726518738136);
    });

    test('if rho() returns 0', () => {
        expect(OptionPricer.rho('call', 100, 100, 100, 0, .1, 0.012)).toEqual(0);
        expect(OptionPricer.rho('put', 100, 100, 100, 0, .1, 0.012)).toEqual(0);
        expect(OptionPricer.rho('call', 100, 100, 100, 0, 0, 0.012)).toEqual(0);
        expect(OptionPricer.rho('put', 100, 100, 100, 0, 0, 0.012)).toEqual(0);
        // only the put has a rho of zero when: v=0, t>0, s>k
        expect(OptionPricer.rho('put', 100, 45.86, 45, 0.086, 0, 0.012)).toEqual(0);
        // only the call has a rho of zero when: v=0, t>0, s<k
        expect(OptionPricer.rho('call', 100, 45.86, 46, 0.086, 0, 0.012)).toEqual(0);
    });

    test('if omega() returns ~.11', () => {
        expect(optionPricer.omega()).toEqual(-25.9700575640836);
    });

    test('if omega() returns -1.00163142954006', () => {
        expect(OptionPricer.omega(30, 34, 0.25, 0.2, 0.075)).toEqual(-1.0141314295400599);
    });

    test('if blackScholes() returns values based on globally created object.', () => {
        expect(optionPricer.blackScholes('call')).toEqual(0);
        expect(optionPricer.blackScholes('put')).toEqual(5.699628904765362);
    });

    test('t>0, v>0: if blackScholes() returns a call price of 0.23834902311961947', () => {
        expect(OptionPricer.blackScholes('call', 30, 34, .25, 0.2, 0.075)).toEqual(0.23276506083591464);
    });
    test('t>0, v>0: should return a put price of 3.5651039155492974', () => {
        expect(OptionPricer.blackScholes('put', 30, 34, .25, 0.2, 0.075)).toEqual(3.601204444260336);
    });

    test('t>0, v=0: if blackScholes() returns a call price of 0', () => {
        expect(OptionPricer.blackScholes('call', 30, 34, 0.25, 0, 0.075)).toEqual(0);
    });
    test('t>0, v=0: if blackScholes() returns a put price of 0', () => {
        expect(OptionPricer.blackScholes('put', 35, 34, 0.25, 0, 0.075)).toEqual(0);
    });

    test('t=0, v>0, out-of-the-money: if blackScholes() returns a call price of 0', () => {
        expect(OptionPricer.blackScholes('call', 30, 34, 0, 0.1, 0.075)).toEqual(0);
    });
    test('t=0, v>0, out-of-the-money: if blackScholes() returns a put price of 0', () => {
        expect(OptionPricer.blackScholes('put', 35, 34, 0, 0.1, 0.075)).toEqual(0);
    });

    test('t=0, v=0, out-of-the-money: if blackScholes() returns a call price of 0', () => {
        expect(OptionPricer.blackScholes('call', 30, 34, 0, 0, 0.075)).toEqual(0);
    });
    test('t=0, v=0, out-of-the-money: should return a put price of 0', () => {
        expect(OptionPricer.blackScholes('put', 35, 34, 0, 0, 0.075)).toEqual(0);
    });

    test('t>0, v=0, in-the-money: if blackScholes() returns a call price of 2.673245107570324', () => {
        expect(OptionPricer.blackScholes('call', 36, 34, 0.25, 0, 0.075)).toEqual(2.6315606165755767);
    });
    test('t>0, v=0, in-the-money: if blackScholes() returns a put price of 1.3267548924296761', () => {
        expect(OptionPricer.blackScholes('put', 32, 34, 0.25, 0, 0.075)).toEqual(1.3684393834244233);
    });

    test('t=0, v>0, in-the-money: if blackScholes() returns a call price of 2', () => {
        expect(OptionPricer.blackScholes('call', 36, 34, 0, 0.1, 0.075)).toEqual(2);
    });
    test('t=0, v>0, in-the-money: if blackScholes() returns a put price of 2', () => {
        expect(OptionPricer.blackScholes('put', 32, 34, 0, 0.1, 0.075)).toEqual(2);
    });

    test('t=0, v=0, in-the-money: if blackScholes() returns a call price of 2', () => {
        expect(OptionPricer.blackScholes('call', 36, 34, 0, 0, 0.075)).toEqual(2);
    });
    test('t=0, v=0, in-the-money: if blackScholes() returns a put price of 2', () => {
        expect(OptionPricer.blackScholes('put', 32, 34, 0, 0, 0.075)).toEqual(2);
    });

    test('if impliedVolatility() returns values based on globally created object.', () => {
        expect(optionPricer.impliedVolatility('call', 2)).toEqual(6.82);
    });

    test('if impliedVolatility() returns ~.12', () => {
        expect(OptionPricer.impliedVolatility('call', 2, 0.1, 101, 100, 0.086, 0.014, 0.015)).toEqual(.11640625);
    });

    test('if impliedVolatility() returns ~.21', () => {
        expect(OptionPricer.impliedVolatility('put', 2, 0.1, 101, 100, 0.086, 0.014, 0.015)).toEqual(0.215625);
    });

});
