import type { Request, Response } from "express";
import { asyncHandler, ok } from "./_common.js";

export function registerStoreRoutes(app: any) {
  app.get("/store/items", asyncHandler((req: Request, res: Response) => ok(req, res, [
    { sku: "alter_ego_unlock", title: "Alter Ego Unlock", moneyPricePaise: 4900 },
    { sku: "motion_match_credits_5", title: "5 Motion Match Credits", moneyPricePaise: 9900 },
    { sku: "life_book_export", title: "Life Book Export", moneyPricePaise: 2900 },
    { sku: "clip_boost", title: "Clip Boost", tokenPrice: 300 }
  ])));
}
