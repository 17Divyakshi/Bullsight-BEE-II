import express from 'express';
import {
  getPortfolio,
  addHolding,
  updateHolding,
  deleteHolding,
  getPortfolioAnalytics,
} from '../controllers/portfolioController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(optionalAuth);

router.get('/', getPortfolio);
router.post('/', addHolding);
router.put('/:id', updateHolding);
router.delete('/:identifier', deleteHolding);
router.get('/analytics', getPortfolioAnalytics);

export default router;
