import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard, GlassChip, GlassIconButton, SectionHeader, glassTokens } from '../../components/Glass';
import { colors, typography, spacing, gradients } from '../../theme';

interface Duel {
  id: string;
  title: string;
  subtitle: string;
  reward: number;
  motion: number;
  rhythm: number;
  crowd: number;
}

const CAMPUSES = ['All', 'Mumbai', 'Bengaluru', 'Delhi', 'Pune'];
const CATEGORIES = ['All', 'Dance', 'Trick', 'Reaction'];

const MOCK_DUELS: Duel[] = [
  { id: 'duel_1', title: 'Campus Footwork Duel', subtitle: 'Mumbai Arts College · 60s · live', reward: 200, motion: 92, rhythm: 88, crowd: 76 },
  { id: 'duel_2', title: 'Reaction Snap', subtitle: 'Open city challenge · 30s', reward: 150, motion: 88, rhythm: 91, crowd: 82 },
  { id: 'duel_3', title: 'Jump Bass Drop', subtitle: 'National qualifier · 45s', reward: 300, motion: 96, rhythm: 85, crowd: 90 },
  { id: 'duel_4', title: 'Bengaluru Bounce', subtitle: 'Bengaluru Tech Park · 45s', reward: 250, motion: 89, rhythm: 94, crowd: 88 },
];

const LEADERS = [
  { rank: 1, name: 'Rohan Vibe', score: 2340 },
  { rank: 2, name: 'Priya Flow', score: 2100 },
  { rank: 3, name: 'Aman Pulse', score: 1980 },
];

export default function DuelsScreen() {
  const navigation = useNavigation<any>();
  const [campus, setCampus] = useState('All');
  const [category, setCategory] = useState('All');

  const filtered = MOCK_DUELS.filter((d) => {
    const cMatch = campus === 'All' || d.subtitle.includes(campus);
    const catMatch = category === 'All' || d.title.toLowerCase().includes(category.toLowerCase());
    return cMatch && catMatch;
  });

  return (
    <LinearGradient
      colors={gradients.background.colors}
      start={gradients.background.start}
      end={gradients.background.end}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
          {/* Top bar */}
          <View style={styles.topBar}>
            <View>
              <Text style={styles.eyebrow}>CAMPUS · LIVE</Text>
              <Text style={styles.title}>Duels</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <GlassIconButton icon="search" size={42} onPress={() => navigation.navigate('Search')} />
              <GlassIconButton icon="trophy-outline" size={42} />
            </View>
          </View>

          {/* Campus filter */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.filterRow}
          >
            {CAMPUSES.map((c) => (
              <GlassChip key={c} label={c} active={campus === c} onPress={() => setCampus(c)} />
            ))}
          </ScrollView>

          {/* Category filter */}
          <View style={styles.catRow}>
            {CATEGORIES.map((c) => (
              <GlassChip key={c} label={c} active={category === c} onPress={() => setCategory(c)} />
            ))}
          </View>

          {/* Featured live card */}
          <GlassCard style={styles.featured} padding={spacing.lg} elevated>
            <View style={styles.liveBadge}>
              <View style={styles.liveDot} />
              <Text style={styles.liveText}>LIVE NOW</Text>
            </View>
            <Text style={styles.featuredTitle}>India National Cypher</Text>
            <Text style={styles.featuredSub}>3,142 viewers · 18 active duels</Text>
            <TouchableOpacity activeOpacity={0.85} style={styles.joinBtn}>
              <Ionicons name="play" size={16} color="#0a0a0a" />
              <Text style={styles.joinBtnText}>Join Cypher</Text>
            </TouchableOpacity>
          </GlassCard>

          <SectionHeader title="Live Duels" action="See all" />

          <View style={{ gap: spacing.md, paddingHorizontal: spacing.md }}>
            {filtered.map((duel) => (
              <DuelCard key={duel.id} duel={duel} onPress={() => navigation.navigate('DuelRoom', { duelId: duel.id })} />
            ))}
          </View>

          <SectionHeader title="City Leaderboard" action="View ranks" />

          <GlassCard style={{ marginHorizontal: spacing.md }} padding={spacing.md}>
            {LEADERS.map((l, idx) => (
              <View key={l.rank} style={[styles.leaderRow, idx === LEADERS.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.rankCircle}>
                  <Text style={styles.rankText}>#{l.rank}</Text>
                </View>
                <Text style={styles.leaderName}>{l.name}</Text>
                <Text style={styles.leaderScore}>{l.score.toLocaleString()}</Text>
              </View>
            ))}
          </GlassCard>

          <TouchableOpacity activeOpacity={0.85} style={styles.createBtn}>
            <Ionicons name="add" size={20} color={colors.textPrimary} />
            <Text style={styles.createBtnText}>Create Custom Duel</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function DuelCard({ duel, onPress }: { duel: Duel; onPress: () => void }) {
  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress}>
      <GlassCard padding={spacing.md}>
        <View style={styles.duelHead}>
          <View style={{ flex: 1 }}>
            <Text style={styles.duelTitle}>{duel.title}</Text>
            <Text style={styles.duelSub}>{duel.subtitle}</Text>
          </View>
          <View style={styles.rewardChip}>
            <Ionicons name="flash" size={14} color="#0a0a0a" />
            <Text style={styles.rewardText}>+{duel.reward}</Text>
          </View>
        </View>
        <View style={styles.duelMetrics}>
          <DuelMetric label="Motion" value={duel.motion} />
          <DuelMetric label="Rhythm" value={duel.rhythm} />
          <DuelMetric label="Crowd" value={duel.crowd} />
        </View>
      </GlassCard>
    </TouchableOpacity>
  );
}

function DuelMetric({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metricBox}>
      <Text style={styles.metricVal}>{value}</Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
  filterRow: {
    paddingHorizontal: spacing.md,
    gap: 8,
    paddingBottom: spacing.sm,
  },
  catRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  featured: {
    marginHorizontal: spacing.md,
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: glassTokens.radiusPill,
    backgroundColor: 'rgba(255,80,80,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,80,80,0.4)',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ff5050',
  },
  liveText: {
    ...typography.tiny,
    color: '#ff5050',
    fontWeight: '800',
  },
  featuredTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    marginTop: spacing.sm,
  },
  featuredSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 4,
  },
  joinBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ffffff',
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    borderRadius: glassTokens.radiusPill,
    alignSelf: 'flex-start',
    marginTop: spacing.md,
  },
  joinBtnText: {
    ...typography.small,
    color: '#0a0a0a',
    fontWeight: '800',
  },
  duelHead: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  duelTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  duelSub: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: 4,
  },
  rewardChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: glassTokens.radiusPill,
    backgroundColor: '#ffffff',
  },
  rewardText: {
    ...typography.small,
    color: '#0a0a0a',
    fontWeight: '800',
  },
  duelMetrics: {
    flexDirection: 'row',
    gap: 8,
  },
  metricBox: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: glassTokens.radiusSm,
    backgroundColor: glassTokens.bgSubtle,
    borderWidth: 1,
    borderColor: glassTokens.border,
    alignItems: 'center',
  },
  metricVal: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  metricLabel: {
    ...typography.tiny,
    color: colors.textMuted,
    marginTop: 2,
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
    backgroundColor: glassTokens.bgStrong,
    borderWidth: 1,
    borderColor: glassTokens.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    ...typography.small,
    color: colors.textPrimary,
    fontWeight: '800',
  },
  leaderName: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
    fontWeight: '600',
  },
  leaderScore: {
    ...typography.body,
    color: colors.textMuted,
    fontWeight: '700',
  },
  createBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginHorizontal: spacing.md,
    marginTop: spacing.lg,
    paddingVertical: 16,
    borderRadius: glassTokens.radius,
    backgroundColor: glassTokens.bg,
    borderWidth: 1,
    borderColor: glassTokens.borderStrong,
  },
  createBtnText: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
});
