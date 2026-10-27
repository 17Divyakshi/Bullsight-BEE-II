import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { stockAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { Bookmark, Plus, Trash2, TrendingUp, TrendingDown, ArrowRight, RefreshCw, ExternalLink, Sparkles } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const INITIAL_WATCHLIST = ['AAPL', 'RELIANCE.NS', 'NVDA', 'TCS.NS', 'MSFT'];

export const Watchlist = () => {
  const navigate = useNavigate();
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('bullsight_watchlist');
      return saved ? JSON.parse(saved) : INITIAL_WATCHLIST;
    } catch (e) {
      return INITIAL_WATCHLIST;
    }
  });

  const [stockDetails, setStockDetails] = useState({});
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  async function loadWatchlistData() {
    setLoading(true);
    const details = {};
    await Promise.all(
      watchlist.map(async sym => {
        try {
          const [sum, pred] = await Promise.all([
            stockAPI.getSummary(sym),
            stockAPI.getPrediction(sym, 7),
          ]);
          details[sym] = { summary: sum, prediction: pred };
        } catch (e) {
          console.error(`Error loading watchlist item ${sym}:`, e);
        }
      })
    );
    setStockDetails(details);
    setLoading(false);
    setRefreshing(false);
  }

  useEffect(() => {
    try {
      localStorage.setItem('bullsight_watchlist', JSON.stringify(watchlist));
    } catch (e) {}

    if (watchlist.length > 0) {
      loadWatchlistData();
    } else {
      setLoading(false);
    }
  }, [watchlist]);

  const handleAdd = (e) => {
    e?.preventDefault();
    const clean = input.trim().toUpperCase();
    if (clean && !watchlist.includes(clean)) {
      setWatchlist([...watchlist, clean]);
      setInput('');
    }
  };

  const handleRemove = (sym, e) => {
    e.stopPropagation();
    setWatchlist(watchlist.filter(s => s !== sym));
  };

  return (
    <div className="min-h-screen bg-app text-primary flex font-sans transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Equities Watchlist" />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto min-w-0">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <div className="flex items-center space-x-2">
                <Bookmark className="w-5 h-5 text-emerald" />
                <h2 className="text-2xl font-black font-display text-primary tracking-tight">
                  Target Equities Watchlist
                </h2>
              </div>
              <p className="text-xs text-muted mt-1">
                Real-time tracking with live price quotes, volume changes, and AI conviction signals.
              </p>
            </div>

            {/* Add Stock Form */}
            <form onSubmit={handleAdd} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Add ticker (e.g. TSLA, INFY.NS)..."
                value={input}
                onChange={e => setInput(e.target.value)}
                className="bg-card border border-border rounded-xl px-3.5 py-2 text-xs font-mono text-primary placeholder-muted focus:outline-none focus:border-emerald-500/50 shadow-sm"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="px-4 py-2 rounded-xl bg-emerald hover:bg-emerald-bright text-white text-xs font-bold transition-all disabled:opacity-50 flex items-center space-x-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Add Ticker</span>
              </button>
            </form>
          </div>

          {/* Quick Suggestions Chips */}
          <div className="flex items-center space-x-2 text-xs font-mono">
            <span className="text-muted">Quick Add:</span>
            <div className="flex flex-wrap gap-1.5">
              {['GOOGL', 'AMZN', 'META', 'HDFCBANK.NS', 'TATAMOTORS.NS', 'BTC-USD', 'SPY', 'TSLA'].filter(s => !watchlist.includes(s)).map(s => (
                <button
                  key={s}
                  onClick={() => setWatchlist([...watchlist, s])}
                  className="px-2 py-0.5 rounded bg-surface border border-borderSubtle text-secondary hover:text-emerald text-[11px] font-semibold transition-colors"
                >
                  +{s}
                </button>
              ))}
            </div>
          </div>

          {/* Watchlist Table */}
          <div className="bull-card p-5 overflow-hidden shadow-card">
            {loading && watchlist.length > 0 ? (
              <div className="p-8 text-center text-xs font-mono text-muted space-y-2">
                <RefreshCw className="w-5 h-5 animate-spin text-emerald mx-auto" />
                <span>Connecting to market feed & AI predictions...</span>
              </div>
            ) : watchlist.length === 0 ? (
              <div className="p-12 text-center space-y-3">
                <Bookmark className="w-8 h-8 text-muted mx-auto" />
                <h3 className="text-sm font-bold text-primary">Your Watchlist is Empty</h3>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Add stock symbols above to monitor live quotes, technical overlays, and LSTM forecasts.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-border text-muted uppercase text-[10px]">
                      <th className="py-3 px-3">Symbol / Company</th>
                      <th className="py-3 px-3">Latest Price</th>
                      <th className="py-3 px-3">24h Change</th>
                      <th className="py-3 px-3">AI Conviction</th>
                      <th className="py-3 px-3">Volume</th>
                      <th className="py-3 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {watchlist.map(sym => {
                      const data = stockDetails[sym];
                      const sum = data?.summary;
                      const pred = data?.prediction;
                      const isPos = (sum?.change || 0) >= 0;

                      return (
                        <tr 
                          key={sym} 
                          className="hover:bg-hoverSurface/60 transition-colors group cursor-pointer"
                          onClick={() => navigate(`/dashboard?symbol=${sym}`)}
                        >
                          {/* Symbol & Company */}
                          <td className="py-3.5 px-3">
                            <div className="flex items-center space-x-2.5">
                              <span className="font-bold text-sm text-primary group-hover:text-emerald transition-colors">
                                {sym}
                              </span>
                              <span className="text-[11px] text-muted truncate max-w-[140px] sm:max-w-xs font-sans">
                                {sum?.name || 'Loading...'}
                              </span>
                            </div>
                          </td>

                          {/* Price */}
                          <td className="py-3.5 px-3 font-bold text-sm text-primary tabular-nums">
                            {sum?.price ? `$${Number(sum.price).toFixed(2)}` : '...'}
                          </td>

                          {/* 24h Change */}
                          <td className="py-3.5 px-3">
                            {sum ? (
                              <span
                                className={`inline-flex items-center px-2 py-0.5 rounded border text-[11px] font-bold tabular-nums ${
                                  isPos
                                    ? 'bg-positive/10 text-positive border-positive/25'
                                    : 'bg-negative/10 text-negative border-negative/25'
                                }`}
                              >
                                {isPos ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                                {isPos ? '+' : ''}{sum.change} ({isPos ? '+' : ''}{sum.changePercent}%)
                              </span>
                            ) : (
                              <span className="text-muted">...</span>
                            )}
                          </td>

                          {/* AI Signal */}
                          <td className="py-3.5 px-3">
                            {pred ? (
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-0.5 rounded font-display font-bold text-[10px] ${
                                  pred.signal === 'BUY'
                                    ? 'bg-positive/10 text-positive border border-positive/25'
                                    : 'bg-negative/10 text-negative border border-negative/25'
                                }`}>
                                  {pred.signal}
                                </span>
                                <span className="text-muted text-[10px] tabular-nums">
                                  {Math.round((pred.confidence || 0.8) * 100)}% Conviction
                                </span>
                              </div>
                            ) : (
                              <span className="text-muted">Calculating...</span>
                            )}
                          </td>

                          {/* Volume */}
                          <td className="py-3.5 px-3 text-secondary tabular-nums">
                            {sum?.volume || 'N/A'}
                          </td>

                          {/* Actions */}
                          <td className="py-3.5 px-3 text-right">
                            <div className="inline-flex items-center space-x-2">
                              <Link
                                to={`/dashboard?symbol=${sym}`}
                                onClick={e => e.stopPropagation()}
                                className="p-1.5 rounded-lg border border-border text-muted hover:text-emerald hover:border-emerald-500/30 transition-all"
                                title="Open in Terminal Dashboard"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={e => handleRemove(sym, e)}
                                className="p-1.5 rounded-lg border border-border text-muted hover:text-negative hover:border-negative/30 transition-all"
                                title="Remove from Watchlist"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
};
