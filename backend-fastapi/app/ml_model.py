import os
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import pandas as pd

class LanguageDetector:
    def __init__(self):
        self.languages = ['english', 'arabic', 'german', 'spanish', 'french', 'italian', 'portuguese', 'russian']
        self.pipeline = Pipeline([
            ('tfidf', TfidfVectorizer(
                ngram_range=(1, 3),
                max_features=5000,
                stop_words=None,
                lowercase=True
            )),
            ('classifier', MultinomialNB())
        ])
        self.model_path = 'language_model.joblib'
        self.load_or_train_model()
    
    def load_or_train_model(self):
        """Load existing model or train new one"""
        if os.path.exists(self.model_path):
            try:
                self.pipeline = joblib.load(self.model_path)
                print("Loaded existing model")
            except:
                print("Failed to load model, training new one...")
                self.train_model()
        else:
            print("No existing model found, training new one...")
            self.train_model()
    
    def load_training_data(self):
        """Load training data from datasets directory"""
        texts = []
        labels = []
        
        # Fix the path to point to the correct datasets directory
        datasets_dir = '../datasets'
        
        for language in self.languages:
            data_file = os.path.join(datasets_dir, language, 'training_data.txt')
            if os.path.exists(data_file):
                try:
                    with open(data_file, 'r', encoding='utf-8') as f:
                        content = f.read()
                        # Split into sentences or paragraphs
                        sentences = [s.strip() for s in content.split('\n') if s.strip() and not s.startswith('#')]
                        
                        for sentence in sentences:
                            if len(sentence) > 10:  # Only use meaningful text
                                texts.append(sentence)
                                labels.append(language)
                except Exception as e:
                    print(f"Error loading {language} data: {e}")
        
        return texts, labels
    
    def train_model(self):
        """Train the language detection model"""
        print("Loading training data...")
        texts, labels = self.load_training_data()
        
        if not texts:
            print("No training data found. Please add text files to datasets directory.")
            return
        
        print(f"Training with {len(texts)} samples...")
        
        # Train the pipeline
        self.pipeline.fit(texts, labels)
        
        # Save the model
        joblib.dump(self.pipeline, self.model_path)
        print(f"Model trained and saved to {self.model_path}")
        
        # Print some statistics
        unique_labels, counts = pd.Series(labels).value_counts().items()
        print("Training data distribution:")
        for label, count in zip(unique_labels, counts):
            print(f"  {label}: {count} samples")
    
    def predict(self, text):
        """Predict language for given text"""
        return self.pipeline.predict([text])[0]
    
    def predict_proba(self, text):
        """Get probability scores for all languages"""
        return self.pipeline.predict_proba([text])[0]
    
    def get_language_probabilities(self, text):
        """Get language probabilities as dictionary"""
        probas = self.predict_proba(text)
        return dict(zip(self.languages, probas)) 