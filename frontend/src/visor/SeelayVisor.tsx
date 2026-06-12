import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../theme';
import { useVisor } from './VisorContext';
import type { VisorExpression } from './types';

const VISOR_WIDTH = 84;
const VISOR_HEIGHT = 52;

const EYE_COLORS: Record<VisorExpression, string> = {
  idle: colors.sand[0],
  listening: colors.sage[0],
  thinking: colors.ash[0],
  speaking: colors.copper[0],
};

export default function SeelayVisor() {
  const { visible, expression, panelOpen, followMode, message, openPanel, closePanel, startListening, toggleFollow } =
    useVisor();

  const window = Dimensions.get('window');
  const position = useRef(
    new Animated.ValueXY({ x: window.width - VISOR_WIDTH - 16, y: window.height - 220 }),
  ).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const eyeGlow = useRef(new Animated.Value(1)).current;

  // Breathing pulse so the Visor always feels alive.
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.06, duration: 1400, useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 1, duration: 1400, useNativeDriver: false }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  // Faster eye flicker while speaking or thinking.
  useEffect(() => {
    if (expression === 'speaking' || expression === 'thinking') {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(eyeGlow, { toValue: 0.3, duration: 220, useNativeDriver: false }),
          Animated.timing(eyeGlow, { toValue: 1, duration: 220, useNativeDriver: false }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    }
    eyeGlow.setValue(1);
    return undefined;
  }, [expression, eyeGlow]);

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, gesture) => Math.abs(gesture.dx) + Math.abs(gesture.dy) > 6,
      onPanResponderMove: (_evt, gesture) => {
        position.setValue({ x: gesture.moveX - VISOR_WIDTH / 2, y: gesture.moveY - VISOR_HEIGHT / 2 });
      },
    }),
  ).current;

  if (!visible) return null;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {followMode ? (
        <View
          style={styles.followLayer}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderMove={(evt) => {
            const { pageX, pageY } = evt.nativeEvent;
            Animated.spring(position, {
              toValue: { x: pageX - VISOR_WIDTH / 2, y: pageY - VISOR_HEIGHT - 24 },
              useNativeDriver: false,
              speed: 30,
              bounciness: 6,
            }).start();
          }}
        />
      ) : null}

      {panelOpen ? (
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>VISOR</Text>
          <Text style={styles.panelMessage}>{message}</Text>
          <View style={styles.panelActions}>
            <TouchableOpacity style={styles.actionBtn} onPress={startListening}>
              <Ionicons name="mic" size={20} color={EYE_COLORS[expression]} />
              <Text style={styles.actionLabel}>Talk</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, followMode && styles.actionActive]} onPress={toggleFollow}>
              <Ionicons name="locate" size={20} color={followMode ? colors.sage[0] : colors.textSecondary} />
              <Text style={styles.actionLabel}>{followMode ? 'Following' : 'Follow'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={closePanel}>
              <Ionicons name="close" size={20} color={colors.textSecondary} />
              <Text style={styles.actionLabel}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <Animated.View
        {...pan.panHandlers}
        style={[styles.visorWrap, { transform: [{ translateX: position.x }, { translateY: position.y }, { scale: pulse }] }]}
      >
        <TouchableOpacity activeOpacity={0.85} onPress={() => (panelOpen ? closePanel() : openPanel())}>
          <LinearGradient
            colors={colors.sand}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.visorShell}
          >
            <View style={styles.visorBand}>
              <Animated.View
                style={[styles.eye, { backgroundColor: EYE_COLORS[expression], opacity: eyeGlow }]}
              />
              <Animated.View
                style={[styles.eye, { backgroundColor: EYE_COLORS[expression], opacity: eyeGlow }]}
              />
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  followLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)',
  },
  visorWrap: {
    position: 'absolute',
    width: VISOR_WIDTH,
    height: VISOR_HEIGHT,
    ...shadows.elevated,
  },
  visorShell: {
    width: VISOR_WIDTH,
    height: VISOR_HEIGHT,
    borderRadius: VISOR_HEIGHT / 2,
    padding: 5,
    justifyContent: 'center',
  },
  visorBand: {
    flex: 1,
    borderRadius: (VISOR_HEIGHT - 10) / 2,
    backgroundColor: '#0a0a0e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  eye: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  panel: {
    position: 'absolute',
    bottom: 120,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(12,12,16,0.96)',
    borderWidth: 1,
    borderColor: colors.borderActive,
    borderRadius: 20,
    padding: spacing.md,
    ...shadows.elevated,
  },
  panelTitle: {
    ...typography.tiny,
    color: colors.sand[0],
    letterSpacing: 3,
    marginBottom: spacing.xs,
  },
  panelMessage: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  panelActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionBtn: {
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 12,
  },
  actionActive: {
    backgroundColor: 'rgba(125,168,138,0.12)',
  },
  actionLabel: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
});
