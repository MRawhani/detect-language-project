@echo off
echo Starting Language Detection System...

echo.
echo 1. Starting FastAPI ML Service...
start "FastAPI ML Service" cmd /k "cd backend-fastapi && python -m uvicorn app.main:app --host 0.0.0.0 --port 8000"

echo.
echo 2. Starting Node.js Middleware...
start "Node.js Middleware" cmd /k "cd backend-nodejs && npm install && npm start"

echo.
echo 3. Starting React Frontend...
start "React Frontend" cmd /k "cd frontend && npm install && npm start"

echo.
echo All services are starting...
echo FastAPI: http://localhost:8000
echo Node.js: http://localhost:3001
echo React: http://localhost:3000
echo.
pause 