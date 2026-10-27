# 🐂 BULLSIGHT — AI Stock Intelligence (MERN + BEE-II Architecture)

> **Tagline:** “See the Bull. Predict the Move.”  
> **Academic Project Title:** *“Real-Time Stock Trend Prediction and Analytics Dashboard Using Deep Learning & MERN Architecture”*  
> **Course Alignment:** Back End Engineering-II (BEE-II) Capstone Implementation  

---

## 📌 Project Overview

**BullSight** is a full-stack, production-grade financial intelligence and quantitative equity analytics platform. Originally designed with a Python/FastAPI backend, it has been transformed into a **MERN Stack application (MongoDB, Express.js, React 18, Node.js)** aligned with the **Back End Engineering-II (BEE-II)** curriculum.

BullSight ingests live equity quotes from Yahoo Finance, computes pure mathematical technical indicators (SMA, EMA, RSI with Wilder's smoothing, MACD, Bollinger Bands), integrates sequence regression forecasts through an auxiliary **2-layer Sequential LSTM (Long Short-Term Memory) Neural Network** built with TensorFlow/Keras, and provides persistent portfolio and watchlist management backed by **MongoDB & Mongoose**.

---

## ✨ Key Features

- **Midnight Emerald Institutional UI/UX:** Institutional financial aesthetic with a Midnight Emerald dark theme (`#080D1B` background, `#10B981` emerald CTAs, `#38BDF8` blue metrics, `#8B5CF6` AI violet) with a persistent light theme switch (`#F5F7FB`).
- **Complete MERN Backend (Express & MongoDB):** High-performance Node.js/Express.js RESTful API, structured with controllers, services, middleware, Mongoose ODM, and centralized error handling.
- **Global & Indian Market Support:** Real-time quotes and indicators for NSE Indian equities (e.g. `RELIANCE.NS`, `TCS.NS`, `INFY.NS`) and US stocks (e.g. `AAPL`, `TSLA`, `NVDA`, `MSFT`).
- **Dual Interactive Charting (Plotly Pro & Recharts):** High-precision Plotly candlestick and area views with volume subplots, crosshairs, SMA 20/50 overlays, and dashed LSTM forecast trajectories.
- **Deep Learning LSTM Engine & Hybrid ML Architecture:** Retains the 60-day sequence regression model built with TensorFlow/Keras (`models/lstm_model.keras`), supported by an Express proxy with dynamic quantitative sequence fallback.
- **Persistent Portfolio & Watchlist CRUD:** MongoDB-backed collections with compound indexing, input validation, virtual cost calculations, and Mongoose aggregation pipelines.
- **Dedicated Model Performance Analytics:** Continuous loss regression metrics (MAE: 2.14, RMSE: 2.79, MSE: 7.82, R²: 0.88), actual vs predicted residual error charts, and signal classification matrix.
- **BullSight AI Market Co-Pilot:** Conversational assistant grounded in real backend stock data, indicators, and sequence forecasts.
- **Quantitative Stock Screener:** Filter Indian and US equities by market, RSI momentum, MACD crossover, and AI signals.
- **BEE-II Lab Demonstrations:** Dedicated endpoints showcasing Node.js core modules (`os`, `process`, `crypto`), `EventEmitter` pub-sub patterns, and asynchronous concurrency (`Promise.allSettled`).

---

## 🏗️ System Architecture

```text
+-------------------------------------------------------------------------+
|                       REACT 18 + VITE FRONTEND                          |
|        11 Modern Dashboard Views, Plotly & Recharts Dual Charting,      |
|           Tailwind CSS Midnight Emerald Theme, Axios API Client         |
+------------------------------------+------------------------------------+
                                     | HTTP / REST (Vite Proxy: Port 3000 -> 5000)
                                     v
+-------------------------------------------------------------------------+
|                    NODE.JS + EXPRESS.JS BACKEND (Port 5000)             |
|   - Modular Routers: Stocks, Indicators, Predictions, User, Auth, Demo  |
|   - Middleware: Request Logger, JWT Auth, Validator, Error Handler      |
|   - Services: Native Yahoo Finance Feed, Technical Math Engine          |
|   - BEE-II Demos: OS Telemetry, EventEmitter, Crypto, Concurrency       |
+-------------------+--------------------------------+--------------------+
                    |                                |
                    v                                v
+-----------------------------------+   +---------------------------------+
|       MONGODB + MONGOOSE          |   |  AUXILIARY PYTHON ML ENGINE     |
|         (Port 27017)              |   |          (Port 8000)            |
| Collections:                      |   | - 2-Layer Sequential LSTM       |
|  - Users (bcrypt, JWT)            |   | - TensorFlow / Keras (.keras)   |
|  - Watchlists (compound unique)   |   | - Feature Scaler (.pkl)         |
|  - Portfolios (virtuals)          |   | - Dynamic Quantitative Fallback |
|  - Holdings (numeric validators)  |   +---------------------------------+
|  - PredictionRecords (timeseries) |
+-----------------------------------+
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18.3, Vite 6, JavaScript | Single-page modern user interface (11 Views) |
| **Styling** | Tailwind CSS 3.4 | Midnight Emerald dark theme & light theme |
| **Charts** | Plotly.js (`react-plotly.js`) & Recharts 2.15 | Candlesticks, volume subplots, and portfolio donuts |
| **Backend** | Node.js v20+, Express.js v4.21 | RESTful API server with modular controllers & middleware |
| **Database** | MongoDB v7+ with Mongoose v8 | Document store for users, watchlists, portfolios, & predictions |
| **Machine Learning**| TensorFlow/Keras & scikit-learn | Auxiliary 2-layer Sequential LSTM model (`models/lstm_model.keras`) |
| **Data Engine** | Yahoo Finance v8 Engine (Node.js native) | Real-time equity quotes and historical OHLCV data |
| **Authentication** | JWT (jsonwebtoken) & bcryptjs | Token-based auth and salted password hashing |
| **API Testing** | Postman v2.1 Collection | Automated test scripts and endpoint validation |

---

## 📚 BEE-II Syllabus to Code Mapping

| BEE-II Syllabus Topic | Concepts Implemented in Project | File Path |
| :--- | :--- | :--- |
| **JavaScript ES Modules & Modern Syntax** | `"type": "module"`, `import`/`export`, destructuring, arrow functions, template literals | [`server/server.js`](file:///server/server.js) |
| **Asynchronous JavaScript & Concurrency** | Promises, `async/await`, `Promise.allSettled`, timing telemetry | [`server/controllers/bee2DemoController.js`](file:///server/controllers/bee2DemoController.js) |
| **Node.js Core Runtimes & OS** | Built-in `os` and `process` modules (memory, uptime, CPU cores) | [`server/controllers/bee2DemoController.js`](file:///server/controllers/bee2DemoController.js) |
| **Node.js Event-Driven Architecture** | `EventEmitter` pub-sub pattern for trading threshold alerts | [`server/controllers/bee2DemoController.js`](file:///server/controllers/bee2DemoController.js) |
| **Node.js Cryptography** | `crypto` module (SHA-256 hashing, UUID generation) | [`server/controllers/bee2DemoController.js`](file:///server/controllers/bee2DemoController.js) |
| **Express Middleware Pipeline** | Custom request logger, response timing, colored status codes | [`server/middleware/requestLogger.js`](file:///server/middleware/requestLogger.js) |
| **Centralized Error Handling** | Global 4-parameter error handler, Mongoose CastError & 11000 translation | [`server/middleware/errorHandler.js`](file:///server/middleware/errorHandler.js) |
| **Request Validation** | Schema property validation, positive numeric boundary checks | [`server/middleware/validator.js`](file:///server/middleware/validator.js) |
| **Authentication & Security** | Pre-save bcrypt hashing, JWT issuance and verification | [`server/models/User.js`](file:///server/models/User.js), [`server/middleware/authMiddleware.js`](file:///server/middleware/authMiddleware.js) |
| **MongoDB & Mongoose Schemas** | Document schema definitions, data constraints, field typing | [`server/models/Holding.js`](file:///server/models/Holding.js), [`server/models/Portfolio.js`](file:///server/models/Portfolio.js) |
| **Database Indexing** | Compound unique indexes preventing duplicate ticker entries | [`server/models/Watchlist.js`](file:///server/models/Watchlist.js) |
| **CRUD Operations (RESTful)** | Full `GET`, `POST` (201), `PUT` (200), `DELETE` (200) implementations | [`server/controllers/portfolioController.js`](file:///server/controllers/portfolioController.js) |
| **Aggregation Pipelines** | `$match`, `$group`, `$sum`, `$multiply` calculating cost basis | [`server/controllers/portfolioController.js`](file:///server/controllers/portfolioController.js) |

---

## 🚀 Quickstart & Setup Guide

### 1. Prerequisites
- **Node.js** v18+ (tested on Node.js v22.14.0)
- **MongoDB** running locally on `mongodb://127.0.0.1:27017` or MongoDB Atlas
- **Optional:** Python 3.10+ for auxiliary TensorFlow LSTM service

---

### 2. Step-by-Step Manual Launch

#### Step 1: Start MongoDB
Ensure MongoDB daemon is running:
```bash
mongod --dbpath ./mongodb_data --port 27017
```

#### Step 2: Configure & Seed Backend (Terminal 1)
```bash
cd server
npm install

# Copy environment template if not present
cp .env.example .env

# Seed initial MongoDB data (demo user, default watchlist, holdings)
node utils/seedDatabase.js

# Start Express Backend (http://localhost:5000)
npm start
```

#### Step 3: Start React Frontend (Terminal 2)
```bash
cd frontend
npm install

# Start Vite dev server (http://localhost:3000)
npm run dev
```

Open **`http://localhost:3000`** in your browser. All API requests (`/api/*`) proxy automatically to the Express backend on port 5000.

---

### 3. Optional: Running Auxiliary Python ML Engine (Terminal 3)
The Express backend includes an internal quantitative sequence forecasting engine, but if you wish to run the full TensorFlow LSTM neural network:
```bash
cd backend
python -m venv venv
venv\Scripts\activate       # Windows
pip install -r requirements.txt
uvicorn app.main:app --port 8000 --reload
```
The Express backend will automatically detect the Python service at `http://127.0.0.1:8000` and stream live TensorFlow inferences!

---

## 📡 Migrated REST API Endpoints Summary

| Method | Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Service health status check | `200 OK` |
| `GET` | `/api/stocks/catalog` | Full catalog of 40+ supported equities | `200 OK` |
| `GET` | `/api/stocks/search?q={query}` | Search equities by ticker, name, or sector | `200 OK` |
| `GET` | `/api/stocks/{symbol}` | Real-time quote, market cap, P/E ratio, 24h change | `200 OK` |
| `GET` | `/api/stocks/{symbol}/history?timeframe=3M` | Historical OHLCV candles with SMA 20/50 overlays | `200 OK` |
| `GET` | `/api/stocks/{symbol}/indicators` | Pure mathematical RSI, MACD, SMA, EMA & Bollinger Bands | `200 OK` |
| `GET` | `/api/predictions/{symbol}?horizon=7` | LSTM price forecast, conviction score & BUY/HOLD/SELL signal | `200 OK` |
| `GET` | `/api/predictions/{symbol}/history` | Historical prediction logs retrieved from MongoDB | `200 OK` |
| `GET` | `/api/market/overview` | Global indices (NIFTY 50, SENSEX, NASDAQ, S&P 500, GOLD) | `200 OK` |
| `GET` | `/api/screener` | Multi-market equity screener with technical & AI filters | `200 OK` |
| `GET` | `/api/news/{symbol}` | Financial news headlines with NLP sentiment classification | `200 OK` |
| `POST`| `/api/ai/chat` | AI Copilot conversational assistant (OpenAI GPT or rule fallback) | `200 OK` |
| `GET` | `/api/model/metrics` | LSTM evaluation statistics (MAE: 2.14, RMSE: 2.79, R²: 0.88) | `200 OK` |
| `GET` | `/api/user/watchlist` | Retrieves stored watchlist symbols from MongoDB | `200 OK` |
| `POST`| `/api/user/watchlist` | Adds a symbol to the user MongoDB watchlist | `201 Created` |
| `DELETE`| `/api/user/watchlist/{symbol}` | Removes a symbol from the MongoDB watchlist | `200 OK` |
| `GET` | `/api/user/portfolio` | Retrieves user portfolio holdings from MongoDB | `200 OK` |
| `POST`| `/api/user/portfolio` | Adds a stock holding position to MongoDB | `201 Created` |
| `PUT` | `/api/user/portfolio/{id}` | Updates holding quantity or buy price | `200 OK` |
| `DELETE`| `/api/user/portfolio/{id}` | Deletes a holding by ID or symbol | `200 OK` |
| `GET` | `/api/user/portfolio/analytics` | Mongoose aggregation pipeline computing total portfolio valuation | `200 OK` |
| `POST`| `/api/auth/register` | Registers a new user with bcrypt password hashing | `201 Created` |
| `POST`| `/api/auth/login` | Authenticates user credentials and issues JWT | `200 OK` |
| `GET` | `/api/auth/me` | Protected route returning authenticated user profile | `200 OK` |
| `GET` | `/api/bee2-demo/system-info` | Node.js built-in OS and process telemetry | `200 OK` |
| `GET` | `/api/bee2-demo/event-emitter` | Node.js EventEmitter financial trigger demonstration | `200 OK` |
| `GET` | `/api/bee2-demo/async-concurrency` | Promise.allSettled concurrency demonstration | `200 OK` |
| `GET` | `/api/bee2-demo/crypto-hash` | Node.js crypto module SHA-256 hashing and UUID generation | `200 OK` |

---

## 🧪 Postman Collection

A complete Postman Collection v2.1 is available at [`postman/Bullsight_MERN_BEE2_Collection.json`](file:///postman/Bullsight_MERN_BEE2_Collection.json).
- Import this JSON directly into Postman.
- Features pre-configured environment variables (`baseUrl = http://localhost:5000`).
- Contains automated test assertions for status codes, headers, and response payloads.

---

## 🎓 Viva & Technical Documentation

For a detailed interview and viva preparation guide with model answers covering architectural design decisions, MongoDB vs SQL, Express middleware pipelines, JWT security, and concurrency models, see **[`BEE2_VIVA_PREPARATION.md`](file:///BEE2_VIVA_PREPARATION.md)**.
