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

export default function SignInScreen() {
  const navigation = useNavigation();
  const { signIn, loading } = useAuth();
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async () => {
    if (!emailOrPhone.trim()) {
      setError('Enter your email or phone number');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError(null);
    try {
      await signIn(emailOrPhone.trim());
    } catch {
      setError('Could not sign in. Check that the backend is running.');
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
              <Text style={styles.subtitle}>Welcome back</Text>
            </View>

            {/* Form */}
            <View style={styles.card}>
              <Text style={styles.label}>EMAIL OR PHONE</Text>
              <TextInput
                style={styles.input}
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
                placeholder="name@email.com or +91 98765 43210"
                placeholderTextColor={colors.textMuted}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
              />

              <Text style={styles.label}>PASSWORD</Text>
              <View style={styles.passwordWrap}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Your password"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword(!showPassword)}
                >
                  <Text style={styles.eyeText}>{showPassword ? 'Hide' : 'Show'}</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.forgotWrap}>
                <Text style={styles.forgotText}>Forgot password?</Text>
              </TouchableOpacity>

              {error ? <Text style={styles.error}>{error}</Text> : null}

              {loading ? (
                <ActivityIndicator color={colors.textPrimary} style={styles.loader} />
              ) : (
                <TouchableOpacity onPress={handleSignIn} activeOpacity={0.8} style={styles.button}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Footer */}
            <View style={styles.footer}>
              <Text style={styles.footerText}>New here?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text style={styles.footerLink}>Create your Seelay identity</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
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
  forgotWrap: {
    alignSelf: 'flex-end',
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  forgotText: {
    ...typography.small,
    color: colors.textSecondary,
  },
  error: {
    ...typography.small,
    color: colors.error,
    marginBottom: spacing.sm,
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
