# qanbie Technology Stack

## Architecture
Three separate workspaces: `frontend` (Next.js web), `backend` (Express API), `mobile` (React Native Expo).

---

## Frontend — Web (`frontend/`)
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + custom gradient tokens
- **Theme**: Premium dark gradient black (Sand, Ash, Copper, Sage)
- **Purpose**: Web PWA version of qanbie

---

## Mobile App (`mobile/`)
- **Framework**: React Native with Expo SDK 52
- **Navigation**: React Navigation (Bottom Tabs + Native Stack)
- **Animations**: Lottie, React Native Reanimated (60fps swipe gestures, elastic buttons)
- **Camera**: Expo Camera API (low-latency, real-time preview, instant capture)
- **Haptics**: Expo Haptics (impact + notification feedback)
- **Audio**: Tone.js / Web Audio API for Sound Alchemy
- **On-Device AI**:
  - MediaPipe Pose (33 keypoints, real-time body detection)
  - TensorFlow Lite (lightweight ML models)
  - Face Mesh API (emotion detection)
- **Media**: FFmpeg on-device, Cloudflare R2 storage, HLS streaming
- **Low-Data Mode**: Auto-compress, background upload with retry

---

## Backend — API (`backend/`)
- **Runtime**: Node.js + Express
- **Auth**: Firebase Auth (Google sign-in, phone OTP)
- **Database**: PostgreSQL via Prisma ORM
- **Cache**: Redis (feed caching, leaderboard real-time updates, World Drop sync)
- **Storage**: Cloudflare R2 (zero egress fees)
- **Payments**: Razorpay integration
- **AI Pipeline**: Custom ML for Vibe DNA + Sound Alchemy (simulation-first, replaceable)

---

## Analytics & Growth
- **Mixpanel**: DAU/MAU, share rate, remix rate, D1/D7/D30 retention
- **Firebase Analytics**: Funnel analysis, onboarding drop-off, feature adoption
- **Branch.io**: Deep links, referral tracking, App Store attribution
- **Amplitude**: A/B test measurement (7 tests running simultaneously)

---

## Shared Packages (`packages/`)
- `@qanbie/shared`: TypeScript contracts, types, enums used by all workspaces
- `@qanbie/db`: Prisma schema + migrations
