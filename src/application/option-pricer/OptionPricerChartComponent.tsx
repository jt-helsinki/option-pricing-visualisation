import * as React from 'react';
import { OptionPricer } from '../../common';
import { Bar, CartesianGrid, ComposedChart, Legend, Line, ReferenceLine, Tooltip, XAxis, YAxis } from 'recharts';
import { BuySellType, GreeksType, OptionPricerStateType } from '../../types';
import { capitaliseFirstLetter } from '../../utils';

interface Props {

    expiryDays: OptionPricerStateType<number>;

    optionPricer: OptionPricerStateType<OptionPricer>;

    optionPricerTimeSeries: OptionPricer[];

    showPut: boolean;

    showCall: boolean;

    showVega: boolean;

    showGamma: boolean;

    showTheta: boolean;

    showDelta: boolean;

    showRho: boolean;

}

export class OptionPricerChartComponent extends React.PureComponent<Props> {

    private prices: any[] = [];

    constructor(props: Props) {
        super(props);
    }

    render(): React.ReactNode {
        this.prices = this.setupPrices();
        return (
            <div>
                <div className={'chart-header'}>Prices vs Time Decay</div>
                <ComposedChart width={900} height={650} data={this.prices}
                               margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                    <CartesianGrid strokeDasharray='1 2'/>
                    <XAxis label={'Time'} dataKey='days' height={60}/>
                    <YAxis yAxisId="left" orientation="left" stroke="#8884d8"/>
                    <YAxis yAxisId="right" orientation="right" stroke="#82ca9d"/>
                    <YAxis/>
                    <Tooltip/>
                    <Legend/>
                    {this.referenceLine('buy', 'put', 'left', 'lightsalmon')}
                    {this.referenceLine('buy', 'call', 'left', 'lightskyblue')}
                    {this.referenceLine('sell', 'put', 'left', 'lightsalmon')}
                    {this.referenceLine('sell', 'call', 'left', 'lightskyblue')}
                    {this.bar('put', 'left', 'lightsalmon')}
                    {this.bar('call', 'left', 'lightskyblue')}
                    {this.greekLine('theta', 'put', 'right', 'mediumpurple')}
                    {this.greekLine('theta', 'call', 'right', 'mediumorchid')}
                    {this.greekLine('rho', 'put', 'right', 'mediumspringgreen')}
                    {this.greekLine('rho', 'call', 'right', 'mediumturquoise')}
                    {this.greekLine('delta', 'put', 'right', 'blueviolet')}
                    {this.greekLine('delta', 'call', 'right', 'darkviolet')}
                    {this.greekLine('vega', '', 'right', 'lightskyblue')}
                    {this.greekLine('gamma', '', 'right', 'lightskyblue')}
                </ComposedChart>
            </div>
        );
    }

    private setupPrices(): any[] {
        const optionPricerTimeSeriesLength: number = this.props.optionPricerTimeSeries.length;
        return this.props.optionPricerTimeSeries.map((optionPricer: OptionPricer, index: number) => {
            return {
                putPrice: optionPricer.blackScholes('put'),
                callPrice: optionPricer.blackScholes('call'),
                gamma: optionPricer.gamma(),
                vega: optionPricer.vega(),
                thetaPut: optionPricer.theta('put'),
                thetaCall: optionPricer.theta('call'),
                rhoPut: optionPricer.rho('put'),
                rhoCall: optionPricer.rho('call'),
                deltaPut: optionPricer.delta('put'),
                deltaCall: optionPricer.delta('call'),
                days: optionPricerTimeSeriesLength - index
            };
        })
    }

    private referenceLine(buySell: BuySellType, callPut: 'call' | 'put', axis: 'left' | 'right', colour: string): any {
        const optionPricerPurcahsePrice: number = this.props.optionPricer[buySell].blackScholes(callPut);
        // are we showing puts, calls or both?
        if ((callPut === 'call' && this.props.showCall === false) || (callPut === 'put' && this.props.showPut === false)) {
            return null;
        }
        // don't show the line if the expiry days are the same
        if (buySell === 'sell' && this.props.expiryDays['buy'] === this.props.expiryDays['sell']) {
            return null; // we need at least one line so block the sell.
        }
        return (
            <ReferenceLine
                y={optionPricerPurcahsePrice}
                yAxisId={axis}
                stroke={colour}
            />
        )
    }

    private bar(callPut: 'call' | 'put', axis: 'left' | 'right', colour: string): any {
        // are we showing puts, calls or both?
        if ((callPut === 'call' && this.props.showCall === false) || (callPut === 'put' && this.props.showPut === false)) {
            return null;
        }
        return (
            <Bar
                name={`${capitaliseFirstLetter(callPut)} Price`}
                isAnimationActive={false}
                dataKey={`${callPut}Price`}
                yAxisId={axis}
                fill={colour}/>
        )
    }

    private greekLine(greek: GreeksType, callPutNull: 'call' | 'put' | '', axis: 'left' | 'right', colour: string): any {
        // are we showing puts, calls or both?
        if ((callPutNull === 'call' && this.props.showCall === false) || (callPutNull === 'put' && this.props.showPut === false)) {
            return null;
        }
        console.log(this.props[`show${capitaliseFirstLetter(greek)}`]);
        if (this.props[`show${capitaliseFirstLetter(greek)}`] === false) {
            return null;
        }

        const greekProperty: string = callPutNull === null ? greek : `${greek}${capitaliseFirstLetter(callPutNull)}`

        return (
            <Line
                name={` ${capitaliseFirstLetter(callPutNull)} ${capitaliseFirstLetter(greek)}`.trim()}
                isAnimationActive={false}
                dataKey={greekProperty}
                yAxisId={axis}
                fill={colour}/>
        )
    }

}