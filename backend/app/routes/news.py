from fastapi import APIRouter, HTTPException
from app.services.news_service import get_financial_news
from app.schemas.stock import NewsResponse

router = APIRouter(tags=["news"])

@router.get("/news/{symbol}", response_model=NewsResponse)
@router.get("/news", response_model=NewsResponse)
def get_news(symbol: str = 'ALL'):
    """
    Returns market news and NLP sentiment scoring. Gracefully handles unconfigured NEWS_API_KEY.
    """
    try:
        return get_financial_news(symbol)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error fetching news: {str(e)}")
