import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { AIChat } from '../components/AIChat';
import { Bot, Sparkles, Cpu, ShieldCheck } from 'lucide-react';
import { STOCKS } from '../data/stocks';

export const AI = () => {
  const [symbol, setSymbol] = useState('AAPL');

  return (
    <div className="min-h-screen bg-app text-primary flex font-sans transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="BullSight AI Assistant" />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-5xl w-full mx-auto min-w-0">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <div className="flex items-center space-x-2">
                <Bot className="w-5 h-5 text-emerald" />
                <h2 className="text-2xl font-black font-display text-primary tracking-tight">
                  Quantitative Financial AI Assistant
                </h2>
              </div>
              <p className="text-xs text-muted mt-1">
                Conversational market intelligence grounded in real-time indicators and deep LSTM forecasting.
              </p>
            </div>

            {/* Context Selector */}
            <div className="flex items-center space-x-2 bg-card p-1.5 rounded-xl border border-border shadow-sm">
              <span className="text-xs font-mono text-muted ml-2">Active Stock:</span>
              <select
                value={symbol}
                onChange={e => setSymbol(e.target.value)}
                className="bg-surface border border-borderSubtle rounded-lg px-2.5 py-1 text-xs font-mono font-bold text-primary focus:outline-none focus:border-emerald-500/50 max-w-[200px]"
              >
                <optgroup label="US Equities & Tech">
                  {STOCKS.filter(s => s.market === 'US').map(s => (
                    <option key={s.symbol} value={s.symbol}>{s.symbol} ({s.name})</option>
                  ))}
                </optgroup>
                <optgroup label="Indian NIFTY 50 (NSE)">
                  {STOCKS.filter(s => s.market === 'INDIAN').map(s => (
                    <option key={s.symbol} value={s.symbol}>{s.symbol} ({s.name})</option>
                  ))}
                </optgroup>
                <optgroup label="Crypto & ETFs">
                  {STOCKS.filter(s => s.market === 'CRYPTO' || s.sector === 'Index ETF').map(s => (
                    <option key={s.symbol} value={s.symbol}>{s.symbol} ({s.name})</option>
                  ))}
                </optgroup>
              </select>
            </div>
          </div>

          {/* AI Chatbox Component */}
          <AIChat symbol={symbol} />

        </main>
      </div>
    </div>
  );
};
