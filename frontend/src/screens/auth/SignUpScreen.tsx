import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, gradients } from '../../theme';
import { useAuth } from '../../auth/AuthContext';

export default function SignUpScreen() {
  const navigation = useNavigation();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleRegister = async () => {
    if (form.fullName.trim().length < 2) return setError('Full name must be at least 2 characters');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return setError('Enter a valid email address');
    if (form.phone.trim().length < 8) return setError('Enter a valid phone number');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    if (form.password !== form.confirmPassword) return setError('Passwords do not match');
    setError(null);
    try {
      await register({
        username: form.email.split('@')[0].toLowerCase(),
        displayName: form.fullName.trim(),
        email: form.email.trim(),
        campus: form.address.trim() || undefined,
        city: form.address.trim() || undefined,
      });
    } catch {
      setError('Registration failed. Email may already be in use.');
    }
  };

  return (
    <LinearGradient
      colors={gradients.background.colors}
      start={gradients.background.start}
      end={gradients.background.end}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboard}
        >
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Logo + Title Row */}
            <View style={styles.header}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                <Image
                  source={require('../../../assets/logo.png')}
                  style={styles.logoImage}
                  resizeMode="contain"
                />
                <Text style={styles.title}>Seelay</Text>
              </View>
              <Text style={styles.subtitle}>Create your movement identity</Text>
            </View>

            {/* Form */}
            <View style={styles.card}>
              <Field label="FULL NAME" value={form.fullName} onChange={set('fullName')} placeholder="Your full name" autoCapitalize="words" />
              <Field label="EMAIL" value={form.email} onChange={set('email')} placeholder="name@email.com" keyboardType="email-address" />
              <Field label="ADDRESS" value={form.address} onChange={set('address')} placeholder="Street, City, Country" />
              <Field label="PHONE NUMBER" value={form.phone} onChange={set('phone')} placeholder="+91 98765 43210" keyboardType="phone-pad" />

              <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.passwordWrap}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={form.password}
                  onChangeText={set('password')}
                  placeholder="Create a password"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowPassword(!showPassword)}>
                  <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.label}>CONFIRM PASSWORD</Text>
              <View style={styles.passwordWrap}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={form.confirmPassword}
                  onChangeText={set('confirmPassword')}
                  placeholder="Re-enter your password"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!showConfirm}
                />
                <TouchableOpacity style={styles.eyeBtn} onPress={() => setShowConfirm(!showConfirm)}>
                  <Text style={styles.eyeText}>{showConfirm ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              {loading ? (
                <ActivityIndicator color={colors.textPrimary} style={styles.loader} />
              ) : (
                <TouchableOpacity onPress={handleRegister} activeOpacity={0.8} style={styles.button}>
                  <Text style={styles.buttonText}>Create Account</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                <Text style={styles.footerLink}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  autoCapitalize = 'none',
  keyboardType = 'default',
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
}) {
  return (
    <View style={{ marginBottom: spacing.md }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        autoCapitalize={autoCapitalize}
        autoCorrect={false}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  keyboard: { flex: 1 },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoImage: {
    width: 60,
    height: 60,
  },
  title: {
    ...typography.titleSmall,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.caption,
    color: colors.textMuted,
  },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  label: {
    ...typography.tiny,
    color: colors.textMuted,
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
    paddingRight: spacing.xl,
  },
  passwordWrap: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 70,
  },
  eyeBtn: {
    position: 'absolute',
    right: spacing.md,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  eyeText: {
    ...typography.small,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  error: {
    ...typography.small,
    color: colors.error,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  button: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: spacing.sm,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  buttonText: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '800',
  },
  loader: {
    marginTop: spacing.md,
    alignSelf: 'center',
  },
  footer: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  footerText: {
    ...typography.caption,
    color: colors.textMuted,
  },
  footerLink: {
    ...typography.caption,
    color: colors.sand[0],
    fontWeight: '700',
  },
});
