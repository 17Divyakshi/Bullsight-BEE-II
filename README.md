# 🐂 BULLSIGHT — AI Stock Intelligence

> **Tagline:** “See the Bull. Predict the Move.”  
> **Academic Project Title:** *“Real-Time Stock Trend Prediction and Analytics Dashboard Using Deep Learning”*

---

## 📌 Project Overview

**BullSight** is a full-stack, production-style artificial intelligence and quantitative financial analytics platform. Built as a college AI/ML capstone project, it behaves like a modern fintech SaaS product.

BullSight ingests live equity quotes from Yahoo Finance (`yfinance`), computes technical indicators (SMA, EMA, RSI, MACD, Bollinger Bands), processes historical feature sequences through a **2-layer Sequential LSTM (Long Short-Term Memory) Neural Network**, and generates probabilistic price forecasts, AI trade signals (`BUY`, `HOLD`, `SELL`), and model conviction scores.

---

## ✨ Key Features

- **Midnight Emerald Institutional UI/UX:** Premium institutional financial dashboard aesthetic featuring a Midnight Emerald dark theme (`#080D1B` background, `#10B981` emerald CTAs, `#38BDF8` blue metrics, `#8B5CF6` AI violet) with a complete, persistent light theme switch (`#F5F7FB`).
- **Global & Indian Market Support:** Real-time quotes and indicators for NSE Indian equities (e.g. `RELIANCE.NS`, `TCS.NS`, `INFY.NS`) and US stocks (e.g. `AAPL`, `TSLA`, `NVDA`, `MSFT`).
- **Dual Interactive Charting (Plotly Pro & Recharts):** High-precision Plotly candlestick and area views with volume subplots, crosshair spikes, SMA 20/50 overlays, and dashed LSTM forecast trajectories.
- **Deep Learning LSTM Engine:** 60-day sequence regression model built with TensorFlow/Keras (2-layer Sequential LSTM with Dropout regularization).
- **Dedicated Model Performance Analytics:** Continuous loss regression metrics (MAE: 2.14, RMSE: 2.79, MSE: 7.82, R²: 0.88), actual vs predicted residual error charts, and signal classification matrix.
- **BullSight AI Market Co-Pilot:** Conversational assistant grounded in real backend stock data, indicators, and sequence forecasts.
- **Quantitative Stock Screener:** Filter Indian and US equities by market, RSI momentum, MACD crossover, and AI signals.
- **Watchlist & Portfolio Valuation:** Track positions, marked-to-market valuation, profit/loss, and asset allocation donut charts.
- **News NLP Sentiment Feed:** Financial news stream paired with sentiment scoring (Positive, Neutral, Negative) with graceful API key fallback.
- **Editorial Typography & Tabular Figures:** Inter for interface text, Manrope for display headings, and JetBrains Mono with tabular numbers for precision financial data alignment.

---

## 🏗️ System Architecture

```text
               +--------------------------------------------------+
               |             React 18 + Vite Frontend             |
               |       (Tailwind CSS, Recharts, Lucide, Axios)     |
               +------------------------+-------------------------+
                                        | HTTP / REST API (port 3000 -> 8000)
                                        v
               +--------------------------------------------------+
               |             FastAPI Backend (Uvicorn)            |
               |         (app/main.py & app/routes/*.py)          |
               +----------+--------------------+------------------+
                          |                    |
                          v                    v
         +-------------------+        +-------------------+
         |  yfinance Engine  |        |  TensorFlow LSTM  |
         | (Pandas / NumPy)  |        |  Neural Network   |
         +---------+---------+        +---------+---------+
                   |                            |
                   v                            v
         +-------------------+        +-------------------+
         | Technical Analysis|        | Scaled Inference  |
         | (RSI, MACD, SMA)  |        | & Signal Engine   |
         +-------------------+        +-------------------+
                               |
                               v
                     +-------------------+
                     | SQLite/PostgreSQL |
                     |   (SQLAlchemy)    |
                     +-------------------+
```

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React 18, Vite, JavaScript | Single-page modern user interface |
| **Styling** | Tailwind CSS | Responsive white-theme design system |
| **Charts** | Recharts | Interactive price, indicator & allocation charts |
| **Icons** | Lucide React | Clean financial UI icons |
| **Backend** | Python 3.11, FastAPI, Uvicorn | High-performance asynchronous REST API |
| **Data Engine** | `yfinance`, Pandas, NumPy | Live stock data retrieval & feature calculation |
| **Machine Learning**| TensorFlow, Keras, scikit-learn | 2-layer LSTM sequence prediction model |
| **Database** | SQLite (local) / PostgreSQL (prod) | User watchlist & portfolio persistence |
| **Containerization**| Docker, Docker Compose | Production deployment readiness |

---

## 🚀 Quickstart — Running on Your Laptop

> 💡 **Sharing with Teammates?** See the full **[Teammate Setup Guide](TEAM_SETUP_GUIDE.md)** for quick onboarding and troubleshooting!

### 1. Prerequisites
- **Python** 3.10, 3.11, or 3.12 (Check "Add python.exe to PATH" during installation)
- **Node.js** v18+ and `npm`

---

### ⚡ Option A: 1-Click Automated Launchers (Recommended)

#### 🪟 On Windows:
Double-click **`run_project.bat`** (or in PowerShell run `.\run_project.ps1`).  
*This automatically sets up Python `venv`, installs backend/frontend dependencies, configures `.env`, starts both servers, and opens your browser.*

#### 🍎 On macOS / 🐧 Linux:
Open Terminal in the root directory and run:
```bash
chmod +x run_project.sh
./run_project.sh
```

---

### 🛠 Option B: Manual Step-by-Step Setup

#### Step 1: Start Backend (Terminal 1)
```bash
cd backend

# Create & activate Python virtual environment
python -m venv venv

# Windows (CMD):
venv\Scripts\activate
# Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# macOS / Linux:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Start FastAPI server (http://127.0.0.1:8000)
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```

#### Step 2: Start Frontend (Terminal 2)
```bash
cd frontend

# Install dependencies
npm install

# Start Vite dev server (http://localhost:3000)
npm run dev
```

Open **`http://localhost:3000`** in your browser. All API requests will automatically proxy to the FastAPI backend at port 8000.

---

## 🧠 Training the LSTM Neural Network

To train or update the LSTM model artifacts (`backend/models/lstm_model.keras` and `backend/models/scaler.pkl`):

```bash
cd backend
venv\Scripts\activate
python -m app.ml.train
```

---

## 🐋 Running with Docker Compose

To launch the complete application stack (Frontend + FastAPI Backend + PostgreSQL Database) in isolated containers:

```bash
docker-compose up --build
```

- **Frontend UI:** `http://localhost:3000`
- **FastAPI Backend:** `http://localhost:8000`
- **PostgreSQL Database:** `localhost:5432`

---

## 📡 API Endpoints Summary

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/health` | Backend status check |
| `GET` | `/api/stocks/{symbol}` | Real-time stock summary & 24h change |
| `GET` | `/api/stocks/{symbol}/history` | Historical OHLCV candles & SMA overlays |
| `GET` | `/api/stocks/{symbol}/indicators` | Calculated RSI, MACD, SMA 20, EMA 20 & Bollinger Bands |
| `GET` | `/api/predictions/{symbol}` | LSTM target price forecast & AI signal |
| `GET` | `/api/market/overview` | Global market indices (NIFTY, SENSEX, NASDAQ, etc.) |
| `GET` | `/api/screener` | Filtered equity screener |
| `GET` | `/api/news/{symbol}` | Market news & NLP sentiment feed |
| `POST`| `/api/ai/chat` | BullSight AI conversational query |
| `GET` | `/api/model/metrics` | Model evaluation metrics (MAE, RMSE, R²) |

---

## ⚠️ Academic Disclaimer

> **BullSight** is an educational AI/ML analytics project titled *“Real-Time Stock Trend Prediction and Analytics Dashboard Using Deep Learning”*. Predictions and signals are generated from historical market data and computational models and should not be considered financial advice or guaranteed future outcomes.
