# BullSight AI — Team PowerShell Launcher
$Host.UI.RawUI.WindowTitle = "BullSight AI — Team Launcher"
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "               BULLSIGHT - AI STOCK INTELLIGENCE DASHBOARD" -ForegroundColor Cyan
Write-Host "                    'See the Bull. Predict the Move.'" -ForegroundColor Cyan
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Python
try {
    $pyVer = python --version 2>&1
    Write-Host "[OK] Python detected: $pyVer" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Python is not installed or not in PATH!" -ForegroundColor Red
    Write-Host "Please install Python 3.10+ from https://www.python.org/" -ForegroundColor Yellow
    exit 1
}

# 2. Check Node
try {
    $nodeVer = node --version 2>&1
    Write-Host "[OK] Node.js detected: $nodeVer" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js is not installed or not in PATH!" -ForegroundColor Red
    Write-Host "Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# 3. Setup Virtual Environment
Write-Host ""
Write-Host "[1/4] Checking Python Virtual Environment..." -ForegroundColor Yellow
if (-not (Test-Path "backend\venv\Scripts\Activate.ps1")) {
    Write-Host "Creating Python virtual environment in backend\venv..."
    python -m venv backend\venv
    Write-Host "Installing backend dependencies from requirements.txt..."
    & "backend\venv\Scripts\python.exe" -m pip install --upgrade pip
    & "backend\venv\Scripts\python.exe" -m pip install -r backend\requirements.txt
} else {
    Write-Host "Virtual environment already configured." -ForegroundColor Green
}

# 4. Setup .env
Write-Host "[2/4] Checking backend environment file..." -ForegroundColor Yellow
if (-not (Test-Path "backend\.env")) {
    if (Test-Path "backend\.env.example") {
        Copy-Item "backend\.env.example" "backend\.env"
        Write-Host "Created backend\.env from template." -ForegroundColor Green
    }
}

# 5. Setup Frontend
Write-Host "[3/4] Checking frontend dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "Installing frontend npm packages..."
    Push-Location frontend
    npm install
    Pop-Location
} else {
    Write-Host "Frontend node_modules already configured." -ForegroundColor Green
}

# 6. Launch Backend and Frontend
Write-Host ""
Write-Host "[4/4] Starting BullSight Services..." -ForegroundColor Yellow
Write-Host " - Backend API:  http://127.0.0.1:8000" -ForegroundColor Cyan
Write-Host " - Frontend UI:  http://localhost:3000" -ForegroundColor Cyan

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; .\venv\Scripts\Activate.ps1; uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload"
Start-Sleep -Seconds 3

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
Start-Sleep -Seconds 3

Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "===============================================================================" -ForegroundColor Green
Write-Host "[SUCCESS] BullSight is running!" -ForegroundColor Green
Write-Host "Dashboard: http://localhost:3000" -ForegroundColor Cyan
Write-Host "API Docs:  http://127.0.0.1:8000/docs" -ForegroundColor Cyan
Write-Host "===============================================================================" -ForegroundColor Green
