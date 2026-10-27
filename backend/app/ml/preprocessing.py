import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
import joblib
import os

FEATURE_COLUMNS = ['close', 'sma20', 'sma50', 'rsi', 'macd_hist']
LOOKBACK_WINDOW = 60

def prepare_sequences(df: pd.DataFrame, lookback: int = LOOKBACK_WINDOW, scaler: MinMaxScaler = None, is_training: bool = True):
    """
    Cleans historical DataFrame, extracts feature columns, scales values with MinMaxScaler,
    and constructs 3D sequence tensors (samples, lookback, features) for LSTM.
    """
    # Fill missing technical indicator values safely
    df = df.copy()
    for col in FEATURE_COLUMNS:
        if col not in df.columns:
            df[col] = df['close']
    
    df[FEATURE_COLUMNS] = df[FEATURE_COLUMNS].ffill().bfill()
    feature_data = df[FEATURE_COLUMNS].values

    if is_training or scaler is None:
        scaler = MinMaxScaler(feature_range=(0, 1))
        scaled_data = scaler.fit_transform(feature_data)
    else:
        scaled_data = scaler.transform(feature_data)

    X, y = [], []
    for i in range(lookback, len(scaled_data)):
        X.append(scaled_data[i - lookback:i])
        y.append(scaled_data[i, 0])  # Target is scaled close price

    return np.array(X), np.array(y), scaler


def save_scaler(scaler: MinMaxScaler, filepath: str):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    joblib.dump(scaler, filepath)


def load_scaler(filepath: str) -> MinMaxScaler:
    if os.path.exists(filepath):
        return joblib.load(filepath)
    return None
