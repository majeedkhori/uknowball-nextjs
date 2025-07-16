export interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

export interface AnsweredQuestion {
  questionId: number
  question: string
  selectedOption: number
  selectedAnswer: string
  correctOption: number
  correctAnswer: string
  correct: boolean
  explanation: string
}

export interface GameStats {
  gameStarted: boolean
  gameEnded: boolean
  currentQuestion: number
  totalQuestions: number
  questionsAnswered: number
  questionsRemaining: number
  currentScore: number
  correctAnswers: number
  incorrectAnswers: number
  accuracy: string
  progress: number
}

export interface FinalStats {
  totalScore: number
  maxPossibleScore: number
  correctAnswers: number
  incorrectAnswers: number
  accuracy: string
  questionsAnswered: number
}

export interface LeaderboardEntry {
  id?: number
  playerName: string
  score: number
  maxScore: number
  percentage: number
  correctAnswers: number
  incorrectAnswers: number
  questionsAnswered: number
  date: string
  timestamp?: string
}

export interface LeaderboardConfig {
  name: string
  description: string
  maxEntries: number
  scoringType: 'percentage' | 'score' | 'time_bonus'
  minQualifyingQuestions: number
  minQualifyingPercentage: number
}

export interface GameState {
  currentScreen: 'start' | 'loading' | 'game' | 'gameOver'
  currentQuestion: number
  totalQuestions: number
  score: number
  selectedAnswer: number | null
  isAnswerSubmitted: boolean
  questionsAnswered: AnsweredQuestion[]
  selectedQuestions: Question[]
  finalStats: FinalStats | null
  lastQuestionCount: number
}

export interface AnswerResponse {
  success: boolean
  correct: boolean
  correctAnswer: string
  explanation: string
  selectedAnswer: string
  updatedScore: number
  gameOver: boolean
  questionNumber: number
  totalQuestions: number
  questionsAnswered: number
  finalStats?: FinalStats
}

export interface QuestionResponse {
  success: boolean
  question: Question
  questionNumber: number
  totalQuestions: number
  currentScore: number
  questionsAnswered: number
}

export type PerformanceLevel = 'excellent' | 'good' | 'study'

export interface Performance {
  level: PerformanceLevel
  title: string
  message: string
  color: string
} 