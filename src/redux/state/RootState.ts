import { OptionPricerState } from './';

/**
 * The root state for the application. The application should have one single state store so this
 * interface should contain all the properties required to store the state.
 */
export interface RootState {

    optionPricerState: OptionPricerState;

}
