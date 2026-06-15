import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import { GlassCard, glassTokens } from '../../components/Glass';
import { api } from '../../api/client';
import { colors, typography, spacing } from '../../theme';

export default function EnergyTokensScreen() {
  const [balance, setBalance] = useState<number>(1240);
  const [ledger, setLedger] = useState<Array<{ id: string; kind: string; amount: number; reason: string }>>([]);

  useEffect(() => {
    api.wallet().then((data: any) => {
      if (data?.balance != null) setBalance(data.balance);
      if (data?.ledger) setLedger(data.ledger);
    }).catch(() => {});
  }, []);

  return (
    <ScreenContainer>
      <Header title="Energy Tokens" showBack showSearch={false} showNotifications={false} />

      {/* Balance */}
      <GlassCard style={styles.balanceCard} padding={spacing.lg} elevated>
        <Text style={[styles.balanceLabel, { color: colors.textMuted }]}>Your Balance</Text>
        <Text style={[styles.balanceValue, { color: colors.textPrimary }]}>{balance.toLocaleString()}</Text>
        <View style={styles.balanceRow}>
          <Ionicons name="flash" size={16} color={colors.sand[0]} />
          <Text style={[styles.balanceSub, { color: colors.textSecondary }]}>Earned from {ledger.length || 47} body movements</Text>
        </View>
      </GlassCard>

      {/* Earn */}
      <Text style={styles.sectionTitle}>Earn Tokens</Text>
      {[
        { icon: 'walk', title: 'Jump 50x', reward: 100, progress: 0.6 },
        { icon: 'flash', title: 'Complete a Duel', reward: 200, progress: 1 },
        { icon: 'time', title: '7-Day Streak', reward: 350, progress: 0.85 },
        { icon: 'globe', title: 'World Drop Entry', reward: 500, progress: 0 },
      ].map((task) => (
        <View key={task.title} style={styles.taskRow}>
          <View style={styles.taskIcon}>
            <Ionicons name={task.icon as any} size={20} color={colors.sand[0]} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.taskTitle}>{task.title}</Text>
            <View style={styles.taskTrack}>
              <View style={[styles.taskFill, { width: `${task.progress * 100}%` }]} />
            </View>
          </View>
          <View style={styles.rewardBadge}>
            <Text style={styles.rewardText}>+{task.reward}</Text>
          </View>
        </View>
      ))}

      {/* Spend */}
      <Text style={styles.sectionTitle}>Spend Tokens</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.spendRow}>
        {[
          { icon: 'color-filter', label: 'Filters', cost: 150 },
          { icon: 'trending-up', label: 'Clip Boost', cost: 200 },
          { icon: 'flash', label: 'Duel Entry', cost: 100 },
          { icon: 'heart', label: 'Match Unlock', cost: 300 },
        ].map((item) => (
          <TouchableOpacity key={item.label} activeOpacity={0.8} style={[styles.spendCard, { backgroundColor: glassTokens.bg, borderColor: glassTokens.border }]}>
            <Ionicons name={item.icon as any} size={28} color={colors.sand[0]} />
            <Text style={styles.spendLabel}>{item.label}</Text>
            <Text style={styles.spendCost}>{item.cost} tokens</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Brand sponsors */}
      <Text style={styles.sectionTitle}>Brand Challenges</Text>
      <GlassCard style={styles.brandCard} padding={spacing.md}>
        <View style={styles.brandHeader}>
          <Ionicons name="fitness" size={24} color={colors.sand[0]} />
          <Text style={styles.brandName}>Nike Move Challenge</Text>
        </View>
        <Text style={styles.brandSub}>Complete 100 jumps this week</Text>
        <GradientButton title="Claim 500 Bonus" onPress={() => {}} size="sm" variant="success" />
      </GlassCard>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  balanceLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(10,10,10,0.7)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  balanceValue: {
    fontSize: 48,
    fontWeight: '900',
    color: '#0a0a0a',
    marginVertical: spacing.sm,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  balanceSub: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(10,10,10,0.6)',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  taskIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(212,184,150,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 4,
  },
  taskTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  taskFill: {
    height: '100%',
    backgroundColor: colors.sand[0],
    borderRadius: 3,
  },
  rewardBadge: {
    backgroundColor: 'rgba(212,184,150,0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 10,
  },
  rewardText: {
    ...typography.small,
    color: colors.sand[0],
    fontWeight: '800',
  },
  spendRow: {
    gap: spacing.md,
    paddingBottom: spacing.md,
  },
  spendCard: {
    width: 110,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
  },
  spendLabel: {
    ...typography.small,
    color: colors.textPrimary,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  spendCost: {
    ...typography.tiny,
    color: colors.textMuted,
    marginTop: 2,
  },
  brandCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.xl,
  },
  brandHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  brandName: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  brandSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
});
