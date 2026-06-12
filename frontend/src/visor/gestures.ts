import type { GestureEvent, GestureKind, GestureRecognitionService } from './types';

const GESTURES: GestureKind[] = ['WAVE', 'POINT', 'THUMBS_UP', 'KICK', 'SPIN'];

/**
 * Simulated gesture recognition emitting plausible hand/leg gesture events.
 * Swap with a MediaPipe/TensorFlow-backed implementation (deps already installed)
 * that consumes camera frames and emits the same GestureEvent shape.
 */
export class SimulatedGestureRecognition implements GestureRecognitionService {
  private timer: ReturnType<typeof setInterval> | null = null;

  start(onGesture: (event: GestureEvent) => void) {
    this.stop();
    this.timer = setInterval(() => {
      const kind = GESTURES[Math.floor(Math.random() * GESTURES.length)];
      onGesture({ kind, confidence: 0.7 + Math.random() * 0.3, at: Date.now() });
    }, 12000 + Math.random() * 8000);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }
}

export const simulatedGestures: GestureRecognitionService = new SimulatedGestureRecognition();
