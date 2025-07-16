import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric',
    year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
  })
}

export function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

export function isRecentEntry(timestamp: string): boolean {
  const entryTime = new Date(timestamp).getTime()
  const now = Date.now()
  const fiveMinutes = 5 * 60 * 1000
  return (now - entryTime) < fiveMinutes
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function getPerformanceLevel(accuracy: number) {
  if (accuracy >= 80) {
    return {
      level: 'excellent' as const,
      title: '🏆 Excellent!',
      message: 'Excellent! You\'re a true NBA expert! 🏆',
      color: '#28a745'
    }
  } else if (accuracy >= 60) {
    return {
      level: 'good' as const,
      title: '🏀 Good Job!',
      message: 'Good job! You know your NBA history! 🏀',
      color: '#ff6b35'
    }
  } else {
    return {
      level: 'study' as const,
      title: '📚 Keep Learning!',
      message: 'Keep studying NBA history and try again! 📚',
      color: '#dc3545'
    }
  }
}

export function getPerformanceBadge(accuracy: number): string {
  if (accuracy >= 80) return '🏆 Expert'
  if (accuracy >= 60) return '🏀 Skilled'
  return '📚 Learning'
}
