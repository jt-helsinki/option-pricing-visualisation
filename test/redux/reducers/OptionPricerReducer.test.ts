import { OptionPricerState } from '../../../src/redux/state';
import { InitialRootState } from '../../../src/redux/state/initial';
import { optionPricerReducer as reducer } from '../../../src/redux/reducers';
import { Action, OptionPricerAction, OptionPricerActionType, SliderPayload } from '../../../src/redux/actions';
import { BuySellType } from '../../../src/types';

let state: OptionPricerState;

const BUY_SELL: BuySellType = 'buy';

describe('Tests the outputs returned from the OptionPricerReducer.', () => {

    beforeEach(() => {
        state = InitialRootState.optionPricerState;
    });

    test('if setVolatilityOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.VOLATILITY, SliderPayload> = OptionPricerAction.setVolatilityOnState(0.23, BUY_SELL);
        let newState = reducer(state, action);
        checkValues(newState,
            100,
            100,
            90,
            0.23,
            0.025,
            BUY_SELL);
    });

    test('if setExpiryDaysOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.EXPIRY_DAYS, SliderPayload> = OptionPricerAction.setExpiryDaysOnState(30, BUY_SELL);
        let newState = reducer(state, action);
        checkValues(newState,
            100,
            100,
            30,
            0.10,
            0.025,
            BUY_SELL);
    });

    test('if setRiskFreeRateOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.RISK_FREE_RATE, SliderPayload> = OptionPricerAction.setRiskFreeRateOnState(0.0215, BUY_SELL);
        let newState = reducer(state, action);
        checkValues(newState,
            100,
            100,
            90,
            0.10,
            0.0215,
            BUY_SELL);
    });

    test('if setUnderlyingPriceOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.UNDERLYING_PRICE, SliderPayload> = OptionPricerAction.setUnderlyingPriceOnState(10.32, BUY_SELL);
        let newState = reducer(state, action);
        checkValues(newState,
            10.32,
            100,
            90,
            0.10,
            0.025,
            BUY_SELL);
    });

    test('if setStrikeOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.STRIKE, SliderPayload> = OptionPricerAction.setStrikeOnState(9.34, BUY_SELL);
        let newState = reducer(state, action);
        checkValues(newState,
            100,
            9.34,
            90,
            0.10,
            0.025,
            BUY_SELL);
    });

    test('if setStrikeOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.OPTION_PRICE, SliderPayload> = OptionPricerAction.setOptionPriceOnState(9.35, BUY_SELL);
        let newState = reducer(state, action);
        expect(newState.optionPrice[BUY_SELL]).toEqual(9.35);
        // tests for implied vol are
    });

    test('if setShowSellOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.SHOW_SELL, boolean> = OptionPricerAction.setShowSellOnState(false);
        let newState = reducer(state, action);
        expect(newState.showSell).toEqual(false);
        // tests for implied vol are
    });

    test('if setShowCallOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.SHOW_CALL, boolean> = OptionPricerAction.setShowCallOnState(false);
        let newState = reducer(state, action);
        expect(newState.showCall).toEqual(false);
        // tests for implied vol are
    });

    test('if setShowPutOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.SHOW_PUT, boolean> = OptionPricerAction.setShowPutOnState(false);
        let newState = reducer(state, action);
        expect(newState.showPut).toEqual(false);
        // tests for implied vol are
    });

    test('if setAllValuesOnState returns correct object', () => {
        let actionStrike: Action<OptionPricerActionType.STRIKE, SliderPayload> = OptionPricerAction.setStrikeOnState(9.34, BUY_SELL);
        let actionUnderlyingPrice: Action<OptionPricerActionType.UNDERLYING_PRICE, SliderPayload> = OptionPricerAction.setUnderlyingPriceOnState(10.32, BUY_SELL);
        let actionVolatility: Action<OptionPricerActionType.VOLATILITY, SliderPayload> = OptionPricerAction.setVolatilityOnState(23, BUY_SELL);
        let actionExpiryDays: Action<OptionPricerActionType.EXPIRY_DAYS, SliderPayload> = OptionPricerAction.setExpiryDaysOnState(10, BUY_SELL);
        let actionRiskFreeRate: Action<OptionPricerActionType.RISK_FREE_RATE, SliderPayload> = OptionPricerAction.setRiskFreeRateOnState(2.15, BUY_SELL);
        let newState = reducer(state, actionStrike);
        newState = reducer(newState, actionUnderlyingPrice);
        newState = reducer(newState, actionVolatility);
        newState = reducer(newState, actionExpiryDays);
        newState = reducer(newState, actionRiskFreeRate);
        checkValues(newState,
            10.32,
            9.34,
            10,
            23,
            2.15,
            BUY_SELL);
    });

});

function checkValues(state: OptionPricerState,
                     underlyingPrice: number,
                     strike: number,
                     expiryDays: number,
                     volatility: number,
                     riskFreeRate: number,
                     buySell: BuySellType): void {
    expect(state.underlyingPrice[buySell]).toEqual(underlyingPrice);
    expect(state.strike[buySell]).toEqual(strike);
    expect(state.expiryDays[buySell]).toEqual(expiryDays);
    expect(state.volatility[buySell]).toEqual(volatility);
    expect(state.riskFreeRate[buySell]).toEqual(riskFreeRate);
    expect(state.optionPricerTimeSeries.length).toEqual(expiryDays);
}