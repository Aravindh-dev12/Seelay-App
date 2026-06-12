# qanbie API Contract

All successful responses use:

```json
{
  "data": {},
  "requestId": "request-id"
}
```

Clients should send `x-user-id` during local demo mode. Production should replace this with Firebase bearer token verification.

## Auth and User

- `POST /auth/session`: create demo/Firebase session.
- `POST /auth/register`: register a user profile, default settings, wallet, and session.
- `GET /me`: current user, wallet, Vibe DNA.
- `PATCH /me/profile`: update display name, campus, city.
- `GET /me/settings`: fetch personalized app, privacy, notification, and motion settings.
- `PATCH /me/settings`: update low-data mode, motion sensitivity, notifications.
- `GET /users`: list registered demo users.
- `GET /users/:id`: public profile.
- `GET /users/:id/clips`: public clips for profile.

## Clips and Feed

- `POST /clips/upload-url`: returns signed upload target details for the media service.
- `POST /clips`: creates a clip, computes vibe score and Sound Alchemy, earns tokens.
- `GET /feed`: ranked feed with Vibe DNA context.
- `GET /clips/:id`
- `GET /clips/:id/comments`
- `POST /clips/:id/comments`
- `GET /clips/:id/share-targets`
- `POST /clips/:id/like`
- `DELETE /clips/:id/like`
- `POST /clips/:id/save`
- `POST /clips/:id/share`
- `POST /clips/:id/report`

## Social

- `POST /users/:id/follow`
- `DELETE /users/:id/follow`
- `GET /notifications`

## Challenges and Duels

- `GET /challenges`
- `POST /challenges`
- `POST /duels`
- `GET /duels/:id`
- `POST /duels/:id/join`
- `POST /duels/:id/submit`
- `POST /duels/:id/react`
- `GET /leaderboards`

## Identity and Tokens

- `GET /me/life-stamps`
- `GET /me/vibe-dna`
- `GET /me/wallet`
- `GET /me/token-ledger`
- `POST /tokens/earn`
- `POST /tokens/spend`
- `GET /store/items`

## World Drop

- `GET /world-drop/current`
- `POST /world-drop/:id/enter`
- `POST /world-drop/:id/submit`
- `GET /world-drop/:id/leaderboard`

## Motion Match and Chat

- `GET /motion-match/suggestions`
- `POST /motion-match/:id/duel`
- `POST /motion-match/:id/heart`
- `GET /chats`
- `GET /chats/:id/messages`
- `POST /chats/:id/messages`

## Payments and Admin

- `POST /payments/razorpay/order`
- `POST /payments/razorpay/webhook`
- `GET /admin/reports`
- `POST /admin/moderation/:id/resolve`
- `GET /admin/challenges`
- `POST /admin/brand-campaigns`
