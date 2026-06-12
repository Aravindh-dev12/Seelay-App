# qanbie Runbook

## Local Setup

```bash
cp .env.example .env
npm install
docker compose up -d
npm run db:generate
npm run db:migrate
npm run dev
```

## Environment Checklist

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
