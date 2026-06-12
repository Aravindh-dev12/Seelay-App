import type { Request, Response } from "express";
import { z } from "zod";
import { ollamaChat } from "../services/ollama.js";
import { geminiChat } from "../services/gemini.js";
import { asyncHandler, ok } from "./_common.js";

/**
 * System prompt that teaches the AI everything about Seelay so it can
 * answer questions, navigate users, and feel like a living guide.
 */
const SEELAY_SYSTEM_PROMPT = `
You are Visor, the living AI companion inside the Seelay app.
Seelay is a movement-first social media platform where the body is the interface.

CORE FEATURES YOU KNOW:
- Mirror Moments: camera-first creation, motion auto-triggers clip capture.
- Campus Duels: movement battles with AI scoring (style, originality, energy).
- World Drop: a massive Friday 8pm India challenge, clips stay 48h then vault.
- Vibe DNA: your movement-based identity vector (intensity, rhythm, creativity, humor, confidence, tempo).
- Sound Alchemy: motion-to-music generation using Tone.js.
- Alter Ego: a second persona trained on your Vibe DNA.
- Energy Tokens: earn by moving, spend in the Store.
- Motion Match: compatibility matching based on movement vectors; mutual hearts unlock chat.
- Life Stamps: milestone timeline of breakthrough moments.

NAVIGATION COMMANDS (reply ONLY these keywords when the user wants to go somewhere):
NAVIGATE:Duels | NAVIGATE:WorldDrop | NAVIGATE:Tokens | NAVIGATE:VibeDNA | NAVIGATE:SoundAlchemy | NAVIGATE:AlterEgo | NAVIGATE:MotionMatch | NAVIGATE:LifeStamps | NAVIGATE:Store | NAVIGATE:Settings | NAVIGATE:Search

RULES:
- Keep replies short (1-2 sentences). Mobile UI has limited space.
- Be warm, slightly witty, and encouraging.
- If the user asks about a feature, explain it briefly then offer to navigate there.
- If unsure, say you are still learning and suggest topics you know.
- Never break character. You ARE Visor.
`.trim();

function extractNavigation(text: string): { reply: string; navigateTo?: string } {
  const navMatch = text.match(/NAVIGATE:(\w+)/);
  if (!navMatch) return { reply: text };

  const map: Record<string, string> = {
    Duels: "MainTabs",
    WorldDrop: "MainTabs",
    Tokens: "EnergyTokens",
    VibeDNA: "VibeDNA",
    SoundAlchemy: "SoundAlchemy",
    AlterEgo: "AlterEgo",
    MotionMatch: "MotionMatch",
    LifeStamps: "LifeStamps",
    Store: "Store",
    Settings: "Settings",
    Search: "Search",
  };

  const cleanText = text.replace(navMatch[0], "").trim();
  return { reply: cleanText, navigateTo: map[navMatch[1]] };
}

export function registerVisorRoutes(app: any) {
  app.post("/visor/chat", asyncHandler(async (req: Request, res: Response) => {
    const body = z.object({
      message: z.string().min(1),
      provider: z.enum(["ollama", "gemini"]).default("ollama"),
      history: z.array(z.object({ role: z.string(), content: z.string() })).optional(),
    }).parse(req.body);

    let replyText = "";

    if (body.provider === "gemini") {
      const history: { role: "user" | "model"; parts: { text: string }[] }[] = [
        { role: "user", parts: [{ text: body.message }] },
      ];
      replyText = await geminiChat(history, SEELAY_SYSTEM_PROMPT);
    } else {
      const messages = [
        { role: "system" as const, content: SEELAY_SYSTEM_PROMPT },
        ...(body.history ?? []).map((h: { role: string; content: string }) => ({ role: h.role as "system" | "user" | "assistant", content: h.content })),
        { role: "user" as const, content: body.message },
      ];
      replyText = await ollamaChat(messages, { temperature: 0.8, maxTokens: 256 });
    }

    const parsed = extractNavigation(replyText);
    ok(req, res, parsed);
  }));

  app.get("/visor/models", asyncHandler(async (_req: Request, res: Response) => {
    try {
      const { ollamaListModels } = await import("../services/ollama.js");
      const models = await ollamaListModels();
      ok(_req, res, { ollama: models, gemini: [process.env.GEMINI_MODEL ?? "gemini-2.0-flash"] });
    } catch {
      ok(_req, res, { ollama: [], gemini: [process.env.GEMINI_MODEL ?? "gemini-2.0-flash"] });
    }
  }));
}
