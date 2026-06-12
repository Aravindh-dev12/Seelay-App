import type { DuelScore, MotionVector, SoundAlchemyProfile, VibeDna } from "@seelay/shared";

export function buildSoundAlchemy(vector: MotionVector): SoundAlchemyProfile {
  return {
    bpm: clamp(80 + Math.round(vector.tempo * 0.9), 80, 170),
    bass: clamp(Math.round(vector.intensity * 1.1), 0, 100),
    synth: clamp(Math.round((vector.creativity + vector.rhythm) / 2), 0, 100),
    reverb: clamp(100 - Math.round(vector.confidence * 0.5), 10, 80),
    dropMomentsMs: [1200, 3100, 4800].filter((_, index) => vector.intensity > 40 + index * 15)
  };
}

export function scoreDuel(vector: MotionVector, crowdLikes: number): DuelScore {
  const motion = clamp(Math.round((vector.intensity + vector.confidence) / 2), 0, 100);
  const rhythm = clamp(Math.round((vector.rhythm + vector.tempo) / 2), 0, 100);
  const creativity = clamp(Math.round((vector.creativity + vector.humor) / 2), 0, 100);
  const crowd = clamp(Math.round(crowdLikes / 20), 0, 100);
  return {
    motion,
    rhythm,
    creativity,
    crowd,
    total: Math.round(motion * 0.35 + rhythm * 0.25 + creativity * 0.25 + crowd * 0.15)
  };
}

export function simulateVibeDna(userId: string, clipCount: number): VibeDna {
  const seed = [...userId].reduce((sum, char) => sum + char.charCodeAt(0), 0) + clipCount * 11;
  const vector = {
    intensity: 55 + (seed % 37),
    rhythm: 50 + (seed % 31),
    creativity: 52 + (seed % 43),
    humor: 45 + (seed % 29),
    confidence: 58 + (seed % 35),
    tempo: 60 + (seed % 33)
  };
  return {
    userId,
    vector,
    strand: ["pulse", "spark", "flow", "echo", "lift"].map((part, index) => `${part}-${(seed + index * 13) % 100}`),
    generatedAt: new Date().toISOString()
  };
}

export function compatibilityScore(a: MotionVector, b: MotionVector) {
  const distance = Math.sqrt(
    Math.pow(a.intensity - b.intensity, 2) +
    Math.pow(a.rhythm - b.rhythm, 2) +
    Math.pow(a.creativity - b.creativity, 2) +
    Math.pow(a.humor - b.humor, 2) +
    Math.pow(a.confidence - b.confidence, 2) +
    Math.pow(a.tempo - b.tempo, 2)
  );
  return clamp(Math.round(100 - distance / 2.4), 0, 100);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
