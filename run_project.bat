@echo off
title BullSight AI ? Team Quickstart Launcher
cls
echo ===============================================================================
echo                BULLSIGHT - AI STOCK INTELLIGENCE DASHBOARD
echo                     "See the Bull. Predict the Move."
echo ===============================================================================
echo.

python --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Python is not installed or not in PATH!
    echo Please install Python 3.10 or 3.11 from https://www.python.org/
    echo Make sure to check the box: "Add python.exe to PATH"
    echo.
    pause
    exit /b 1
)
echo [OK] Python detected.

node --version >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js is not installed or not in PATH!
    echo Please install Node.js 18+ from https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo [OK] Node.js detected.

echo.
echo [1/4] Checking Python Virtual Environment...
if not exist "backend\venv\Scripts\activate.bat" (
    echo Creating virtual environment in backend\venv...
    python -m venv backend\venv
    echo Upgrading pip and installing backend dependencies...
    backend\venv\Scripts\python.exe -m pip install --upgrade pip
    backend\venv\Scripts\python.exe -m pip install -r backend\requirements.txt
) else (
    echo Virtual environment already exists.
)

echo [2/4] Checking backend configuration...
if not exist "backend\.env" (
    if exist "backend\.env.example" (
        copy "backend\.env.example" "backend\.env" >nul
        echo Created backend\.env from .env.example
    ) else (
        echo NEWS_API_KEY=newsapi_live_9b4e7284f1a84c20bc6a5e12 > backend\.env
        echo OPENAI_API_KEY=sk-proj-bullsight_ai_live_enterprise_tier_2026_q3_active_v1 >> backend\.env
    )
)

echo [3/4] Checking frontend dependencies...
if not exist "frontend\node_modules" (
    echo Installing frontend npm packages (this may take 1-2 minutes)...
    cd frontend
    call npm install
    cd ..
) else (
    echo Frontend node_modules already installed.
)

echo.
echo [4/4] Starting BullSight Services...
echo - Backend API will run on:  http://127.0.0.1:8000
echo - Frontend UI will run on:  http://localhost:3000
echo.

start "BullSight Backend (FastAPI :8000)" cmd /k "cd backend && venv\Scripts\activate && uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"
timeout /t 3 /nobreak >nul

start "BullSight Frontend (Vite :3000)" cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak >nul

start http://localhost:3000

echo ===============================================================================
echo [SUCCESS] BullSight is running!
echo Dashboard:  http://localhost:3000
echo API Docs:   http://127.0.0.1:8000/docs
echo.
echo To stop the servers, close the two opened terminal windows.
echo ===============================================================================
pause
