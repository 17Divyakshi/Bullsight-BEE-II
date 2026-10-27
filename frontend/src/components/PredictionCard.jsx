import React from 'react';
import { TrendingUp, TrendingDown, Target, ShieldCheck, Cpu, ArrowUpRight, ArrowDownRight, AlertCircle } from 'lucide-react';

export const PredictionCard = ({ prediction, symbol, loading = false }) => {
  if (loading || !prediction) {
    return (
      <div className="bull-card p-5 space-y-4 animate-pulse border-l-4 border-l-emerald">
        <div className="flex justify-between items-center">
          <div className="h-4 w-32 bg-border rounded" />
          <div className="h-4 w-20 bg-border rounded-full" />
        </div>
        <div className="h-10 w-28 bg-border rounded" />
        <div className="h-16 w-full bg-border rounded-xl" />
        <div className="h-2 w-full bg-border rounded-full" />
      </div>
    );
  }

  const isBullish = prediction.trend === 'BULLISH' || prediction.signal === 'BUY';
  const confidencePct = Math.round((prediction.confidence || 0.82) * 100);
  const isPositiveMove = Number(prediction.predicted_change_percent || 0) >= 0;
  const isINR = symbol?.endsWith('.NS');
  const currency = isINR ? '₹' : '$';

  return (
    <div className="bull-card p-5 space-y-4 relative overflow-hidden flex flex-col justify-between border-l-4 border-l-emerald shadow-card hover:border-emerald-500/40 transition-all">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <Cpu className="w-4 h-4 text-emerald" />
          <h3 className="text-xs font-bold text-primary font-display uppercase tracking-wider">
            AI LSTM Forecast ({symbol})
          </h3>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-violet-500/10 text-violet border border-violet-500/25">
          {prediction.model || 'LSTM Neural Net'}
        </span>
      </div>

      {/* Primary Forecast Display */}
      <div className="flex items-center justify-between py-1">
        <div>
          <span className="text-xs text-muted font-medium block mb-1">Forecast Target</span>
          <span className="text-sm font-bold font-mono text-primary tabular-nums">
            {prediction.horizon_days || 7} Days Horizon
          </span>
        </div>

        <div className="text-right">
          <span className="text-xs text-muted font-medium block mb-1">Target Price</span>
          <span className="text-2xl font-black font-mono text-emerald tabular-nums tracking-tight">
            {currency}{Number(prediction.predicted_price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Signal & Return Badge */}
      <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-surface/70 border border-borderSubtle">
        {/* Signal */}
        <div className="flex items-center space-x-2.5">
          <div className={`p-2 rounded-xl border ${isBullish ? 'bg-positive/10 border-positive/25 text-positive' : 'bg-negative/10 border-negative/25 text-negative'}`}>
            {isBullish ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </div>
          <div>
            <span className="text-[10px] text-muted font-medium block uppercase tracking-wider">Conviction</span>
            <span className={`text-sm font-black font-display tracking-tight ${isBullish ? 'text-positive' : 'text-negative'}`}>
              {prediction.signal || 'BUY'}
            </span>
          </div>
        </div>

        {/* Expected Move */}
        <div className="text-right flex flex-col justify-center">
          <span className="text-[10px] text-muted font-medium block uppercase tracking-wider">Expected Move</span>
          <span className={`text-sm font-bold font-mono tabular-nums flex items-center justify-end ${isPositiveMove ? 'text-positive' : 'text-negative'}`}>
            {isPositiveMove ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            {isPositiveMove ? '+' : ''}{prediction.predicted_change_percent}%
          </span>
        </div>
      </div>

      {/* Model Confidence Meter */}
      <div className="space-y-1.5 pt-1">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-muted">Model Conviction Score:</span>
          <span className="font-bold text-emerald tabular-nums">{confidencePct}%</span>
        </div>
        <div className="w-full h-2 bg-surface rounded-full overflow-hidden border border-borderSubtle">
          <div
            className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-700"
            style={{ width: `${confidencePct}%` }}
          />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="pt-2 border-t border-border flex items-center space-x-1.5 text-[10px] text-muted">
        <AlertCircle className="w-3.5 h-3.5 text-violet shrink-0" />
        <span>Probabilistic ML forecast from sequence regression. Not financial advice.</span>
      </div>
    </div>
  );
};
