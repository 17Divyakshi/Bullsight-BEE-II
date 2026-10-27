import React, { useEffect, useState } from 'react';
import { stockAPI } from '../services/api';
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react';

export const MarketTicker = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTicker() {
      try {
        const data = await stockAPI.getMarketOverview();
        setItems(data);
      } catch (e) {
        console.error('Ticker error:', e);
      } finally {
        setLoading(false);
      }
    }
    loadTicker();
  }, []);

  if (loading) {
    return (
      <div className="w-full bg-card border-b border-border py-2 px-4 flex items-center space-x-3 text-xs font-mono text-muted">
        <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald" />
        <span>Syncing global market indices (NSE, BSE, NASDAQ, S&P 500)...</span>
      </div>
    );
  }

  return (
    <div className="w-full bg-card/80 backdrop-blur-sm border-b border-border py-2 px-4 overflow-hidden text-xs transition-colors">
      <div className="animate-ticker space-x-6 items-center">
        {[...items, ...items].map((item, idx) => {
          const isPos = item.isPositive;
          return (
            <div
              key={`${item.name}-${idx}`}
              className="inline-flex items-center space-x-2.5 bg-surface/70 px-3 py-1 rounded-lg border border-borderSubtle hover:border-border transition-colors cursor-default"
            >
              <span className="font-bold text-primary font-mono text-[11px]">{item.name}</span>
              <span className="font-mono text-secondary tabular-nums text-[11px]">{item.value}</span>
              <span
                className={`font-mono font-bold text-[11px] tabular-nums inline-flex items-center px-1.5 py-0.5 rounded border ${
                  isPos 
                    ? 'text-positive bg-positive/10 border-positive/20' 
                    : 'text-negative bg-negative/10 border-negative/20'
                }`}
              >
                {isPos ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
                {item.changePercent}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
