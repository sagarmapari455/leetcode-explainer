"""
LeetCode problems database with metadata.
Contains problem information: difficulty, category, companies, related problems.
"""

PROBLEMS = {
    1: {
        "title": "Two Sum",
        "difficulty": "Easy",
        "acceptance_rate": 48.5,
        "categories": ["Array", "Hash Table"],
        "companies": ["Amazon", "Google", "Microsoft", "Apple"],
        "description": "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.",
        "related": [167, 15, 16, 18],  # Two Sum II, 3Sum, 3Sum Closest, 4Sum
    },
    2: {
        "title": "Add Two Numbers",
        "difficulty": "Medium",
        "acceptance_rate": 34.8,
        "categories": ["Linked List", "Math", "Recursion"],
        "companies": ["Amazon", "Apple", "Google"],
        "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each node contains a single digit. Add the two numbers and return the sum as a linked list.",
        "related": [445, 67, 989],  # Add Two Numbers II, Add Binary, Add to Array Form
    },
    3: {
        "title": "Longest Substring Without Repeating Characters",
        "difficulty": "Medium",
        "acceptance_rate": 34.5,
        "categories": ["Hash Table", "Sliding Window", "String"],
        "companies": ["Amazon", "Microsoft", "Google", "Facebook"],
        "description": "Given a string s, find the length of the longest substring without repeating characters.",
        "related": [159, 340, 467],  # Longest Substring with At Most Two Distinct Characters
    },
    4: {
        "title": "Median of Two Sorted Arrays",
        "difficulty": "Hard",
        "acceptance_rate": 27.3,
        "categories": ["Array", "Binary Search", "Divide and Conquer"],
        "companies": ["Amazon", "Google", "Facebook"],
        "description": "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.",
        "related": [480, 287],  # Sliding Window Median
    },
    5: {
        "title": "Longest Palindromic Substring",
        "difficulty": "Medium",
        "acceptance_rate": 32.4,
        "categories": ["String", "Dynamic Programming"],
        "companies": ["Amazon", "Microsoft", "Google"],
        "description": "Given a string s, return the longest palindromic substring in s.",
        "related": [131, 516],  # Palindrome Partitioning, Longest Palindromic Subsequence
    },
}

# Difficulty progression
DIFFICULTY_ORDER = {"Easy": 1, "Medium": 2, "Hard": 3}

# All available categories
CATEGORIES = {
    "Array", "String", "Hash Table", "Linked List", "Stack", "Queue",
    "Tree", "Graph", "Sorting", "Searching", "Dynamic Programming",
    "Greedy", "Math", "Bit Manipulation", "Design", "BFS", "DFS",
    "Recursion", "Backtracking", "Sliding Window", "Two Pointers"
}

# All available companies
COMPANIES = {
    "Amazon", "Google", "Microsoft", "Apple", "Facebook", "Meta",
    "Netflix", "Tesla", "Adobe", "Oracle", "Uber", "Twitter", "LinkedIn"
}


def get_problem_metadata(problem_id: int) -> dict:
    """Get metadata for a specific problem."""
    if problem_id in PROBLEMS:
        return PROBLEMS[problem_id]
    return None


def get_related_problems(problem_id: int) -> list:
    """Get related problems for a given problem."""
    if problem_id in PROBLEMS:
        return PROBLEMS[problem_id].get("related", [])
    return []


def get_problems_by_difficulty(difficulty: str) -> list:
    """Get all problems of a specific difficulty."""
    return [pid for pid, p in PROBLEMS.items() if p["difficulty"] == difficulty]


def get_problems_by_category(category: str) -> list:
    """Get all problems in a specific category."""
    return [pid for pid, p in PROBLEMS.items() if category in p["categories"]]


def get_problems_by_company(company: str) -> list:
    """Get all problems for a specific company."""
    return [pid for pid, p in PROBLEMS.items() if company in p["companies"]]


def get_max_problem_id() -> int:
    """Get the maximum available problem ID."""
    if PROBLEMS:
        return max(PROBLEMS.keys())
    return 0


def get_available_problem_count() -> int:
    """Get the total number of available problems."""
    return len(PROBLEMS)


def search_problems(query: str) -> list:
    """Search problems by title or description."""
    query = query.lower()
    results = []
    for pid, p in PROBLEMS.items():
        if query in p["title"].lower() or query in p["description"].lower():
            results.append(pid)
    return results


def get_next_problem(current_problem_id: int, difficulty: str = None) -> int:
    """Get the next recommended problem."""
    if difficulty:
        problems = get_problems_by_difficulty(difficulty)
    else:
        # Get next problem of same or slightly higher difficulty
        current_difficulty = PROBLEMS[current_problem_id]["difficulty"]
        if current_difficulty == "Easy":
            next_difficulty = "Medium"
        elif current_difficulty == "Medium":
            next_difficulty = "Hard"
        else:
            next_difficulty = "Hard"
        problems = get_problems_by_difficulty(next_difficulty)
    
    # Return first available problem that's not current
    for p in problems:
        if p != current_problem_id:
            return p
    return None
