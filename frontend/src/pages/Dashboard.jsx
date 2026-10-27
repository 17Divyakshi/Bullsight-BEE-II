import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { MarketTicker } from '../components/MarketTicker';
import { StockChart } from '../components/StockChart';
import { PredictionCard } from '../components/PredictionCard';
import { IndicatorCard } from '../components/IndicatorCard';
import { NewsCard } from '../components/NewsCard';
import { stockAPI } from '../services/api';
import { 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  Cpu,
  Bookmark,
  Check
} from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { POPULAR_CHIPS, getStockBySymbol } from '../data/stocks';

export const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramSymbol = searchParams.get('symbol') || 'AAPL';
  const [symbol, setSymbol] = useState(paramSymbol);

  useEffect(() => {
    const sym = searchParams.get('symbol');
    if (sym && sym !== symbol) {
      setSymbol(sym);
    }
  }, [searchParams]);

  const handleSelectSymbol = (newSym) => {
    setSymbol(newSym);
    setSearchParams({ symbol: newSym });
  };
  const [timeframe, setTimeframe] = useState('3M');
  const [summary, setSummary] = useState(null);
  const [history, setHistory] = useState([]);
  const [indicators, setIndicators] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date().toLocaleTimeString());

  // Check if stock is in watchlist
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bullsight_watchlist') || '[]');
      setIsWatchlisted(saved.includes(symbol));
    } catch (e) {
      setIsWatchlisted(false);
    }
  }, [symbol]);

  const toggleWatchlist = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('bullsight_watchlist') || '[]');
      let updated;
      if (saved.includes(symbol)) {
        updated = saved.filter(s => s !== symbol);
        setIsWatchlisted(false);
      } else {
        updated = [...saved, symbol];
        setIsWatchlisted(true);
      }
      localStorage.setItem('bullsight_watchlist', JSON.stringify(updated));
    } catch (e) {
      console.warn(e);
    }
  };

  async function loadDashboardData(sym = symbol, tf = timeframe) {
    setLoading(true);
    try {
      const [sumRes, histRes, indRes, predRes, newsRes] = await Promise.all([
        stockAPI.getSummary(sym),
        stockAPI.getHistory(sym, tf),
        stockAPI.getIndicators(sym),
        stockAPI.getPrediction(sym, 7),
        stockAPI.getNews(sym),
      ]);

      setSummary(sumRes);
      setHistory(histRes);
      setIndicators(indRes);
      setPrediction(predRes);
      setNews(newsRes);
      setLastUpdated(new Date().toLocaleTimeString());
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    loadDashboardData(symbol, timeframe);
  }, [symbol, timeframe]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadDashboardData(symbol, timeframe);
  };

  const isPos = (summary?.change || 0) >= 0;
  const isINR = symbol.endsWith('.NS');
  const currency = isINR ? '₹' : '$';

  return (
    <div className="min-h-screen bg-app text-primary flex font-sans transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Market Index Ticker Tape */}
        <MarketTicker />

        {/* Institutional Top Navigation Bar */}
        <TopBar 
          title="Terminal Dashboard" 
          onSelectSymbol={handleSelectSymbol}
          currentSymbol={symbol}
        />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto min-w-0">
          
          {/* Header Row & Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <h2 className="text-2xl font-black font-display text-primary tracking-tight">
                  Market Command Center
                </h2>
                <span className="text-[10px] font-mono text-muted px-2 py-0.5 rounded bg-surface border border-borderSubtle">
                  Observed: {lastUpdated}
                </span>
              </div>
              <p className="text-xs text-muted mt-0.5 font-medium">
                Live equity pricing, volatility indicators, and deep sequence projections.
              </p>
            </div>

            <div className="flex items-center space-x-2.5">
              <button
                onClick={toggleWatchlist}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center space-x-1.5 border transition-all ${
                  isWatchlisted
                    ? 'bg-emerald-500/10 text-emerald border-emerald-500/30'
                    : 'bg-card text-secondary border-border hover:border-emerald-500/30'
                }`}
                title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
              >
                {isWatchlisted ? <Check className="w-3.5 h-3.5" /> : <Bookmark className="w-3.5 h-3.5" />}
                <span>{isWatchlisted ? 'Saved' : 'Watchlist'}</span>
              </button>

              <button
                onClick={handleRefresh}
                disabled={refreshing || loading}
                className="p-2 sm:px-3 sm:py-2 rounded-xl bg-card border border-border text-secondary hover:text-emerald hover:border-emerald-500/30 transition-all shadow-sm disabled:opacity-50 flex items-center space-x-1.5 text-xs font-semibold"
                title="Refresh Real-Time Data"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin text-emerald' : ''}`} />
                <span className="hidden sm:inline">{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>
            </div>
          </div>

          {/* Quick-Switch Popular Equities Bar */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1.5 scrollbar-thin">
            <span className="text-[10px] font-mono font-bold text-muted uppercase tracking-wider shrink-0 mr-1 flex items-center space-x-1">
              <span>Quick Select:</span>
            </span>
            {POPULAR_CHIPS.map(chip => {
              const active = symbol === chip;
              const isNSE = chip.endsWith('.NS');
              const isCrypto = chip.includes('BTC') || chip.includes('ETH');
              return (
                <button
                  key={chip}
                  onClick={() => handleSelectSymbol(chip)}
                  className={`px-2.5 py-1 rounded-xl text-xs font-mono transition-all shrink-0 flex items-center space-x-1 border ${
                    active
                      ? 'bg-emerald-500/15 text-emerald border-emerald-500/40 font-bold shadow-sm'
                      : 'bg-card text-secondary border-border hover:border-emerald-500/30 hover:text-primary'
                  }`}
                >
                  <span>{chip.replace('.NS', '')}</span>
                  {isNSE && <span className="text-[9px] text-muted font-normal">.NSE</span>}
                  {isCrypto && <span className="text-[9px] text-muted font-normal">.CRYPTO</span>}
                </button>
              );
            })}
          </div>

          {/* Primary Equity Header Banner Card */}
          {summary && (
            <div className="bull-card p-5 border-l-4 border-l-emerald shadow-card">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
                
                {/* Left: Ticker, Price & Change */}
                <div className="space-y-1">
                  <div className="flex items-center space-x-2.5">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-primary tracking-tight">
                      {summary.symbol}
                    </span>
                    <span className="text-xs text-muted font-medium px-2.5 py-0.5 rounded-lg bg-surface border border-borderSubtle">
                      {summary.name}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald border border-emerald-500/20">
                      Live Quote
                    </span>
                  </div>

                  <div className="flex items-baseline space-x-3 pt-1">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-primary tabular-nums tracking-tight">
                      {currency}{Number(summary.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className={`text-sm sm:text-base font-bold font-mono tabular-nums flex items-center ${isPos ? 'text-positive' : 'text-negative'}`}>
                      {isPos ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                      {isPos ? '+' : ''}{summary.change} ({isPos ? '+' : ''}{summary.changePercent}%)
                    </span>
                  </div>
                </div>

                {/* Right: Key Financial Metrics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
                  <div className="bg-surface/80 p-3 rounded-xl border border-borderSubtle">
                    <span className="text-[10px] text-muted block uppercase">Day High / Low</span>
                    <span className="font-bold text-primary tabular-nums mt-0.5 block">
                      {currency}{Number(summary.high || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / {currency}{Number(summary.low || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="bg-surface/80 p-3 rounded-xl border border-borderSubtle">
                    <span className="text-[10px] text-muted block uppercase">Trading Volume</span>
                    <span className="font-bold text-primary tabular-nums mt-0.5 block">
                      {summary.volume || 'N/A'}
                    </span>
                  </div>
                  <div className="bg-surface/80 p-3 rounded-xl border border-borderSubtle">
                    <span className="text-[10px] text-muted block uppercase">Market Cap</span>
                    <span className="font-bold text-primary tabular-nums mt-0.5 block">
                      {summary.marketCap || 'N/A'}
                    </span>
                  </div>
                  <div className="bg-surface/80 p-3 rounded-xl border border-borderSubtle">
                    <span className="text-[10px] text-muted block uppercase">P/E Ratio</span>
                    <span className="font-bold text-emerald tabular-nums mt-0.5 block">
                      {summary.peRatio || 'N/A'}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Technical Indicator Summary Cards */}
          <IndicatorCard indicators={indicators} loading={loading} />

          {/* Main Visuals Workspace: Interactive Chart & AI Forecast */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
            <div className="lg:col-span-2">
              <StockChart
                history={history}
                symbol={symbol}
                timeframe={timeframe}
                onTimeframeChange={setTimeframe}
                forecastPoints={prediction?.forecast_points}
                loading={loading}
              />
            </div>

            <div className="lg:col-span-1">
              <PredictionCard 
                prediction={prediction} 
                symbol={symbol} 
                loading={loading} 
              />
            </div>
          </div>

          {/* Bottom Feed: Market News & Sentiment */}
          <NewsCard newsData={news} loading={loading} />

        </main>
      </div>
    </div>
  );
};
