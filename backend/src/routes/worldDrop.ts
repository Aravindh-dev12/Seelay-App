import type { Request, Response } from "express";
import { clips, earnTokens } from "../data.js";
import { asyncHandler, ok, currentUser } from "./_common.js";
import { nextFridayAtEightIst } from "../data.js";
import { setWorldDropSync, getWorldDropSync, setLeaderboard, getLeaderboard } from "../services/redis.js";
import { trackWorldDropEnter } from "../services/analytics.js";

export function registerWorldDropRoutes(app: any) {
  app.get("/world-drop/current", asyncHandler(async (req: Request, res: Response) => {
    const cached = await getWorldDropSync("current");
    if (cached) return ok(req, res, JSON.parse(cached));
    const payload = {
      id: "wd_friday",
      title: "India Pulse Drop",
      startsAt: nextFridayAtEightIst(),
      durationSeconds: 60,
      tokenReward: 500,
      status: "COUNTDOWN"
    };
    await setWorldDropSync("current", JSON.stringify(payload));
    ok(req, res, payload);
  }));

  app.post("/world-drop/:id/enter", asyncHandler((req: Request, res: Response) => {
    trackWorldDropEnter(currentUser(req).id, req.params.id);
    ok(req, res, { worldDropId: req.params.id, entered: true, serverTime: new Date().toISOString() });
  }));

  app.post("/world-drop/:id/submit", asyncHandler((req: Request, res: Response) => {
    earnTokens(currentUser(req).id, 500, "World Drop submitted");
    ok(req, res, { worldDropId: req.params.id, rank: 42, score: 912, earnedTokens: 500 });
  }));

  app.get("/world-drop/:id/leaderboard", asyncHandler(async (req: Request, res: Response) => {
    const cached = await getLeaderboard(req.params.id);
    if (cached) return ok(req, res, JSON.parse(cached));
    const payload = clips.map((clip, index) => ({ rank: index + 1, clip, score: 950 - index * 37 }));
    await setLeaderboard(req.params.id, JSON.stringify(payload));
    ok(req, res, payload);
  }));
}
