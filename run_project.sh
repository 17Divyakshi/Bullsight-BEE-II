#!/usr/bin/env bash
# BullSight AI — Team Mac/Linux MERN Launcher
set -e

echo "==============================================================================="
echo "               BULLSIGHT — MERN STOCK INTELLIGENCE DASHBOARD"
echo "                    'See the Bull. Predict the Move.'"
echo "==============================================================================="
echo ""

# 1. Check Node.js
if ! command -v node &> /dev/null; then
    echo "[ERROR] Node.js is not installed or not in PATH!"
    echo "Please install Node.js 18+ from https://nodejs.org/ or via nvm."
    exit 1
fi
echo "[OK] Node.js detected: $(node --version)"

# 2. Setup Server
echo ""
echo "[1/3] Checking Express Backend Dependencies & Configuration..."
if [ ! -f "server/.env" ]; then
    if [ -f "server/.env.example" ]; then
        cp server/.env.example server/.env
        echo "Created server/.env from template."
    fi
fi

if [ ! -d "server/node_modules" ]; then
    echo "Installing Express backend dependencies..."
    (cd server && npm install)
fi

echo "Seeding initial MongoDB database records..."
(cd server && node utils/seedDatabase.js)

# 3. Setup Frontend
echo ""
echo "[2/3] Checking Frontend Dependencies..."
if [ ! -d "frontend/node_modules" ]; then
    echo "Installing frontend npm packages..."
    (cd frontend && npm install)
fi

# 4. Start Services
echo ""
echo "[3/3] Starting BullSight MERN Services..."
echo " - Express API:  http://localhost:5000"
echo " - Frontend UI:  http://localhost:3000"

(cd server && npm start) &
SERVER_PID=$!

(cd frontend && npm run dev) &
FRONTEND_PID=$!

trap "kill $SERVER_PID $FRONTEND_PID" EXIT

echo ""
echo "==============================================================================="
echo "[SUCCESS] BullSight MERN is running!"
echo "Dashboard: http://localhost:3000"
echo "API Health: http://localhost:5000/api/health"
echo "Press Ctrl+C to stop all services."
echo "==============================================================================="

wait
