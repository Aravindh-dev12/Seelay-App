/**
 * Google Gemini API client for Seelay Visor.
 * Set GEMINI_API_KEY in your environment.
 * Uses the Gemini 2.0 Flash model by default for speed + quality.
 */

const GEMINI_API_KEY = process.env.GEMINI_API_KEY ?? "";
const GEMINI_MODEL = process.env.GEMINI_MODEL ?? "gemini-2.0-flash";

export interface GeminiMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export async function geminiChat(
  history: GeminiMessage[],
  systemInstruction?: string
): Promise<string> {
  if (!GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not set");
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

  const body: any = { contents: history };
  if (systemInstruction) {
    body.systemInstruction = { parts: [{ text: systemInstruction }] };
  }

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "unknown");
    throw new Error(`Gemini error ${res.status}: ${text}`);
  }

  const json = await res.json();
  const candidate = json.candidates?.[0];
  const text = candidate?.content?.parts?.[0]?.text ?? "";
  return text.trim();
}
