import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import { colors, typography, spacing } from '../../theme';

const MODULES = [
  {
    id: 'vibeDna',
    title: 'Vibe DNA',
    sub: 'Your unique movement fingerprint',
    icon: 'finger-print',
    gradient: colors.sand,
    screen: 'VibeDNA',
  },
  {
    id: 'lifeStamps',
    title: 'Life Stamps',
    sub: 'Milestone badges & timeline',
    icon: 'ribbon',
    gradient: colors.sage,
    screen: 'LifeStamps',
  },
  {
    id: 'soundAlchemy',
    title: 'Sound Alchemy',
    sub: 'Body-generated music tracks',
    icon: 'musical-notes',
    gradient: colors.copper,
    screen: 'SoundAlchemy',
  },
  {
    id: 'alterEgo',
    title: 'Alter Ego',
    sub: 'Anonymous second persona',
    icon: 'mask',
    gradient: colors.ash,
    screen: 'AlterEgo',
  },
  {
    id: 'energyTokens',
    title: 'Energy Tokens',
    sub: '1,240 tokens · Move to earn',
    icon: 'flash',
    gradient: colors.sand,
    screen: 'EnergyTokens',
  },
];

export default function IdentityHubScreen() {
  const navigation = useNavigation();

  return (
    <ScreenContainer>
      <Header title="Identity" showSearch={false} showNotifications={false} />

      {/* Profile mini-header */}
      <View style={styles.profileCard}>
        <View style={styles.avatar}>
          <Ionicons name="person" size={36} color={colors.textSecondary} />
        </View>
        <View>
          <Text style={styles.name}>Mira Kalyani</Text>
          <Text style={styles.handle}>@mira.kalyani · Bengaluru</Text>
        </View>
        <TouchableOpacity style={styles.editBtn}>
          <Ionicons name="create-outline" size={18} color={colors.textSecondary} />
        </TouchableOpacity>
      </View>

      {/* Quick stats */}
      <View style={styles.statsRow}>
        <Stat label="Clips" value="12" />
        <Stat label="Followers" value="1.2K" />
        <Stat label="Following" value="340" />
        <Stat label="Streak" value="9d" />
      </View>

      {/* Module grid */}
      <Text style={styles.sectionTitle}>Your Identity Layers</Text>
      <View style={styles.grid}>
        {MODULES.map((mod) => (
          <TouchableOpacity
            key={mod.id}
            style={styles.gridItem}
            onPress={() => navigation.navigate(mod.screen)}
          >
            <LinearGradient
              colors={mod.gradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.gridIconBg}
            >
              <Ionicons name={mod.icon as any} size={22} color="#0a0a0a" />
            </LinearGradient>
            <Text style={styles.gridTitle}>{mod.title}</Text>
            <Text style={styles.gridSub}>{mod.sub}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Recent stamps preview */}
      <Text style={styles.sectionTitle}>Latest Stamps</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.stampsRow}>
        {[
          { icon: 'videocam', title: 'First Mirror', color: colors.sand[0] },
          { icon: 'flame', title: 'Vibe Awakened', color: colors.copper[0] },
          { icon: 'trophy', title: 'Duel Winner', color: colors.sage[0] },
          { icon: 'heart', title: 'Match Made', color: colors.copper[0] },
          { icon: 'time', title: '7-Day Streak', color: colors.sand[0] },
        ].map((stamp, i) => (
          <View key={i} style={styles.stampChip}>
            <Ionicons name={stamp.icon as any} size={18} color={stamp.color} />
            <Text style={styles.stampChipText}>{stamp.title}</Text>
          </View>
        ))}
      </ScrollView>
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

const styles = StyleSheet.create({
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  handle: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  editBtn: {
    marginLeft: 'auto',
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
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
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  gridItem: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
    alignItems: 'center',
  },
  gridIconBg: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  gridTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
    textAlign: 'center',
  },
  gridSub: {
    ...typography.small,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },
  stampsRow: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  stampChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  stampChipText: {
    ...typography.small,
    color: colors.textPrimary,
    fontWeight: '600',
  },
});
