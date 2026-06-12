# seelay

seelay is a movement-first social media platform: the body is the interface, clips are created through motion, and identity is built through duels, Life Stamps, Vibe DNA, Energy Tokens, World Drop, and Motion Match.

This repository is a production-style full-stack scaffold covering the frontend, backend, database, API contracts, workflows, and launch-ready architecture. The v1 AI/media layer is intentionally simulation-first: the code exposes stable production interfaces for motion scoring, Vibe DNA, Sound Alchemy, and compatibility so real ML models can replace the simulation without changing product flows.

## Apps and Packages

- `frontend`: Next.js PWA frontend with TikTok-like vertical feed, qanbie visual identity, creation flow, duels, profile, wallet, World Drop, and Motion Match screens.
- `backend`: Node.js API server with auth, feed, clips, duels, tokens, World Drop, Motion Match, chat, payments, and admin route modules.
- `mobile`: React Native Expo app with 60fps animations, Expo Camera, on-device AI (MediaPipe Pose, Sound Alchemy), and premium dark gradient UI.
- `packages/db`: Prisma PostgreSQL schema for all core production entities.
- `packages/shared`: Shared TypeScript contracts used by web and API.
- `docs`: Architecture, API, and operational notes.
- `.github/workflows`: CI workflow for lint, tests, build, and Prisma validation.

## Quick Start

```bash
cp .env.example .env
npm install
docker compose up -d
npm run db:generate
npm run db:migrate
npm run dev
```

Frontend: `http://localhost:3000`

API: `http://localhost:4000/health`

Mobile: `cd mobile && npx expo start`

## Core Product Coverage

- Mirror Moments: camera-first creation and motion-triggered clip metadata.
- Campus Duels: challenges, duel rooms, scoring, and leaderboards.
- Life Stamps: milestone timeline backed by persistent records.
- Vibe DNA: simulated movement vectors and compatibility scoring.
- Sound Alchemy: deterministic motion-to-audio profile output.
- Alter Ego: second persona model and premium unlock workflow.
- Energy Tokens: wallet, ledger, earn/spend flows, store items.
- World Drop: Friday 8pm India challenge model and participation APIs.
- Motion Match: compatibility suggestions, live duel-date, mutual heart chat unlock.
- Social UI: like, comment drawer, share sheet, saves, messages, and personalized settings.
- Registration: demo user creation, default settings, wallet, and session-ready database model.
- Moderation/Admin: reports, content states, brand campaigns, sponsored challenges.

## Production Notes

Before a real launch, connect Firebase Admin credentials, Cloudflare R2, Razorpay webhooks, push notifications, analytics destinations, and real ML/media processing workers. The product workflows and data contracts are already shaped for those integrations.
