import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import { GlassCard, glassTokens } from '../../components/Glass';
import { colors, typography, spacing } from '../../theme';

const STAMPS = [
  { id: '1', title: 'First Mirror Moment', icon: 'videocam', date: '2024-12-20' },
  { id: '2', title: 'Vibe DNA Awakened', icon: 'flame', date: '2024-12-21' },
  { id: '3', title: 'Campus Duel Winner', icon: 'trophy', date: '2024-12-22' },
  { id: '4', title: 'World Drop Top 100', icon: 'globe', date: '2024-12-25' },
  { id: '5', title: 'Motion Match Unlock', icon: 'heart', date: '2024-12-28' },
  { id: '6', title: 'Life Book Complete', icon: 'book', date: '2025-01-01' },
];

export default function LifeStampsScreen() {
  return (
    <ScreenContainer>
      <Header title="Life Stamps" showBack showSearch={false} showNotifications={false} />
      <Text style={styles.subtitle}>Collectible badges for your movement journey</Text>
      <FlatList
        data={STAMPS}
        keyExtractor={(item: any) => item.id}
        renderItem={({ item }: { item: any }) => (
          <GlassCard style={styles.stamp} padding={spacing.md}>
            <View style={[styles.stampIcon, { backgroundColor: glassTokens.bgStrong, borderColor: glassTokens.borderStrong }]}>
              <Ionicons name={item.icon as any} size={24} color={colors.sand[0]} />
            </View>
            <View style={styles.stampContent}>
              <Text style={styles.stampTitle}>{item.title}</Text>
              <Text style={styles.stampDate}>Earned on {item.date}</Text>
            </View>
          </GlassCard>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  stamp: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
    gap: spacing.md,
  },
  stampIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212,184,150,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  stampContent: {
    flex: 1,
  },
  stampTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  stampDate: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
});
