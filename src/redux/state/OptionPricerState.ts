import { OptionPricer } from '../../common';
import { OptionPricerStateType } from '../../types';

export interface OptionPricerState {

    showSell: boolean;

    showPut: boolean;

    showCall: boolean;

    showVega: boolean;

    showGamma: boolean;

    showTheta: boolean;

    showDelta: boolean;

    showRho: boolean;

    underlyingPrice: OptionPricerStateType<number>;

    strike: OptionPricerStateType<number>;

    expiryDays: OptionPricerStateType<number>;

    volatility: OptionPricerStateType<number>;

    riskFreeRate: OptionPricerStateType<number>;

    optionPrice: OptionPricerStateType<number>;

    optionPricer: OptionPricerStateType<OptionPricer>;

    optionPricerTimeSeries: OptionPricer[];

}