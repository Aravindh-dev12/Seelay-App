# seelay Frontend (React Native Expo)

React Native Expo cross-platform frontend for the seelay movement-first social platform. Runs on Android, iOS, and Web.

## Quick Start

```bash
# From the monorepo root
cd frontend

# 1. Install dependencies
npm install --legacy-peer-deps

# 2. Start the development server
npm start
```

Press `a` for Android, `i` for iOS, or `w` for web.

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start Expo dev server |
| `npm run android` | Start on Android emulator/device |
| `npm run ios` | Start on iOS simulator/device |
| `npm run web` | Start on web browser |
| `npm run lint` | ESLint check |
| `npm run test` | Run test suite |

## Project Structure

```
src/
  components/      # Shared UI components (ScreenContainer, Header, GradientButton)
  screens/
    feed/           # Home — vertical video scroll feed
    duels/          # Campus Duels list + duel room
    worlddrop/      # World Drop weekly challenge
    motionmatch/    # Motion Match DNA dating
    identity/       # Identity Hub (Vibe DNA, Life Stamps, etc.)
    social/         # Social Hub connecting Match + Soul
    profile/        # User profile + settings
  navigation/
    BottomTabNavigator.tsx  # 5 tabs: Home, Duels, Drop, Connect, Account
    RootNavigator.tsx        # Stack screens + tab wrapper
  theme/
    index.ts        # Colors, typography, spacing
    ThemeProvider.tsx
  api/
    client.ts       # REST API client
App.tsx             # Entry point with providers
```

## Features

- **Mirror Moments** — Camera-first clip creation with motion auto-capture
- **Campus Duels** — Location-based dance battles
- **Life Stamps** — Milestone badge timeline
- **Vibe DNA** — Movement fingerprint visualization
- **Sound Alchemy** — Motion-generated audio tracks
- **Alter Ego** — Anonymous second persona for duels
- **Energy Tokens** — Wallet and token economy
- **World Drop** — Weekly global challenge
- **Motion Match** — DNA-based dating layer

## Tech Stack

- **Framework**: React Native with Expo SDK 52
- **Language**: TypeScript 5.x
- **Navigation**: React Navigation 6 (Bottom Tabs + Native Stack)
- **Styling**: StyleSheet with design tokens
- **Icons**: `@expo/vector-icons` (Ionicons)
- **Animation**: `react-native-reanimated`
- **Video**: `expo-av` Video component
- **Haptics**: `expo-haptics`
- **API Client**: Shared REST client

## Build for Production

```bash
# Android
npx expo run:android --variant release

# iOS
npx expo run:ios --configuration Release

# Web
npx expo export -p web
```

## Notes

- The frontend depends on the backend API running at `http://localhost:4000`
- Run `npm install --legacy-peer-deps` if you encounter peer dependency conflicts
- Use `expo-cli` or `npx expo` commands for all Expo operations
