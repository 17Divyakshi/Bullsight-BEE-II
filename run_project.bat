@echo off
title BullSight AI — MERN Quickstart Launcher
cls
echo ===============================================================================
echo                BULLSIGHT — MERN STOCK INTELLIGENCE DASHBOARD
echo                     "See the Bull. Predict the Move."
echo ===============================================================================
echo.

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
echo [1/4] Checking MongoDB Service...
where mongod >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    if not exist "mongodb_data" mkdir mongodb_data
    start "BullSight MongoDB Engine (:27017)" /min cmd /c "mongod --dbpath .\mongodb_data --port 27017"
    echo [OK] MongoDB daemon initiated.
) else (
    echo [WARN] mongod not in PATH. Assuming MongoDB is already running as a service.
)

echo.
echo [2/4] Checking Server Dependencies & Environment...
if not exist "server\.env" (
    if exist "server\.env.example" (
        copy "server\.env.example" "server\.env" >nul
        echo Created server\.env from template.
    )
)
if not exist "server\node_modules" (
    echo Installing Express backend npm packages...
    cd server
    call npm install
    cd ..
) else (
    echo Express backend dependencies already configured.
)

echo Seeding initial MongoDB data...
cd server
call node utils/seedDatabase.js
cd ..

echo.
echo [3/4] Checking Frontend Dependencies...
if not exist "frontend\node_modules" (
    echo Installing React frontend npm packages...
    cd frontend
    call npm install
    cd ..
) else (
    echo Frontend dependencies already configured.
)

echo.
echo [4/4] Starting BullSight MERN Services...
echo - Express Backend API: http://localhost:5000
echo - React Frontend UI:   http://localhost:3000
echo.

start "BullSight Express Backend (:5000)" cmd /k "cd server && npm start"
timeout /t 3 /nobreak >nul

start "BullSight React Frontend (:3000)" cmd /k "cd frontend && npm run dev"
timeout /t 3 /nobreak >nul

start http://localhost:3000

echo ===============================================================================
echo [SUCCESS] BullSight MERN is running!
echo Dashboard:  http://localhost:3000
echo API Health: http://localhost:5000/api/health
echo.
echo To stop the servers, close the opened terminal windows.
echo ===============================================================================
pause
