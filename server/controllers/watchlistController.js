import Watchlist from '../models/Watchlist.js';

const DEFAULT_WATCHLIST = ['AAPL', 'RELIANCE.NS', 'NVDA', 'TCS.NS'];

/**
 * GET /api/user/watchlist
 * Retrieves watchlist items from MongoDB
 */
export const getWatchlist = async (req, res, next) => {
  try {
    const userId = req.user ? req.user._id : null;
    const items = await Watchlist.find({ userId }).sort({ addedAt: -1 });

    if (!items || items.length === 0) {
      return res.status(200).json(DEFAULT_WATCHLIST);
    }

    const symbols = items.map((i) => i.symbol);
    res.status(200).json(symbols);
  } catch (err) {
    next(err);
  }
};

/**
 * POST /api/user/watchlist
 * Adds a new stock symbol to MongoDB watchlist (201 Created)
 */
export const addToWatchlist = async (req, res, next) => {
  try {
    const { symbol, notes } = req.body;
    if (!symbol) {
      return res.status(400).json({ error: { message: 'Stock symbol is required', statusCode: 400 } });
    }

    const sym = symbol.toUpperCase().trim();
    const userId = req.user ? req.user._id : null;

    const existing = await Watchlist.findOne({ userId, symbol: sym });
    if (existing) {
      return res.status(200).json({ status: 'already_exists', symbol: sym, id: existing._id });
    }

    const item = await Watchlist.create({
      userId,
      symbol: sym,
      notes: notes || '',
    });

    res.status(201).json({ status: 'success', symbol: item.symbol, id: item._id });
  } catch (err) {
    next(err);
  }
};

/**
 * DELETE /api/user/watchlist/:symbol
 * Removes a stock symbol from MongoDB watchlist
 */
export const deleteFromWatchlist = async (req, res, next) => {
  try {
    const { symbol } = req.params;
    if (!symbol) {
      return res.status(400).json({ error: { message: 'Stock symbol is required' } });
    }

    const sym = symbol.toUpperCase().trim();
    const userId = req.user ? req.user._id : null;

    const result = await Watchlist.findOneAndDelete({ userId, symbol: sym });
    if (!result) {
      // Also try deleting if userId was null or any matching symbol for guest
      await Watchlist.findOneAndDelete({ symbol: sym });
    }

    res.status(200).json({ status: 'removed', symbol: sym });
  } catch (err) {
    next(err);
  }
};

export default { getWatchlist, addToWatchlist, deleteFromWatchlist };
