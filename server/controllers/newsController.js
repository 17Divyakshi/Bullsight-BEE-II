import { getFinancialNews } from '../services/newsService.js';

export const getNews = async (req, res, next) => {
  try {
    const symbol = req.params.symbol || req.query.symbol || 'ALL';
    const data = await getFinancialNews(symbol);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

export default { getNews };
