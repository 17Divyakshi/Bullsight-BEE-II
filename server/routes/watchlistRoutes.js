import express from 'express';
import { getWatchlist, addToWatchlist, deleteFromWatchlist } from '../controllers/watchlistController.js';
import { optionalAuth } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(optionalAuth);

router.get('/', getWatchlist);
router.post('/', addToWatchlist);
router.delete('/:symbol', deleteFromWatchlist);

export default router;
