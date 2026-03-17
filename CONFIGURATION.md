# Environment Configuration Files

## Frontend: .env.local

Located in: `frontend/.env.local`

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

This tells your frontend where the backend API is running.

### For Production

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## Backend: config.py

Located in: `backend/config.py`

### ✅ REQUIRED: Add Your LLM Credentials

Before running the application, you MUST edit `backend/config.py` and add:

### Option 1: OpenAI (GPT-4, GPT-3.5-turbo)

```python
LLM_API_KEY = "sk-..."  # Get from https://platform.openai.com/api-keys
LLM_MODEL_NAME = "gpt-4"
```

### Option 2: Anthropic (Claude)

```python
LLM_API_KEY = "sk-ant-..."  # Get from https://console.anthropic.com/
LLM_MODEL_NAME = "claude-3-sonnet-20240229"
```

### Option 3: Other LLM Providers

```python
LLM_API_KEY = "your-api-key"
LLM_MODEL_NAME = "your-model-name"
LLM_API_URL = "https://your-api-endpoint.com/v1/chat/completions"
```

---

## Getting API Keys

### OpenAI API Key

1. Go to: https://platform.openai.com/api-keys
2. Sign up or log in
3. Click "Create new secret key"
4. Copy the entire key (starts with `sk-`)
5. Paste into `backend/config.py`

```python
LLM_API_KEY = "sk-proj-..."
LLM_MODEL_NAME = "gpt-4"
```

### Anthropic API Key

1. Go to: https://console.anthropic.com/
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `sk-ant-`)
6. Paste into `backend/config.py`

```python
LLM_API_KEY = "sk-ant-..."
LLM_MODEL_NAME = "claude-3-sonnet-20240229"
```

---

## Configuration Options

### LLM Settings

```python
# Which LLM to use
LLM_API_KEY = ""
LLM_MODEL_NAME = ""
LLM_API_URL = ""  # Auto-detected if not provided

# Request timeout (seconds)
REQUEST_TIMEOUT = 30

# CORS allowed origins
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

### Popular Models

**OpenAI:**
- `gpt-4` - Most capable, slower (recommended for best explanations)
- `gpt-4-turbo` - Faster GPT-4
- `gpt-3.5-turbo` - Fastest, good quality (recommended for speed)

**Anthropic:**
- `claude-3-opus-20240229` - Most capable
- `claude-3-sonnet-20240229` - Balanced (recommended)
- `claude-3-haiku-20240307` - Fastest

---

## Environment Variables Checklist

✅ Before running the app:

- [ ] Created `backend/config.py` with LLM credentials
- [ ] Created `frontend/.env.local` with API URL
- [ ] Backend API key is valid
- [ ] Frontend API URL is correct
- [ ] Firewall allows ports 3000 and 8000

---

## Troubleshooting

### "API Key is invalid"
- Check the key is correctly copied (no extra spaces)
- Verify the key is for the correct provider
- Ensure the key hasn't expired

### "Model not found"
- Check the model name spelling
- Verify the model is available in your API tier
- Consult provider documentation

### "CORS error in browser console"
- Check `ALLOWED_ORIGINS` in `backend/config.py`
- Ensure frontend URL is in the list
- Restart the backend after changes

### "Backend offline"
- Verify backend is running: `python main.py`
- Check backend is on `http://localhost:8000`
- Check firewall settings

---

## Security Best Practices

⚠️ **IMPORTANT:**

1. **Never commit `.env.local` to git** - It's in `.gitignore` for a reason
2. **Never commit API keys** - Use environment variables
3. **Rotate API keys** if you accidentally expose them
4. **Use different keys** for development and production
5. **Monitor API usage** to detect unauthorized access

For production:
- Use environment variables or secret management services
- Don't hardcode credentials in code
- Use API key rotation
- Enable rate limiting
- Add authentication for your API

---

## Sample Configuration

### Development Setup

```python
# backend/config.py

LLM_API_KEY = "sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
LLM_MODEL_NAME = "gpt-3.5-turbo"  # Fast for development

REQUEST_TIMEOUT = 30
ALLOWED_ORIGINS = ["http://localhost:3000"]
```

### Production Setup

```python
# backend/config.py (or use environment variables)

import os

LLM_API_KEY = os.getenv("LLM_API_KEY")
LLM_MODEL_NAME = os.getenv("LLM_MODEL_NAME", "gpt-4")

REQUEST_TIMEOUT = 60
ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://api.yourdomain.com",
]
```

---

## Testing Your Configuration

### Backend Health Check

```bash
curl http://localhost:8000/health
```

Response if configured correctly:
```json
{
  "status": "healthy",
  "llm_configured": true
}
```

### Frontend Environment

```bash
npm run dev
```

Check browser console for any errors related to environment variables.

---

For more details, see [README.md](README.md) and [QUICKSTART.md](QUICKSTART.md)
