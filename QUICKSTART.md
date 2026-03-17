# Quick Start Guide - Windows PowerShell

## Prerequisites
- Python 3.8+ (https://www.python.org/downloads/)
- Node.js 18+ (https://nodejs.org/)
- An LLM API key (OpenAI, Anthropic, etc.)

## Setup Instructions

### 1️⃣ Navigate to Project Directory
```powershell
cd "c:\Users\SAGAR\OneDrive\Desktop\Agentic Browser\LEETCODE"
```

### 2️⃣ Set Up Backend

```powershell
# Go to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
venv\Scripts\Activate.ps1

# Install dependencies
pip install -r requirements.txt

# ⚠️ IMPORTANT: Edit config.py with your LLM credentials
# Open: backend\config.py
# Add your LLM_API_KEY and LLM_MODEL_NAME
```

### 3️⃣ Run Backend (Terminal 1)

```powershell
cd backend
venv\Scripts\Activate.ps1
python main.py
```

You should see:
```
INFO:     Uvicorn running on http://0.0.0.0:8000
```

**Keep this terminal open!**

### 4️⃣ Set Up Frontend (Terminal 2)

```powershell
cd frontend

# Install dependencies
npm install

# Create environment file if it doesn't exist
# File: .env.local
# Content: NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 5️⃣ Run Frontend (Terminal 2)

```powershell
cd frontend
npm run dev
```

You should see:
```
ready - started server on 0.0.0.0:3000
```

### 6️⃣ Open in Browser

- Frontend: http://localhost:3000
- Backend Health: http://localhost:8000/health

## Configuration Examples

### For OpenAI (GPT-4)
Edit `backend\config.py`:
```python
LLM_API_KEY = "sk-..."  # Your OpenAI API key
LLM_MODEL_NAME = "gpt-4"
```

### For Anthropic (Claude)
Edit `backend\config.py`:
```python
LLM_API_KEY = "sk-ant-..."  # Your Anthropic API key
LLM_MODEL_NAME = "claude-3-sonnet-20240229"
```

## How to Get API Keys

### OpenAI
1. Go to https://platform.openai.com/api-keys
2. Click "Create new secret key"
3. Copy the key and add to config.py

### Anthropic
1. Go to https://console.anthropic.com/
2. Create an API key
3. Copy the key and add to config.py

## Testing the Application

1. Enter problem number `1` (Two Sum)
2. Click "Explain Problem"
3. Wait for AI to generate explanation
4. See all sections populated with content

## Common Issues

### Backend won't start
- Make sure Python is installed: `python --version`
- Check virtual environment is activated
- Verify config.py has LLM credentials

### Frontend can't connect to backend
- Ensure backend is running on port 8000
- Check .env.local file exists with correct URL
- Check CORS settings in backend/config.py

### "Backend is offline" message
- Start the backend: `python main.py`
- Verify it's running at http://localhost:8000/health

### API Error 401/403
- Check your API key is correct in config.py
- Verify the key has not expired
- Check the model name matches the provider

## Stopping the Application

- Press `Ctrl+C` in each terminal to stop the services
- Or close the terminal windows

## Next Steps

- Try different problem numbers
- Test with different languages
- Customize the UI in frontend/pages/index.tsx
- Add more features to the backend

Enjoy learning! 🚀
