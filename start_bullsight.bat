@echo off
cd /d "%~dp0"
echo ========================================================
echo   Starting BULLSIGHT - MERN Stock Intelligence Platform
echo   Tagline: "See the Bull. Predict the Move."
echo ========================================================
echo.

where mongod >nul 2>&1
if %ERRORLEVEL% EQU 0 (
    if not exist "mongodb_data" mkdir mongodb_data
    start "BullSight MongoDB (:27017)" /min cmd /c "mongod --dbpath .\mongodb_data --port 27017"
)

echo [1/2] Starting Express Backend Engine on http://localhost:5000 ...
start "BullSight Backend (Express :5000)" cmd /k "cd /d "%~dp0server" && npm start"

echo [2/2] Starting React Vite Frontend on http://localhost:3000 ...
start "BullSight Frontend (Vite :3000)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ========================================================
echo   BullSight MERN is launching!
echo   Frontend: http://localhost:3000
echo   Backend Health: http://localhost:5000/api/health
echo ========================================================
timeout /t 3 >nul
start http://localhost:3000
