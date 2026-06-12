import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import { colors, typography, spacing } from '../../theme';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    autoTrigger: true,
    emotionFeed: false,
    lowDataMode: false,
    faceMesh: false,
    soundAlchemy: true,
    pushNotifications: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <ScreenContainer>
      <Header title="Settings" showBack showSearch={false} showNotifications={false} />

      <Text style={styles.sectionTitle}>Creation</Text>
      <SettingRow label="AutoTrigger Capture" value={settings.autoTrigger} onToggle={() => toggle('autoTrigger')} />
      <SettingRow label="Sound Alchemy" value={settings.soundAlchemy} onToggle={() => toggle('soundAlchemy')} />
      <SettingRow label="Emotion Feed" value={settings.emotionFeed} onToggle={() => toggle('emotionFeed')} />

      <Text style={styles.sectionTitle}>AI & Camera</Text>
      <SettingRow label="Face Mesh Detection" value={settings.faceMesh} onToggle={() => toggle('faceMesh')} />
      <SettingRow label="Low Data Mode" value={settings.lowDataMode} onToggle={() => toggle('lowDataMode')} />

      <Text style={styles.sectionTitle}>Notifications</Text>
      <SettingRow label="Push Notifications" value={settings.pushNotifications} onToggle={() => toggle('pushNotifications')} />

      <GradientButton title="Save Settings" onPress={() => {}} variant="success" style={styles.saveBtn} />
      <GradientButton title="Log Out" onPress={() => {}} variant="danger" style={styles.logoutBtn} />
    </ScreenContainer>
  );
}

function SettingRow({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: 'rgba(255,255,255,0.1)', true: 'rgba(212,184,150,0.3)' }}
        thumbColor={value ? colors.sand[0] : colors.textMuted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    ...typography.small,
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: 8,
  },
  rowLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  saveBtn: {
    marginTop: spacing.lg,
  },
  logoutBtn: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
});
