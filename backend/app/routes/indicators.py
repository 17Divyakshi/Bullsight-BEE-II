from fastapi import APIRouter, HTTPException
from app.services.yahoo_service import fetch_history_from_yfinance
from app.indicators.technical import get_indicator_signals
from app.schemas.stock import StockIndicatorsResponse

router = APIRouter(prefix="/stocks", tags=["indicators"])

@router.get("/{symbol}/indicators", response_model=StockIndicatorsResponse)
def get_indicators(symbol: str):
    """
    Computes real mathematical technical indicators (RSI, MACD, SMA 20, EMA 20, Bollinger Bands) for symbol.
    """
    try:
        df = fetch_history_from_yfinance(symbol, timeframe='6M')
        signals = get_indicator_signals(df)
        return {
            "symbol": symbol.upper(),
            **signals
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error computing indicators for {symbol}: {str(e)}")
