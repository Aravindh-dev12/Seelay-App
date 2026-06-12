export type VisorExpression = 'idle' | 'listening' | 'thinking' | 'speaking';

export interface VisorReply {
  text: string;
  navigateTo?: string;
}

/**
 * Voice layer for the Seelay Visor.
 * Simulation-first: swap the implementation (e.g. a real STT provider)
 * without changing any caller.
 */
export interface VisorVoiceService {
  speak(text: string, onDone?: () => void): void;
  stopSpeaking(): void;
  listen(onTranscript: (text: string) => void): void;
  stopListening(): void;
}

export type GestureKind = 'WAVE' | 'POINT' | 'THUMBS_UP' | 'KICK' | 'SPIN';

export interface GestureEvent {
  kind: GestureKind;
  confidence: number;
  at: number;
}

/**
 * Gesture layer for the Seelay Visor.
 * Simulation-first: a real pose model (e.g. @mediapipe/pose, already a dependency)
 * can replace the simulated implementation without changing product flows.
 */
export interface GestureRecognitionService {
  start(onGesture: (event: GestureEvent) => void): void;
  stop(): void;
}
