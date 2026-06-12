import type { Request, Response } from "express";
import { z } from "zod";
import { nanoid } from "nanoid";
import type { UserSettings } from "@seelay/shared";
import { users, wallets, settingsMap, clips } from "../data.js";
import { asyncHandler, ok, currentUser } from "./_common.js";
import type { RegisteredUser } from "../data.js";
import { simulateVibeDna } from "../simulation.js";
import { verifyFirebaseToken } from "../services/firebase.js";
import { trackLogin, trackSignup } from "../services/analytics.js";

export function registerAuthRoutes(app: any) {
  app.post("/auth/session", asyncHandler(async (req: Request, res: Response) => {
    const body = z.object({ provider: z.enum(["firebase", "demo"]), token: z.string().optional() }).parse(req.body);
    let user = users[0];
    if (body.provider === "firebase" && body.token) {
      const decoded = await verifyFirebaseToken(body.token);
      if (!decoded) return void res.status(401).json({ error: "INVALID_TOKEN" });
      const found = users.find((u) => u.email === decoded.email || u.id === decoded.uid);
      if (found) user = found;
    }
    trackLogin(user.id, body.provider);
    ok(req, res, { user, provider: body.provider, sessionToken: `demo_${nanoid(16)}` });
  }));

  app.post("/auth/register", asyncHandler((req: Request, res: Response) => {
    const body = z.object({
      username: z.string().min(3),
      displayName: z.string().min(2),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      campus: z.string().optional(),
      city: z.string().optional()
    }).parse(req.body);
    if (users.some((user) => user.username === body.username)) return void res.status(409).json({ error: "USERNAME_TAKEN" });
    const user: RegisteredUser = {
      id: `u_${nanoid(8)}`,
      username: body.username,
      displayName: body.displayName,
      email: body.email,
      phone: body.phone,
      campus: body.campus,
      city: body.city,
      personaMode: "REAL",
      createdAt: new Date().toISOString()
    };
    users.push(user);
    wallets.set(user.id, { balance: 250, ledger: [{ id: `tok_${nanoid(8)}`, kind: "EARN", amount: 250, reason: "Welcome bonus", createdAt: new Date().toISOString() }] });
    settingsMap.set(user.id, {
      lowDataMode: false,
      motionSensitivity: 72,
      privateProfile: false,
      allowMotionMatch: true,
      notifyWorldDrop: true,
      notifyDuels: true,
      notifyMatches: true
    });
    trackSignup(user.id, "email");
    ok(req, res, { user, wallet: wallets.get(user.id), settings: settingsMap.get(user.id), sessionToken: `demo_${nanoid(16)}` });
  }));

  app.get("/me", asyncHandler((req: Request, res: Response) => {
    const user = currentUser(req);
    ok(req, res, { user, wallet: wallets.get(user.id), settings: settingsMap.get(user.id), vibeDna: simulateVibeDna(user.id, 0) });
  }));

  app.patch("/me/profile", asyncHandler((req: Request, res: Response) => {
    const body = z.object({ displayName: z.string().min(2).optional(), campus: z.string().optional(), city: z.string().optional() }).parse(req.body);
    const user = currentUser(req);
    Object.assign(user, body);
    ok(req, res, { user });
  }));

  app.patch("/me/settings", asyncHandler((req: Request, res: Response) => {
    const body = z.object({
      lowDataMode: z.boolean().optional(),
      motionSensitivity: z.number().min(0).max(100).optional(),
      privateProfile: z.boolean().optional(),
      allowMotionMatch: z.boolean().optional(),
      notifyWorldDrop: z.boolean().optional(),
      notifyDuels: z.boolean().optional(),
      notifyMatches: z.boolean().optional()
    }).parse(req.body);
    const user = currentUser(req);
    const updated = { ...settingsMap.get(user.id), ...body } as UserSettings;
    settingsMap.set(user.id, updated);
    ok(req, res, { settings: updated });
  }));

  app.get("/me/settings", asyncHandler((req: Request, res: Response) => ok(req, res, settingsMap.get(currentUser(req).id))));

  app.get("/users", asyncHandler((req: Request, res: Response) => ok(req, res, users)));

  app.get("/users/:id", asyncHandler((req: Request, res: Response) => {
    const user = users.find((item) => item.id === req.params.id);
    if (!user) return void res.status(404).json({ error: "USER_NOT_FOUND" });
    ok(req, res, { user, vibeDna: simulateVibeDna(user.id, 0) });
  }));

  app.get("/users/:id/clips", asyncHandler((req: Request, res: Response) => {
    ok(req, res, clips.filter((clip) => clip.creator.id === req.params.id));
  }));

  app.post("/users/:id/follow", asyncHandler((req: Request, res: Response) => ok(req, res, { following: true, userId: req.params.id })));
  app.delete("/users/:id/follow", asyncHandler((req: Request, res: Response) => ok(req, res, { following: false, userId: req.params.id })));

  app.get("/notifications", asyncHandler((req: Request, res: Response) => ok(req, res, [
    { id: "n1", title: "World Drop opens Friday 8pm", read: false },
    { id: "n2", title: "Your clip earned a Life Stamp", read: false }
  ])));
}
