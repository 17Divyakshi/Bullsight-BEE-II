# 🐂 BULLSIGHT — AI Stock Intelligence (MERN + BEE-II Architecture)

> **Tagline:** “See the Bull. Predict the Move.”  
> **Academic Project Title:** *“Real-Time Stock Trend Prediction and Analytics Dashboard Using Deep Learning & MERN Architecture”*  
> **Course Alignment:** Back End Engineering-II (BEE-II, Course Code: 24CS0305)  
> **Audit Status:** Verified MERN Architecture (Audit Snapshot: 27 October 2026)  

---

## 📌 1. Project Overview & Architecture Status

**BullSight** is a full-stack financial intelligence and quantitative equity analytics platform. Originally designed as a college capstone with a Python/FastAPI monolith, the core application has been migrated into an authentic **MERN Stack (MongoDB, Express.js, React 18, Node.js)** aligned with the **Back End Engineering-II (BEE-II)** curriculum.

### Operational State as of October 2026 Audit:
- **Active Application Stack (MERN):** 
  - **Frontend:** React 18 + Vite running on port `3000` with Tailwind CSS, Lucide icons, and dual Plotly/Recharts financial charting.
  - **Backend Server:** Node.js v22 + Express v4.21 running on port `5000` handling REST APIs, modular controllers, request validation, timing logs, and centralized 4-parameter error handling.
  - **Database:** MongoDB v8.2 running on port `27017` via Mongoose v8 managing collections for users, watchlists, portfolios, holdings, and prediction logs.
- **Auxiliary Python Service (Optional / Inactive):**
  - The Python/FastAPI service on port `8000` and its TensorFlow LSTM model artifacts ([`backend/models/lstm_model.keras`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/backend/models/lstm_model.keras)) are preserved intact in `backend/` for hybrid deep learning capabilities.
  - During the audit, port `8000` was inactive. The Express backend automatically routes prediction requests through its internal quantitative time-series forecasting engine (momentum drift, technical consensus, volatility envelopes) and records predictions directly to MongoDB.

---

## ✨ 2. Key Features

- **Midnight Emerald Institutional UI/UX:** Dark-mode financial dashboard aesthetic (`#080D1B` background, `#10B981` emerald CTAs, `#38BDF8` blue metrics, `#8B5CF6` AI violet) with a complete, persistent light theme switch (`#F5F7FB`).
- **Complete Node.js/Express Backend:** Modular REST API architecture with dedicated routers, controllers, input validation middleware, request timing telemetry, and centralized error handling.
- **MongoDB & Mongoose Persistence:** Document-based storage with compound unique indexes (`{ userId: 1, symbol: 1 }`), schema-level numeric validations, virtual fields, and Mongoose aggregation pipelines.
- **Global & Indian Market Telemetry:** Real-time quotes and daily OHLCV candles for Indian equities (`RELIANCE.NS`, `TCS.NS`, `INFY.NS`) and US stocks (`AAPL`, `NVDA`, `MSFT`) ingested natively from Yahoo Finance.
- **Pure Mathematical Technical Indicators:** Built-in calculation engine for RSI (14-day Wilder's smoothing), MACD (12, 26, 9), SMA 20/50, EMA 20/50, and Bollinger Bands.
- **Dual Interactive Charting (Plotly Pro & Recharts):** High-precision Plotly candlestick and area views with volume subplots, crosshairs, SMA overlays, and Recharts asset allocation donuts.
- **Watchlist & Portfolio Valuation:** Track positions, marked-to-market live valuation, profit/loss metrics, and Recharts asset allocation donut charts backed by MongoDB persistence.
- **Quantitative Stock Screener:** Multi-market screener filtering equities by market, RSI momentum, MACD crossover, and forecast signal.
- **Dedicated Model Performance Analytics View:** Model evaluation interface featuring actual vs. predicted residual error distribution charts and a signal classification matrix (reporting baseline academic target metrics).
- **News NLP Sentiment Feed:** Financial news feed paired with sentiment classification (Positive, Neutral, Negative) with graceful fallback handling.
- **BullSight AI Market Co-Pilot:** Conversational assistant grounded in real backend stock data, indicators, and sequence forecasts.
- **Editorial Typography & Tabular Figures:** Inter for UI typography, Manrope for display headings, and JetBrains Mono with tabular numbers for precision financial data alignment.
- **BEE-II Lab Demonstrations:** Dedicated educational endpoints demonstrating Node.js `os` and `process` telemetry, `EventEmitter` pub-sub patterns, SHA-256 cryptographic hashing, and asynchronous concurrency via `Promise.allSettled`.

---

## 🏗️ 3. System Architecture Diagram

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
|  - Portfolios (virtuals)          |   | - (Optional / Inactive During   |
|  - Holdings (numeric validators)  |   |    Standard MERN Execution)     |
|  - PredictionRecords (timeseries) |   +---------------------------------+
+-----------------------------------+
```

---

## 🛠️ 4. Technology Stack

| Layer | Technology | Operational Role & Audit Status |
| :--- | :--- | :--- |
| **Frontend** | React 18.3, Vite 6, JavaScript | Single-page UI with 11 views. Production build verified (2,293 modules transformed). |
| **Styling** | Tailwind CSS 3.4 | Utility-first design system with Midnight Emerald dark theme & light theme. |
| **Data Visualization** | Plotly.js (`react-plotly.js`) & Recharts 2.15 | Candlestick subplots, SMA overlays, and portfolio allocation charts. |
| **Backend Framework** | Node.js v22, Express.js v4.21 | RESTful API server on port 5000. Verified with 0 syntax errors across 41 files. |
| **Database** | MongoDB v8.2 with Mongoose v8 | Active on port 27017. Verified real persistence of user holdings and portfolios. |
| **Authentication** | JWT (`jsonwebtoken`) & `bcryptjs` | Implemented in backend with salt hashing and JWT verification. (Frontend operates in guest mode). |
| **Data Ingestion** | Native Yahoo Finance Engine | Fetches live market quotes and historical OHLCV data directly in Node.js. |
| **Auxiliary ML Engine** | Python 3.12, TensorFlow 2.15, FastAPI | Preserved in `backend/`. Optional deep learning service; inactive during standard MERN audit. |
| **API Testing** | Postman Collection v2.1 | 26 configured requests across 7 domain folders. |

---

## 📚 5. BEE-II Syllabus to Code Mapping

| BEE-II Syllabus Topic | Concepts Implemented in Project | Project Source File | Verified Status |
| :--- | :--- | :--- | :--- |
| **JavaScript ES Modules & Modern Syntax** | `"type": "module"`, `import`/`export`, destructuring, arrow functions, template literals | [`server/server.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/server.js) | **Implemented & Tested** |
| **Asynchronous JavaScript & Concurrency** | Promises, `async/await`, `Promise.allSettled`, execution duration telemetry | [`server/controllers/bee2DemoController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/bee2DemoController.js#L73) | **Implemented & Tested** |
| **Node.js Core Runtimes & OS** | Built-in `os` and `process` modules (heap usage, uptime, CPU cores) | [`server/controllers/bee2DemoController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/bee2DemoController.js#L23) | **Implemented & Tested** |
| **Node.js Event-Driven Architecture** | `EventEmitter` pub-sub pattern for trading threshold alert triggers | [`server/controllers/bee2DemoController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/bee2DemoController.js#L11) | **Implemented & Tested** |
| **Node.js Cryptography & Security** | `crypto` module (SHA-256 hashing, UUIDv4 generation) | [`server/controllers/bee2DemoController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/bee2DemoController.js#L95) | **Implemented & Tested** |
| **Express Middleware Pipeline** | Custom request logger, response timing, colored status codes | [`server/middleware/requestLogger.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/middleware/requestLogger.js) | **Implemented & Tested** |
| **Centralized Error Handling** | Global 4-parameter error handler, Mongoose CastError & 11000 duplicate key mapping | [`server/middleware/errorHandler.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/middleware/errorHandler.js) | **Implemented & Tested** |
| **Request Validation** | Schema property validation, positive numeric boundary checks | [`server/middleware/validator.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/middleware/validator.js) | **Implemented & Tested** |
| **Authentication & Password Security** | Pre-save bcrypt hashing, JWT issuance (`/api/auth/login`) and verification | [`server/models/User.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/User.js), [`server/middleware/authMiddleware.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/middleware/authMiddleware.js) | **Implemented & Tested** (Backend only) |
| **MongoDB & Mongoose Schemas** | Schema definitions, field constraints, type validations | [`server/models/Holding.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/Holding.js), [`server/models/Portfolio.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/Portfolio.js) | **Implemented & Tested** |
| **Database Indexing** | Compound unique indexes preventing duplicate ticker entries per user | [`server/models/Watchlist.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/Watchlist.js#L30) | **Implemented & Tested** |
| **CRUD Operations (RESTful)** | Full `GET`, `POST` (201), `PUT` (200), `DELETE` (200) implementations | [`server/controllers/portfolioController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/portfolioController.js) | **Implemented & Tested** |
| **Aggregation Pipelines** | `$match`, `$group`, `$sum`, `$multiply` calculating cost basis | [`server/controllers/portfolioController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/portfolioController.js#L210) | **Implemented & Tested** |

---

## 🔬 6. Verified Testing & Audit Results (Snapshot: 27 Oct 2026)

### A. Live Endpoint Benchmark Results
During the read-only compliance audit, the following endpoints responded with live HTTP 200/201 status codes:
- `GET /api/health` — `200 OK` (Healthy, reported service name & environment)
- `GET /api/stocks/catalog` — `200 OK` (Returned 25 curated equities)
- `GET /api/stocks/AAPL` — `200 OK` (Returned live quote and day change)
- `GET /api/stocks/AAPL/indicators` — `200 OK` (Calculated RSI, MACD, Bollinger Bands)
- `GET /api/market/overview` — `200 OK` (Returned 7 global market indices)
- `GET /api/user/watchlist` — `200 OK` (Queried MongoDB watchlist collection)
- `GET /api/user/portfolio` — `200 OK` (Queried MongoDB holdings collection)
- `GET /api/user/portfolio/analytics` — `200 OK` (Executed Mongoose `$match` + `$group` aggregation in 447ms)
- `GET /api/bee2-demo/system-info` — `200 OK` (Reported live V8 heap usage and OS stats in 6ms)
- `GET /api/bee2-demo/async-concurrency` — `200 OK` (Demonstrated `Promise.allSettled`)
- `GET /api/bee2-demo/crypto-hash` — `200 OK` (Demonstrated SHA-256 and UUID generation)

### B. MongoDB Persistence Verification
Direct inspection of `bullsight_db` verified that user actions through the React UI successfully executed real database writes:
- `portfolios` — 1 document (`Main Trading Portfolio`)
- `holdings` — 2 documents (reflecting holdings added and retained by the user)
- `predictionrecords` — 27 documents (historical forecast logs recorded by prediction queries)

### C. Postman Collection Status
- The collection at [`postman/Bullsight_MERN_BEE2_Collection.json`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/postman/Bullsight_MERN_BEE2_Collection.json) contains **26 requests** across 7 functional folders.
- Automated `pm.test` assertions are present on **2 requests** (`Health Check` and `Login User`). The remaining 24 requests are configured with sample payloads and query parameters for manual or runner execution.

### D. Deep Learning Prediction & Model Metrics Clarification
- **Active Prediction Engine:** Since the auxiliary Python service was offline during standard testing, predictions are generated by the Express backend's internal quantitative forecasting algorithm (incorporating momentum drift and indicator consensus).
- **Model Evaluation Metrics (`/api/model/metrics`):** The numerical metrics reported by the endpoint (MAE: 2.14, RMSE: 2.79, MSE: 7.82, R²: 0.88) represent **static academic baseline targets** defined during initial prototype specification. They have **not been evaluated or verified against a live out-of-sample test dataset** during this audit.

---

## ⚠️ 7. Known Limitations & Architectural Notes

1. **Client-Side Mock Fallback Behavior:**  
   In [`frontend/src/services/api.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/frontend/src/services/api.js), API functions use `try...catch` blocks that fall back to mock data if the backend is unreachable. While this improves client resilience, it can mask backend connectivity issues during testing. Check browser DevTools (Network tab) to confirm requests return HTTP 200 from Express.
2. **Guest Mode Operation:**  
   While JWT authentication is fully implemented and tested in the backend (`POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me`), the React frontend currently operates in **guest mode** (`userId: null`) without a dedicated login/register UI.
3. **Absence of Dedicated Frontend Unit Tests:**  
   The frontend build was verified via `npm run build` (Vite), but no automated React test runner (such as Vitest, Jest, or React Testing Library) is currently configured in `frontend/package.json`.
4. **Node.js Streams Scope:**  
   Buffers are utilized internally by Node's `crypto` module, but a dedicated streaming endpoint (e.g. streaming a file with `fs.createReadStream().pipe(res)`) is not explicitly exposed.
5. **Docker Execution:**  
   `server/Dockerfile`, `frontend/Dockerfile`, and `docker-compose.yml` are authored and valid, but live multi-container startup has not been verified inside a running Docker engine.

---

## 🚀 8. Setup & Execution Guide

### Required Prerequisites:
- **Node.js** v18+ (tested on `v22.14.0`) and `npm`
- **MongoDB** running locally on `mongodb://127.0.0.1:27017` (or MongoDB Atlas connection string)
- **Optional:** Python 3.10+ (only required if running the auxiliary TensorFlow LSTM service)

---

### Step 1: Start MongoDB
Ensure the MongoDB daemon is active on port 27017:
```bash
# Windows / Linux / macOS
mongod --dbpath ./mongodb_data --port 27017
```

---

### Step 2: Configure & Start Express Backend (Required)
In a new terminal window:
```bash
cd server
npm install

# Copy environment template if not present (placeholders only)
# Windows (PowerShell):
Copy-Item .env.example .env
# Windows (CMD):
copy .env.example .env
# macOS / Linux:
cp .env.example .env

# Seed initial database records (demo portfolio & watchlist defaults)
node utils/seedDatabase.js

# Start Express server on port 5000
npm start
```
*Health Check:* Open `http://localhost:5000/api/health` to confirm the backend is running.

---

### Step 3: Start React Frontend (Required)
In a separate terminal window:
```bash
cd frontend
npm install

# Start Vite dev server on port 3000
npm run dev
```
Open **`http://localhost:3000`** in your browser. All requests to `/api/*` will automatically proxy to Express on port 5000.

---

### Step 4: Optional Auxiliary Python ML Service
*Note: The main application functions fully without this step.* If you wish to enable the TensorFlow LSTM neural network for retraining:
```bash
cd backend
python -m venv venv

# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# macOS / Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
When active on port 8000, Express will detect the service and route prediction requests through TensorFlow.

---

### ⚡ 1-Click Automated Launchers
- **Windows:** Run `.\run_project.ps1` (or double-click `run_project.bat`).
- **macOS / Linux:** Execute `chmod +x run_project.sh && ./run_project.sh`.

---

## 📡 9. REST API Endpoints Summary

| HTTP Method | Route Endpoint | Description | Status Code |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/health` | Health check reporting service name, stack, and uptime | `200 OK` |
| `GET` | `/api/stocks/catalog` | Universe of 40+ US, Indian (NSE), and Crypto assets | `200 OK` |
| `GET` | `/api/stocks/search?q={query}` | Search equities by symbol, company name, or sector | `200 OK` |
| `GET` | `/api/stocks/{symbol}` | Real-time quote, 24h change, high/low, volume, market cap | `200 OK` |
| `GET` | `/api/stocks/{symbol}/history?timeframe=3M` | Historical daily OHLCV candles with SMA 20/50 overlays | `200 OK` |
| `GET` | `/api/stocks/{symbol}/indicators` | Pure mathematical RSI (Wilder's), MACD, SMA, EMA, BB | `200 OK` |
| `GET` | `/api/predictions/{symbol}?horizon=7` | Target price forecast, trade signal, and conviction score | `200 OK` |
| `GET` | `/api/predictions/{symbol}/history` | Historical prediction logs retrieved from MongoDB | `200 OK` |
| `GET` | `/api/market/overview` | Global indices (NIFTY 50, SENSEX, NASDAQ, S&P 500, GOLD) | `200 OK` |
| `GET` | `/api/screener` | Multi-market equity screener with technical and trend filters | `200 OK` |
| `GET` | `/api/news/{symbol}` | Financial news headlines with NLP sentiment classification | `200 OK` |
| `POST`| `/api/ai/chat` | AI Copilot conversational assistant grounded in market data | `200 OK` |
| `GET` | `/api/model/metrics` | Model architecture details and academic baseline targets | `200 OK` |
| `GET` | `/api/user/watchlist` | Retrieves stored watchlist symbols from MongoDB | `200 OK` |
| `POST`| `/api/user/watchlist` | Adds a symbol to MongoDB (`{ symbol: "NVDA" }`) | `201 Created` |
| `DELETE`| `/api/user/watchlist/{symbol}` | Removes a symbol from MongoDB | `200 OK` |
| `GET` | `/api/user/portfolio` | Retrieves user portfolio holdings from MongoDB | `200 OK` |
| `POST`| `/api/user/portfolio` | Adds a stock holding position to MongoDB | `201 Created` |
| `PUT` | `/api/user/portfolio/{id}` | Updates holding quantity or buy price | `200 OK` |
| `DELETE`| `/api/user/portfolio/{id}` | Deletes a holding by ID or symbol | `200 OK` |
| `GET` | `/api/user/portfolio/analytics` | Mongoose aggregation pipeline computing total valuation | `200 OK` |
| `POST`| `/api/auth/register` | Registers a new user with bcrypt password hashing | `201 Created` |
| `POST`| `/api/auth/login` | Authenticates credentials and returns JWT | `200 OK` |
| `GET` | `/api/auth/me` | Protected route returning authenticated user profile | `200 OK` |
| `GET` | `/api/bee2-demo/system-info` | Node.js built-in OS and process telemetry | `200 OK` |
| `GET` | `/api/bee2-demo/event-emitter` | Node.js EventEmitter financial trigger demonstration | `200 OK` |
| `GET` | `/api/bee2-demo/async-concurrency` | Promise.allSettled concurrency demonstration | `200 OK` |
| `GET` | `/api/bee2-demo/crypto-hash` | Node.js crypto module SHA-256 hashing and UUID generation | `200 OK` |

---

## 🗄️ 10. Database Schema Documentation (MongoDB & Mongoose)

1. **`users` Collection ([`server/models/User.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/User.js)):**
   - `email`: String (required, unique index, lowercase, trimmed, regex format validation)
   - `passwordHash`: String (required, hashed via bcrypt salt rounds: 10)
   - `fullName`: String (trimmed)
   - `role`: String (enum: `['user', 'admin', 'analyst']`, default: `'user'`)
   - Pre-save hook: Hashes password if modified; includes `matchPassword` comparison method.

2. **`watchlists` Collection ([`server/models/Watchlist.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/Watchlist.js)):**
   - `userId`: ObjectId (ref: `'User'`, indexed)
   - `symbol`: String (required, uppercase, indexed)
   - `notes`: String
   - **Index:** Compound unique index `{ userId: 1, symbol: 1 }` preventing duplicate tickers.

3. **`portfolios` Collection ([`server/models/Portfolio.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/Portfolio.js)):**
   - `userId`: ObjectId (ref: `'User'`, indexed)
   - `name`: String (default: `'Main Trading Portfolio'`)
   - `description`: String
   - **Virtual:** `holdings` (references `'Holding'` via `localField: '_id', foreignField: 'portfolioId'`)

4. **`holdings` Collection ([`server/models/Holding.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/Holding.js)):**
   - `portfolioId`: ObjectId (ref: `'Portfolio'`, required, indexed)
   - `symbol`: String (required, uppercase, indexed)
   - `name`: String
   - `quantity`: Number (required, min: `0.0001`)
   - `buyPrice`: Number (required, min: `0`)
   - `buyDate`: Date (default: `Date.now`)
   - **Virtual:** `totalCost` (computed as `quantity * buyPrice`)

5. **`predictionrecords` Collection ([`server/models/PredictionRecord.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/PredictionRecord.js)):**
   - `symbol`: String (required, uppercase, indexed)
   - `currentPrice`: Number (required)
   - `predictedPrice`: Number (required)
   - `changePercent`: Number (required)
   - `trend`: String (enum: `['BULLISH', 'BEARISH', 'NEUTRAL']`)
   - `signal`: String (enum: `['BUY', 'HOLD', 'SELL']`)
   - `confidence`: Number (min: 0, max: 1)
   - `modelName`: String
   - `horizonDays`: Number (default: 7)
   - `forecastPoints`: Array of subdocuments (`{ date, predictedPrice, upperBound, lowerBound }`)
   - **Index:** Compound index `{ symbol: 1, createdAt: -1 }` for chronological lookups.

---

## 🧪 11. Testing & Viva Resources

- **Postman Collection:** [`postman/Bullsight_MERN_BEE2_Collection.json`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/postman/Bullsight_MERN_BEE2_Collection.json) contains pre-configured requests across all domains with environment variable support (`baseUrl = http://localhost:5000`).
- **Comprehensive Viva Guide:** For detailed questions and model answers covering architectural design decisions, MongoDB vs SQL, Express middleware pipelines, JWT security, and concurrency models, refer to **[`BEE2_VIVA_PREPARATION.md`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/BEE2_VIVA_PREPARATION.md)**.

---

## ⚠️ Academic Disclaimer

> **BullSight** is an educational AI/ML and Back End Engineering-II capstone project titled *“Real-Time Stock Trend Prediction and Analytics Dashboard Using Deep Learning & MERN Architecture”*. Price forecasts, technical indicators, and trade signals are generated from historical market data and computational models and should not be construed as investment or financial advice.
