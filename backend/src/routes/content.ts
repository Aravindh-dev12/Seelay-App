import type { Request, Response } from "express";
import { z } from "zod";
import { nanoid } from "nanoid";
import type { CommentCard } from "@seelay/shared";
import { clips, commentsMap, shareTargets, demoVector, earnTokens } from "../data.js";
import { asyncHandler, ok, currentUser } from "./_common.js";
import { buildSoundAlchemy } from "../simulation.js";
import { setFeedCache, getFeedCache, invalidateFeedCache } from "../services/redis.js";
import { trackLike, trackShare, trackClipView } from "../services/analytics.js";

export function registerContentRoutes(app: any) {
  app.post("/clips/upload-url", asyncHandler((req: Request, res: Response) => {
    const body = z.object({ mimeType: z.string(), fileName: z.string() }).parse(req.body);
    ok(req, res, {
      uploadUrl: `https://r2.example.com/signed-upload/${nanoid()}-${body.fileName}`,
      assetKey: `clips/${nanoid()}/${body.fileName}`,
      expiresInSeconds: 900
    });
  }));

  app.post("/clips", asyncHandler((req: Request, res: Response) => {
    const body = z.object({
      caption: z.string().min(1),
      challengeTag: z.string().optional(),
      videoUrl: z.string().url(),
      durationMs: z.number().min(1000).max(60000),
      motionVector: z.object({
        intensity: z.number(), rhythm: z.number(), creativity: z.number(),
        humor: z.number(), confidence: z.number(), tempo: z.number()
      }).optional()
    }).parse(req.body);
    const creator = currentUser(req);
    const vector = body.motionVector ?? demoVector;
    const clip = {
      id: `clip_${nanoid(8)}`,
      creator,
      caption: body.caption,
      challengeTag: body.challengeTag,
      videoUrl: body.videoUrl,
      durationMs: body.durationMs,
      vibeScore: Math.round((vector.intensity + vector.rhythm + vector.creativity + vector.confidence) / 4),
      soundAlchemy: buildSoundAlchemy(vector),
      metrics: { likes: 0, comments: 0, shares: 0, saves: 0 }
    };
    clips.unshift(clip);
    earnTokens(creator.id, 100, "Mirror Moment created");
    ok(req, res, { clip, earnedTokens: 100 });
  }));

  app.get("/clips/:id", asyncHandler((req: Request, res: Response) => {
    const clip = clips.find((item) => item.id === req.params.id);
    if (!clip) return void res.status(404).json({ error: "CLIP_NOT_FOUND" });
    ok(req, res, clip);
  }));

  app.get("/clips/:id/comments", asyncHandler((req: Request, res: Response) => ok(req, res, commentsMap.get(req.params.id) ?? [])));

  app.post("/clips/:id/comments", asyncHandler((req: Request, res: Response) => {
    const clip = clips.find((item) => item.id === req.params.id);
    if (!clip) return void res.status(404).json({ error: "CLIP_NOT_FOUND" });
    const body = z.object({ body: z.string().min(1).max(280) }).parse(req.body);
    const comment: CommentCard = {
      id: `comment_${nanoid(8)}`,
      clipId: clip.id,
      author: currentUser(req),
      body: body.body,
      likes: 0,
      createdAt: new Date().toISOString()
    };
    const list = [comment, ...(commentsMap.get(clip.id) ?? [])];
    commentsMap.set(clip.id, list);
    clip.metrics.comments += 1;
    ok(req, res, comment);
  }));

  app.get("/clips/:id/share-targets", asyncHandler((req: Request, res: Response) => {
    const clip = clips.find((item) => item.id === req.params.id);
    if (!clip) return void res.status(404).json({ error: "CLIP_NOT_FOUND" });
    ok(req, res, { clipId: clip.id, deepLink: `https://qanbie.app/c/${clip.id}`, targets: shareTargets });
  }));

  app.get("/feed", asyncHandler(async (req: Request, res: Response) => {
    const user = currentUser(req);
    const cached = await getFeedCache(user.id);
    if (cached) {
      const parsed = JSON.parse(cached);
      return ok(req, res, parsed);
    }
    const ranked = [...clips].sort((a, b) => (b.vibeScore + b.metrics.shares) - (a.vibeScore + a.metrics.shares));
    const payload = { items: ranked, nextCursor: null, userVibeDna: { userId: user.id, strand: ["Flow", "Bass", "Jump", "Snap"], vector: { intensity: 86, rhythm: 72, creativity: 91, humor: 64, confidence: 88, tempo: 78 } } };
    await setFeedCache(user.id, JSON.stringify(payload));
    ok(req, res, payload);
  }));

  app.post("/clips/:id/like", asyncHandler((req: Request, res: Response) => {
    trackLike(currentUser(req).id, req.params.id);
    invalidateFeedCache(currentUser(req).id);
    mutateMetric(req, res, "likes", 1);
  }));
  app.delete("/clips/:id/like", asyncHandler((req: Request, res: Response) => mutateMetric(req, res, "likes", -1)));
  app.post("/clips/:id/save", asyncHandler((req: Request, res: Response) => mutateMetric(req, res, "saves", 1)));

  app.post("/clips/:id/share", asyncHandler((req: Request, res: Response) => {
    const body = z.object({ targetId: z.string().optional() }).parse(req.body);
    const clip = clips.find((item) => item.id === req.params.id);
    if (!clip) return void res.status(404).json({ error: "CLIP_NOT_FOUND" });
    clip.metrics.shares += 1;
    earnTokens(currentUser(req).id, 20, `Shared clip to ${body.targetId ?? "external"}`);
    trackShare(currentUser(req).id, clip.id, body.targetId ?? "external");
    ok(req, res, { clipId: clip.id, metrics: clip.metrics, targetId: body.targetId, earnedTokens: 20 });
  }));

  app.post("/clips/:id/report", asyncHandler((req: Request, res: Response) => ok(req, res, { reportId: `report_${nanoid(8)}`, status: "OPEN" })));
}

function mutateMetric(req: Request, res: Response, key: keyof typeof clips[0]["metrics"], delta: number) {
  const clip = clips.find((item) => item.id === req.params.id);
  if (!clip) return void res.status(404).json({ error: "CLIP_NOT_FOUND" });
  clip.metrics[key] = Math.max(0, clip.metrics[key] + delta);
  ok(req, res, { clipId: clip.id, metrics: clip.metrics });
}
