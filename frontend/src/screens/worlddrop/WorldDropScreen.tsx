import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard, GlassChip, GlassIconButton, SectionHeader, glassTokens } from '../../components/Glass';
import { colors, typography, spacing, gradients } from '../../theme';

function pad(n: number) {
  return n < 10 ? '0' + n : String(n);
}

function formatTime(ms: number) {
  const h = Math.floor(ms / 3600000);
  const m = Math.floor((ms % 3600000) / 60000);
  const s = Math.floor((ms % 60000) / 1000);
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

export default function WorldDropScreen() {
  const [timeLeft, setTimeLeft] = useState(48 * 3600000 + 14 * 60000 + 32 * 1000);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t: number) => (t > 1000 ? t - 1000 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <LinearGradient
      colors={gradients.background.colors}
      start={gradients.background.start}
      end={gradients.background.end}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
          <View style={styles.topBar}>
            <View>
              <Text style={styles.eyebrow}>WEEKLY · INDIA</Text>
              <Text style={styles.title}>World Drop</Text>
            </View>
            <GlassIconButton icon="trophy-outline" size={42} />
          </View>

          {/* Hero countdown card */}
          <GlassCard style={styles.heroCard} padding={spacing.lg} elevated>
            <GlassChip label="Every Friday · 8:00 PM IST" icon="time-outline" />
            <Text style={styles.heroTitle}>India Pulse Drop</Text>
            <Text style={styles.heroSub}>
              60-second national challenge. Top 100 clips become the weekly Seelay supercut.
            </Text>

            <View style={styles.countdownInner}>
              <Text style={styles.countdownLabel}>Next drop in</Text>
              <Text style={styles.countdownValue}>{formatTime(timeLeft)}</Text>
              <View style={styles.countdownDots}>
                <Text style={styles.countdownUnit}>HRS</Text>
                <Text style={styles.countdownUnit}>MIN</Text>
                <Text style={styles.countdownUnit}>SEC</Text>
              </View>
            </View>

            {entered ? (
              <View style={styles.enteredRow}>
                <Ionicons name="checkmark-circle" size={20} color="#ffffff" />
                <Text style={styles.enteredText}>You're in. Notification at 7:58 PM IST.</Text>
              </View>
            ) : (
              <TouchableOpacity activeOpacity={0.85} onPress={() => setEntered(true)} style={styles.enterBtn}>
                <Ionicons name="flash" size={16} color="#0a0a0a" />
                <Text style={styles.enterBtnText}>Enter World Drop</Text>
              </TouchableOpacity>
            )}
          </GlassCard>

          <View style={styles.metricsRow}>
            <Metric label="Reward" value="500" icon="flash" />
            <Metric label="Window" value="60s" icon="time-outline" />
            <Metric label="Your Rank" value="#42" icon="trophy-outline" />
          </View>

          <SectionHeader title="Global Leaderboard" action="See full" />

          <GlassCard style={{ marginHorizontal: spacing.md }} padding={spacing.md}>
            {[1, 2, 3, 4, 5].map((rank) => (
              <View key={rank} style={[styles.leaderRow, rank === 5 && { borderBottomWidth: 0 }]}>
                <View style={[styles.rankCircle, rank <= 3 && styles.rankCirclePodium]}>
                  <Text style={[styles.rankText, rank <= 3 && { color: '#0a0a0a' }]}>#{rank}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.leaderName}>Creator {rank}</Text>
                  <Text style={styles.leaderMeta}>Mumbai · {950 - rank * 37} pts</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
              </View>
            ))}
          </GlassCard>

          <GlassCard style={{ marginHorizontal: spacing.md, marginTop: spacing.lg }} padding={spacing.md}>
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
              <View style={styles.viralIcon}>
                <Ionicons name="videocam" size={20} color={colors.textPrimary} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.viralTitle}>Get into the supercut</Text>
                <Text style={styles.viralBody}>
                  Top performers are featured every week on Seelay's official channels.
                </Text>
              </View>
            </View>
          </GlassCard>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Metric({ label, value, icon }: { label: string; value: string; icon: keyof typeof import('@expo/vector-icons').Ionicons.glyphMap }) {
  return (
    <View style={styles.metricBox}>
      <Ionicons name={icon} size={20} color={colors.textPrimary} />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  eyebrow: {
    ...typography.tiny,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginTop: 2,
  },
  heroCard: {
    marginHorizontal: spacing.md,
  },
  heroTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  heroSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 20,
  },
  countdownInner: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: glassTokens.radiusSm,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 1,
    borderColor: glassTokens.border,
    alignItems: 'center',
  },
  countdownLabel: {
    ...typography.tiny,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  countdownValue: {
    fontSize: 44,
    fontWeight: '900',
    color: colors.textPrimary,
    marginTop: 4,
    fontVariant: ['tabular-nums'],
  },
  countdownDots: {
    flexDirection: 'row',
    gap: 32,
    marginTop: 4,
  },
  countdownUnit: {
    ...typography.tiny,
    color: colors.textMuted,
    letterSpacing: 2,
  },
  enterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    paddingVertical: 14,
    borderRadius: glassTokens.radiusPill,
    marginTop: spacing.md,
  },
  enterBtnText: {
    ...typography.body,
    color: '#0a0a0a',
    fontWeight: '800',
  },
  enteredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.md,
    paddingVertical: 12,
    paddingHorizontal: spacing.md,
    backgroundColor: glassTokens.bgStrong,
    borderRadius: glassTokens.radiusPill,
    borderWidth: 1,
    borderColor: glassTokens.borderStrong,
  },
  enteredText: {
    ...typography.small,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    marginTop: spacing.lg,
  },
  metricBox: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: glassTokens.radiusSm,
    backgroundColor: glassTokens.bg,
    borderWidth: 1,
    borderColor: glassTokens.border,
    alignItems: 'center',
    gap: 4,
  },
  metricValue: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  metricLabel: {
    ...typography.tiny,
    color: colors.textMuted,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: glassTokens.border,
  },
  rankCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: glassTokens.bg,
    borderWidth: 1,
    borderColor: glassTokens.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankCirclePodium: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  rankText: {
    ...typography.small,
    color: colors.textPrimary,
    fontWeight: '800',
  },
  leaderName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  leaderMeta: {
    ...typography.tiny,
    color: colors.textMuted,
    marginTop: 2,
  },
  viralIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: glassTokens.bgStrong,
    borderWidth: 1,
    borderColor: glassTokens.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viralTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  viralBody: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 18,
  },
});
