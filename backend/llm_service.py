"""
LLM Service module for communicating with various LLM APIs.
Supports OpenAI, Anthropic, and other compatible APIs.
"""

import requests
import json
from typing import Dict, Any, Optional
from config import LLM_API_KEY, LLM_MODEL_NAME, LLM_API_URL, REQUEST_TIMEOUT


class LLMService:
    """
    Generic LLM service that can work with different LLM providers.
    """
    
    def __init__(self, api_key: str, model_name: str, api_url: str = None):
        """
        Initialize the LLM service.
        
        Args:
            api_key: API key for the LLM provider
            model_name: Model name (e.g., "gpt-4", "claude-3-sonnet")
            api_url: Custom API URL (auto-detected if not provided)
        """
        self.api_key = api_key
        self.model_name = model_name
        self.api_url = api_url or self._detect_api_url(model_name)
        
    def _detect_api_url(self, model_name: str) -> str:
        """
        Auto-detect the API URL based on model name.
        
        Args:
            model_name: The model name string
            
        Returns:
            The appropriate API endpoint URL
        """
        if "gpt" in model_name.lower():
            return "https://api.openai.com/v1/chat/completions"
        elif "claude" in model_name.lower():
            return "https://api.anthropic.com/v1/messages"
        else:
            # Default to custom API if provided in config, otherwise raise error
            if LLM_API_URL:
                return LLM_API_URL
            raise ValueError(f"Could not detect API URL for model: {model_name}")
    
    def explain_problem(self, prompt: str) -> Dict[str, Any]:
        """
        Send a prompt to the LLM and get an explanation.
        
        Args:
            prompt: The prompt to send to the LLM
            
        Returns:
            Dictionary containing the explanation and metadata
        """
        try:
            if "openai" in self.api_url.lower():
                return self._call_openai(prompt)
            elif "anthropic" in self.api_url.lower():
                return self._call_anthropic(prompt)
            else:
                return self._call_generic_api(prompt)
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "explanation": None
            }
    
    def _call_openai(self, prompt: str) -> Dict[str, Any]:
        """
        Call OpenAI API (GPT models).
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": self.model_name,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.7,
            "max_tokens": 2000,
        }
        
        response = requests.post(
            self.api_url,
            headers=headers,
            json=payload,
            timeout=REQUEST_TIMEOUT
        )
        
        if response.status_code == 200:
            data = response.json()
            explanation = data["choices"][0]["message"]["content"]
            return {
                "success": True,
                "explanation": explanation,
                "model": self.model_name,
                "provider": "OpenAI"
            }
        else:
            return {
                "success": False,
                "error": f"OpenAI API error: {response.status_code} - {response.text}",
                "explanation": None
            }
    
    def _call_anthropic(self, prompt: str) -> Dict[str, Any]:
        """
        Call Anthropic API (Claude models).
        """
        headers = {
            "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01",
            "content-type": "application/json"
        }
        
        payload = {
            "model": self.model_name,
            "max_tokens": 2000,
            "messages": [
                {
                    "role": "user",
                    "content": prompt
                }
            ]
        }
        
        response = requests.post(
            self.api_url,
            headers=headers,
            json=payload,
            timeout=REQUEST_TIMEOUT
        )
        
        if response.status_code == 200:
            data = response.json()
            explanation = data["content"][0]["text"]
            return {
                "success": True,
                "explanation": explanation,
                "model": self.model_name,
                "provider": "Anthropic"
            }
        else:
            return {
                "success": False,
                "error": f"Anthropic API error: {response.status_code} - {response.text}",
                "explanation": None
            }
    
    def _call_generic_api(self, prompt: str) -> Dict[str, Any]:
        """
        Call a generic LLM API endpoint.
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": self.model_name,
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.7,
            "max_tokens": 2000,
        }
        
        response = requests.post(
            self.api_url,
            headers=headers,
            json=payload,
            timeout=REQUEST_TIMEOUT
        )
        
        if response.status_code == 200:
            data = response.json()
            # Handle different response formats
            if "choices" in data:
                explanation = data["choices"][0]["message"]["content"]
            elif "content" in data:
                explanation = data["content"][0]["text"]
            else:
                explanation = str(data)
                
            return {
                "success": True,
                "explanation": explanation,
                "model": self.model_name,
                "provider": "Generic"
            }
        else:
            return {
                "success": False,
                "error": f"API error: {response.status_code} - {response.text}",
                "explanation": None
            }


# Initialize global LLM service
llm_service = None


def init_llm_service(api_key: str = None, model_name: str = None) -> LLMService:
    """
    Initialize the LLM service with optional overrides.
    
    Args:
        api_key: Optional API key (uses config if not provided)
        model_name: Optional model name (uses config if not provided)
        
    Returns:
        Initialized LLMService instance
    """
    global llm_service
    
    key = api_key or LLM_API_KEY
    model = model_name or LLM_MODEL_NAME
    
    if not key or not model:
        raise ValueError("LLM_API_KEY and LLM_MODEL_NAME must be configured in config.py")
    
    llm_service = LLMService(api_key=key, model_name=model, api_url=LLM_API_URL)
    return llm_service


def get_llm_service() -> LLMService:
    """
    Get the initialized LLM service instance.
    
    Returns:
        The LLMService instance
        
    Raises:
        RuntimeError: If service is not initialized
    """
    if llm_service is None:
        init_llm_service()
    return llm_service
