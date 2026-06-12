import { nanoid } from "nanoid";
import type { ChatMessage, ClipCard, CommentCard, DuelScore, MotionVector, ShareTarget, UserSettings, UserSummary } from "@seelay/shared";
import { buildSoundAlchemy, compatibilityScore, scoreDuel, simulateVibeDna } from "./simulation.js";

export type Wallet = { balance: number; ledger: Array<{ id: string; kind: string; amount: number; reason: string; createdAt: string }> };
export type Match = { id: string; userAId: string; userBId: string; status: string; compatibility: number; hearts: string[]; chatId?: string };
export type RegisteredUser = UserSummary & { email?: string; phone?: string; city?: string; createdAt: string };

export const users: RegisteredUser[] = [
  { id: "u_mira", username: "mira.moves", displayName: "Mira", campus: "Mumbai Arts College", personaMode: "REAL", avatarUrl: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=256&q=80" },
  { id: "u_raj", username: "raj.beat", displayName: "Raj", campus: "Delhi North Campus", personaMode: "REAL", avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&q=80" },
  { id: "u_zara", username: "zara.alchemy", displayName: "Zara", campus: "Bengaluru Tech Park", personaMode: "ALTER_EGO", avatarUrl: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=256&q=80" }
].map((user) => ({ ...user, city: user.campus?.split(" ")[0], createdAt: new Date().toISOString() }));

export const demoVector: MotionVector = { intensity: 86, rhythm: 72, creativity: 91, humor: 64, confidence: 88, tempo: 78 };

export const clips: ClipCard[] = [
  {
    id: "clip_1",
    creator: users[0],
    caption: "Mirror Moment unlocked at the station stairs.",
    challengeTag: "#MumbaiJumpDrop",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    posterUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80",
    durationMs: 6000,
    vibeScore: 94,
    soundAlchemy: buildSoundAlchemy(demoVector),
    metrics: { likes: 1804, comments: 92, shares: 341, saves: 127 }
  },
  {
    id: "clip_2",
    creator: users[1],
    caption: "Campus Duel practice before Friday World Drop.",
    challengeTag: "#CampusPulse",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    posterUrl: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=900&q=80",
    durationMs: 5400,
    vibeScore: 87,
    soundAlchemy: buildSoundAlchemy({ ...demoVector, creativity: 73, rhythm: 91 }),
    metrics: { likes: 1298, comments: 63, shares: 218, saves: 98 }
  }
];

export const wallets = new Map<string, Wallet>(users.map((user) => [user.id, { balance: 1200, ledger: [] }]));
export const settingsMap = new Map<string, UserSettings>(users.map((user) => [user.id, {
  lowDataMode: false,
  motionSensitivity: 72,
  privateProfile: false,
  allowMotionMatch: true,
  notifyWorldDrop: true,
  notifyDuels: true,
  notifyMatches: true
}]));
export const commentsMap = new Map<string, CommentCard[]>([
  ["clip_1", [
    { id: "c1", clipId: "clip_1", author: users[1], body: "This bass drop timing is wild.", likes: 31, createdAt: new Date().toISOString() },
    { id: "c2", clipId: "clip_1", author: users[2], body: "Challenge me on this after class.", likes: 18, createdAt: new Date().toISOString() }
  ]],
  ["clip_2", [
    { id: "c3", clipId: "clip_2", author: users[0], body: "Campus leaderboard is heating up.", likes: 22, createdAt: new Date().toISOString() }
  ]]
]);
export const shareTargets: ShareTarget[] = [
  { id: "whatsapp", label: "WhatsApp", kind: "EXTERNAL" },
  { id: "reels", label: "Instagram Reels", kind: "EXTERNAL" },
  { id: "qanbie_story", label: "qanbie Story", kind: "STORY" },
  { id: "copy", label: "Copy Link", kind: "COPY_LINK" }
];
export const matches = new Map<string, Match>();
export const chats = new Map<string, ChatMessage[]>([
  ["chat_demo", [
    { id: "msg_1", chatId: "chat_demo", sender: users[2], body: "That duel-date was actually fun. Friday Drop together?", createdAt: new Date().toISOString() },
    { id: "msg_2", chatId: "chat_demo", sender: users[0], body: "Yes. Same challenge, no excuses.", createdAt: new Date().toISOString() }
  ]]
]);

export function earnTokens(userId: string, amount: number, reason: string) {
  const wallet = wallets.get(userId) ?? { balance: 0, ledger: [] };
  wallet.balance += amount;
  wallet.ledger.unshift({ id: `tok_${nanoid(8)}`, kind: "EARN", amount, reason, createdAt: new Date().toISOString() });
  wallets.set(userId, wallet);
  return wallet;
}

export function spendTokens(userId: string, amount: number, reason: string) {
  const wallet = wallets.get(userId) ?? { balance: 0, ledger: [] };
  if (wallet.balance < amount) return { ...wallet, rejected: true, reason: "INSUFFICIENT_TOKENS" };
  wallet.balance -= amount;
  wallet.ledger.unshift({ id: `tok_${nanoid(8)}`, kind: "SPEND", amount: -amount, reason, createdAt: new Date().toISOString() });
  wallets.set(userId, wallet);
  return wallet;
}

export function ensureMatch(id: string, userId: string): Match {
  const existing = matches.get(id);
  if (existing) return existing;
  const other = users.find((candidate) => candidate.id !== userId) ?? users[1];
  const match: Match = { id, userAId: userId, userBId: other.id, status: "SUGGESTED", compatibility: compatibilityScore(simulateVibeDna(userId, 10).vector, simulateVibeDna(other.id, 10).vector), hearts: [] };
  matches.set(id, match);
  return match;
}

export function nextFridayAtEightIst() {
  const now = new Date();
  const istNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  const daysUntilFriday = (5 - istNow.getDay() + 7) % 7 || 7;
  istNow.setDate(istNow.getDate() + daysUntilFriday);
  istNow.setHours(20, 0, 0, 0);
  return istNow.toISOString();
}
