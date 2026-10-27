import EventEmitter from 'events';
import os from 'os';
import process from 'process';
import crypto from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// BEE-II Syllabus: Node.js EventEmitter demonstration
class MarketAlertEmitter extends EventEmitter {}
const alertEmitter = new MarketAlertEmitter();

alertEmitter.on('thresholdCrossed', (data) => {
  console.log(`[BEE-II Event Demo] Market Alert Triggered: ${data.symbol} crossed ${data.threshold} at ${data.timestamp}`);
});

/**
 * GET /api/bee2-demo/system-info
 * Demonstrates Node.js built-in 'os' and 'process' modules and environment variables.
 */
export const getSystemInfo = (req, res) => {
  const cpus = os.cpus();
  const totalMemGB = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2);
  const freeMemGB = (os.freemem() / (1024 * 1024 * 1024)).toFixed(2);
  const processMemMB = (process.memoryUsage().heapUsed / (1024 * 1024)).toFixed(2);

  res.status(200).json({
    syllabusTopic: 'Node.js Core Modules (os, process, environment)',
    nodeVersion: process.version,
    platform: process.platform,
    arch: process.arch,
    pid: process.pid,
    uptimeSeconds: Math.floor(process.uptime()),
    cpuModel: cpus[0]?.model || 'Generic CPU',
    cpuCores: cpus.length,
    totalMemoryGB: totalMemGB,
    freeMemoryGB: freeMemGB,
    heapUsedMB: processMemMB,
    environment: process.env.NODE_ENV || 'development',
    serverPort: process.env.PORT || 5000,
  });
};

/**
 * GET /api/bee2-demo/event-emitter
 * Demonstrates Node.js EventEmitter pub-sub pattern in financial trading telemetry.
 */
export const testEventEmitter = (req, res) => {
  const symbol = req.query.symbol || 'AAPL';
  const price = parseFloat(req.query.price) || 250.0;

  const eventPayload = {
    symbol: symbol.toUpperCase(),
    threshold: price,
    timestamp: new Date().toISOString(),
    eventUUID: crypto.randomUUID(),
  };

  alertEmitter.emit('thresholdCrossed', eventPayload);

  res.status(200).json({
    syllabusTopic: 'Node.js EventEmitter & Pub-Sub Design Pattern',
    message: `Event 'thresholdCrossed' emitted successfully for ${symbol.toUpperCase()}`,
    payload: eventPayload,
  });
};

/**
 * GET /api/bee2-demo/async-concurrency
 * Demonstrates Promise.allSettled vs sequential async/await execution.
 */
export const testAsyncConcurrency = async (req, res) => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const task1 = delay(100).then(() => ({ task: 'Quote Ingestion', status: 'fulfilled', time: 100 }));
  const task2 = delay(150).then(() => ({ task: 'Indicator Computation', status: 'fulfilled', time: 150 }));
  const task3 = delay(50).then(() => ({ task: 'LSTM Cache Lookup', status: 'fulfilled', time: 50 }));

  const startTime = Date.now();
  const results = await Promise.allSettled([task1, task2, task3]);
  const totalDuration = Date.now() - startTime;

  res.status(200).json({
    syllabusTopic: 'JavaScript Asynchronous Concurrency (Promise.allSettled, Promises, async/await)',
    totalDurationMs: totalDuration,
    settledTasks: results.map((r) => r.value || r.reason),
  });
};

/**
 * GET /api/bee2-demo/crypto-hash
 * Demonstrates Node.js crypto module for SHA256 checksum hashing.
 */
export const testCryptoHash = (req, res) => {
  const text = req.query.text || 'BullSight Quantitative AI Engine';
  const hash = crypto.createHash('sha256').update(text).digest('hex');
  const uuid = crypto.randomUUID();

  res.status(200).json({
    syllabusTopic: 'Node.js Crypto Module (Hashing, Secure UUIDs)',
    originalText: text,
    sha256Hash: hash,
    generatedUUID: uuid,
  });
};

export default {
  getSystemInfo,
  testEventEmitter,
  testAsyncConcurrency,
  testCryptoHash,
};
