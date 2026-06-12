import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import { api } from '../../api/client';
import { colors, typography, spacing } from '../../theme';

interface Duel {
  id: string;
  title: string;
  subtitle: string;
  reward: number;
  motion: number;
  rhythm: number;
  crowd: number;
}

function DuelCard({ duel }: { duel: Duel }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('DuelRoom', { duelId: duel.id })}
      style={styles.card}
    >
      <View style={styles.cardHeader}>
        <View>
          <Text style={styles.cardTitle}>{duel.title}</Text>
          <Text style={styles.cardSubtitle}>{duel.subtitle}</Text>
        </View>
        <View style={styles.rewardBadge}>
          <Ionicons name="flash" size={14} color={colors.sand[0]} />
          <Text style={styles.rewardText}>+{duel.reward}</Text>
        </View>
      </View>

      <View style={styles.metricsRow}>
        <Metric label="Motion" value={duel.motion} />
        <Metric label="Rhythm" value={duel.rhythm} />
        <Metric label="Crowd" value={duel.crowd} />
      </View>
    </TouchableOpacity>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <View style={styles.metricBox}>
      <Text style={styles.metricLabel}>{label}</Text>
      <Text style={styles.metricValue}>{value}</Text>
    </View>
  );
}

const CAMPUSES = ['All', 'Mumbai', 'Bengaluru', 'Delhi', 'Pune'];
const CATEGORIES = ['All', 'Dance', 'Trick', 'Reaction'];

export default function DuelsScreen() {
  const [duels, setDuels] = useState<Duel[]>([]);
  const [campus, setCampus] = useState('All');
  const [category, setCategory] = useState('All');
  const navigation = useNavigation();

  useEffect(() => {
    const mockDuels: Duel[] = [
      { id: 'duel_1', title: 'Campus Footwork Duel', subtitle: 'Mumbai Arts College · 60s · live', reward: 200, motion: 92, rhythm: 88, crowd: 76 },
      { id: 'duel_2', title: 'Reaction Snap', subtitle: 'Open city challenge · 30s', reward: 150, motion: 88, rhythm: 91, crowd: 82 },
      { id: 'duel_3', title: 'Jump Bass Drop', subtitle: 'National qualifier · 45s', reward: 300, motion: 96, rhythm: 85, crowd: 90 },
      { id: 'duel_4', title: 'Bengaluru Bounce', subtitle: 'Bengaluru Tech Park · 45s', reward: 250, motion: 89, rhythm: 94, crowd: 88 },
    ];
    setDuels(mockDuels);
  }, []);

  const filtered = duels.filter((d: Duel) => {
    const cMatch = campus === 'All' || d.subtitle.includes(campus);
    const catMatch = category === 'All' || d.title.toLowerCase().includes(category.toLowerCase());
    return cMatch && catMatch;
  });

  return (
    <ScreenContainer>
      <Header title="Campus Duels" showSearch={false} showNotifications={false} />

      {/* Campus filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterRow}>
        {CAMPUSES.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setCampus(c)}
            style={[styles.filterChip, campus === c && styles.filterChipActive]}
          >
            <Text style={[styles.filterText, campus === c && styles.filterTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Category filter */}
      <View style={styles.catRow}>
        {CATEGORIES.map((c) => (
          <TouchableOpacity
            key={c}
            onPress={() => setCategory(c)}
            style={[styles.catChip, category === c && styles.catChipActive]}
          >
            <Text style={[styles.catText, category === c && styles.catTextActive]}>{c}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.sectionHeader}>
        <Ionicons name="flash" size={24} color={colors.sand[0]} />
        <Text style={styles.sectionTitle}>Live Duels</Text>
        <View style={styles.liveDot} />
        <Text style={styles.liveText}>{filtered.length} active</Text>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item: Duel) => item.id}
        renderItem={({ item }: { item: Duel }) => <DuelCard duel={item} />}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      {/* Leaderboard teaser */}
      <Text style={styles.sectionTitle}>City Leaderboard</Text>
      <View style={styles.leaderRow}>
        <Text style={styles.leaderRank}>#1</Text>
        <Text style={styles.leaderName}>Rohan Vibe</Text>
        <Text style={styles.leaderScore}>2,340</Text>
      </View>
      <View style={styles.leaderRow}>
        <Text style={styles.leaderRank}>#2</Text>
        <Text style={styles.leaderName}>Priya Flow</Text>
        <Text style={styles.leaderScore}>2,100</Text>
      </View>

      <GradientButton
        title="Create Custom Duel"
        onPress={() => {}}
        variant="secondary"
        style={styles.createBtn}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  list: {
    gap: spacing.md,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.md,
  },
  cardTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  cardSubtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 4,
  },
  rewardBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212,184,150,0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 12,
    gap: 4,
  },
  rewardText: {
    ...typography.small,
    color: colors.sand[0],
    fontWeight: '800',
  },
  metricsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metricBox: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    padding: spacing.sm,
    alignItems: 'center',
  },
  metricLabel: {
    ...typography.small,
    color: colors.textMuted,
    fontWeight: '700',
  },
  metricValue: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '800',
    marginTop: 2,
  },
  createBtn: {
    marginTop: spacing.md,
  },
  filterRow: {
    gap: spacing.sm,
    paddingBottom: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: 'rgba(212,184,150,0.15)',
    borderColor: colors.sand[0],
  },
  filterText: {
    ...typography.small,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  filterTextActive: {
    color: colors.sand[0],
    fontWeight: '800',
  },
  catRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  catChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  catChipActive: {
    backgroundColor: 'rgba(125,168,138,0.15)',
    borderColor: colors.sage[0],
  },
  catText: {
    ...typography.small,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  catTextActive: {
    color: colors.sage[0],
    fontWeight: '800',
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.sage[0],
    marginLeft: spacing.sm,
  },
  liveText: {
    ...typography.small,
    color: colors.sage[0],
    fontWeight: '700',
    marginLeft: 4,
  },
  leaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  leaderRank: {
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
