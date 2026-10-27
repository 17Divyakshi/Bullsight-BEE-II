import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import {
  LayoutDashboard,
  TrendingUp,
  Sliders,
  Bookmark,
  Briefcase,
  Newspaper,
  Bot,
  Info,
  Settings,
  Activity,
  User,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
  Cpu,
  BarChart3
} from 'lucide-react';

export const Sidebar = () => {
  const { isDark } = useTheme();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Explore Stocks', path: '/screener', icon: Sliders },
    { name: 'AI Predictions', path: '/predictions', icon: TrendingUp, badge: 'LSTM' },
    { name: 'Watchlist', path: '/watchlist', icon: Bookmark },
    { name: 'Model Performance', path: '/model-performance', icon: BarChart3, badge: 'R² 0.88' },
    { name: 'Portfolio & History', path: '/portfolio', icon: Briefcase },
    { name: 'News & Sentiment', path: '/news', icon: Newspaper },
    { name: 'BullSight AI', path: '/ai-assistant', icon: Bot, highlight: true },
    { name: 'Methodology & About', path: '/about', icon: Info },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed top-3 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2.5 rounded-xl bg-card border border-border text-primary shadow-lg hover:border-emerald-500/40 transition-all"
          aria-label="Toggle navigation menu"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 text-emerald" />}
        </button>
      </div>

      {/* Overlay Backdrop for Mobile */}
      {isMobileOpen && (
        <div
          onClick={() => setIsMobileOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-sidebar border-r border-border z-40 flex flex-col justify-between transition-transform duration-300 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-5 overflow-y-auto">
          {/* Logo Section */}
          <div className="flex items-center space-x-3 pb-5 border-b border-border mb-5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 via-blue-500 to-violet-500 p-0.5 shadow-md shadow-emerald-500/10 shrink-0">
              <div className="w-full h-full bg-sidebar rounded-[10px] overflow-hidden flex items-center justify-center">
                <img src="/logo.png" alt="BullSight Logo" className="w-full h-full object-cover" />
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xl font-black tracking-tight font-display text-primary">
                  BULL<span className="text-emerald">SIGHT</span>
                </span>
              </div>
              <p className="text-[9px] font-mono text-muted uppercase tracking-wider font-semibold">
                See the Bull. Predict the Move.
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all relative ${
                      isActive
                        ? isDark
                          ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 text-[#041611] font-extrabold shadow-emeraldGlow'
                          : 'bg-emerald text-white font-bold shadow-sm'
                        : 'text-secondary hover:text-primary hover:bg-hoverSurface'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-4 h-4 ${isActive ? (isDark ? 'text-[#041611]' : 'text-white') : item.highlight ? 'text-violet' : 'text-muted'}`} />
                        <span>{item.name}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        {item.badge && (
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border ${
                            isActive 
                              ? (isDark ? 'bg-[#041611]/15 text-[#041611] border-[#041611]/25' : 'bg-white/20 text-white border-white/30') 
                              : 'bg-surface text-secondary border-border'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                        {isActive && !isDark && (
                          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                        )}
                      </div>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="p-4 border-t border-border space-y-3 bg-surface/50">
          {/* Institutional Intelligence Badge */}
          <div className="p-3 rounded-xl bg-card border border-border space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted uppercase">Engine Status</span>
              <span className="inline-flex items-center space-x-1 text-[10px] font-mono font-bold text-emerald">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald" />
                <span>ONLINE</span>
              </span>
            </div>
            <p className="text-[11px] text-secondary font-medium leading-tight">
              Sequential LSTM 2-layer sequence forecasting active.
            </p>
          </div>

          {/* User Profile */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-emerald-500/15 text-emerald flex items-center justify-center font-bold text-xs border border-emerald-500/25">
                AI
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-primary">Quantitative Terminal</p>
                <p className="text-[10px] font-mono text-muted">Academic License</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted" />
          </div>
        </div>
      </aside>
    </>
  );
};
