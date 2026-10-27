import express from 'express';
import { getIndicators } from '../controllers/indicatorController.js';

const router = express.Router();

router.get('/:symbol/indicators', getIndicators);

export default router;
