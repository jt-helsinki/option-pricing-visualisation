import * as React from 'react';
import { connect } from 'react-redux';
import { OptionPricerState, RootState } from '../../redux/state';
import { Dispatch } from 'redux';
import { Action, OptionPricerAction, OptionPricerActionType, SliderPayload } from '../../redux/actions';
import { OptionPricerChartComponent, OptionPricerGreeksComponent, OptionPricerSliderComponent } from './';
import { BuySellType } from '../../types';

interface Props extends OptionPricerState {
    // empty
}

interface DispatchProps {

    setShowSellOnState(show: boolean): void,

    setShowPutOnState(show: boolean): void,

    setShowCallOnState(show: boolean): void,

    setShowVegaOnState(show: boolean): void,

    setShowGammaOnState(show: boolean): void,

    setShowDeltaOnState(show: boolean): void,

    setShowThetaOnState(show: boolean): void,

    setShowRhoOnState(show: boolean): void,

    setUnderlyingPrice(value: number, buySell: BuySellType): void;

    setStrike(value: number, buySell: BuySellType): void;

    setVolatility(value: number, buySell: BuySellType): void;

    setRiskFreeRate(value: number, buySell: BuySellType): void;

    setExpiryDays(value: number, buySell: BuySellType): void;

    setOptionPrice(value: number, buySell: BuySellType): void;

}

const mapStateToProps = (state: RootState): Props => {
    return {
        ...state.optionPricerState
    };
};

const mapDispatchToProps = (dispatch: Dispatch<Action<OptionPricerActionType, SliderPayload | boolean>>): DispatchProps => {

    const setShowSellOnState = (show: boolean): void => {
        dispatch(OptionPricerAction.setShowSellOnState(show));
    };

    const setShowPutOnState = (show: boolean): void => {
        dispatch(OptionPricerAction.setShowPutOnState(show));
    };

    const setShowCallOnState = (show: boolean): void => {
        dispatch(OptionPricerAction.setShowCallOnState(show));
    };

    const setShowVegaOnState = (show: boolean): void => {
        dispatch(OptionPricerAction.setShowVegaOnState(show));
    };

    const setShowGammaOnState = (show: boolean): void => {
        dispatch(OptionPricerAction.setShowGammaOnState(show));
    };

    const setShowDeltaOnState = (show: boolean): void => {
        dispatch(OptionPricerAction.setShowDeltaOnState(show));
    };

    const setShowThetaOnState = (show: boolean): void => {
        dispatch(OptionPricerAction.setShowThetaOnState(show));
    };

    const setShowRhoOnState = (show: boolean): void => {
        dispatch(OptionPricerAction.setShowRhoOnState(show));
    };

    const setUnderlyingPrice = (value: number, buySell: BuySellType): void => {
        dispatch(OptionPricerAction.setUnderlyingPriceOnState(value, buySell));
    };

    const setStrike = (value: number, buySell: BuySellType): void => {
        dispatch(OptionPricerAction.setStrikeOnState(value, buySell));
    };

    const setVolatility = (value: number, buySell: BuySellType): void => {
        dispatch(OptionPricerAction.setVolatilityOnState(value, buySell));
    };

    const setRiskFreeRate = (value: number, buySell: BuySellType): void => {
        dispatch(OptionPricerAction.setRiskFreeRateOnState(value, buySell));
    };

    const setExpiryDays = (value: number, buySell: BuySellType): void => {
        dispatch(OptionPricerAction.setExpiryDaysOnState(value, buySell));
    };

    const setOptionPrice = (value: number, buySell: BuySellType): void => {
        dispatch(OptionPricerAction.setOptionPriceOnState(value, buySell));
    };

    return {
        setShowSellOnState,
        setShowPutOnState,
        setShowCallOnState,
        setShowVegaOnState,
        setShowGammaOnState,
        setShowDeltaOnState,
        setShowThetaOnState,
        setShowRhoOnState,
        setUnderlyingPrice,
        setStrike,
        setVolatility,
        setRiskFreeRate,
        setExpiryDays,
        setOptionPrice
    };
};


class Container extends React.Component <Props & DispatchProps> {

    constructor(props: Props & DispatchProps) {
        super(props);
    }

    public render(): React.ReactNode {
        return (
            <div className={'container'}>
                <div className={'pricer-container'}>
                    <div className={'checkbox-row'}>
                        <label className={'checkboxGroupLabel'}>Show:</label>
                        <label className={'checkboxLabel'}>
                            <input type="checkbox" value="showPut" checked={this.props.showPut === true}
                                   onChange={(event: any) => this.props.setShowPutOnState(event.target.checked)}/>
                            Put
                        </label>
                        <label className={'checkboxLabel'}>
                            <input type="checkbox" value="showCall" checked={this.props.showCall === true}
                                   onChange={(event: any) => this.props.setShowCallOnState(event.target.checked)}/>
                            Call
                        </label>
                        <label className={'checkboxLabel'}>
                            <input type="checkbox" value="showSell" checked={this.props.showSell === true}
                                   onChange={(event: any) => this.props.setShowSellOnState(event.target.checked)}/>
                            Sell
                        </label>
                    </div>
                    <div className={'checkbox-row'}>
                        <label className={'checkboxGroupLabel'}>Show:</label>
                        <label className={'checkboxLabel'}>
                            <input type="checkbox" value="showVega" checked={this.props.showVega === true}
                                   onChange={(event: any) => this.props.setShowVegaOnState(event.target.checked)}/>
                            Vega
                        </label>
                        <label className={'checkboxLabel'}>
                            <input type="checkbox" value="showGamma" checked={this.props.showGamma === true}
                                   onChange={(event: any) => this.props.setShowGammaOnState(event.target.checked)}/>
                            Gama
                        </label>
                        <label className={'checkboxLabel'}>
                            <input type="checkbox" value="showDelta" checked={this.props.showDelta === true}
                                   onChange={(event: any) => this.props.setShowDeltaOnState(event.target.checked)}/>
                            Delta
                        </label>
                        <label className={'checkboxLabel'}>
                            <input type="checkbox" value="showTheta" checked={this.props.showTheta === true}
                                   onChange={(event: any) => this.props.setShowThetaOnState(event.target.checked)}/>
                            Theta
                        </label>
                        <label className={'checkboxLabel'}>
                            <input type="checkbox" value="showRho" checked={this.props.showRho === true}
                                   onChange={(event: any) => this.props.setShowRhoOnState(event.target.checked)}/>
                            Rho
                        </label>
                    </div>
                    <div className={'slider-greeks-container'} key={'buy'}>
                        <OptionPricerSliderComponent
                            buySell={'buy'}
                            price={this.props.underlyingPrice}
                            strike={this.props.strike}
                            expiryDays={this.props.expiryDays}
                            volatility={this.props.volatility}
                            riskFreeRate={this.props.riskFreeRate}
                            setUnderlyingPrice={this.props.setUnderlyingPrice}
                            setStrike={this.props.setStrike}
                            setExpiryDays={this.props.setExpiryDays}
                            setVolatility={this.props.setVolatility}
                            setRiskFreeRate={this.props.setRiskFreeRate}
                        />
                        <OptionPricerGreeksComponent
                            buySell={'buy'}
                            optionPricer={this.props.optionPricer}
                            setOptionPrice={this.props.setOptionPrice}
                        />
                    </div>
                    <div className={'slider-greeks-container'} key={'sell'}>
                        <OptionPricerSliderComponent
                            buySell={'sell'}
                            price={this.props.underlyingPrice}
                            strike={this.props.strike}
                            expiryDays={this.props.expiryDays}
                            volatility={this.props.volatility}
                            riskFreeRate={this.props.riskFreeRate}
                            setUnderlyingPrice={this.props.setUnderlyingPrice}
                            setStrike={this.props.setStrike}
                            setExpiryDays={this.props.setExpiryDays}
                            setVolatility={this.props.setVolatility}
                            setRiskFreeRate={this.props.setRiskFreeRate}
                        />
                        <OptionPricerGreeksComponent
                            buySell={'sell'}
                            optionPricer={this.props.optionPricer}
                            setOptionPrice={this.props.setOptionPrice}
                        />
                    </div>
                </div>

                <div className={'chart-container'}>
                    <OptionPricerChartComponent
                        expiryDays={this.props.expiryDays}
                        showPut={this.props.showPut}
                        showCall={this.props.showCall}
                        optionPricer={this.props.optionPricer}
                        optionPricerTimeSeries={this.props.optionPricerTimeSeries}
                        showVega={this.props.showVega}
                        showGamma={this.props.showGamma}
                        showTheta={this.props.showTheta}
                        showDelta={this.props.showDelta}
                        showRho={this.props.showRho}/>
                </div>
            </div>
        );
    }
}

export const OptionPricerContainer = connect<Props, DispatchProps, {}>(mapStateToProps, mapDispatchToProps)(Container);
