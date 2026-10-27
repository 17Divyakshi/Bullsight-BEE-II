@echo off
cd /d "%~dp0"
echo ========================================================
echo   Starting BULLSIGHT - AI Stock Intelligence Platform
echo   Tagline: "See the Bull. Predict the Move."
echo ========================================================
echo.

set PYTHON_CMD=python
if exist "backend\venv\Scripts\python.exe" (
    set "PYTHON_CMD=%CD%\backend\venv\Scripts\python.exe"
) else if exist "%USERPROFILE%\.gemini\antigravity\scratch\bullsight\backend\venv\Scripts\python.exe" (
    set "PYTHON_CMD=%USERPROFILE%\.gemini\antigravity\scratch\bullsight\backend\venv\Scripts\python.exe"
)

echo [1/2] Starting FastAPI Backend Engine on http://localhost:8000 ...
start "BullSight Backend (FastAPI)" cmd /k "cd /d "%~dp0backend" && "%PYTHON_CMD%" -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"

echo [2/2] Starting React Vite Frontend on http://localhost:3000 ...
start "BullSight Frontend (Vite)" cmd /k "cd /d "%~dp0frontend" && npm run dev"

echo.
echo ========================================================
echo   Bullsight is launching!
echo   Frontend: http://localhost:3000
echo   Backend Docs: http://localhost:8000/docs
echo ========================================================
timeout /t 3 >nul
start http://localhost:3000

