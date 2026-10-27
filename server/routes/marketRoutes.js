import express from 'express';
import { getMarketOverview, getScreener } from '../controllers/marketController.js';

const router = express.Router();

router.get('/overview', getMarketOverview);
router.get('/screener', getScreener);

export default router;
