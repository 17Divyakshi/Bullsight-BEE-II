import express from 'express';
import { aiChat, getModelMetrics, trainModel } from '../controllers/aiController.js';

const router = express.Router();

router.post('/chat', aiChat);
router.get('/metrics', getModelMetrics);
router.post('/train', trainModel);

export default router;
