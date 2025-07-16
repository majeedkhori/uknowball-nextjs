'use client'

import { useEffect } from 'react'
import { useGame } from '@/contexts/GameContext'

export function useKeyboardHandlers() {
  const { state, selectAnswer, submitAnswer, quitGame, resetGame, setScreen, startGame } = useGame()

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase()

      // Prevent default behavior for game keys
      if (['a', 'b', 'c', 'd', 'enter', 'q', 'l', '1', '2', '3', '4', '5'].includes(key)) {
        event.preventDefault()
      }

      // Handle different screens
      switch (state.currentScreen) {
        case 'start':
          handleStartScreenKeys(key)
          break
        case 'game':
          handleGameScreenKeys(key)
          break
        case 'gameOver':
          handleGameOverScreenKeys(key)
          break
        default:
          break
      }
    }

    const handleStartScreenKeys = (key: string) => {
      if (key === 'enter') {
        startGame(10) // Default to 10 questions
      } else if (['1', '2', '3', '4', '5'].includes(key)) {
        const questionCounts = [5, 10, 15, 20, 25]
        const questionCount = questionCounts[parseInt(key) - 1]
        if (questionCount) {
          startGame(questionCount)
        }
      }
    }

    const handleGameScreenKeys = (key: string) => {
      if (!state.isAnswerSubmitted) {
        // Handle answer selection
        if (key === 'a') selectAnswer(0)
        else if (key === 'b') selectAnswer(1)
        else if (key === 'c') selectAnswer(2)
        else if (key === 'd') selectAnswer(3)
        else if (key === 'enter' && state.selectedAnswer !== null) {
          submitAnswer()
        }
      }
      
      // Quit game
      if (key === 'q') {
        quitGame()
      }
    }

    const handleGameOverScreenKeys = (key: string) => {
      if (key === 'enter') {
        resetGame()
        setScreen('start')
      } else if (key === 'l') {
        // TODO: Show leaderboard modal
        console.log('Show leaderboard')
      } else if (key === 'q') {
        resetGame()
        setScreen('start')
      }
    }

    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [state, selectAnswer, submitAnswer, quitGame, resetGame, setScreen, startGame])
} 