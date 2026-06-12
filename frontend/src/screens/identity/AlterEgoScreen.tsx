import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import { colors, typography, spacing } from '../../theme';

const AVATARS = ['skull', 'glasses', 'mask', 'happy', 'sad'];
const STYLES = ['Bold', 'Mysterious', 'Comic', 'Chill', 'Aggro'];

export default function AlterEgoScreen() {
  const [active, setActive] = useState(false);
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState(0);

  const toggleEgo = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setActive(!active);
  };

  return (
    <ScreenContainer>
      <Header title="Alter Ego" showBack showSearch={false} showNotifications={false} />

      <View style={[styles.statusCard, active && styles.statusCardActive]}>
        <View style={styles.statusRow}>
          <View>
            <Text style={styles.statusTitle}>{active ? 'Alter Ego Active' : 'Real Profile'}</Text>
            <Text style={styles.statusSub}>
              {active ? 'Nobody knows it is you. Duel freely.' : 'Your public identity'}
            </Text>
          </View>
          <TouchableOpacity onPress={toggleEgo} style={styles.toggleBtn}>
            <LinearGradient
              colors={active ? colors.sage : colors.ash}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.toggleGradient}
            >
              <Ionicons name={active ? 'checkmark' : 'close'} size={20} color="#0a0a0a" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.label}>Alter Ego Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter anonymous name..."
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      <Text style={styles.label}>Avatar</Text>
      <View style={styles.avatarRow}>
        {AVATARS.map((icon, i) => (
          <TouchableOpacity
            key={icon}
            onPress={() => { setSelectedAvatar(i); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
            style={[styles.avatarCircle, selectedAvatar === i && styles.avatarCircleActive]}
          >
            <Ionicons name={icon as any} size={24} color={selectedAvatar === i ? '#0a0a0a' : colors.textSecondary} />
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Challenge Style</Text>
      <View style={styles.styleRow}>
        {STYLES.map((style, i) => (
          <TouchableOpacity
            key={style}
            onPress={() => { setSelectedStyle(i); Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); }}
            style={[styles.styleChip, selectedStyle === i && styles.styleChipActive]}
          >
            <Text style={[styles.styleText, selectedStyle === i && styles.styleTextActive]}>{style}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoBox}>
        <Ionicons name="information-circle" size={20} color={colors.sand[0]} />
        <Text style={styles.infoText}>
          Your real profile and alter ego can duel each other. Nobody else knows which is you. Premium unlock required.
        </Text>
      </View>

      <GradientButton
        title={active ? 'Update Alter Ego' : 'Unlock Alter Ego'}
        onPress={() => {}}
        size="lg"
        style={{ marginTop: spacing.md }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  statusCard: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  statusCardActive: {
    borderColor: colors.sage[0],
    backgroundColor: 'rgba(125,168,138,0.08)',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  statusSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  toggleBtn: {
    borderRadius: 14,
    overflow: 'hidden',
  },
  toggleGradient: {
    width: 48,
    height: 48,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    ...typography.body,
    color: colors.textSecondary,
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    color: colors.textPrimary,
    fontSize: 16,
  },
  avatarRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  avatarCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarCircleActive: {
    backgroundColor: colors.sand[0],
    borderColor: colors.sand[0],
  },
  styleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  styleChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  styleChipActive: {
    backgroundColor: 'rgba(212,184,150,0.15)',
    borderColor: colors.sand[0],
  },
  styleText: {
    ...typography.small,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  styleTextActive: {
    color: colors.sand[0],
    fontWeight: '800',
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    backgroundColor: 'rgba(212,184,150,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(212,184,150,0.15)',
    borderRadius: 14,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  infoText: {
    ...typography.caption,
    color: colors.textSecondary,
    flex: 1,
    lineHeight: 20,
  },
});
