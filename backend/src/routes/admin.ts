import type { Request, Response } from "express";
import { nanoid } from "nanoid";
import { asyncHandler, ok } from "./_common.js";

export function registerAdminRoutes(app: any) {
  app.get("/admin/reports", asyncHandler((req: Request, res: Response) => ok(req, res, [{ id: "report_demo", reason: "unsafe movement", status: "OPEN" }])));
  app.post("/admin/moderation/:id/resolve", asyncHandler((req: Request, res: Response) => ok(req, res, { id: req.params.id, status: "RESOLVED" })));
  app.get("/admin/challenges", asyncHandler((req: Request, res: Response) => ok(req, res, [{ id: "ch_world", title: "India Pulse Drop", active: true }])));
  app.post("/admin/brand-campaigns", asyncHandler((req: Request, res: Response) => ok(req, res, { id: `brand_${nanoid(8)}`, ...req.body, status: "DRAFT" })));
}
