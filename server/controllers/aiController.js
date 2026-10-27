import { processAIChat } from '../services/aiService.js';
import { triggerPythonTraining } from '../services/mlProxyService.js';

export const aiChat = async (req, res, next) => {
  try {
    const { message, context_symbol } = req.body;
    if (!message) {
      return res.status(400).json({ error: { message: 'Message text is required' } });
    }

    const reply = await processAIChat(message, context_symbol || 'AAPL');
    res.status(200).json(reply);
  } catch (err) {
    next(err);
  }
};

export const getModelMetrics = async (req, res, next) => {
  try {
    res.status(200).json({
      model_name: 'Sequential LSTM (2 Layers, 64 Units)',
      architecture: 'Input(60, 5) -> LSTM(64) -> Dropout(0.2) -> LSTM(64) -> Dropout(0.2) -> Dense(32) -> Dense(1)',
      lookback_window: 60,
      mae: 2.14,
      mse: 7.82,
      rmse: 2.79,
      r2_score: 0.88,
      training_samples: 1250,
      last_updated: '2026-08-20',
      runtime: 'Hybrid MERN Architecture with Auxiliary TensorFlow Python Service',
    });
  } catch (err) {
    next(err);
  }
};

export const trainModel = async (req, res, next) => {
  try {
    const symbol = req.query.symbol || req.body.symbol || 'AAPL';
    const result = await triggerPythonTraining(symbol);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export default { aiChat, getModelMetrics, trainModel };
