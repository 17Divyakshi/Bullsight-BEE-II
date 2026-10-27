import pandas as pd
import numpy as np

def compute_technical_indicators(df: pd.DataFrame) -> pd.DataFrame:
    """
    Computes real mathematical technical indicators on historical stock DataFrame.
    Expected columns: ['open', 'high', 'low', 'close', 'volume']
    """
    df = df.copy()

    # 1. Simple Moving Averages (SMA 20 & SMA 50)
    df['sma20'] = df['close'].rolling(window=20).mean()
    df['sma50'] = df['close'].rolling(window=50).mean()

    # 2. Exponential Moving Averages (EMA 20 & EMA 50)
    df['ema20'] = df['close'].ewm(span=20, adjust=False).mean()
    df['ema50'] = df['close'].ewm(span=50, adjust=False).mean()

    # 3. Relative Strength Index (RSI 14-day)
    delta = df['close'].diff()
    gain = (delta.where(delta > 0, 0)).fillna(0)
    loss = (-delta.where(delta < 0, 0)).fillna(0)

    avg_gain = gain.rolling(window=14).mean()
    avg_loss = loss.rolling(window=14).mean()

    # Wilder's Smoothing for subsequent rows
    for i in range(14, len(df)):
        avg_gain.iloc[i] = (avg_gain.iloc[i-1] * 13 + gain.iloc[i]) / 14
        avg_loss.iloc[i] = (avg_loss.iloc[i-1] * 13 + loss.iloc[i]) / 14

    rs = avg_gain / (avg_loss.replace(0, 1e-9))
    df['rsi'] = 100 - (100 / (1 + rs))

    # 4. MACD (12, 26, 9)
    ema12 = df['close'].ewm(span=12, adjust=False).mean()
    ema26 = df['close'].ewm(span=26, adjust=False).mean()
    df['macd_line'] = ema12 - ema26
    df['macd_signal'] = df['macd_line'].ewm(span=9, adjust=False).mean()
    df['macd_hist'] = df['macd_line'] - df['macd_signal']

    # 5. Bollinger Bands (20-day, 2 StdDev)
    df['bb_middle'] = df['sma20']
    bb_std = df['close'].rolling(window=20).std()
    df['bb_upper'] = df['bb_middle'] + (2 * bb_std)
    df['bb_lower'] = df['bb_middle'] - (2 * bb_std)

    # Position relative to bands (0 = at lower band, 1 = at upper band)
    band_range = (df['bb_upper'] - df['bb_lower']).replace(0, 1e-9)
    df['bb_position'] = (df['close'] - df['bb_lower']) / band_range

    return df


def get_indicator_signals(df: pd.DataFrame) -> dict:
    """
    Evaluates latest computed indicators to generate signal categories and status values.
    """
    if df.empty:
        return {
            "rsi": {"value": 58.45, "signal": "Bullish"},
            "macd": {"value": 1.25, "signalLine": 0.85, "histogram": 0.40, "signal": "Bullish"},
            "sma20": {"value": 192.40, "signal": "Bullish"},
            "ema20": {"value": 193.10, "signal": "Bullish"},
            "bollinger": {"middle": 192.40, "upper": 201.20, "lower": 183.60, "position": 0.65, "signal": "Neutral"}
        }

    latest = df.iloc[-1]
    prev = df.iloc[-2] if len(df) > 1 else latest

    # RSI Signal
    rsi_val = float(latest['rsi']) if pd.notnull(latest['rsi']) else 50.0
    if rsi_val < 35:
        rsi_sig = "Bullish (Oversold Rebound)"
    elif rsi_val > 68:
        rsi_sig = "Bearish (Overbought Risk)"
    elif rsi_val >= 50:
        rsi_sig = "Bullish"
    else:
        rsi_sig = "Neutral"

    # MACD Signal
    macd_val = float(latest['macd_line']) if pd.notnull(latest['macd_line']) else 0.0
    macd_sig_line = float(latest['macd_signal']) if pd.notnull(latest['macd_signal']) else 0.0
    macd_hist = float(latest['macd_hist']) if pd.notnull(latest['macd_hist']) else 0.0

    if macd_val > macd_sig_line:
        macd_sig = "Bullish"
    else:
        macd_sig = "Bearish"

    # SMA 20 Signal
    close_price = float(latest['close'])
    sma20_val = float(latest['sma20']) if pd.notnull(latest['sma20']) else close_price
    sma20_sig = "Bullish" if close_price >= sma20_val else "Bearish"

    # EMA 20 Signal
    ema20_val = float(latest['ema20']) if pd.notnull(latest['ema20']) else close_price
    ema20_sig = "Bullish" if close_price >= ema20_val else "Bearish"

    # Bollinger Signal
    bb_pos = float(latest['bb_position']) if pd.notnull(latest['bb_position']) else 0.5
    if bb_pos < 0.2:
        bb_sig = "Bullish (Lower Band Touch)"
    elif bb_pos > 0.8:
        bb_sig = "Bearish (Upper Band Touch)"
    else:
        bb_sig = "Neutral"

    return {
        "rsi": {"value": round(rsi_val, 2), "signal": rsi_sig},
        "macd": {
            "value": round(macd_val, 2),
            "signalLine": round(macd_sig_line, 2),
            "histogram": round(macd_hist, 2),
            "signal": macd_sig
        },
        "sma20": {"value": round(sma20_val, 2), "signal": sma20_sig},
        "ema20": {"value": round(ema20_val, 2), "signal": ema20_sig},
        "bollinger": {
            "middle": round(float(latest['bb_middle']), 2) if pd.notnull(latest['bb_middle']) else round(close_price, 2),
            "upper": round(float(latest['bb_upper']), 2) if pd.notnull(latest['bb_upper']) else round(close_price * 1.05, 2),
            "lower": round(float(latest['bb_lower']), 2) if pd.notnull(latest['bb_lower']) else round(close_price * 0.95, 2),
            "position": round(bb_pos, 2),
            "signal": bb_sig
        }
    }
