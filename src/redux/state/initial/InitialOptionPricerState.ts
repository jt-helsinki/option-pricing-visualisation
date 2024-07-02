import { OptionPricerState } from '../OptionPricerState';
import { OptionPricer } from '../../../common/OptionPricer';

export const InitialOptionPricerState: OptionPricerState = {

    showSell: true,

    showPut: true,

    showCall: true,

    showVega: true,

    showGamma: true,

    showTheta: true,

    showDelta: true,

    showRho: true,

    underlyingPrice: {
        buy: 100,
        sell: 100
    },

    strike: {
        buy: 100,
        sell: 100
    },

    expiryDays: {
        buy: 90,
        sell: 30
    },

    volatility: {
        buy: 0.10,
        sell: 0.25
    },

    riskFreeRate: {
        buy: 0.025,
        sell: 0.025
    },

    optionPrice: {
        buy: 0,
        sell: 0
    },

    optionPricer: {
        buy: new OptionPricer(100, 100, 90, 0.10, 0.025),
        sell: new OptionPricer(100, 100, 30, 0.25, 0.025),
    },

    optionPricerTimeSeries: []

};
