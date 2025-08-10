const express = require('express');
const multer = require('multer');
const router = express.Router();

const ngramDetector = require('../services/ngramDetector');
const fileParser = require('../services/fileParser');
const fastapiClient = require('../services/fastapiClient');

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() });

// Helper function to count words
const countWords = (text) => {
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// Main detection endpoint
router.post('/detect-language', upload.single('file'), async (req, res) => {
  try {
    const { text, method } = req.body;
    let processedText = text;

    // Handle file upload
    if (req.file) {
      processedText = await fileParser.parseFile(req.file);
    }

    if (!processedText) {
      return res.status(400).json({ error: 'No text provided' });
    }

    // Validate minimum word count
    const wordCount = countWords(processedText);
    if (wordCount < 10) {
      return res.status(400).json({ 
        error: `Text too short. Found ${wordCount} words, minimum 10 words required for accurate language detection.` 
      });
    }

    let result;

    if (method === 'ngram') {
      result = await ngramDetector.detectLanguage(processedText);
    } else if (method === 'ml') {
      result = await fastapiClient.detectLanguage(processedText);
    } else {
      return res.status(400).json({ error: 'Invalid method' });
    }

    // Add word count to response for reference
    result.wordCount = wordCount;
    res.json(result);
  } catch (error) {
    console.error('Detection error:', error);
    res.status(500).json({ error: 'Language detection failed' });
  }
});

module.exports = router; 