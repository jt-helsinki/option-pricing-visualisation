export type GreeksType = 'vega' | 'gamma' | 'delta' | 'rho' | 'theta';

export type PutCallBothType = 'put' | 'call' | 'both';

export type BuySellType = 'buy' | 'sell';

export type OptionPricerStateType<T> = {
    [K in BuySellType]: T;
};
