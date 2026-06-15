import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import ScreenContainer from '../../components/ScreenContainer';
import GradientButton from '../../components/GradientButton';
import { GlassChip } from '../../components/Glass';
import { colors, typography, spacing } from '../../theme';

const FILTERS = ['Neon Raga', 'Campus Heat', 'Bass Bloom', 'Midnight Sand'];

export default function CreateScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [recording, setRecording] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const cameraRef = useRef<any>(null);

  if (!permission?.granted) {
    return (
      <ScreenContainer>
        <View style={styles.center}>
          <Ionicons name="camera" size={64} color={colors.sand[0]} />
          <Text style={styles.title}>Camera Access Needed</Text>
          <Text style={styles.subtitle}>seelay needs camera access to capture Mirror Moments.</Text>
          <GradientButton title="Grant Permission" onPress={requestPermission} />
        </View>
      </ScreenContainer>
    );
  }

  const toggleRecord = async () => {
    if (recording) {
      setRecording(false);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      setRecording(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView ref={cameraRef} style={styles.camera} facing="front">
        <View style={styles.overlay}>
          <View style={styles.topBar}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>Sensitivity 72</Text>
            </View>
            <View style={[styles.chip, { backgroundColor: 'rgba(196,144,122,0.2)' }]}>
              <Text style={[styles.chipText, { color: colors.copper[0] }]}>AutoTrigger armed</Text>
            </View>
          </View>

          <View style={styles.centerPrompt}>
            <Ionicons name="body" size={80} color={colors.sand[0]} />
            <Text style={styles.promptTitle}>Move to create</Text>
            <Text style={styles.promptSub}>Jump, wave, nod, or run. seelay turns motion into a Mirror Moment.</Text>
          </View>

          <View style={styles.bottomControls}>
            <View style={styles.filterRow}>
              {FILTERS.map((filter, i) => (
                <GlassChip
                  key={filter}
                  label={filter}
                  active={i === selectedFilter}
                  onPress={() => setSelectedFilter(i)}
                />
              ))}
            </View>

            <TouchableOpacity onPress={toggleRecord} style={styles.recordButton}>
              <View style={[styles.recordInner, recording && styles.recording]} />
            </TouchableOpacity>

            <GradientButton
              title={recording ? 'Stop Recording' : 'Capture Mirror Moment'}
              onPress={toggleRecord}
              size="lg"
              style={styles.captureBtn}
            />
          </View>
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing.md,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  chip: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 20,
  },
  chipText: {
    ...typography.small,
    color: colors.sand[0],
    fontWeight: '700',
  },
  centerPrompt: {
    alignItems: 'center',
  },
  promptTitle: {
    ...typography.h1,
    color: colors.textPrimary,
    marginTop: spacing.md,
  },
  promptSub: {
    ...typography.caption,
    color: colors.textSecondary,
    textAlign: 'center',
    maxWidth: 260,
    marginTop: spacing.sm,
  },
  bottomControls: {
    alignItems: 'center',
    gap: spacing.md,
  },
  filterRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  recordButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 4,
    borderColor: colors.textPrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordInner: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.copper[0],
  },
  recording: {
    width: 24,
    height: 24,
    borderRadius: 4,
    backgroundColor: colors.copper[0],
  },
  captureBtn: {
    width: '100%',
  },
});
