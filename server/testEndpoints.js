async function runTests() {
  const tests = [
    { name: 'Health Check', url: 'http://localhost:5000/api/health', method: 'GET' },
    { name: 'Catalog', url: 'http://localhost:5000/api/stocks/catalog', method: 'GET' },
    { name: 'Stock Summary AAPL', url: 'http://localhost:5000/api/stocks/AAPL', method: 'GET' },
    { name: 'Stock History AAPL', url: 'http://localhost:5000/api/stocks/AAPL/history?timeframe=1M', method: 'GET' },
    { name: 'Indicators AAPL', url: 'http://localhost:5000/api/stocks/AAPL/indicators', method: 'GET' },
    { name: 'Prediction AAPL', url: 'http://localhost:5000/api/predictions/AAPL?horizon=7', method: 'GET' },
    { name: 'Market Overview', url: 'http://localhost:5000/api/market/overview', method: 'GET' },
    { name: 'Watchlist GET', url: 'http://localhost:5000/api/user/watchlist', method: 'GET' },
    { name: 'Watchlist POST TSLA', url: 'http://localhost:5000/api/user/watchlist', method: 'POST', body: { symbol: 'TSLA' } },
    { name: 'Portfolio GET', url: 'http://localhost:5000/api/user/portfolio', method: 'GET' },
    { name: 'Portfolio Analytics', url: 'http://localhost:5000/api/user/portfolio/analytics', method: 'GET' },
    { name: 'Auth Login', url: 'http://localhost:5000/api/auth/login', method: 'POST', body: { email: 'trader@bullsight.ai', password: 'bullsight123' } },
    { name: 'BEE-II System Info', url: 'http://localhost:5000/api/bee2-demo/system-info', method: 'GET' },
    { name: 'BEE-II Event Emitter', url: 'http://localhost:5000/api/bee2-demo/event-emitter?symbol=AAPL&price=250', method: 'GET' },
    { name: 'BEE-II Async Concurrency', url: 'http://localhost:5000/api/bee2-demo/async-concurrency', method: 'GET' },
    { name: 'BEE-II Crypto Hash', url: 'http://localhost:5000/api/bee2-demo/crypto-hash', method: 'GET' }
  ];

  let passed = 0;
  let failed = 0;

  for (const t of tests) {
    try {
      const opts = { method: t.method, headers: { 'Content-Type': 'application/json' } };
      if (t.body) opts.body = JSON.stringify(t.body);
      const res = await fetch(t.url, opts);
      const data = await res.json();
      if (res.ok) {
        console.log(`[PASS] ${t.name} -> Status: ${res.status}`);
        passed++;
      } else {
        console.error(`[FAIL] ${t.name} -> Status: ${res.status} | Error: ${JSON.stringify(data)}`);
        failed++;
      }
    } catch (err) {
      console.error(`[ERROR] ${t.name} -> ${err.message}`);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
  console.log(`========================================\n`);
}

runTests();
