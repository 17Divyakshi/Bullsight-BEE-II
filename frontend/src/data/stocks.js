// Bullsight Curated Multi-Market Stock Universe

export const STOCKS = [
  // US Tech Giants & Growth
  {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    exchange: 'NASDAQ',
    market: 'US',
    country: 'US',
    sector: 'Technology',
    currency: 'USD',
    basePrice: 195.89,
    isPopular: true
  },
  {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    exchange: 'NASDAQ',
    market: 'US',
    country: 'US',
    sector: 'Technology',
    currency: 'USD',
    basePrice: 422.80,
    isPopular: true
  },
  {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    exchange: 'NASDAQ',
    market: 'US',
    country: 'US',
    sector: 'Semiconductors',
    currency: 'USD',
    basePrice: 128.60,
    isPopular: true
  },
  {
    symbol: 'GOOGL',
    name: 'Alphabet Inc. (Google)',
    exchange: 'NASDAQ',
    market: 'US',
    country: 'US',
    sector: 'Technology',
    currency: 'USD',
    basePrice: 178.50,
    isPopular: true
  },
  {
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    exchange: 'NASDAQ',
    market: 'US',
    country: 'US',
    sector: 'Consumer Discretionary',
    currency: 'USD',
    basePrice: 184.20,
    isPopular: true
  },
  {
    symbol: 'META',
    name: 'Meta Platforms Inc.',
    exchange: 'NASDAQ',
    market: 'US',
    country: 'US',
    sector: 'Communication Services',
    currency: 'USD',
    basePrice: 505.40,
    isPopular: true
  },
  {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    exchange: 'NASDAQ',
    market: 'US',
    country: 'US',
    sector: 'Automotive & Clean Energy',
    currency: 'USD',
    basePrice: 218.40,
    isPopular: true
  },
  {
    symbol: 'AMD',
    name: 'Advanced Micro Devices',
    exchange: 'NASDAQ',
    market: 'US',
    country: 'US',
    sector: 'Semiconductors',
    currency: 'USD',
    basePrice: 154.20,
    isPopular: false
  },
  {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    exchange: 'NASDAQ',
    market: 'US',
    country: 'US',
    sector: 'Entertainment',
    currency: 'USD',
    basePrice: 685.10,
    isPopular: false
  },
  {
    symbol: 'PLTR',
    name: 'Palantir Technologies',
    exchange: 'NYSE',
    market: 'US',
    country: 'US',
    sector: 'Software & AI',
    currency: 'USD',
    basePrice: 31.80,
    isPopular: false
  },
  {
    symbol: 'INTC',
    name: 'Intel Corporation',
    exchange: 'NASDAQ',
    market: 'US',
    country: 'US',
    sector: 'Semiconductors',
    currency: 'USD',
    basePrice: 22.40,
    isPopular: false
  },
  {
    symbol: 'CRM',
    name: 'Salesforce, Inc.',
    exchange: 'NYSE',
    market: 'US',
    country: 'US',
    sector: 'Software',
    currency: 'USD',
    basePrice: 265.50,
    isPopular: false
  },
  {
    symbol: 'ORCL',
    name: 'Oracle Corporation',
    exchange: 'NYSE',
    market: 'US',
    country: 'US',
    sector: 'Cloud Infrastructure',
    currency: 'USD',
    basePrice: 142.30,
    isPopular: false
  },
  {
    symbol: 'ADBE',
    name: 'Adobe Inc.',
    exchange: 'NASDAQ',
    market: 'US',
    country: 'US',
    sector: 'Software',
    currency: 'USD',
    basePrice: 540.60,
    isPopular: false
  },
  {
    symbol: 'UBER',
    name: 'Uber Technologies Inc.',
    exchange: 'NYSE',
    market: 'US',
    country: 'US',
    sector: 'Mobility & Delivery',
    currency: 'USD',
    basePrice: 74.80,
    isPopular: false
  },

  // US Blue Chips & Financials
  {
    symbol: 'JPM',
    name: 'JPMorgan Chase & Co.',
    exchange: 'NYSE',
    market: 'US',
    country: 'US',
    sector: 'Banking & Finance',
    currency: 'USD',
    basePrice: 218.60,
    isPopular: true
  },
  {
    symbol: 'V',
    name: 'Visa Inc.',
    exchange: 'NYSE',
    market: 'US',
    country: 'US',
    sector: 'Payment Services',
    currency: 'USD',
    basePrice: 278.40,
    isPopular: false
  },
  {
    symbol: 'WMT',
    name: 'Walmart Inc.',
    exchange: 'NYSE',
    market: 'US',
    country: 'US',
    sector: 'Retail & Consumer',
    currency: 'USD',
    basePrice: 76.50,
    isPopular: false
  },
  {
    symbol: 'DIS',
    name: 'The Walt Disney Company',
    exchange: 'NYSE',
    market: 'US',
    country: 'US',
    sector: 'Entertainment',
    currency: 'USD',
    basePrice: 94.20,
    isPopular: false
  },
  {
    symbol: 'KO',
    name: 'The Coca-Cola Company',
    exchange: 'NYSE',
    market: 'US',
    country: 'US',
    sector: 'Consumer Staples',
    currency: 'USD',
    basePrice: 68.90,
    isPopular: false
  },
  {
    symbol: 'BAC',
    name: 'Bank of America Corp.',
    exchange: 'NYSE',
    market: 'US',
    country: 'US',
    sector: 'Banking & Finance',
    currency: 'USD',
    basePrice: 40.15,
    isPopular: false
  },

  // Indian NIFTY 50 Giants (NSE India)
  {
    symbol: 'RELIANCE.NS',
    name: 'Reliance Industries Ltd.',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Energy & Retail',
    currency: 'INR',
    basePrice: 2980.50,
    isPopular: true
  },
  {
    symbol: 'TCS.NS',
    name: 'Tata Consultancy Services',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'IT & Consulting',
    currency: 'INR',
    basePrice: 4120.75,
    isPopular: true
  },
  {
    symbol: 'INFY.NS',
    name: 'Infosys Limited',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'IT & Consulting',
    currency: 'INR',
    basePrice: 1785.30,
    isPopular: true
  },
  {
    symbol: 'HDFCBANK.NS',
    name: 'HDFC Bank Limited',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Banking & Finance',
    currency: 'INR',
    basePrice: 1645.20,
    isPopular: true
  },
  {
    symbol: 'ICICIBANK.NS',
    name: 'ICICI Bank Limited',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Banking & Finance',
    currency: 'INR',
    basePrice: 1215.80,
    isPopular: false
  },
  {
    symbol: 'SBIN.NS',
    name: 'State Bank of India',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Banking & Finance',
    currency: 'INR',
    basePrice: 815.40,
    isPopular: false
  },
  {
    symbol: 'BHARTIARTL.NS',
    name: 'Bharti Airtel Limited',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Telecom Services',
    currency: 'INR',
    basePrice: 1565.00,
    isPopular: false
  },
  {
    symbol: 'ITC.NS',
    name: 'ITC Limited',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Consumer Goods & Hotels',
    currency: 'INR',
    basePrice: 498.20,
    isPopular: false
  },
  {
    symbol: 'TATAMOTORS.NS',
    name: 'Tata Motors Limited',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Automotive',
    currency: 'INR',
    basePrice: 985.60,
    isPopular: true
  },
  {
    symbol: 'LT.NS',
    name: 'Larsen & Toubro Ltd.',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Engineering & Construction',
    currency: 'INR',
    basePrice: 3620.00,
    isPopular: false
  },
  {
    symbol: 'WIPRO.NS',
    name: 'Wipro Limited',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'IT Services',
    currency: 'INR',
    basePrice: 525.40,
    isPopular: false
  },
  {
    symbol: 'HINDUNILVR.NS',
    name: 'Hindustan Unilever Ltd.',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Consumer Goods',
    currency: 'INR',
    basePrice: 2780.00,
    isPopular: false
  },
  {
    symbol: 'BAJFINANCE.NS',
    name: 'Bajaj Finance Limited',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Financial Services',
    currency: 'INR',
    basePrice: 7250.00,
    isPopular: false
  },
  {
    symbol: 'KOTAKBANK.NS',
    name: 'Kotak Mahindra Bank',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Banking',
    currency: 'INR',
    basePrice: 1820.00,
    isPopular: false
  },
  {
    symbol: 'SUNPHARMA.NS',
    name: 'Sun Pharmaceutical Industries',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Pharmaceuticals',
    currency: 'INR',
    basePrice: 1810.00,
    isPopular: false
  },
  {
    symbol: 'TITAN.NS',
    name: 'Titan Company Limited',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Consumer Luxury & Retail',
    currency: 'INR',
    basePrice: 3680.00,
    isPopular: false
  },
  {
    symbol: 'ADANIENT.NS',
    name: 'Adani Enterprises Ltd.',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Conglomerate & Ports',
    currency: 'INR',
    basePrice: 3140.00,
    isPopular: false
  },
  {
    symbol: 'MARUTI.NS',
    name: 'Maruti Suzuki India Ltd.',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Automotive',
    currency: 'INR',
    basePrice: 12850.00,
    isPopular: false
  },
  {
    symbol: 'AXISBANK.NS',
    name: 'Axis Bank Limited',
    exchange: 'NSE India',
    market: 'INDIAN',
    country: 'IN',
    sector: 'Banking & Finance',
    currency: 'INR',
    basePrice: 1220.00,
    isPopular: false
  },

  // Global Major ETFs & Cryptocurrencies
  {
    symbol: 'SPY',
    name: 'SPDR S&P 500 ETF Trust',
    exchange: 'NYSE Arca',
    market: 'US',
    country: 'US',
    sector: 'Index ETF',
    currency: 'USD',
    basePrice: 560.40,
    isPopular: true
  },
  {
    symbol: 'QQQ',
    name: 'Invesco QQQ Trust (Nasdaq 100)',
    exchange: 'NASDAQ',
    market: 'US',
    country: 'US',
    sector: 'Index ETF',
    currency: 'USD',
    basePrice: 478.20,
    isPopular: true
  },
  {
    symbol: 'BTC-USD',
    name: 'Bitcoin USD',
    exchange: 'Crypto',
    market: 'CRYPTO',
    country: 'GLOBAL',
    sector: 'Cryptocurrency',
    currency: 'USD',
    basePrice: 67450.00,
    isPopular: true
  },
  {
    symbol: 'ETH-USD',
    name: 'Ethereum USD',
    exchange: 'Crypto',
    market: 'CRYPTO',
    country: 'GLOBAL',
    sector: 'Cryptocurrency',
    currency: 'USD',
    basePrice: 2680.00,
    isPopular: false
  }
];

export const POPULAR_CHIPS = [
  'AAPL',
  'NVDA',
  'TSLA',
  'MSFT',
  'GOOGL',
  'AMZN',
  'RELIANCE.NS',
  'TCS.NS',
  'HDFCBANK.NS',
  'TATAMOTORS.NS',
  'BTC-USD',
  'SPY'
];

export function getAllStocks() {
  return STOCKS;
}

export function getPopularStocks() {
  return STOCKS.filter(s => s.isPopular);
}

export function getStockBySymbol(symbol) {
  if (!symbol) return null;
  const sym = symbol.toUpperCase();
  return STOCKS.find(s => s.symbol.toUpperCase() === sym) || null;
}

export function searchStocks(query) {
  if (!query) return STOCKS;
  const q = query.trim().toLowerCase();
  return STOCKS.filter(
    s =>
      s.symbol.toLowerCase().includes(q) ||
      s.name.toLowerCase().includes(q) ||
      s.sector.toLowerCase().includes(q)
  );
}
