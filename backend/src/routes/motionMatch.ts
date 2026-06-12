import type { Request, Response } from "express";
import { z } from "zod";
import { users, matches, chats, ensureMatch } from "../data.js";
import { asyncHandler, ok, currentUser } from "./_common.js";
import { simulateVibeDna, compatibilityScore } from "../simulation.js";
import { trackMotionMatchHeart } from "../services/analytics.js";

export function registerMotionMatchRoutes(app: any) {
  app.get("/motion-match/suggestions", asyncHandler((req: Request, res: Response) => {
    const user = currentUser(req);
    const suggestions = users.filter((candidate) => candidate.id !== user.id).map((candidate) => ({
      id: `match_${user.id}_${candidate.id}`,
      user: candidate,
      compatibility: compatibilityScore(simulateVibeDna(user.id, 10).vector, simulateVibeDna(candidate.id, 10).vector),
      previewClips: [] as any[]
    }));
    ok(req, res, suggestions);
  }));

  app.post("/motion-match/:id/duel", asyncHandler((req: Request, res: Response) => {
    const match = ensureMatch(req.params.id, currentUser(req).id);
    match.status = "DUEL_CREATED";
    ok(req, res, { match, duel: { id: `duel_date_${Date.now()}`, status: "LIVE" } });
  }));

  app.post("/motion-match/:id/heart", asyncHandler((req: Request, res: Response) => {
    const user = currentUser(req);
    const match = ensureMatch(req.params.id, user.id);
    if (!match.hearts.includes(user.id)) match.hearts.push(user.id);
    trackMotionMatchHeart(user.id, match.id);
    if (match.hearts.length >= 2) {
      match.status = "CHAT_UNLOCKED";
      match.chatId = match.chatId ?? `chat_${Date.now()}`;
      chats.set(match.chatId, chats.get(match.chatId) ?? []);
    } else {
      match.status = "HEART_PENDING";
    }
    ok(req, res, match);
  }));
}
