import { Action } from './Action';
import { BuySellType } from '../../types';

export enum OptionPricerActionType {
    SHOW_SELL = 'SHOW_SELL',
    SHOW_PUT = 'SHOW_PUT',
    SHOW_CALL = 'SHOW_CALL',
    SHOW_VEGA = 'SHOW_VEGA',
    SHOW_GAMMA = 'SHOW_GAMMA',
    SHOW_DELTA = 'SHOW_DELTA',
    SHOW_THETA = 'SHOW_THETA',
    SHOW_RHO = 'SHOW_RHO',
    VOLATILITY = 'VOLATILITY',
    RISK_FREE_RATE = 'RISK_FREE_RATE',
    STRIKE = 'STRIKE',
    EXPIRY_DAYS = 'EXPIRY_DAYS',
    UNDERLYING_PRICE = 'UNDERLYING_PRICE',
    OPTION_PRICE = 'OPTION_PRICE'
}

export class OptionPricerAction {

    public static setShowSellOnState(show: boolean): Action<OptionPricerActionType.SHOW_SELL, boolean> {
        return {
            type: OptionPricerActionType.SHOW_SELL,
            payload: show
        };
    }

    public static setShowPutOnState(show: boolean): Action<OptionPricerActionType.SHOW_PUT, boolean> {
        return {
            type: OptionPricerActionType.SHOW_PUT,
            payload: show
        };
    }

    public static setShowCallOnState(show: boolean): Action<OptionPricerActionType.SHOW_CALL, boolean> {
        return {
            type: OptionPricerActionType.SHOW_CALL,
            payload: show
        };
    }

    public static setShowVegaOnState(show: boolean): Action<OptionPricerActionType.SHOW_VEGA, boolean> {
        return {
            type: OptionPricerActionType.SHOW_VEGA,
            payload: show
        };
    }

    public static setShowGammaOnState(show: boolean): Action<OptionPricerActionType.SHOW_GAMMA, boolean> {
        return {
            type: OptionPricerActionType.SHOW_GAMMA,
            payload: show
        };
    }

    public static setShowDeltaOnState(show: boolean): Action<OptionPricerActionType.SHOW_DELTA, boolean> {
        return {
            type: OptionPricerActionType.SHOW_DELTA,
            payload: show
        };
    }

    public static setShowThetaOnState(show: boolean): Action<OptionPricerActionType.SHOW_THETA, boolean> {
        return {
            type: OptionPricerActionType.SHOW_THETA,
            payload: show
        };
    }

    public static setShowRhoOnState(show: boolean): Action<OptionPricerActionType.SHOW_RHO, boolean> {
        return {
            type: OptionPricerActionType.SHOW_RHO,
            payload: show
        };
    }

    public static setVolatilityOnState(volatility: number, buySell: BuySellType): Action<OptionPricerActionType.VOLATILITY, SliderPayload> {
        return {
            type: OptionPricerActionType.VOLATILITY,
            payload: {
                value: volatility,
                buySell: buySell
            }
        };
    }

    public static setRiskFreeRateOnState(riskFreeRate: number, buySell: BuySellType): Action<OptionPricerActionType.RISK_FREE_RATE, SliderPayload> {
        return {
            type: OptionPricerActionType.RISK_FREE_RATE,
            payload: {
                value: riskFreeRate,
                buySell: buySell
            }
        };
    }

    public static setStrikeOnState(strike: number, buySell: BuySellType): Action<OptionPricerActionType.STRIKE, SliderPayload> {
        return {
            type: OptionPricerActionType.STRIKE,
            payload: {
                value: strike,
                buySell: buySell
            }
        };
    }

    public static setUnderlyingPriceOnState(underlyingPrice: number, buySell: BuySellType): Action<OptionPricerActionType.UNDERLYING_PRICE, SliderPayload> {
        return {
            type: OptionPricerActionType.UNDERLYING_PRICE,
            payload: {
                value: underlyingPrice,
                buySell: buySell
            }
        };
    }

    public static setExpiryDaysOnState(expiryDays: number, buySell: BuySellType): Action<OptionPricerActionType.EXPIRY_DAYS, SliderPayload> {
        return {
            type: OptionPricerActionType.EXPIRY_DAYS,
            payload: {
                value: expiryDays,
                buySell: buySell
            }
        };
    }

    public static setOptionPriceOnState(optionPrice: number, buySell: BuySellType): Action<OptionPricerActionType.OPTION_PRICE, SliderPayload> {
        return {
            type: OptionPricerActionType.OPTION_PRICE,
            payload: {
                value: optionPrice,
                buySell: buySell
            }
        };
    }

}

export interface SliderPayload {

    value: number;

    buySell: BuySellType;

}