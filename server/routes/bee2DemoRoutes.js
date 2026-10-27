import express from 'express';
import {
  getSystemInfo,
  testEventEmitter,
  testAsyncConcurrency,
  testCryptoHash,
} from '../controllers/bee2DemoController.js';

const router = express.Router();

router.get('/system-info', getSystemInfo);
router.get('/event-emitter', testEventEmitter);
router.get('/async-concurrency', testAsyncConcurrency);
router.get('/crypto-hash', testCryptoHash);

export default router;
