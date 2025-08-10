#!/usr/bin/env python3

import sys
import os
sys.path.append('.')

from app.ml_model import LanguageDetector

if __name__ == "__main__":
    print("Starting ML model training...")
    detector = LanguageDetector()
    print("Training completed!") 