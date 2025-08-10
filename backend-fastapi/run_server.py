#!/usr/bin/env python3

import sys
import os
sys.path.append('.')

from app.main import app
import uvicorn

if __name__ == "__main__":
    print("Starting FastAPI server...")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port) 