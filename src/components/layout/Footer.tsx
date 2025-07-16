'use client'

import { useGame } from '@/contexts/GameContext'

export function Footer() {
  const { state } = useGame()

  const getKeyboardShortcuts = () => {
    switch (state.currentScreen) {
      case 'start':
        return [
          { key: 'Enter', action: 'Start Game' },
          { key: '1-5', action: 'Select Questions' }
        ]
      case 'game':
        return [
          { key: 'A, B, C, D', action: 'Select Answer' },
          { key: 'Enter', action: 'Submit Answer' },
          { key: 'Q', action: 'Quit Game' }
        ]
      case 'gameOver':
        return [
          { key: 'Enter', action: 'Play Again' },
          { key: 'L', action: 'View Leaderboard' },
          { key: 'Q', action: 'Home' }
        ]
      default:
        return []
    }
  }

  return (
    <footer className="glass-panel border-t border-orange-500/20 mt-auto">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Keyboard Shortcuts */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {getKeyboardShortcuts().map((shortcut, index) => (
              <div key={index} className="flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500">
                  {shortcut.key}
                </kbd>
                <span>{shortcut.action}</span>
              </div>
            ))}
          </div>

          {/* Credits */}
          <div className="text-sm text-muted-foreground">
            Made with ❤️ for NBA fans • uKnowBall 2024
          </div>
        </div>
      </div>
    </footer>
  )
} 