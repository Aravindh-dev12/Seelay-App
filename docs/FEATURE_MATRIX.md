# qanbie Feature Matrix

| Feature | Frontend | API | DB | v1 Status |
| --- | --- | --- | --- | --- |
| Mirror Moments | Create screen, feed cards | `/clips`, `/clips/upload-url` | `Clip`, `ClipAsset`, `ClipMetric` | Simulation-ready |
| Campus Duels | Duels screen | `/duels`, `/leaderboards` | `Challenge`, `Duel`, `DuelSubmission` | Simulation-ready |
| Life Stamps | Profile tiles | `/me/life-stamps` | `LifeStamp` | Ready for milestone rules |
| Vibe DNA | Profile strand | `/me/vibe-dna` | `VibeDna` | Simulated vector |
| Sound Alchemy | Feed metrics | clip creation output | `Clip.soundAlchemy` | Simulated mapping |
| Alter Ego | Profile/store | store and profile models | `AlterEgo`, `StoreItem` | Premium-ready |
| Energy Tokens | Header wallet/store | `/tokens/*`, `/store/items` | `TokenWallet`, `TokenLedger` | Ledger-shaped |
| World Drop | Countdown screen | `/world-drop/*` | `WorldDrop`, `WorldDropEntry` | Event-ready |
| Motion Match | Match screen | `/motion-match/*`, `/chats/*` | `MotionMatch`, `Chat`, `Message` | Chat unlock-ready |
| Comments | Comment drawer | `/clips/:id/comments` | `Comment` | Social-ready |
| Share Sheet | Share drawer | `/clips/:id/share-targets`, `/clips/:id/share` | `ClipMetric`, `AnalyticsEvent` | Token reward-ready |
| User Settings | Settings drawer | `/me/settings` | `UserSettings` | Personalized |
| Registration | Register drawer | `/auth/register` | `User`, `UserSession`, `TokenWallet` | Demo auth-ready |
| Admin/Moderation | Admin API | `/admin/*` | `Report`, `BrandCampaign` | Workflow-ready |
