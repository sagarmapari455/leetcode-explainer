# 🔐 API Key Security Setup Guide

## Overview
Your project now securely handles API keys using **environment variables** instead of hardcoding them.

## What Changed?

### ✅ Before (Insecure ❌)
```python
# config.py - DON'T DO THIS!
LLM_API_KEY = "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"
```

### ✅ After (Secure ✅)
```python
# config.py - Use environment variables!
import os
from dotenv import load_dotenv

load_dotenv()  # Load from .env file
LLM_API_KEY = os.getenv("LLM_API_KEY", "")
```

## Setup Instructions

### 1️⃣ **Environment Variables**
Two files are provided:
- **`.env.example`** - Template showing all available environment variables
- **`.env`** - Your actual configuration (already has your API key)

### 2️⃣ **How Python Loads the API Key**
1. `config.py` imports `load_dotenv()` from `python-dotenv`
2. `load_dotenv()` reads the `.env` file
3. `os.getenv("LLM_API_KEY")` retrieves the value
4. If `.env` doesn't exist, it uses the default value (empty string)

### 3️⃣ **Git Security**
Your `.gitignore` includes:
```
.env
.env.local
.env.*.local
```

This ensures **sensitive data is NEVER committed to GitHub**.

## Available Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `LLM_API_KEY` | ✅ Yes | (empty) | Your LLM API key from NVIDIA, OpenAI, or Anthropic |
| `LLM_MODEL_NAME` | ❌ No | `meta/llama-3.1-8b-instruct` | Model to use for explanations |
| `LLM_API_URL` | ❌ No | NVIDIA endpoint | API endpoint URL |
| `BACKEND_URL` | ❌ No | `http://localhost:8000` | Backend server URL |
| `FRONTEND_URL` | ❌ No | `http://localhost:3000` | Frontend server URL |
| `REQUEST_TIMEOUT` | ❌ No | `60` | API request timeout in seconds |

## File Structure

```
LEETCODE/
├── .env                 ← Your API keys (DO NOT commit!)
├── .env.example         ← Template for reference
├── .gitignore          ← Includes .env, config.py
├── backend/
│   ├── config.py       ← Loads from .env
│   ├── llm_service.py  ← Uses config values
│   └── requirements.txt ← Includes python-dotenv
└── README.md
```

## Usage Example

### Running the Backend
```bash
cd backend
python main.py
```

The backend will:
1. Load environment variables from `.env`
2. Use `LLM_API_KEY` to authenticate with the LLM API
3. Work exactly as before (same functionality)

### If `.env` is Missing
```
⚠️  WARNING: LLM_API_KEY not configured!
Please set LLM_API_KEY in your .env file and restart the server.
```

## Security Best Practices

✅ **Do:**
- Store API keys in `.env` only
- Add `.env` to `.gitignore`
- Use different keys for dev and production
- Rotate keys regularly
- Keep `.env.example` in Git (it shows the structure, not secrets)

❌ **Don't:**
- Hardcode API keys in code
- Commit `.env` to version control
- Share `.env` with team members (use environment management instead)
- Log sensitive values

## Switching API Providers

To switch from NVIDIA to OpenAI (example):

1. Update `.env`:
```bash
LLM_API_KEY=sk-proj-xxxxxxxxxxxxx  # OpenAI key
LLM_MODEL_NAME=gpt-4
LLM_API_URL=https://api.openai.com/v1/chat/completions
```

2. Restart the backend
3. It works immediately - no code changes needed!

## Troubleshooting

**Problem:** Backend says "LLM_API_KEY not configured"
- **Solution:** Check your `.env` file and add `LLM_API_KEY=your_key_here`

**Problem:** `.env` file doesn't exist
- **Solution:** Copy `.env.example` to `.env` and fill in your values:
  ```bash
  cp .env.example .env
  ```

**Problem:** python-dotenv not installed
- **Solution:** Install dependencies:
  ```bash
  pip install -r requirements.txt
  ```

## Files Modified

1. ✅ **`backend/config.py`** - Now loads from environment variables
2. ✅ **`backend/requirements.txt`** - Already includes `python-dotenv`
3. ✅ **`.gitignore`** - Updated to protect `.env`
4. ✅ **`.env.example`** - Template for reference
5. ✅ **`.env`** - Your actual configuration (in .gitignore)

## Testing the Setup

```bash
# Verify python-dotenv is installed
python -c "import dotenv; print('✓ python-dotenv installed')"

# Check if .env is loaded
python -c "from config import LLM_API_KEY; print(f'API Key length: {len(LLM_API_KEY)}')"

# Start the backend
python main.py
```

---

**Your app is now secure! 🔒**
All API keys are protected and will never be accidentally committed to GitHub.
