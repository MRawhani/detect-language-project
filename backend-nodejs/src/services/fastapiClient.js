const axios = require('axios');

class FastAPIClient {
  constructor() {
    this.baseURL = process.env.FASTAPI_URL || 'http://localhost:8000';
  }

  async detectLanguage(text) {
    try {
      const response = await axios.post(`${this.baseURL}/detect`, {
        text: text
      }, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return {
        language: response.data.language,
        confidence: response.data.confidence,
        method: 'ml'
      };
    } catch (error) {
      console.error('FastAPI error:', error.message);
      throw new Error('ML service unavailable. Please try the N-gram method.');
    }
  }

  async trainModel() {
    try {
      const response = await axios.post(`${this.baseURL}/train`, {}, {
        timeout: 30000
      });
      return response.data;
    } catch (error) {
      console.error('Training error:', error.message);
      throw new Error('Failed to train ML model');
    }
  }
}

module.exports = new FastAPIClient(); 