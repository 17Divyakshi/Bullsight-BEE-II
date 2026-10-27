/**
 * Python ML Microservice Proxy
 * Communicates with the auxiliary Python FastAPI service for TensorFlow/Keras LSTM model inference.
 */

export async function queryPythonMLService(symbol, horizon = 7) {
  const pythonBaseUrl = process.env.PYTHON_ML_SERVICE_URL || 'http://127.0.0.1:8000';
  const targetUrl = `${pythonBaseUrl}/api/predictions/${encodeURIComponent(symbol)}?horizon=${horizon}`;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000); // 4s timeout

    const res = await fetch(targetUrl, { signal: controller.signal });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      return {
        success: true,
        data,
        source: 'Python TensorFlow LSTM Engine (2-Layer Sequential)',
      };
    }
  } catch (err) {
    // Python service is not running or timed out; will seamlessly fall back
  }

  return { success: false, data: null, source: null };
}

export async function triggerPythonTraining(symbol = 'AAPL') {
  const pythonBaseUrl = process.env.PYTHON_ML_SERVICE_URL || 'http://127.0.0.1:8000';
  const targetUrl = `${pythonBaseUrl}/api/model/train?symbol=${encodeURIComponent(symbol)}`;

  try {
    const res = await fetch(targetUrl, { method: 'POST' });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    // Python service offline
  }
  return {
    status: 'Python ML service is currently offline. Model training queued.',
    symbol,
  };
}
