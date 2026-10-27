import { getAllStocks, searchStocks, getStockBySymbol } from '../utils/stockUniverse.js';
import { getStockSummary, getStockHistory } from '../services/yahooService.js';

export const getCatalog = async (req, res, next) => {
  try {
    const catalog = getAllStocks();
    res.status(200).json(catalog);
  } catch (err) {
    next(err);
  }
};

export const searchCatalog = async (req, res, next) => {
  try {
    const q = req.query.q || '';
    const results = searchStocks(q);
    res.status(200).json(results);
  } catch (err) {
    next(err);
  }
};

export const getSummary = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    if (!symbol) {
      return res.status(400).json({ error: { message: 'Stock symbol is required' } });
    }
    const data = await getStockSummary(symbol);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    const timeframe = req.query.timeframe || '3M';
    if (!symbol) {
      return res.status(400).json({ error: { message: 'Stock symbol is required' } });
    }

    const records = await getStockHistory(symbol, timeframe);
    res.status(200).json({
      symbol: symbol.toUpperCase(),
      timeframe: timeframe.toUpperCase(),
      history: records,
    });
  } catch (err) {
    next(err);
  }
};

export default { getCatalog, searchCatalog, getSummary, getHistory };
