'use client'

import { useEffect, useState } from 'react'
import { useGame } from '@/contexts/GameContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'

export function GameScreen() {
  const { state, selectAnswer, submitAnswer, nextQuestion, quitGame } = useGame()
  const [countdown, setCountdown] = useState<number>(0)

  // Reset countdown when question changes
  useEffect(() => {
    setCountdown(0)
  }, [state.currentQuestion])

  // Auto-progress timer after answer submission
  useEffect(() => {
    if (state.isAnswerSubmitted && countdown === 0) {
      setCountdown(6) // Start 6-second countdown
    }
  }, [state.isAnswerSubmitted, countdown])

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        if (countdown === 1) {
          nextQuestion() // Progress to next question or game over
        } else {
          setCountdown(countdown - 1)
        }
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [countdown, nextQuestion])

  if (!state.selectedQuestions || state.selectedQuestions.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-panel border-red-500/20">
          <CardContent className="text-center p-8">
            <p className="text-red-400">No questions loaded. Please start a new game.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentQuestion = state.selectedQuestions[state.currentQuestion - 1]
  const progress = ((state.currentQuestion - 1) / state.totalQuestions) * 100

  if (!currentQuestion) {
    return (
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md glass-panel border-red-500/20">
          <CardContent className="text-center p-8">
            <p className="text-red-400">Question not found. Please start a new game.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleAnswerSelect = (answerIndex: number) => {
    if (!state.isAnswerSubmitted) {
      selectAnswer(answerIndex)
    }
  }

  const handleSubmitAnswer = () => {
    if (state.selectedAnswer !== null && !state.isAnswerSubmitted) {
      submitAnswer()
    }
  }

  const getAnswerButtonClass = (answerIndex: number) => {
    const baseClass = "w-full p-4 text-left font-medium transition-all duration-200 option-button"
    
    if (state.isAnswerSubmitted) {
      if (answerIndex === currentQuestion.correct) {
        return `${baseClass} bg-green-600/20 border-green-500 text-green-400 hover:bg-green-600/30`
      } else if (answerIndex === state.selectedAnswer) {
        return `${baseClass} bg-red-600/20 border-red-500 text-red-400 hover:bg-red-600/30`
      } else {
        return `${baseClass} opacity-50`
      }
    }
    
    if (state.selectedAnswer === answerIndex) {
      return `${baseClass} bg-orange-600/20 border-orange-500 text-orange-400`
    }
    
    return `${baseClass} hover:bg-orange-600/10 hover:border-orange-500/50`
  }

  const getAnswerIcon = (answerIndex: number) => {
    if (state.isAnswerSubmitted) {
      if (answerIndex === currentQuestion.correct) {
        return "✅"
      } else if (answerIndex === state.selectedAnswer) {
        return "❌"
      }
    }
    return ['🅰️', '🅱️', '🅲', '🅳'][answerIndex] || ''
  }

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl glass-panel border-orange-500/20">
        <CardHeader className="space-y-4">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Question {state.currentQuestion} of {state.totalQuestions}</span>
              <span>{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="w-full h-2" />
          </div>

          {/* Current Score */}
          <div className="text-center">
            <div className="led-scoreboard inline-block px-4 py-2">
              <span className="text-green-400 text-lg font-bold">Score: {state.score}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Question */}
          <Card className="bg-gradient-to-r from-orange-500/5 to-blue-500/5 border-orange-500/20">
            <CardHeader>
              <CardTitle className="text-xl text-center">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
          </Card>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={() => handleAnswerSelect(index)}
                disabled={state.isAnswerSubmitted}
                className={getAnswerButtonClass(index)}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="text-lg">{getAnswerIcon(index)}</span>
                  <span className="flex-1 text-left">{option}</span>
                  <kbd className="px-2 py-1 bg-muted/50 rounded text-xs">
                    {['A', 'B', 'C', 'D'][index]}
                  </kbd>
                </div>
              </Button>
            ))}
          </div>

          {/* Explanation (shown after answer submission) */}
          {state.isAnswerSubmitted && (
            <Card className="bg-blue-500/5 border-blue-500/20">
              <CardContent className="p-4">
                <CardDescription className="text-base">
                  <strong>Explanation:</strong> {currentQuestion.explanation}
                </CardDescription>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center">
            {!state.isAnswerSubmitted ? (
              <>
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={state.selectedAnswer === null}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  Submit Answer ✅
                </Button>
                <Button
                  onClick={quitGame}
                  variant="outline"
                  className="border-red-500/50 text-red-400 hover:bg-red-500/10 px-8 py-3"
                >
                  Quit Game
                </Button>
              </>
                         ) : (
               <div className="text-center text-muted-foreground">
                 <p>
                   {countdown > 0 
                     ? `Next question in ${countdown}...` 
                     : 'Loading next question...'
                   }
                 </p>
               </div>
             )}
          </div>

          {/* Keyboard Shortcuts Reminder */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              Use <kbd className="px-2 py-1 bg-muted rounded">A</kbd>, 
              <kbd className="px-2 py-1 bg-muted rounded">B</kbd>, 
              <kbd className="px-2 py-1 bg-muted rounded">C</kbd>, 
              <kbd className="px-2 py-1 bg-muted rounded">D</kbd> to select answers quickly
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 