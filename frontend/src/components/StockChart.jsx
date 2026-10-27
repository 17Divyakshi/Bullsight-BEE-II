import React, { useState, useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';
import createPlotlyComponent from 'react-plotly.js/factory';
import Plotly from 'plotly.js-dist-min';
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Bar
} from 'recharts';
import { 
  Calendar, 
  Layers, 
  BarChart2, 
  Activity, 
  Maximize2,
  TrendingUp,
  CandlestickChart
} from 'lucide-react';

let PlotComponent = null;
try {
  const factory = typeof createPlotlyComponent === 'function' 
    ? createPlotlyComponent 
    : createPlotlyComponent?.default;
  const p = Plotly?.default || Plotly;
  if (factory && p) {
    PlotComponent = factory(p);
  }
} catch (e) {
  console.warn('Plotly initialization warning:', e);
}

export const StockChart = ({ 
  history = [], 
  symbol = 'AAPL', 
  timeframe = '3M', 
  onTimeframeChange,
  forecastPoints = null,
  loading = false
}) => {
  const { isDark } = useTheme();
  const PlotComp = PlotComponent;
  const isINR = symbol.endsWith('.NS');
  const currency = isINR ? '₹' : '$';

  // Safe normalization of history: array or history.history
  const safeHistory = useMemo(() => {
    if (Array.isArray(history)) return history;
    if (history && Array.isArray(history.history)) return history.history;
    return [];
  }, [history]);

  const [chartMode, setChartMode] = useState(PlotComponent ? 'plotly' : 'recharts');
  const [chartType, setChartType] = useState('candlestick');
  const [showSMA20, setShowSMA20] = useState(true);
  const [showSMA50, setShowSMA50] = useState(true);
  const [showVolume, setShowVolume] = useState(true);

  const TIMEFRAMES = ['1D', '5D', '1M', '3M', '6M', '1Y', '5Y', 'MAX'];

  // Colors aligned with Obsidian Emerald & Light System
  const colors = useMemo(() => ({
    bg: isDark ? '#0D1D18' : '#FFFFFF',
    text: isDark ? '#F0FDF4' : '#111827',
    muted: isDark ? '#5C7E76' : '#6B7280',
    grid: isDark ? 'rgba(26, 57, 48, 0.4)' : 'rgba(229, 231, 235, 0.8)',
    emerald: isDark ? '#00D084' : '#047857',
    positive: isDark ? '#00E599' : '#15803D',
    negative: isDark ? '#FF5A5A' : '#DC2626',
    blue: isDark ? '#2DD4BF' : '#2563EB',
    violet: isDark ? '#818CF8' : '#7C3AED',
  }), [isDark]);

  // Prepare Plotly Traces
  const plotlyData = useMemo(() => {
    if (!safeHistory || safeHistory.length === 0) return [];

    const dates = safeHistory.map(d => d.date);
    const opens = safeHistory.map(d => d.open || d.close);
    const highs = safeHistory.map(d => d.high || d.close);
    const lows = safeHistory.map(d => d.low || d.close);
    const closes = safeHistory.map(d => d.close);
    const volumes = safeHistory.map(d => d.volume || 0);
    const sma20s = safeHistory.map(d => d.sma20);
    const sma50s = safeHistory.map(d => d.sma50);

    const traces = [];

    // 1. Primary Price Trace
    if (chartType === 'candlestick') {
      traces.push({
        type: 'candlestick',
        x: dates,
        open: opens,
        high: highs,
        low: lows,
        close: closes,
        name: symbol,
        yaxis: 'y',
        increasing: { line: { color: colors.positive, width: 1.5 }, fillcolor: colors.positive },
        decreasing: { line: { color: colors.negative, width: 1.5 }, fillcolor: colors.negative },
        hoverinfo: 'x+y+text',
        hoverlabel: { bgcolor: colors.bg, font: { color: colors.text, family: 'JetBrains Mono' } }
      });
    } else {
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: dates,
        y: closes,
        name: `${symbol} Close`,
        yaxis: 'y',
        line: { color: colors.emerald, width: 2 },
        fill: 'tozeroy',
        fillcolor: isDark ? 'rgba(0, 229, 153, 0.22)' : 'rgba(4, 120, 87, 0.08)',
        hoverlabel: { bgcolor: colors.bg, font: { color: colors.text, family: 'JetBrains Mono' } }
      });
    }

    // 2. SMA 20 Overlay
    if (showSMA20) {
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: dates,
        y: sma20s,
        name: 'SMA 20',
        yaxis: 'y',
        line: { color: colors.blue, width: 1.5, dash: 'dot' },
        hoverinfo: 'name+y'
      });
    }

    // 3. SMA 50 Overlay
    if (showSMA50) {
      traces.push({
        type: 'scatter',
        mode: 'lines',
        x: dates,
        y: sma50s,
        name: 'SMA 50',
        yaxis: 'y',
        line: { color: colors.violet, width: 1.5 },
        hoverinfo: 'name+y'
      });
    }

    // 4. Forecast Projection Overlay
    if (forecastPoints && forecastPoints.length > 0 && safeHistory.length > 0) {
      const lastHist = safeHistory[safeHistory.length - 1];
      const fcDates = [lastHist.date, ...forecastPoints.map(f => f.date)];
      const fcPrices = [lastHist.close, ...forecastPoints.map(f => f.predictedPrice)];

      traces.push({
        type: 'scatter',
        mode: 'lines+markers',
        x: fcDates,
        y: fcPrices,
        name: 'AI Forecast',
        yaxis: 'y',
        line: { color: colors.emerald, width: 2.2, dash: 'dash' },
        marker: { size: 5, color: colors.emerald },
        hoverlabel: { bgcolor: colors.bg, font: { color: colors.text, family: 'JetBrains Mono' } }
      });
    }

    // 5. Volume Subplot
    if (showVolume) {
      const volumeColors = closes.map((c, i) => {
        if (i === 0) return colors.positive;
        return c >= closes[i - 1] ? 'rgba(34, 197, 94, 0.4)' : 'rgba(248, 113, 113, 0.4)';
      });

      traces.push({
        type: 'bar',
        x: dates,
        y: volumes,
        name: 'Volume',
        yaxis: 'y2',
        marker: { color: volumeColors },
        hoverinfo: 'x+y'
      });
    }

    return traces;
  }, [safeHistory, symbol, chartType, showSMA20, showSMA50, showVolume, forecastPoints, colors, isDark]);

  // Plotly Layout
  const plotlyLayout = useMemo(() => ({
    autosize: true,
    height: 420,
    margin: { t: 20, r: 25, l: 45, b: 35 },
    paper_bgcolor: 'transparent',
    plot_bgcolor: 'transparent',
    showlegend: true,
    legend: {
      orientation: 'h',
      x: 0,
      y: 1.12,
      font: { color: colors.muted, size: 10, family: 'JetBrains Mono' }
    },
    dragmode: 'zoom',
    xaxis: {
      type: 'date',
      rangeslider: { visible: false },
      gridcolor: colors.grid,
      color: colors.muted,
      tickfont: { family: 'JetBrains Mono', size: 10, color: colors.muted },
      spikemode: 'across',
      spikethickness: 1,
      spikedash: 'dot',
      spikecolor: colors.muted
    },
    yaxis: {
      domain: showVolume ? [0.28, 1] : [0, 1],
      gridcolor: colors.grid,
      color: colors.muted,
      tickfont: { family: 'JetBrains Mono', size: 10, color: colors.muted },
      tickformat: '.2f',
      spikemode: 'across',
      spikethickness: 1,
      spikedash: 'dot',
      spikecolor: colors.muted
    },
    yaxis2: {
      domain: [0, 0.22],
      gridcolor: colors.grid,
      color: colors.muted,
      showticklabels: false,
      visible: showVolume
    }
  }), [colors, showVolume]);

  const plotlyConfig = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
  };

  // Custom Tooltip for Recharts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card border border-border rounded-xl p-3 shadow-xl text-xs font-mono space-y-1.5 z-50">
          <p className="font-bold text-primary border-b border-border pb-1">{label}</p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] tabular-nums">
            <span className="text-muted">Close:</span>
            <span className="font-bold text-emerald">{currency}{Number(data.close || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-muted">Open:</span>
            <span className="text-primary">{currency}{Number(data.open || data.close || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-muted">High:</span>
            <span className="text-positive">{currency}{Number(data.high || data.close || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            <span className="text-muted">Low:</span>
            <span className="text-negative">{currency}{Number(data.low || data.close || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            {data.sma20 && (
              <>
                <span className="text-muted">SMA 20:</span>
                <span className="text-blue">{currency}{Number(data.sma20).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </>
            )}
            {data.sma50 && (
              <>
                <span className="text-muted">SMA 50:</span>
                <span className="text-violet">{currency}{Number(data.sma50).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </>
            )}
            {data.volume && (
              <>
                <span className="text-muted">Volume:</span>
                <span className="text-secondary">{data.volume.toLocaleString()}</span>
              </>
            )}
          </div>
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="bull-card p-5 space-y-4">
        <div className="flex justify-between items-center pb-3 border-b border-border">
          <div className="h-4 w-40 bg-border rounded animate-pulse" />
          <div className="h-8 w-64 bg-border rounded-xl animate-pulse" />
        </div>
        <div className="h-96 w-full bg-border/40 rounded-xl animate-pulse flex items-center justify-center text-xs font-mono text-muted">
          Loading market price series...
        </div>
      </div>
    );
  }

  return (
    <div className="bull-card p-5 space-y-4 transition-colors shadow-card">
      {/* Timeframe & Overlay Toolbar */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 pb-3 border-b border-border">
        
        {/* Left: Title & Mode Toggle */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Activity className="w-4 h-4 text-emerald" />
            <h3 className="text-xs font-bold text-primary font-display uppercase tracking-wider">
              {symbol} Precision Analytics
            </h3>
          </div>

          {/* Chart Library Toggle: Plotly vs Recharts */}
          {PlotComp && (
            <div className="flex items-center bg-surface p-0.5 rounded-lg border border-borderSubtle text-[11px] font-mono">
              <button
                onClick={() => setChartMode('plotly')}
                className={`px-2 py-0.5 rounded font-bold transition-all ${
                  chartMode === 'plotly' 
                    ? 'bg-emerald text-white shadow-sm' 
                    : 'text-muted hover:text-primary'
                }`}
                title="Switch to Plotly Financial Chart"
              >
                Plotly Pro
              </button>
              <button
                onClick={() => setChartMode('recharts')}
                className={`px-2 py-0.5 rounded font-bold transition-all ${
                  chartMode === 'recharts' 
                    ? 'bg-emerald text-white shadow-sm' 
                    : 'text-muted hover:text-primary'
                }`}
                title="Switch to Recharts"
              >
                Fast Area
              </button>
            </div>
          )}

          {/* Candlestick vs Area (Plotly mode) */}
          {chartMode === 'plotly' && PlotComp && (
            <button
              onClick={() => setChartType(prev => (prev === 'candlestick' ? 'area' : 'candlestick'))}
              className="p-1.5 rounded-lg border border-border bg-surface text-secondary hover:text-primary transition-all text-[11px] font-mono flex items-center space-x-1"
              title="Toggle Candlestick vs Line Area"
            >
              <CandlestickChart className="w-3.5 h-3.5 text-emerald" />
              <span className="hidden sm:inline capitalize">{chartType}</span>
            </button>
          )}
        </div>

        {/* Right: Timeframes & Overlays */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Timeframe Buttons */}
          <div className="flex bg-surface p-1 rounded-xl border border-borderSubtle">
            {TIMEFRAMES.map(tf => (
              <button
                key={tf}
                onClick={() => onTimeframeChange && onTimeframeChange(tf)}
                className={`px-2 sm:px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all ${
                  timeframe === tf
                    ? 'bg-emerald text-white shadow-sm'
                    : 'text-muted hover:text-primary'
                }`}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* SMA & Volume Toggles */}
          <div className="flex items-center space-x-1.5 bg-surface p-1 rounded-xl border border-borderSubtle">
            <button
              onClick={() => setShowSMA20(!showSMA20)}
              className={`px-2 py-1 text-[11px] font-mono font-semibold rounded-lg transition-all ${
                showSMA20
                  ? 'bg-blue/15 text-blue border border-blue/30 font-bold'
                  : 'text-muted hover:text-primary'
              }`}
              title="Toggle 20-period Simple Moving Average"
            >
              SMA 20
            </button>
            <button
              onClick={() => setShowSMA50(!showSMA50)}
              className={`px-2 py-1 text-[11px] font-mono font-semibold rounded-lg transition-all ${
                showSMA50
                  ? 'bg-violet/15 text-violet border border-violet/30 font-bold'
                  : 'text-muted hover:text-primary'
              }`}
              title="Toggle 50-period Simple Moving Average"
            >
              SMA 50
            </button>
            <button
              onClick={() => setShowVolume(!showVolume)}
              className={`px-2 py-1 text-[11px] font-mono font-semibold rounded-lg transition-all ${
                showVolume
                  ? 'bg-emerald-500/15 text-emerald border border-emerald-500/30 font-bold'
                  : 'text-muted hover:text-primary'
              }`}
              title="Toggle Trading Volume Subplot"
            >
              Volume
            </button>
          </div>
        </div>
      </div>

      {/* Chart Canvas Area */}
      <div className="w-full min-h-[400px]">
        {chartMode === 'plotly' && PlotComp ? (
          <div className="w-full h-[420px]">
            <PlotComp
              data={plotlyData}
              layout={plotlyLayout}
              config={plotlyConfig}
              style={{ width: '100%', height: '100%' }}
              useResizeHandler={true}
            />
          </div>
        ) : (
          <div className="w-full h-80 sm:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={safeHistory} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorClose" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={colors.emerald} stopOpacity={isDark ? 0.45 : 0.3} />
                    <stop offset="95%" stopColor={colors.emerald} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fill: colors.muted, fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  yAxisId="price"
                  domain={['auto', 'auto']} 
                  tick={{ fill: colors.muted, fontSize: 10, fontFamily: 'JetBrains Mono' }} 
                  tickLine={false} 
                  axisLine={false}
                  tickFormatter={val => `${currency}${Number(val).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
                />
                {showVolume && (
                  <YAxis 
                    yAxisId="volume" 
                    orientation="right" 
                    domain={[0, (dataMax) => dataMax * 4]} 
                    hide={true} 
                  />
                )}
                <Tooltip content={<CustomTooltip />} />
                
                {/* Area price series */}
                <Area 
                  yAxisId="price"
                  type="monotone" 
                  dataKey="close" 
                  stroke={colors.emerald} 
                  strokeWidth={2.2} 
                  fillOpacity={1} 
                  fill="url(#colorClose)" 
                />

                {/* SMA 20 */}
                {showSMA20 && (
                  <Line 
                    yAxisId="price"
                    type="monotone" 
                    dataKey="sma20" 
                    stroke={colors.blue} 
                    strokeWidth={1.5} 
                    dot={false} 
                    strokeDasharray="4 4" 
                  />
                )}

                {/* SMA 50 */}
                {showSMA50 && (
                  <Line 
                    yAxisId="price"
                    type="monotone" 
                    dataKey="sma50" 
                    stroke={colors.violet} 
                    strokeWidth={1.5} 
                    dot={false} 
                  />
                )}

                {/* Optional Volume Bars */}
                {showVolume && (
                  <Bar yAxisId="volume" dataKey="volume" fill={colors.muted} opacity={0.25} />
                )}
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};
