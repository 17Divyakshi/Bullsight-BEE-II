import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam

def build_lstm_model(lookback: int = 60, n_features: int = 5) -> Sequential:
    """
    Constructs a 2-layer Sequential LSTM Neural Network for stock price time-series forecasting.
    Architecture:
      Input (60, n_features)
      -> LSTM(64, return_sequences=True)
      -> Dropout(0.2)
      -> LSTM(64)
      -> Dropout(0.2)
      -> Dense(32, activation='relu')
      -> Dense(1)
    """
    model = Sequential([
        LSTM(64, return_sequences=True, input_shape=(lookback, n_features)),
        Dropout(0.2),
        LSTM(64, return_sequences=False),
        Dropout(0.2),
        Dense(32, activation='relu'),
        Dense(1)
    ])

    model.compile(
        optimizer=Adam(learning_rate=0.001),
        loss='mean_squared_error',
        metrics=['mean_absolute_error']
    )

    return model
