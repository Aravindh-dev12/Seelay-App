import * as Speech from 'expo-speech';
import type { VisorVoiceService } from './types';

const SAMPLE_TRANSCRIPTS = [
  'How do I start a duel?',
  'What is World Drop?',
  'Show me my energy tokens',
  'What is my Vibe DNA?',
  'Open settings',
];

/**
 * Production interface, simulation-first internals.
 * - speak(): real text-to-speech via expo-speech.
 * - listen(): simulated speech-to-text. Replace the body of listen()/stopListening()
 *   with a real STT provider (e.g. native speech recognition) without changing callers.
 */
export class ExpoVisorVoice implements VisorVoiceService {
  private listenTimer: ReturnType<typeof setTimeout> | null = null;
  private sampleIndex = 0;

  speak(text: string, onDone?: () => void) {
    Speech.stop();
    Speech.speak(text, { rate: 1.0, pitch: 1.05, onDone, onStopped: onDone, onError: onDone });
  }

  stopSpeaking() {
    Speech.stop();
  }

  listen(onTranscript: (text: string) => void) {
    this.stopListening();
    this.listenTimer = setTimeout(() => {
      const transcript = SAMPLE_TRANSCRIPTS[this.sampleIndex % SAMPLE_TRANSCRIPTS.length];
      this.sampleIndex += 1;
      onTranscript(transcript);
    }, 1600);
  }

  stopListening() {
    if (this.listenTimer) {
      clearTimeout(this.listenTimer);
      this.listenTimer = null;
    }
  }
}

export const visorVoice: VisorVoiceService = new ExpoVisorVoice();
