'use client'

import { useGame } from '@/contexts/GameContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function GameOverScreen() {
  const { state, resetGame, setScreen } = useGame()

  if (!state.finalStats) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-panel border-red-500/20">
          <CardContent className="text-center p-8">
            <p className="text-red-400">Game stats not available. Please start a new game.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const { finalStats } = state
  const percentage = Math.round((finalStats.correctAnswers / finalStats.questionsAnswered) * 100)

  const getPerformanceMessage = () => {
    if (percentage >= 90) return { message: "🏆 NBA Champion! Outstanding!", color: "text-yellow-400" }
    if (percentage >= 80) return { message: "🌟 All-Star Performance! Excellent!", color: "text-blue-400" }
    if (percentage >= 70) return { message: "🔥 Solid Game! Well Done!", color: "text-green-400" }
    if (percentage >= 60) return { message: "👍 Good Effort! Keep Practicing!", color: "text-orange-400" }
    return { message: "📚 Time to Study More NBA History!", color: "text-gray-400" }
  }

  const performance = getPerformanceMessage()

  const handlePlayAgain = () => {
    resetGame()
    setScreen('start')
  }

  const handleViewLeaderboard = () => {
    // TODO: Implement leaderboard modal
    console.log('View leaderboard clicked')
  }

  const handleGoHome = () => {
    resetGame()
    setScreen('start')
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl glass-panel border-orange-500/20">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="text-6xl">🏀</div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            Game Complete!
          </CardTitle>
          <CardDescription className={`text-xl font-semibold ${performance.color}`}>
            {performance.message}
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Final Score Display */}
          <Card className="bg-gradient-to-r from-orange-500/5 to-blue-500/5 border-orange-500/20">
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="led-scoreboard inline-block px-6 py-3">
                  <span className="text-2xl font-bold text-green-400">
                    Final Score: {finalStats.totalScore}
                  </span>
                </div>
                <div className="text-lg text-muted-foreground">
                  out of {finalStats.maxPossibleScore} possible points
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Statistics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{finalStats.correctAnswers}</div>
              <div className="text-sm text-muted-foreground">Correct</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-red-500/10 border border-red-500/20">
              <div className="text-2xl font-bold text-red-400">{finalStats.incorrectAnswers}</div>
              <div className="text-sm text-muted-foreground">Incorrect</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">{percentage}%</div>
              <div className="text-sm text-muted-foreground">Accuracy</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-400">{finalStats.questionsAnswered}</div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>

          {/* Detailed Review */}
          <Card className="bg-muted/10">
            <CardHeader>
              <CardTitle className="text-lg">Game Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Questions Answered:</span>
                <span className="font-semibold">{finalStats.questionsAnswered}</span>
              </div>
              <div className="flex justify-between">
                <span>Correct Answers:</span>
                <span className="font-semibold text-green-400">{finalStats.correctAnswers}</span>
              </div>
              <div className="flex justify-between">
                <span>Incorrect Answers:</span>
                <span className="font-semibold text-red-400">{finalStats.incorrectAnswers}</span>
              </div>
              <div className="flex justify-between">
                <span>Final Accuracy:</span>
                <span className="font-semibold text-blue-400">{finalStats.accuracy}</span>
              </div>
              <div className="flex justify-between border-t pt-3">
                <span className="font-semibold">Total Score:</span>
                <span className="font-bold text-green-400">{finalStats.totalScore} / {finalStats.maxPossibleScore}</span>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={handlePlayAgain}
              className="flex-1 py-3 font-semibold bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700"
            >
              🏀 Play Again
            </Button>
            <Button
              onClick={handleViewLeaderboard}
              variant="outline"
              className="flex-1 py-3 font-semibold border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
            >
              🏆 Leaderboard
            </Button>
            <Button
              onClick={handleGoHome}
              variant="outline"
              className="flex-1 py-3 font-semibold"
            >
              🏠 Home
            </Button>
          </div>

          {/* Share Results */}
          <Card className="bg-gradient-to-r from-purple-500/5 to-pink-500/5 border-purple-500/20">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">Share your results:</p>
              <p className="font-mono text-sm bg-muted/20 p-2 rounded">
                🏀 Just scored {finalStats.totalScore}/{finalStats.maxPossibleScore} on uKnowBall NBA Trivia! 
                {percentage >= 80 ? " 🔥" : percentage >= 60 ? " 👍" : " 📚"}
              </p>
            </CardContent>
          </Card>

          {/* Keyboard Shortcuts */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              <kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> Play Again • 
              <kbd className="px-2 py-1 bg-muted rounded">L</kbd> Leaderboard • 
              <kbd className="px-2 py-1 bg-muted rounded">Q</kbd> Home
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 