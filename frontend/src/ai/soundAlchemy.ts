/**
 * Sound Alchemy: Real-time sound generation from motion data.
 * Uses Tone.js to synthesize audio based on body movement vectors.
 */

import * as Tone from 'tone';

let synth: Tone.PolySynth | null = null;
let isInitialized = false;

/**
 * Initialize Tone.js synthesizer.
 */
export async function initSoundAlchemy() {
  if (isInitialized) return;
  await Tone.start();
  synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: { type: 'triangle' },
    envelope: { attack: 0.02, decay: 0.1, sustain: 0.3, release: 1 },
  }).toDestination();
  isInitialized = true;
}

/**
 * Map motion intensity to a musical note.
 */
function intensityToNote(intensity: number): string {
  const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5'];
  const index = Math.floor((intensity / 100) * (notes.length - 1));
  return notes[Math.min(index, notes.length - 1)];
}

/**
 * Trigger a sound event from motion data.
 */
export function triggerFromMotion(motionVector: number[], intensity: number) {
  if (!synth) return;
  const note = intensityToNote(intensity);
  const velocity = Math.min(1, intensity / 100);
  synth.triggerAttackRelease(note, '8n', undefined, velocity);
}

/**
 * Generate a full Sound Alchemy track from a sequence of motion vectors.
 */
export async function generateTrack(frames: number[][]): Promise<string> {
  // TODO: Build a Tone.js Sequence or Part from frames
  console.log('Generating Sound Alchemy track from', frames.length, 'frames');
  return 'data:audio/wav;base64,stub';
}

/**
 * Cleanup Tone.js resources.
 */
export function disposeSoundAlchemy() {
  synth?.dispose();
  synth = null;
  isInitialized = false;
}
