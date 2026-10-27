from fastapi import APIRouter, HTTPException, Query
from app.ml.predict import generate_stock_prediction
from app.schemas.stock import StockPredictionResponse

router = APIRouter(tags=["predictions"])

@router.get("/predictions/{symbol}", response_model=StockPredictionResponse)
@router.get("/stocks/{symbol}/prediction", response_model=StockPredictionResponse)
def get_prediction(symbol: str, horizon: int = Query(7, description="Forecast horizon in days (7, 14, 30)")):
    """
    Ingests historical price sequences into the LSTM Neural Network to predict target price,
    expected change %, trend (BULLISH/BEARISH), AI signal (BUY/HOLD/SELL), and confidence score.
    """
    try:
        data = generate_stock_prediction(symbol, horizon_days=horizon)
        return data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error generating AI prediction for {symbol}: {str(e)}")
