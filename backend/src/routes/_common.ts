import type { NextFunction, Request, Response } from "express";
import { nanoid } from "nanoid";
import type { ApiEnvelope } from "@seelay/shared";
import { users } from "../data.js";

export const asyncHandler = (fn: (req: Request, res: Response) => Promise<void> | void) =>
  (req: Request, res: Response, next: NextFunction) => Promise.resolve(fn(req, res)).catch(next);

export function ok<T>(req: Request, res: Response, data: T) {
  const envelope: ApiEnvelope<T> = { data, requestId: req.header("x-request-id") ?? nanoid() };
  res.json(envelope);
}

export function currentUser(req: Request) {
  const requested = req.header("x-user-id");
  return users.find((user) => user.id === requested) ?? users[0];
}
