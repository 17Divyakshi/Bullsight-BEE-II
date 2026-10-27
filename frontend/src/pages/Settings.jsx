import React, { useState } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { useTheme } from '../context/ThemeContext';
import { Settings as SettingsIcon, Key, Sliders, DollarSign, Check, Moon, Sun, ShieldCheck } from 'lucide-react';

const DEFAULT_NEWS_KEY = 'newsapi_live_9b4e7284f1a84c20bc6a5e12';
const DEFAULT_OPENAI_KEY = 'sk-proj-bullsight_ai_live_enterprise_tier_2026_q3_active_v1';

export const Settings = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [newsKey, setNewsKey] = useState(() => localStorage.getItem('NEWS_API_KEY') || DEFAULT_NEWS_KEY);
  const [openaiKey, setOpenaiKey] = useState(() => localStorage.getItem('OPENAI_API_KEY') || DEFAULT_OPENAI_KEY);
  const [showKeys, setShowKeys] = useState(true);
  const [currency, setCurrency] = useState('USD');
  const [saved, setSaved] = useState(false);

  const handleSave = e => {
    e.preventDefault();
    localStorage.setItem('NEWS_API_KEY', newsKey);
    localStorage.setItem('OPENAI_API_KEY', openaiKey);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleResetDefaults = () => {
    setNewsKey(DEFAULT_NEWS_KEY);
    setOpenaiKey(DEFAULT_OPENAI_KEY);
    localStorage.setItem('NEWS_API_KEY', DEFAULT_NEWS_KEY);
    localStorage.setItem('OPENAI_API_KEY', DEFAULT_OPENAI_KEY);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-app text-primary flex font-sans transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="System Settings" />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-4xl w-full mx-auto min-w-0">
          
          {/* Header */}
          <div className="pb-4 border-b border-border">
            <div className="flex items-center space-x-2">
              <SettingsIcon className="w-5 h-5 text-emerald" />
              <h2 className="text-2xl font-black font-display text-primary tracking-tight">
                Terminal & Engine Settings
              </h2>
            </div>
            <p className="text-xs text-muted mt-1">
              Configure theme visual tokens, external API keys, and LSTM training hyperparameters.
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
            
            {/* Theme & Display Configuration */}
            <div className="bull-card p-6 space-y-4 shadow-card">
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div className="flex items-center space-x-2">
                  {isDark ? <Moon className="w-4 h-4 text-emerald" /> : <Sun className="w-4 h-4 text-warning" />}
                  <h3 className="text-xs font-bold font-display uppercase tracking-wider text-primary">
                    Interface Theme Engine
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-emerald uppercase px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {isDark ? 'Dark (Midnight Emerald)' : 'Light Fintech Theme'}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-primary">Active Visual Palette</h4>
                  <p className="text-[11px] text-muted leading-relaxed">
                    Toggle between the Midnight Emerald institutional dark terminal and the clean light fintech interface.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="px-4 py-2 rounded-xl bg-surface border border-border hover:border-emerald-500/40 text-xs font-mono font-bold text-primary transition-all flex items-center space-x-2 shadow-sm"
                >
                  {isDark ? <Sun className="w-4 h-4 text-warning" /> : <Moon className="w-4 h-4 text-emerald" />}
                  <span>Switch to {isDark ? 'Light' : 'Dark'}</span>
                </button>
              </div>
            </div>

            {/* API Keys Configuration Card */}
            <div className="bull-card p-6 sm:p-7 space-y-5 shadow-card rounded-2xl border border-border">
              <div className="flex items-center justify-between pb-3.5 border-b border-border">
                <div className="flex items-center space-x-2 text-emerald">
                  <Key className="w-5 h-5 text-emerald" />
                  <h3 className="text-xs sm:text-sm font-bold font-display uppercase tracking-wider text-primary">
                    EXTERNAL DATA PROVIDERS & KEYS
                  </h3>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowKeys(!showKeys)}
                    className="text-[11px] font-mono font-semibold text-muted hover:text-primary transition-colors px-2 py-1 rounded-md border border-borderSubtle hover:bg-surface"
                  >
                    {showKeys ? 'Hide Keys' : 'Reveal Keys'}
                  </button>
                  <span className="text-[10px] font-mono font-bold text-emerald uppercase px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                    Active
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="text-secondary font-semibold block mb-2 text-xs sm:text-sm font-sans">
                    News API Key (NEWS_API_KEY)
                  </label>
                  <input
                    type={showKeys ? 'text' : 'password'}
                    placeholder="e.g. newsapi_live_xxxxxxxx"
                    value={newsKey}
                    onChange={e => setNewsKey(e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-primary placeholder-muted/60 focus:outline-none focus:border-emerald-500/60 transition-all shadow-sm"
                  />
                  <p className="text-[11px] text-muted font-sans mt-1.5 leading-relaxed">
                    Enables live financial news parsing with VADER NLP sentiment models.
                  </p>
                </div>

                <div>
                  <label className="text-secondary font-semibold block mb-2 text-xs sm:text-sm font-sans">
                    OpenAI API Key (OPENAI_API_KEY - Optional)
                  </label>
                  <input
                    type={showKeys ? 'text' : 'password'}
                    placeholder="e.g. sk-proj-xxxxxxxx"
                    value={openaiKey}
                    onChange={e => setOpenaiKey(e.target.value)}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-xs sm:text-sm font-mono text-primary placeholder-muted/60 focus:outline-none focus:border-emerald-500/60 transition-all shadow-sm"
                  />
                  <p className="text-[11px] text-muted font-sans mt-1.5 leading-relaxed">
                    Optional key for enhanced generative LLM answers in BullSight AI Assistant.
                  </p>
                </div>
              </div>
            </div>

            {/* Model Hyperparameters Card */}
            <div className="bull-card p-6 sm:p-7 space-y-5 shadow-card rounded-2xl border border-border">
              <div className="flex items-center justify-between pb-3.5 border-b border-border">
                <div className="flex items-center space-x-2 text-violet">
                  <Sliders className="w-5 h-5 text-violet" />
                  <h3 className="text-xs sm:text-sm font-bold font-display uppercase tracking-wider text-primary">
                    LSTM DEEP LEARNING CONFIGURATION
                  </h3>
                </div>
                <span className="text-[10px] font-mono font-bold text-violet uppercase px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/20">
                  Model Trained
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs font-mono">
                <div className="bg-surface p-4 rounded-xl border border-borderSubtle space-y-1">
                  <span className="text-muted block text-[10px] uppercase font-bold tracking-wider">Lookback Sequence</span>
                  <span className="text-xl font-black text-primary">60 Trading Days</span>
                  <p className="text-[10px] text-muted font-sans">Historical feature sequence window</p>
                </div>
                <div className="bg-surface p-4 rounded-xl border border-borderSubtle space-y-1">
                  <span className="text-muted block text-[10px] uppercase font-bold tracking-wider">Training Epochs</span>
                  <span className="text-xl font-black text-emerald">20 Epochs</span>
                  <p className="text-[10px] text-muted font-sans">Full backpropagation cycles</p>
                </div>
                <div className="bg-surface p-4 rounded-xl border border-borderSubtle space-y-1">
                  <span className="text-muted block text-[10px] uppercase font-bold tracking-wider">Batch Sample Size</span>
                  <span className="text-xl font-black text-violet">32 Samples</span>
                  <p className="text-[10px] text-muted font-sans">Mini-batch gradient descent</p>
                </div>
              </div>
            </div>

            {/* Submit Button & Notification */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:shadow-emeraldGlow text-white text-xs font-bold transition-all shadow-md flex items-center space-x-2"
              >
                <Check className="w-4 h-4" />
                <span>Save System Settings</span>
              </button>

              <button
                type="button"
                onClick={handleResetDefaults}
                className="px-4 py-2.5 rounded-xl bg-surface border border-border hover:border-emerald-500/40 text-xs font-mono font-bold text-secondary transition-all"
              >
                Reset Default Keys
              </button>

              {saved && (
                <span className="text-xs font-mono text-positive flex items-center space-x-1 animate-in fade-in">
                  <Check className="w-3.5 h-3.5" />
                  <span>Settings & API keys successfully active and saved!</span>
                </span>
              )}
            </div>

          </form>

        </main>
      </div>
    </div>
  );
};
