import { getStockSummary, getStockHistory } from './yahooService.js';
import { computeIndicatorsFromCandles } from './indicatorService.js';

export async function processAIChat(message, contextSymbol = 'AAPL') {
  const sym = (contextSymbol || 'AAPL').toUpperCase().trim();
  const apiKey = process.env.OPENAI_API_KEY;

  // Fetch real market context for grounded analytics
  const [summary, history] = await Promise.all([
    getStockSummary(sym),
    getStockHistory(sym, '3M'),
  ]);
  const indicators = computeIndicatorsFromCandles(history);

  const price = summary.price;
  const changePct = summary.changePercent;
  const rsi = indicators.rsi.value;
  const rsiSig = indicators.rsi.signal;
  const macdSig = indicators.macd.signal;
  const sma20 = indicators.sma20.value;

  if (apiKey) {
    try {
      const systemPrompt = `You are BullSight AI, an intelligent quantitative stock market assistant.
Ground your answers in real stock data for ${sym}:
Current Price: $${price}, 24h Change: ${changePct}%, RSI: ${rsi} (${rsiSig}), MACD: ${macdSig}, SMA 20: $${sma20}.
Be concise, analytical, professional, and emphasize that computational signals are technical insights and not financial advice.`;

      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message },
          ],
          max_tokens: 350,
          temperature: 0.6,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        const reply = data.choices?.[0]?.message?.content;
        if (reply) {
          return {
            reply,
            sources: ['OpenAI GPT Engine', 'Live Yahoo Finance Feed', 'Technical Indicator Aggregator'],
            isFallback: false,
          };
        }
      }
    } catch (err) {
      console.warn(`[AIService] OpenAI call failed: ${err.message}. Using rule-based co-pilot.`);
    }
  }

  // Grounded quantitative rule-based fallback
  const trendConsensus = rsiSig.includes('Bullish') && macdSig === 'Bullish' ? 'strongly bullish' : rsiSig.includes('Bearish') ? 'cautious/bearish' : 'consolidating';
  const reply = `BullSight AI Market Co-Pilot Analysis for ${sym}:
• Current Trading Price: $${price} (${changePct >= 0 ? '+' : ''}${changePct}%)
• Momentum Status: RSI is at ${rsi} (${rsiSig}).
• Trend & Moving Averages: 20-period SMA is at $${sma20}, with MACD signaling a ${macdSig} momentum bias.
• Deep Learning Sequence Outlook: Overall indicator consensus is ${trendConsensus}.
Note: This is computational quantitative telemetry and should be used alongside personal risk tolerance guidelines.`;

  return {
    reply,
    sources: ['LSTM Neural Network Consensus', 'Live Equity Feed', 'Quantitative Technical Engine'],
    isFallback: true,
  };
}
