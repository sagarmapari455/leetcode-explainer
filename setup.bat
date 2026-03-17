@echo off
REM LeetCode AI Explainer - Quick Start Script for Windows
REM This script helps you set up and run the application

echo.
echo 🚀 LeetCode AI Explainer - Setup Script
echo ========================================
echo.

REM Check Python
echo Checking Python installation...
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python not found. Please install Python 3.8+
    pause
    exit /b 1
)

REM Check Node.js
echo Checking Node.js installation...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js not found. Please install Node.js 18+
    pause
    exit /b 1
)
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm not found
    pause
    exit /b 1
)

echo ✅ Python and Node.js found!
echo.

REM Setup Backend
echo 📦 Setting up backend...
cd backend

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Install requirements
echo Installing Python dependencies...
pip install -r requirements.txt

echo.
echo ⚙️  Backend setup complete!
echo ❗ Don't forget to edit backend\config.py with your LLM API key!
echo.

REM Setup Frontend
echo 📦 Setting up frontend...
cd ..\frontend

REM Install npm dependencies
echo Installing npm dependencies...
call npm install

REM Create .env.local if it doesn't exist
if not exist ".env.local" (
    echo NEXT_PUBLIC_API_URL=http://localhost:8000 > .env.local
    echo Created .env.local file
)

echo.
echo ✅ Frontend setup complete!
echo.

echo ========================================
echo ✨ Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit backend\config.py with your LLM API key
echo 2. In PowerShell 1, run: cd backend; python main.py
echo 3. In PowerShell 2, run: cd frontend; npm run dev
echo 4. Open http://localhost:3000 in your browser
echo.
pause
