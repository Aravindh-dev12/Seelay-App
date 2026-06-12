import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated as RNAnimated,
  Dimensions,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import { colors, typography, spacing } from '../../theme';

const { width } = Dimensions.get('window');

export default function MirrorScreen() {
  const navigation = useNavigation();
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [motionLevel, setMotionLevel] = useState(0);
  const [captured, setCaptured] = useState(false);
  const [filter, setFilter] = useState<'vibe' | 'pulse' | 'shadow' | 'copper'>('vibe');
  const pulseAnim = useRef(new RNAnimated.Value(1)).current;

  useEffect(() => {
    if (isRecording) {
      const interval = setInterval(() => {
        setMotionLevel(Math.floor(Math.random() * 100));
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isRecording]);

  useEffect(() => {
    if (motionLevel > 75 && isRecording) {
      triggerCapture();
    }
  }, [motionLevel]);

  useEffect(() => {
    if (isRecording) {
      RNAnimated.loop(
        RNAnimated.sequence([
          RNAnimated.timing(pulseAnim, { toValue: 1.15, duration: 600, useNativeDriver: true }),
          RNAnimated.timing(pulseAnim, { toValue: 1, duration: 600, useNativeDriver: true }),
        ])
      ).start();
    } else {
      pulseAnim.setValue(1);
    }
  }, [isRecording]);

  const triggerCapture = () => {
    setCaptured(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    setTimeout(() => setCaptured(false), 1200);
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setMotionLevel(0);
    } else {
      setIsRecording(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  };

  if (!permission?.granted) {
    return (
      <ScreenContainer scroll={false}>
        <Header title="Mirror Moments" showSearch={false} showNotifications={false} />
        <View style={styles.permissionBox}>
          <Ionicons name="camera" size={48} color={colors.sand[0]} />
          <Text style={styles.permissionTitle}>Camera Access Needed</Text>
          <Text style={styles.permissionSub}>Mirror Moments uses your camera to auto-capture clips when you move.</Text>
          <GradientButton title="Grant Permission" onPress={requestPermission} />
        </View>
      </ScreenContainer>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing="front">
        <View style={styles.overlay}>
          <Header title="Mirror Moments" showSearch={false} showNotifications={false} />

          {/* Filter selector */}
          <View style={styles.filterRow}>
            {(['vibe', 'pulse', 'shadow', 'copper'] as const).map((f) => (
              <TouchableOpacity
                key={f}
                onPress={() => setFilter(f)}
                style={[styles.filterChip, filter === f && styles.filterChipActive]}
              >
                <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Motion meter */}
          <View style={styles.meterBox}>
            <View style={styles.meterTrack}>
              <View style={[styles.meterFill, { width: `${motionLevel}%`, backgroundColor: motionLevel > 75 ? colors.sage[0] : colors.sand[0] }]} />
            </View>
            <Text style={styles.meterLabel}>Motion: {motionLevel}%</Text>
          </View>

          {/* Capture burst indicator */}
          {captured && (
            <View style={styles.burstOverlay}>
              <Text style={styles.burstText}>CLIP CAPTURED</Text>
              <Text style={styles.burstSub}>3.2s · {filter} filter applied</Text>
            </View>
          )}

          {/* Bottom controls */}
          <View style={styles.controls}>
            <TouchableOpacity style={styles.sideBtn}>
              <Ionicons name="musical-notes" size={24} color={colors.textPrimary} />
              <Text style={styles.sideBtnLabel}>Sound</Text>
            </TouchableOpacity>

            <RNAnimated.View style={{ transform: [{ scale: pulseAnim }] }}>
              <TouchableOpacity onPress={toggleRecording} activeOpacity={0.8}>
                <LinearGradient
                  colors={isRecording ? colors.copper : colors.sand}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.recordBtn}
                >
                  <Ionicons
                    name={isRecording ? 'stop' : 'scan'}
                    size={32}
                    color="#0a0a0a"
                  />
                </LinearGradient>
              </TouchableOpacity>
            </RNAnimated.View>

            <TouchableOpacity style={styles.sideBtn} onPress={() => navigation.navigate('SoundAlchemy')}>
              <Ionicons name="sparkles" size={24} color={colors.textPrimary} />
              <Text style={styles.sideBtnLabel}>Alchemy</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.hint}>
            {isRecording ? 'Move your body to trigger auto-capture' : 'Tap to start motion capture'}
          </Text>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  camera: { flex: 1 },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    borderColor: colors.sand[0],
    backgroundColor: 'rgba(212,184,150,0.25)',
  },
  filterText: {
    ...typography.small,
    color: colors.textSecondary,
    textTransform: 'capitalize',
    fontWeight: '700',
  },
  filterTextActive: {
    color: colors.sand[0],
  },
  meterBox: {
    alignSelf: 'center',
    width: width * 0.7,
    marginTop: spacing.lg,
  },
  meterTrack: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  meterFill: {
    height: '100%',
    borderRadius: 3,
  },
  meterLabel: {
    ...typography.tiny,
    color: colors.textMuted,
    marginTop: 4,
    textAlign: 'center',
  },
  burstOverlay: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  burstText: {
    fontSize: 28,
    fontWeight: '900',
    color: colors.sand[0],
    letterSpacing: 4,
  },
  burstSub: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: spacing.sm,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xl,
  },
  recordBtn: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  sideBtn: {
    alignItems: 'center',
    gap: 4,
  },
  sideBtnLabel: {
    ...typography.tiny,
    color: colors.textMuted,
  },
  hint: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
  permissionBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  permissionTitle: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  permissionSub: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
});
