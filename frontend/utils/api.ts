/**
 * API utility functions for communicating with the backend
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

interface ExplainRequest {
  question_number: number;
  language: string;
}

interface ExplainResponse {
  success: boolean;
  question_number: number;
  explanation?: string;
  error?: string;
}

/**
 * Fetch explanation for a LeetCode problem
 * @param questionNumber - The LeetCode problem number
 * @param language - The language for explanation
 * @returns Promise containing the explanation
 */
export async function explainProblem(
  questionNumber: number,
  language: string = 'English',
  timeoutMs: number = 120000 // 2 minutes default timeout
): Promise<ExplainResponse> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(`${API_BASE_URL}/explain`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question_number: questionNumber,
          language: language,
        } as ExplainRequest),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let errorMessage = 'Failed to explain problem';
        try {
          const errorData = await response.json();
          errorMessage = errorData.detail || errorData.error || 'Server error';
        } catch {
          errorMessage = `Server error (HTTP ${response.status})`;
        }
        throw new Error(errorMessage);
      }

      const data: ExplainResponse = await response.json();
      return data;
    } finally {
      clearTimeout(timeoutId);
    }
  } catch (error) {
    console.error('API Error:', error);
    let errorMessage = 'Failed to fetch explanation from backend';
    
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        errorMessage = 'Request timeout - LLM took too long to respond. Try again or use a different problem.';
      } else if (error.message.includes('fetch') || error.message.includes('Failed to fetch')) {
        errorMessage = `Backend connection failed. Ensure:\\n✓ Backend running: python main.py\\n✓ Port 8000 is accessible\\n✓ Check firewall settings`;
      } else {
        errorMessage = error.message;
      }
    }
    
    return {
      success: false,
      question_number: questionNumber,
      error: errorMessage,
    };
  }
}

/**
 * Check if the backend is healthy
 * @returns Promise with health status
 */
export async function checkBackendHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch (error) {
    console.error('Backend health check failed:', error);
    return false;
  }
}
