import { produce } from 'immer';
import { Action, OptionPricerActionType, SliderPayload } from '../actions';
import { OptionPricerState } from '../state';
import { InitialOptionPricerState } from '../state/initial';
import { OptionPricer } from '../../common/OptionPricer';
import { BuySellType } from '../../types';

export const optionPricerReducer = (state: OptionPricerState = InitialOptionPricerState,
                                    action: Action<OptionPricerActionType, SliderPayload | boolean>): OptionPricerState => {

    /**
     * Declare the new state here. The spread operator (...) will  only shallow clone. Instead we
     * use immer. Make changes on the draft and then return the output from produce(). This is
     * far easier than cloning the object.
     */
    return produce(state, (draft: OptionPricerState): void => {
        switch (action.type) {

            case OptionPricerActionType.SHOW_SELL:
                action.payload = action.payload as boolean;
                draft.showSell = action.payload;
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.SHOW_PUT:
                action.payload = action.payload as boolean;
                draft.showPut = action.payload;
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.SHOW_CALL:
                action.payload = action.payload as boolean;
                draft.showCall = action.payload;
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.SHOW_VEGA:
                action.payload = action.payload as boolean;
                draft.showVega = action.payload;
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.SHOW_GAMMA:
                action.payload = action.payload as boolean;
                draft.showGamma = action.payload;
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.SHOW_DELTA:
                action.payload = action.payload as boolean;
                draft.showDelta = action.payload;
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.SHOW_THETA:
                action.payload = action.payload as boolean;
                draft.showTheta = action.payload;
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.SHOW_RHO:
                action.payload = action.payload as boolean;
                draft.showRho = action.payload;
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.STRIKE:
                action.payload = action.payload as SliderPayload;
                draft.strike[action.payload.buySell] = action.payload.value;
                draft.optionPricer[action.payload.buySell] = new OptionPricer(state.underlyingPrice[action.payload.buySell], action.payload.value, state.expiryDays[action.payload.buySell], state.volatility[action.payload.buySell], state.riskFreeRate[action.payload.buySell]);
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.EXPIRY_DAYS:
                action.payload = action.payload as SliderPayload;
                draft.expiryDays[action.payload.buySell] = action.payload.value;
                draft.optionPricer[action.payload.buySell] = new OptionPricer(state.underlyingPrice[action.payload.buySell], state.strike[action.payload.buySell], action.payload.value, state.volatility[action.payload.buySell], state.riskFreeRate[action.payload.buySell]);
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.RISK_FREE_RATE:
                action.payload = action.payload as SliderPayload;
                draft.riskFreeRate[action.payload.buySell] = action.payload.value;
                draft.optionPricer[action.payload.buySell] = new OptionPricer(state.underlyingPrice[action.payload.buySell], state.strike[action.payload.buySell], state.expiryDays[action.payload.buySell], state.volatility[action.payload.buySell], action.payload.value);
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.UNDERLYING_PRICE:
                action.payload = action.payload as SliderPayload;
                draft.underlyingPrice[action.payload.buySell] = action.payload.value;
                draft.optionPricer[action.payload.buySell] = new OptionPricer(action.payload.value, state.strike[action.payload.buySell], state.expiryDays[action.payload.buySell], state.volatility[action.payload.buySell], state.riskFreeRate[action.payload.buySell]);
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.VOLATILITY:
                action.payload = action.payload as SliderPayload;
                draft.volatility[action.payload.buySell] = action.payload.value;
                draft.optionPricer[action.payload.buySell] = new OptionPricer(state.underlyingPrice[action.payload.buySell], state.strike[action.payload.buySell], state.expiryDays[action.payload.buySell], action.payload.value, state.riskFreeRate[action.payload.buySell]);
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            case OptionPricerActionType.OPTION_PRICE:
                action.payload = action.payload as SliderPayload;
                draft.optionPrice[action.payload.buySell] = action.payload.value;
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

            default:
                // there is no compatible action so make no change to the state
                draft.optionPricerTimeSeries = createOptionPricerTimeSeriesFromState(draft);
                break;

        }
    });

    function createOptionPricerTimeSeriesFromState(draft: OptionPricerState): OptionPricer[] {
        const optionPricerTimeSeries: OptionPricer[] = [];
        let buySell: BuySellType = 'buy';
        for (let i = draft.expiryDays['buy'] - 1; i >= 0; i--) {
            if (draft.expiryDays['sell'] === i && draft.showSell === true) {
                buySell = 'sell';
            }
            optionPricerTimeSeries.push(new OptionPricer(draft.underlyingPrice[buySell], draft.strike[buySell], i + 1, draft.volatility[buySell], draft.riskFreeRate[buySell]));
        }
        return optionPricerTimeSeries;
    }
};

