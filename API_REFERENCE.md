# API Reference

## Base URL
- **Development**: `http://localhost:8000`
- **Production**: Your deployed backend URL

## Endpoints

### 1. Health Check
Check if the backend is running and LLM is configured.

```
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "llm_configured": true
}
```

---

### 2. Explain Problem (Recommended)
Get an AI explanation for a LeetCode problem.

```
POST /explain
Content-Type: application/json
```

**Request Body:**
```json
{
  "question_number": 1,
  "language": "English"
}
```

**Parameters:**
- `question_number` (int, required): LeetCode problem number (must be positive)
- `language` (string, optional): Explanation language. Default: "English"
  - Supported: English, Spanish, French, German, Chinese, Japanese, Hindi

**Response (Success):**
```json
{
  "success": true,
  "question_number": 1,
  "explanation": "**Simple Explanation**\nThe Two Sum problem asks you to find two numbers in an array that add up to a target sum...\n\n**Real Life Analogy**\nImagine you're at a store with items..."
}
```

**Response (Error):**
```json
{
  "success": false,
  "question_number": 1,
  "error": "Failed to explain problem: API error"
}
```

**Status Codes:**
- `200`: Success
- `400`: Invalid input
- `500`: Server error or LLM not configured

**Example using curl:**
```bash
curl -X POST http://localhost:8000/explain \
  -H "Content-Type: application/json" \
  -d '{
    "question_number": 1,
    "language": "English"
  }'
```

**Example using JavaScript/fetch:**
```javascript
fetch('http://localhost:8000/explain', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    question_number: 1,
    language: 'English',
  }),
})
  .then(res => res.json())
  .then(data => console.log(data));
```

---

### 3. Explain Problem (GET Alternative)
Alternative endpoint for testing in browser.

```
GET /problems/{question_number}/explain?language=English
```

**Parameters:**
- `question_number` (path param, required): Problem number
- `language` (query param, optional): Explanation language

**Response:** Same as POST /explain

**Example:**
```
http://localhost:8000/problems/2/explain?language=English
```

---

### 4. Root Endpoint
Basic health check.

```
GET /
```

**Response:**
```json
{
  "status": "running",
  "api": "LeetCode AI Explainer",
  "version": "1.0.0"
}
```

---

## Response Format

All responses follow a consistent JSON format:

**Successful Explanation:**
```json
{
  "success": true,
  "question_number": 1,
  "explanation": "...",
  "error": null
}
```

**Error Response:**
```json
{
  "success": false,
  "question_number": 1,
  "explanation": null,
  "error": "Error message describing what went wrong"
}
```

---

## Error Handling

### Common Errors

**1. LLM Not Configured**
```json
{
  "success": false,
  "error": "LLM not configured. Please set LLM_API_KEY and LLM_MODEL_NAME in config.py"
}
```
**Solution:** Add API credentials to `backend/config.py`

**2. Invalid Problem Number**
```json
{
  "success": false,
  "error": "Question number must be positive"
}
```
**Solution:** Enter a positive integer

**3. API Timeout**
```json
{
  "success": false,
  "error": "Failed to explain problem: Request timeout"
}
```
**Solution:** Try again later or increase REQUEST_TIMEOUT in config.py

**4. LLM API Error**
```json
{
  "success": false,
  "error": "Failed to explain problem: OpenAI API error: 401 - Invalid API key"
}
```
**Solution:** Check your API key and credentials

---

## Rate Limiting

The backend respects your LLM API rate limits:
- **OpenAI**: See https://platform.openai.com/account/rate-limits
- **Anthropic**: See https://docs.anthropic.com/

Add caching to reduce API calls:

```python
# In backend/main.py
from functools import lru_cache

@lru_cache(maxsize=100)  # Cache last 100 requests
async def explain_problem(request: ExplainRequest):
    # ... existing code
```

---

## Customization

### Changing Response Format

Edit the `ExplainResponse` model in `backend/main.py`:

```python
class ExplainResponse(BaseModel):
    success: bool
    question_number: int
    explanation: Optional[str] = None
    error: Optional[str] = None
    model: Optional[str] = None  # Add this
    tokens_used: Optional[int] = None  # Add this
```

### Adding Request Size Limit

In `backend/main.py`:

```python
app = FastAPI()
app.add_middleware(GZipMiddleware, minimum_size=1000)
```

### CORS Configuration

Edit allowed origins in `backend/config.py`:

```python
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://yourdomain.com",
    "https://api.yourdomain.com",
]
```

---

## Performance Tips

1. **Use faster models for quick responses:**
   ```python
   LLM_MODEL_NAME = "gpt-3.5-turbo"  # instead of gpt-4
   ```

2. **Increase timeout for complex problems:**
   ```python
   REQUEST_TIMEOUT = 60  # seconds
   ```

3. **Add caching for frequently requested problems:**
   ```python
   # Use Redis or similar
   cache = {}
   if question_number in cache:
       return cache[question_number]
   ```

4. **Batch process similar requests:**
   Instead of individual API calls, group similar requests

---

## Testing

### Test with cURL

```bash
# Health check
curl http://localhost:8000/health

# Explain problem
curl -X POST http://localhost:8000/explain \
  -H "Content-Type: application/json" \
  -d '{"question_number": 1, "language": "English"}'

# Using GET endpoint
curl "http://localhost:8000/problems/1/explain?language=English"
```

### Test with Postman

1. Import as JSON:
```json
{
  "POST": "/explain",
  "URL": "http://localhost:8000",
  "Body": {
    "question_number": 1,
    "language": "English"
  },
  "Headers": {
    "Content-Type": "application/json"
  }
}
```

2. Or manually:
   - Method: POST
   - URL: http://localhost:8000/explain
   - Body (raw JSON): `{"question_number": 1, "language": "English"}`

### Test with Python

```python
import requests

response = requests.post(
    'http://localhost:8000/explain',
    json={
        'question_number': 1,
        'language': 'English'
    }
)

print(response.json())
```

---

## Webhook Support (Future)

To add webhook notifications when explanations are ready:

```python
class ExplainRequest(BaseModel):
    question_number: int
    language: str = "English"
    webhook_url: Optional[str] = None  # Add this
```

---

## Version History

- **v1.0.0** (Current)
  - Initial release
  - Support for OpenAI and Anthropic
  - Core explanation features

---

## Support

For issues or questions:
1. Check the troubleshooting section in README.md
2. Review error messages carefully
3. Check backend logs for details
4. Verify API credentials and rate limits

---

Generated: 2024 | LeetCode AI Explainer
