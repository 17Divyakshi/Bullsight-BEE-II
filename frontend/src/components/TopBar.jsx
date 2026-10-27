import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { SearchBar } from './SearchBar';
import { 
  Sun, 
  Moon, 
  Bell, 
  ShieldCheck, 
  Activity, 
  ChevronDown, 
  Sparkles,
  TrendingUp,
  CheckCircle2,
  X
} from 'lucide-react';

export const TopBar = ({ 
  title = "Dashboard", 
  subtitle = "Live Institutional Market Intelligence",
  onSelectSymbol,
  currentSymbol = "AAPL" 
}) => {
  const navigate = useNavigate();
  const { theme, toggleTheme, isDark } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const notifications = [
    { id: 1, title: 'LSTM Sequence Engine Active', desc: '60-day sequence regression model loaded for NSE & US equities.', time: '1m ago', unread: true },
    { id: 2, title: 'Technical Indicators Synchronized', desc: 'RSI, MACD, and Bollinger Bands real-time feeds refreshed.', time: '5m ago', unread: false },
    { id: 3, title: 'Yahoo Finance Feed Online', desc: 'Real-time equity quotes connected via yfinance asynchronous pipeline.', time: '12m ago', unread: false }
  ];

  return (
    <header className="sticky top-0 z-30 w-full border-b border-border bg-app/80 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3 transition-colors">
      <div className="flex items-center justify-between gap-4">
        
        {/* Left: Contextual Breadcrumb / Title */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center space-x-2 text-xs font-mono text-muted">
            <span className="hover:text-primary transition-colors">BULLSIGHT</span>
            <span>/</span>
            <span className="text-emerald font-semibold uppercase tracking-wider">{title}</span>
          </div>
          <div className="flex items-center space-x-3 mt-0.5">
            <h1 className="text-lg sm:text-xl font-extrabold font-display tracking-tight text-primary truncate">
              {title}
            </h1>
            <span className="hidden md:inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald animate-pulse" />
              <span>LIVE FEED</span>
            </span>
          </div>
        </div>

        {/* Center / Right Controls */}
        <div className="flex items-center space-x-2.5 sm:space-x-3.5">
          {/* Stock Search (if handler provided) */}
          {onSelectSymbol && (
            <div className="hidden sm:block w-48 lg:w-64">
              <SearchBar onSelectSymbol={onSelectSymbol} currentSymbol={currentSymbol} />
            </div>
          )}

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

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 sm:p-2.5 rounded-xl border border-border bg-card text-secondary hover:text-primary hover:border-emerald-500/30 transition-all shadow-sm"
              title="Notifications"
              aria-label="View notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald ring-2 ring-card animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-2xl border border-border bg-card shadow-2xl p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-bold font-display uppercase tracking-wider text-primary">System Signals</span>
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald font-bold">3 Active</span>
                  </div>
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="p-1 rounded-lg text-muted hover:text-primary hover:bg-hoverSurface"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <div className="divide-y divide-border/60 max-h-72 overflow-y-auto mt-2">
                  {notifications.map(item => (
                    <div key={item.id} className="py-2.5 space-y-1 hover:bg-hoverSurface/50 px-2 rounded-lg transition-colors">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-primary flex items-center space-x-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald" />
                          <span>{item.title}</span>
                        </span>
                        <span className="text-[10px] font-mono text-muted">{item.time}</span>
                      </div>
                      <p className="text-[11px] text-muted leading-relaxed pl-5">
                        {item.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl border border-border bg-card hover:border-emerald-500/30 transition-all shadow-sm"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald flex items-center justify-center font-mono font-bold text-xs border border-emerald-500/20">
                BS
              </div>
              <div className="hidden md:block text-left">
                <div className="text-xs font-bold text-primary leading-tight">Institutional Terminal</div>
                <div className="text-[10px] font-mono text-emerald">Academic Pro Tier</div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-muted hidden sm:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-border bg-card shadow-2xl p-2 z-50 text-xs font-medium">
                <div className="px-3 py-2 border-b border-border mb-1">
                  <p className="font-bold text-primary">BullSight Terminal</p>
                  <p className="text-[10px] font-mono text-muted truncate">college.aiml@bullsight.ai</p>
                </div>
                <button 
                  onClick={() => { setShowUserMenu(false); navigate('/settings'); }}
                  className="w-full text-left px-3 py-1.5 text-muted hover:text-primary hover:bg-hoverSurface rounded-lg transition-colors"
                >
                  Workspace Settings
                </button>
                <button 
                  onClick={() => { setShowUserMenu(false); navigate('/settings'); }}
                  className="w-full text-left px-3 py-1.5 text-muted hover:text-primary hover:bg-hoverSurface rounded-lg transition-colors"
                >
                  API Key Management
                </button>
                <div className="border-t border-border mt-1 pt-1">
                  <button 
                    onClick={() => { setShowUserMenu(false); localStorage.removeItem('bullsight_theme'); window.location.reload(); }}
                    className="w-full text-left px-3 py-1.5 text-negative hover:bg-negative/10 rounded-lg transition-colors"
                  >
                    Reset Terminal Cache
                  </button>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </header>
  );
};
