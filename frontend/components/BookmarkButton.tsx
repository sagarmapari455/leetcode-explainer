/**
 * BookmarkButton Component
 * Save problems to bookmarks
 */

import React, { useState, useEffect } from 'react';
import { addBookmark, removeBookmark, isBookmarked } from '../utils/storage';

interface BookmarkButtonProps {
  problemId: number;
  title: string;
  difficulty: string;
  className?: string;
}

export default function BookmarkButton({
  problemId,
  title,
  difficulty,
  className = ''
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    setBookmarked(isBookmarked(problemId));
  }, [problemId]);

  const handleToggle = () => {
    setAnimating(true);
    
    if (bookmarked) {
      removeBookmark(problemId);
      setBookmarked(false);
    } else {
      addBookmark({ id: problemId, title, difficulty, timestamp: new Date().toISOString() });
      setBookmarked(true);
    }

    setTimeout(() => setAnimating(false), 500);
  };

  return (
    <button
      onClick={handleToggle}
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 flex items-center gap-2 ${
        bookmarked
          ? 'bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white'
          : 'bg-gradient-to-r from-purple-600/60 to-blue-600/60 hover:from-purple-600 hover:to-blue-600 text-white'
      } ${animating ? 'scale-110' : 'scale-100'} ${className}`}
      title={bookmarked ? 'Remove bookmark' : 'Add to bookmarks'}
    >
      <span className={`text-lg transition-transform ${animating ? 'scale-125' : ''}`}>
        {bookmarked ? '⭐' : '☆'}
      </span>
      {bookmarked ? 'Bookmarked' : 'Bookmark'}
    </button>
  );
}
