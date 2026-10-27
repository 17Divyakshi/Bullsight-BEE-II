import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import { connectDB } from './config/db.js';
import requestLogger from './middleware/requestLogger.js';
import errorHandler from './middleware/errorHandler.js';
import notFoundHandler from './middleware/notFoundHandler.js';

import stockRoutes from './routes/stockRoutes.js';
import indicatorRoutes from './routes/indicatorRoutes.js';
import predictionRoutes from './routes/predictionRoutes.js';
import marketRoutes from './routes/marketRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import aiRoutes from './routes/aiRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import authRoutes from './routes/authRoutes.js';
import bee2DemoRoutes from './routes/bee2DemoRoutes.js';
import { getPrediction } from './controllers/predictionController.js';
import { getScreener } from './controllers/marketController.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Global Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://localhost:5173', 'http://127.0.0.1:5173', '*'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Health Check API
app.get(['/api/health', '/health'], (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'BULLSIGHT MERN Backend Engine',
    version: '2.0.0',
    stack: 'MongoDB, Express.js, React, Node.js',
    syllabus: 'BEE-II Aligned Architecture',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString(),
  });
});

// Mount Routes with /api prefix and optional direct paths for backwards-compatibility
app.use('/api/stocks', stockRoutes);
app.use('/stocks', stockRoutes);

app.use('/api/stocks', indicatorRoutes);
app.use('/stocks', indicatorRoutes);

app.use('/api/predictions', predictionRoutes);
app.use('/predictions', predictionRoutes);

// FastAPI compatibility alias: /api/stocks/:symbol/prediction
app.get(['/api/stocks/:symbol/prediction', '/stocks/:symbol/prediction'], getPrediction);

app.use('/api/market', marketRoutes);
app.use('/market', marketRoutes);

// Screener direct route compatibility: /api/screener
app.get(['/api/screener', '/screener'], getScreener);

app.use('/api/news', newsRoutes);
app.use('/news', newsRoutes);

app.use('/api/ai', aiRoutes);
app.use('/ai', aiRoutes);

// Model metrics direct alias: /api/model/metrics & /api/model/train
app.use('/api/model', aiRoutes);
app.use('/model', aiRoutes);

app.use('/api/user/watchlist', watchlistRoutes);
app.use('/user/watchlist', watchlistRoutes);

app.use('/api/user/portfolio', portfolioRoutes);
app.use('/user/portfolio', portfolioRoutes);

app.use('/api/auth', authRoutes);
app.use('/api/bee2-demo', bee2DemoRoutes);

// 404 Route Not Found Middleware
app.use(notFoundHandler);

// Centralized Global Error Handler Middleware
app.use(errorHandler);

// Start HTTP Server
const server = app.listen(PORT, () => {
  console.log(`=======================================================`);
  console.log(`🐂 BULLSIGHT MERN Backend running on port ${PORT}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`🧪 BEE-II Lab Demos: http://localhost:${PORT}/api/bee2-demo/system-info`);
  console.log(`=======================================================`);
});

// Handle unhandled Promise rejections
process.on('unhandledRejection', (err) => {
  console.error(`[Unhandled Rejection] ${err.message}`);
});

export default app;
