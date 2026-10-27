import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { TrendingUp, Sparkles, ArrowRight, Sun, Moon } from 'lucide-react';

export const Navbar = () => {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className="w-full bg-app/80 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between py-3">
        {/* Logo Branding */}
        <Link to="/" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-blue-500 to-violet-500 p-0.5 shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all shrink-0">
            <div className="w-full h-full bg-card rounded-[10px] overflow-hidden flex items-center justify-center relative">
              <img src="/logo.png" alt="BullSight Logo" className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xl font-black tracking-tight font-display text-primary">
                BULL<span className="text-emerald">SIGHT</span>
              </span>
              <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald border border-emerald-500/20">
                PRO
              </span>
            </div>
            <p className="text-[10px] text-muted font-mono tracking-wide uppercase">
              See the Bull. Predict the Move.
            </p>
          </div>
        </Link>

        {/* Center Links */}
        <div className="hidden lg:flex items-center space-x-7 text-xs font-semibold text-secondary">
          <Link to="/" className={`hover:text-primary transition-colors ${location.pathname === '/' ? 'text-emerald font-bold' : ''}`}>
            Home
          </Link>
          <Link to="/dashboard" className="hover:text-primary transition-colors">
            Dashboard
          </Link>
          <Link to="/predictions" className="hover:text-primary transition-colors">
            AI Predictions
          </Link>
          <Link to="/screener" className="hover:text-primary transition-colors">
            Screener
          </Link>
          <Link to="/model-performance" className="hover:text-primary transition-colors">
            Model Performance
          </Link>
          <Link to="/about" className="hover:text-primary transition-colors">
            Methodology
          </Link>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center space-x-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 sm:p-2.5 rounded-xl border border-border bg-card text-secondary hover:text-primary hover:border-emerald-500/30 transition-all shadow-sm group"
            title={`Switch to ${isDark ? 'Light' : 'Dark (Midnight Emerald)'} mode`}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-warning group-hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-emerald group-hover:-rotate-12 transition-transform" />
            )}
          </button>

          <Link
            to="/ai-assistant"
            className="hidden sm:flex items-center space-x-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-violet bg-violet-500/10 hover:bg-violet-500/20 border border-violet-500/25 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet" />
            <span>BullSight AI</span>
          </Link>

          <Link
            to="/dashboard"
            className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:shadow-emeraldGlow transition-all shadow-md"
          >
            <span>Explore Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </nav>
  );
};
