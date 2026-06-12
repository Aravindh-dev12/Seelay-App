import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import GradientButton from '../../components/GradientButton';
import { colors, typography, spacing } from '../../theme';
import { useAuth } from '../../auth/AuthContext';
import type { RootStackParamList } from '../../navigation/RootNavigator';

export default function SignUpScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ username: '', displayName: '', email: '', campus: '', city: '' });
  const [error, setError] = useState<string | null>(null);

  const set = (key: keyof typeof form) => (value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleRegister = async () => {
    if (form.username.trim().length < 3) return setError('Username must be at least 3 characters');
    if (form.displayName.trim().length < 2) return setError('Display name must be at least 2 characters');
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter a valid email address');
    setError(null);
    try {
      await register({
        username: form.username.trim(),
        displayName: form.displayName.trim(),
        email: form.email.trim() || undefined,
        campus: form.campus.trim() || undefined,
        city: form.city.trim() || undefined,
      });
    } catch {
      setError('Registration failed. Username may already be taken.');
    }
  };

  return (
    <ScreenContainer contentStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.logo}>SEELAY</Text>
        <Text style={styles.tagline}>Create your movement identity</Text>
      </View>

      <View style={styles.card}>
        <Field label="USERNAME" value={form.username} onChange={set('username')} placeholder="yourname" />
        <Field label="DISPLAY NAME" value={form.displayName} onChange={set('displayName')} placeholder="Your Name" />
        <Field label="EMAIL (OPTIONAL)" value={form.email} onChange={set('email')} placeholder="you@email.com" />
        <Field label="CAMPUS (OPTIONAL)" value={form.campus} onChange={set('campus')} placeholder="Your campus" />
        <Field label="CITY (OPTIONAL)" value={form.city} onChange={set('city')} placeholder="Your city" />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {loading ? (
          <ActivityIndicator color={colors.sand[0]} style={styles.loader} />
        ) : (
          <GradientButton title="Create Account" onPress={handleRegister} size="lg" style={styles.button} />
        )}

        <TouchableOpacity onPress={() => navigation.navigate('SignIn')} style={styles.linkWrap}>
          <Text style={styles.link}>
            Already have an account? <Text style={styles.linkAccent}>Sign in</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <View style={fieldStyles.wrap}>
      <Text style={fieldStyles.label}>{label}</Text>
      <TextInput
        style={fieldStyles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
}

const fieldStyles = StyleSheet.create({
  wrap: { marginBottom: spacing.md },
  label: { ...typography.tiny, color: colors.textMuted, marginBottom: spacing.xs },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
  },
});

const styles = StyleSheet.create({
  content: { paddingBottom: 40 },
  hero: { alignItems: 'center', marginVertical: spacing.lg },
  logo: { ...typography.display, color: colors.textPrimary, letterSpacing: 8 },
  tagline: { ...typography.caption, color: colors.textSecondary, marginTop: spacing.sm },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: spacing.lg,
  },
  error: { ...typography.small, color: colors.error, marginBottom: spacing.sm },
  button: { marginTop: spacing.sm },
  loader: { marginTop: spacing.md },
  linkWrap: { marginTop: spacing.lg, alignItems: 'center' },
  link: { ...typography.caption, color: colors.textSecondary },
  linkAccent: { color: colors.sand[0], fontWeight: '700' },
});
