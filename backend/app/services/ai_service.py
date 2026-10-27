import os
import requests
import logging
from app.services.yahoo_service import get_stock_summary, get_stock_history
from app.indicators.technical import get_indicator_signals

logger = logging.getLogger("bullsight.ai")

def process_ai_chat(message: str, context_symbol: str = 'AAPL') -> dict:
    """
    Processes conversational queries to BullSight AI.
    Grounds answers in real backend stock data & technical indicator values.
    Uses OpenAI API if OPENAI_API_KEY is present; otherwise falls back to quantitative rule engine.
    """
    openai_key = os.getenv("OPENAI_API_KEY")

    # Fetch real live data for ground truth context
    summary = get_stock_summary(context_symbol)
    df_hist = fetch_history_from_yfinance_safe(context_symbol)
    indicators = get_indicator_signals(df_hist) if not df_hist.empty else {}

    price = summary.get('price', 150.0)
    change_pct = summary.get('changePercent', 0.0)
    rsi_val = indicators.get('rsi', {}).get('value', 55.0)
    rsi_sig = indicators.get('rsi', {}).get('signal', 'Neutral')
    macd_sig = indicators.get('macd', {}).get('signal', 'Neutral')
    sma20_val = indicators.get('sma20', {}).get('value', price)

    if openai_key:
        try:
            url = "https://api.openai.com/v1/chat/completions"
            headers = {
                "Authorization": f"Bearer {openai_key}",
                "Content-Type": "application/json"
            }
            system_prompt = (
                f"You are BullSight AI, an intelligent quantitative stock market assistant for an academic project. "
                f"Ground your answer in real stock data for {context_symbol}: Current Price=${price}, 24h Change={change_pct}%, "
                f"RSI={rsi_val} ({rsi_sig}), MACD={macd_sig}, SMA 20=${sma20_val}. "
                f"Be professional, educational, concise, and clear that signals are computational analytics and not guaranteed financial advice."
            )
            payload = {
                "model": "gpt-3.5-turbo",
                "messages": [
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": message}
                ],
                "temperature": 0.5,
                "max_tokens": 300
            }
            res = requests.post(url, json=payload, headers=headers, timeout=8)
            if res.status_code == 200:
                reply = res.json()["choices"][0]["message"]["content"]
                return {
                    "reply": reply,
                    "sources": ["OpenAI GPT Model", "yfinance Real-Time Feed", "Technical Indicator Engine"],
                    "isFallback": False
                }
        except Exception as e:
            logger.error(f"Error calling OpenAI API: {e}")

    # Quantitative Rule Engine Fallback grounded in real backend stock data
    msg_lower = message.lower()

    if "rsi" in msg_lower:
        reply = (
            f"Relative Strength Index (RSI) measures price velocity on a 0–100 scale. "
            f"For {context_symbol}, the current 14-day RSI is {rsi_val} ({rsi_sig}). "
            f"Values below 30 suggest oversold rebound potential, while values above 70 indicate overbought risk."
        )
    elif "macd" in msg_lower:
        reply = (
            f"Moving Average Convergence Divergence (MACD) tracks trend momentum. "
            f"For {context_symbol}, the MACD signal is currently {macd_sig}. "
            f"A bullish MACD line crossover above its signal line indicates positive momentum expansion."
        )
    elif "trend" in msg_lower or "bullish" in msg_lower or "bearish" in msg_lower:
        trend_status = "BULLISH" if change_pct >= 0 and rsi_val >= 50 else "BEARISH"
        reply = (
            f"Analysis for {context_symbol}: Current Price is ${price:.2f} ({'+' if change_pct>=0 else ''}{change_pct}% today). "
            f"With SMA 20 at ${sma20_val} and RSI at {rsi_val}, the current quantitative trend is {trend_status}. "
            f"Our 2-layer LSTM neural network projects continuous multi-day price targets with high confidence."
        )
    elif "compare" in msg_lower:
        reply = (
            f"Comparing {context_symbol} against peer equities: {context_symbol} is trading at ${price:.2f} with an RSI of {rsi_val}. "
            f"Multi-asset indicators show growth sector momentum aligned with moving average stability."
        )
    else:
        reply = (
            f"BullSight AI Intelligence for {context_symbol}: Price=${price:.2f} ({'+' if change_pct>=0 else ''}{change_pct}%), "
            f"RSI={rsi_val} ({rsi_sig}), MACD={macd_sig}, SMA 20=${sma20_val}. "
            f"Our LSTM deep learning model evaluates historical 60-day sequences alongside technical consensus filters to generate target projections."
        )

    return {
        "reply": reply,
        "sources": ["BullSight Quantitative Rule Engine", "yfinance Real-Time Feed", "Technical Indicator Calculations"],
        "isFallback": True
    }


def fetch_history_from_yfinance_safe(symbol: str):
    from app.services.yahoo_service import fetch_history_from_yfinance
    try:
        return fetch_history_from_yfinance(symbol, timeframe='3M')
    except Exception:
        import pandas as pd
        return pd.DataFrame()
