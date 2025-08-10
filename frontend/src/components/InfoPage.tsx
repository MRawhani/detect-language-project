import React, { useState } from 'react';

interface Language {
  name: string;
  code: string;
  flag: string;
  description?: string;
  sample: string;
  family?: string;
}

const InfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'approach' | 'languages'>('approach');

  const languages: Language[] = [
    {
      name: 'English',
      code: 'en',
      flag: '🇺🇸',
      sample: 'The quick brown fox jumps over the lazy dog.',
    },
    {
      name: 'Arabic',
      code: 'ar',
      flag: '🇸🇦',
      sample: 'اللغة العربية هي لغة سامية قديمة',
    },
    {
      name: 'German',
      code: 'de',
      flag: '🇩🇪',
      sample: 'Der schnelle braune Fuchs springt über den faulen Hund.',
    },
    {
      name: 'Spanish',
      code: 'es',
      flag: '🇪🇸',
      sample: 'El zorro marrón rápido salta sobre el perro perezoso.',
    },
    {
      name: 'French',
      code: 'fr',
      flag: '🇫🇷',
      sample: 'Le renard brun rapide saute par-dessus le chien paresseux.',
    },
    {
      name: 'Italian',
      code: 'it',
      flag: '🇮🇹',
      sample: 'La volpe marrone veloce salta sopra il cane pigro.',
    },
    {
      name: 'Portuguese',
      code: 'pt',
      flag: '🇵🇹',
      sample: 'A raposa marrom rápida pula sobre o cão preguiçoso.',
    },
    {
      name: 'Russian',
      code: 'ru',
      flag: '🇷🇺',
      sample: 'Быстрая коричневая лиса перепрыгивает через ленивую собаку.',
    }
  ];

  const approaches = [
    {
      title: "N-gram Analysis",
      icon: "⚡",
      description: "Character-based frequency analysis using trigrams",
      details: [
        "Analyzes character patterns in 3-gram sequences",
        "Computes frequency distributions for each language",
        "Uses cosine similarity for classification",
        "Fast and lightweight approach",
        "Effective for short texts"
      ],
      advantages: ["Fast processing", "Low memory usage", "Good for short texts", "Language-agnostic"],
      limitations: ["Less accurate for mixed content", "Sensitive to text length"]
    },
    {
      title: "Machine Learning (TF-IDF + Naive Bayes)",
      icon: "🤖",
      description: "Advanced classification using trained models",
      details: [
        "Extracts TF-IDF features from text",
        "Trains Naive Bayes classifier on labeled data",
        "Handles word-level patterns and context",
        "More sophisticated feature engineering",
        "Better for longer texts"
      ],
      advantages: ["Higher accuracy", "Better context understanding", "Robust to noise", "Scalable"],
      limitations: ["Requires training data", "More computational resources", "Language-specific models"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-4">
            Project Information
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive overview of our language detection system, including methodologies and 
            supported languages.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="glass rounded-2xl p-2 mb-8 shadow-xl">
          <div className="flex space-x-1">
            <button
              onClick={() => setActiveTab('approach')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                activeTab === 'approach'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Approach
              </span>
            </button>
            <button
              onClick={() => setActiveTab('languages')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                activeTab === 'languages'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Languages
              </span>
            </button>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'approach' && (
          <div className="animate-slide-in">
            <div className="glass rounded-2xl p-8 shadow-xl mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
                Methodology Overview
              </h2>
            
              
              <div className="grid md:grid-cols-2 gap-8">
                {approaches.map((approach, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 info-card">
                    <div className="flex items-center mb-4">
                      <span className="text-3xl mr-3">{approach.icon}</span>
                      <h3 className="text-xl font-bold text-gray-800">{approach.title}</h3>
                    </div>
                    <p className="text-gray-600 mb-4">{approach.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
                      <ul className="space-y-1">
                        {approach.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <h4 className="font-semibold text-green-700 mb-1">Advantages:</h4>
                        <div className="flex flex-wrap gap-1">
                          {approach.advantages.map((adv, idx) => (
                            <span key={idx} className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                              {adv}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-orange-700 mb-1">Limitations:</h4>
                        <div className="flex flex-wrap gap-1">
                          {approach.limitations.map((lim, idx) => (
                            <span key={idx} className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs">
                              {lim}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Technical Implementation</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">FastAPI Backend</h4>
                  <p className="text-blue-700 text-sm">Python-based backend using scikit-learn for Machine Learning approach (TF-IDF + Naive Bayes), optimized for ML inference and model serving</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Node.js Backend</h4>
                  <p className="text-green-700 text-sm">JavaScript backend implementing N-gram analysis for character-based language detection, handling file processing and text preprocessing. Also, it is used for as middleware to communicate with the python backend.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Frontend</h4>
                  <p className="text-purple-700 text-sm">React with TypeScript, modern UI/UX with responsive design, Tailwind CSS for styling</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
                  <h4 className="font-semibold text-orange-800 mb-2">Architecture</h4>
                  <p className="text-orange-700 text-sm">Microservices architecture with FastAPI (port 8000), Node.js (port 3006), and React frontend (port 3005)</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'languages' && (
          <div className="animate-slide-in">
            <div className="glass rounded-2xl p-8 shadow-xl mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                Supported Languages
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our system currently supports 8 major world languages, carefully selected to cover diverse linguistic families 
                and writing systems. Each language has been extensively tested and optimized for accurate detection.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 language-grid">
                {languages.map((language, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 info-card">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2 language-flag">{language.flag}</div>
                      <h3 className="text-xl font-bold text-gray-800">{language.name}</h3>
                      <span className="text-sm text-gray-500">{language.code.toUpperCase()}</span>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-600 mb-2">{language.description}</p>
                      
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-500 mb-1">Sample Text:</p>
                        <p className="text-sm font-medium text-gray-700">{language.sample}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default InfoPage; 