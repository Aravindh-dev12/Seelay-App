import { Redis } from "ioredis";

const redis = process.env.REDIS_URL ? new Redis(process.env.REDIS_URL, { maxRetriesPerRequest: 3 }) : null;

export async function getFeedCache(userId: string): Promise<string | null> {
  if (!redis) return null;
  return redis.get(`feed:${userId}`);
}

export async function setFeedCache(userId: string, payload: string, ttlSeconds = 60) {
  if (!redis) return;
  await redis.set(`feed:${userId}`, payload, "EX", ttlSeconds);
}

export async function invalidateFeedCache(userId: string) {
  if (!redis) return;
  await redis.del(`feed:${userId}`);
}

export async function getLeaderboard(eventId: string): Promise<string | null> {
  if (!redis) return null;
  return redis.get(`leaderboard:${eventId}`);
}

export async function setLeaderboard(eventId: string, payload: string, ttlSeconds = 300) {
  if (!redis) return;
  await redis.set(`leaderboard:${eventId}`, payload, "EX", ttlSeconds);
}

export async function getWorldDropSync(eventId: string): Promise<string | null> {
  if (!redis) return null;
  return redis.get(`worlddrop:${eventId}`);
}

export async function setWorldDropSync(eventId: string, payload: string, ttlSeconds = 600) {
  if (!redis) return;
  await redis.set(`worlddrop:${eventId}`, payload, "EX", ttlSeconds);
}

export async function trackOnlineUser(userId: string) {
  if (!redis) return;
  await redis.set(`online:${userId}`, "1", "EX", 300);
}

export async function getOnlineCount(): Promise<number> {
  if (!redis) return 0;
  const keys = await redis.keys("online:*");
  return keys.length;
}
