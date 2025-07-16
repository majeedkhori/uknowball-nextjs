'use client'

import { GameProvider } from '@/contexts/GameContext'
import { GameFlow } from '@/components/GameFlow'

export default function Home() {
  return (
    <GameProvider>
      <GameFlow />
    </GameProvider>
  )
}
