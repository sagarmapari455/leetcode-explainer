"""
Configuration file for the LeetCode AI Explainer backend.
Loads sensitive data from environment variables for security.

Setup:
1. Copy .env.example to .env
2. Fill in your API keys in the .env file
3. Never commit .env to version control
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# LLM Configuration
# Supports OpenAI, Anthropic, NVIDIA, or any compatible LLM API
LLM_API_KEY = os.getenv(
    "LLM_API_KEY",
    ""  # Default empty - will error if not configured
)
LLM_MODEL_NAME = os.getenv(
    "LLM_MODEL_NAME",
    "meta/llama-3.1-8b-instruct"
)
LLM_API_URL = os.getenv(
    "LLM_API_URL",
    "https://integrate.api.nvidia.com/v1/chat/completions"
)

# Server Configuration
BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:8000")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:3000")

# CORS Configuration
ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://localhost:3000/",
    "http://127.0.0.1:3000",
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
]

# Request Configuration
REQUEST_TIMEOUT = int(os.getenv("REQUEST_TIMEOUT", "60"))  # seconds

# Validation
if not LLM_API_KEY:
    print("\n⚠️  WARNING: LLM_API_KEY not configured!")
    print("Please set LLM_API_KEY in your .env file and restart the server.\n")
