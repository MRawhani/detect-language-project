# Language Detection System

A language detection application that can identify languages from text input or file uploads using advanced algorithms.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python (v3.8 or higher)
- npm or yarn

### Installation & Setup

1. **Download the project**
   ```bash
   git clone <your-repo-url>
   cd detect-language-project
   ```

2. **Install dependencies**
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install
   
   # Install Python backend dependencies
   cd ../backend-fastapi
   pip install -r requirements.txt
   
   # Install Node.js backend dependencies
   cd ../backend-nodejs
   npm install
   ```

3. **Run the application**
   ```bash
   # Go back to frontend directory
   cd ../frontend
   
   # Start all services with one command
   npm run dev
   ```

4. **Open your browser**
   - Navigate to: `http://localhost:3005`
   - The application will automatically start all required services

### Alternative: Manual Start

If you prefer to start services individually:

```bash
# Terminal 1 - Start React frontend
cd frontend
npm start

# Terminal 2 - Start Python backend
cd backend-fastapi
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000

# Terminal 3 - Start Node.js backend
cd backend-nodejs
npm start
```

## 📁 What You'll Get

- **Frontend**: Beautiful web interface at `http://localhost:3005`
- **Python Backend**: ML service running on port 8000
- **Node.js Backend**: Processing service running on port 3006

## 🎯 Features

- Detect languages from text input
- Upload and analyze files (PDF, DOCX, TXT)
- Support for 8 major languages
- Real-time results with confidence scores

## 🆘 Troubleshooting

- **Port already in use**: Make sure ports 3005, 3006, and 8000 are available
- **Dependencies not found**: Run `npm install` and `pip install -r requirements.txt` again
- **Service won't start**: Check that Node.js and Python are properly installed

## 📞 Need Help?

If you encounter any issues, please check:
1. All prerequisites are installed
2. Dependencies are properly installed
3. Ports are not blocked by other applications

---

**Enjoy using the Language Detection System! 🎉** 