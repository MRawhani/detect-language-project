const fs = require('fs');
const path = require('path');

class NgramDetector {
  constructor() {
    this.languageProfiles = {};
    this.loadLanguageProfiles();
  }

  // Extract character trigrams from text
  extractTrigrams(text) {
    const trigrams = [];
    for (let i = 0; i <= text.length - 3; i++) {
      trigrams.push(text.substring(i, i + 3));
    }
    return trigrams;
  }

  // Build frequency profile from trigrams
  buildProfile(trigrams) {
    const frequencies = {};
    const total = trigrams.length;

    trigrams.forEach(trigram => {
      frequencies[trigram] = (frequencies[trigram] || 0) + 1;
    });

    // Normalize frequencies
    Object.keys(frequencies).forEach(key => {
      frequencies[key] = frequencies[key] / total;
    });

    return frequencies;
  }

  // Calculate cosine similarity between two profiles
  cosineSimilarity(profile1, profile2) {
    const commonTrigrams = Object.keys(profile1).filter(key => profile2[key]);
    
    let dotProduct = 0;
    commonTrigrams.forEach(trigram => {
      dotProduct += profile1[trigram] * profile2[trigram];
    });

    const magnitude1 = Math.sqrt(Object.values(profile1).reduce((sum, val) => sum + val * val, 0));
    const magnitude2 = Math.sqrt(Object.values(profile2).reduce((sum, val) => sum + val * val, 0));

    return dotProduct / (magnitude1 * magnitude2);
  }

  // Load pre-built language profiles
  loadLanguageProfiles() {
    const languages = ['english', 'arabic', 'german', 'spanish', 'french', 'italian', 'portuguese', 'russian'];
    
    languages.forEach(lang => {
      const profilePath = path.join(__dirname, '../../language_profiles', `${lang}.json`);
      try {
        if (fs.existsSync(profilePath)) {
          this.languageProfiles[lang] = JSON.parse(fs.readFileSync(profilePath, 'utf8'));
        }
      } catch (error) {
        console.error(`Error loading profile for ${lang}:`, error);
      }
    });
  }

  // Detect language using n-gram method
  detectLanguage(text) {
    if (!text || text.length < 10) {
      return { language: 'unknown', confidence: 0, method: 'ngram' };
    }

    const trigrams = this.extractTrigrams(text.toLowerCase());
    const inputProfile = this.buildProfile(trigrams);

    let bestMatch = { language: 'unknown', confidence: 0 };
    const similarities = [];

    Object.keys(this.languageProfiles).forEach(language => {
      const similarity = this.cosineSimilarity(inputProfile, this.languageProfiles[language]);
      similarities.push({ language, similarity });
    });

    if (similarities.length > 0) {
      similarities.sort((a, b) => b.similarity - a.similarity);
      bestMatch = {
        language: similarities[0].language,
        confidence: Math.round(similarities[0].similarity * 100),
        method: 'ngram'
      };
    }

    return bestMatch;
  }
}

module.exports = new NgramDetector(); 