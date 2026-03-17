"""
FastAPI backend server for LeetCode AI Explainer.
Handles API requests and communicates with LLM providers.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import logging

from config import ALLOWED_ORIGINS, LLM_API_KEY, LLM_MODEL_NAME
from prompt_template import generate_prompt
from llm_service import init_llm_service, get_llm_service
from problems_db import (
    PROBLEMS, get_problem_metadata, get_related_problems,
    get_problems_by_difficulty, get_problems_by_category,
    search_problems, get_next_problem, get_max_problem_id, get_available_problem_count
)


# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Initialize FastAPI app
app = FastAPI(
    title="LeetCode AI Explainer API",
    description="API for explaining LeetCode problems using AI",
    version="1.0.0"
)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request/Response Models
class ExplainRequest(BaseModel):
    """Request model for problem explanation endpoint."""
    question_number: int
    language: Optional[str] = "English"
    
    class Config:
        example = {
            "question_number": 1,
            "language": "English"
        }


class ExplainResponse(BaseModel):
    """Response model for problem explanation endpoint."""
    success: bool
    question_number: int
    requested_number: Optional[int] = None  # Original requested number (if adjusted)
    explanation: Optional[str] = None
    error: Optional[str] = None
    message: Optional[str] = None  # Message about number adjustment


# New models for metadata and features

class ProblemMetadata(BaseModel):
    """Model for problem metadata."""
    id: int
    title: str
    difficulty: str
    acceptance_rate: float
    categories: list
    companies: list
    description: str
    related: list


class BookmarkRequest(BaseModel):
    """Request model for bookmarking."""
    question_number: int
    title: str
    difficulty: str


class HistoryRequest(BaseModel):
    """Request model for history tracking."""
    question_number: int
    title: str
    timestamp: Optional[str] = None


class ProblemsListResponse(BaseModel):
    """Response model for problems list."""
    success: bool
    problems: list = []
    total: int = 0


# API Endpoints

@app.get("/")
async def root():
    """
    Root endpoint for health check.
    """
    return {
        "status": "running",
        "api": "LeetCode AI Explainer",
        "version": "1.0.0"
    }


@app.get("/health")
async def health():
    """
    Health check endpoint.
    """
    return {
        "status": "healthy",
        "llm_configured": bool(LLM_API_KEY and LLM_MODEL_NAME)
    }


@app.post("/explain", response_model=ExplainResponse)
async def explain_problem(request: ExplainRequest) -> ExplainResponse:
    """
    Explain a LeetCode problem using AI.
    
    This endpoint:
    1. Takes a LeetCode problem number
    2. Generates a structured prompt
    3. Sends it to the configured LLM
    4. Returns the formatted explanation
    
    If the requested question number is greater than the maximum available problem,
    it automatically uses the last available problem instead.
    
    Args:
        request: ExplainRequest containing question_number and language
        
    Returns:
        ExplainResponse with the explanation or error message
        
    Raises:
        HTTPException: If LLM is not configured or API call fails
    """
    
    # Validate input
    if request.question_number < 1:
        raise HTTPException(
            status_code=400,
            detail="Question number must be positive"
        )
    
    # Check if question number exceeds maximum and adjust if needed
    max_problem_id = get_max_problem_id()
    actual_question_number = request.question_number
    requested_number = None
    message = None
    
    if request.question_number > max_problem_id:
        requested_number = request.question_number
        actual_question_number = max_problem_id
        message = f"Question #{request.question_number} is not available. Showing last available question #{max_problem_id} instead."
        logger.info(f"Question {request.question_number} exceeds max ({max_problem_id}). Using {actual_question_number}.")
    
    # Check if LLM is configured
    if not LLM_API_KEY or not LLM_MODEL_NAME:
        logger.error("LLM not configured - missing API key or model name")
        raise HTTPException(
            status_code=500,
            detail="LLM not configured. Please set LLM_API_KEY and LLM_MODEL_NAME in config.py"
        )
    
    try:
        logger.info(f"Processing explanation request for question {actual_question_number}")
        
        # Initialize LLM service
        llm_service = get_llm_service()
        
        # Generate the prompt
        prompt = generate_prompt(actual_question_number, request.language)
        logger.info(f"Generated prompt for question {actual_question_number}")
        
        # Call LLM API
        result = llm_service.explain_problem(prompt)
        
        if result["success"]:
            logger.info(f"Successfully explained question {actual_question_number}")
            return ExplainResponse(
                success=True,
                question_number=actual_question_number,
                requested_number=requested_number,
                explanation=result["explanation"],
                message=message
            )
        else:
            logger.error(f"LLM call failed: {result.get('error', 'Unknown error')}")
            raise HTTPException(
                status_code=500,
                detail=f"Failed to explain problem: {result.get('error', 'Unknown error')}"
            )
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Unexpected error in /explain endpoint: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )


@app.get("/problems/{question_number}/explain")
async def explain_problem_get(question_number: int, language: str = "English") -> ExplainResponse:
    """
    Alternative GET endpoint for explaining problems (for testing).
    """
    request = ExplainRequest(question_number=question_number, language=language)
    return await explain_problem(request)


# NEW: Problem Metadata & Features Endpoints

@app.get("/problems/metadata/{problem_id}")
async def get_problem_info(problem_id: int):
    """Get metadata for a specific problem."""
    metadata = get_problem_metadata(problem_id)
    if metadata:
        return {
            "success": True,
            "problem": metadata,
            "problem_id": problem_id
        }
    return {
        "success": False,
        "error": f"Problem {problem_id} not found",
        "problem_id": problem_id
    }


@app.get("/problems/list")
async def list_problems(
    difficulty: Optional[str] = None,
    category: Optional[str] = None,
    company: Optional[str] = None
):
    """List problems with optional filtering."""
    
    # Start with all problems
    if difficulty:
        filtered = get_problems_by_difficulty(difficulty)
    elif category:
        filtered = get_problems_by_category(category)
    elif company:
        from problems_db import get_problems_by_company
        filtered = get_problems_by_company(company)
    else:
        filtered = list(PROBLEMS.keys())
    
    # Build problem list with metadata
    problems_list = []
    for pid in filtered:
        meta = get_problem_metadata(pid)
        if meta:
            problems_list.append({
                "id": pid,
                "title": meta["title"],
                "difficulty": meta["difficulty"],
                "categories": meta["categories"],
                "acceptance_rate": meta["acceptance_rate"]
            })
    
    return {
        "success": True,
        "problems": problems_list,
        "total": len(problems_list),
        "filter": {
            "difficulty": difficulty,
            "category": category,
            "company": company
        }
    }


@app.get("/problems/related/{problem_id}")
async def get_related(problem_id: int):
    """Get related problems for a given problem."""
    related_ids = get_related_problems(problem_id)
    related_problems = []
    
    for rid in related_ids:
        meta = get_problem_metadata(rid)
        if meta:
            related_problems.append({
                "id": rid,
                "title": meta["title"],
                "difficulty": meta["difficulty"]
            })
    
    return {
        "success": True,
        "problem_id": problem_id,
        "related": related_problems,
        "count": len(related_problems)
    }


@app.get("/problems/search")
async def search(query: str):
    """Search problems by title or description."""
    results = search_problems(query)
    problems_list = []
    
    for pid in results:
        meta = get_problem_metadata(pid)
        if meta:
            problems_list.append({
                "id": pid,
                "title": meta["title"],
                "difficulty": meta["difficulty"]
            })
    
    return {
        "success": True,
        "query": query,
        "results": problems_list,
        "count": len(problems_list)
    }


@app.get("/problems/next/{problem_id}")
async def get_next_recommendation(problem_id: int):
    """Get next recommended problem."""
    meta = get_problem_metadata(problem_id)
    if not meta:
        return {
            "success": False,
            "error": f"Problem {problem_id} not found"
        }
    
    next_id = get_next_problem(problem_id)
    next_meta = get_problem_metadata(next_id) if next_id else None
    
    return {
        "success": True,
        "current_problem": problem_id,
        "current_difficulty": meta["difficulty"],
        "next_problem": {
            "id": next_id,
            "title": next_meta["title"],
            "difficulty": next_meta["difficulty"]
        } if next_meta else None
    }


@app.get("/stats")
async def get_stats():
    """Get statistics about all problems."""
    from problems_db import DIFFICULTY_ORDER
    
    stats = {
        "total_problems": len(PROBLEMS),
        "by_difficulty": {},
        "categories": set(),
        "companies": set()
    }
    
    for p in PROBLEMS.values():
        diff = p["difficulty"]
        stats["by_difficulty"][diff] = stats["by_difficulty"].get(diff, 0) + 1
        stats["categories"].update(p["categories"])
        stats["companies"].update(p["companies"])
    
    return {
        "success": True,
        "stats": {
            "total_problems": stats["total_problems"],
            "by_difficulty": stats["by_difficulty"],
            "total_categories": len(stats["categories"]),
            "total_companies": len(stats["companies"])
        }
    }


# Error handlers

@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    """Custom HTTP exception handler."""
    return {
        "success": False,
        "error": exc.detail,
        "status_code": exc.status_code
    }


if __name__ == "__main__":
    import uvicorn
    
    print("Starting LeetCode AI Explainer Backend...")
    print("Make sure you have configured LLM_API_KEY and LLM_MODEL_NAME in config.py")
    print()
    
    # Run the server
    uvicorn.run(
        app,
        host="0.0.0.0",
        port=8000,
        log_level="info"
    )
