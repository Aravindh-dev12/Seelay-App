import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import { colors, typography, spacing } from '../../theme';

type Step = 'scan' | 'suggest' | 'duel' | 'heart' | 'chat';

interface MatchProfile {
  id: string;
  displayName: string;
  clips: { id: string; tag: string; duration: string }[];
  compatibility: number;
  dnaTraits: string[];
}

const STEPS: { key: Step; label: string; num: number }[] = [
  { key: 'scan', label: 'DNA Scan', num: 1 },
  { key: 'suggest', label: 'Match', num: 2 },
  { key: 'duel', label: 'Live Duel', num: 3 },
  { key: 'heart', label: 'React', num: 4 },
  { key: 'chat', label: 'Connect', num: 5 },
];

export default function MotionMatchScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState<Step>('scan');
  const [match] = useState<MatchProfile>({
    id: 'match_1',
    displayName: 'Zara Alchemy',
    clips: [
      { id: 'c1', tag: 'Midnight Flow', duration: '3.2s' },
      { id: 'c2', tag: 'Jump Bass', duration: '2.8s' },
      { id: 'c3', tag: 'Wave Form', duration: '4.1s' },
    ],
    compatibility: 91,
    dnaTraits: ['High Energy', 'Rhythmic', 'Creative'],
  });
  const [liked, setLiked] = useState(false);
  const [matched, setMatched] = useState(false);
  const cardScale = useSharedValue(1);

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: cardScale.value }],
  }));

  const nextStep = () => {
    const order: Step[] = ['scan', 'suggest', 'duel', 'heart', 'chat'];
    const idx = order.indexOf(step);
    if (idx < order.length - 1) {
      setStep(order[idx + 1]);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  const handleHeart = () => {
    setLiked(true);
    cardScale.value = withSpring(1.1, { damping: 5 });
    setTimeout(() => { cardScale.value = withSpring(1); }, 200);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => setMatched(true), 600);
  };

  if (step === 'chat' || matched) {
    return (
      <ScreenContainer>
        <Header title="Motion Match" showSearch={false} showNotifications={false} />
        <View style={styles.matchOverlay}>
          <Ionicons name="heart" size={64} color={colors.copper[0]} />
          <Text style={styles.matchTitle}>Connection Unlocked</Text>
          <Text style={styles.matchSub}>You both reacted with a heart during the duel</Text>
          <View style={styles.matchActions}>
            <GradientButton title="Start Chat" onPress={() => navigation.navigate('Chat', { chatId: 'match_1', participantName: match.displayName })} size="lg" />
            <GradientButton title="Duel Date" onPress={() => navigation.navigate('DuelRoom', { duelId: 'date_1' })} variant="secondary" size="lg" />
          </View>
        </View>
      </ScreenContainer>
    );
  }

  return (
    <ScreenContainer scroll={false}>
      <Header title="Motion Match" showSearch={false} showNotifications={false} />

      {/* Stepper */}
      <View style={styles.stepper}>
        {STEPS.map((s: typeof STEPS[0], idx: number) => {
          let currentIdx = 0;
          for (let i = 0; i < STEPS.length; i++) {
            if (STEPS[i].key === step) { currentIdx = i; break; }
          }
          const active = currentIdx >= idx;
          return (
            <View key={s.key} style={styles.stepNode}>
              <View style={[styles.stepDot, active && styles.stepDotActive]}>
                <Text style={[styles.stepNum, active && styles.stepNumActive]}>{s.num}</Text>
              </View>
              <Text style={[styles.stepLabel, active && styles.stepLabelActive]}>{s.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Step content */}
      <View style={styles.content}>
        {step === 'scan' && (
          <View style={styles.stepCard}>
            <Ionicons name="scan-circle" size={48} color={colors.sand[0]} />
            <Text style={styles.stepTitle}>DNA Compatibility Scan</Text>
            <Text style={styles.stepBody}>
              AI reads your energy intensity, rhythm, movement style, humor, and creativity from all clips. Finding users with compatible DNA...
            </Text>
            <View style={styles.traitsRow}>
              {match.dnaTraits.map((t) => (
                <View key={t} style={styles.traitChip}>
                  <Text style={styles.traitText}>{t}</Text>
                </View>
              ))}
            </View>
            <GradientButton title="Find Match" onPress={nextStep} size="lg" style={{ marginTop: spacing.lg }} />
          </View>
        )}

        {step === 'suggest' && (
          <Animated.View style={[styles.stepCard, cardStyle]}>
            <Text style={styles.stepTitle}>Match Found</Text>
            <Text style={styles.stepBody}>No photo. No bio. Just movement.</Text>
            <View style={styles.clipsBox}>
              {match.clips.map((c) => (
                <View key={c.id} style={styles.clipItem}>
                  <Ionicons name="play-circle" size={20} color={colors.sand[0]} />
                  <Text style={styles.clipTag}>{c.tag}</Text>
                  <Text style={styles.clipDur}>{c.duration}</Text>
                </View>
              ))}
            </View>
            <View style={styles.compBadge}>
              <Text style={styles.compLabel}>Vibe DNA Match</Text>
              <Text style={styles.compValue}>{match.compatibility}%</Text>
            </View>
            <GradientButton title="Accept Duel Date" onPress={nextStep} size="lg" style={{ marginTop: spacing.lg }} />
          </Animated.View>
        )}

        {step === 'duel' && (
          <View style={styles.stepCard}>
            <Ionicons name="flash" size={48} color={colors.sand[0]} />
            <Text style={styles.stepTitle}>Live Duel Challenge</Text>
            <Text style={styles.stepBody}>
              Both users enter a live duel with the same challenge simultaneously. This IS the first date — a shared experience.
            </Text>
            <View style={styles.duelPreview}>
              <Text style={styles.duelTag}>Challenge: Mirror Wave</Text>
              <Text style={styles.duelSub}>60 seconds · Same beat · Both cameras on</Text>
            </View>
            <GradientButton title="Enter Live Duel" onPress={nextStep} size="lg" style={{ marginTop: spacing.lg }} />
          </View>
        )}

        {step === 'heart' && (
          <View style={styles.stepCard}>
            <Text style={styles.stepTitle}>React with Heart</Text>
            <Text style={styles.stepBody}>
              Both see each other's movement before a single word is typed. If both react with a heart during the duel, chat unlocks.
            </Text>
            <TouchableOpacity onPress={handleHeart} style={styles.heartBtnLarge}>
              <Ionicons name="heart" size={48} color={liked ? colors.copper[0] : colors.textSecondary} />
            </TouchableOpacity>
            <Text style={styles.hint}>Tap the heart if you felt the connection</Text>
          </View>
        )}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  stepper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    marginBottom: spacing.md,
  },
  stepNode: {
    alignItems: 'center',
    flex: 1,
  },
  stepDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepDotActive: {
    backgroundColor: colors.sand[0],
    borderColor: colors.sand[0],
  },
  stepNum: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.textMuted,
  },
  stepNumActive: {
    color: '#0a0a0a',
  },
  stepLabel: {
    ...typography.tiny,
    color: colors.textMuted,
    marginTop: 4,
  },
  stepLabelActive: {
    color: colors.sand[0],
    fontWeight: '700',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  stepCard: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: spacing.lg,
    alignItems: 'center',
  },
  stepTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.md,
    textAlign: 'center',
  },
  stepBody: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 22,
  },
  traitsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  traitChip: {
    backgroundColor: 'rgba(212,184,150,0.12)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 12,
  },
  traitText: {
    ...typography.small,
    color: colors.sand[0],
    fontWeight: '700',
  },
  clipsBox: {
    width: '100%',
    marginTop: spacing.md,
    gap: spacing.sm,
  },
  clipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 12,
    padding: spacing.sm,
    gap: spacing.sm,
  },
  clipTag: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
    flex: 1,
  },
  clipDur: {
    ...typography.small,
    color: colors.textMuted,
  },
  compBadge: {
    marginTop: spacing.md,
    backgroundColor: 'rgba(212,184,150,0.15)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    alignItems: 'center',
  },
  compLabel: {
    ...typography.small,
    color: colors.sand[0],
    fontWeight: '600',
  },
  compValue: {
    ...typography.h2,
    color: colors.sand[0],
  },
  duelPreview: {
    width: '100%',
    backgroundColor: 'rgba(212,184,150,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(212,184,150,0.2)',
    borderRadius: 14,
    padding: spacing.md,
    marginTop: spacing.md,
    alignItems: 'center',
  },
  duelTag: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  duelSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  heartBtnLarge: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  hint: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  matchOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  matchTitle: {
    ...typography.h1,
    color: colors.sand[0],
    textAlign: 'center',
  },
  matchSub: {
    ...typography.h3,
    color: colors.textSecondary,
    textAlign: 'center',
  },
  matchActions: {
    width: '100%',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
});
