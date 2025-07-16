'use client'

import React, { createContext, useContext, useReducer, useCallback } from 'react'
import { GameState, Question, AnsweredQuestion, FinalStats } from '@/types/game'
import { nbaQuestions } from '@/lib/questions'
import { shuffleArray } from '@/lib/utils'

interface GameContextType {
  state: GameState
  startGame: (questionCount: number) => void
  loadQuestion: (question: Question, questionNumber: number, totalQuestions: number, currentScore: number) => void
  selectAnswer: (answerIndex: number) => void
  submitAnswer: () => void
  nextQuestion: () => void
  showResults: (finalStats: FinalStats) => void
  resetGame: () => void
  quitGame: () => void
  setScreen: (screen: GameState['currentScreen']) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

type GameAction =
  | { type: 'START_GAME'; payload: { totalQuestions: number } }
  | { type: 'LOAD_QUESTION'; payload: { question: Question; questionNumber: number; totalQuestions: number; currentScore: number } }
  | { type: 'SELECT_ANSWER'; payload: { answerIndex: number } }
  | { type: 'SUBMIT_ANSWER' }
  | { type: 'NEXT_QUESTION' }
  | { type: 'SHOW_RESULTS'; payload: { finalStats: FinalStats } }
  | { type: 'RESET_GAME' }
  | { type: 'QUIT_GAME' }
  | { type: 'SET_SCREEN'; payload: { screen: GameState['currentScreen'] } }

const initialState: GameState = {
  currentScreen: 'start',
  currentQuestion: 0,
  totalQuestions: 0,
  score: 0,
  selectedAnswer: null,
  isAnswerSubmitted: false,
  questionsAnswered: [],
  selectedQuestions: [],
  finalStats: null,
  lastQuestionCount: 10,
}

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME': {
      // TODO: Re-enable loading screen when we implement API fetching
      // For now, bypass loading since questions are stored locally
      const shuffledQuestions = shuffleArray([...nbaQuestions])
      const selectedQuestions = shuffledQuestions.slice(0, action.payload.totalQuestions)
      
      return {
        ...initialState,
        currentScreen: 'game', // Skip loading screen for now
        totalQuestions: action.payload.totalQuestions,
        lastQuestionCount: action.payload.totalQuestions,
        selectedQuestions,
        currentQuestion: 1, // Start with first question
      }
    }
    
    case 'LOAD_QUESTION':
      return {
        ...state,
        currentScreen: 'game',
        currentQuestion: action.payload.questionNumber - 1,
        score: action.payload.currentScore,
        selectedAnswer: null,
        isAnswerSubmitted: false,
        selectedQuestions: state.selectedQuestions.length === action.payload.questionNumber - 1
          ? [...state.selectedQuestions, action.payload.question]
          : state.selectedQuestions.map((q, index) => 
              index === action.payload.questionNumber - 1 ? action.payload.question : q
            )
      }
    
    case 'SELECT_ANSWER':
      return {
        ...state,
        selectedAnswer: action.payload.answerIndex,
      }
    
    case 'SUBMIT_ANSWER': {
      if (state.selectedAnswer === null || !state.selectedQuestions[state.currentQuestion - 1]) {
        return state
      }

      const currentQ = state.selectedQuestions[state.currentQuestion - 1]
      const isCorrect = state.selectedAnswer === currentQ.correct
      const pointsEarned = isCorrect ? 10 : 0
      
      const answeredQuestion: AnsweredQuestion = {
        questionId: currentQ.id,
        question: currentQ.question,
        selectedOption: state.selectedAnswer,
        selectedAnswer: currentQ.options[state.selectedAnswer],
        correctOption: currentQ.correct,
        correctAnswer: currentQ.options[currentQ.correct],
        correct: isCorrect,
        explanation: currentQ.explanation
      }

      const newQuestionsAnswered = [...state.questionsAnswered, answeredQuestion]
      const newScore = state.score + pointsEarned

      return {
        ...state,
        isAnswerSubmitted: true,
        score: newScore,
        questionsAnswered: newQuestionsAnswered,
      }
    }

    case 'NEXT_QUESTION': {
      // Check if this was the last question
      const isGameComplete = state.currentQuestion >= state.totalQuestions

      if (isGameComplete) {
        // Calculate final stats and go to game over screen
        const finalStats: FinalStats = {
          totalScore: state.score,
          maxPossibleScore: state.totalQuestions * 10,
          correctAnswers: state.questionsAnswered.filter(q => q.correct).length,
          incorrectAnswers: state.questionsAnswered.filter(q => !q.correct).length,
          accuracy: Math.round((state.questionsAnswered.filter(q => q.correct).length / state.questionsAnswered.length) * 100) + '%',
          questionsAnswered: state.questionsAnswered.length
        }

        return {
          ...state,
          finalStats,
          currentScreen: 'gameOver'
        }
      } else {
        // Move to next question
        return {
          ...state,
          currentQuestion: state.currentQuestion + 1,
          selectedAnswer: null,
          isAnswerSubmitted: false
        }
      }
    }
    
    case 'SHOW_RESULTS':
      return {
        ...state,
        currentScreen: 'gameOver',
        finalStats: action.payload.finalStats,
      }
    
    case 'RESET_GAME':
      return {
        ...initialState,
        lastQuestionCount: state.lastQuestionCount,
      }
    
    case 'QUIT_GAME':
      return {
        ...initialState,
        lastQuestionCount: state.lastQuestionCount,
      }
    
    case 'SET_SCREEN':
      return {
        ...state,
        currentScreen: action.payload.screen,
      }
    
    default:
      return state
  }
}

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const startGame = useCallback((questionCount: number) => {
    dispatch({ type: 'START_GAME', payload: { totalQuestions: questionCount } })
  }, [])

  const loadQuestion = useCallback((question: Question, questionNumber: number, totalQuestions: number, currentScore: number) => {
    dispatch({ 
      type: 'LOAD_QUESTION', 
      payload: { question, questionNumber, totalQuestions, currentScore } 
    })
  }, [])

  const selectAnswer = useCallback((answerIndex: number) => {
    dispatch({ type: 'SELECT_ANSWER', payload: { answerIndex } })
  }, [])

  const submitAnswer = useCallback(() => {
    dispatch({ type: 'SUBMIT_ANSWER' })
  }, [])

  const nextQuestion = useCallback(() => {
    dispatch({ type: 'NEXT_QUESTION' })
  }, [])

  const showResults = useCallback((finalStats: FinalStats) => {
    dispatch({ type: 'SHOW_RESULTS', payload: { finalStats } })
  }, [])

  const resetGame = useCallback(() => {
    dispatch({ type: 'RESET_GAME' })
  }, [])

  const quitGame = useCallback(() => {
    dispatch({ type: 'QUIT_GAME' })
  }, [])

  const setScreen = useCallback((screen: GameState['currentScreen']) => {
    dispatch({ type: 'SET_SCREEN', payload: { screen } })
  }, [])

  const value: GameContextType = {
    state,
    startGame,
    loadQuestion,
    selectAnswer,
    submitAnswer,
    nextQuestion,
    showResults,
    resetGame,
    quitGame,
    setScreen,
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
} 