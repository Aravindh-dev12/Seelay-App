import React from 'react';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import { colors, typography, spacing } from '../../theme';

const { width } = Dimensions.get('window');

const DNA_STRANDS = [
  { label: 'Motion Intensity', value: 72, color: colors.sand[0] },
  { label: 'Rhythm Sync', value: 88, color: colors.copper[0] },
  { label: 'Energy Burst', value: 65, color: colors.sage[0] },
  { label: 'Humor Flow', value: 54, color: colors.sand[1] },
  { label: 'Creative Flex', value: 91, color: colors.copper[1] },
  { label: 'Social Vibe', value: 77, color: colors.sage[1] },
];

export default function VibeDNADetailScreen() {
  return (
    <ScreenContainer>
      <Header title="Vibe DNA" showBack showSearch={false} showNotifications={false} />

      {/* DNA visual */}
      <View style={styles.dnaCard}>
        <View style={styles.dnaHeader}>
          <Ionicons name="finger-print" size={28} color={colors.sand[0]} />
          <View style={{ marginLeft: spacing.sm }}>
            <Text style={styles.dnaTitle}>Your Movement Fingerprint</Text>
            <Text style={styles.dnaSub}>Unique · Evolving · Uncloneable</Text>
          </View>
        </View>

        <View style={styles.dnaVisual}>
          {DNA_STRANDS.map((strand, i) => (
            <View key={strand.label} style={styles.strandRow}>
              <Text style={styles.strandLabel}>{strand.label}</Text>
              <View style={styles.strandTrack}>
                <LinearGradient
                  colors={[strand.color, colors.background]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={[styles.strandFill, { width: `${strand.value}%` }]}
                />
              </View>
              <Text style={[styles.strandValue, { color: strand.color }]}>{strand.value}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Compatibility */}
      <Text style={styles.sectionTitle}>Top DNA Matches</Text>
      {[
        { name: 'Zara Alchemy', match: 91, campus: 'Bengaluru' },
        { name: 'Rohan Vibe', match: 86, campus: 'Mumbai' },
        { name: 'Priya Flow', match: 82, campus: 'Delhi' },
      ].map((user) => (
        <View key={user.name} style={styles.matchRow}>
          <View style={styles.matchAvatar}>
            <Ionicons name="person" size={18} color={colors.textSecondary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.matchName}>{user.name}</Text>
            <Text style={styles.matchCampus}>{user.campus}</Text>
          </View>
          <View style={styles.matchBadge}>
            <Text style={styles.matchBadgeText}>{user.match}%</Text>
          </View>
        </View>
      ))}

      {/* Evolution timeline */}
      <Text style={styles.sectionTitle}>Evolution</Text>
      <View style={styles.timeline}>
        {['Week 1', 'Week 4', 'Week 8', 'Week 12'].map((w, i) => (
          <View key={w} style={styles.timelineNode}>
            <View style={[styles.timelineDot, i === 3 && styles.timelineDotActive]} />
            <Text style={styles.timelineLabel}>{w}</Text>
            <Text style={styles.timelineScore}>{60 + i * 12}%</Text>
          </View>
        ))}
        <View style={styles.timelineLine} />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  dnaCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.borderActive,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  dnaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  dnaTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  dnaSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  dnaVisual: {
    gap: spacing.md,
  },
  strandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  strandLabel: {
    ...typography.small,
    color: colors.textSecondary,
    width: 100,
  },
  strandTrack: {
    flex: 1,
    height: 8,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  strandFill: {
    height: '100%',
    borderRadius: 4,
  },
  strandValue: {
    ...typography.small,
    fontWeight: '800',
    width: 32,
    textAlign: 'right',
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  matchRow: {
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
  matchAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  matchName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  matchCampus: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: 2,
  },
  matchBadge: {
    backgroundColor: 'rgba(212,184,150,0.15)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 10,
  },
  matchBadgeText: {
    ...typography.small,
    color: colors.sand[0],
    fontWeight: '800',
  },
  timeline: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.xl,
    position: 'relative',
  },
  timelineLine: {
    position: 'absolute',
    top: 6,
    left: 20,
    right: 20,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.08)',
    zIndex: 0,
  },
  timelineNode: {
    alignItems: 'center',
    zIndex: 1,
  },
  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2,
    borderColor: colors.border,
  },
  timelineDotActive: {
    backgroundColor: colors.sand[0],
    borderColor: colors.sand[0],
  },
  timelineLabel: {
    ...typography.tiny,
    color: colors.textMuted,
    marginTop: 6,
  },
  timelineScore: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '700',
  },
});
