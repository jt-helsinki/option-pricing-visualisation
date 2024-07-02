import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { OptionPriceContainerPage } from '../src';

describe('basic render tests', () => {

    test('render OptionPriceContainerPage without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<OptionPriceContainerPage/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });
});
