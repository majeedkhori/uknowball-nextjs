import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'uKnowBall 🏀 - NBA Trivia Game',
  description: 'Test your NBA knowledge with this interactive basketball trivia game. Challenge yourself with questions about players, teams, history, and records.',
  keywords: ['NBA', 'basketball', 'trivia', 'game', 'sports', 'quiz'],
  authors: [{ name: 'uKnowBall Team' }],
  openGraph: {
    title: 'uKnowBall 🏀 - NBA Trivia Game',
    description: 'Test your NBA knowledge with this interactive basketball trivia game',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'uKnowBall 🏀 - NBA Trivia Game',
    description: 'Test your NBA knowledge with this interactive basketball trivia game',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
