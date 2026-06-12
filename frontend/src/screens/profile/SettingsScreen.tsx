import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Switch, TextInput, Alert } from 'react-native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import { colors, typography, spacing } from '../../theme';
import { api } from '../../api/client';
import { useAuth } from '../../auth/AuthContext';

interface ServerSettings {
  lowDataMode: boolean;
  motionSensitivity: number;
  privateProfile: boolean;
  allowMotionMatch: boolean;
  notifyWorldDrop: boolean;
  notifyDuels: boolean;
  notifyMatches: boolean;
}

const DEFAULT_SETTINGS: ServerSettings = {
  lowDataMode: false,
  motionSensitivity: 72,
  privateProfile: false,
  allowMotionMatch: true,
  notifyWorldDrop: true,
  notifyDuels: true,
  notifyMatches: true,
};

export default function SettingsScreen() {
  const { user, signOut, deleteAccount, updateUser } = useAuth();
  const [settings, setSettings] = useState<ServerSettings>(DEFAULT_SETTINGS);
  const [profile, setProfile] = useState({
    displayName: user?.displayName ?? '',
    campus: user?.campus ?? '',
    city: user?.city ?? '',
  });
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    api
      .settings()
      .then((data) => setSettings({ ...DEFAULT_SETTINGS, ...(data as Partial<ServerSettings>) }))
      .catch(() => undefined);
  }, []);

  const toggle = (key: keyof ServerSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const saveProfile = async () => {
    try {
      await api.updateProfile({
        displayName: profile.displayName,
        campus: profile.campus,
        city: profile.city,
      });
      updateUser(profile);
      setStatus('Profile saved');
    } catch {
      setStatus('Could not save profile');
    }
  };

  const saveSettings = async () => {
    try {
      await api.updateSettings(settings as unknown as Record<string, unknown>);
      setStatus('Settings saved');
    } catch {
      setStatus('Could not save settings');
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Account',
      'This permanently deletes your account, wallet, settings and anonymizes your clips. This cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete Forever',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteAccount();
            } catch {
              setStatus('Could not delete account');
            }
          },
        },
      ],
    );
  };

  return (
    <ScreenContainer>
      <Header title="Settings" showBack showSearch={false} showNotifications={false} />

      <Text style={styles.sectionTitle}>Profile</Text>
      <ProfileField label="Display Name" value={profile.displayName} onChange={(v) => setProfile((p) => ({ ...p, displayName: v }))} />
      <ProfileField label="Campus" value={profile.campus} onChange={(v) => setProfile((p) => ({ ...p, campus: v }))} />
      <ProfileField label="City" value={profile.city} onChange={(v) => setProfile((p) => ({ ...p, city: v }))} />
      <GradientButton title="Save Profile" onPress={saveProfile} size="sm" style={styles.inlineBtn} />

      <Text style={styles.sectionTitle}>Privacy</Text>
      <SettingRow label="Private Profile" value={settings.privateProfile} onToggle={() => toggle('privateProfile')} />
      <SettingRow label="Allow Motion Match" value={settings.allowMotionMatch} onToggle={() => toggle('allowMotionMatch')} />

      <Text style={styles.sectionTitle}>Data & Performance</Text>
      <SettingRow label="Low Data Mode" value={settings.lowDataMode} onToggle={() => toggle('lowDataMode')} />

      <Text style={styles.sectionTitle}>Notifications</Text>
      <SettingRow label="World Drop Alerts" value={settings.notifyWorldDrop} onToggle={() => toggle('notifyWorldDrop')} />
      <SettingRow label="Duel Invites" value={settings.notifyDuels} onToggle={() => toggle('notifyDuels')} />
      <SettingRow label="Match Activity" value={settings.notifyMatches} onToggle={() => toggle('notifyMatches')} />

      {status ? <Text style={styles.status}>{status}</Text> : null}

      <GradientButton title="Save Settings" onPress={saveSettings} variant="success" style={styles.saveBtn} />
      <GradientButton title="Log Out" onPress={signOut} variant="secondary" style={styles.logoutBtn} />

      <Text style={styles.sectionTitle}>Danger Zone</Text>
      <GradientButton title="Delete Account" onPress={confirmDelete} variant="danger" style={styles.deleteBtn} />
    </ScreenContainer>
  );
}

function ProfileField({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={styles.fieldInput}
        value={value}
        onChangeText={onChange}
        placeholder={label}
        placeholderTextColor={colors.textMuted}
      />
    </View>
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
  fieldWrap: { marginBottom: spacing.sm },
  fieldLabel: { ...typography.tiny, color: colors.textMuted, marginBottom: spacing.xs },
  fieldInput: {
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
  },
  inlineBtn: { alignSelf: 'flex-start', marginTop: spacing.xs },
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
  status: { ...typography.small, color: colors.success, marginTop: spacing.md },
  saveBtn: { marginTop: spacing.lg },
  logoutBtn: { marginTop: spacing.md },
  deleteBtn: { marginBottom: spacing.xl },
});
