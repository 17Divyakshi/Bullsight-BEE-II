import { generatePrediction } from '../services/predictionService.js';
import PredictionRecord from '../models/PredictionRecord.js';

export const getPrediction = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const horizon = parseInt(req.query.horizon, 10) || 7;

    if (!symbol) {
      return res.status(400).json({ error: { message: 'Stock symbol is required' } });
    }

    const prediction = await generatePrediction(symbol, horizon);
    res.status(200).json(prediction);
  } catch (err) {
    next(err);
  }
};

export const getPredictionHistory = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const limit = parseInt(req.query.limit, 10) || 10;
    const query = symbol ? { symbol: symbol.toUpperCase() } : {};

    const records = await PredictionRecord.find(query)
      .sort({ createdAt: -1 })
      .limit(limit);

    res.status(200).json({
      success: true,
      count: records.length,
      data: records,
    });
  } catch (err) {
    next(err);
  }
};

export default { getPrediction, getPredictionHistory };
