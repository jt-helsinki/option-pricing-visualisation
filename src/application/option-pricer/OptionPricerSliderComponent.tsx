import * as React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { formatNumberToFixedDecimals } from '../../utils';
import { BuySellType, OptionPricerStateType } from '../../types';

interface Props {

    buySell: BuySellType;

    price: OptionPricerStateType<number>;

    strike: OptionPricerStateType<number>;

    expiryDays: OptionPricerStateType<number>;

    volatility: OptionPricerStateType<number>;

    riskFreeRate: OptionPricerStateType<number>;

    setUnderlyingPrice: (price: number, buySell: BuySellType) => void;

    setStrike: (strike: number, buySell: BuySellType) => void;

    setExpiryDays: (expiryDays: number, buySell: BuySellType) => void;

    setVolatility: (volatility: number, buySell: BuySellType) => void;

    setRiskFreeRate: (riskFreeRate: number, buySell: BuySellType) => void;

}

export class OptionPricerSliderComponent extends React.PureComponent<Props> {

    private readonly railStyle: any = {
        backgroundColor: 'lightskyblue'
    };

    private readonly trackStyle: any = {
        backgroundColor: 'lightsalmon'
    };

    private readonly handleStyle: any = {
        borderColor: 'darkgrey',
        backgroundColor: '#cccccc'
    };

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        return (
            <div className={'slider-container'}>
                <div className={'slider-div'}>
                    <label className={'slider-label'}>Underlying Price: ${this.props.price[this.props.buySell]}</label>
                    <Slider
                        min={0}
                        max={150}
                        value={this.props.price[this.props.buySell]}
                        onChange={(event: any) => this.props.setUnderlyingPrice(event, this.props.buySell)}
                        className={'slider'}
                        railStyle={this.railStyle}
                        trackStyle={this.trackStyle}
                        handleStyle={this.handleStyle}
                    />
                </div>
                <div className={'slider-div'}>
                    <label className={'slider-label'}>Strike: ${this.props.strike[this.props.buySell]}</label>
                    <Slider
                        min={0}
                        max={100}
                        value={this.props.strike[this.props.buySell]}
                        onChange={(event: any) => this.props.setStrike(event, this.props.buySell)}
                        className={'slider'}
                        railStyle={this.railStyle}
                        trackStyle={this.trackStyle}
                        handleStyle={this.handleStyle}
                    />
                </div>
                <div className={'slider-div'}>
                    <label className={'slider-label'}>Expiry
                        Days: {this.props.expiryDays[this.props.buySell]} days</label>
                    <Slider
                        value={this.props.expiryDays[this.props.buySell]}
                        min={0}
                        max={180}
                        onChange={(event: any) => this.props.setExpiryDays(event, this.props.buySell)}
                        className={'slider'}
                        railStyle={this.railStyle}
                        trackStyle={this.trackStyle}
                        handleStyle={this.handleStyle}
                    />
                </div>
                <div className={'slider-div'}>
                    <label
                        className={'slider-label'}>Volatility: {formatNumberToFixedDecimals(this.props.volatility[this.props.buySell] * 100, 2)} %</label>
                    <Slider
                        value={this.props.volatility[this.props.buySell]}
                        step={0.005}
                        min={0}
                        max={1.00}
                        onChange={(event: any) => this.props.setVolatility(event, this.props.buySell)}
                        className={'slider'}
                        railStyle={this.railStyle}
                        trackStyle={this.trackStyle}
                        handleStyle={this.handleStyle}
                    />
                </div>
                <div className={'slider-div'}>
                    <label className={'slider-label'}>Risk free
                        rate: {formatNumberToFixedDecimals(this.props.riskFreeRate[this.props.buySell] * 100, 2)} %</label>
                    <Slider
                        value={this.props.riskFreeRate[this.props.buySell]}
                        step={0.0025}
                        min={0}
                        max={0.25}
                        onChange={(event: any) => this.props.setRiskFreeRate(event, this.props.buySell)}
                        className={'slider'}
                        railStyle={this.railStyle}
                        trackStyle={this.trackStyle}
                        handleStyle={this.handleStyle}
                    />
                </div>
            </div>
        );


    }

}