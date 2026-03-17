/**
 * StatsPanel Component
 * Shows user progress and statistics
 */

import React, { useState, useEffect } from 'react';
import { getStats, UserStats } from '../utils/storage';

export default function StatsPanel() {
  const [stats, setStats] = useState<UserStats>({
    total_viewed: 0,
    easy_count: 0,
    medium_count: 0,
    hard_count: 0,
    last_viewed: null
  });

  useEffect(() => {
    setStats(getStats());
  }, []);

  const getProgressPercentage = () => {
    // Assume 100 problems total (can be dynamic)
    return Math.min(Math.round((stats.total_viewed / 150) * 100), 100);
  };

  return (
    <div className="card p-6 animate-slideInUp">
      <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4 flex items-center gap-2">
        <span className="text-2xl">📊</span>
        Your Progress
      </h3>

      {/* Overall Stats */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-300 font-semibold">Problems Viewed</span>
          <span className="text-2xl font-black text-yellow-400">{stats.total_viewed}</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-orange-500 h-full transition-all duration-500"
            style={{ width: `${getProgressPercentage()}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">{getProgressPercentage()}% of daily goal</p>
      </div>

      {/* Difficulty Breakdown */}
      <div className="grid grid-cols-3 gap-4">
        {/* Easy */}
        <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 text-center">
          <p className="text-xs text-green-400 font-bold uppercase mb-2">Easy</p>
          <p className="text-3xl font-black text-green-400">{stats.easy_count}</p>
        </div>

        {/* Medium */}
        <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 text-center">
          <p className="text-xs text-yellow-400 font-bold uppercase mb-2">Medium</p>
          <p className="text-3xl font-black text-yellow-400">{stats.medium_count}</p>
        </div>

        {/* Hard */}
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-center">
          <p className="text-xs text-red-400 font-bold uppercase mb-2">Hard</p>
          <p className="text-3xl font-black text-red-400">{stats.hard_count}</p>
        </div>
      </div>

      {/* Last Viewed */}
      {stats.last_viewed && (
        <div className="mt-6 p-4 bg-gray-800 rounded-lg border border-orange-500/30">
          <p className="text-xs text-gray-400 mb-1">Last Viewed</p>
          <p className="text-sm text-gray-300 font-semibold">
            {new Date(stats.last_viewed).toLocaleDateString()} at{' '}
            {new Date(stats.last_viewed).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>
      )}

      {/* Motivational Message */}
      <div className="mt-6 p-4 bg-gradient-to-r from-orange-900/30 to-yellow-900/30 rounded-lg border border-orange-500/30">
        <p className="text-sm text-yellow-300 font-semibold">
          💪 Keep practicing! Consistency beats perfection.
        </p>
      </div>
    </div>
  );
}
