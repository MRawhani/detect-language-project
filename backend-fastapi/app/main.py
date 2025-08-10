from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import uvicorn
import re
import os

from .ml_model import LanguageDetector

app = FastAPI(title="Language Detection ML Service")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize language detector
detector = LanguageDetector()

class TextRequest(BaseModel):
    text: str

def count_words(text: str) -> int:
    """Count words in text"""
    return len(re.findall(r'\b\w+\b', text.strip()))

@app.post("/detect")
async def detect_language(request: TextRequest):
    try:
        if not request.text or len(request.text.strip()) < 10:
            raise HTTPException(status_code=400, detail="Text too short")
        
        # Validate minimum word count
        word_count = count_words(request.text)
        if word_count < 10:
            raise HTTPException(
                status_code=400, 
                detail=f"Text too short. Found {word_count} words, minimum 10 words required for accurate language detection."
            )
        
        prediction = detector.predict(request.text)
        confidence = detector.predict_proba(request.text).max()
        
        return {
            "language": prediction,
            "confidence": round(confidence * 100, 2),
            "method": "ml",
            "wordCount": word_count
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/train")
async def train_model():
    try:
        detector.train_model()
        return {"message": "Model trained successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000) 