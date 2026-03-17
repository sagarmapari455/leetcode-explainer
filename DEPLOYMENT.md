# Deployment Guide

## Deploying the Frontend (Next.js)

### Option 1: Vercel (Recommended for Next.js)

**Steps:**
1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Select your GitHub repository
5. Set environment variables:
   - `NEXT_PUBLIC_API_URL` = your backend URL
6. Click "Deploy"

**Cost:** Free tier available

### Option 2: Netlify

**Steps:**
1. Build frontend: `npm run build`
2. Connect GitHub to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

**Cost:** Free tier available

### Option 3: Traditional Server (AWS, DigitalOcean, etc.)

```bash
# Build the application
npm run build

# Start production server
npm start

# Or use PM2 for process management
npm install -g pm2
pm2 start "npm start" --name "leetcode-frontend"
```

---

## Deploying the Backend (FastAPI)

### Option 1: Railway (Recommended)

**Steps:**
1. Push code to GitHub
2. Go to https://railway.app
3. Create new project
4. Connect GitHub
5. Add environment variables:
   - Create `railway.json` at root:
   ```json
   {
     "LLM_API_KEY": "your-key",
     "LLM_MODEL_NAME": "gpt-4"
   }
   ```
6. Deploy

### Option 2: Render

**Steps:**
1. Create `render.yaml`:
```yaml
services:
  - type: web
    name: leetcode-api
    env: python
    buildCommand: "pip install -r requirements.txt"
    startCommand: "python main.py"
    envVars:
      - key: LLM_API_KEY
        value: your-api-key
      - key: LLM_MODEL_NAME
        value: gpt-4
```

2. Push to GitHub
3. Connect to Render
4. Deploy

### Option 3: Azure App Service

**Steps:**
1. Create resource group:
```bash
az group create --name rg-leetcode --location eastus
```

2. Create app service plan:
```bash
az appservice plan create --name leetcode-plan --resource-group rg-leetcode --sku B1 --is-linux
```

3. Deploy:
```bash
az webapp up --name leetcode-api --resource-group rg-leetcode --runtime "PYTHON:3.11"
```

### Option 4: Docker (Any Cloud Provider)

**Dockerfile for Backend:**
```dockerfile
FROM python:3.11

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .

ENV LLM_API_KEY=${LLM_API_KEY}
ENV LLM_MODEL_NAME=${LLM_MODEL_NAME}

EXPOSE 8000

CMD ["python", "main.py"]
```

**Build and run:**
```bash
docker build -t leetcode-api .
docker run -e LLM_API_KEY=sk-... -e LLM_MODEL_NAME=gpt-4 -p 8000:8000 leetcode-api
```

#### Deploy to Docker Hub:
```bash
docker tag leetcode-api username/leetcode-api
docker push username/leetcode-api
```

---

## Production Checklist

### Backend
- [ ] Move API keys to environment variables
- [ ] Set `REQUEST_TIMEOUT` appropriately
- [ ] Update `ALLOWED_ORIGINS` for your frontend domain
- [ ] Enable CORS for production domain
- [ ] Add rate limiting
- [ ] Set up logging and monitoring
- [ ] Use HTTPS/SSL certificate
- [ ] Test error handling
- [ ] Implement caching for frequent queries

### Frontend
- [ ] Build optimized: `npm run build`
- [ ] Update `NEXT_PUBLIC_API_URL` to production backend
- [ ] Test all features
- [ ] Enable browser caching
- [ ] Minify and optimize assets
- [ ] Add analytics
- [ ] Test performance

### Infrastructure
- [ ] Set up domain name
- [ ] Enable HTTPS
- [ ] Set up backups
- [ ] Monitor uptime
- [ ] Set up alerts
- [ ] Load testing
- [ ] Security audit

---

## Environment Variables for Production

### Backend (backend/config.py or environment)

```python
LLM_API_KEY = os.getenv("LLM_API_KEY")
LLM_MODEL_NAME = os.getenv("LLM_MODEL_NAME")

# Frontend domain
FRONTEND_URL = os.getenv("FRONTEND_URL", "https://yourdomain.com")

# Backend domain
BACKEND_URL = os.getenv("BACKEND_URL", "https://api.yourdomain.com")

# CORS settings
ALLOWED_ORIGINS = [
    "https://yourdomain.com",
    "https://www.yourdomain.com",
]

# Request timeout
REQUEST_TIMEOUT = int(os.getenv("REQUEST_TIMEOUT", 30))
```

### Frontend (.env.local or .env.production)

```
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

---

## Performance Optimization

### Frontend
- [ ] Enable image optimization: `next/image`
- [ ] Code splitting
- [ ] CSS minification (handled by Tailwind)
- [ ] Use CDN for static assets
- [ ] Enable compression

### Backend
- [ ] Add Redis caching
- [ ] Database connection pooling
- [ ] Use async/await properly
- [ ] Add request validation
- [ ] Implement rate limiting

```python
from fastapi_limiter import FastAPILimiter
from fastapi_limiter.util import get_remote_address

FastAPILimiter.init()

@app.post("/explain")
@limiter.limit("10/minute")  # 10 requests per minute
async def explain_problem(request: Request, explain_req: ExplainRequest):
    # ...
```

---

## Monitoring and Logging

### Backend Logging

```python
import logging

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

logger = logging.getLogger(__name__)
```

### Frontend Error Tracking

```javascript
// Using Sentry or similar
import * as Sentry from "@sentry/next";

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: process.env.NEXT_ENV,
});
```

---

## Security Considerations

1. **HTTPS**: Always use SSL/TLS in production
2. **CORS**: Only allow your frontend domain
3. **Rate Limiting**: Prevent abuse
4. **API Key Rotation**: Change keys regularly
5. **Secrets Management**: Use proper secret storage
6. **Input Validation**: Validate all inputs
7. **Error Handling**: Don't expose sensitive info
8. **Authentication**: Add user authentication if needed
9. **Logging**: Monitor for suspicious activity
10. **Keep Dependencies Updated**: Regular security updates

---

## Cost Estimation

### Frontend
- **Vercel**: Free tier ($0/month)
- **Netlify**: Free tier ($0/month)
- **AWS**: $10-50/month

### Backend
- **Railway**: $5+/month
- **Render**: $7+/month
- **Azure**: $10+/month
- **AWS**: $5-20/month

### LLM API
- **OpenAI**: $0.01 per 1K tokens (GPT-3.5) - ~$5-20/month typical usage
- **Anthropic**: $0.003 per 1K input tokens - ~$5-15/month typical usage

---

## Scaling Strategies

1. **Database Caching**: Cache responses in Redis
2. **Load Balancing**: Distribute traffic
3. **Horizontal Scaling**: Multiple backend instances
4. **CDN**: Serve static content faster
5. **API Optimization**: Reduce response size

---

For detailed guides, see the official documentation:
- Vercel: https://vercel.com/docs
- Railway: https://docs.railway.app
- Docker: https://docs.docker.com
- FastAPI: https://fastapi.tiangolo.com/deployment
