@echo off
echo ========================================
echo   MedVoiceAI - Starting Backend Server
echo ========================================

:: Install/update dependencies first
echo [1/2] Checking dependencies...
pip install -r requirements.txt --quiet

:: Start the FastAPI backend
echo [2/2] Starting FastAPI server on http://localhost:8000
echo  Press CTRL+C to stop.
echo.
python -m uvicorn main:app --reload --port 8000

pause
