import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { stockAPI } from '../services/api';
import { Sliders, Search, ArrowUpDown, Filter, ChevronRight, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export const Screener = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [marketFilter, setMarketFilter] = useState('ALL');
  const [sectorFilter, setSectorFilter] = useState('ALL');
  const [signalFilter, setSignalFilter] = useState('ALL');
  const [sortField, setSortField] = useState('symbol');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    async function loadScreener() {
      setLoading(true);
      try {
        const data = await stockAPI.getScreener();
        setStocks(data);
      } catch (err) {
        console.error('Screener fetch error:', err);
      } finally {
        setLoading(false);
      }
    }
    loadScreener();
  }, []);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch =
      stock.symbol.toLowerCase().includes(search.toLowerCase()) ||
      stock.name.toLowerCase().includes(search.toLowerCase()) ||
      (stock.sector && stock.sector.toLowerCase().includes(search.toLowerCase()));

    const isIndian = stock.symbol.endsWith('.NS') || stock.market === 'INDIAN';
    const isCrypto = stock.symbol.includes('BTC') || stock.symbol.includes('ETH') || stock.market === 'CRYPTO';

    const matchesMarket =
      marketFilter === 'ALL' ||
      (marketFilter === 'INDIAN' && isIndian) ||
      (marketFilter === 'CRYPTO' && isCrypto) ||
      (marketFilter === 'US' && !isIndian && !isCrypto);

    const matchesSector =
      sectorFilter === 'ALL' ||
      (stock.sector && stock.sector.toLowerCase().includes(sectorFilter.toLowerCase()));

    const matchesSignal = signalFilter === 'ALL' || stock.signal === signalFilter;

    return matchesSearch && matchesMarket && matchesSector && matchesSignal;
  }).sort((a, b) => {
    let aVal = a[sortField];
    let bVal = b[sortField];
    if (typeof aVal === 'string') {
      return sortAsc ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortAsc ? (aVal - bVal) : (bVal - aVal);
  });

  return (
    <div className="min-h-screen bg-app text-primary flex font-sans transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Multi-Market Stock Screener" />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto min-w-0">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <div className="flex items-center space-x-2">
                <Sliders className="w-5 h-5 text-emerald" />
                <h2 className="text-2xl font-black font-display text-primary tracking-tight">
                  Quantitative Stock Screener
                </h2>
              </div>
              <p className="text-xs text-muted mt-1">
                Filter equities across NSE and US markets by RSI momentum, MACD crossover, and LSTM signals.
              </p>
            </div>
          </div>

          {/* Filter Controls Bar */}
          <div className="bull-card p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
            {/* Search Box */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search ticker, company name..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-surface border border-border rounded-xl pl-10 pr-3.5 py-2 text-xs font-mono text-primary placeholder-muted focus:outline-none focus:border-emerald-500/50"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              {/* Market Filter */}
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-muted">Market:</span>
                <div className="flex bg-surface p-1 rounded-xl border border-borderSubtle">
                  {[
                    { id: 'ALL', label: 'ALL' },
                    { id: 'US', label: 'US' },
                    { id: 'INDIAN', label: 'NSE' },
                    { id: 'CRYPTO', label: 'CRYPTO/ETF' },
                  ].map(m => (
                    <button
                      key={m.id}
                      onClick={() => setMarketFilter(m.id)}
                      className={`px-2 py-1 rounded-lg font-bold text-xs transition-all ${
                        marketFilter === m.id
                          ? 'bg-emerald text-white shadow-sm'
                          : 'text-muted hover:text-primary'
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sector Dropdown */}
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-muted">Sector:</span>
                <select
                  value={sectorFilter}
                  onChange={e => setSectorFilter(e.target.value)}
                  className="bg-surface border border-borderSubtle rounded-xl px-2.5 py-1 text-xs font-mono font-medium text-primary focus:outline-none focus:border-emerald-500/50"
                >
                  <option value="ALL">All Sectors</option>
                  <option value="Technology">Technology</option>
                  <option value="Semiconductors">Semiconductors</option>
                  <option value="Banking">Banking & Finance</option>
                  <option value="Automotive">Automotive</option>
                  <option value="Consumer">Consumer Goods</option>
                  <option value="Index ETF">Index ETFs</option>
                  <option value="Cryptocurrency">Cryptocurrency</option>
                </select>
              </div>

              {/* AI Signal Filter */}
              <div className="flex items-center space-x-2 text-xs font-mono">
                <span className="text-muted">Signal:</span>
                <div className="flex bg-surface p-1 rounded-xl border border-borderSubtle">
                  {['ALL', 'BUY', 'HOLD', 'SELL'].map(s => (
                    <button
                      key={s}
                      onClick={() => setSignalFilter(s)}
                      className={`px-2 py-1 rounded-lg font-bold text-xs transition-all ${
                        signalFilter === s
                          ? 'bg-emerald text-white shadow-sm'
                          : 'text-muted hover:text-primary'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Table */}
          <div className="bull-card p-5 overflow-hidden shadow-card">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-border text-muted uppercase text-[10px]">
                    <th className="py-3 px-3 cursor-pointer hover:text-primary" onClick={() => handleSort('symbol')}>
                      <div className="flex items-center space-x-1">
                        <span>Equity</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="py-3 px-3">Sector</th>
                    <th className="py-3 px-3 cursor-pointer hover:text-primary" onClick={() => handleSort('price')}>
                      <div className="flex items-center space-x-1">
                        <span>Price</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="py-3 px-3 cursor-pointer hover:text-primary" onClick={() => handleSort('changePercent')}>
                      <div className="flex items-center space-x-1">
                        <span>24h Change</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="py-3 px-3 cursor-pointer hover:text-primary" onClick={() => handleSort('rsi')}>
                      <div className="flex items-center space-x-1">
                        <span>RSI (14)</span>
                        <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </th>
                    <th className="py-3 px-3">MACD Trend</th>
                    <th className="py-3 px-3">AI Conviction Signal</th>
                    <th className="py-3 px-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {filteredStocks.map(stock => {
                    const isPos = (stock.changePercent || 0) >= 0;
                    const isIndian = stock.symbol.endsWith('.NS');
                    return (
                      <tr 
                        key={stock.symbol} 
                        className="hover:bg-hoverSurface/60 transition-colors group cursor-pointer"
                        onClick={() => navigate(`/dashboard?symbol=${stock.symbol}`)}
                      >
                        <td className="py-3.5 px-3">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-sm text-primary group-hover:text-emerald transition-colors">
                              {stock.symbol}
                            </span>
                            <span className="text-[11px] text-muted font-sans truncate max-w-[130px]">
                              {stock.name}
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="text-[10px] text-muted px-2 py-0.5 rounded bg-surface border border-borderSubtle">
                            {stock.sector || (isIndian ? 'Indian Equities' : 'US Market')}
                          </span>
                        </td>

                        <td className="py-3.5 px-3 font-bold text-sm text-primary tabular-nums">
                          {isIndian ? '₹' : '$'}{Number(stock.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>

                        <td className="py-3.5 px-3">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold tabular-nums border ${
                            isPos ? 'bg-positive/10 text-positive border-positive/25' : 'bg-negative/10 text-negative border-negative/25'
                          }`}>
                            {isPos ? '+' : ''}{stock.changePercent}%
                          </span>
                        </td>

                        <td className="py-3.5 px-3 font-bold text-primary tabular-nums">
                          {stock.rsi}
                        </td>

                        <td className="py-3.5 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            stock.macdSignal === 'Bullish' ? 'text-positive bg-positive/10' : 'text-negative bg-negative/10'
                          }`}>
                            {stock.macdSignal}
                          </span>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-0.5 rounded font-display font-bold text-[10px] ${
                              stock.signal === 'BUY'
                                ? 'bg-positive/10 text-positive border border-positive/25'
                                : 'bg-surface text-secondary border border-borderSubtle'
                            }`}>
                              {stock.signal}
                            </span>
                            <span className="text-emerald text-[10px] tabular-nums font-bold">
                              +{stock.aiPredictionPct}%
                            </span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3 text-right">
                          <Link
                            to={`/dashboard?symbol=${stock.symbol}`}
                            onClick={e => e.stopPropagation()}
                            className="inline-flex items-center space-x-1 p-1.5 rounded-lg border border-border text-muted hover:text-emerald hover:border-emerald-500/30 transition-all"
                            title="Open Stock Terminal"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};
