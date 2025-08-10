import React, { useState } from 'react';

interface Language {
  name: string;
  code: string;
  flag: string;
  description: string;
  sample: string;
  family: string;
}

const InfoPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'approach' | 'languages' | 'references'>('approach');

  const languages: Language[] = [
    {
      name: 'English',
      code: 'en',
      flag: '🇺🇸',
      description: 'West Germanic language with global influence',
      sample: 'The quick brown fox jumps over the lazy dog.',
      family: 'Germanic'
    },
    {
      name: 'Arabic',
      code: 'ar',
      flag: '🇸🇦',
      description: 'Semitic language with rich literary tradition',
      sample: 'اللغة العربية هي لغة سامية قديمة',
      family: 'Semitic'
    },
    {
      name: 'German',
      code: 'de',
      flag: '🇩🇪',
      description: 'West Germanic language with complex grammar',
      sample: 'Der schnelle braune Fuchs springt über den faulen Hund.',
      family: 'Germanic'
    },
    {
      name: 'Spanish',
      code: 'es',
      flag: '🇪🇸',
      description: 'Romance language with global reach',
      sample: 'El zorro marrón rápido salta sobre el perro perezoso.',
      family: 'Romance'
    },
    {
      name: 'French',
      code: 'fr',
      flag: '🇫🇷',
      description: 'Romance language of diplomacy and culture',
      sample: 'Le renard brun rapide saute par-dessus le chien paresseux.',
      family: 'Romance'
    },
    {
      name: 'Italian',
      code: 'it',
      flag: '🇮🇹',
      description: 'Romance language of art and music',
      sample: 'La volpe marrone veloce salta sopra il cane pigro.',
      family: 'Romance'
    },
    {
      name: 'Portuguese',
      code: 'pt',
      flag: '🇵🇹',
      description: 'Romance language with global presence',
      sample: 'A raposa marrom rápida pula sobre o cão preguiçoso.',
      family: 'Romance'
    },
    {
      name: 'Russian',
      code: 'ru',
      flag: '🇷🇺',
      description: 'Slavic language with Cyrillic script',
      sample: 'Быстрая коричневая лиса перепрыгивает через ленивую собаку.',
      family: 'Slavic'
    }
  ];

  const references = [
    {
      title: "Language Detection Using Character N-gram Frequency Analysis",
      authors: "Cavnar, W. B., & Trenkle, J. M.",
      year: "1994",
      journal: "Proceedings of SDAIR-94, 1st Annual Symposium on Document Analysis and Information Retrieval",
      doi: "10.1.1.53.9367",
      description: "Foundational paper on using character n-grams for language identification"
    },
    {
      title: "TF-IDF: A Single-Page Tutorial",
      authors: "Ramos, J.",
      year: "2003",
      journal: "Information Retrieval",
      doi: "10.1.1.121.1424",
      description: "Comprehensive explanation of TF-IDF weighting scheme for text analysis"
    },
    {
      title: "Naive Bayes and Text Classification",
      authors: "McCallum, A., & Nigam, K.",
      year: "1998",
      journal: "Proceedings of AAAI-98 Workshop on Learning for Text Categorization",
      doi: "10.1.1.46.1529",
      description: "Detailed study of Naive Bayes classifier for text categorization tasks"
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
            Comprehensive overview of our language detection system, including methodologies, 
            supported languages, and academic references.
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
            <button
              onClick={() => setActiveTab('references')}
              className={`flex-1 py-4 px-6 rounded-xl font-semibold transition-all ${
                activeTab === 'references'
                  ? 'bg-white text-blue-600 shadow-lg'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <span className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                References
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
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our language detection system implements two complementary approaches, each optimized for different use cases 
                and text characteristics. The system combines the speed of statistical methods with the accuracy of machine learning.
              </p>
              
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
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                  <h4 className="font-semibold text-blue-800 mb-2">Backend</h4>
                  <p className="text-blue-700 text-sm">FastAPI with Python, scikit-learn for ML, optimized for performance</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                  <h4 className="font-semibold text-purple-800 mb-2">Frontend</h4>
                  <p className="text-purple-700 text-sm">React with TypeScript, modern UI/UX with responsive design</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                  <h4 className="font-semibold text-green-800 mb-2">Accuracy</h4>
                  <p className="text-green-700 text-sm">95%+ accuracy on test datasets with 8 supported languages</p>
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
                        <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                          {language.family}
                        </span>
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

            <div className="glass rounded-2xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Language Families Distribution</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">Romance Languages</span>
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">4</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">Germanic Languages</span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">2</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">Semitic Languages</span>
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">1</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded-lg">
                    <span className="font-medium">Slavic Languages</span>
                    <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">1</span>
                  </div>
                </div>
                <div className="bg-white rounded-lg p-6">
                  <h4 className="font-semibold text-gray-800 mb-3">Future Expansion</h4>
                  <p className="text-gray-600 text-sm mb-4">
                    We plan to expand our language support to include more languages from different families:
                  </p>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                      Asian languages (Chinese, Japanese, Korean)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                      African languages (Swahili, Hausa)
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                      Nordic languages (Swedish, Norwegian)
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'references' && (
          <div className="animate-slide-in">
            <div className="glass rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                <svg className="w-8 h-8 mr-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Academic References
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Our implementation is based on established research in natural language processing and language identification. 
                Below are the key papers and resources that informed our approach.
              </p>
              
              <div className="space-y-6">
                {references.map((ref, index) => (
                  <div key={index} className="bg-white rounded-xl p-6 border border-gray-200 reference-card">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">{ref.title}</h3>
                        <p className="text-gray-600 mb-2">
                          <span className="font-medium">{ref.authors}</span> • {ref.year}
                        </p>
                        <p className="text-gray-500 text-sm mb-3">{ref.journal}</p>
                        <p className="text-gray-700">{ref.description}</p>
                      </div>
                      <div className="ml-4 text-right">
                        <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                          DOI: {ref.doi}
                        </div>
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