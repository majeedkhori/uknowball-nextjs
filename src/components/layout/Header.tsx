'use client'

import { useGame } from '@/contexts/GameContext'

export function Header() {
  const { state } = useGame()

  return (
    <header className="glass-panel border-b border-orange-500/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Game Title */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🏀</div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
                uKnowBall
              </h1>
              <p className="text-sm text-muted-foreground">NBA Trivia Game</p>
            </div>
          </div>

          {/* Game Stats (shown during game) */}
          {state.currentScreen === 'game' && (
            <div className="flex items-center space-x-6 text-sm">
              <div className="led-scoreboard px-3 py-1">
                <span className="text-green-400">Score: {state.score}</span>
              </div>
              <div className="led-scoreboard px-3 py-1">
                <span className="text-blue-400">
                  Question {state.currentQuestion}/{state.totalQuestions}
                </span>
              </div>
              <div className="led-scoreboard px-3 py-1">
                <span className="text-orange-400">
                  Accuracy: {state.questionsAnswered.length > 0 
                    ? Math.round((state.questionsAnswered.filter(q => q.correct).length / state.questionsAnswered.length) * 100) + '%'
                    : '0%'
                  }
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 