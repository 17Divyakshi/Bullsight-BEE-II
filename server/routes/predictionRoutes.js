import express from 'express';
import { getPrediction, getPredictionHistory } from '../controllers/predictionController.js';

const router = express.Router();

router.get('/:symbol', getPrediction);
router.get('/:symbol/history', getPredictionHistory);

export default router;
