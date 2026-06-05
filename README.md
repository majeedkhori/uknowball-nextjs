# uKnowBall 🏀

An interactive NBA trivia game built with Next.js, TypeScript, and Tailwind CSS. Test your basketball knowledge across players, teams, history, and records — with configurable game length, live scoring, instant explanations, and full keyboard support.

## Features

- **Configurable game length** — choose 5, 10, 15, 20, or 25 questions (Quick → Champion).
- **Live scoring & accuracy** — points, correct/incorrect counts, and a progress bar update in real time.
- **Instant explanations** — every question reveals the correct answer and the story behind it once you respond.
- **Performance summary** — the game-over screen grades your run (excellent / good / keep studying) with final stats.
- **Full keyboard controls** — `A`–`D` to choose an answer, `Enter` to submit, number keys to set length, `Q` to quit.
- **Polished, responsive UI** — accessible components built on Radix UI (shadcn/ui), NBA-themed with smooth animations.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **UI:** React 19, Tailwind CSS v4, Radix UI + shadcn/ui, `lucide-react` icons
- **State:** React Context + custom hooks
- **Tooling:** ESLint

## Architecture

A single-page, client-driven game with a clean separation of concerns:

```
src/
├── app/                       # App Router entry (layout, page, globals)
├── components/
│   ├── screens/               # Start, Loading, Game, GameOver screens
│   ├── layout/                # Header, Footer
│   ├── ui/                    # Reusable shadcn/ui primitives (button, card, dialog, …)
│   └── GameFlow.tsx           # Renders the active screen based on game state
├── contexts/
│   └── GameContext.tsx        # Central game state + actions
├── hooks/
│   └── useKeyboardHandlers.ts # Keyboard controls, scoped per screen
├── lib/
│   ├── questions.ts           # NBA question bank
│   └── utils.ts               # Helpers (cn, etc.)
└── types/
    └── game.ts                # Shared TypeScript types
```

Game state (current screen, question index, score, answered questions, final stats) lives in `GameContext`; `GameFlow` swaps screens based on `currentScreen`. Questions are strongly typed and stored in `lib/questions.ts`.

## Getting Started

```bash
# 1. Clone
git clone https://github.com/majeedkhori/uknowball-nextjs.git
cd uknowball-nextjs

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to play.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint |

## How to Play

1. Pick how many questions you want (5–25).
2. Answer each multiple-choice question with your mouse or keys **A–D**.
3. Submit with **Enter**, read the explanation, and continue.
4. Review your final score, accuracy, and performance grade — then run it back.

## Roadmap

- Persistent **leaderboard** to compete on score and accuracy (UI hook in place).
- **API-backed question fetching** to grow and rotate the question bank.

---

Built by [Majeed Khori](https://github.com/majeedkhori).
