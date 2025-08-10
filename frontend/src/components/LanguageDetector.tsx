import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

interface DetectionResult {
  language: string;
  confidence: number;
  method: string;
}

// Loading Skeleton Component
const LoadingSkeleton: React.FC = () => (
  <div className="glass rounded-2xl p-8 shadow-xl animate-pulse">
    <div className="flex items-center mb-6">
      <div className="w-6 h-6 bg-gray-300 rounded mr-3"></div>
      <div className="h-6 bg-gray-300 rounded w-48"></div>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-gray-100 p-6 rounded-xl">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 bg-gray-300 rounded mr-3"></div>
            <div className="h-4 bg-gray-300 rounded w-32"></div>
          </div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
      ))}
    </div>
    <div className="bg-gray-100 rounded-xl p-6">
      <div className="h-4 bg-gray-300 rounded w-40 mb-4"></div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-4"></div>
        <div className="flex justify-between">
          <div className="h-3 bg-gray-300 rounded w-8"></div>
          <div className="h-3 bg-gray-300 rounded w-8"></div>
          <div className="h-3 bg-gray-300 rounded w-8"></div>
        </div>
      </div>
    </div>
  </div>
);

// Floating Action Button Component
const FloatingActionButton: React.FC<{ onClear: () => void; hasResults: boolean }> = ({ onClear, hasResults }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(hasResults);
  }, [hasResults]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClear}
        className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        title="Clear all results"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};

const LanguageDetector: React.FC = () => {
  const [text, setText] = useState('');
  const [method, setMethod] = useState<'ngram' | 'ml'>('ngram');
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [fileLoading, setFileLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState('');
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [showSuccess, setShowSuccess] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  // Calculate word count with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      const count = text.trim().split(/\s+/).filter(word => word.length > 0).length;
      setWordCount(count);
    }, 300);

    return () => clearTimeout(timer);
  }, [text]);

  const isTextValid = wordCount >= 10;

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt']
    },
    onDrop: async (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        await handleFileUpload(acceptedFiles[0]);
      }
    }
  });

  const handleFileUpload = async (file: File) => {
    setFileLoading(true);
    setError('');
    setUploadProgress(0);
    setFileName(file.name);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('method', method);

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 100);

      const response = await axios.post('http://localhost:3001/api/detect-language', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      clearInterval(progressInterval);
      setUploadProgress(100);
      setResult(response.data);
      setShowSuccess(true);
      
      // Reset progress after showing completion
      setTimeout(() => {
        setUploadProgress(0);
        setFileName('');
        setShowSuccess(false);
      }, 2000);

    } catch (err: any) {
      setUploadProgress(0);
      setFileName('');
      setError(err.response?.data?.error || 'Failed to detect language');
    } finally {
      setFileLoading(false);
    }
  };

  const handleTextDetection = async () => {
    if (!isTextValid) {
      setError('Please enter at least 10 words for accurate language detection');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:3001/api/detect-language', {
        text: text,
        method: method
      });

      setResult(response.data);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 2000);

    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to detect language');
    } finally {
      setLoading(false);
    }
  };

  const getLanguageFlag = (language: string) => {
    const flags: { [key: string]: string } = {
      english: '🇺🇸',
      arabic: '🇸🇦',
      german: '🇩🇪',
      spanish: '🇪🇸',
      french: '🇫🇷',
      italian: '🇮🇹',
      portuguese: '🇵🇹',
      russian: '🇷🇺'
    };
    return flags[language.toLowerCase()] || '🌐';
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-green-600';
    if (confidence >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getConfidenceBg = (confidence: number) => {
    if (confidence >= 80) return 'bg-green-500';
    if (confidence >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const clearResults = () => {
    setResult(null);
    setText('');
    setError('');
    setWordCount(0);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Method Selection */}
        <div className="glass rounded-2xl p-8 shadow-xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <svg className="w-6 h-6 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Choose Detection Method
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <label className={`method-card flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
              method === 'ngram' ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 shadow-lg' : 'border-gray-200 hover:border-blue-300 bg-white'
            }`}>
              <input
                type="radio"
                value="ngram"
                checked={method === 'ngram'}
                onChange={(e) => setMethod(e.target.value as 'ngram' | 'ml')}
                className="sr-only"
              />
              <div className="flex items-center w-full">
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  method === 'ngram' ? 'border-blue-500 bg-blue-500' : 'border-gray-300'
                }`}>
                  {method === 'ngram' && <div className="w-3 h-3 bg-white rounded-full"></div>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">⚡</span>
                    <span className="font-bold text-lg text-gray-800">N-gram Analysis</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    Character trigram analysis - Fast, lightweight, and efficient for quick language detection
                  </p>
                  <div className="flex items-center mt-3 text-xs text-gray-500">
                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full mr-2">Fast</span>
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">Lightweight</span>
                  </div>
                </div>
              </div>
            </label>
            
            <label className={`method-card flex items-center p-6 border-2 rounded-xl cursor-pointer transition-all ${
              method === 'ml' ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100 shadow-lg' : 'border-gray-200 hover:border-purple-300 bg-white'
            }`}>
              <input
                type="radio"
                value="ml"
                checked={method === 'ml'}
                onChange={(e) => setMethod(e.target.value as 'ngram' | 'ml')}
                className="sr-only"
              />
              <div className="flex items-center w-full">
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center ${
                  method === 'ml' ? 'border-purple-500 bg-purple-500' : 'border-gray-300'
                }`}>
                  {method === 'ml' && <div className="w-3 h-3 bg-white rounded-full"></div>}
                </div>
                <div className="flex-1">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">🤖</span>
                    <span className="font-bold text-lg text-gray-800">Machine Learning</span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    TF-IDF + Naive Bayes classifier - Higher accuracy with trained model analysis
                  </p>
                  <div className="flex items-center mt-3 text-xs text-gray-500">
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full mr-2">Accurate</span>
                    <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full">Advanced</span>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>

        {/* Input Tabs */}
        <div className="glass rounded-2xl p-8 shadow-xl">
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('text')}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                activeTab === 'text'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Text Input
              </span>
            </button>
            <button
              onClick={() => setActiveTab('file')}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                activeTab === 'file'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                File Upload
              </span>
            </button>
          </div>

          {/* Text Input Tab */}
          {activeTab === 'text' && (
            <div className="animate-slide-in">
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Enter your text for language detection
                </label>
                <div className="relative">
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type or paste your text here... (minimum 10 words required for accurate detection)"
                    className={`w-full h-40 p-4 border-2 rounded-xl resize-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 placeholder-gray-400 ${
                      text.length > 0 && !isTextValid ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}
                  />
                  <div className="absolute bottom-4 right-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      isTextValid ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {wordCount} words
                    </div>
                  </div>
                </div>
                {!isTextValid && text.length > 0 && (
                  <div className="mt-3 flex items-center text-red-600 text-sm">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Need {10 - wordCount} more words for accurate detection
                  </div>
                )}
              </div>
              <button
                onClick={handleTextDetection}
                disabled={loading || !isTextValid}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all btn-primary ${
                  loading || !isTextValid
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg'
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Analyzing Text...
                  </div>
                ) : (
                  <span className="flex items-center justify-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Detect Language
                  </span>
                )}
              </button>
            </div>
          )}

          {/* File Upload Tab */}
          {activeTab === 'file' && (
            <div className="animate-slide-in">
              <div
                {...getRootProps()}
                className={`file-upload-area border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
                  isDragActive ? 'border-blue-500 bg-blue-50 scale-105' : 'border-gray-300 hover:border-blue-400'
                } ${fileLoading ? 'pointer-events-none opacity-50' : ''}`}
              >
                <input {...getInputProps()} />
                {fileLoading ? (
                  <div className="space-y-6">
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                    </div>
                    <div>
                      <p className="text-blue-600 font-semibold text-lg mb-3">Processing {fileName}...</p>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
                    </div>
                  </div>
                ) : isDragActive ? (
                  <div className="space-y-4">
                    <div className="text-6xl">📁</div>
                    <p className="text-blue-600 text-xl font-semibold">Drop your file here!</p>
                    <p className="text-gray-500">We'll extract and analyze the text content</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="text-6xl">📄</div>
                    <div>
                      <p className="text-gray-700 text-xl font-semibold mb-2">
                        Drag & drop a file here, or click to browse
                      </p>
                      <p className="text-gray-500 mb-6">
                        Supported formats: PDF, DOCX, TXT
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-left">
                      <p className="font-medium text-gray-700 mb-3 flex items-center">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        File Requirements
                      </p>
                      <ul className="text-sm text-gray-600 space-y-2">
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                          Maximum file size: 10MB
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                          Text should be at least 10 words
                        </li>
                        <li className="flex items-center">
                          <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                          Supports 8 languages
                        </li>
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Loading State */}
        {loading && <LoadingSkeleton />}

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce-in z-50">
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Language detected successfully!
            </div>
          </div>
        )}

        {/* Results */}
        {result && !loading && (
          <div className="glass rounded-2xl p-8 shadow-xl animate-bounce-in">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Detection Results
              </h2>
              <button
                onClick={clearResults}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Clear results"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 card-hover">
                <div className="flex items-center mb-3">
                  <span className="text-3xl mr-3">{getLanguageFlag(result.language)}</span>
                  <h3 className="font-semibold text-gray-700">Detected Language</h3>
                </div>
                <p className="text-3xl font-bold text-blue-600 capitalize">{result.language}</p>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200 card-hover">
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 mr-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  <h3 className="font-semibold text-gray-700">Confidence Score</h3>
                </div>
                <p className={`text-3xl font-bold ${getConfidenceColor(result.confidence)}`}>
                  {result.confidence}%
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200 card-hover">
                <div className="flex items-center mb-3">
                  <svg className="w-6 h-6 mr-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="font-semibold text-gray-700">Method Used</h3>
                </div>
                <p className="text-2xl font-bold text-purple-600 capitalize">{result.method}</p>
              </div>
            </div>
            
            {/* Confidence Indicator */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h4 className="font-semibold text-gray-700 mb-4 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Confidence Level
              </h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600">Accuracy</span>
                  <span className={`text-sm font-bold ${getConfidenceColor(result.confidence)}`}>
                    {result.confidence >= 80 ? 'High' :
                     result.confidence >= 60 ? 'Medium' : 'Low'} Confidence
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className={`h-4 rounded-full transition-all duration-1000 ease-out ${getConfidenceBg(result.confidence)}`}
                    style={{ width: `${result.confidence}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>0%</span>
                  <span>50%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 animate-fade-in shake">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <p className="text-red-700 mt-1">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Info Section */}
        <div className="glass rounded-2xl p-8 shadow-xl">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <svg className="w-5 h-5 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            How it works
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-blue-600 text-xs font-bold">1</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">N-gram Method</p>
                  <p className="text-sm text-gray-600">Analyzes character patterns (trigrams) to identify language characteristics</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-purple-600 text-xs font-bold">2</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">ML Method</p>
                  <p className="text-sm text-gray-600">Uses trained model with TF-IDF features and Naive Bayes classifier</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-green-600 text-xs font-bold">3</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Supported Languages</p>
                  <p className="text-sm text-gray-600">English, Arabic, German, Spanish, French, Italian, Portuguese, Russian</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mr-3 mt-0.5">
                  <span className="text-orange-600 text-xs font-bold">4</span>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Minimum Text</p>
                  <p className="text-sm text-gray-600">10 words required for accurate detection and reliable results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Action Button */}
      <FloatingActionButton onClear={clearResults} hasResults={!!result} />
    </>
  );
};

export default LanguageDetector; 