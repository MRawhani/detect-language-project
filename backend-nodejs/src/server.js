const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', require('./routes/languageDetection'));

app.listen(PORT, () => {
  console.log(`Node.js server running on port ${PORT}`);
}); 