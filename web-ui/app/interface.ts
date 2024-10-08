// utils/api.ts
export interface IFetchOptions {
  method?: string;
  headers?: { [key: string]: string };
  body?: object;
}

export interface IStockInfo {
  address1: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  phone: string;
  website: string;
  industry: string;
  industryKey: string;
  industryDisp: string;
  sector: string;
  sectorKey: string;
  sectorDisp: string;
  longBusinessSummary: string;
  fullTimeEmployees: number;
  auditRisk: number;
  boardRisk: number;
  compensationRisk: number;
  shareHolderRightsRisk: number;
  overallRisk: number;
  governanceEpochDate: number;
  compensationAsOfEpochDate: number;
  irWebsite: string;
  maxAge: number;
  priceHint: number;
  previousClose: number;
  open: number;
  dayLow: number;
  dayHigh: number;
  regularMarketPreviousClose: number;
  regularMarketOpen: number;
  regularMarketDayLow: number;
  regularMarketDayHigh: number;
  dividendRate: number;
  dividendYield: number;
  exDividendDate: number;
  payoutRatio: number;
  fiveYearAvgDividendYield: number;
  beta: number;
  trailingPE: number;
  forwardPE: number;
  volume: number;
  regularMarketVolume: number;
  averageVolume: number;
  averageVolume10days: number;
  averageDailyVolume10Day: number;
  bid: number;
  ask: number;
  bidSize: number;
  askSize: number;
  marketCap: number;
  fiftyTwoWeekLow: number;
  fiftyTwoWeekHigh: number;
  priceToSalesTrailing12Months: number;
  fiftyDayAverage: number;
  twoHundredDayAverage: number;
  trailingAnnualDividendRate: number;
  trailingAnnualDividendYield: number;
  currency: string;
  enterpriseValue: number;
  profitMargins: number;
  floatShares: number;
  sharesOutstanding: number;
  sharesShort: number;
  sharesShortPriorMonth: number;
  sharesShortPreviousMonthDate: number;
  dateShortInterest: number;
  sharesPercentSharesOut: number;
  heldPercentInsiders: number;
  heldPercentInstitutions: number;
  shortRatio: number;
  shortPercentOfFloat: number;
  impliedSharesOutstanding: number;
  bookValue: number;
  priceToBook: number;
  lastFiscalYearEnd: number;
  nextFiscalYearEnd: number;
  mostRecentQuarter: number;
  earningsQuarterlyGrowth: number;
  netIncomeToCommon: number;
  trailingEps: number;
  forwardEps: number;
  pegRatio: number;
  lastSplitFactor: string;
  lastSplitDate: number;
  enterpriseToRevenue: number;
  enterpriseToEbitda: number;
  fiftyTwoWeekChange: number;
  SandP52WeekChange: number;
  lastDividendValue: number;
  lastDividendDate: number;
  exchange: string;
  quoteType: string;
  symbol: string;
  underlyingSymbol: string;
  shortName: string;
  longName: string;
  firstTradeDateEpochUtc: number;
  timeZoneFullName: string;
  timeZoneShortName: string;
  uuid: string;
  messageBoardId: string;
  gmtOffSetMilliseconds: number;
  currentPrice: number;
  targetHighPrice: number;
  targetLowPrice: number;
  targetMeanPrice: number;
  targetMedianPrice: number;
  recommendationMean: number;
  recommendationKey: string;
  numberOfAnalystOpinions: number;
  totalCash: number;
  totalCashPerShare: number;
  ebitda: number;
  totalDebt: number;
  quickRatio: number;
  currentRatio: number;
  totalRevenue: number;
  debtToEquity: number;
  revenuePerShare: number;
  returnOnAssets: number;
  returnOnEquity: number;
  freeCashflow: number;
  operatingCashflow: number;
  earningsGrowth: number;
  revenueGrowth: number;
  grossMargins: number;
  ebitdaMargins: number;
  operatingMargins: number;
  financialCurrency: string;
  trailingPegRatio: number;
  news: INews[];
}

export interface INews {
  uuid: string;
  title: string;
  publisher: string;
  link: string;
  providerPublishTime: number;
  type: string;
  thumbnail: IThumbnail;
  relatedTickers: string[];
}

export interface IThumbnail {
  resolutions: IResolution[];
}

export interface IResolution {
  url: string;
  width: number;
  height: number;
  tag: string;
}

export interface IEnhancedStock {
  name: string;
  ticker: string;
  quantity: number;
  buy_price: number;
  current_price: number;
  profit_loss_percent: number;
}
