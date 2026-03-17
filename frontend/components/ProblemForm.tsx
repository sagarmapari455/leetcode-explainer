/**
 * ProblemForm Component - Premium Input Form
 * Purple/Blue Theme with Glassmorphism Effects
 */

import React, { useState } from 'react';

interface ProblemFormProps {
  onSubmit: (questionNumber: number, language: string) => void;
  isLoading: boolean;
}

export default function ProblemForm({ onSubmit, isLoading }: ProblemFormProps) {
  const [questionNumber, setQuestionNumber] = useState<string>('1');
  const [language, setLanguage] = useState<string>('English');
  const [error, setError] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const questionNum = parseInt(questionNumber, 10);
    if (isNaN(questionNum) || questionNum < 1) {
      setError('Enter a valid problem number');
      return;
    }

    onSubmit(questionNum, language);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full animate-slideInLeft">
      <div className="space-y-6">
        {/* Problem Number Input */}
        <div className="animate-slideInUp" style={{ animationDelay: '0.1s' }}>
          <label htmlFor="question-number" className="block text-lg font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            📌 Problem Number
          </label>
          <input
            id="question-number"
            type="number"
            min="1"
            value={questionNumber}
            onChange={(e) => {
              setQuestionNumber(e.target.value);
              setError('');
            }}
            placeholder="Enter problem #"
            className="input-field text-lg font-semibold"
            disabled={isLoading}
          />
          <p className="text-xs text-gray-400 mt-2">
            Try #1 (Two Sum), #2 (Add Two Numbers)...
          </p>
        </div>

        {/* Language Selection */}
        <div className="animate-slideInUp" style={{ animationDelay: '0.2s' }}>
          <label htmlFor="language" className="block text-lg font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            🌍 Select Language for Explanation
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="input-field cursor-pointer text-lg font-semibold"
            disabled={isLoading}
          >
            <option value="Hindi">हिंदी (Hindi)</option>
            <option value="English">English</option>
            <option value="Marathi">मराठी (Marathi)</option>
            <option value="Bengali">বাংলা (Bengali)</option>
            <option value="Telugu">తెలుగు (Telugu)</option>
            <option value="Tamil">தமிழ் (Tamil)</option>
            <option value="Kannada">ಕನ್ನಡ (Kannada)</option>
            <option value="Gujarati">ગુજરાતી (Gujarati)</option>
            <option value="Punjabi">ਪੰਜਾਬੀ (Punjabi)</option>
            <option value="Urdu">اردو (Urdu)</option>
          </select>
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-900/30 border-l-4 border-red-500 rounded-lg animate-slideInUp">
            <p className="text-red-400 text-sm font-semibold">⚠️ {error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full text-lg font-bold py-4 animate-slideInUp"
          style={{ animationDelay: '0.3s' }}
        >
          {isLoading ? (
            <span className="flex items-center justify-center gap-3">
              <span className="inline-block animate-spin text-2xl">⚙️</span>
              <span>Explaining...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <span>🚀 Explain Problem</span>
            </span>
          )}
        </button>

        {/* Features List */}
        <div className="mt-8 pt-8 border-t border-purple-400/20 animate-slideInUp" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4 flex items-center gap-2">
            ✨ You'll Get:
          </h3>
          <div className="space-y-2 text-sm text-gray-300">
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold text-lg">📋</span>
              <span>Full problem statement</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold text-lg">✅</span>
              <span>Test case examples</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-purple-400 font-bold text-lg">💡</span>
              <span>Real-life analogy</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-blue-400 font-bold text-lg">🔄</span>
              <span>Different approaches</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-cyan-400 font-bold text-lg">⚡</span>
              <span>Time complexity & why it matters</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-orange-400 font-bold text-lg">🔑</span>
              <span>Key insights & common mistakes</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-yellow-400 font-bold">★</span>
              <span className="text-yellow-300 font-semibold">ZERO code - concept only!</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
