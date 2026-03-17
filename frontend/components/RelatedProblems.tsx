/**
 * RelatedProblems Component
 * Shows related problems for the current problem
 */

import React, { useState, useEffect } from 'react';
import { explainProblem } from '../utils/api';

interface RelatedProblem {
  id: number;
  title: string;
  difficulty: string;
}

interface RelatedProblemsProps {
  problemId: number;
  onSelectProblem: (id: number) => void;
}

export default function RelatedProblems({
  problemId,
  onSelectProblem
}: RelatedProblemsProps) {
  const [related, setRelated] = useState<RelatedProblem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRelated();
  }, [problemId]);

  const fetchRelated = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/problems/related/${problemId}`);
      const data = await response.json();
      if (data.success && data.related) {
        setRelated(data.related.slice(0, 3)); // Show top 3
      }
    } catch (error) {
      console.error('Failed to fetch related problems:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !related.length) {
    return null;
  }

  const getDifficultyColor = (diff: string) => {
    if (diff === 'Easy') return 'text-emerald-400';
    if (diff === 'Medium') return 'text-blue-400';
    return 'text-red-400';
  };

  return (
    <div className="glass p-6 animate-slideInUp hover:bg-white/10 transition-all">
      <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-4 flex items-center gap-2">
        <span className="text-2xl">🔗</span>
        Related Problems
      </h3>
      <div className="space-y-2">
        {related.map((problem) => (
          <button
            key={problem.id}
            onClick={() => onSelectProblem(problem.id)}
            className="w-full text-left p-3 rounded-lg bg-white/5 hover:bg-purple-500/20 transition-all duration-200 border border-purple-400/30 hover:border-purple-400 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-gray-200 group-hover:text-white font-semibold">
                #{problem.id} {problem.title}
              </span>
              <span className={`text-sm font-bold ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
