import React from 'react';
import { Activity, Gauge, TrendingUp, TrendingDown, Layers } from 'lucide-react';

export const IndicatorCard = ({ indicators, loading = false }) => {
  if (loading || !indicators) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="bull-card p-4 space-y-3 animate-pulse">
            <div className="flex justify-between items-center">
              <div className="h-3 w-20 bg-border rounded" />
              <div className="h-4 w-12 bg-border rounded-full" />
            </div>
            <div className="h-6 w-24 bg-border rounded" />
            <div className="h-2 w-32 bg-border/60 rounded" />
          </div>
        ))}
      </div>
    );
  }

  const items = [
    {
      name: 'RSI (14-Day)',
      value: indicators.rsi?.value ? Number(indicators.rsi.value).toFixed(2) : '50.00',
      signal: indicators.rsi?.signal || 'Neutral',
      desc: 'Momentum oscillator (0-100)',
      isRsi: true,
      rsiVal: Number(indicators.rsi?.value || 50),
    },
    {
      name: 'MACD (12, 26, 9)',
      value: indicators.macd?.value ? Number(indicators.macd.value).toFixed(2) : '0.00',
      signal: indicators.macd?.signal || 'Neutral',
      desc: 'Signal & momentum crossover',
    },
    {
      name: 'SMA 20 Overlay',
      value: indicators.sma20?.value ? `$${Number(indicators.sma20.value).toFixed(2)}` : 'N/A',
      signal: indicators.sma20?.signal || 'Neutral',
      desc: 'Short-term trend support',
    },
    {
      name: 'EMA 20 Overlay',
      value: indicators.ema20?.value ? `$${Number(indicators.ema20.value).toFixed(2)}` : 'N/A',
      signal: indicators.ema20?.signal || 'Neutral',
      desc: 'Exponential weighted average',
    },
    {
      name: 'Bollinger Band Position',
      value: indicators.bollinger?.position ? `${(indicators.bollinger.position * 100).toFixed(1)}%` : '50.0%',
      signal: indicators.bollinger?.signal || 'Neutral',
      desc: 'Volatility envelope band',
      isBollinger: true,
      bollVal: indicators.bollinger?.position ? indicators.bollinger.position * 100 : 50,
    },
  ];

  const getSignalBadge = (sig) => {
    switch (sig?.toUpperCase()) {
      case 'BULLISH':
      case 'BUY':
        return 'text-positive bg-positive/10 border-positive/25';
      case 'BEARISH':
      case 'SELL':
        return 'text-negative bg-negative/10 border-negative/25';
      default:
        return 'text-blue bg-blue/10 border-blue/25';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
      {items.map((item, idx) => (
        <div key={idx} className="bull-card p-4 space-y-2.5 flex flex-col justify-between hover:border-emerald-500/30 transition-all">
          <div className="flex items-start justify-between gap-2">
            <span className="text-xs font-semibold text-muted font-display truncate">{item.name}</span>
            <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 uppercase ${getSignalBadge(item.signal)}`}>
              {item.signal}
            </span>
          </div>

          <div>
            <div className="font-mono text-xl font-black text-primary tabular-nums tracking-tight">
              {item.value}
            </div>

            {/* Mini Progress bar indicator for RSI or Bollinger */}
            {item.isRsi && (
              <div className="w-full bg-surface rounded-full h-1.5 mt-2 overflow-hidden border border-borderSubtle">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    item.rsiVal > 70 ? 'bg-negative' : item.rsiVal < 30 ? 'bg-positive' : 'bg-emerald'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(0, item.rsiVal))}%` }}
                />
              </div>
            )}
            {item.isBollinger && (
              <div className="w-full bg-surface rounded-full h-1.5 mt-2 overflow-hidden border border-borderSubtle">
                <div 
                  className="h-full bg-blue rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.max(0, item.bollVal))}%` }}
                />
              </div>
            )}
          </div>

          <p className="text-[10px] text-muted truncate">{item.desc}</p>
        </div>
      ))}
    </div>
  );
};
