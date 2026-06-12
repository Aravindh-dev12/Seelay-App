import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import { colors, typography, spacing } from '../../theme';

export default function SocialHubScreen() {
  const navigation = useNavigation();

  return (
    <ScreenContainer>
      <Header title="Connect" showSearch={false} showNotifications={false} />

      <Text style={styles.subtitle}>Match by movement. Explore your identity.</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('MotionMatch')}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="heart" size={28} color={colors.copper[0]} />
          <Text style={styles.cardTitle}>Motion Match</Text>
        </View>
        <Text style={styles.cardBody}>
          AI matches you based on movement DNA. No photos. No bios. Just vibes.
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardCta}>Start Matching →</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Identity')}
      >
        <View style={styles.cardHeader}>
          <Ionicons name="finger-print" size={28} color={colors.sand[0]} />
          <Text style={styles.cardTitle}>Soul / Identity</Text>
        </View>
        <Text style={styles.cardBody}>
          Vibe DNA, Life Stamps, Sound Alchemy, Alter Ego, and Energy Tokens.
        </Text>
        <View style={styles.cardFooter}>
          <Text style={styles.cardCta}>Explore Identity →</Text>
        </View>
      </TouchableOpacity>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  cardTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  cardBody: {
    ...typography.caption,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  cardFooter: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(212,184,150,0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 12,
  },
  cardCta: {
    ...typography.small,
    color: colors.sand[0],
    fontWeight: '700',
  },
});
