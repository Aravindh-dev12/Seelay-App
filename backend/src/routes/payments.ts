import type { Request, Response } from "express";
import { z } from "zod";
import { nanoid } from "nanoid";
import { asyncHandler, ok } from "./_common.js";

export function registerPaymentRoutes(app: any) {
  app.post("/payments/razorpay/order", asyncHandler((req: Request, res: Response) => {
    const body = z.object({ sku: z.string(), amountPaise: z.number().positive() }).parse(req.body);
    ok(req, res, { provider: "razorpay", orderId: `order_${nanoid(10)}`, sku: body.sku, amountPaise: body.amountPaise });
  }));

  app.post("/payments/razorpay/webhook", asyncHandler((req: Request, res: Response) => ok(req, res, { received: true, idempotent: true })));
}
