"""
Bullsight Stock Universe Catalog
Comprehensive catalog of high-liquidity equities across US Tech, Blue Chips, Indian NIFTY 50 (NSE), and Global ETFs/Cryptos.
"""

STOCKS_CATALOG = [
    # US Tech Giants & Growth
    {
        "symbol": "AAPL",
        "name": "Apple Inc.",
        "exchange": "NASDAQ",
        "market": "US",
        "country": "US",
        "sector": "Technology",
        "currency": "USD",
        "base_price": 195.89,
        "is_popular": True
    },
    {
        "symbol": "MSFT",
        "name": "Microsoft Corporation",
        "exchange": "NASDAQ",
        "market": "US",
        "country": "US",
        "sector": "Technology",
        "currency": "USD",
        "base_price": 422.80,
        "is_popular": True
    },
    {
        "symbol": "NVDA",
        "name": "NVIDIA Corporation",
        "exchange": "NASDAQ",
        "market": "US",
        "country": "US",
        "sector": "Semiconductors",
        "currency": "USD",
        "base_price": 128.60,
        "is_popular": True
    },
    {
        "symbol": "GOOGL",
        "name": "Alphabet Inc. (Google)",
        "exchange": "NASDAQ",
        "market": "US",
        "country": "US",
        "sector": "Technology",
        "currency": "USD",
        "base_price": 178.50,
        "is_popular": True
    },
    {
        "symbol": "AMZN",
        "name": "Amazon.com Inc.",
        "exchange": "NASDAQ",
        "market": "US",
        "country": "US",
        "sector": "Consumer Discretionary",
        "currency": "USD",
        "base_price": 184.20,
        "is_popular": True
    },
    {
        "symbol": "META",
        "name": "Meta Platforms Inc.",
        "exchange": "NASDAQ",
        "market": "US",
        "country": "US",
        "sector": "Communication Services",
        "currency": "USD",
        "base_price": 505.40,
        "is_popular": True
    },
    {
        "symbol": "TSLA",
        "name": "Tesla, Inc.",
        "exchange": "NASDAQ",
        "market": "US",
        "country": "US",
        "sector": "Automotive & Energy",
        "currency": "USD",
        "base_price": 218.40,
        "is_popular": True
    },
    {
        "symbol": "AMD",
        "name": "Advanced Micro Devices",
        "exchange": "NASDAQ",
        "market": "US",
        "country": "US",
        "sector": "Semiconductors",
        "currency": "USD",
        "base_price": 154.20,
        "is_popular": False
    },
    {
        "symbol": "NFLX",
        "name": "Netflix, Inc.",
        "exchange": "NASDAQ",
        "market": "US",
        "country": "US",
        "sector": "Entertainment",
        "currency": "USD",
        "base_price": 685.10,
        "is_popular": False
    },
    {
        "symbol": "PLTR",
        "name": "Palantir Technologies",
        "exchange": "NYSE",
        "market": "US",
        "country": "US",
        "sector": "Software & AI",
        "currency": "USD",
        "base_price": 31.80,
        "is_popular": False
    },
    {
        "symbol": "INTC",
        "name": "Intel Corporation",
        "exchange": "NASDAQ",
        "market": "US",
        "country": "US",
        "sector": "Semiconductors",
        "currency": "USD",
        "base_price": 22.40,
        "is_popular": False
    },
    {
        "symbol": "CRM",
        "name": "Salesforce, Inc.",
        "exchange": "NYSE",
        "market": "US",
        "country": "US",
        "sector": "Software",
        "currency": "USD",
        "base_price": 265.50,
        "is_popular": False
    },
    {
        "symbol": "ORCL",
        "name": "Oracle Corporation",
        "exchange": "NYSE",
        "market": "US",
        "country": "US",
        "sector": "Cloud Infrastructure",
        "currency": "USD",
        "base_price": 142.30,
        "is_popular": False
    },
    {
        "symbol": "ADBE",
        "name": "Adobe Inc.",
        "exchange": "NASDAQ",
        "market": "US",
        "country": "US",
        "sector": "Software",
        "currency": "USD",
        "base_price": 540.60,
        "is_popular": False
    },
    {
        "symbol": "UBER",
        "name": "Uber Technologies Inc.",
        "exchange": "NYSE",
        "market": "US",
        "country": "US",
        "sector": "Mobility & Delivery",
        "currency": "USD",
        "base_price": 74.80,
        "is_popular": False
    },

    # US Blue Chips & Financials
    {
        "symbol": "JPM",
        "name": "JPMorgan Chase & Co.",
        "exchange": "NYSE",
        "market": "US",
        "country": "US",
        "sector": "Banking & Finance",
        "currency": "USD",
        "base_price": 218.60,
        "is_popular": True
    },
    {
        "symbol": "V",
        "name": "Visa Inc.",
        "exchange": "NYSE",
        "market": "US",
        "country": "US",
        "sector": "Payment Services",
        "currency": "USD",
        "base_price": 278.40,
        "is_popular": False
    },
    {
        "symbol": "WMT",
        "name": "Walmart Inc.",
        "exchange": "NYSE",
        "market": "US",
        "country": "US",
        "sector": "Retail & Consumer",
        "currency": "USD",
        "base_price": 76.50,
        "is_popular": False
    },
    {
        "symbol": "DIS",
        "name": "The Walt Disney Company",
        "exchange": "NYSE",
        "market": "US",
        "country": "US",
        "sector": "Entertainment",
        "currency": "USD",
        "base_price": 94.20,
        "is_popular": False
    },
    {
        "symbol": "KO",
        "name": "The Coca-Cola Company",
        "exchange": "NYSE",
        "market": "US",
        "country": "US",
        "sector": "Consumer Staples",
        "currency": "USD",
        "base_price": 68.90,
        "is_popular": False
    },
    {
        "symbol": "BAC",
        "name": "Bank of America Corp.",
        "exchange": "NYSE",
        "market": "US",
        "country": "US",
        "sector": "Banking & Finance",
        "currency": "USD",
        "base_price": 40.15,
        "is_popular": False
    },

    # Indian NIFTY 50 Giants (NSE India)
    {
        "symbol": "RELIANCE.NS",
        "name": "Reliance Industries Ltd.",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Conglomerate & Energy",
        "currency": "INR",
        "base_price": 2980.50,
        "is_popular": True
    },
    {
        "symbol": "TCS.NS",
        "name": "Tata Consultancy Services",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "IT & Consulting",
        "currency": "INR",
        "base_price": 4120.75,
        "is_popular": True
    },
    {
        "symbol": "INFY.NS",
        "name": "Infosys Limited",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "IT & Consulting",
        "currency": "INR",
        "base_price": 1785.30,
        "is_popular": True
    },
    {
        "symbol": "HDFCBANK.NS",
        "name": "HDFC Bank Limited",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Banking & Finance",
        "currency": "INR",
        "base_price": 1645.20,
        "is_popular": True
    },
    {
        "symbol": "ICICIBANK.NS",
        "name": "ICICI Bank Limited",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Banking & Finance",
        "currency": "INR",
        "base_price": 1215.80,
        "is_popular": False
    },
    {
        "symbol": "SBIN.NS",
        "name": "State Bank of India",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Banking & Finance",
        "currency": "INR",
        "base_price": 815.40,
        "is_popular": False
    },
    {
        "symbol": "BHARTIARTL.NS",
        "name": "Bharti Airtel Limited",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Telecom Services",
        "currency": "INR",
        "base_price": 1565.00,
        "is_popular": False
    },
    {
        "symbol": "ITC.NS",
        "name": "ITC Limited",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Consumer Goods & Hotels",
        "currency": "INR",
        "base_price": 498.20,
        "is_popular": False
    },
    {
        "symbol": "TATAMOTORS.NS",
        "name": "Tata Motors Limited",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Automotive",
        "currency": "INR",
        "base_price": 985.60,
        "is_popular": True
    },
    {
        "symbol": "LT.NS",
        "name": "Larsen & Toubro Ltd.",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Infrastructure & Engineering",
        "currency": "INR",
        "base_price": 3620.00,
        "is_popular": False
    },
    {
        "symbol": "WIPRO.NS",
        "name": "Wipro Limited",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "IT Services",
        "currency": "INR",
        "base_price": 525.40,
        "is_popular": False
    },
    {
        "symbol": "HINDUNILVR.NS",
        "name": "Hindustan Unilever Ltd.",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Consumer Goods",
        "currency": "INR",
        "base_price": 2780.00,
        "is_popular": False
    },
    {
        "symbol": "BAJFINANCE.NS",
        "name": "Bajaj Finance Limited",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Financial Services",
        "currency": "INR",
        "base_price": 7250.00,
        "is_popular": False
    },
    {
        "symbol": "KOTAKBANK.NS",
        "name": "Kotak Mahindra Bank",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Banking",
        "currency": "INR",
        "base_price": 1820.00,
        "is_popular": False
    },
    {
        "symbol": "SUNPHARMA.NS",
        "name": "Sun Pharmaceutical Industries",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Pharmaceuticals",
        "currency": "INR",
        "base_price": 1810.00,
        "is_popular": False
    },
    {
        "symbol": "TITAN.NS",
        "name": "Titan Company Limited",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Consumer Luxury & Retail",
        "currency": "INR",
        "base_price": 3680.00,
        "is_popular": False
    },
    {
        "symbol": "ADANIENT.NS",
        "name": "Adani Enterprises Ltd.",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Conglomerate",
        "currency": "INR",
        "base_price": 3140.00,
        "is_popular": False
    },
    {
        "symbol": "MARUTI.NS",
        "name": "Maruti Suzuki India Ltd.",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Automotive",
        "currency": "INR",
        "base_price": 12850.00,
        "is_popular": False
    },
    {
        "symbol": "AXISBANK.NS",
        "name": "Axis Bank Limited",
        "exchange": "NSE India",
        "market": "INDIAN",
        "country": "IN",
        "sector": "Banking & Finance",
        "currency": "INR",
        "base_price": 1220.00,
        "is_popular": False
    },

    # Global Major ETFs & Cryptocurrencies
    {
        "symbol": "SPY",
        "name": "SPDR S&P 500 ETF Trust",
        "exchange": "NYSE Arca",
        "market": "US",
        "country": "US",
        "sector": "Index ETF",
        "currency": "USD",
        "base_price": 560.40,
        "is_popular": True
    },
    {
        "symbol": "QQQ",
        "name": "Invesco QQQ Trust (Nasdaq 100)",
        "exchange": "NASDAQ",
        "market": "US",
        "country": "US",
        "sector": "Index ETF",
        "currency": "USD",
        "base_price": 478.20,
        "is_popular": True
    },
    {
        "symbol": "BTC-USD",
        "name": "Bitcoin USD",
        "exchange": "Crypto",
        "market": "CRYPTO",
        "country": "GLOBAL",
        "sector": "Cryptocurrency",
        "currency": "USD",
        "base_price": 67450.00,
        "is_popular": True
    },
    {
        "symbol": "ETH-USD",
        "name": "Ethereum USD",
        "exchange": "Crypto",
        "market": "CRYPTO",
        "country": "GLOBAL",
        "sector": "Cryptocurrency",
        "currency": "USD",
        "base_price": 2680.00,
        "is_popular": False
    }
]


def get_all_stocks():
    return STOCKS_CATALOG


def get_stock_by_symbol(symbol: str):
    sym = symbol.upper()
    for s in STOCKS_CATALOG:
        if s["symbol"].upper() == sym:
            return s
    return None


def search_stocks(query: str):
    q = query.strip().lower()
    if not q:
        return STOCKS_CATALOG
    return [
        s for s in STOCKS_CATALOG
        if q in s["symbol"].lower() or q in s["name"].lower() or q in s["sector"].lower()
    ]
