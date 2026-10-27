# 🐂 BullSight — Teammate Setup & Run Guide

Welcome to **BullSight**! This guide contains everything you need to get the application running on your laptop in under 2 minutes.

---

## 💻 1. System Requirements

Before starting, ensure you have these two free tools installed on your laptop:

1. **Python 3.10, 3.11, or 3.12**
   - Download: https://www.python.org/downloads/
   - ⚠️ **CRITICAL (Windows users):** During installation, check the box that says **"Add python.exe to PATH"** at the bottom of the installer window!

2. **Node.js 18+ (LTS recommended)**
   - Download: https://nodejs.org/ (Download the LTS version)
   - This includes `npm`.

To verify both are installed, open a terminal (Command Prompt or PowerShell) and run:
```bash
python --version
node --version
npm --version
```

---

## ⚡ 2. The Fastest Way to Run (1-Click Auto Launchers)

We have created one-click launcher scripts that handle **everything** for you automatically (virtual environment, dependencies, `.env`, npm install, and starting both servers).

### 🪟 On Windows:
Choose **either**:
- **Method A (Batch File):** Double-click `run_project.bat` in the project root folder.
- **Method B (PowerShell):** Open PowerShell in the project folder and run:
  ```powershell
  .\run_project.ps1
  ```
  *(If PowerShell shows an execution policy error, run: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass` then rerun `.\run_project.ps1`)*

### 🍎 On macOS / 🐧 Linux:
Open Terminal in the project folder and run:
```bash
chmod +x run_project.sh
./run_project.sh
```

The script will automatically:
1. Verify Python and Node.js.
2. Create and configure `backend/venv` with all machine learning and data packages.
3. Configure `backend/.env` with default settings.
4. Run `npm install` in the frontend.
5. Launch the FastAPI backend on `http://127.0.0.1:8000`.
6. Launch the Vite frontend on `http://localhost:3000`.
7. Automatically open your web browser to `http://localhost:3000`.

---

## 🛠️ 3. Manual Step-by-Step Run (Alternative)

If you prefer to run the backend and frontend in separate terminals manually:

### Step 1: Start the Backend (Terminal 1)
```bash
# 1. Navigate to the backend folder
cd backend

# 2. Create Python virtual environment
python -m venv venv

# 3. Activate the virtual environment:
# On Windows (Command Prompt):
venv\Scripts\activate
# On Windows (PowerShell):
.\venv\Scripts\Activate.ps1
# On macOS / Linux:
source venv/bin/activate

# 4. Install backend dependencies
pip install -r requirements.txt

# 5. Create .env if not present
# (Copy from .env.example)

# 6. Start the FastAPI server
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
*Backend will be running at:* `http://127.0.0.1:8000`  
*Interactive Swagger API Docs:* `http://127.0.0.1:8000/docs`

---

### Step 2: Start the Frontend (Terminal 2)
Open a **new, second terminal window**:
```bash
# 1. Navigate to the frontend folder
cd frontend

# 2. Install dependencies (only needed the first time)
npm install

# 3. Start the Vite development server
npm run dev
```
*Frontend will be running at:* `http://localhost:3000`

Now open `http://localhost:3000` in Google Chrome, Brave, Edge, or Safari!

---

## 📂 4. Project Structure Overview

```text
bullsight/
│
├── run_project.bat          # 1-Click launcher for Windows CMD
├── run_project.ps1          # 1-Click launcher for Windows PowerShell
├── run_project.sh           # 1-Click launcher for macOS / Linux
├── README.md                # Main documentation
├── TEAM_SETUP_GUIDE.md      # This guide
│
├── backend/                 # FastAPI & Machine Learning Engine
│   ├── app/
│   │   ├── main.py          # FastAPI application entrypoint
│   │   ├── routes/          # REST API endpoints (stocks, predictions, market, ai, news, settings)
│   │   ├── ml/              # LSTM model inference, preprocessing, & training
│   │   ├── indicators/      # Quantitative technical indicator math (RSI, MACD, SMA, etc.)
│   │   ├── services/        # Yahoo Finance live engine & AI assistant logic
│   │   └── schemas/         # Pydantic data validation schemas
│   ├── models/              # Pre-trained LSTM Neural Network (.keras) & Scaler (.pkl)
│   ├── requirements.txt     # Python packages list
│   └── .env.example         # Example configuration
│
└── frontend/                # React 18 + Vite Web Application
    ├── src/
    │   ├── pages/           # Dashboard, Predictions, Screener, Watchlist, Portfolio, Settings, etc.
    │   ├── components/      # Sidebar, TopBar, StockChart (Plotly + Recharts), KPI Cards
    │   ├── services/api.js  # Axios backend communication & fallback engine
    │   └── context/         # ThemeContext (Dark Midnight Emerald & Light Fintech themes)
    ├── public/              # Static assets (Official BullSight logo, favicon)
    ├── package.json         # NPM packages and scripts
    └── vite.config.js       # Vite configuration with automatic backend proxy
```

---

## 🔑 5. API Keys (Optional)

The application includes built-in fallbacks and default sample keys. You **do not** need to purchase or register any API keys to run or test the project!

- **News API Key:** Optional. Fallback institutional market news with live sentiment analysis is provided.
- **OpenAI API Key:** Optional. Fallback quantitative stock reasoning engine is provided in the BullSight AI Assistant.

You can inspect or change keys anytime inside the web app at **Settings** (`/settings`).

---

## ❓ 6. Common Troubleshooting / FAQ

### Q1: `python: command not found` or `'python' is not recognized`
**Solution:** Python is not added to your system environment variables. Re-run the Python installer, select **Modify**, and make sure **Add python.exe to PATH** is checked. Restart your terminal.

### Q2: PowerShell says `running scripts is disabled on this system`
**Solution:** Windows restricts PowerShell scripts by default. Run this command once in PowerShell:
```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```
Then run `.\run_project.ps1` or simply double-click `run_project.bat`.

### Q3: `Port 3000 or 8000 is already in use`
**Solution:** Another app (or an earlier instance of BullSight) is using that port.
- On Windows: Run `netstat -ano | findstr :8000` or `:3000` and kill the PID via Task Manager.
- Or restart your laptop to clear stuck ports.

### Q4: `TensorFlow: oneDNN custom operations are on` warning
**Solution:** This is an informational message from TensorFlow indicating your CPU is utilizing optimized vector instructions. It is completely normal and not an error.

### Q5: How do I test the AI Predictions?
**Solution:**
1. Open `http://localhost:3000/predictions` in your browser.
2. Select any stock from the ticker dropdown (e.g., `AAPL`, `NVDA`, `TSLA`, `RELIANCE.NS`, or `BTC-USD`).
3. Select a horizon (7D, 14D, 30D) and click **Run Prediction**.
4. You will see dynamically computed Target Price, Projected Movement %, Algorithmic Signal (`BUY`, `SELL`, `HOLD`), Model Conviction %, and stock-specific MAE.

---

### 💬 Need Help?
Ask your project lead or check the interactive API documentation at `http://127.0.0.1:8000/docs`.
