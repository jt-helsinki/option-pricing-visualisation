import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { OptionPricerContainer } from './application/option-pricer';
import './index.scss';
import { configureStore } from './config';

const store = configureStore();

export const OptionPriceContainerPage = () => (
    <Provider store={store}>
        <OptionPricerContainer/>
    </Provider>
);

renderToDom(<OptionPriceContainerPage/>, 'root');

function renderToDom(app: any, elementId: string): void {
    const element: HTMLElement | null = document.getElementById(elementId);
    if (element !== null && element !== undefined) {
        ReactDOM.render(app,
            document.getElementById(elementId)
        );
    }
}
