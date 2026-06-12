/**
 * Analytics service aggregating Mixpanel, Firebase Analytics, Branch, and Amplitude.
 * All methods are stub-safe: they log locally if credentials are missing.
 */

interface AnalyticsEvent {
  name: string;
  userId?: string;
  properties?: Record<string, unknown>;
  timestamp?: string;
}

function log(event: AnalyticsEvent) {
  console.log("[ANALYTICS]", event.name, event);
}

// Mixpanel
export function trackMixpanel(event: AnalyticsEvent) {
  if (!process.env.MIXPANEL_TOKEN) return log(event);
  // TODO: send to Mixpanel API
  log({ ...event, name: `mixpanel:${event.name}` });
}

// Firebase Analytics (via Admin SDK or Measurement Protocol)
export function trackFirebase(event: AnalyticsEvent) {
  if (!process.env.FIREBASE_PROJECT_ID) return log(event);
  // TODO: send via Measurement Protocol or Admin SDK
  log({ ...event, name: `firebase:${event.name}` });
}

// Branch.io
export function trackBranch(event: AnalyticsEvent) {
  if (!process.env.BRANCH_KEY) return log(event);
  // TODO: send to Branch events API
  log({ ...event, name: `branch:${event.name}` });
}

// Amplitude
export function trackAmplitude(event: AnalyticsEvent) {
  if (!process.env.AMPLITUDE_API_KEY) return log(event);
  // TODO: send to Amplitude HTTP API
  log({ ...event, name: `amplitude:${event.name}` });
}

// Unified track: fires all configured providers
export function track(event: AnalyticsEvent) {
  trackMixpanel(event);
  trackFirebase(event);
  trackBranch(event);
  trackAmplitude(event);
}

// Convenience aliases
export function trackSignup(userId: string, method: string) {
  track({ name: "Signup", userId, properties: { method } });
}

export function trackLogin(userId: string, method: string) {
  track({ name: "Login", userId, properties: { method } });
}

export function trackClipView(userId: string, clipId: string) {
  track({ name: "ClipView", userId, properties: { clipId } });
}

export function trackLike(userId: string, clipId: string) {
  track({ name: "Like", userId, properties: { clipId } });
}

export function trackShare(userId: string, clipId: string, target: string) {
  track({ name: "Share", userId, properties: { clipId, target } });
}

export function trackDuelJoin(userId: string, duelId: string) {
  track({ name: "DuelJoin", userId, properties: { duelId } });
}

export function trackWorldDropEnter(userId: string, eventId: string) {
  track({ name: "WorldDropEnter", userId, properties: { eventId } });
}

export function trackMotionMatchHeart(userId: string, matchId: string) {
  track({ name: "MotionMatchHeart", userId, properties: { matchId } });
}
