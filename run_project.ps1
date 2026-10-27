# BullSight AI — MERN PowerShell Launcher
$Host.UI.RawUI.WindowTitle = "BullSight AI — MERN Launcher"
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host "               BULLSIGHT — MERN STOCK INTELLIGENCE DASHBOARD" -ForegroundColor Cyan
Write-Host "                    'See the Bull. Predict the Move.'" -ForegroundColor Cyan
Write-Host "===============================================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Check Node
try {
    $nodeVer = node --version 2>&1
    Write-Host "[OK] Node.js detected: $nodeVer" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js is not installed or not in PATH!" -ForegroundColor Red
    Write-Host "Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# 2. Check MongoDB
Write-Host ""
Write-Host "[1/4] Checking MongoDB Service..." -ForegroundColor Yellow
$mongodExists = Get-Command mongod -ErrorAction SilentlyContinue
if ($mongodExists) {
    if (-not (Test-Path "mongodb_data")) {
        New-Item -ItemType Directory -Force -Path "mongodb_data" | Out-Null
    }
    Start-Process mongod -ArgumentList "--dbpath .\mongodb_data --port 27017" -WindowStyle Minimized
    Write-Host "[OK] MongoDB daemon initiated on port 27017." -ForegroundColor Green
} else {
    Write-Host "[WARN] mongod binary not in PATH. Assuming MongoDB runs as background service." -ForegroundColor Yellow
}

# 3. Setup Server
Write-Host ""
Write-Host "[2/4] Checking Express Backend Dependencies & Configuration..." -ForegroundColor Yellow
if (-not (Test-Path "server\.env")) {
    if (Test-Path "server\.env.example") {
        Copy-Item "server\.env.example" "server\.env"
        Write-Host "Created server\.env from template." -ForegroundColor Green
    }
}

if (-not (Test-Path "server\node_modules")) {
    Write-Host "Installing Express backend dependencies..."
    Push-Location server
    npm install
    Pop-Location
} else {
    Write-Host "Express backend dependencies configured." -ForegroundColor Green
}

Write-Host "Seeding initial MongoDB database records..." -ForegroundColor Yellow
Push-Location server
node utils/seedDatabase.js
Pop-Location

# 4. Setup Frontend
Write-Host ""
Write-Host "[3/4] Checking React Frontend Dependencies..." -ForegroundColor Yellow
if (-not (Test-Path "frontend\node_modules")) {
    Write-Host "Installing frontend npm packages..."
    Push-Location frontend
    npm install
    Pop-Location
} else {
    Write-Host "Frontend node_modules already configured." -ForegroundColor Green
}

# 5. Launch Backend and Frontend
Write-Host ""
Write-Host "[4/4] Starting BullSight MERN Services..." -ForegroundColor Yellow
Write-Host " - Express API:  http://localhost:5000" -ForegroundColor Cyan
Write-Host " - Frontend UI:  http://localhost:3000" -ForegroundColor Cyan

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm start"
Start-Sleep -Seconds 3

Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
Start-Sleep -Seconds 3

Start-Process "http://localhost:3000"

Write-Host ""
Write-Host "===============================================================================" -ForegroundColor Green
Write-Host "[SUCCESS] BullSight MERN is running!" -ForegroundColor Green
Write-Host "Dashboard:  http://localhost:3000" -ForegroundColor Cyan
Write-Host "API Health: http://localhost:5000/api/health" -ForegroundColor Cyan
Write-Host "===============================================================================" -ForegroundColor Green
