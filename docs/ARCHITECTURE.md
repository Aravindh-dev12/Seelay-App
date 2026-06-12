# qanbie Architecture

## Product Shape

qanbie is built around a movement-created content loop:

1. Camera opens quickly.
2. Motion creates a Mirror Moment.
3. The clip earns Energy Tokens and builds Vibe DNA.
4. Clips flow into feed, Campus Duels, World Drop, and Motion Match.
5. Life Stamps and tokens make identity persistent.
6. Motion Match unlocks chat only after mutual heart reactions during a duel-date.

## System Components

- Next.js PWA: mobile-first social surface, installable on Android, camera-ready and responsive for web sharing.
- API server: Express route modules and service boundaries for product workflows.
- PostgreSQL: source of truth for registered users, sessions, settings, identity, clips, comments, duels, token ledger, matching, chat, campaigns, and moderation.
- Redis: intended for feed cache, rate limits, real-time leaderboard state, and World Drop countdown sync.
- Cloudflare R2: intended for video, poster, and export storage through signed upload URLs.
- Razorpay: India-first payment flows for credits, Alter Ego, boosts, and exports.
- Analytics: event abstraction for Mixpanel/Firebase/Amplitude style product tracking.

## AI and Media v1

The first implementation is simulation-first:

- Motion scoring is deterministic from a `MotionVector`.
- Vibe DNA is a generated vector and strand.
- Sound Alchemy maps motion values to BPM, bass, synth, reverb, and drop moments.
- Compatibility uses vector distance.

Real MediaPipe, TensorFlow Lite, FFmpeg workers, and music generation can replace these functions without changing API contracts.

## Production Upgrade Path

- Add Firebase Admin token verification middleware.
- Replace in-memory demo stores with Prisma repositories.
- Add Redis-backed rate limiting and leaderboard materialization.
- Add R2 signed upload implementation and media processing workers.
- Add WebSocket or Server-Sent Events for live duels and World Drop countdown.
- Add push notification service for duel invites, Friday Drop, Life Stamps, and match hearts.
- Add Trust and Safety queues for underage safety, dangerous movement, harassment, and content takedowns.
