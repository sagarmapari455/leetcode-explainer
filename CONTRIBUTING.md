# Contributing to LeetCode AI Explainer

First off, thanks for taking the time to contribute! ❤️

This document provides guidelines and instructions for contributing to the LeetCode AI Explainer project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Coding Standards](#coding-standards)
- [Testing](#testing)

---

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inspiring community for all. Please be respectful and constructive in all interactions.

### Expected Behavior

- Use welcoming and inclusive language
- Be respectful of differing opinions, viewpoints, and experiences
- Gracefully accept constructive criticism
- Focus on what is best for the community

### Reporting Issues

Instances of abusive, harassing, or otherwise unacceptable behavior may be reported by contacting the project team at sagarmapari30@gmail.com.

---

## How Can I Contribute?

### 🐛 Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one.

**When creating a bug report, include as many details as possible:**

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples to demonstrate those steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots if possible**
- **Include your environment details:**
  - OS and version
  - Python version
  - Node.js version
  - Browser version (if frontend issue)

### ✨ Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and the expected enhanced behavior**
- **Explain why this enhancement would be useful**

### 📝 Pull Requests

- Provide a clear description of the changes
- Reference related issues
- Include screenshots for UI changes
- Follow all coding standards and conventions
- Include appropriate tests

---

## Development Setup

### 1. Fork and Clone

```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/your-username/leetcode-ai-explainer.git
cd leetcode-ai-explainer

# Add upstream remote
git remote add upstream https://github.com/sagarmapari455/leetcode-ai-explainer.git
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Copy environment template
cp .env.example .env
# Edit .env with your API key
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create local environment
cp .env.example .env.local
```

### 4. Running Locally

**Terminal 1 - Backend:**
```bash
cd backend
python main.py
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

**Access the app:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/docs

---

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that don't affect code meaning (formatting, etc.)
- **refactor**: Code change that neither fixes a bug nor adds a feature
- **perf**: Code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to build process, dependencies, etc.

### Examples

Good ✅
```
feat(language): Add Tamil language support

- Added Tamil (தமிழ்) language option to language selector
- Updated prompt template to support Tamil
- Added Tamil strings to language mapping

Closes #123
```

Bad ❌
```
fix bugs
updated the code
stuff
```

---

## Pull Request Process

1. **Update from upstream:**
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. **Create feature branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make changes:**
   - Write clean, well-documented code
   - Add tests for new functionality
   - Update documentation if needed

4. **Test your changes:**
   ```bash
   # Backend
   cd backend
   python main.py
   
   # Frontend (in another terminal)
   cd frontend
   npm run dev
   ```

5. **Commit your changes:**
   ```bash
   git add .
   git commit -m "feat: your feature description"
   ```

6. **Push to your fork:**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **Create Pull Request:**
   - Go to GitHub and click "New Pull Request"
   - Write a clear description of your changes
   - Link related issues (use `Closes #123`)
   - Wait for code review

8. **Respond to feedback:**
   - Address review comments
   - Push additional commits if needed (no force push!)
   - Re-request review when ready

---

## Coding Standards

### Python

- Follow [PEP 8](https://www.python.org/dev/peps/pep-0008/) style guide
- Use meaningful variable and function names
- Add docstrings to functions and classes
- Maximum line length: 100 characters
- Use type hints where applicable

**Example:**
```python
def calculate_complexity(algorithm: str) -> Dict[str, str]:
    """
    Calculate time and space complexity for an algorithm.
    
    Args:
        algorithm: Name of the algorithm
        
    Returns:
        Dictionary with 'time' and 'space' complexity
    """
    # Implementation
    pass
```

### TypeScript/React

- Follow [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- Use meaningful component and variable names
- Add JSDoc comments for complex logic
- Use functional components with hooks
- Keep components focused and reusable

**Example:**
```typescript
/**
 * Displays problem explanation
 * @param explanation - The explanation text
 * @param language - Language of the explanation
 */
export default function ExplanationView({ 
  explanation, 
  language 
}: ExplanationViewProps) {
  // Implementation
}
```

### CSS

- Use Tailwind CSS classes for styling
- Follow BEM naming for custom CSS
- Maintain consistent spacing and colors
- Keep classes organized and commented

---

## Testing

### Backend Testing

```bash
cd backend

# Create test file
# example: tests/test_api.py

# Run tests
pytest

# Run with coverage
pytest --cov
```

### Frontend Testing

```bash
cd frontend

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### Manual Testing

Before submitting a PR:
- ✅ Test in Chrome/Firefox/Safari
- ✅ Test on mobile (dev tools)
- ✅ Test with different API keys
- ✅ Test with different languages
- ✅ Test history and bookmarks
- ✅ Test error scenarios

---

## Additional Notes

### Project Structure

Always respect the existing project structure:
- Backend: `backend/` folder with Python modules
- Frontend: `frontend/` folder with Next.js structure
- Docs: Documentation files in root

### Environment Variables

Never commit actual API keys or sensitive data:
- Use `.env.example` for templates
- Add new vars to both `.env.example` and `.env`
- Always add secrets to `.gitignore`

### Dependencies

- Before adding new dependencies, discuss in an issue first
- Keep dependencies minimal and well-maintained
- Update `requirements.txt` (Python) or `package.json` (Node)

---

## Questions?

Feel free to open an issue or contact:

📧 Email: sagarmapari30@gmail.com  
🔗 LinkedIn: https://www.linkedin.com/in/sagar-mapari-00b00a321  
💻 GitHub: https://github.com/sagarmapari455

---

**Thank you for contributing! Your efforts help make this project better for everyone! 🚀**
