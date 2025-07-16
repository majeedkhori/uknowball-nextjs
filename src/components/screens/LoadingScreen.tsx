'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export function LoadingScreen() {
  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-panel border-orange-500/20">
        <CardContent className="flex flex-col items-center space-y-6 p-8">
          {/* Animated Basketball */}
          <div className="relative">
            <div className="text-6xl animate-bounce-ball">🏀</div>
            <div className="absolute inset-0 text-6xl animate-spin-slow opacity-30">⚡</div>
          </div>

          {/* Loading Text */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
              Preparing Your Game
            </h2>
            <p className="text-muted-foreground">
              Shuffling questions and warming up the court...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="w-full space-y-2">
            <Progress value={75} className="w-full h-2" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Loading NBA trivia...</span>
              <span>75%</span>
            </div>
          </div>

          {/* Loading Tips */}
          <div className="text-center text-sm text-muted-foreground space-y-1">
            <p className="font-medium text-orange-400">💡 Pro Tip:</p>
            <p>Use keyboard shortcuts A, B, C, D to select answers quickly!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 