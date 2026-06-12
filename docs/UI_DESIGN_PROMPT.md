# qanbie — Complete UI Design Prompt

Use this prompt with Stitch, v0, or any AI UI generator. It covers every screen in the app.

---

## Product Brief

**qanbie** is a movement-first social media platform. The body is the interface — users create short video clips through motion (jump, wave, nod, run). Content flows into a TikTok-like vertical feed, campus duels, weekly World Drops, and Motion Match dating. Identity is built through Vibe DNA, Life Stamps, Energy Tokens, and Alter Ego personas.

**Platform**: Mobile-first PWA (iOS + Android web). Dark theme. Installable. 460px max content width.

---

## Design System (Gradient Black — Premium Minimal)

- **Background**: pure black base with subtle radial gradient `radial-gradient(ellipse at top, #0f0f14 0%, #050508 50%, #000000 100%)`
- **Surface cards**: `bg-white/[0.02]`, 1px `border-white/[0.05]`, subtle inner shadow for depth
- **Primary accent (Gradient Sand)**: `linear-gradient(135deg, #d4b896 0%, #b8956a 50%, #9a7b52 100%)` — all CTAs, active nav, DNA highlights, send buttons, badges, token rewards
- **Secondary accent (Gradient Ash)**: `linear-gradient(135deg, #6b6b6b 0%, #4a4a4a 100%)` — secondary buttons, disabled states, cancel actions
- **Tertiary accent (Gradient Copper)**: `linear-gradient(135deg, #c4907a 0%, #a06b56 100%)` — alerts, live badges, heart actions, match states, errors
- **Success accent (Gradient Sage)**: `linear-gradient(135deg, #7da88a 0%, #5a8a6a 100%)` — earned tokens, success confirmations, published states
- **Text primary**: pure white `#ffffff`
- **Text secondary**: warm gray `#b8b5b0`
- **Text muted**: stone `#6b6864`
- **Typography**: bold/black headings, semibold body, 11px-2xl scale
- **Radius**: rounded-lg (10px) cards, rounded-full pills, rounded-t-3xl bottom sheets
- **Effects**: no neon glow. Use subtle gradient borders, depth via layering and soft shadows, thin 1px lines with low opacity

**All buttons are gradient fills**: Primary = Gradient Sand, Secondary = Gradient Ash, Danger = Gradient Copper, Success = Gradient Sage. Text on all gradient buttons is near-black `#0a0a0a`.

---

## Connected Workflow Map (All 18 Pages)

This is the navigation flow between every screen. Use this to ensure every design is connected.

```
[Launch] → Onboarding (3 slides) → Register Sheet → Feed
                                              |
            ┌─────────────────────────────────┼─────────────────────────────────┐
            |                                 |                                 |
   Feed ←→ Comments Sheet        Feed ←→ Share Sheet               Feed ←→ Profile (tap creator)
            |                                 |                                 |
            |                                 |                                 |
   Feed ←→ Duels Screen ←→ Duel Room         Feed ←→ Notifications Screen    Profile ←→ Settings Page
            |                                 |                                 |
            |                                 |                                 |
   Feed ←→ Create Screen ←→ Published       Duels ←→ Duel Room              Profile ←→ Store Screen
            |                                                                     |
            |                                                                     |
   World Drop ←→ Enter → Duel Room                                        Profile ←→ Wallet Screen
            |                                                                     |
            |                                                                     |
   Inbox ←→ Motion Match ←→ Profile                                      Profile ←→ Motion Match Screen
            |                                                                     |
            |                                                                     |
   Inbox ←→ Chat Conversation                                             Profile ←→ Life Stamps Screen
            |                                                                     |
            |                                                                     |
   Feed ←→ Search/Discover                                              Profile ←→ Register Sheet (demo)
```

**Bottom Nav connects all 7 main tabs**: Feed, Create, Duels, World Drop, Motion Match, Inbox, Profile. Any screen can return to any main tab via bottom nav.

**Route Architecture (Next.js App Router)**:
- `/` → redirects to `/feed`
- `/feed` — Feed page (vertical scroll)
- `/create` — Create Mirror Moment
- `/duels` — Campus Duels list
- `/duels/[id]` — Duel Room (live challenge)
- `/world-drop` — World Drop event + leaderboard
- `/motion-match` — Motion Match dating
- `/inbox` — Chat list
- `/inbox/[id]` — Chat conversation
- `/profile` — User profile
- `/profile/settings` — Settings page (was sheet)
- `/profile/store` — Token store
- `/profile/life-stamps` — Earned stamps
- `/search` — Search/Discover
- `/notifications` — Notifications list

---

## 1. Feed Screen
**Purpose**: Main content consumption. TikTok-style vertical scroll.
**Entry points**: Launch (after register), any bottom nav "Feed" tap, Create "Published" auto-return, Duel Room "Back to Feed".
**Exits**: Heart → +5 tokens + Motion Match suggestion popup | Comments icon → Comments Sheet | Share icon → Share Sheet | Save icon → bookmarked | Duel icon → Duels Screen | Creator avatar → Profile Screen | Bell → Notifications | Bottom nav → any main tab.
**Layout per card:**

- Background: looping video `opacity-70`, dark gradient overlay from bottom (black to transparent)
- Top-left: "Motion auto-captured" pill — 1px gradient sand border, gradient sand text, ScanFace icon
- Creator info: display name (2xl black, white), username + campus (sm, warm gray), caption (base semibold, white)
- Challenge tag: bold gradient sand text
- Metrics row: 3 metric cards (Vibe, BPM, Bass) with gradient sand values
- Right action rail (66px): circular buttons, `bg-white/[0.03]`, 1px white/8 border, white icons
  - Heart — tap: scale bounce + fills gradient copper + "+5" token badge (gradient sand) slides up
  - Comments → Comments Sheet
  - Share → Share Sheet
  - Save → fills gradient sand
  - Duel → Duels Screen
- Bottom nav: 6 tabs, active = gradient sand bg + dark text, inactive = stone text
- Header (sticky, blur): tagline (xs stone) + "qanbie" logo + Bell → Notifications + Token pill (gradient sand border)

**Interactions**: Tap heart = like + earn 5 tokens. Tap comments = open Comments Sheet. Tap share = open Share Sheet. Tap creator name/avatar → Profile Screen.

---

## 2. Create Screen (Mirror Moment)
**Purpose**: Capture motion-triggered video clips.
**Entry points**: Bottom nav "Create" tap.
**Exits**: Capture → Processing → Published → auto-return Feed. Cancel → Feed.
**Workflow**: Tap "Create" nav → Camera preview. Tap gradient sand "Capture Mirror Moment" CTA → 3-2-1 countdown → Recording (5-15s) → Processing (DNA animation) → "Published!" (+100 tokens) → Feed loads with new clip at top.

**Layout:**
- Full camera preview with gradient black radial overlay from edges
- Top: "Sensitivity 72" pill (gradient sand border) + "AutoTrigger armed" pill (gradient copper border)
- Center: Camera icon (white) + "Move to create" (2xl black, white) + subtext (warm gray)
- Bottom: big **gradient sand CTA** "Capture Mirror Moment" with Zap icon
- Filter chips: "Warm Raga", "Campus Heat", "Bass Bloom" — `bg-white/[0.02]`, 1px white/5 border

**States**:
- Pre-capture: preview + CTA ready
- Recording: red dot + timer, "Tap to stop"
- Processing: fullscreen dark overlay, DNA strand animation (gradient sand lines), gradient sand progress bar, "Turning motion into music..."
- Published: gradient sage checkmark, "Published!", "+100 Energy Tokens" badge, "Back to Feed" gradient ash CTA

---

## 3. Duels Screen (Campus Duels)
**Purpose**: Browse and enter motion challenges.
**Entry points**: Bottom nav "Duels" tap, Feed "Duel" action.
**Exits**: Tap card → Duel Room. Bottom nav → any main tab.
**Workflow**: Tap "Duels" nav → scroll challenges → tap card → Duel Room opens → after duel → score card → back here with updated rank.

**Layout:**
- Header: Swords icon (gradient copper) + "Campus Duels" (2xl black, white)
- Vertical stack of duel cards, each `bg-white/[0.02]`, 1px white/5 border, rounded-xl:
  - Title (lg black, white), campus + duration + "live scoring" (sm, stone), token badge (gradient sand pill "+200", dark text)
  - Description (warm gray)
  - Metrics: Motion, Rhythm, Crowd
  - "Enter Duel" **gradient sand CTA**
- Active duels: live pulse dot (gradient copper)
- Cards: "Campus Footwork Duel", "Reaction Snap", "Jump Bass Drop"

---

## 4. World Drop Screen
**Purpose**: Weekly national challenge entry and leaderboard.
**Entry points**: Bottom nav "Drop" tap.
**Exits**: Tap "Enter" → Duel Room (if active). Tap "Set Reminder" → system reminder. Tap "Share Invite" → Share Sheet. Bottom nav → any main tab.
**Workflow**: Tap "Drop" nav → if active: enter challenge. If countdown: set reminder or share. After submit: leaderboard updates.

**Layout:**
- Header: RadioTower icon (gradient sand) + "World Drop" (2xl black, white)
- Hero card (1px gradient sand border, `bg-white/[0.02]`):
  - Badge: "Every Friday · 8:00 PM IST" (gradient sand text)
  - Title: "India Pulse Drop" (3xl black, white)
  - Description (warm gray)
  - Metrics: Reward 500, Window 60s, Your Rank #42
- Big **gradient sand CTA**: "Enter World Drop" with Trophy icon
- Countdown state: large timer (white numbers), "Set Reminder" **gradient ash CTA**
- Active state: "Challenge Live Now!" banner (gradient copper bg), pulsing enter button
- Leaderboard preview: top 5, rank 1 highlighted gradient sand
- "View Full Leaderboard" link (gradient sand text)

---

## 5. Inbox / Messages Screen
**Purpose**: Chat with Motion Match connections.
**Entry points**: Bottom nav "Inbox" tap, Motion Match "Chat Unlocked" CTA, Profile "Inbox" tile.
**Exits**: Tap chat → conversation. Tap back → chat list. Bottom nav → any main tab.
**Workflow**: Tap "Inbox" nav → chat list → tap a chat → send message → appears in bubble. New mutual heart match → new chat auto-appears.

**Layout:**
- Header: MessagesSquare icon (white) + "Inbox" (2xl black, white)
- Two-column (mobile: 120px sidebar + main chat):
  - **Sidebar**: chat list items. Avatar + name (white bold) + last message (stone) + unread dot (gradient sand). Motion Match = heart icon (gradient copper). Active = left border gradient sand, bg white/3%
  - **Main chat**:
    - Header: participant name + "Chat unlocked by mutual hearts" (gradient sand, xs)
    - Messages: user (gradient sand bg, dark text, right), other (`bg-white/[0.04]`, white text, left)
    - Input: dark bg, white text, gradient sand focus border + send button (gradient sand bg, dark Send icon)

**Empty state**: "Match through Motion Match to unlock chats." (stone) + **gradient sand "Go to Motion Match" CTA**

---

## 6. Profile Screen
**Purpose**: User identity hub with quick access to all sub-features.
**Entry points**: Bottom nav "You" tap, Feed tap creator avatar.
**Exits**: Tap any tile → respective screen. Settings gear → Settings Page (`/profile/settings`). Register button → Register Sheet. Bottom nav → any main tab.
**Workflow**: Tap "You" nav → view stats + DNA + tiles. Tap tile → sub-screen. Tap Settings → navigates to Settings Page. Tap Register → Register Sheet (demo mode).

**Layout:**
- Top: UserRound icon (gradient sand) + display name (2xl black, white) + Settings gear (`bg-white/[0.03]`, 1px white/5 border)
- **Vibe DNA card**: 16:9, `bg-white/[0.02]`, animated flowing lines (gradient sand at 8% opacity). DNA text "Flow · Bass · Jump · Snap" (2xl black, white). Label "Vibe DNA" (gradient sand)
- Stats row: 3 metric cards (Clips, Tokens, DNA Intensity)
- **Grid tiles (2 columns)**, each `bg-white/[0.02]`, 1px white/5 border, rounded-lg:
  - Life Stamps (Flame, gradient sand) — "12 earned"
  - Alter Ego (ShieldCheck, warm gray) — "Unlocked"
  - Wallet (Wallet, warm gray) — "Active"
  - Store (Rupee, gradient sand) — "6 items"
  - Privacy (Lock, warm gray) — "Private"
  - Motion Match (Heart, gradient copper) — "On"
- Bottom: "Register another demo user" — 1px gradient sand border, gradient sand text

---

## 7. Motion Match Screen
**Purpose**: Discover compatible users based on movement DNA.
**Entry points**: Profile "Motion Match" tile, Feed heart action popup suggestion.
**Exits**: Pass → next card. Heart → like user. Duel Date → start duel. Mutual match → overlay. After duel + hearts → Inbox. Bottom nav → any main tab.
**Workflow**: Tap "Motion Match" → browse cards → Pass/Heart/Duel Date → if mutual hearts → "It's a match!" overlay → Start Duel Date → duel room → mutual hearts in duel → Chat unlocked → Inbox.

**Layout:**
- Header: Heart icon (gradient copper) + "Motion Match" (2xl black, white)
- Card stack (one visible):
  - Large user avatar, name (xl black, white), campus (sm, warm gray), compatibility % (display, gradient sand), clip thumbnails
  - Actions: Pass (gradient ash bg), Heart (gradient copper bg), "Duel Date" (gradient sand bg)
- Mutual match overlay: dark 90% bg, gradient copper heart, "It's a match!", "Start Duel Date" gradient sand CTA
- Post-duel: "Chat Unlocked" + gradient sand "Open Inbox" CTA

---

## 8. Store Screen
**Purpose**: In-app purchases and token spending.
**Entry points**: Profile "Store" tile, Wallet "Spend" action.
**Exits**: Tap purchase → payment flow (Razorpay) → success → item unlocked. Bottom nav → any main tab.
**Workflow**: Tap "Store" tile → browse items → tap "Buy" → payment sheet → success → item added to profile.

**Layout:**
- Header: ShoppingBag icon (white) + "Store" (2xl black, white)
- Token balance banner: large number (3xl black, white) + Zap icon (gradient sand)
- Product cards (vertical list), each `bg-white/[0.02]`, 1px white/5 border, rounded-xl:
  - Alter Ego Unlock — ₹49 (gradient sand price badge)
  - 5 Motion Match Credits — ₹99
  - Life Book Export — ₹29
  - Clip Boost — 300 tokens (gradient sand token badge)
- Each card: icon (white), title (white bold), description (warm gray), CTA: **gradient sand bg** for money purchases, **1px gradient sand outline** for token purchases

---

## 9. Comments Bottom Sheet
**Purpose**: View and add comments on a clip.
**Entry points**: Feed "Comments" action.
**Exits**: Tap close/X → back to Feed. Post comment → appears in list.
**Workflow**: Feed tap Comments → sheet slides up → scroll comments → type + send → comment appears at top → close sheet.

**Layout:**
- Slide-up sheet, rounded-t-3xl, bg `#0c0c10`, border-t 1px gradient white/5%
- Handle bar (stone, 40px wide, 4px)
- Title "Comments" (lg black, white), close chevron (warm gray)
- Comment cards: `bg-white/[0.02]`, rounded-lg, p-3, 1px white/5 border
  - Username bold (white), like count (xs, stone), body (sm, warm gray)
- Input pinned: text field (dark bg, white text, gradient sand focus border) + send button (**gradient sand bg**, dark icon)

---

## 10. Share Bottom Sheet
**Purpose**: Share a clip to external platforms or app story.
**Entry points**: Feed "Share" action.
**Exits**: Tap target → share action → +20 tokens → close. Tap close/X → back to Feed.
**Workflow**: Feed tap Share → sheet opens → tap WhatsApp/Reels/Story/Copy → system share or copy → "+20 Tokens" badge → sheet closes.

**Layout:**
- Slide-up sheet, rounded-t-3xl, bg `#0c0c10`, border-t 1px gradient white/5%
- Title "Share Mirror Moment" (lg black, white)
- Subtext: "Sharing earns Energy Tokens." (warm gray)
- 2-column grid: WhatsApp, Instagram Reels, qanbie Story, Copy Link
- Each: icon (white) + label (white bold), `bg-white/[0.02]`, 1px white/5 border, rounded-lg
- After share: "+20 Energy Tokens" badge (gradient sand) flashes at bottom

---

## 11. Settings Page (`/profile/settings`)
**Purpose**: User preferences and privacy controls.
**Entry points**: Profile Settings gear icon tap.
**Exits**: Back arrow → back to Profile. Toggle changes auto-save.
**Workflow**: Profile tap Settings gear → navigates to Settings Page → adjust sliders/toggles → changes apply immediately → back arrow to return.

**Layout:**
- Full page, bg `#0c0c10`
- Top: Back arrow + Title "Personal Settings" (lg black, white)
- Controls, each row `bg-white/[0.02]`, 1px white/5 border, rounded-lg:
  - Motion sensitivity: range slider 0-100 (gradient sand thumb, gray-700 track)
  - Toggles: Low data mode, Private profile, Allow Motion Match, World Drop alerts, Duel invites, Match hearts
  - Toggle: rounded-full track (gray-700), white knob, **gradient sand fill when ON**

---

## 12. Register Bottom Sheet
**Purpose**: Create a new account.
**Entry points**: Onboarding Screen 3 "Create Account", Profile "Register another demo user".
**Exits**: Tap "Register" → create user + wallet + settings → close → Feed loads. Tap close → Onboarding.
**Workflow**: Onboarding tap "Create Account" → sheet opens → fill fields → tap Register → API call → success → +250 tokens → auto-navigate Feed.

**Layout:**
- Slide-up sheet, rounded-t-3xl, bg `#0c0c10`, border-t 1px gradient white/5%
- Handle bar + close chevron
- Title "Create qanbie Account" (lg black, white)
- Inputs with left icons (stone): Display name, Username, Campus, City
- Each input: `bg-white/[0.02]`, 1px white/5 border, rounded-lg, gradient sand focus border
- Big **gradient sand CTA**: "Register and enter feed" with Check icon
- Success: "+250 Energy Tokens" badge (**gradient sand border + text**) pulses once

---

## 13. Notifications Screen
**Purpose**: View app notifications and alerts.
**Entry points**: Feed header Bell icon.
**Exits**: Tap notification → respective screen (World Drop / Duels / Motion Match / Feed). Tap back → Feed.
**Workflow**: Tap Bell → Notifications list → tap item → navigate to relevant screen. Unread items have dot.

**Layout:**
- Header: Bell icon (white) + "Notifications" (2xl black, white)
- List items, each `bg-white/[0.02]`, 1px white/5 border, rounded-lg:
  - "World Drop opens Friday 8pm" — unread dot (gradient sand)
  - "Your clip earned a Life Stamp" — unread dot (gradient sand)
  - "Raj challenged you to a Duel" — accent border (gradient copper)
  - "Motion Match: Zara liked your duel" — heart icon (gradient copper)
- Each: title (white), time (stone, xs)

---

## 14. Admin / Moderation Screen
**Purpose**: Content moderation, challenge management, brand campaigns.
**Entry points**: Special admin nav or deep link.
**Exits**: Bottom nav → any main tab.
**Workflow**: Admin opens → review reports → resolve/flag → manage active challenges → create brand campaign.

**Layout:**
- Header: ShieldCheck icon (white) + "Moderation" (2xl black, white)
- **Reports section**: list of reports
  - Reason (white), status badge (OPEN = gradient copper bg, RESOLVED = gradient sand bg)
  - Action: "Resolve" **gradient sage CTA** / "Flag" **gradient copper CTA**
- **Challenges section**: toggle (gradient sand when on), token reward input (white text, dark bg, gradient sand focus)
- **Brand campaigns**: form with sponsor name, prompt, reward — "Create Campaign" **gradient sand CTA**

---

## 15. Duel Room Screen (Live Duel)
**Purpose**: Real-time 1v1 motion challenge execution.
**Entry points**: Duels Screen "Enter Duel", World Drop "Enter World Drop", Motion Match "Start Duel Date".
**Exits**: Submit → Score card → back to Duels/World Drop/Motion Match. Bottom nav → any main tab.
**Workflow**: Enter room → countdown → motion recording → live scoring tips → submit → score comparison → winner gets tokens.

**Layout:**
- Full screen camera preview
- Opponent picture-in-picture (top-right, 80x120px, rounded-lg)
- Top: **gradient copper** progress bar (60s countdown), challenge banner (dark bg, white text)
- Live score panel (floating, bottom-left): "You: 0" vs "Opponent: 0", leader score highlighted gradient sand
- Motion tips: floating text "Jump higher!" "On beat!" (gradient sand)
- Bottom: "Submit" **gradient sand CTA** (enabled after minimum time)
- Post-submit: split score card, winner gets "+200 Tokens" badge (gradient sand), "Back" gradient ash CTA

---

## 16. Wallet / Token Ledger Screen
**Purpose**: Detailed token balance and transaction history.
**Entry points**: Profile "Wallet" tile, Store token balance tap.
**Exits**: Tap "Earn More" → Feed/Create. Tap "Spend" → Store. Bottom nav → any main tab.
**Workflow**: Tap "Wallet" tile → view balance + ledger → scroll history → tap "Earn More" to create content → tap "Spend" to buy items.

**Layout:**
- Header: Wallet icon (white) + "Wallet" (2xl black, white)
- Balance hero: large token count (3xl black, white) + "Energy Tokens" label (warm gray)
- Action row: "Earn More" **gradient sand CTA** + "Spend" **1px gradient sand outline CTA**
- Ledger list: scrollable rows
  - EARN: gradient sand amount, kind badge (gradient sage bg), reason, date (stone)
  - SPEND: gradient copper amount, kind badge (gradient copper bg), reason, date (stone)

---

## 17. Search / Discover Screen
**Purpose**: Find users, clips, and challenges.
**Entry points**: Future search icon in header (can be added to Feed header).
**Exits**: Tap result → respective screen. Bottom nav → any main tab.
**Workflow**: Type query → tabs filter results → tap clip → Feed focused on that clip → tap user → Profile → tap challenge → Duels/World Drop.

**Layout:**
- Header: Search icon + search input (dark bg, white text, **gradient sand focus border**, rounded-full)
- Tabs: "Clips" | "Users" | "Challenges" — active = **gradient sand underline**
- Results: vertical list matching content type
- Trending tags: pill buttons with **gradient sand border**

---

## 18. Onboarding / Splash Screens
**Purpose**: First-time user education before account creation.
**Entry points**: App first launch.
**Exits**: Screen 1 "Get Started" → Screen 2. Screen 2 "Next" → Screen 3. Screen 3 "Create Account" → Register Sheet.
**Workflow**: Open app → Screen 1 → tap Get Started → Screen 2 → tap Next → Screen 3 → tap Create Account → Register Sheet.

**Layout:**
- Full black bg with subtle radial gradient (faint gradient sand at 2% opacity from center)
- Screen 1: "Your body is the interface" (3xl black, white, centered), motion silhouette (white stroke, 6% opacity), **gradient sand "Get Started" CTA**
- Screen 2: "Move to create" — motion-to-clip illustration, description (warm gray), **gradient ash "Next" CTA**
- Screen 3: "Duel. Match. Drop." — 3 icon cards (Swords, Heart, RadioTower) with labels, **gradient sand "Create Account" CTA**
- Pagination dots: active = gradient sand circle, inactive = stone circle

---

## Global Components

**Bottom Navigation (sticky, 6 tabs):**
- Feed (Home), Create (Camera), Duels (Swords), Drop (RadioTower), Inbox (MessagesSquare), You (UserRound)
- Active tab: **gradient sand bg**, dark text `#0a0a0a`, rounded-lg, font-bold
- Inactive: stone text `#6b6864`

**Header (sticky, blur backdrop `bg-black/60`):**
- Left: tagline "Where your body is the interface" (xs uppercase, stone) + logo "qanbie" (2xl black, white)
- Right: Bell icon (white) → Notifications Screen + Token balance pill (1px gradient sand border, gradient sand text, Zap icon)

**Metric Card:**
- Label (xs bold, stone), Value (lg black, white), `bg-white/[0.02]`, 1px `border-white/[0.05]`, rounded-lg, p-3

**Bottom Sheet:**
- Fixed bottom, max-w-[460px], rounded-t-3xl, bg `#0c0c10`, border-t 1px gradient `white/[0.05]`, shadow-2xl

**Input Field:**
- `bg-white/[0.02]`, 1px `border-white/[0.05]`, rounded-lg, white text, stone placeholder, **gradient sand focus border**, left icon in stone

**Primary Button (Gradient Sand):**
- `linear-gradient(135deg, #d4b896 0%, #b8956a 50%, #9a7b52 100%)`
- Text: near-black `#0a0a0a`, font-black, rounded-lg, px-4 py-4

**Secondary Button (Gradient Ash Outline):**
- Transparent bg, 1px gradient ash border, gradient ash text, rounded-lg

**Success Button (Gradient Sage):**
- `linear-gradient(135deg, #7da88a 0%, #5a8a6a 100%)`
- Text: near-black, font-black, rounded-lg

**Danger Button (Gradient Copper):**
- `linear-gradient(135deg, #c4907a 0%, #a06b56 100%)`
- Text: near-black, font-black, rounded-lg

**Loading / Processing:**
- Flowing line animation (white at 5% opacity)
- Progress bars: gradient sand fill on `#1a1a1a` track
- Text: stone "Turning motion into music..."

---

## Animation & Motion Specs

- Page transitions: fade 200ms ease
- Bottom sheets: slide-up 300ms cubic-bezier(0.16, 1, 0.3, 1)
- Heart like: scale bounce 1.0 → 1.2 → 1.0, 200ms ease-out
- Token increment: number fade + gradient sand +N badge slides up and fades
- Wave pattern: subtle slow horizontal drift, 8s loop
- Video feed: smooth scroll snap per clip, no bounce
- Button press: opacity 0.85 on active, 100ms
- Gradient buttons: no extra hover glow, just opacity change on press

---

## Responsive Notes

- Mobile: full width, bottom nav, bottom sheets, safe area insets respected
- Desktop web: center max-w-[460px] column, outer area pure black `#000000`
- Tablet: same as mobile but touch targets 48px minimum

---

## Assets Needed

- Logo: "qanbie" wordmark (bold, slightly organic/rounded, white on pure black)
- App icon: gradient sand abstract wave on `#000000`
- Empty states: minimal line-art silhouettes (white at 6% opacity)
- Wave pattern: subtle flowing horizontal lines (SVG, white at 3-5% opacity)
- Icons: Lucide-style, 1.5px stroke, white primary, gradient sand active

---

Generate all 18 screens as a connected Figma-style design system with component variants for states: default, active, loading, empty, error, disabled, success. Every CTA button must use one of the 4 gradient fills (Sand, Ash, Copper, Sage). No solid neon colors anywhere.
