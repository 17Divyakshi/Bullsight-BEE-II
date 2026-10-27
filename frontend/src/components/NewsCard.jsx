import React from 'react';
import { Newspaper, ExternalLink, ThumbsUp, ThumbsDown, Info, ShieldCheck } from 'lucide-react';

export const NewsCard = ({ newsData, loading = false }) => {
  const articles = newsData?.articles || [];

  if (loading) {
    return (
      <div className="bull-card p-5 space-y-4 animate-pulse">
        <div className="h-4 w-40 bg-border rounded" />
        <div className="space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-16 w-full bg-border/50 rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bull-card p-5 space-y-4 shadow-card hover:border-emerald-500/30 transition-all">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <Newspaper className="w-4 h-4 text-emerald" />
          <h3 className="text-xs font-bold text-primary font-display uppercase tracking-wider">
            Market News & NLP Sentiment Stream
          </h3>
        </div>
        <span className="text-[10px] font-mono font-medium text-muted">VADER / FinBERT NLP Engine</span>
      </div>

      {!newsData?.configured && (
        <div className="p-3.5 rounded-xl bg-surface border border-border text-xs text-secondary flex items-start space-x-2.5">
          <Info className="w-4 h-4 text-blue shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-primary block">News Sentiment Integration Notice</span>
            <span className="text-muted text-[11px] leading-relaxed">
              {newsData?.message || 'Using simulated market feed. Configure NEWS_API_KEY in Settings to enable real-time Reuters & Bloomberg feeds.'}
            </span>
          </div>
        </div>
      )}

      <div className="space-y-2.5">
        {articles.map((item) => {
          const isPos = item.sentiment === 'POSITIVE';
          const isNeg = item.sentiment === 'NEGATIVE';
          return (
            <div
              key={item.id}
              className="p-3.5 rounded-xl bg-surface/60 border border-borderSubtle hover:border-border hover:bg-hoverSurface/60 transition-all flex flex-col space-y-2"
            >
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-xs font-semibold text-primary leading-snug hover:text-emerald cursor-pointer transition-colors">
                  {item.title}
                </h4>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shrink-0 tabular-nums ${
                    isPos
                      ? 'bg-positive/10 text-positive border-positive/25'
                      : isNeg
                      ? 'bg-negative/10 text-negative border-negative/25'
                      : 'bg-surface text-secondary border-borderSubtle'
                  }`}
                >
                  {item.sentiment} ({Math.round((item.sentimentScore || 0) * 100)}%)
                </span>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-muted pt-1.5 border-t border-border/40">
                <span>
                  <strong className="text-secondary">{item.source}</strong> • {item.time}
                </span>
                {item.symbol && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald border border-emerald-500/20">
                    ${item.symbol}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
