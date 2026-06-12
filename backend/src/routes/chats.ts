import type { Request, Response } from "express";
import { z } from "zod";
import { nanoid } from "nanoid";
import type { ChatMessage, ChatSummary } from "@seelay/shared";
import { users, matches, chats } from "../data.js";
import { asyncHandler, ok, currentUser } from "./_common.js";

export function registerChatRoutes(app: any) {
  app.get("/chats", asyncHandler((req: Request, res: Response) => {
    const summaries: ChatSummary[] = [
      {
        id: "chat_demo",
        participant: users[2],
        unlockedBy: "MOTION_MATCH",
        lastMessage: chats.get("chat_demo")?.at(-1)?.body ?? "",
        unreadCount: 1,
        updatedAt: new Date().toISOString()
      },
      ...[...matches.values()].filter((match) => match.status === "CHAT_UNLOCKED" && match.chatId).map((match) => ({
        id: match.chatId as string,
        participant: users.find((user) => user.id === match.userBId) ?? users[1],
        unlockedBy: "MOTION_MATCH" as const,
        lastMessage: "Chat unlocked after mutual hearts.",
        unreadCount: 0,
        updatedAt: new Date().toISOString()
      }))
    ];
    ok(req, res, summaries);
  }));

  app.get("/chats/:id/messages", asyncHandler((req: Request, res: Response) => ok(req, res, chats.get(req.params.id) ?? [])));

  app.post("/chats/:id/messages", asyncHandler((req: Request, res: Response) => {
    const body = z.object({ body: z.string().min(1).max(1000) }).parse(req.body);
    const message: ChatMessage = { id: `msg_${nanoid(8)}`, chatId: req.params.id, sender: currentUser(req), body: body.body, createdAt: new Date().toISOString() };
    chats.set(req.params.id, [...(chats.get(req.params.id) ?? []), message]);
    ok(req, res, message);
  }));
}
