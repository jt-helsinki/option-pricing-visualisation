import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import { createLogger } from 'redux-logger';

import { Config } from './Config';
import { EnvConfig } from './EnvConfig';
import { optionPricerReducer as optionPricerState } from '../redux/reducers';
import { RootState } from '../redux/state';

/**
 * Combines all of the application's reducers into one single root reducer.
 *
 * @type {Reducer<any>}
 */
const RootReducer = combineReducers({
    optionPricerState,
    // add any more reducers here.
});

const config: EnvConfig = Config.configuration();

/**
 * Configures the application's state store with reducers, epics and the router middleware.
 *
 * @returns {Store<IRootState>}
 */
export function configureStore(): Store<RootState> {

    const reduxDevtoolsExtensionCompose: string = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';

    const composeEnhancers =
        typeof window === 'object' &&
        window[reduxDevtoolsExtensionCompose]
            ? window[reduxDevtoolsExtensionCompose]({})
            : compose;

    const middlewares: any[] = [];
    if (config.reduxLogging === true) {
        middlewares.push(createLogger());
    }

    const enhancer = composeEnhancers(
        applyMiddleware(...middlewares),
        // other store enhancers (if any)
    );

    return createStore(
        RootReducer,
        enhancer,
    );
}