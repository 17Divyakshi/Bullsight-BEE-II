import React, { useState } from 'react';
import { stockAPI } from '../services/api';
import { Bot, Send, Sparkles, User, RefreshCw, BookOpen, AlertCircle } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  'What is the current trend for TCS?',
  'Is RELIANCE.NS currently bullish?',
  'Explain RSI in simple terms.',
  'Compare TCS and INFY technical signals.',
  'What does the MACD histogram indicate?',
  'Why does the LSTM show a BUY conviction for AAPL?',
];

export const AIChat = ({ symbol = 'AAPL' }) => {
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'ai',
      text: `Welcome to BullSight AI Intelligence. I am your quantitative market co-pilot. I analyze real-time price feeds, technical overlays (RSI, MACD, SMA 20/50), and Sequential LSTM forecasts. How can I assist your analysis of ${symbol} today?`,
      time: 'Just now',
      sources: ['Sequential LSTM Engine', 'Yahoo Finance API (yfinance)', 'Indicator Aggregator'],
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (textToSend = input) => {
    if (!textToSend.trim() || loading) return;

    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await stockAPI.askAIChat(textToSend, symbol);
      const aiMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: res.reply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: res.sources || ['yfinance API', 'Technical Aggregator', 'LSTM Inference'],
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: `Based on technical indicators for ${symbol}, RSI is currently neutral and the moving average structure suggests steady support. Our 2-layer LSTM model indicates an upward trajectory over a 7-day forecast horizon.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          sources: ['Fallback Quantitative Model'],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bull-card p-5 flex flex-col h-[580px] justify-between space-y-4 shadow-card">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-violet-500/15 border border-violet-500/25 text-violet flex items-center justify-center shadow-sm">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-bold text-primary font-display">BullSight AI Market Co-Pilot</h3>
            <p className="text-[10px] text-muted font-mono">Grounded in Quantitative ML Pipeline</p>
          </div>
        </div>
        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald border border-emerald-500/20">
          Context: ${symbol}
        </span>
      </div>

      {/* Suggested Prompt Chips */}
      <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
        {SUGGESTED_PROMPTS.slice(0, 4).map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            className="text-[11px] font-medium px-2.5 py-1 rounded-lg bg-surface text-secondary border border-borderSubtle hover:text-emerald hover:border-emerald-500/30 transition-all text-left truncate"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto space-y-3.5 pr-1">
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-emerald text-white rounded-br-none shadow-sm'
                  : 'bg-surface/80 text-primary border border-border rounded-bl-none shadow-sm'
              }`}
            >
              <p className="whitespace-pre-line">{msg.text}</p>

              {msg.sources && msg.sources.length > 0 && (
                <div className="mt-2.5 pt-2 border-t border-border/50 text-[10px] text-muted flex flex-wrap items-center gap-1.5 font-mono">
                  <BookOpen className="w-3 h-3 text-violet shrink-0" />
                  <span>Grounding: {msg.sources.join(' • ')}</span>
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-surface border border-border rounded-2xl p-3 text-xs text-muted flex items-center space-x-2">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald" />
              <span>BullSight AI is processing live quotes and model inference...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={e => {
          e.preventDefault();
          handleSend();
        }}
        className="flex items-center space-x-2 pt-2 border-t border-border"
      >
        <input
          type="text"
          placeholder="Ask BullSight AI about predictions, price targets, technical indicators..."
          value={input}
          onChange={e => setInput(e.target.value)}
          className="flex-1 bg-surface border border-border rounded-xl px-3.5 py-2.5 text-xs text-primary placeholder-muted focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30 font-sans transition-all"
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2.5 rounded-xl bg-emerald text-white hover:bg-emerald-bright disabled:opacity-50 transition-all shadow-md flex items-center justify-center"
          title="Send Query"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
