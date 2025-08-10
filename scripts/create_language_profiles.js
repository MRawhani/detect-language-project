const fs = require('fs');
const path = require('path');

class LanguageProfileGenerator {
  constructor() {
    this.languages = ['english', 'arabic', 'german', 'spanish', 'french', 'italian', 'portuguese', 'russian'];
  }

  extractTrigrams(text) {
    const trigrams = [];
    for (let i = 0; i <= text.length - 3; i++) {
      trigrams.push(text.substring(i, i + 3));
    }
    return trigrams;
  }

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

  generateProfiles() {
    console.log('Generating language profiles...');

    this.languages.forEach(language => {
      const dataFile = path.join(__dirname, '../datasets', language, 'training_data.txt');
      const outputFile = path.join(__dirname, '../backend-nodejs/language_profiles', `${language}.json`);

      if (fs.existsSync(dataFile)) {
        try {
          const content = fs.readFileSync(dataFile, 'utf-8');
          const sentences = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
          
          let allTrigrams = [];
          sentences.forEach(sentence => {
            if (sentence.length > 10) {
              allTrigrams = allTrigrams.concat(this.extractTrigrams(sentence.toLowerCase()));
            }
          });

          const profile = this.buildProfile(allTrigrams);
          
          // Ensure output directory exists
          const outputDir = path.dirname(outputFile);
          if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
          }

          fs.writeFileSync(outputFile, JSON.stringify(profile, null, 2));
          console.log(`✓ Generated profile for ${language}`);
        } catch (error) {
          console.error(`✗ Error generating profile for ${language}:`, error.message);
        }
      } else {
        console.log(`⚠ No training data found for ${language}`);
      }
    });

    console.log('Language profile generation complete!');
  }
}

// Run the generator
const generator = new LanguageProfileGenerator();
generator.generateProfiles(); 