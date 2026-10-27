import React, { useState, useEffect, useRef } from 'react';
import { Search, ChevronRight, X, Globe, Sparkles, ArrowRight, Layers } from 'lucide-react';
import { STOCKS } from '../data/stocks';

export const SearchBar = ({ onSelectSymbol, currentSymbol = 'AAPL' }) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [marketFilter, setMarketFilter] = useState('ALL');
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
      } else if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const filtered = STOCKS.filter(s => {
    const matchesQuery =
      s.symbol.toLowerCase().includes(query.toLowerCase()) ||
      s.name.toLowerCase().includes(query.toLowerCase()) ||
      s.sector.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      marketFilter === 'ALL' ||
      (marketFilter === 'US' && s.market === 'US') ||
      (marketFilter === 'INDIAN' && s.market === 'INDIAN') ||
      (marketFilter === 'CRYPTO' && s.market === 'CRYPTO');

    return matchesQuery && matchesCategory;
  });

  const handleSelect = sym => {
    onSelectSymbol(sym.trim().toUpperCase());
    setQuery('');
    setIsOpen(false);
  };

  const exactMatchExists = STOCKS.some(
    s => s.symbol.toUpperCase() === query.trim().toUpperCase()
  );

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <Search className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search 40+ equities or type any ticker..."
          value={query}
          onChange={e => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={e => {
            if (e.key === 'Enter' && query.trim()) {
              e.preventDefault();
              handleSelect(query.trim());
            }
          }}
          className="w-full bg-card border border-border rounded-xl pl-10 pr-16 py-2 text-xs font-mono text-primary placeholder-muted focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 transition-all shadow-sm"
        />
        <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center space-x-1">
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-muted hover:text-primary transition-colors"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[9px] font-mono text-muted bg-surface border border-border rounded">
              ⌘K
            </kbd>
          )}
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 bg-card border border-border rounded-2xl shadow-2xl z-50 max-h-80 overflow-y-auto p-1.5 animate-in fade-in slide-in-from-top-1">
          
          {/* Market Category Quick Filter Pills */}
          <div className="flex items-center space-x-1 p-1 border-b border-border/60 text-[10px] font-mono">
            {[
              { id: 'ALL', label: 'All Markets' },
              { id: 'US', label: 'US Equities' },
              { id: 'INDIAN', label: 'NSE India' },
              { id: 'CRYPTO', label: 'Crypto & ETFs' },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setMarketFilter(cat.id);
                }}
                className={`px-2 py-0.5 rounded-lg transition-colors font-medium ${
                  marketFilter === cat.id
                    ? 'bg-emerald-500/15 text-emerald font-bold border border-emerald-500/30'
                    : 'text-muted hover:text-primary hover:bg-surface'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="px-3 py-1.5 text-[10px] font-mono font-bold text-muted uppercase tracking-wider flex justify-between">
            <span>Equities ({filtered.length})</span>
            <span>Exchange / Sector</span>
          </div>

          {filtered.length === 0 ? (
            <div className="p-4 text-center space-y-2">
              <p className="text-xs text-muted">
                No catalog preset matching "{query}".
              </p>
              {query.trim() && (
                <button
                  onClick={() => handleSelect(query.trim())}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald border border-emerald-500/30 text-xs font-mono font-bold hover:bg-emerald-500/20 transition-all"
                >
                  <span>Load custom ticker "{query.trim().toUpperCase()}"</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ) : (
            <>
              {filtered.map(item => (
                <button
                  key={item.symbol}
                  onClick={() => handleSelect(item.symbol)}
                  className={`w-full px-3 py-2 rounded-xl flex items-center justify-between text-left transition-colors ${
                    currentSymbol === item.symbol 
                      ? 'bg-emerald-500/10 text-emerald font-semibold border border-emerald-500/20' 
                      : 'text-primary hover:bg-surface'
                  }`}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <span className="font-mono font-bold text-xs shrink-0">{item.symbol}</span>
                    <span className="text-xs text-muted truncate max-w-[130px] sm:max-w-xs">{item.name}</span>
                  </div>
                  <div className="flex items-center space-x-1.5 shrink-0">
                    <span className="text-[9px] font-mono text-muted hidden sm:inline px-1.5 py-0.5 rounded bg-surface border border-borderSubtle">
                      {item.sector}
                    </span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-surface text-secondary border border-borderSubtle">
                      {item.exchange}
                    </span>
                  </div>
                </button>
              ))}

              {/* Direct query action if user typed custom ticker not exactly in presets */}
              {query.trim() && !exactMatchExists && (
                <button
                  onClick={() => handleSelect(query.trim())}
                  className="w-full mt-1 px-3 py-2 rounded-xl flex items-center justify-between text-left bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald border border-emerald-500/20 transition-colors"
                >
                  <div className="flex items-center space-x-2 font-mono text-xs font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Open custom ticker "{query.trim().toUpperCase()}"</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

