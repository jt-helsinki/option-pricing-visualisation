import * as React from 'react';
import 'rc-slider/assets/index.css';
import { formatNumberToFixedDecimals } from '../../utils';
import { BuySellType, OptionPricerStateType } from '../../types';
import { OptionPricer } from '../../common/OptionPricer';

interface Props {

    buySell: BuySellType;

    optionPricer: OptionPricerStateType<OptionPricer>;

    setOptionPrice(value: number, buySell: BuySellType): void;

}

export class OptionPricerGreeksComponent extends React.PureComponent<Props> {

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className={'grid-container'}>
                <div className={'grid-row'}>
                    <div className={'grid-row-label-column'}>
                        &nbsp;
                    </div>
                    <div className={'grid-row-heder-column'}>
                        Call
                    </div>
                    <div className={'grid-row-heder-column'}>
                        Put
                    </div>
                </div>

                <div className={'grid-row'}>
                    <div className={'grid-row-label-column'}>
                        Price:
                    </div>
                    <div className={'grid-row-column'}>
                        {formatNumberToFixedDecimals(this.props.optionPricer[this.props.buySell].blackScholes('call'), 6)}
                    </div>
                    <div className={'grid-row-column'}>
                        {formatNumberToFixedDecimals(this.props.optionPricer[this.props.buySell].blackScholes('put'), 6)}
                    </div>
                </div>

                <div className={'grid-row'}>
                    <div className={'grid-row-label-column'}>
                        Rho:
                    </div>
                    <div className={'grid-row-column'}>
                        {formatNumberToFixedDecimals(this.props.optionPricer[this.props.buySell].rho('call'), 4)}
                    </div>
                    <div className={'grid-row-column'}>
                        {formatNumberToFixedDecimals(this.props.optionPricer[this.props.buySell].rho('put'), 4)}
                    </div>
                </div>

                <div className={'grid-row'}>
                    <div className={'grid-row-label-column'}>
                        Theta:
                    </div>
                    <div className={'grid-row-column'}>
                        {formatNumberToFixedDecimals(this.props.optionPricer[this.props.buySell].theta('call'), 4)}
                    </div>
                    <div className={'grid-row-column'}>
                        {formatNumberToFixedDecimals(this.props.optionPricer[this.props.buySell].theta('put'), 4)}
                    </div>
                </div>

                <div className={'grid-row'}>
                    <div className={'grid-row-label-column'}>
                        Delta:
                    </div>
                    <div className={'grid-row-column'}>
                        {formatNumberToFixedDecimals(this.props.optionPricer[this.props.buySell].delta('call'), 4)}
                    </div>
                    <div className={'grid-row-column'}>
                        {formatNumberToFixedDecimals(this.props.optionPricer[this.props.buySell].delta('put'), 4)}
                    </div>
                </div>

                <div className={'grid-row'}>
                    <div className={'grid-row-label-column'}>
                        Gama:
                    </div>
                    <div className={'grid-row-column'}>
                        {formatNumberToFixedDecimals(this.props.optionPricer[this.props.buySell].gamma(), 4)}
                    </div>
                    <div className={'grid-row-column'}>
                        {formatNumberToFixedDecimals(this.props.optionPricer[this.props.buySell].gamma(), 4)}
                    </div>
                </div>

                <div className={'grid-row'}>
                    <div className={'grid-row-label-column'}>
                        Vega:
                    </div>
                    <div className={'grid-row-column'}>
                        {formatNumberToFixedDecimals(this.props.optionPricer[this.props.buySell].vega(), 4)}
                    </div>
                    <div className={'grid-row-column'}>
                        {formatNumberToFixedDecimals(this.props.optionPricer[this.props.buySell].vega(), 4)}
                    </div>
                </div>
            </div>
        );
    }

}
