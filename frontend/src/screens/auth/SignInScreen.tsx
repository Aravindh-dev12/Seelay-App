import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import GradientButton from '../../components/GradientButton';
import { colors, typography, spacing } from '../../theme';
import { useAuth } from '../../auth/AuthContext';
import type { RootStackParamList } from '../../navigation/RootNavigator';

export default function SignInScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { signIn, loading } = useAuth();
  const [username, setUsername] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    if (username.trim().length < 3) {
      setError('Username must be at least 3 characters');
      return;
    }
    setError(null);
    try {
      await signIn(username.trim());
    } catch {
      setError('Could not sign in. Check that the backend is running.');
    }
  };

  return (
    <ScreenContainer scroll={false} contentStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.logo}>SEELAY</Text>
        <Text style={styles.tagline}>Your body is the interface</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>USERNAME</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="yourname"
          placeholderTextColor={colors.textMuted}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {loading ? (
          <ActivityIndicator color={colors.sand[0]} style={styles.loader} />
        ) : (
          <GradientButton title="Sign In" onPress={handleSignIn} size="lg" style={styles.button} />
        )}

        <TouchableOpacity onPress={() => navigation.navigate('SignUp')} style={styles.linkWrap}>
          <Text style={styles.link}>
            New here? <Text style={styles.linkAccent}>Create your Seelay identity</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { justifyContent: 'center', paddingBottom: 0 },
  hero: { alignItems: 'center', marginBottom: spacing.xl },
  logo: { ...typography.display, color: colors.textPrimary, letterSpacing: 8 },
  tagline: { ...typography.caption, color: colors.textSecondary, marginTop: spacing.sm },
  card: {
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 20,
    padding: spacing.lg,
  },
  label: { ...typography.tiny, color: colors.textMuted, marginBottom: spacing.xs },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  error: { ...typography.small, color: colors.error, marginBottom: spacing.sm },
  button: { marginTop: spacing.sm },
  loader: { marginTop: spacing.md },
  linkWrap: { marginTop: spacing.lg, alignItems: 'center' },
  link: { ...typography.caption, color: colors.textSecondary },
  linkAccent: { color: colors.sand[0], fontWeight: '700' },
});
