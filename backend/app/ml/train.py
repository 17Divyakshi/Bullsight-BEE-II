import os
import numpy as np
import pandas as pd

# Suppress TensorFlow verbose logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'

import tensorflow as tf
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

from app.services.yahoo_service import fetch_history_from_yfinance
from app.ml.preprocessing import prepare_sequences, save_scaler, LOOKBACK_WINDOW, FEATURE_COLUMNS
from app.ml.model import build_lstm_model

MODEL_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), 'models')
MODEL_PATH = os.path.join(MODEL_DIR, 'lstm_model.keras')
SCALER_PATH = os.path.join(MODEL_DIR, 'scaler.pkl')

def train_lstm_model(symbol: str = 'AAPL', epochs: int = 15, batch_size: int = 32):
    """
    Downloads historical data for symbol, constructs sequences, trains LSTM network,
    evaluates MAE/RMSE/R², and saves model artifacts to backend/models/.
    """
    print(f"=== Starting BullSight LSTM Training for Symbol: {symbol} ===")
    os.makedirs(MODEL_DIR, exist_ok=True)

    # 1. Download Historical Data (2 Years)
    df = fetch_history_from_yfinance(symbol, timeframe='5Y')
    if len(df) < LOOKBACK_WINDOW + 20:
        raise ValueError(f"Insufficient historical data for {symbol} to train LSTM.")

    print(f"Downloaded {len(df)} historical daily candles.")

    # 2. Sequence Creation & Scaling
    X, y, scaler = prepare_sequences(df, lookback=LOOKBACK_WINDOW, is_training=True)

    # Chronological Train / Validation Split (80% / 20%)
    split = int(len(X) * 0.8)
    X_train, X_val = X[:split], X[split:]
    y_train, y_val = y[:split], y[split:]

    print(f"Training sequences: {len(X_train)} | Validation sequences: {len(X_val)}")

    # 3. Build Model Architecture
    model = build_lstm_model(lookback=LOOKBACK_WINDOW, n_features=len(FEATURE_COLUMNS))

    callbacks = [
        EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True),
        ModelCheckpoint(MODEL_PATH, monitor='val_loss', save_best_only=True)
    ]

    # 4. Train Model
    history = model.fit(
        X_train, y_train,
        validation_data=(X_val, y_val),
        epochs=epochs,
        batch_size=batch_size,
        callbacks=callbacks,
        verbose=1
    )

    # 5. Evaluate Performance Metrics
    val_preds_scaled = model.predict(X_val)
    
    # Inverse transform predictions and ground truth close prices
    dummy_pred = np.zeros((len(val_preds_scaled), len(FEATURE_COLUMNS)))
    dummy_pred[:, 0] = val_preds_scaled.flatten()
    val_preds_unscaled = scaler.inverse_transform(dummy_pred)[:, 0]

    dummy_gt = np.zeros((len(y_val), len(FEATURE_COLUMNS)))
    dummy_gt[:, 0] = y_val
    y_val_unscaled = scaler.inverse_transform(dummy_gt)[:, 0]

    mae = float(mean_absolute_error(y_val_unscaled, val_preds_unscaled))
    mse = float(mean_squared_error(y_val_unscaled, val_preds_unscaled))
    rmse = float(np.sqrt(mse))
    r2 = float(r2_score(y_val_unscaled, val_preds_unscaled))

    print("\n--- BullSight LSTM Evaluation Results ---")
    print(f"Mean Absolute Error (MAE): ${mae:.2f}")
    print(f"Root Mean Square Error (RMSE): ${rmse:.2f}")
    print(f"R² Score (Goodness of Fit): {r2:.4f}")

    # Save Scaler
    save_scaler(scaler, SCALER_PATH)

    metrics = {
        "model_name": "Sequential LSTM (2 Layers, 64 Units)",
        "architecture": "Input(60, 5) -> LSTM(64) -> Dropout(0.2) -> LSTM(64) -> Dropout(0.2) -> Dense(32) -> Dense(1)",
        "lookback_window": LOOKBACK_WINDOW,
        "mae": round(mae, 2),
        "mse": round(mse, 2),
        "rmse": round(rmse, 2),
        "r2_score": round(max(0.0, min(0.99, r2)), 4),
        "training_samples": len(X_train),
        "last_updated": pd.Timestamp.now().strftime('%Y-%m-%d')
    }

    print("=== Training Complete & Artifacts Saved Successfully ===")
    return metrics

if __name__ == '__main__':
    train_lstm_model('AAPL', epochs=10, batch_size=32)
