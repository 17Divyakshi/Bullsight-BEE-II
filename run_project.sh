#!/usr/bin/env bash
# BullSight AI — Team Mac/Linux Launcher
set -e

echo "==============================================================================="
echo "               BULLSIGHT - AI STOCK INTELLIGENCE DASHBOARD"
echo "                    'See the Bull. Predict the Move.'"
echo "==============================================================================="
echo ""

# 1. Check Python
if ! command -v python3 &> /dev/null; then
    echo "[ERROR] Python 3 is not installed or not in PATH!"
    echo "Please install Python 3.10+ via Homebrew (brew install python) or apt."
    exit 1
fi
echo "[OK] Python detected: $(python3 --version)"

# 2. Check Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed or not in PATH!"
    echo "Please install Node.js 18+ from https://nodejs.org/ or via nvm."
    exit 1
fi
echo "[OK] Node.js detected: $(node --version)"

# 3. Setup Backend venv
echo ""
echo "[1/4] Checking Python Virtual Environment..."
if [ ! -f "backend/venv/bin/activate" ]; then
    echo "Creating virtual environment in backend/venv..."
    python3 -m venv backend/venv
    echo "Installing backend dependencies from requirements.txt..."
    backend/venv/bin/pip install --upgrade pip
    backend/venv/bin/pip install -r backend/requirements.txt
else
    echo "Virtual environment already configured."
fi

# 4. Setup .env
echo "[2/4] Checking backend configuration..."
if [ ! -f "backend/.env" ]; then
    if [ -f "backend/.env.example" ]; then
        cp backend/.env.example backend/.env
        echo "Created backend/.env from template."
    fi
fi

# 5. Setup Frontend
echo "[3/4] Checking frontend dependencies..."
if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend npm packages..."
    (cd frontend && npm install)
else
    echo "Frontend node_modules already configured."
fi

# 6. Start Services
echo ""
echo "[4/4] Starting BullSight Services..."
echo " - Backend API:  http://127.0.0.1:8000"
echo " - Frontend UI:  http://localhost:3000"
echo ""

# Trap exit to kill child background processes cleanly on Ctrl+C
trap 'kill 0' EXIT

(cd backend && ./venv/bin/uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload) &
sleep 2

(cd frontend && npm run dev) &
sleep 2

# Open browser
if command -v open &> /dev/null; then
    open http://localhost:3000
elif command -v xdg-open &> /dev/null; then
    xdg-open http://localhost:3000
fi

echo "==============================================================================="
echo "[SUCCESS] BullSight is running! Press CTRL+C to stop both servers."
echo "Dashboard: http://localhost:3000"
echo "API Docs:  http://127.0.0.1:8000/docs"
echo "==============================================================================="

wait
