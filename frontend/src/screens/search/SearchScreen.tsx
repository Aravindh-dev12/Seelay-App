import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import { GlassChip, GlassCard } from '../../components/Glass';
import { colors, typography, spacing } from '../../theme';

const TRENDING = ['#JumpBassDrop', '#NeonRaga', '#CampusDuel', '#MirrorMoment', '#IndiaPulse'];
const RESULTS = [
  { id: '1', name: 'Zara Alchemy', username: 'zara.alchemy' },
  { id: '2', name: 'Ravi Swarm', username: 'ravi.swarm' },
  { id: '3', name: 'Anika Flow', username: 'anika.flow' },
];

export default function SearchScreen() {
  const [query, setQuery] = useState('');

  return (
    <ScreenContainer>
      <Header title="Search" showBack showSearch={false} showNotifications={false} />
      <View style={styles.searchRow}>
        <Ionicons name="search" size={20} color={colors.textMuted} />
        <TextInput
          value={query}
          onChangeText={setQuery}
          placeholder="Search users, clips, challenges..."
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          autoFocus
        />
      </View>

      {!query && (
        <>
          <Text style={styles.sectionTitle}>Trending</Text>
          <View style={styles.tagRow}>
            {TRENDING.map((tag) => (
              <GlassChip key={tag} label={tag} />
            ))}
          </View>
        </>
      )}

      {query && (
        <FlatList
          data={RESULTS}
          keyExtractor={(item: any) => item.id}
          renderItem={({ item }: { item: any }) => (
            <GlassCard style={styles.result} padding={spacing.md}>
              <View style={styles.avatar}>
                <Ionicons name="person" size={24} color={colors.textSecondary} />
              </View>
              <View>
                <Text style={styles.resultName}>{item.name}</Text>
                <Text style={styles.resultUsername}>@{item.username}</Text>
              </View>
            </GlassCard>
          )}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    ...typography.body,
  },
  sectionTitle: {
    ...typography.small,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
  tagRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  list: {
    gap: spacing.sm,
  },
  result: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
    gap: spacing.md,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  resultUsername: {
    ...typography.caption,
    color: colors.textSecondary,
  },
});
