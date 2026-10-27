import React, { useState, useEffect } from 'react';
import { Sidebar } from '../components/Sidebar';
import { TopBar } from '../components/TopBar';
import { stockAPI } from '../services/api';
import { Newspaper, Info, ExternalLink, RefreshCw, Search, ThumbsUp, ThumbsDown } from 'lucide-react';

export const News = () => {
  const [news, setNews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function loadNews() {
      setLoading(true);
      try {
        const data = await stockAPI.getNews();
        setNews(data);
      } catch (e) {
        console.error('Error fetching news:', e);
      } finally {
        setLoading(false);
      }
    }
    loadNews();
  }, []);

  const articles = news?.articles || [];

  const filteredArticles = articles.filter(a => {
    const matchesSentiment = filter === 'ALL' || a.sentiment === filter;
    const matchesSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || (a.symbol && a.symbol.toLowerCase().includes(search.toLowerCase()));
    return matchesSentiment && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-app text-primary flex font-sans transition-colors">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title="News & Sentiment Intelligence" />

        <main className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto min-w-0">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-border">
            <div>
              <div className="flex items-center space-x-2">
                <Newspaper className="w-5 h-5 text-emerald" />
                <h2 className="text-2xl font-black font-display text-primary tracking-tight">
                  Financial News & NLP Sentiment Feed
                </h2>
              </div>
              <p className="text-xs text-muted mt-1">
                Real-time Reuters, Bloomberg & financial news parsed through VADER sentiment models.
              </p>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center space-x-1.5 bg-card p-1 rounded-xl border border-border shadow-sm text-xs font-mono">
              {['ALL', 'POSITIVE', 'NEUTRAL', 'NEGATIVE'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                    filter === s
                      ? 'bg-emerald text-white shadow-sm'
                      : 'text-muted hover:text-primary'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Integration Notice if not configured */}
          {news && !news.configured && (
            <div className="bull-card p-4 bg-surface/80 border-l-4 border-l-blue text-xs text-secondary flex items-start space-x-3">
              <Info className="w-5 h-5 shrink-0 text-blue mt-0.5" />
              <div>
                <p className="font-bold text-primary">Live News API Key Status</p>
                <p className="text-muted leading-relaxed mt-0.5">{news.message}</p>
              </div>
            </div>
          )}

          {/* News Feed Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredArticles.map(article => {
              const isPos = article.sentiment === 'POSITIVE';
              const isNeg = article.sentiment === 'NEGATIVE';
              return (
                <div 
                  key={article.id} 
                  className="bull-card p-5 space-y-3 hover:border-emerald-500/30 transition-all flex flex-col justify-between shadow-card"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="text-sm font-bold text-primary leading-snug hover:text-emerald transition-colors cursor-pointer">
                        {article.title}
                      </h3>
                      <span
                        className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 tabular-nums ${
                          isPos
                            ? 'bg-positive/10 text-positive border-positive/25'
                            : isNeg
                            ? 'bg-negative/10 text-negative border-negative/25'
                            : 'bg-surface text-secondary border-borderSubtle'
                        }`}
                      >
                        {article.sentiment} ({Math.round(article.sentimentScore * 100)}%)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono text-muted pt-2 border-t border-border/50">
                    <span>
                      <strong className="text-secondary">{article.source}</strong> • {article.time}
                    </span>
                    {article.symbol && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald border border-emerald-500/20">
                        ${article.symbol}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

        </main>
      </div>
    </div>
  );
};
