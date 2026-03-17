# Project File Structure - Complete Reference

```
LEETCODE/
│
├── 📄 README.md                      # Main documentation
├── 📄 QUICKSTART.md                  # Quick setup guide (Windows)
├── 📄 CONFIGURATION.md               # Environment setup guide
├── 📄 API_REFERENCE.md               # API documentation
├── 📄 DEPLOYMENT.md                  # Production deployment guide
├── 📄 .gitignore                     # Git ignore rules
├── 📄 setup.bin                      # Setup script (Windows batch)
├── 📄 setup.sh                       # Setup script (Linux/Mac)
│
├── 📁 backend/                       # FastAPI Backend
│   ├── 📄 main.py                    # FastAPI app & endpoints
│   ├── 📄 config.py                  # Configuration (edit this!)
│   ├── 📄 llm_service.py             # LLM integration
│   ├── 📄 prompt_template.py         # Prompt generation
│   ├── 📄 requirements.txt           # Python dependencies
│   └── 💾 (venv/)                    # Virtual environment
│
└── 📁 frontend/                      # Next.js Frontend
    ├── 📁 pages/                     # Next.js pages
    │   ├── 📄 _app.tsx               # App wrapper
    │   ├── 📄 _document.tsx          # Document setup
    │   └── 📄 index.tsx              # Homepage
    │
    ├── 📁 components/                # React components
    │   ├── 📄 ProblemForm.tsx        # Input form
    │   └── 📄 ResultView.tsx         # Results display
    │
    ├── 📁 utils/                     # Utility functions
    │   └── 📄 api.ts                 # API client
    │
    ├── 📁 styles/                    # CSS files
    │   └── 📄 globals.css            # Global styles
    │
    ├── 📄 package.json               # Node dependencies
    ├── 📄 tsconfig.json              # TypeScript config
    ├── 📄 next.config.js             # Next.js config
    ├── 📄 tailwind.config.js         # Tailwind config
    ├── 📄 postcss.config.js          # PostCSS config
    ├── 📄 .env.local                 # Environment variables
    ├── 📄 .env.example               # Environment template
    └── 💾 (node_modules/)            # Node dependencies
```

## File Descriptions

### Root Level Files

| File | Purpose |
|------|---------|
| `README.md` | Complete documentation with setup instructions |
| `QUICKSTART.md` | Quick setup guide specifically for Windows PowerShell |
| `CONFIGURATION.md` | Environment configuration details |
| `API_REFERENCE.md` | API endpoints and usage documentation |
| `DEPLOYMENT.md` | Production deployment guide |
| `setup.bat` | Automated setup script (Windows) |
| `setup.sh` | Automated setup script (Linux/Mac) |
| `.gitignore` | Git ignore rules for version control |

### Backend Directory (`backend/`)

| File | Purpose | Key Functions |
|------|---------|---|
| `main.py` | FastAPI application | `@app.post("/explain")`, `@app.get("/health")` |
| `config.py` | Configuration | `LLM_API_KEY`, `LLM_MODEL_NAME` |
| `llm_service.py` | LLM integration | `LLMService`, `explain_problem()` |
| `prompt_template.py` | Prompt generation | `generate_prompt()` |
| `requirements.txt` | Python packages | FastAPI, requests, pydantic |

### Frontend Directory (`frontend/`)

#### Pages (`pages/`)

| File | Purpose | Key Exports |
|------|---------|---|
| `_app.tsx` | App wrapper | Wraps all pages with global styles |
| `_document.tsx` | HTML document | Main HTML structure |
| `index.tsx` | Homepage | Main UI, form submission, results |

#### Components (`components/`)

| File | Purpose | Props |
|------|---------|---|
| `ProblemForm.tsx` | Input form | `onSubmit`, `isLoading` |
| `ResultView.tsx` | Results display | `questionNumber`, `explanation`, `isLoading` |

#### Utils (`utils/`)

| File | Purpose | Functions |
|------|---------|---|
| `api.ts` | API client | `explainProblem()`, `checkBackendHealth()` |

#### Styles (`styles/`)

| File | Purpose |
|------|---------|
| `globals.css` | Global styles, Tailwind imports |

#### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project metadata, dependencies |
| `tsconfig.json` | TypeScript configuration |
| `next.config.js` | Next.js settings |
| `tailwind.config.js` | Tailwind CSS customization |
| `postcss.config.js` | PostCSS plugins |
| `.env.local` | Environment variables (not in git) |
| `.env.example` | Template for environment variables |

---

## Quick Navigation

### To Start the App:
1. Edit: `backend/config.py` (add LLM credentials)
2. Run: `backend/main.py`
3. Run: `cd frontend && npm run dev`
4. Open: `http://localhost:3000`

### To Deploy:
1. See: `DEPLOYMENT.md`
2. Update: `backend/config.py` with production credentials
3. Update: `frontend/.env.local` with production URL
4. Deploy backend to: Railway, Render, or Azure
5. Deploy frontend to: Vercel, Netlify, or similar

### To Customize:
1. Change colors in: `tailwind.config.js`
2. Add components in: `frontend/components/`
3. Modify prompt in: `backend/prompt_template.py`
4. Add endpoints in: `backend/main.py`

---

## File Sizes (Approximate)

| File | Size |
|------|------|
| `backend/main.py` | 4KB |
| `backend/llm_service.py` | 6KB |
| `backend/prompt_template.py` | 3KB |
| `frontend/pages/index.tsx` | 8KB |
| `frontend/components/ProblemForm.tsx` | 4KB |
| `frontend/components/ResultView.tsx` | 6KB |

Total code (excluding dependencies): ~35KB

---

## Editing Checklist

### To Add a New Feature:

**Backend:**
- [ ] Edit `backend/prompt_template.py` (update prompt)
- [ ] Update `backend/main.py` (if changing response)
- [ ] Test with `curl` or Postman

**Frontend:**
- [ ] Edit `frontend/pages/index.tsx` (add UI)
- [ ] Create new component if needed
- [ ] Test in browser

**Both:**
- [ ] Update `API_REFERENCE.md`
- [ ] Test end-to-end
- [ ] Commit to git

---

For detailed instructions, see README.md and QUICKSTART.md
