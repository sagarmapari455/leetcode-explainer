/**
 * Client-side storage utilities for bookmarks, history, and preferences
 */

export interface BookmarkedProblem {
  id: number;
  title: string;
  difficulty: string;
  timestamp: string;
}

export interface HistoryItem {
  id: number;
  title: string;
  timestamp: string;
}

export interface UserStats {
  total_viewed: number;
  easy_count: number;
  medium_count: number;
  hard_count: number;
  last_viewed: string | null;
}

const BOOKMARKS_KEY = 'leetcode_bookmarks';
const HISTORY_KEY = 'leetcode_history';
const STATS_KEY = 'leetcode_stats';
const PREFERENCES_KEY = 'leetcode_preferences';

/**
 * Bookmarks Management
 */
export function getBookmarks(): BookmarkedProblem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(BOOKMARKS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addBookmark(problem: BookmarkedProblem): boolean {
  try {
    const bookmarks = getBookmarks();
    if (!bookmarks.find(b => b.id === problem.id)) {
      bookmarks.push({
        ...problem,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export function removeBookmark(problemId: number): boolean {
  try {
    const bookmarks = getBookmarks().filter(b => b.id !== problemId);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    return true;
  } catch {
    return false;
  }
}

export function isBookmarked(problemId: number): boolean {
  return getBookmarks().some(b => b.id === problemId);
}

/**
 * History Management
 */
export function getHistory(): HistoryItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToHistory(item: HistoryItem): void {
  try {
    const history = getHistory();
    // Remove if exists and re-add at top
    const filtered = history.filter(h => h.id !== item.id);
    filtered.unshift({
      ...item,
      timestamp: new Date().toISOString()
    });
    // Keep only last 50
    localStorage.setItem(HISTORY_KEY, JSON.stringify(filtered.slice(0, 50)));
  } catch {
    // Silent fail
  }
}

export function clearHistory(): void {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify([]));
  } catch {
    // Silent fail
  }
}

/**
 * Statistics Management
 */
export function getStats(): UserStats {
  if (typeof window === 'undefined') {
    return {
      total_viewed: 0,
      easy_count: 0,
      medium_count: 0,
      hard_count: 0,
      last_viewed: null
    };
  }
  try {
    const data = localStorage.getItem(STATS_KEY);
    return data ? JSON.parse(data) : {
      total_viewed: 0,
      easy_count: 0,
      medium_count: 0,
      hard_count: 0,
      last_viewed: null
    };
  } catch {
    return {
      total_viewed: 0,
      easy_count: 0,
      medium_count: 0,
      hard_count: 0,
      last_viewed: null
    };
  }
}

export function updateStats(difficulty: string): void {
  try {
    const stats = getStats();
    stats.total_viewed += 1;
    
    if (difficulty === 'Easy') stats.easy_count += 1;
    else if (difficulty === 'Medium') stats.medium_count += 1;
    else if (difficulty === 'Hard') stats.hard_count += 1;
    
    stats.last_viewed = new Date().toISOString();
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  } catch {
    // Silent fail
  }
}

/**
 * Preferences Management
 */
export function getPreferences(): Record<string, any> {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(PREFERENCES_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function savePreference(key: string, value: any): void {
  try {
    const prefs = getPreferences();
    prefs[key] = value;
    localStorage.setItem(PREFERENCES_KEY, JSON.stringify(prefs));
  } catch {
    // Silent fail
  }
}

export function getPreference(key: string, defaultValue?: any): any {
  const prefs = getPreferences();
  return prefs[key] ?? defaultValue;
}

/**
 * Copy to clipboard
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Format relative time
 */
export function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  
  return date.toLocaleDateString();
}
