import { configureStore } from '../../src/config';
import { Store } from 'redux';
import { RootState } from '../../src/redux/state';
import { BuySellType } from '../../src/types';

const BUY_SELL: BuySellType = 'buy';

describe('Tests the application state store is created as expected.', () => {

    test('if the store is created and configured', () => {
        let store: Store<RootState> = configureStore();
        let state: RootState = store.getState();
        // check if the state is equal to the InitialRootState
        expect(state.optionPricerState.strike[BUY_SELL]).toEqual(100);
        expect(state.optionPricerState.underlyingPrice[BUY_SELL]).toEqual(100);
        expect(state.optionPricerState.riskFreeRate[BUY_SELL]).toEqual(0.025);
        expect(state.optionPricerState.expiryDays[BUY_SELL]).toEqual(90);
        expect(state.optionPricerState.volatility[BUY_SELL]).toEqual(0.10);
    });

});
