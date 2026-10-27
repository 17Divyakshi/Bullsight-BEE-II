import express from 'express';
import { getCatalog, searchCatalog, getSummary, getHistory } from '../controllers/stockController.js';

const router = express.Router();

router.get('/', getCatalog);
router.get('/catalog', getCatalog);
router.get('/search', searchCatalog);
router.get('/:symbol', getSummary);
router.get('/:symbol/history', getHistory);

export default router;
