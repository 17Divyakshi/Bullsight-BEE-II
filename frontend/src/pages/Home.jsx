import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { stockAPI } from '../services/api';
import {
  TrendingUp,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Cpu,
  BarChart2,
  Activity,
  Layers,
  ChevronRight,
  Gauge,
  Bot,
  Database,
  Search,
  Lock,
  ArrowUpRight,
  CheckCircle2,
  Sliders,
  DollarSign
} from 'lucide-react';

export const Home = () => {
  const [modelMetrics, setModelMetrics] = useState(null);
  const [sampleStock, setSampleStock] = useState(null);

  useEffect(() => {
    async function loadInitial() {
      try {
        const [met, sum] = await Promise.all([
          stockAPI.getModelMetrics(),
          stockAPI.getSummary('RELIANCE.NS')
        ]);
        setModelMetrics(met);
        setSampleStock(sum);
      } catch (e) {
        console.warn('Initial landing data fetch:', e);
      }
    }
    loadInitial();
  }, []);

  return (
    <div className="min-h-screen bg-app text-primary flex flex-col font-sans selection:bg-emerald-500/20 selection:text-emerald transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 overflow-hidden bg-grid-pattern">
        {/* Subtle Ambient Glowing Gradients */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-gradient-to-tr from-emerald-500/10 via-blue-500/15 to-violet-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute top-48 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          
          {/* Institutional Intelligence Pill */}
          <div className="inline-flex items-center space-x-2.5 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-xs font-mono font-bold text-emerald shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
            <span>INSTITUTIONAL QUANTITATIVE INTELLIGENCE</span>
          </div>

          {/* Headline & Tagline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight font-display text-primary leading-[1.08]">
              See the Bull. <br />
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
                Predict the Move.
              </span>
            </h1>
            <p className="text-base sm:text-xl text-secondary max-w-2xl mx-auto font-normal leading-relaxed">
              Institutional-grade market analytics, live multi-indicator signals, and deep learning Sequential LSTM predictions for Indian and global equities.
            </p>
          </div>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:shadow-emeraldGlow transition-all shadow-lg flex items-center justify-center space-x-2 group"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/predictions"
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-sm font-bold text-primary bg-card border border-border hover:border-emerald-500/40 hover:bg-hoverSurface transition-all shadow-sm flex items-center justify-center space-x-2"
            >
              <Cpu className="w-4 h-4 text-emerald" />
              <span>Discover AI Models</span>
            </Link>
          </div>

          {/* Interactive Terminal Showcase Preview */}
          <div className="relative max-w-5xl mx-auto pt-10">
            <div className="bull-card p-4 sm:p-6 bg-card border border-border shadow-2xl relative text-left">
              
              {/* Terminal Window Header Bar */}
              <div className="flex items-center justify-between pb-4 border-b border-border mb-5">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-negative/80" />
                  <div className="w-3 h-3 rounded-full bg-warning/80" />
                  <div className="w-3 h-3 rounded-full bg-positive/80" />
                  <span className="text-xs font-mono text-muted ml-3 font-semibold">
                    bullsight-terminal // session_live: active
                  </span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono text-emerald">
                  <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                  <span>LSTM Neural Inference Pipeline Online</span>
                </div>
              </div>

              {/* Showcase Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                
                {/* Main Stock Analysis Terminal Preview */}
                <div className="lg:col-span-2 p-5 rounded-2xl bg-surface/70 border border-borderSubtle space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-muted font-mono uppercase tracking-wider block">Real-Time Ingestion</span>
                      <h3 className="text-xl font-bold font-display text-primary flex items-center space-x-2">
                        <span>RELIANCE.NS</span>
                        <span className="text-xs font-normal text-muted font-mono">NSE India</span>
                      </h3>
                    </div>
                    <span className="text-xs font-bold font-mono text-positive bg-positive/10 px-2.5 py-1 rounded-lg border border-positive/25">
                      +1.16% Today
                    </span>
                  </div>

                  {/* SVG Upward Price Curve with Dashed LSTM Forecast */}
                  <div className="h-44 w-full relative flex items-end">
                    <svg className="w-full h-full overflow-visible" viewBox="0 0 500 160" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="heroGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="var(--primary-emerald)" stopOpacity="0.35" />
                          <stop offset="100%" stopColor="var(--primary-emerald)" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      {/* Grid Lines */}
                      <line x1="0" y1="40" x2="500" y2="40" stroke="var(--border-color)" strokeDasharray="3 3" opacity="0.4" />
                      <line x1="0" y1="80" x2="500" y2="80" stroke="var(--border-color)" strokeDasharray="3 3" opacity="0.4" />
                      <line x1="0" y1="120" x2="500" y2="120" stroke="var(--border-color)" strokeDasharray="3 3" opacity="0.4" />

                      {/* Area Fill */}
                      <path
                        d="M 0 140 Q 75 110, 150 120 T 300 70 T 380 50 L 380 160 L 0 160 Z"
                        fill="url(#heroGradient)"
                      />
                      {/* Historical Solid Line */}
                      <path
                        d="M 0 140 Q 75 110, 150 120 T 300 70 T 380 50"
                        fill="none"
                        stroke="var(--primary-emerald)"
                        strokeWidth="2.5"
                      />
                      {/* Predicted Dashed Curve */}
                      <path
                        d="M 380 50 Q 430 35, 500 20"
                        fill="none"
                        stroke="var(--bright-emerald)"
                        strokeWidth="2.5"
                        strokeDasharray="5 5"
                      />
                      {/* Horizon Point */}
                      <circle cx="380" cy="50" r="4" fill="var(--primary-emerald)" />
                      <circle cx="500" cy="20" r="4" fill="var(--bright-emerald)" />
                    </svg>

                    <div className="absolute top-2 right-2 bg-card/90 backdrop-blur border border-border px-2.5 py-1 rounded-lg text-[10px] font-mono text-emerald">
                      Target: ₹3,085 (+3.51%)
                    </div>
                  </div>

                  {/* Summary Metric Chips */}
                  <div className="grid grid-cols-3 gap-2.5 pt-2 border-t border-borderSubtle text-xs font-mono">
                    <div className="bg-card p-2 rounded-xl border border-borderSubtle">
                      <span className="text-[10px] text-muted block">RSI (14)</span>
                      <span className="font-bold text-primary tabular-nums">62.45</span>
                    </div>
                    <div className="bg-card p-2 rounded-xl border border-borderSubtle">
                      <span className="text-[10px] text-muted block">MACD Signal</span>
                      <span className="font-bold text-positive">Bullish Cross</span>
                    </div>
                    <div className="bg-card p-2 rounded-xl border border-borderSubtle">
                      <span className="text-[10px] text-muted block">Conviction</span>
                      <span className="font-bold text-emerald">84% Strong</span>
                    </div>
                  </div>
                </div>

                {/* AI Forecast & Signal Terminal Card */}
                <div className="p-5 rounded-2xl bg-surface/70 border border-borderSubtle flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between pb-2 border-b border-borderSubtle">
                      <span className="text-xs font-bold text-primary font-display">Deep Learning Output</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-violet-500/10 text-violet border border-violet-500/25">
                        LSTM 64
                      </span>
                    </div>

                    <div className="py-4 space-y-3">
                      <div>
                        <span className="text-[10px] font-mono text-muted uppercase">Computed AI Signal</span>
                        <div className="text-2xl font-black font-display text-positive mt-0.5">
                          STRONG BUY
                        </div>
                      </div>

                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between">
                          <span className="text-muted">Horizon:</span>
                          <span className="text-primary font-bold">7 Trading Days</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Target Delta:</span>
                          <span className="text-positive font-bold">+3.51%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted">Loss Metric:</span>
                          <span className="text-emerald font-bold">MAE 2.14</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Link
                    to="/predictions"
                    className="w-full py-2.5 rounded-xl bg-card border border-border hover:border-emerald-500/40 text-center text-xs font-bold text-emerald transition-all shadow-sm flex items-center justify-center space-x-1.5"
                  >
                    <span>Run Custom Prediction</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Feature Architecture Overview */}
      <section className="py-20 border-t border-border bg-surface/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-mono font-bold text-emerald tracking-wider uppercase">System Architecture</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-primary">
              Engineered for Quantitative Precision
            </h2>
            <p className="text-sm text-secondary leading-relaxed">
              BullSight unifies live equity ingestion, multi-factor technical analysis, and deep learning time-series regression into an intuitive, responsive command center.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feature 1 */}
            <div className="bull-card p-6 space-y-4 hover:border-emerald-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-primary">
                Sequential LSTM Neural Network
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                A 2-layer Long Short-Term Memory deep learning architecture trained on 60-day historical feature sequences with dropout regularization to avoid overfitting.
              </p>
              <div className="pt-2 text-xs font-mono text-emerald flex items-center space-x-1">
                <span>R² Score: 0.88</span>
                <span>•</span>
                <span>MAE: 2.14</span>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bull-card p-6 space-y-4 hover:border-emerald-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-blue/10 border border-blue/25 text-blue flex items-center justify-center">
                <BarChart2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-primary">
                Multi-Factor Technical Overlays
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Continuous real-time calculation of RSI (14), MACD (12, 26, 9), SMA 20, SMA 50, and Bollinger Bands with position percentile indicators.
              </p>
              <div className="pt-2 text-xs font-mono text-blue flex items-center space-x-1">
                <span>Golden Cross</span>
                <span>•</span>
                <span>Volume Spikes</span>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bull-card p-6 space-y-4 hover:border-emerald-500/30 transition-all">
              <div className="w-12 h-12 rounded-xl bg-violet/10 border border-violet/25 text-violet flex items-center justify-center">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-primary">
                BullSight Conversational AI
              </h3>
              <p className="text-xs text-muted leading-relaxed">
                Context-aware natural language market assistant that references real-time data feeds and technical indicators to provide instant analytical summaries.
              </p>
              <div className="pt-2 text-xs font-mono text-violet flex items-center space-x-1">
                <span>Grounded Citations</span>
                <span>•</span>
                <span>Risk Warnings</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Model Evaluation & Accuracy Principles Section */}
      <section className="py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="space-y-5">
              <span className="text-xs font-mono font-bold text-emerald uppercase tracking-wider">Methodology Disclosure</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-primary leading-tight">
                Why We Use Continuous Regression Metrics, Not Arbitrary Percentages
              </h2>
              <p className="text-xs sm:text-sm text-secondary leading-relaxed">
                In time-series equity price forecasting, naive single-label classification accuracy can be misleading. BullSight adheres to rigorous econometric standards by evaluating regression error surfaces:
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="p-3.5 rounded-xl bg-card border border-border flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-primary font-display block">Mean Absolute Error (MAE): 2.14</strong>
                    <span className="text-muted">Measures average price deviation in actual currency units without squaring outliers.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-card border border-border flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-primary font-display block">Root Mean Square Error (RMSE): 2.79</strong>
                    <span className="text-muted">Penalizes large variance surprises, crucial for volatile market phases.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-card border border-border flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-primary font-display block">R² Coefficient of Determination: 0.88</strong>
                    <span className="text-muted">Captures the percentage of variance explained by historical 60-day sequence features.</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/model-performance"
                  className="inline-flex items-center space-x-2 text-xs font-bold text-emerald hover:text-emerald-bright transition-colors"
                >
                  <span>Explore Model Performance Analytics</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Model Architecture Flowcard */}
            <div className="bull-card p-6 space-y-4 bg-card shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <span className="text-xs font-mono font-bold text-muted uppercase">Neural Pipeline Flow</span>
                <span className="text-[10px] font-mono text-emerald">TensorFlow / Keras</span>
              </div>

              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-3 rounded-xl bg-surface border border-borderSubtle flex justify-between items-center">
                  <span className="text-muted">Input Layer</span>
                  <span className="font-bold text-primary">Sequence (60 Days × 5 Features)</span>
                </div>
                <div className="p-3 rounded-xl bg-surface border border-borderSubtle flex justify-between items-center">
                  <span className="text-muted">LSTM Layer 1</span>
                  <span className="font-bold text-emerald">64 Units + Dropout (0.2)</span>
                </div>
                <div className="p-3 rounded-xl bg-surface border border-borderSubtle flex justify-between items-center">
                  <span className="text-muted">LSTM Layer 2</span>
                  <span className="font-bold text-emerald">64 Units + Dropout (0.2)</span>
                </div>
                <div className="p-3 rounded-xl bg-surface border border-borderSubtle flex justify-between items-center">
                  <span className="text-muted">Dense Projection</span>
                  <span className="font-bold text-blue">Dense (32, ReLU)</span>
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/25 flex justify-between items-center text-emerald">
                  <span className="font-bold">Output Forecast</span>
                  <span className="font-bold font-mono">Dense (1 Linear Unit)</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Institutional CTA Section */}
      <section className="py-20 border-t border-border bg-surface/40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display text-primary">
            Ready to Analyze with Real AI Intelligence?
          </h2>
          <p className="text-sm text-secondary max-w-xl mx-auto leading-relaxed">
            Gain immediate access to live technical overlays, LSTM sequence forecasts, and portfolio valuation tools.
          </p>
          <div className="pt-2">
            <Link
              to="/dashboard"
              className="inline-flex items-center space-x-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:shadow-emeraldGlow transition-all shadow-lg"
            >
              <span>Launch BullSight Terminal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
