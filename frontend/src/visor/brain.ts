import { api } from '../api/client';
import type { VisorReply } from './types';

/**
 * Calls the backend AI (Ollama local LLM or Gemini) for a real response.
 * Replaces the old regex rule engine with an actual language model.
 */
export async function visorThink(
  input: string,
  history: { role: string; content: string }[] = []
): Promise<VisorReply> {
  try {
    const response = (await api.visorChat(input, 'ollama', undefined, history)) as VisorReply;
    return {
      text: response.text ?? 'I heard you. Let me think on that.',
      navigateTo: response.navigateTo,
      providerUsed: response.providerUsed,
    };
  } catch {
    return {
      text: 'My AI core is waking up. Make sure Ollama is running locally (ollama run gemma4:12b) or your Gemini API key is set.',
    };
  }
}

export function visorGreeting(name?: string): string {
  return name
    ? `Welcome back, ${name}. Your body is the interface. Tap me anytime you need a guide.`
    : 'Welcome to Seelay. Your body is the interface. Tap me anytime you need a guide.';
}
