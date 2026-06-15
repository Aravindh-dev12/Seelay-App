import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import { GlassCard, glassTokens } from '../../components/Glass';
import { colors, typography, spacing } from '../../theme';

const SOUND_MAP = [
  { move: 'Jump', sound: 'Bass Drop', icon: 'arrow-up', color: colors.copper[0] },
  { move: 'Wave', sound: 'Synth Swell', icon: 'hand-left', color: colors.sage[0] },
  { move: 'Fast', sound: 'High Tempo', icon: 'speedometer', color: colors.sand[0] },
  { move: 'Slow', sound: 'Reverb', icon: 'water', color: colors.sand[1] },
  { move: 'Spin', sound: 'Hi-hat Roll', icon: 'refresh', color: colors.copper[1] },
  { move: 'Drop', sound: '808 Kick', icon: 'arrow-down', color: colors.sage[1] },
];

export default function SoundAlchemyScreen() {
  const [playing, setPlaying] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPlaying((prev) => (prev === id ? null : id));
  };

  return (
    <ScreenContainer>
      <Header title="Sound Alchemy" showBack showSearch={false} showNotifications={false} />

      {/* Hero */}
      <GlassCard style={styles.hero} padding={spacing.lg} elevated>
        <View style={[styles.heroBadge, { backgroundColor: glassTokens.bgStrong, borderColor: glassTokens.borderStrong }]}>
          <Ionicons name="musical-notes" size={18} color={colors.sand[0]} />
        </View>
        <Text style={styles.heroTitle}>Your Body Is the Instrument</Text>
        <Text style={styles.heroSub}>
          Every movement generates a unique audio track. Jump becomes bass. Wave becomes synth. No two clips sound the same.
        </Text>
      </GlassCard>

      {/* Sound mapping */}
      <Text style={styles.sectionTitle}>Movement → Sound Map</Text>
      <View style={styles.grid}>
        {SOUND_MAP.map((item) => (
          <TouchableOpacity
            key={item.move}
            style={[styles.gridItem, playing === item.move && styles.gridItemActive]}
            onPress={() => togglePlay(item.move)}
          >
            <Ionicons name={item.icon as any} size={22} color={item.color} />
            <Text style={styles.moveLabel}>{item.move}</Text>
            <View style={[styles.soundLine, { backgroundColor: item.color }]} />
            <Text style={[styles.soundLabel, { color: item.color }]}>{item.sound}</Text>
            {playing === item.move && (
              <View style={styles.playingDot} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* My tracks */}
      <Text style={styles.sectionTitle}>Your Generated Tracks</Text>
      {[
        { title: 'Midnight Jump', date: '2h ago', duration: '3.2s' },
        { title: 'Wave Form', date: 'Yesterday', duration: '4.1s' },
        { title: 'Bass Runner', date: '3d ago', duration: '2.8s' },
      ].map((track) => (
        <GlassCard key={track.title} style={styles.trackRow} padding={spacing.md}>
          <View style={styles.trackIcon}>
            <Ionicons name="play" size={16} color={colors.sand[0]} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.trackTitle}>{track.title}</Text>
            <Text style={styles.trackMeta}>{track.date} · {track.duration}</Text>
          </View>
          <Ionicons name="share-outline" size={20} color={colors.textMuted} />
        </GlassCard>
      ))}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  heroBadge: {
    width: 56,
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  heroTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  heroSub: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
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
    width: '30%',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
    alignItems: 'center',
    position: 'relative',
  },
  gridItemActive: {
    borderColor: colors.borderActive,
    backgroundColor: 'rgba(212,184,150,0.06)',
  },
  moveLabel: {
    ...typography.small,
    color: colors.textPrimary,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  soundLine: {
    width: 24,
    height: 2,
    borderRadius: 1,
    marginVertical: 6,
  },
  soundLabel: {
    ...typography.tiny,
    fontWeight: '700',
    textAlign: 'center',
  },
  playingDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.sage[0],
  },
  trackRow: {
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
  trackIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(212,184,150,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  trackMeta: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: 2,
  },
});
