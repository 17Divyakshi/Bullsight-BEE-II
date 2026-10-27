from pydantic import BaseModel, Field
from typing import List, Optional

class StockSummaryResponse(BaseModel):
    symbol: str
    name: str
    price: float
    change: float
    changePercent: float
    volume: str
    high: float
    low: float
    marketCap: str
    peRatio: Optional[float] = None
    openPrice: float

class PricePoint(BaseModel):
    date: str
    open: float
    high: float
    low: float
    close: float
    volume: int
    sma20: Optional[float] = None
    sma50: Optional[float] = None

class StockHistoryResponse(BaseModel):
    symbol: str
    timeframe: str
    history: List[PricePoint]

class IndicatorValue(BaseModel):
    value: Optional[float] = None
    signal: str

class BollingerValue(BaseModel):
    middle: Optional[float] = None
    upper: Optional[float] = None
    lower: Optional[float] = None
    position: Optional[float] = None
    signal: str

class StockIndicatorsResponse(BaseModel):
    symbol: str
    rsi: IndicatorValue
    macd: dict
    sma20: IndicatorValue
    ema20: IndicatorValue
    bollinger: BollingerValue

class PredictionPoint(BaseModel):
    date: str
    predictedPrice: float
    upperBound: float
    lowerBound: float

class StockPredictionResponse(BaseModel):
    symbol: str
    current_price: float
    predicted_price: float
    predicted_change_percent: float
    trend: str
    signal: str
    confidence: float
    model: str
    horizon_days: int
    forecast_points: List[PredictionPoint]
    mae: Optional[float] = None
    r2_score: Optional[float] = None
    mape: Optional[float] = None

class MarketIndexItem(BaseModel):
    name: str
    value: str
    change: str
    changePercent: str
    isPositive: bool

class ScreenerItem(BaseModel):
    symbol: str
    name: str
    price: float
    changePercent: float
    volume: str
    marketCap: str
    rsi: str
    macdSignal: str
    aiPredictionPct: str
    signal: str
    sector: Optional[str] = None
    exchange: Optional[str] = None
    market: Optional[str] = None

class NewsArticle(BaseModel):
    id: str
    title: str
    source: str
    time: str
    sentiment: str
    sentimentScore: float
    symbol: Optional[str] = None
    url: Optional[str] = None

class NewsResponse(BaseModel):
    configured: bool
    message: str
    articles: List[NewsArticle]

class AIChatRequest(BaseModel):
    message: str
    context_symbol: Optional[str] = 'AAPL'

class AIChatResponse(BaseModel):
    reply: str
    sources: List[str]
    isFallback: bool

class ModelMetricsResponse(BaseModel):
    model_name: str
    architecture: str
    lookback_window: int
    mae: float
    mse: float
    rmse: float
    r2_score: float
    training_samples: int
    last_updated: str

class SettingsRequest(BaseModel):
    news_api_key: Optional[str] = None
    openai_api_key: Optional[str] = None

class SettingsResponse(BaseModel):
    news_api_configured: bool
    news_api_key_masked: Optional[str] = None
    openai_api_configured: bool
    openai_api_key_masked: Optional[str] = None
    lstm_lookback_window: int = 60
    lstm_epochs: int = 20
    lstm_batch_size: int = 32
    lstm_units: int = 64
    lstm_layers: int = 2
