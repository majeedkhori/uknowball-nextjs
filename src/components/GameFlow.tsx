'use client'

import { useGame } from '@/contexts/GameContext'
import { useKeyboardHandlers } from '@/hooks/useKeyboardHandlers'
import { StartScreen } from '@/components/screens/StartScreen'
import { LoadingScreen } from '@/components/screens/LoadingScreen'
import { GameScreen } from '@/components/screens/GameScreen'
import { GameOverScreen } from '@/components/screens/GameOverScreen'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export function GameFlow() {
  const { state } = useGame()
  
  // Enable keyboard handlers for the entire game
  useKeyboardHandlers()

  const renderScreen = () => {
    switch (state.currentScreen) {
      case 'start':
        return <StartScreen />
      case 'loading':
        return <LoadingScreen />
      case 'game':
        return <GameScreen />
      case 'gameOver':
        return <GameOverScreen />
      default:
        return <StartScreen />
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 w-full">
        {renderScreen()}
      </main>
      <Footer />
    </div>
  )
} 