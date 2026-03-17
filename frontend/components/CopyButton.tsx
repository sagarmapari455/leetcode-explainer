/**
 * CopyButton Component
 * Allows copying explanation text to clipboard
 */

import React, { useState } from 'react';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export default function CopyButton({ 
  text, 
  label = 'Copy Explanation',
  className = ''
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
        copied
          ? 'bg-emerald-600 text-white'
          : 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white'
      } ${className}`}
      title="Copy to clipboard"
    >
      <span className="text-lg">{copied ? '✓' : '📋'}</span>
      {copied ? 'Copied!' : label}
    </button>
  );
}
