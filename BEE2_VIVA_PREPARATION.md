# 🐂 BULLSIGHT — BEE-II MERN Architecture & Viva Preparation Guide

> **Course:** Back End Engineering-II (BEE-II)  
> **Capstone Project:** BULLSIGHT — AI Stock Intelligence & Quantitative Portfolio Analytics  
> **Target Stack:** MongoDB, Express.js, React.js, Node.js (MERN) with Hybrid Machine Learning Architecture  

---

## 📌 1. Project Architecture Overview

BullSight is a full-stack financial intelligence platform migrated from a Python/FastAPI/SQLAlchemy monolith into an institutional-grade **MERN stack application** aligned with the Back End Engineering-II (BEE-II) curriculum.

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

## 📚 2. BEE-II Syllabus to Code Mapping Table

| Syllabus Topic | Concepts Implemented | Project File Path | Function / Class |
| :--- | :--- | :--- | :--- |
| **JavaScript (ES Modules & Async)** | ES6 modules (`import`/`export`), arrow functions, destructuring, template literals, JSON parsing | [`server/server.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/server.js) | Entire backend codebase (`"type": "module"`) |
| **Asynchronous JavaScript** | Promises, `async/await`, `Promise.allSettled`, concurrency handling | [`server/controllers/bee2DemoController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/bee2DemoController.js#L73) | `testAsyncConcurrency()` |
| **Node.js Core Runtimes & OS** | Built-in `os` and `process` modules for memory and CPU monitoring | [`server/controllers/bee2DemoController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/bee2DemoController.js#L23) | `getSystemInfo()` |
| **Node.js Event-Driven Architecture** | `EventEmitter` class, pub-sub pattern for financial price threshold triggers | [`server/controllers/bee2DemoController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/bee2DemoController.js#L13) | `MarketAlertEmitter`, `testEventEmitter()` |
| **Node.js Cryptography & Security** | `crypto` module (SHA-256 checksums, UUIDv4 generation) | [`server/controllers/bee2DemoController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/bee2DemoController.js#L95) | `testCryptoHash()` |
| **Express Middleware Pipeline** | Custom request logger, timing metrics, colored terminal output | [`server/middleware/requestLogger.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/middleware/requestLogger.js#L6) | `requestLogger` |
| **Centralized Error Handling** | Global Express error handler, custom HTTP status codes (400, 401, 404, 409, 422, 500) | [`server/middleware/errorHandler.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/middleware/errorHandler.js#L6) | `errorHandler` |
| **Request Validation** | Body schema validation, positive numeric boundary enforcement | [`server/middleware/validator.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/middleware/validator.js#L7) | `validateBody`, `validateNumeric` |
| **Authentication & Password Security** | Password hashing with salt (bcryptjs), JWT token signing & verification | [`server/models/User.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/User.js#L35) | `userSchema.pre('save')`, `matchPassword()` |
| **MongoDB & Mongoose Schemas** | Document schema definitions, data types, required constraints | [`server/models/Holding.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/Holding.js#L3) | `holdingSchema`, `Holding` model |
| **Database Indexing** | Compound unique indexes preventing duplicate watchlist entries per user | [`server/models/Watchlist.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/Watchlist.js#L30) | `watchlistSchema.index({ userId: 1, symbol: 1 })` |
| **Mongoose Virtuals & Relationships** | Virtual foreign field population and computed cost basis | [`server/models/Portfolio.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/models/Portfolio.js#L35) | `portfolioSchema.virtual('holdings')` |
| **CRUD Operations (RESTful)** | `GET`, `POST` (201 Created), `PUT` (200 OK), `DELETE` (200 OK) | [`server/controllers/portfolioController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/portfolioController.js#L33) | `getPortfolio`, `addHolding`, `updateHolding`, `deleteHolding` |
| **MongoDB Aggregation Pipelines** | `$match`, `$group`, `$sum`, `$multiply` to calculate total investment basis | [`server/controllers/portfolioController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/portfolioController.js#L210) | `getPortfolioAnalytics()` |
| **Frontend Integration & State** | React 18 hooks (`useState`, `useEffect`), Axios, loading & error UI states | [`frontend/src/pages/Watchlist.jsx`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/frontend/src/pages/Watchlist.jsx#L13) | `Watchlist` component |
| **API Testing & Postman** | Postman Collection v2.1 with assertions, test scripts, collection variables | [`postman/Bullsight_MERN_BEE2_Collection.json`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/postman/Bullsight_MERN_BEE2_Collection.json) | Full Postman Test Suite |

---

## 🎯 3. Top BEE-II Viva Questions & Model Answers

### Q1: Why did we migrate from SQLite/SQLAlchemy to MongoDB with Mongoose?
> **Answer:**  
> Financial applications frequently store dynamic, semi-structured documents such as varying technical indicator signals, multi-day forecasting envelopes (`forecastPoints` arrays), and unstructured financial news sentiments. MongoDB provides a document-oriented NoSQL model that accommodates nested arrays and subdocuments natively without expensive relational JOINs. With Mongoose, we gain strict schema validation, pre-save hooks (like automatic bcrypt password hashing), virtual properties, and aggregation pipelines while retaining horizontal scalability.

### Q2: How does the Express middleware pipeline work in BullSight?
> **Answer:**  
> Requests flow through a sequential middleware chain:
> 1. **CORS:** Configured with whitelisted origins and allowed HTTP verbs.
> 2. **Body Parsers (`express.json()`, `express.urlencoded()`):** Parses incoming JSON payloads into `req.body`.
> 3. **Custom `requestLogger`:** Records HTTP method, route, duration, and status code.
> 4. **Authentication (`authMiddleware`):** Extracts Bearer JWT tokens, validates claims, and injects `req.user`.
> 5. **Route Handlers / Controllers:** Processes business logic and returns structured responses.
> 6. **`notFoundHandler`:** Intercepts unmapped routes and returns a uniform JSON 404 response.
> 7. **Centralized `errorHandler`:** Four-parameter middleware `(err, req, res, next)` catching Mongoose CastErrors, duplicate key 11000 errors, and validation errors.

### Q3: Explain how password hashing and JWT authentication are implemented.
> **Answer:**  
> We enforce defense-in-depth password security:
> - Passwords are never stored in plain text.
> - A Mongoose pre-save hook (`userSchema.pre('save')`) uses `bcryptjs` with a cost factor (salt rounds) of 10 to hash passwords before database persistence.
> - On authentication, `user.matchPassword(enteredPassword)` performs constant-time bcrypt comparison.
> - Upon successful login, the server signs a JSON Web Token (`jwt.sign`) using a secret key and a 30-day expiration time.
> - Subsequent protected requests send the token in the `Authorization: Bearer <token>` header, verified by `protect` middleware.

### Q4: How is data consistency and uniqueness handled for Watchlist and Portfolio in MongoDB?
> **Answer:**  
> We use compound schema indexing:
> ```javascript
> watchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });
> ```
> This prevents a user from adding the same stock ticker twice. If an attempt is made, MongoDB throws error code `11000`, which our centralized `errorHandler` translates into a clean HTTP 409 Conflict response.

### Q5: How does the hybrid architecture handle the Python TensorFlow LSTM model?
> **Answer:**  
> The core web application, database persistence, REST endpoints, user authentication, and indicator mathematics are 100% powered by Node.js, Express, and MongoDB.  
> For the deep learning LSTM model, our Express backend queries the auxiliary Python service (`mlProxyService.js`). If the Python service is running, it returns the TensorFlow LSTM sequence forecast. If it is offline, Express automatically falls back to an internal mathematical quantitative time-series forecasting engine with moving averages, momentum scoring, and volatility envelopes, while recording every prediction to MongoDB.

### Q6: How does the Mongoose Aggregation Pipeline work in Portfolio Analytics?
> **Answer:**  
> In [`portfolioController.js`](file:///c:/Users/hp%20laptop/OneDrive/Desktop/Bullsight-main/server/controllers/portfolioController.js), we use MongoDB's aggregation engine:
> ```javascript
> await Holding.aggregate([
>   { $match: { portfolioId: portfolio._id } },
>   {
>     $group: {
>       _id: null,
>       totalInvestment: { $sum: { $multiply: ['$quantity', '$buyPrice'] } },
>       totalHoldingsCount: { $sum: 1 },
>       symbols: { $push: '$symbol' },
>     },
>   },
> ]);
> ```
> This executes on the MongoDB server side, computing the sum product of quantities and purchase prices directly in the database engine without transferring all records across the network.

---

## 🚀 4. How to Run & Verify the Project

### Prerequisites
- Node.js v18+ (verified with v22.14.0)
- MongoDB running on `mongodb://127.0.0.1:27017`
- Optional: Python 3.10+ for auxiliary TensorFlow LSTM service

### Quick Start Commands
1. **Start MongoDB**:
   ```bash
   mongod --dbpath ./mongodb_data --port 27017
   ```
2. **Seed Initial Database**:
   ```bash
   cd server
   node utils/seedDatabase.js
   ```
3. **Start Express Backend (Port 5000)**:
   ```bash
   cd server
   npm start
   ```
4. **Start React Frontend (Port 3000)**:
   ```bash
   cd frontend
   npm run dev
   ```
5. **Open Application**: Navigate to `http://localhost:3000`
