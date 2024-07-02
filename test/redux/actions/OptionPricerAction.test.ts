import { Action, OptionPricerAction, OptionPricerActionType, SliderPayload } from '../../../src/redux/actions';


describe('Tests the outputs returned from the OptionPricerAction.', () => {

    test('if setVolatilityOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.VOLATILITY, SliderPayload> = OptionPricerAction.setVolatilityOnState(5, 'buy');
        expect(action.type).toEqual(OptionPricerActionType.VOLATILITY);
        expect(action.payload.value).toEqual(5);
        expect(action.payload.buySell).toEqual('buy');
    });

    test('if setExpiryDaysOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.EXPIRY_DAYS, SliderPayload> = OptionPricerAction.setExpiryDaysOnState(10, 'buy');
        expect(action.type).toEqual(OptionPricerActionType.EXPIRY_DAYS);
        expect(action.payload.value).toEqual(10);
        expect(action.payload.buySell).toEqual('buy');
    });

    test('if setRiskFreeRateOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.RISK_FREE_RATE, SliderPayload> = OptionPricerAction.setRiskFreeRateOnState(2, 'buy');
        expect(action.type).toEqual(OptionPricerActionType.RISK_FREE_RATE);
        expect(action.payload.value).toEqual(2);
        expect(action.payload.buySell).toEqual('buy');
    });

    test('if setUnderlyingPriceOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.UNDERLYING_PRICE, SliderPayload> = OptionPricerAction.setUnderlyingPriceOnState(10.32, 'buy');
        expect(action.type).toEqual(OptionPricerActionType.UNDERLYING_PRICE);
        expect(action.payload.value).toEqual(10.32);
        expect(action.payload.buySell).toEqual('buy');
    });

    test('if setStrikeOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.STRIKE, SliderPayload> = OptionPricerAction.setStrikeOnState(9.34, 'buy');
        expect(action.type).toEqual(OptionPricerActionType.STRIKE);
        expect(action.payload.value).toEqual(9.34);
        expect(action.payload.buySell).toEqual('buy');
    });

    test('if setOptionPriceOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.OPTION_PRICE, SliderPayload> = OptionPricerAction.setOptionPriceOnState(9.35, 'buy');
        expect(action.type).toEqual(OptionPricerActionType.OPTION_PRICE);
        expect(action.payload.value).toEqual(9.35);
    });

    test('if setShowSellOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.SHOW_SELL, boolean> = OptionPricerAction.setShowSellOnState(false);
        expect(action.type).toEqual(OptionPricerActionType.SHOW_SELL);
        expect(action.payload).toEqual(false);
    });

    test('if setShowPutOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.SHOW_PUT, boolean> = OptionPricerAction.setShowPutOnState(false);
        expect(action.type).toEqual(OptionPricerActionType.SHOW_PUT);
        expect(action.payload).toEqual(false);
    });

    test('if setShowCallOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.SHOW_CALL, boolean> = OptionPricerAction.setShowCallOnState(false);
        expect(action.type).toEqual(OptionPricerActionType.SHOW_CALL);
        expect(action.payload).toEqual(false);
    });

    test('if setShowVegaOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.SHOW_VEGA, boolean> = OptionPricerAction.setShowVegaOnState(false);
        expect(action.type).toEqual(OptionPricerActionType.SHOW_VEGA);
        expect(action.payload).toEqual(false);
    });

    test('if setShowGammaOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.SHOW_GAMMA, boolean> = OptionPricerAction.setShowGammaOnState(false);
        expect(action.type).toEqual(OptionPricerActionType.SHOW_GAMMA);
        expect(action.payload).toEqual(false);
    });

    test('if setShowDeltaOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.SHOW_DELTA, boolean> = OptionPricerAction.setShowDeltaOnState(false);
        expect(action.type).toEqual(OptionPricerActionType.SHOW_DELTA);
        expect(action.payload).toEqual(false);
    });

    test('if setShowThetaOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.SHOW_THETA, boolean> = OptionPricerAction.setShowThetaOnState(false);
        expect(action.type).toEqual(OptionPricerActionType.SHOW_THETA);
        expect(action.payload).toEqual(false);
    });

    test('if setShowRhoOnState returns correct object', () => {
        let action: Action<OptionPricerActionType.SHOW_RHO, boolean> = OptionPricerAction.setShowRhoOnState(false);
        expect(action.type).toEqual(OptionPricerActionType.SHOW_RHO);
        expect(action.payload).toEqual(false);
    });


});