export type PersonaMode = "REAL" | "ALTER_EGO";
export type ClipVisibility = "PUBLIC" | "FOLLOWERS" | "PRIVATE";
export type ModerationStatus = "PENDING" | "APPROVED" | "REJECTED" | "SHADOW_LIMITED";
export type ChallengeKind = "MIRROR_MOMENT" | "CAMPUS_DUEL" | "WORLD_DROP" | "BRAND";
export type WalletTransactionKind = "EARN" | "SPEND" | "PURCHASE" | "REFUND" | "ADMIN_ADJUST";
export type MatchStatus = "SUGGESTED" | "DUEL_CREATED" | "HEART_PENDING" | "CHAT_UNLOCKED" | "DISMISSED";

export interface UserSummary {
  id: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  campus?: string;
  personaMode: PersonaMode;
}

export interface UserSettings {
  lowDataMode: boolean;
  motionSensitivity: number;
  privateProfile: boolean;
  allowMotionMatch: boolean;
  notifyWorldDrop: boolean;
  notifyDuels: boolean;
  notifyMatches: boolean;
}

export interface CommentCard {
  id: string;
  clipId: string;
  author: UserSummary;
  body: string;
  likes: number;
  createdAt: string;
}

export interface ShareTarget {
  id: string;
  label: string;
  kind: "CONTACT" | "EXTERNAL" | "COPY_LINK" | "STORY";
}

export interface ChatSummary {
  id: string;
  participant: UserSummary;
  unlockedBy: "MOTION_MATCH" | "DUEL" | "SUPPORT";
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  sender: UserSummary;
  body: string;
  createdAt: string;
}

export interface ClipCard {
  id: string;
  creator: UserSummary;
  caption: string;
  challengeTag?: string;
  videoUrl: string;
  posterUrl?: string;
  durationMs: number;
  vibeScore: number;
  soundAlchemy: SoundAlchemyProfile;
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    saves: number;
  };
}

export interface MotionVector {
  intensity: number;
  rhythm: number;
  creativity: number;
  humor: number;
  confidence: number;
  tempo: number;
}

export interface VibeDna {
  userId: string;
  vector: MotionVector;
  strand: string[];
  generatedAt: string;
}

export interface SoundAlchemyProfile {
  bpm: number;
  bass: number;
  synth: number;
  reverb: number;
  dropMomentsMs: number[];
}

export interface DuelScore {
  motion: number;
  rhythm: number;
  creativity: number;
  crowd: number;
  total: number;
}

export interface ApiEnvelope<T> {
  data: T;
  requestId: string;
}
