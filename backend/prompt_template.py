"""
Prompt template generator for LeetCode problem explanations.
This module creates structured prompts that ensure the LLM:
- Explains the problem in simple language
- Never provides code
- Gives algorithms, hints, and time complexity
- Supports Indian regional languages
"""

# Language mappings for better prompt generation
LANGUAGE_NAMES = {
    "Hindi": "हिंदी (Hindi)",
    "English": "English",
    "Marathi": "मराठी (Marathi)",
    "Bengali": "বাংলা (Bengali)",
    "Telugu": "తెలుగు (Telugu)",
    "Tamil": "தமிழ் (Tamil)",
    "Kannada": "ಕನ್ನಡ (Kannada)",
    "Gujarati": "ગુજરાતી (Gujarati)",
    "Punjabi": "ਪੰਜਾਬੀ (Punjabi)",
    "Urdu": "اردو (Urdu)"
}

LANGUAGE_INSTRUCTIONS = {
    "Hindi": "Please respond in Hindi (हिंदी) language.",
    "English": "Please respond in English language.",
    "Marathi": "Please respond in Marathi (मराठी) language.",
    "Bengali": "Please respond in Bengali (বাংলা) language.",
    "Telugu": "Please respond in Telugu (తెలుగు) language.",
    "Tamil": "Please respond in Tamil (தமிழ்) language.",
    "Kannada": "Please respond in Kannada (ಕನ್ನಡ) language.",
    "Gujarati": "Please respond in Gujarati (ગુજરાતી) language.",
    "Punjabi": "Please respond in Punjabi (ਪੰਜਾਬੀ) language.",
    "Urdu": "Please respond in Urdu (اردو) language."
}


def generate_prompt(question_number: int, language: str = "English") -> str:
    """
    Generate a structured prompt for explaining a LeetCode problem.
    
    Args:
        question_number: The LeetCode problem number (e.g., 1, 2, 3)
        language: The language for explanation (default: "English")
                 Supported: Hindi, English, Marathi, Bengali, Telugu, Tamil, Kannada, Gujarati, Punjabi, Urdu
    
    Returns:
        A formatted prompt string to send to the LLM
    """
    
    # Get language instruction with fallback
    lang_name = LANGUAGE_NAMES.get(language, language)
    lang_instruction = LANGUAGE_INSTRUCTIONS.get(language, f"Please respond in {language} language.")
    
    prompt = f"""You are an expert programming tutor explaining LeetCode problems. {lang_instruction}

Explain LeetCode problem #{question_number}.

CRITICAL RULES:
1. NEVER provide any code or code snippets
2. Keep language simple and easy to understand
3. Use the exact format with headers provided below

Format your response EXACTLY as follows:

---

## PROBLEM STATEMENT
(Write the complete problem description in simple words. 2-3 sentences max.)

## TEST CASES
(Show 2-3 simple examples with Input → Output format)
Example 1: Input: [1,2,3] → Output: 6
Example 2: Input: [5] → Output: 5

## WHAT'S HAPPENING
(Explain in super simple language what you need to do. 1-2 sentences.)

## REAL-WORLD ANALOGY  
(One sentence comparing to real life)

## APPROACH
(List 2-3 different ways to solve, just names and brief idea. NO CODE.)
- Approach 1: [Name] - Brief explanation
- Approach 2: [Name] - Brief explanation

## BEST SOLUTION
Algorithm: [Name]
Why: [One sentence explaining why]

## TIME & SPACE COMPLEXITY
Time: O(?) - Why this matters: [1-2 sentences about real impact]
Space: O(?)

## KEY INSIGHTS
(3-4 bullet points of important concepts)
• Point 1
• Point 2
• Point 3

## COMMON MISTAKES
❌ Mistake 1: [What] - How to avoid: [What to do instead]
❌ Mistake 2: [What] - How to avoid: [What to do instead]

## NEXT STEPS
(1-2 sentences on what to practice)

---

Important reminders:
- Use SIMPLE, easy words (explain like to a 10-year-old)
- NO CODE EXAMPLES OR SNIPPETS
- Keep explanations SHORT and CLEAR
- Use bullet points where needed
- Respond in {lang_name}"""

    return prompt


def generate_prompt_with_context(question_number: int, language: str = "English", problem_title: str = None) -> str:
    """
    Generate an extended prompt with optional problem context.
    
    Args:
        question_number: The LeetCode problem number
        language: The language for explanation
        problem_title: Optional title of the problem for context
    
    Returns:
        An extended formatted prompt string
    """
    
    context = ""
    if problem_title:
        context = f"(Problem: {problem_title})\n"
    
    base_prompt = generate_prompt(question_number, language)
    return f"{context}{base_prompt}"

