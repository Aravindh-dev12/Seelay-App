import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import { colors, typography, spacing } from '../../theme';

const LIFE_STAMPS = [
  { id: 'ls_1', icon: 'videocam', title: 'First Mirror Moment' },
  { id: 'ls_2', icon: 'flame', title: 'Vibe DNA Awakened' },
  { id: 'ls_3', icon: 'trophy', title: 'Campus Duel Winner' },
];

export default function ProfileScreen() {
  const navigation = useNavigation();

  return (
    <ScreenContainer>
      <Header showSearch={false} showNotifications={false} />

      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={40} color={colors.textSecondary} />
        </View>
        <Text style={styles.name}>Mira Kalyani</Text>
        <Text style={styles.username}>@mira.kalyani</Text>
        <View style={styles.badge}>
          <Ionicons name="shield-checkmark" size={14} color={colors.sage[0]} />
          <Text style={styles.badgeText}>Verified Campus</Text>
        </View>
      </View>

      <View style={styles.statsRow}>
        <Stat label="Clips" value="12" />
        <Stat label="Followers" value="1.2K" />
        <Stat label="Following" value="340" />
        <Stat label="Tokens" value="1,200" />
      </View>

      <View style={styles.vibeDna}>
        <Text style={styles.vibeTitle}>Vibe DNA</Text>
        <View style={styles.dnaBar}>
          <View style={[styles.dnaFill, { width: '72%', backgroundColor: colors.sand[0] }]} />
        </View>
        <View style={styles.dnaMetrics}>
          <Text style={styles.dnaLabel}>Motion 72%</Text>
          <Text style={styles.dnaLabel}>Rhythm 88%</Text>
          <Text style={styles.dnaLabel}>Energy 65%</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Life Stamps</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stampsRow}>
        {LIFE_STAMPS.map((stamp) => (
          <View key={stamp.id} style={styles.stampCard}>
            <View style={styles.stampIcon}>
              <Ionicons name={stamp.icon as any} size={24} color={colors.sand[0]} />
            </View>
            <Text style={styles.stampTitle}>{stamp.title}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.menu}>
        <MenuItem icon="settings-outline" label="Settings" onPress={() => navigation.navigate('Settings')} />
        <MenuItem icon="wallet-outline" label="Wallet & Tokens" onPress={() => {}} />
        <MenuItem icon="cart-outline" label="Store" onPress={() => navigation.navigate('Store')} />
        <MenuItem icon="ribbon-outline" label="Life Stamps" onPress={() => navigation.navigate('LifeStamps')} />
      </View>
    </ScreenContainer>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function MenuItem({ icon, label, onPress }: { icon: string; label: string; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.menuItem}>
      <Ionicons name={icon as any} size={22} color={colors.textSecondary} />
      <Text style={styles.menuLabel}>{label}</Text>
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  avatarSection: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  avatar: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 2,
    borderColor: colors.borderActive,
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  username: {
    ...typography.caption,
    color: colors.textSecondary,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: spacing.sm,
    backgroundColor: 'rgba(125,168,138,0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    ...typography.small,
    color: colors.sage[0],
    fontWeight: '700',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.lg,
  },
  statBox: {
    alignItems: 'center',
  },
  statValue: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  statLabel: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: 2,
  },
  vibeDna: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  vibeTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  dnaBar: {
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  dnaFill: {
    height: '100%',
    borderRadius: 4,
  },
  dnaMetrics: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  dnaLabel: {
    ...typography.small,
    color: colors.textSecondary,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  stampsRow: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  stampCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
    alignItems: 'center',
    minWidth: 120,
  },
  stampIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212,184,150,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  stampTitle: {
    ...typography.small,
    color: colors.textPrimary,
    fontWeight: '600',
    textAlign: 'center',
  },
  menu: {
    marginTop: spacing.lg,
    gap: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
    gap: spacing.md,
  },
  menuLabel: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
  },
});
