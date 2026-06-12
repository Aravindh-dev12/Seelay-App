import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import { colors, typography, spacing } from '../../theme';

export default function DuelRoomScreen() {
  const route = useRoute<any>();
  const [countdown, setCountdown] = useState(3);
  const [phase, setPhase] = useState<'countdown' | 'recording' | 'submit' | 'result'>('countdown');
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (countdown > 0 && phase === 'countdown') {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (countdown === 0 && phase === 'countdown') {
      setPhase('recording');
    }
  }, [countdown, phase]);

  return (
    <ScreenContainer scroll={false}>
      <Header title="Duel Room" showBack showSearch={false} showNotifications={false} />

      {phase === 'countdown' && (
        <View style={styles.center}>
          <Text style={styles.countdown}>{countdown}</Text>
          <Text style={styles.countdownLabel}>Get ready...</Text>
        </View>
      )}

      {phase === 'recording' && (
        <View style={styles.center}>
          <View style={styles.recordingIndicator}>
            <View style={styles.recordingDot} />
            <Text style={styles.recordingText}>Recording</Text>
          </View>
          <Text style={styles.timer}>00:45</Text>
          <GradientButton title="Submit Clip" onPress={() => setPhase('submit')} />
        </View>
      )}

      {phase === 'submit' && (
        <View style={styles.center}>
          <Ionicons name="hourglass" size={48} color={colors.sand[0]} />
          <Text style={styles.submitTitle}>Processing motion...</Text>
          <Text style={styles.submitSub}>Sound Alchemy is generating your track</Text>
          <GradientButton
            title="View Results"
            onPress={() => { setScore(87); setPhase('result'); }}
            style={{ marginTop: spacing.lg }}
          />
        </View>
      )}

      {phase === 'result' && (
        <View style={styles.center}>
          <Text style={styles.scoreLabel}>Your Score</Text>
          <Text style={styles.scoreValue}>{score}</Text>
          <View style={styles.resultRow}>
            <ResultMetric label="Motion" value={92} />
            <ResultMetric label="Rhythm" value={88} />
            <ResultMetric label="Creativity" value={85} />
          </View>
          <GradientButton
            title="Back to Duels"
            onPress={() => {}}
            style={{ marginTop: spacing.lg }}
          />
        </View>
      )}
    </ScreenContainer>
  );
}

function ResultMetric({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.resultBox}>
      <Text style={styles.resultLabel}>{label}</Text>
      <Text style={styles.resultValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  countdown: {
    fontSize: 120,
    fontWeight: '900',
    color: colors.sand[0],
  },
  countdownLabel: {
    ...typography.h3,
    color: colors.textSecondary,
  },
  recordingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(196,144,122,0.2)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
  },
  recordingDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.copper[0],
  },
  recordingText: {
    ...typography.body,
    color: colors.copper[0],
    fontWeight: '700',
  },
  timer: {
    fontSize: 64,
    fontWeight: '900',
    color: colors.textPrimary,
    fontVariant: ['tabular-nums'],
  },
  submitTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  submitSub: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  scoreLabel: {
    ...typography.caption,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  scoreValue: {
    fontSize: 96,
    fontWeight: '900',
    color: colors.sage[0],
  },
  resultRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  resultBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    minWidth: 90,
  },
  resultLabel: {
    ...typography.small,
    color: colors.textMuted,
  },
  resultValue: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: 4,
  },
});
