import React from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { Footer } from '../components/Footer';
import { Info, Cpu, Database, Activity, ArrowDown, ShieldAlert, CheckCircle2, Layers, GitBranch, Terminal } from 'lucide-react';

export const About = () => {
  return (
    <div className="min-h-screen bg-app text-primary flex font-sans transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="Methodology & Architecture" />

        <main className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-5xl w-full mx-auto min-w-0">
          
          {/* Header */}
          <div className="pb-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <Info className="w-5 h-5 text-emerald" />
              <h2 className="text-2xl font-black font-display text-primary tracking-tight">
                Academic Project Methodology & AI Architecture
              </h2>
            </div>
            <p className="text-xs text-muted mt-1 font-mono">
              CapStone Project: <em>“Real-Time Stock Trend Prediction and Analytics Dashboard Using Deep Learning”</em>
            </p>
          </div>

          {/* Project Purpose & Creative Overview */}
          <div className="bull-card p-6 space-y-3 shadow-card">
            <h3 className="text-base font-bold font-display text-primary">Project Overview & Mission</h3>
            <p className="text-xs text-secondary leading-relaxed">
              <strong>BullSight</strong> is a full-stack, production-grade artificial intelligence and quantitative financial analytics platform. Built to combine deep learning time-series regression with real-time equity market data ingestion, it empowers investors to <em>“See the Bull. Predict the Move.”</em>
            </p>
            <p className="text-xs text-muted leading-relaxed">
              Equities from both the National Stock Exchange of India (NSE) and US markets (NASDAQ/NYSE) are processed through technical indicator calculations and a trained Sequential Long Short-Term Memory (LSTM) network to generate multi-day price forecasts and algorithmic signals.
            </p>
          </div>

          {/* Data Pipeline Flowchart */}
          <div className="bull-card p-6 space-y-6 shadow-card">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <h3 className="text-sm font-bold font-display uppercase tracking-wider text-primary">
                End-to-End Quantitative Data Pipeline
              </h3>
              <span className="text-[10px] font-mono text-emerald">Asynchronous REST Flow</span>
            </div>

            <div className="flex flex-col items-center space-y-3 max-w-xl mx-auto text-xs font-mono">
              {/* Step 1 */}
              <div className="w-full p-3.5 rounded-xl bg-surface border border-borderSubtle text-center font-bold text-primary flex items-center justify-between shadow-sm">
                <span className="text-emerald">1. Market Ingestion</span>
                <span className="text-muted font-normal">Yahoo Finance API (yfinance) async fetch</span>
              </div>
              <ArrowDown className="w-4 h-4 text-emerald" />

              {/* Step 2 */}
              <div className="w-full p-3.5 rounded-xl bg-surface border border-borderSubtle text-center font-bold text-primary flex items-center justify-between shadow-sm">
                <span className="text-emerald">2. Preprocessing & Scaling</span>
                <span className="text-muted font-normal">MinMaxScaler (0, 1) & 60-day window framing</span>
              </div>
              <ArrowDown className="w-4 h-4 text-emerald" />

              {/* Step 3 */}
              <div className="w-full p-3.5 rounded-xl bg-surface border border-borderSubtle text-center font-bold text-primary flex items-center justify-between shadow-sm">
                <span className="text-blue">3. Feature Engineering</span>
                <span className="text-muted font-normal">RSI (14), MACD (12,26,9), SMA 20/50, Bollinger</span>
              </div>
              <ArrowDown className="w-4 h-4 text-blue" />

              {/* Step 4 */}
              <div className="w-full p-3.5 rounded-xl bg-violet-500/10 border border-violet-500/25 text-center font-bold text-violet flex items-center justify-between shadow-sm">
                <span>4. Sequential LSTM Inference</span>
                <span className="text-secondary font-normal">2 Layers (64 Units) + Dropout (0.2)</span>
              </div>
              <ArrowDown className="w-4 h-4 text-violet" />

              {/* Step 5 */}
              <div className="w-full p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-center font-bold text-emerald flex items-center justify-between shadow-sm">
                <span>5. Signal Generation & Forecast</span>
                <span className="text-primary font-normal">BUY / HOLD / SELL Conviction + Horizon Target</span>
              </div>
            </div>
          </div>

          {/* Model Accuracy Principles */}
          <div className="bull-card p-6 space-y-4 shadow-card">
            <h3 className="text-base font-bold font-display text-primary">Continuous Regression Evaluation</h3>
            <p className="text-xs text-secondary leading-relaxed">
              Unlike generic classification models that assign a discrete label with artificial "99% accuracy" claims, BullSight uses continuous regression loss functions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-2 text-xs font-mono">
              <div className="p-3.5 rounded-xl bg-surface border border-borderSubtle space-y-1">
                <strong className="text-primary block font-display">Mean Absolute Error (MAE)</strong>
                <p className="text-[11px] text-muted">
                  Measures average magnitude of prediction errors in dollar/rupee terms without squaring effects.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface border border-borderSubtle space-y-1">
                <strong className="text-primary block font-display">Root Mean Squared Error (RMSE)</strong>
                <p className="text-[11px] text-muted">
                  Penalizes extreme outliers, reflecting sensitivity to flash volatility.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-surface border border-borderSubtle space-y-1">
                <strong className="text-emerald block font-display">R² Score (0.88)</strong>
                <p className="text-[11px] text-muted">
                  Proportion of variance in target closing prices predictable from the 60-day historical sequence.
                </p>
              </div>
            </div>
          </div>

          {/* Academic & Financial Disclaimer */}
          <div className="bull-card p-6 border-l-4 border-l-emerald space-y-2 bg-surface/50 shadow-card">
            <div className="flex items-center space-x-2 text-emerald">
              <ShieldAlert className="w-5 h-5" />
              <h3 className="text-xs font-bold font-display uppercase tracking-wider">
                Institutional Academic & Financial Disclosure
              </h3>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              BullSight is created for educational and quantitative research purposes. Deep learning models and technical indicators are computational estimates based on historical distributions and should not be considered investment advice.
            </p>
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};
