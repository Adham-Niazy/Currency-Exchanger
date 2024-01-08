export type CurrencySymbols = {
  [symbol: string]: string;
}

export type ExchangeRateResponse = {
  base: string;
  date: string;
  rates: {
    [currencyCode: string]: number;
  };
  success: boolean;
  timestamp: number;
}