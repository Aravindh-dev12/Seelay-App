# qanbie Runbook

## Local Setup

```bash
# Setup env
cp .env.example .env

# Install packages
npm install

# Run database & cache (Docker)
docker compose up -d

# Generate database client & run migrations
npm run db:generate
npm run db:migrate

# Start frontend and backend concurrently
npm run dev
```

### Running Parts Individually

- **Backend (API) Only**: `npm --workspace @seelay/api run dev`
- **Frontend (Web PWA) Only**: `npm --workspace seelay-frontend run start`
- **Mobile (Expo App) Only**: `cd mobile && npx expo start`

## AI Engine Configuration

- Local LLM: Install **Ollama** and run your preferred model (e.g. `gemma:2b`).
- Cloud LLM fallback: Input your API key under `GEMINI_API_KEY` inside `.env` to fallback to Gemini when Ollama is offline.

## Theme & Mascot

- Palette: Strictly monochrome (Black, White, Silver, Grey). No yellow, gold, or copper gradients or borders.
- Mascot: The Seelay TV capsule visor character handles gesture tracking, face-mesh scanning, and voice chat.

- `DATABASE_URL`: PostgreSQL connection.
- `REDIS_URL`: Redis connection.
- `NEXT_PUBLIC_API_URL`: API base URL for the PWA.
- Firebase credentials: required before real auth launch.
- R2 credentials: required before real clip uploads.
- Razorpay credentials: required before paid store launch.

## Launch Gates

- Age gate and Terms acceptance enabled.
- Firebase token verification enforced.
- Clip upload virus/content checks active.
- Dangerous movement warning shown before duels and World Drop.
- Moderation queue staffed before public launch.
- Token ledger idempotency enabled for payments and rewards.
- Razorpay webhook signature verification enabled.
- Analytics events validated for onboarding, creation, share, duel, retention, and match funnel.

## Key Metrics

- D1, D7, D30 retention.
- Clip creation rate.
- Share rate to WhatsApp/Reels.
- Duel completion rate.
- World Drop participation rate.
- Motion Match heart-to-chat unlock rate.
- Token earn/spend ratio.
- Report rate per 1,000 clips.
