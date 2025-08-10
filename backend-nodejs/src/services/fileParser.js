const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');

class FileParser {
  async parsePDF(buffer) {
    try {
      const data = await pdfParse(buffer);
      return data.text;
    } catch (error) {
      throw new Error('Failed to parse PDF file');
    }
  }

  async parseDOCX(buffer) {
    try {
      const result = await mammoth.extractRawText({ buffer });
      return result.value;
    } catch (error) {
      throw new Error('Failed to parse DOCX file');
    }
  }

  parseTXT(buffer) {
    try {
      return buffer.toString('utf-8');
    } catch (error) {
      throw new Error('Failed to parse TXT file');
    }
  }

  async parseFile(file) {
    const buffer = file.buffer;
    const extension = file.originalname.split('.').pop().toLowerCase();

    switch (extension) {
      case 'pdf':
        return await this.parsePDF(buffer);
      case 'docx':
        return await this.parseDOCX(buffer);
      case 'txt':
        return this.parseTXT(buffer);
      default:
        throw new Error('Unsupported file type. Please upload PDF, DOCX, or TXT files.');
    }
  }
}

module.exports = new FileParser(); 