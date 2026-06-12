/**
 * Ollama client for local open-source LLM inference.
 * Requires Ollama running locally (or on a reachable server).
 * Install Ollama: https://ollama.com
 * Pull a model: ollama pull llama3.1
 */

const OLLAMA_BASE_URL = process.env.OLLAMA_URL ?? "http://localhost:11434";
const DEFAULT_MODEL = process.env.OLLAMA_MODEL ?? "llama3.1";

export interface OllamaChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OllamaChatOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}

export async function ollamaChat(
  messages: OllamaChatMessage[],
  options: OllamaChatOptions = {}
): Promise<string> {
  const model = options.model ?? DEFAULT_MODEL;
  const res = await fetch(`${OLLAMA_BASE_URL}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model,
      messages,
      stream: false,
      options: {
        temperature: options.temperature ?? 0.7,
        num_predict: options.maxTokens ?? 512,
      },
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "unknown");
    throw new Error(`Ollama error ${res.status}: ${text}`);
  }

  const json = await res.json();
  return (json.message?.content ?? json.response ?? "").trim();
}

export async function ollamaListModels(): Promise<string[]> {
  const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, { method: "GET" });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.models ?? []).map((m: any) => m.name as string);
}
