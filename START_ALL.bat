@echo off
REM Start Backend and Frontend
echo.
echo 🚀 Starting LeetCode AI Explainer...
echo.

REM Kill existing processes
taskkill /F /IM node.exe 2>nul
taskkill /F /IM python.exe 2>nul

echo Cleaning up existing processes...
timeout /t 2 /nobreak

echo.
echo 📦 Starting Backend (Python FastAPI)...
start "Backend - LeetCode AI" cmd /k "cd /d "%cd%\backend" && python main.py"

timeout /t 3 /nobreak

echo ⚛️  Starting Frontend (Next.js)...
start "Frontend - LeetCode AI" cmd /k "cd /d "%cd%\frontend" && npm run dev"

echo.
echo ✅ Both servers are starting!
echo    Backend: http://localhost:8000
echo    Frontend: http://localhost:3000
echo.
echo 📝 Note: Both servers will run in separate terminal windows
echo.
pause
