/**
 * ResultView Component - Premium UI with Purple/Blue Theme
 * Displays problem explanations with animations and beautiful layout
 */

import React from 'react';

interface ResultViewProps {
  questionNumber: number;
  explanation: string;
  isLoading?: boolean;
  message?: string;  // Message about adjustments
  requestedNumber?: number;  // Original requested number if adjusted
}

interface Section {
  title: string;
  content: string;
  icon: string;
}

/**
 * Parse explanation into structured sections
 */
function parseSections(explanation: string): Section[] {
  const sections: Section[] = [];
  
  // Split by ## headers
  const parts = explanation.split(/## /);
  
  const sectionOrder = [
    { key: 'PROBLEM STATEMENT', icon: '📋', title: 'Problem' },
    { key: 'TEST CASES', icon: '✅', title: 'Examples' },
    { key: "WHAT'S HAPPENING", icon: '🎯', title: 'What To Do' },
    { key: 'REAL-WORLD ANALOGY', icon: '💡', title: 'Real Life' },
    { key: 'APPROACH', icon: '🔄', title: 'Approaches' },
    { key: 'BEST SOLUTION', icon: '⭐', title: 'Best Way' },
    { key: 'TIME & SPACE COMPLEXITY', icon: '⚡', title: 'Speed & Memory' },
    { key: 'KEY INSIGHTS', icon: '🔑', title: 'Important Tips' },
    { key: 'COMMON MISTAKES', icon: '⚠️', title: 'Avoid These' },
    { key: 'NEXT STEPS', icon: '🚀', title: 'Next' },
  ];

  // Parse parts
  const foundSections = new Map<string, string>();
  
  for (const part of parts) {
    for (const pattern of sectionOrder) {
      if (part.toUpperCase().startsWith(pattern.key)) {
        const content = part.replace(new RegExp(`^${pattern.key}\\n?`, 'i'), '').trim();
        foundSections.set(pattern.key, content);
        break;
      }
    }
  }

  // Create sections in order
  for (const pattern of sectionOrder) {
    const content = foundSections.get(pattern.key);
    if (content) {
      sections.push({
        title: `${pattern.icon} ${pattern.title}`,
        content: content,
        icon: pattern.icon,
      });
    }
  }

  return sections;
}

/**
 * Format text with styling
 */
function formatContent(text: string) {
  return text.split('\n').map((line, idx) => {
    if (!line.trim()) return null;
    
    // Style bullet points
    if (line.trim().startsWith('•')) {
      return (
        <div key={idx} className="ml-4 mb-2 flex gap-2">
          <span className="text-blue-400 font-bold">•</span>
          <span className="text-gray-200">{line.replace('•', '').trim()}</span>
        </div>
      );
    }
    
    // Style bold text and important words
    const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/);
    return (
      <p key={idx} className="mb-3 leading-relaxed text-gray-100">
        {parts.map((part, i) => {
          if (part && (part.startsWith('**') || part.startsWith('*'))) {
            const cleaned = part.replace(/\*/g, '');
            return (
              <span key={i} className="text-blue-400 font-bold">
                {cleaned}
              </span>
            );
          }
          if (part.includes('Example:') || part.includes('Input:') || part.includes('→')) {
            return (
              <span key={i} className="text-cyan-400 font-semibold block my-2">
                {part}
              </span>
            );
          }
          if (part.startsWith('❌')) {
            return (
              <span key={i} className="text-red-400 font-semibold block my-2">
                {part}
              </span>
            );
          }
          return <span key={i}>{part}</span>;
        })}
      </p>
    );
  }).filter(Boolean);
}

export default function ResultView({
  questionNumber,
  explanation,
  isLoading = false,
  message,
  requestedNumber,
}: ResultViewProps) {
  if (isLoading) {
    return (
      <div className="w-full max-w-4xl space-y-4 animate-fadeIn">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="card animate-shimmer h-32"></div>
        ))}
      </div>
    );
  }

  if (!explanation) {
    return null;
  }

  const sections = parseSections(explanation);

  return (
    <div className="w-full max-w-4xl space-y-4 animate-fadeIn">
      {/* Notification Banner - When problem number was adjusted */}
      {message && requestedNumber && (
        <div className="glass p-4 border-l-4 border-yellow-400 bg-yellow-900/20 animate-slideInUp">
          <div className="flex items-start gap-3">
            <span className="text-2xl">⚠️</span>
            <div>
              <p className="text-yellow-300 font-bold">Problem #{requestedNumber} not available</p>
              <p className="text-yellow-200 text-sm">{message}</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="glass p-8 border-l-4 border-blue-400 animate-slideInUp hover:bg-white/10 transition-all">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-5xl">🧠</span>
          <div>
            <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
              Problem #{questionNumber}
            </h2>
            <p className="text-blue-300 text-sm font-semibold">AI-Powered Explanation</p>
          </div>
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-3">
        {sections.map((section, idx) => (
          <div
            key={idx}
            className="glass animate-slideInUp hover:bg-white/10 transition-all"
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            {/* Section Header */}
            <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 flex items-center gap-2 px-4 pt-4 pb-3">
              <span className="text-2xl">{section.icon}</span>
              {section.title}
            </h3>

            {/* Section Content - Always Visible */}
            <div className="px-4 pb-4 border-t border-purple-400/20">
              <div className="space-y-3 text-gray-200">
                {formatContent(section.content)}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="glass p-6 text-center border-t-4 border-blue-400 animate-slideInUp hover:bg-white/10 transition-all">
        <p className="text-sm text-gray-300 font-semibold">
          💪 <span className="text-blue-400">Practice</span> is the key to mastery!
        </p>
        <p className="text-xs text-gray-500 mt-2">
          Try solving this problem before looking at solutions
        </p>
      </div>
    </div>
  );
}
