'use client'

import { useState } from 'react'
import { useGame } from '@/contexts/GameContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export function StartScreen() {
  const { startGame } = useGame()
  const [questionCount, setQuestionCount] = useState<number>(10)

  const handleStartGame = () => {
    startGame(questionCount)
  }

  const questionOptions = [
    { value: 5, label: '5 Questions (Quick)' },
    { value: 10, label: '10 Questions (Standard)' },
    { value: 15, label: '15 Questions (Extended)' },
    { value: 20, label: '20 Questions (Expert)' },
    { value: 25, label: '25 Questions (Champion)' }
  ]

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl glass-panel border-orange-500/20">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="text-6xl animate-bounce-ball">🏀</div>
          </div>
          <CardTitle className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-blue-400 bg-clip-text text-transparent">
            Welcome to uKnowBall!
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground">
            Test your NBA knowledge with our interactive trivia game. Choose your difficulty and prove you know ball! 🏀
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Game Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-orange-500/10 border border-orange-500/20">
              <div className="text-2xl mb-2">🏆</div>
              <h3 className="font-semibold text-orange-400">NBA Trivia</h3>
              <p className="text-sm text-muted-foreground">Players, teams, history, and records</p>
            </div>
            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
              <div className="text-2xl mb-2">⚡</div>
              <h3 className="font-semibold text-blue-400">Live Scoring</h3>
              <p className="text-sm text-muted-foreground">Real-time points and accuracy tracking</p>
            </div>
            <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
              <div className="text-2xl mb-2">🎯</div>
              <h3 className="font-semibold text-green-400">Leaderboard</h3>
              <p className="text-sm text-muted-foreground">Compete with other NBA fans</p>
            </div>
          </div>

          {/* Question Count Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">
              Select Number of Questions:
            </label>
            <Select 
              value={questionCount.toString()} 
              onValueChange={(value) => setQuestionCount(parseInt(value))}
            >
              <SelectTrigger className="w-full select-trigger">
                <SelectValue placeholder="Choose difficulty" />
              </SelectTrigger>
              <SelectContent className="select-content">
                {questionOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value.toString()}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Start Game Button */}
          <Button 
            onClick={handleStartGame}
            className="w-full py-6 text-lg font-bold option-button bg-gradient-to-r from-orange-600 to-blue-600 hover:from-orange-700 hover:to-blue-700"
          >
            Start Game 🏀
          </Button>

          {/* Instructions */}
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Use keyboard shortcuts for faster gameplay:</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <span><kbd className="px-2 py-1 bg-muted rounded">Enter</kbd> Start Game</span>
              <span><kbd className="px-2 py-1 bg-muted rounded">1-5</kbd> Quick Select</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 