from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from app.db.database import get_db, engine, Base
from app.db.models import Watchlist, Portfolio, Holding, PredictionRecord

# Create database tables automatically on module load
Base.metadata.create_all(bind=engine)

router = APIRouter(prefix="/user", tags=["user_data"])

class WatchlistAddSchema(BaseModel):
    symbol: str

class HoldingAddSchema(BaseModel):
    symbol: str
    name: str
    quantity: float
    buy_price: float

@router.get("/watchlist")
def get_watchlist(db: Session = Depends(get_db)):
    records = db.query(Watchlist).all()
    if not records:
        return ["AAPL", "RELIANCE.NS", "NVDA", "TCS.NS"]
    return [r.symbol for r in records]

@router.post("/watchlist")
def add_watchlist(item: WatchlistAddSchema, db: Session = Depends(get_db)):
    existing = db.query(Watchlist).filter(Watchlist.symbol == item.symbol.upper()).first()
    if not existing:
        record = Watchlist(symbol=item.symbol.upper())
        db.add(record)
        db.commit()
        db.refresh(record)
    return {"status": "success", "symbol": item.symbol.upper()}

@router.delete("/watchlist/{symbol}")
def delete_watchlist(symbol: str, db: Session = Depends(get_db)):
    record = db.query(Watchlist).filter(Watchlist.symbol == symbol.upper()).first()
    if record:
        db.delete(record)
        db.commit()
    return {"status": "removed", "symbol": symbol.upper()}

@router.get("/portfolio")
def get_portfolio(db: Session = Depends(get_db)):
    holdings = db.query(Holding).all()
    if not holdings:
        return [
            {"symbol": "AAPL", "name": "Apple Inc.", "quantity": 15.0, "buy_price": 180.00},
            {"symbol": "RELIANCE.NS", "name": "Reliance Industries", "quantity": 50.0, "buy_price": 2850.00},
            {"symbol": "NVDA", "name": "NVIDIA Corp", "quantity": 10.0, "buy_price": 110.00}
        ]
    return [
        {
            "id": h.id,
            "symbol": h.symbol,
            "name": h.name,
            "quantity": h.quantity,
            "buy_price": h.buy_price
        }
        for h in holdings
    ]

@router.post("/portfolio")
def add_holding(item: HoldingAddSchema, db: Session = Depends(get_db)):
    holding = Holding(
        portfolio_id=1,
        symbol=item.symbol.upper(),
        name=item.name,
        quantity=item.quantity,
        buy_price=item.buy_price
    )
    db.add(holding)
    db.commit()
    db.refresh(holding)
    return {"status": "holding_added", "id": holding.id}

@router.delete("/portfolio/{identifier}")
def delete_holding(identifier: str, db: Session = Depends(get_db)):
    # Try finding by ID if integer, otherwise by symbol
    holding = None
    if identifier.isdigit():
        holding = db.query(Holding).filter(Holding.id == int(identifier)).first()
    if not holding:
        holding = db.query(Holding).filter(Holding.symbol == identifier.upper()).first()
    if holding:
        db.delete(holding)
        db.commit()
        return {"status": "removed", "identifier": identifier}
    return {"status": "not_found", "identifier": identifier}

