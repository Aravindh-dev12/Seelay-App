import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, typography, spacing, gradients } from '../../theme';

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      Animated.timing(slideAnim, { toValue: 0, duration: 800, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={gradients.background.colors}
      start={gradients.background.start}
      end={gradients.background.end}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              flexDirection: 'row',
              alignItems: 'center',
              gap: spacing.md,
              marginBottom: spacing.lg,
            }}
          >
            <Image
              source={require('../../../assets/logo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.title}>Seelay</Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              alignItems: 'center',
              maxWidth: width * 0.8,
              marginBottom: spacing.xxl,
            }}
          >
            <Text style={styles.descText}>
              Your movement-first social world. Share clips, join motion duels, drop into real-time challenges, and build your vibe identity.
            </Text>
          </Animated.View>

          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
              width: '100%',
              maxWidth: 320,
              gap: spacing.md,
            }}
          >
            <TouchableOpacity
              style={[styles.glassBtn, styles.glassBtnPrimary]}
              onPress={() => navigation.navigate('SignIn')}
              activeOpacity={0.8}
            >
              <Text style={styles.glassBtnText}>Get Started</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.glassBtn}
              onPress={() => navigation.navigate('SignUp')}
              activeOpacity={0.8}
            >
              <Text style={styles.glassBtnText}>Create Account</Text>
            </TouchableOpacity>
          </Animated.View>

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
  },
  logo: {
    width: 48,
    height: 48,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
  },
  descText: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
  glassBtn: {
    paddingVertical: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  glassBtnPrimary: {
    backgroundColor: 'rgba(255,255,255,0.10)',
    borderColor: 'rgba(255,255,255,0.25)',
  },
  glassBtnText: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
});
