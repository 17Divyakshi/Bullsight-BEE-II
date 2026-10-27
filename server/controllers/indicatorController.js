import { getStockHistory } from '../services/yahooService.js';
import { computeIndicatorsFromCandles } from '../services/indicatorService.js';

export const getIndicators = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    if (!symbol) {
      return res.status(400).json({ error: { message: 'Stock symbol is required' } });
    }

    const candles = await getStockHistory(symbol, '6M');
    const signals = computeIndicatorsFromCandles(candles);

    res.status(200).json({
      symbol: symbol.toUpperCase(),
      ...signals,
    });
  } catch (err) {
    next(err);
  }
};

export default { getIndicators };
