#!/bin/bash

# LeetCode AI Explainer - Quick Start Script
# This script helps you set up and run the application

echo "🚀 LeetCode AI Explainer - Setup Script"
echo "========================================"
echo ""

# Check Python
echo "Checking Python installation..."
python --version || { echo "❌ Python not found. Please install Python 3.8+"; exit 1; }

# Check Node.js
echo "Checking Node.js installation..."
node --version || { echo "❌ Node.js not found. Please install Node.js 18+"; exit 1; }
npm --version || { echo "❌ npm not found"; exit 1; }

echo "✅ Python and Node.js found!"
echo ""

# Setup Backend
echo "📦 Setting up backend..."
cd backend

# Create virtual environment if it doesn't exist
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate || . venv/Scripts/activate

# Install requirements
echo "Installing Python dependencies..."
pip install -r requirements.txt

echo ""
echo "⚙️  Backend setup complete!"
echo "❗ Don't forget to edit backend/config.py with your LLM API key!"
echo ""

# Setup Frontend
echo "📦 Setting up frontend..."
cd ../frontend

# Install npm dependencies
echo "Installing npm dependencies..."
npm install

# Create .env.local if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "NEXT_PUBLIC_API_URL=http://localhost:8000" > .env.local
    echo "Created .env.local file"
fi

echo ""
echo "✅ Frontend setup complete!"
echo ""

echo "========================================"
echo "✨ Setup Complete!"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Edit backend/config.py with your LLM API key"
echo "2. In terminal 1, run: cd backend && python main.py"
echo "3. In terminal 2, run: cd frontend && npm run dev"
echo "4. Open http://localhost:3000 in your browser"
echo ""
