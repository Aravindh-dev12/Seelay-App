# qanbie Backend API

Node.js/Express API server powering the qanbie movement-first social platform.

## Quick Start

```bash
# From the monorepo root
cd backend

# 1. Install dependencies (already done if you ran npm install at root)
npm install

# 2. Copy environment variables
cp .env.example .env

# 3. Start the development server
npm run dev
```

The API will be available at `http://localhost:4000`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server with hot reload (tsx watch) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm run start` | Run the compiled production build |
| `npm run lint` | Type-check without emitting |
| `npm run test` | Run Node.js test suite |

## Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

| Variable | Purpose |
|----------|---------|
| `API_PORT` | Server port (default: 4000) |
| `FIREBASE_PROJECT_ID` | Firebase Admin SDK project ID |
| `FIREBASE_CLIENT_EMAIL` | Firebase service account email |
| `FIREBASE_PRIVATE_KEY` | Firebase service account private key |
| `REDIS_URL` | Redis connection string (e.g. `redis://localhost:6379`) |
| `R2_ACCOUNT_ID` | Cloudflare R2 account ID |
| `R2_ACCESS_KEY_ID` | R2 access key |
| `R2_SECRET_ACCESS_KEY` | R2 secret key |
| `R2_BUCKET` | R2 bucket name (default: qanbie-clips) |
| `MIXPANEL_TOKEN` | Mixpanel project token |
| `AMPLITUDE_API_KEY` | Amplitude API key |
| `BRANCH_KEY` | Branch.io API key |

## Services Architecture

- **Firebase Auth** (`src/services/firebase.ts`) — Token verification, user management
- **Redis** (`src/services/redis.ts`) — Feed cache, leaderboards, World Drop sync, online presence
- **Cloudflare R2** (`src/services/r2.ts`) — Clip upload and signed URL generation
- **Analytics** (`src/services/analytics.ts`) — Unified Mixpanel, Firebase, Branch, Amplitude tracking

## API Endpoints

### Auth
- `POST /auth/session` — Login (firebase or demo)
- `POST /auth/register` — Create account
- `GET /me` — Current user profile
- `PATCH /me/profile` — Update profile
- `PATCH /me/settings` — Update settings

### Content
- `GET /feed` — Personalized feed
- `POST /clips` — Create clip
- `GET /clips/:id` — Get clip
- `POST /clips/:id/like` — Like clip
- `POST /clips/:id/share` — Share clip
- `GET /clips/:id/comments` — Get comments

### Duels
- `GET /challenges` — List challenges
- `POST /duels` — Create duel
- `POST /duels/:id/join` — Join duel
- `POST /duels/:id/submit` — Submit clip

### World Drop
- `GET /world-drop/current` — Current event
- `POST /world-drop/:id/enter` — Enter event
- `POST /world-drop/:id/submit` — Submit entry

### Motion Match
- `GET /motion-match/suggestions` — Get matches
- `POST /motion-match/:id/heart` — Heart a match
- `POST /motion-match/:id/duel` — Start duel-date

### Chat
- `GET /chats` — List chats
- `GET /chats/:id` — Get messages
- `POST /chats/:id` — Send message

## Health Check

```bash
curl http://localhost:4000/health
```

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express 4.x
- **Language**: TypeScript 5.x
- **Database**: PostgreSQL + Prisma
- **Cache**: Redis (ioredis)
- **Auth**: Firebase Admin SDK
- **Storage**: Cloudflare R2 (S3-compatible)
- **Validation**: Zod
