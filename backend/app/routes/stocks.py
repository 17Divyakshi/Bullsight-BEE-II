from fastapi import APIRouter, HTTPException, Query
from app.services.yahoo_service import get_stock_summary, get_stock_history
from app.schemas.stock import StockSummaryResponse, StockHistoryResponse

from app.db.stocks_data import get_all_stocks, search_stocks, get_stock_by_symbol

router = APIRouter(prefix="/stocks", tags=["stocks"])

@router.get("")
@router.get("/catalog")
def get_catalog():
    """
    Returns the comprehensive catalog of 40+ supported equities across US Tech, Blue Chips, Indian NIFTY 50, and ETFs/Crypto.
    """
    return get_all_stocks()


@router.get("/search")
def search_catalog(q: str = Query("", description="Query ticker, company name, or sector")):
    """
    Searches the stock catalog by query string.
    """
    return search_stocks(q)


@router.get("/{symbol}", response_model=StockSummaryResponse)
def get_summary(symbol: str):
    """
    Returns real-time stock price summary, 24h change, volume, high, low, market cap, and P/E ratio.
    """
    try:
        data = get_stock_summary(symbol)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching stock summary for {symbol}: {str(e)}")


@router.get("/{symbol}/history", response_model=StockHistoryResponse)
def get_history(symbol: str, timeframe: str = Query('3M', description="Timeframe: 1D, 5D, 1M, 3M, 6M, 1Y, 5Y, MAX")):
    """
    Returns historical daily OHLCV candles with SMA 20 and SMA 50 technical overlays.
    """
    try:
        records = get_stock_history(symbol, timeframe)
        return {
            "symbol": symbol.upper(),
            "timeframe": timeframe.upper(),
            "history": records
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching history for {symbol}: {str(e)}")
