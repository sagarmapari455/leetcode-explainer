/**
 * HistorySidebar Component
 * Shows viewing history and bookmarks
 */

import React, { useState, useEffect } from 'react';
import { getHistory, getBookmarks, HistoryItem, BookmarkedProblem, formatRelativeTime, clearHistory } from '../utils/storage';

interface HistorySidebarProps {
  onSelectProblem: (id: number) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function HistorySidebar({
  onSelectProblem,
  isOpen,
  onClose
}: HistorySidebarProps) {
  const [activeTab, setActiveTab] = useState<'history' | 'bookmarks'>('history');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [bookmarks, setBookmarks] = useState<BookmarkedProblem[]>([]);

  useEffect(() => {
    if (isOpen) {
      setHistory(getHistory());
      setBookmarks(getBookmarks());
    }
  }, [isOpen]);

  const handleSelectProblem = (id: number) => {
    onSelectProblem(id);
    onClose();
  };

  const handleClearHistory = () => {
    if (confirm('Clear all history?')) {
      clearHistory();
      setHistory([]);
    }
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static right-0 top-0 h-full w-80 bg-gradient-to-b from-gray-900 to-black border-l border-orange-500/30 z-50 transform transition-transform duration-300 overflow-y-auto ${
          isOpen ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 bg-black/80 backdrop-blur-sm p-4 border-b border-orange-500/30 flex items-center justify-between">
          <h2 className="text-lg font-black text-yellow-400">📚 Activity</h2>
          <button
            onClick={onClose}
            className="md:hidden text-gray-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-orange-500/30">
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-3 font-semibold transition-all ${
              activeTab === 'history'
                ? 'bg-orange-500 text-black border-b-2 border-yellow-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            History
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`flex-1 py-3 font-semibold transition-all ${
              activeTab === 'bookmarks'
                ? 'bg-orange-500 text-black border-b-2 border-yellow-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Bookmarks
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          {activeTab === 'history' ? (
            <>
              {history.length > 0 ? (
                <>
                  {history.map((item) => (
                    <button
                      key={`${item.id}-${item.timestamp}`}
                      onClick={() => handleSelectProblem(item.id)}
                      className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-orange-500/20 transition-all group border border-gray-700 hover:border-orange-500"
                    >
                      <div className="flex items-start gap-2">
                        <span className="font-bold text-orange-400">#{item.id}</span>
                        <div className="flex-1">
                          <p className="text-gray-200 text-sm group-hover:text-white font-semibold truncate">
                            {item.title}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatRelativeTime(item.timestamp)}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={handleClearHistory}
                    className="w-full mt-4 py-2 text-sm text-red-400 hover:text-red-300 font-semibold border border-red-500/30 rounded-lg hover:bg-red-500/10 transition-all"
                  >
                    🗑️ Clear History
                  </button>
                </>
              ) : (
                <p className="text-center text-gray-500 py-8">No history yet</p>
              )}
            </>
          ) : (
            <>
              {bookmarks.length > 0 ? (
                bookmarks.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectProblem(item.id)}
                    className="w-full text-left p-3 rounded-lg bg-gray-800 hover:bg-yellow-500/20 transition-all group border border-gray-700 hover:border-yellow-500"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <p className="text-gray-200 text-sm group-hover:text-white font-semibold truncate">
                          #{item.id} {item.title}
                        </p>
                        <p className={`text-xs font-bold mt-1 ${
                          item.difficulty === 'Easy' ? 'text-green-400' :
                          item.difficulty === 'Medium' ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>
                          {item.difficulty}
                        </p>
                      </div>
                      <span className="text-lg">⭐</span>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-center text-gray-500 py-8">No bookmarks yet</p>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}
