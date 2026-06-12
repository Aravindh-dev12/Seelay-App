import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import { colors, typography, spacing } from '../../theme';

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
    <ScreenContainer>
      <Header title="World Drop" showSearch={false} showNotifications={false} />

      <View style={styles.hero}>
        <View style={styles.badge}>
          <Ionicons name="time" size={14} color={colors.sand[0]} />
          <Text style={styles.badgeText}>Every Friday · 8:00 PM IST</Text>
        </View>
        <Text style={styles.heroTitle}>India Pulse Drop</Text>
        <Text style={styles.heroSub}>
          60-second national challenge. Top 100 clips become the weekly seelay supercut posted to YouTube + Instagram.
        </Text>
      </View>

      {/* Countdown */}
      <LinearGradient
        colors={colors.copper}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.countdownCard}
      >
        <Text style={styles.countdownLabel}>Next Drop In</Text>
        <Text style={styles.countdownValue}>{formatTime(timeLeft)}</Text>
        <Text style={styles.countdownSub}>Friday 8:00 PM IST · 60s window</Text>
      </LinearGradient>

      <View style={styles.metricsRow}>
        <Metric label="Reward" value="500" icon="flash" />
        <Metric label="Window" value="60s" icon="time" />
        <Metric label="Your Rank" value="#42" icon="trophy" />
      </View>

      {entered ? (
        <View style={styles.enteredCard}>
          <Ionicons name="checkmark-circle" size={32} color={colors.sage[0]} />
          <Text style={styles.enteredTitle}>You are in the drop</Text>
          <Text style={styles.enteredSub}>Notification will fire at 7:58 PM IST</Text>
        </View>
      ) : (
        <GradientButton title="Enter World Drop" onPress={() => setEntered(true)} size="lg" />
      )}

      <Text style={styles.sectionTitle}>Global Leaderboard</Text>
      {[1, 2, 3, 4, 5].map((rank) => (
        <View key={rank} style={styles.leaderboardRow}>
          <Text style={styles.rankText}>#{rank}</Text>
          <Text style={styles.leaderName}>Creator {rank}</Text>
          <Text style={styles.leaderScore}>{950 - rank * 37}</Text>
        </View>
      ))}

      <View style={styles.viralBox}>
        <Ionicons name="videocam" size={20} color={colors.sand[0]} />
        <Text style={styles.viralText}>
          Being in the supercut = viral. This is the most powerful weekly retention event ever built into a social app.
        </Text>
      </View>
    </ScreenContainer>
  );
}

function Metric({ label, value, icon }: { label: string; value: string; icon: keyof typeof Ionicons.glyphMap }) {
  return (
    <View style={styles.metricBox}>
      <Ionicons name={icon} size={20} color={colors.sand[0]} />
      <Text style={styles.metricValue}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: 'rgba(212,184,150,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(212,184,150,0.2)',
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: spacing.sm,
  },
  badgeText: {
    ...typography.small,
    color: colors.sand[0],
    fontWeight: '700',
  },
  heroTitle: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  heroSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  metricBox: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    alignItems: 'center',
  },
  metricValue: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: 4,
  },
  metricLabel: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: 2,
  },
  countdownCard: {
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  countdownLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(10,10,10,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  countdownValue: {
    fontSize: 40,
    fontWeight: '900',
    color: '#0a0a0a',
    marginVertical: spacing.sm,
    fontVariant: ['tabular-nums'],
  },
  countdownSub: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(10,10,10,0.6)',
  },
  enteredCard: {
    backgroundColor: 'rgba(125,168,138,0.08)',
    borderWidth: 1,
    borderColor: colors.sage[0],
    borderRadius: 16,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  enteredTitle: {
    ...typography.h3,
    color: colors.sage[0],
    marginTop: spacing.sm,
  },
  enteredSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  viralBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: 'rgba(212,184,150,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(212,184,150,0.15)',
    borderRadius: 14,
    padding: spacing.md,
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
  viralText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  leaderboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rankText: {
    ...typography.small,
    color: colors.sand[0],
    width: 40,
    fontWeight: '700',
  },
  leaderName: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
  leaderScore: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '700',
  },
});
