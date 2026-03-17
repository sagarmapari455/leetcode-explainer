# Start Backend and Frontend
Write-Host "🚀 Starting LeetCode AI Explainer..." -ForegroundColor Cyan
Write-Host ""

# Stop any existing processes
Write-Host "Cleaning up existing processes..." -ForegroundColor Yellow
Get-Process -Name "node" -ErrorAction SilentlyContinue | Stop-Process -Force
Get-Process -Name "python" -ErrorAction SilentlyContinue | Stop-Process -Force

Write-Host ""

# Start Backend
Write-Host "📦 Starting Backend (Python FastAPI)..." -ForegroundColor Green
Start-Process powershell -ArgumentList "cd '$PSScriptRoot\backend'; python main.py" -NoNewWindow

# Wait a moment for backend to start
Start-Sleep -Seconds 3

# Start Frontend
Write-Host "⚛️  Starting Frontend (Next.js)..." -ForegroundColor Blue
Start-Process powershell -ArgumentList "cd '$PSScriptRoot\frontend'; npm run dev" -NoNewWindow

Write-Host ""
Write-Host "✅ Both servers are starting!" -ForegroundColor Green
Write-Host "   Backend: http://localhost:8000" -ForegroundColor Cyan
Write-Host "   Frontend: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Note: Both servers will run in separate terminal windows" -ForegroundColor Yellow
