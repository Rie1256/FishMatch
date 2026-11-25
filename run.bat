@echo off
cd /d "%~dp0"
echo Starting FishMatch... open http://localhost:8000 in your browser
python app.py
if errorlevel 1 py app.py
pause
