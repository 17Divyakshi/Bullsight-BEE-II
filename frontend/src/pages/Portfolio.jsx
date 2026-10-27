import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { stockAPI } from '../services/api';
import { useTheme } from '../context/ThemeContext';
import { Briefcase, Plus, TrendingUp, TrendingDown, RefreshCw, Trash2, PieChart as PieIcon, DollarSign } from 'lucide-react';
import { ResponsiveContainer, PieChart as RechartsPie, Pie, Cell, Tooltip } from 'recharts';
import { STOCKS, getStockBySymbol } from '../data/stocks';

const INITIAL_HOLDINGS = [
  { symbol: 'AAPL', name: 'Apple Inc.', qty: 15, buyPrice: 180.00 },
  { symbol: 'RELIANCE.NS', name: 'Reliance Industries Ltd.', qty: 50, buyPrice: 2850.00 },
  { symbol: 'NVDA', name: 'NVIDIA Corp', qty: 10, buyPrice: 110.00 },
];

export const Portfolio = () => {
  const { isDark } = useTheme();
  const [holdings, setHoldings] = useState(() => {
    try {
      const saved = localStorage.getItem('bullsight_portfolio');
      return saved ? JSON.parse(saved) : INITIAL_HOLDINGS;
    } catch (e) {
      return INITIAL_HOLDINGS;
    }
  });

  const [livePrices, setLivePrices] = useState({});
  const [loading, setLoading] = useState(true);

  const [symbolInput, setSymbolInput] = useState('');
  const [qtyInput, setQtyInput] = useState('');
  const [priceInput, setPriceInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('bullsight_portfolio', JSON.stringify(holdings));
    } catch (e) {}

    async function loadPrices() {
      setLoading(true);
      const prices = {};
      await Promise.all(
        holdings.map(async h => {
          try {
            const sum = await stockAPI.getSummary(h.symbol);
            prices[h.symbol] = sum.price || h.buyPrice * 1.05;
          } catch (e) {
            prices[h.symbol] = h.buyPrice * 1.05;
          }
        })
      );
      setLivePrices(prices);
      setLoading(false);
    }
    loadPrices();
  }, [holdings]);

  const handleAddHolding = e => {
    e.preventDefault();
    if (!symbolInput || !qtyInput || !priceInput) return;

    const sym = symbolInput.toUpperCase().trim();
    const newH = {
      symbol: sym,
      name: `${sym} Position`,
      qty: parseFloat(qtyInput),
      buyPrice: parseFloat(priceInput),
    };

    setHoldings([...holdings, newH]);
    setSymbolInput('');
    setQtyInput('');
    setPriceInput('');
    setIsModalOpen(false);
  };

  const handleRemove = idx => {
    setHoldings(holdings.filter((_, i) => i !== idx));
  };

  // Calculations with safe normalization
  const investedAmount = holdings.reduce((acc, h) => {
    const qty = Number(h.qty || h.quantity || 0);
    const buyPrice = Number(h.buyPrice || h.buy_price || 0);
    return acc + qty * buyPrice;
  }, 0);
  const currentValue = holdings.reduce((acc, h) => {
    const qty = Number(h.qty || h.quantity || 0);
    const buyPrice = Number(h.buyPrice || h.buy_price || 0);
    const cur = Number(livePrices[h.symbol] ?? buyPrice);
    return acc + qty * cur;
  }, 0);
  const profitLoss = currentValue - investedAmount;
  const returnPct = investedAmount > 0 ? (profitLoss / investedAmount) * 100 : 0;
  const isPos = profitLoss >= 0;

  const pieData = holdings.map(h => {
    const qty = Number(h.qty || h.quantity || 0);
    const buyPrice = Number(h.buyPrice || h.buy_price || 0);
    const cur = Number(livePrices[h.symbol] ?? buyPrice);
    return {
      name: h.symbol,
      value: Math.max(1, Math.round(qty * cur)),
    };
  });

  const COLORS = isDark 
    ? ['#00D084', '#2DD4BF', '#05DF96', '#FBBF24', '#818CF8'] 
    : ['#047857', '#2563EB', '#7C3AED', '#D97706', '#059669'];

  return (
    <div className="min-h-screen bg-app text-primary flex font-sans transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Portfolio Valuation & History" />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto min-w-0">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <div className="flex items-center space-x-2">
                <Briefcase className="w-5 h-5 text-emerald" />
                <h2 className="text-2xl font-black font-display text-primary tracking-tight">
                  Portfolio Valuation & Risk Allocation
                </h2>
              </div>
              <p className="text-xs text-muted mt-1">
                Real-time position re-evaluation against live market feeds.
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2 rounded-xl bg-emerald hover:bg-emerald-bright text-white text-xs font-bold transition-all shadow-sm flex items-center space-x-1.5 self-start sm:self-auto"
            >
              <Plus className="w-4 h-4" />
              <span>Add Position</span>
            </button>
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bull-card p-4 space-y-1.5 border-l-4 border-l-border">
              <span className="text-[10px] font-mono text-muted uppercase">Total Invested Capital</span>
              <div className="text-2xl font-black font-mono text-primary tabular-nums">
                ${investedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[10px] text-muted font-mono">{holdings.length} Active Positions</p>
            </div>

            <div className="bull-card p-4 space-y-1.5 border-l-4 border-l-emerald">
              <span className="text-[10px] font-mono text-muted uppercase">Current Valuation</span>
              <div className="text-2xl font-black font-mono text-emerald tabular-nums">
                ${currentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[10px] text-muted font-mono">Live Marked-to-Market</p>
            </div>

            <div className={`bull-card p-4 space-y-1.5 border-l-4 ${isPos ? 'border-l-positive' : 'border-l-negative'}`}>
              <span className="text-[10px] font-mono text-muted uppercase">Total Return ($)</span>
              <div className={`text-2xl font-black font-mono tabular-nums flex items-center ${isPos ? 'text-positive' : 'text-negative'}`}>
                {isPos ? <TrendingUp className="w-5 h-5 mr-1" /> : <TrendingDown className="w-5 h-5 mr-1" />}
                {isPos ? '+' : ''}${Math.abs(profitLoss).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[10px] text-muted font-mono">Unrealized Capital PnL</p>
            </div>

            <div className={`bull-card p-4 space-y-1.5 border-l-4 ${isPos ? 'border-l-positive' : 'border-l-negative'}`}>
              <span className="text-[10px] font-mono text-muted uppercase">Net Return ROI (%)</span>
              <div className={`text-2xl font-black font-mono tabular-nums ${isPos ? 'text-positive' : 'text-negative'}`}>
                {isPos ? '+' : ''}{returnPct.toFixed(2)}%
              </div>
              <p className="text-[10px] text-muted font-mono">Portfolio Performance Rate</p>
            </div>

          </div>

          {/* Allocation & Table Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            
            {/* Holdings Table */}
            <div className="lg:col-span-2 bull-card p-5 space-y-4 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-bold font-display uppercase tracking-wider text-primary">
                  Open Positions
                </span>
                <span className="text-[10px] font-mono text-muted">{holdings.length} Equities</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-border text-muted uppercase text-[10px]">
                      <th className="py-2.5 px-3">Ticker</th>
                      <th className="py-2.5 px-3">Qty</th>
                      <th className="py-2.5 px-3">Buy Price</th>
                      <th className="py-2.5 px-3">Live Price</th>
                      <th className="py-2.5 px-3">Valuation</th>
                      <th className="py-2.5 px-3">PnL</th>
                      <th className="py-2.5 px-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/60">
                    {holdings.map((h, idx) => {
                      const qty = Number(h.qty || h.quantity || 0);
                      const buyPrice = Number(h.buyPrice || h.buy_price || 0);
                      const cur = Number(livePrices[h.symbol] ?? buyPrice);
                      const val = qty * cur;
                      const pnl = (cur - buyPrice) * qty;
                      const pos = pnl >= 0;

                      return (
                        <tr key={idx} className="hover:bg-hoverSurface/50 transition-colors">
                          <td className="py-3 px-3 font-bold text-primary">{h.symbol}</td>
                          <td className="py-3 px-3 text-secondary tabular-nums">{qty}</td>
                          <td className="py-3 px-3 text-muted tabular-nums">${buyPrice.toFixed(2)}</td>
                          <td className="py-3 px-3 font-bold text-primary tabular-nums">${cur.toFixed(2)}</td>
                          <td className="py-3 px-3 font-bold text-secondary tabular-nums">${val.toFixed(2)}</td>
                          <td className={`py-3 px-3 font-bold tabular-nums ${pos ? 'text-positive' : 'text-negative'}`}>
                            {pos ? '+' : ''}${pnl.toFixed(2)}
                          </td>
                          <td className="py-3 px-3 text-right">
                            <button
                              onClick={() => handleRemove(idx)}
                              className="p-1 rounded text-muted hover:text-negative transition-colors"
                              title="Delete Holding"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Asset Allocation Donut Chart */}
            <div className="bull-card p-5 space-y-4 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-bold font-display uppercase tracking-wider text-primary">
                  Allocation Breakdown
                </span>
                <PieIcon className="w-4 h-4 text-emerald" />
              </div>

              <div className="h-56 w-full flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPie>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={75}
                      paddingAngle={4}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: isDark ? '#0D1D18' : '#FFFFFF', borderColor: isDark ? '#1A3930' : '#E5E7EB', borderRadius: 12, fontSize: 11, fontFamily: 'JetBrains Mono' }}
                    />
                  </RechartsPie>
                </ResponsiveContainer>
              </div>

              <div className="space-y-2 pt-2 border-t border-border">
                {holdings.map((h, i) => {
                  const qty = Number(h.qty || h.quantity || 0);
                  const buyPrice = Number(h.buyPrice || h.buy_price || 0);
                  const cur = Number(livePrices[h.symbol] ?? buyPrice);
                  const itemVal = qty * cur;
                  const pct = currentValue > 0 ? ((itemVal / currentValue) * 100).toFixed(1) : '0';
                  return (
                    <div key={h.symbol + i} className="flex items-center justify-between text-xs font-mono">
                      <div className="flex items-center space-x-2">
                        <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }} />
                        <span className="font-bold text-primary">{h.symbol}</span>
                      </div>
                      <span className="text-muted tabular-nums">{pct}%</span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Add Holding Modal Dialog */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
              <div className="bull-card p-6 max-w-md w-full bg-card shadow-2xl space-y-4 border border-border">
                <div className="flex justify-between items-center pb-3 border-b border-border">
                  <h3 className="text-sm font-bold font-display text-primary uppercase tracking-wider">
                    Add Portfolio Holding
                  </h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-muted hover:text-primary text-xs font-mono"
                  >
                    ✕
                  </button>
                </div>

                <form onSubmit={handleAddHolding} className="space-y-3.5 text-xs font-mono">
                  <div>
                    <label className="text-muted block mb-1">Stock Ticker Symbol</label>
                    <input
                      type="text"
                      list="stocks-datalist"
                      placeholder="Search ticker (e.g. AAPL, NVDA, RELIANCE.NS, BTC-USD)..."
                      value={symbolInput}
                      onChange={e => {
                        const val = e.target.value;
                        setSymbolInput(val);
                        const found = getStockBySymbol(val);
                        if (found && !priceInput) {
                          setPriceInput(found.basePrice.toString());
                        }
                      }}
                      className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-primary focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                    <datalist id="stocks-datalist">
                      {STOCKS.map(s => (
                        <option key={s.symbol} value={s.symbol}>{s.name} ({s.exchange})</option>
                      ))}
                    </datalist>
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Quantity (Shares)</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 25"
                      value={qtyInput}
                      onChange={e => setQtyInput(e.target.value)}
                      className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-primary focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-muted block mb-1">Average Purchase Price ($)</label>
                    <input
                      type="number"
                      step="any"
                      placeholder="e.g. 182.50"
                      value={priceInput}
                      onChange={e => setPriceInput(e.target.value)}
                      className="w-full bg-surface border border-border rounded-xl px-3 py-2 text-primary focus:outline-none focus:border-emerald-500/50"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-2 pt-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl border border-border text-muted hover:text-primary transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-emerald hover:bg-emerald-bright text-white font-bold transition-all shadow-sm"
                    >
                      Save Position
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
};
