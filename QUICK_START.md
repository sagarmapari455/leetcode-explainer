# 🚀 Quick Start Guide - Auto-Start Backend & Frontend

## Option 1: One-Click Batch Script (Easiest - Windows)

Simply double-click: **`START_ALL.bat`**

This will:
- ✅ Kill any existing processes
- ✅ Start Backend (Python) in Terminal 1
- ✅ Start Frontend (Node) in Terminal 2
- ✅ Display both server URLs

---

## Option 2: PowerShell Script

Run this command in PowerShell:
```powershell
.\START_ALL.ps1
```

Same as above but with PowerShell execution.

---

## Option 3: npm Run Both (After Install)

If you want to use npm concurrently:

**First time setup:**
```bash
cd frontend
npm install
```

Then run:
```bash
npm run dev:all
```

This runs both in the **same terminal** with color-coded output.

---

## Option 4: Manual (Traditional)

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

---

## 🎯 Available npm Scripts

Inside `frontend/` directory:

| Command | What it does |
|---------|-------------|
| `npm run dev` | Start frontend only (port 3000) |
| `npm run dev:all` | Start both backend & frontend (after concurrently install) |
| `npm run backend` | Start backend separately |
| `npm run frontend` | Start frontend separately |
| `npm run build` | Build for production |
| `npm run lint` | Check code quality |

---

## ✅ Access Your App

Once both servers are running:

- **Frontend**: http://localhost:3000
- **Backend Health**: http://localhost:8000/health

---

## 🐛 Troubleshooting

### Ports Already in Use?
```powershell
# Kill all Node processes
Get-Process -Name "node" | Stop-Process -Force

# Kill all Python processes
Get-Process -Name "python" | Stop-Process -Force
```

### concurrently Not Found?
```bash
cd frontend
npm install concurrently --save-dev
```

### Backend Won't Start?
1. Check Python is installed: `python --version`
2. Check NVIDIA API key in `backend/config.py`
3. Check port 8000 is free: `netstat -ano | findstr :8000`

---

## 💡 Pro Tips

- **Fastest method**: `START_ALL.bat` (one click!)
- **Best for development**: `npm run dev:all` (single terminal)
- **Most control**: Manual in 2 terminals (separate logs)

---

**Happy coding!** 🎉
