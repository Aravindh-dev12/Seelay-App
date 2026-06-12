import type { Request, Response } from "express";
import { z } from "zod";
import { nanoid } from "nanoid";
import { clips, users, earnTokens, demoVector, wallets, spendTokens } from "../data.js";
import { asyncHandler, ok, currentUser } from "./_common.js";
import { scoreDuel, simulateVibeDna } from "../simulation.js";
import { trackDuelJoin } from "../services/analytics.js";

export function registerDuelRoutes(app: any) {
  app.get("/challenges", asyncHandler((req: Request, res: Response) => ok(req, res, [
    { id: "ch_world", kind: "WORLD_DROP", title: "India Pulse Drop", tokenReward: 500, active: true },
    { id: "ch_campus", kind: "CAMPUS_DUEL", title: "Campus Footwork Duel", tokenReward: 200, active: true }
  ])));

  app.post("/challenges", asyncHandler((req: Request, res: Response) => {
    const body = z.object({
      kind: z.enum(["MIRROR_MOMENT", "CAMPUS_DUEL", "WORLD_DROP", "BRAND"]),
      title: z.string().min(3),
      prompt: z.string().min(3),
      tokenReward: z.number().min(0).default(0),
      sponsorName: z.string().optional()
    }).parse(req.body);
    ok(req, res, { challenge: { id: `ch_${nanoid(8)}`, ...body, active: true } });
  }));

  app.post("/duels", asyncHandler((req: Request, res: Response) => {
    const body = z.object({ challengeId: z.string(), opponentId: z.string().optional() }).parse(req.body);
    ok(req, res, { duel: { id: `duel_${nanoid(8)}`, challengeId: body.challengeId, status: "OPEN", opponentId: body.opponentId } });
  }));

  app.post("/duels/:id/join", asyncHandler((req: Request, res: Response) => {
    trackDuelJoin(currentUser(req).id, req.params.id);
    ok(req, res, { duelId: req.params.id, userId: currentUser(req).id, status: "LIVE" });
  }));
  app.get("/duels/:id", asyncHandler((req: Request, res: Response) => ok(req, res, { id: req.params.id, status: "LIVE", participants: users.slice(0, 2), submissions: [] })));

  app.post("/duels/:id/submit", asyncHandler((req: Request, res: Response) => {
    const body = z.object({ clipId: z.string(), motionVector: z.any().optional() }).parse(req.body);
    const score = scoreDuel(body.motionVector ?? demoVector, clips.find((clip) => clip.id === body.clipId)?.metrics.likes ?? 0);
    earnTokens(currentUser(req).id, 200, "Duel completed");
    ok(req, res, { duelId: req.params.id, clipId: body.clipId, score, earnedTokens: 200 });
  }));

  app.post("/duels/:id/react", asyncHandler((req: Request, res: Response) => {
    const body = z.object({ reaction: z.enum(["heart", "fire", "boost"]) }).parse(req.body);
    ok(req, res, { duelId: req.params.id, userId: currentUser(req).id, reaction: body.reaction });
  }));

  app.get("/leaderboards", asyncHandler((req: Request, res: Response) => ok(req, res, clips.map((clip, index) => ({
    rank: index + 1,
    user: clip.creator,
    clipId: clip.id,
    score: clip.vibeScore + clip.metrics.likes
  })))));

  app.get("/me/life-stamps", asyncHandler((req: Request, res: Response) => ok(req, res, [
    { id: "ls_first_clip", title: "First Mirror Moment", earnedAt: new Date().toISOString() },
    { id: "ls_vibe", title: "Vibe DNA Awakened", earnedAt: new Date().toISOString() }
  ])));

  app.get("/me/vibe-dna", asyncHandler((req: Request, res: Response) => ok(req, res, simulateVibeDna(currentUser(req).id, clips.length))));

  app.get("/me/wallet", asyncHandler((req: Request, res: Response) => ok(req, res, wallets.get(currentUser(req).id))));

  app.get("/me/token-ledger", asyncHandler((req: Request, res: Response) => ok(req, res, wallets.get(currentUser(req).id)?.ledger ?? [])));

  app.post("/tokens/earn", asyncHandler((req: Request, res: Response) => {
    const body = z.object({ amount: z.number().positive(), reason: z.string() }).parse(req.body);
    ok(req, res, earnTokens(currentUser(req).id, body.amount, body.reason));
  }));

  app.post("/tokens/spend", asyncHandler((req: Request, res: Response) => {
    const body = z.object({ amount: z.number().positive(), reason: z.string() }).parse(req.body);
    ok(req, res, spendTokens(currentUser(req).id, body.amount, body.reason));
  }));
}
