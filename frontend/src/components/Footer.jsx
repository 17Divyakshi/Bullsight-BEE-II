import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, BookOpen, Activity } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="w-full bg-card/60 backdrop-blur border-t border-border py-10 mt-16 text-center text-xs text-muted space-y-4 font-sans transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        
        {/* Navigation Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-secondary">
          <Link to="/" className="hover:text-emerald transition-colors">Home</Link>
          <Link to="/dashboard" className="hover:text-emerald transition-colors">Dashboard</Link>
          <Link to="/predictions" className="hover:text-emerald transition-colors">AI Predictions</Link>
          <Link to="/screener" className="hover:text-emerald transition-colors">Screener</Link>
          <Link to="/watchlist" className="hover:text-emerald transition-colors">Watchlist</Link>
          <Link to="/model-performance" className="hover:text-emerald transition-colors">Model Performance</Link>
          <Link to="/portfolio" className="hover:text-emerald transition-colors">Portfolio</Link>
          <Link to="/news" className="hover:text-emerald transition-colors">News Feed</Link>
          <Link to="/ai-assistant" className="hover:text-emerald transition-colors">BullSight AI</Link>
          <Link to="/about" className="hover:text-emerald transition-colors">Methodology</Link>
        </div>

        {/* Disclaimer */}
        <div className="max-w-3xl mx-auto space-y-2 pt-2 border-t border-border/50">
          <div className="flex items-center justify-center space-x-1.5 text-primary">
            <ShieldAlert className="w-4 h-4 text-emerald" />
            <span className="font-bold text-xs uppercase tracking-wider font-display">
              Academic AI/ML Capstone Project & Financial Disclosure
            </span>
          </div>
          <p className="leading-relaxed text-[11px] text-muted">
            BullSight is an AI/ML research platform titled <em>“Real-Time Stock Trend Prediction and Analytics Dashboard Using Deep Learning”</em>. Model predictions, conviction scores, and algorithmic signals are generated from historical market data and computational models and do not guarantee future returns or constitute investment advice.
          </p>
          <p className="text-[10px] text-muted font-mono pt-1">
            © 2026 BULLSIGHT AI • Tagline: “See the Bull. Predict the Move.” • Engineered with React 18, FastAPI, yfinance & TensorFlow LSTM
          </p>
        </div>
      </div>
    </footer>
  );
};
