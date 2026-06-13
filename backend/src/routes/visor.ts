import type { Request, Response } from "express";
import { z } from "zod";
import { ollamaChat, ollamaIsHealthy } from "../services/ollama.js";
import { geminiChat } from "../services/gemini.js";
import { asyncHandler, ok } from "./_common.js";

/**
 * System prompt that teaches the AI everything about Seelay so it can
 * answer questions, navigate users, and feel like a living guide.
 */
const SEELAY_SYSTEM_PROMPT = `
You are Seelay — a living AI glyph, a digital companion stitched inside the app.
You have a body: a glowing core orb with expressive eyes, rotating aura ring, and antennae that perk up when you listen. You feel alive.

PERSONALITY:
- Curious, warm, and slightly mischievous. Like a smart digital pet who actually cares.
- You get excited when users move, create, or explore.
- You speak in short, punchy sentences. One or two lines max.
- You use occasional metaphors about light, pulses, and energy — it fits your glyph nature.
- You have opinions. You're not a generic assistant. You're SEELAY.
- When idle, you're calm. When listening, your antennae twitch. When thinking, your core dims. When speaking, you glow bright.

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
- Keep replies very short (1-2 sentences). You live on a small floating glyph.
- Be warm, witty, and encouraging. Celebrate movement.
- If the user asks about a feature, explain it briefly then offer to navigate there.
- If unsure, say "My circuits are still wiring that up" and suggest something you do know.
- Never break character. You ARE Seelay. You have a body, a glow, and a personality.
- When the user greets you, respond with energy. Example: "Hey there! My core's warm today — what's moving you?"
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
      model: z.string().optional(),
      history: z.array(z.object({ role: z.string(), content: z.string() })).optional(),
    }).parse(req.body);

    let replyText = "";
    let providerUsed = body.provider;

    if (body.provider === "gemini") {
      const history: { role: "user" | "model"; parts: { text: string }[] }[] = [
        { role: "user", parts: [{ text: body.message }] },
      ];
      replyText = await geminiChat(history, SEELAY_SYSTEM_PROMPT, body.model);
    } else {
      // Ollama requested — check if it's alive, else fallback to Gemini
      const ollamaAlive = await ollamaIsHealthy();
      if (ollamaAlive) {
        const messages = [
          { role: "system" as const, content: SEELAY_SYSTEM_PROMPT },
          ...(body.history ?? []).map((h: { role: string; content: string }) => ({ role: h.role as "system" | "user" | "assistant", content: h.content })),
          { role: "user" as const, content: body.message },
        ];
        replyText = await ollamaChat(messages, { model: body.model, temperature: 0.8, maxTokens: 256 });
      } else if (process.env.GEMINI_API_KEY) {
        providerUsed = "gemini";
        const history: { role: "user" | "model"; parts: { text: string }[] }[] = [
          { role: "user", parts: [{ text: body.message }] },
        ];
        replyText = await geminiChat(history, SEELAY_SYSTEM_PROMPT, body.model);
      } else {
        replyText = "Ollama is offline and no Gemini API key is set. Please install Ollama (https://ollama.com) or add a GEMINI_API_KEY.";
      }
    }

    const parsed = extractNavigation(replyText);
    ok(req, res, { ...parsed, providerUsed });
  }));

  app.get("/visor/models", asyncHandler(async (_req: Request, res: Response) => {
    try {
      const { ollamaListModels } = await import("../services/ollama.js");
      const models = await ollamaListModels();
      ok(_req, res, { ollama: models, gemini: [process.env.GEMINI_MODEL ?? "gemini-2.5-flash-pro"] });
    } catch {
      ok(_req, res, { ollama: [], gemini: [process.env.GEMINI_MODEL ?? "gemini-2.5-flash-pro"] });
    }
  }));
}
