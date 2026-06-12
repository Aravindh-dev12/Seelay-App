import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../theme';
import { useVisor } from './VisorContext';
import type { VisorExpression } from './types';

const HEAD_W = 90;
const HEAD_H = 56;
const BODY_W = 32;
const BODY_H = 28;
const LIMB_W = 7;

const EYE_COLORS: Record<VisorExpression, string> = {
  idle: colors.sand[0],
  listening: colors.sage[0],
  thinking: colors.ash[0],
  speaking: colors.copper[0],
};

export default function SeelayVisor() {
  const { visible, expression, panelOpen, followMode, message, isLoading, openPanel, closePanel, startListening, toggleFollow } =
    useVisor();

  const win = Dimensions.get('window');
  const position = useRef(
    new Animated.ValueXY({ x: win.width - HEAD_W - 20, y: win.height - 260 }),
  ).current;
  const pulse = useRef(new Animated.Value(1)).current;
  const eyeGlow = useRef(new Animated.Value(1)).current;
  const armLeft = useRef(new Animated.Value(0)).current;
  const armRight = useRef(new Animated.Value(0)).current;
  const legLeft = useRef(new Animated.Value(0)).current;
  const legRight = useRef(new Animated.Value(0)).current;

  // Breathing pulse so the Visor always feels alive.
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1.05, duration: 1500, useNativeDriver: false }),
        Animated.timing(pulse, { toValue: 1, duration: 1500, useNativeDriver: false }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [pulse]);

  // Eye flicker while speaking or thinking.
  useEffect(() => {
    if (expression === 'speaking' || expression === 'thinking') {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(eyeGlow, { toValue: 0.35, duration: 200, useNativeDriver: false }),
          Animated.timing(eyeGlow, { toValue: 1, duration: 200, useNativeDriver: false }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    }
    eyeGlow.setValue(1);
    return undefined;
  }, [expression, eyeGlow]);

  // Limb animations: arms wave, legs dangle when speaking.
  useEffect(() => {
    if (expression === 'speaking') {
      const leftArm = Animated.loop(
        Animated.sequence([
          Animated.timing(armLeft, { toValue: -20, duration: 400, useNativeDriver: false }),
          Animated.timing(armLeft, { toValue: 0, duration: 400, useNativeDriver: false }),
        ]),
      );
      const rightArm = Animated.loop(
        Animated.sequence([
          Animated.timing(armRight, { toValue: 20, duration: 450, useNativeDriver: false }),
          Animated.timing(armRight, { toValue: 0, duration: 450, useNativeDriver: false }),
        ]),
      );
      const leftLeg = Animated.loop(
        Animated.sequence([
          Animated.timing(legLeft, { toValue: -8, duration: 350, useNativeDriver: false }),
          Animated.timing(legLeft, { toValue: 0, duration: 350, useNativeDriver: false }),
        ]),
      );
      const rightLeg = Animated.loop(
        Animated.sequence([
          Animated.timing(legRight, { toValue: 8, duration: 380, useNativeDriver: false }),
          Animated.timing(legRight, { toValue: 0, duration: 380, useNativeDriver: false }),
        ]),
      );
      leftArm.start(); rightArm.start(); leftLeg.start(); rightLeg.start();
      return () => { leftArm.stop(); rightArm.stop(); leftLeg.stop(); rightLeg.stop(); };
    }
    // Reset limbs
    Animated.timing(armLeft, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    Animated.timing(armRight, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    Animated.timing(legLeft, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    Animated.timing(legRight, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    return undefined;
  }, [expression, armLeft, armRight, legLeft, legRight]);

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt, gesture) => Math.abs(gesture.dx) + Math.abs(gesture.dy) > 6,
      onPanResponderMove: (_evt, gesture) => {
        position.setValue({ x: gesture.moveX - HEAD_W / 2, y: gesture.moveY - HEAD_H - 40 });
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
              toValue: { x: pageX - HEAD_W / 2, y: pageY - HEAD_H - 40 },
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
          <Text style={styles.panelMessage}>{isLoading ? 'Thinking...' : message}</Text>
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
        style={[{
          position: 'absolute',
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { scale: pulse },
          ],
        }]}
      >
        <TouchableOpacity activeOpacity={0.85} onPress={() => (panelOpen ? closePanel() : openPanel())}>
          {/* CHARACTER ROOT */}
          <View style={styles.character}>
            {/* LEFT ARM */}
            <Animated.View style={[styles.armLeft, { transform: [{ rotate: armLeft.interpolate({ inputRange: [-20, 0], outputRange: ['-20deg', '0deg'] }) }] }]}>
              <LinearGradient colors={colors.sand} style={styles.limbGradient} />
              <View style={styles.hand} />
            </Animated.View>

            {/* RIGHT ARM */}
            <Animated.View style={[styles.armRight, { transform: [{ rotate: armRight.interpolate({ inputRange: [0, 20], outputRange: ['0deg', '20deg'] }) }] }]}>
              <LinearGradient colors={colors.sand} style={styles.limbGradient} />
              <View style={styles.hand} />
            </Animated.View>

            {/* HEAD */}
            <LinearGradient
              colors={colors.sand}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.headShell}
            >
              <View style={styles.headBand}>
                {/* LEFT EYE */}
                <Animated.View style={[styles.eye, { backgroundColor: EYE_COLORS[expression], opacity: eyeGlow }]}>
                  <View style={styles.eyePupil} />
                </Animated.View>
                {/* RIGHT EYE */}
                <Animated.View style={[styles.eye, { backgroundColor: EYE_COLORS[expression], opacity: eyeGlow }]}>
                  <View style={styles.eyePupil} />
                </Animated.View>
              </View>
            </LinearGradient>

            {/* BODY */}
            <LinearGradient colors={colors.ash} style={styles.body}>
              <View style={styles.bodyCore} />
            </LinearGradient>

            {/* LEGS */}
            <View style={styles.legsRow}>
              <Animated.View style={[styles.leg, { transform: [{ rotate: legLeft.interpolate({ inputRange: [-8, 0], outputRange: ['-8deg', '0deg'] }) }] }]}>
                <LinearGradient colors={colors.copper} style={styles.limbGradient} />
                <View style={styles.foot} />
              </Animated.View>
              <Animated.View style={[styles.leg, { transform: [{ rotate: legRight.interpolate({ inputRange: [0, 8], outputRange: ['0deg', '8deg'] }) }] }]}>
                <LinearGradient colors={colors.copper} style={styles.limbGradient} />
                <View style={styles.foot} />
              </Animated.View>
            </View>
          </View>
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
  character: {
    alignItems: 'center',
    width: HEAD_W + 40,
    ...shadows.elevated,
  },
  headShell: {
    width: HEAD_W,
    height: HEAD_H,
    borderRadius: HEAD_H / 2,
    padding: 4,
    justifyContent: 'center',
    zIndex: 2,
  },
  headBand: {
    flex: 1,
    borderRadius: (HEAD_H - 8) / 2,
    backgroundColor: '#0a0a0e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 14,
  },
  eye: {
    width: 14,
    height: 14,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
    elevation: 6,
  },
  eyePupil: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: '#000',
  },
  body: {
    width: BODY_W,
    height: BODY_H,
    borderRadius: 10,
    marginTop: -6,
    padding: 2,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bodyCore: {
    width: BODY_W - 8,
    height: BODY_H - 8,
    borderRadius: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  armLeft: {
    position: 'absolute',
    left: -12,
    top: 10,
    alignItems: 'center',
    height: 44,
    width: LIMB_W,
    zIndex: 1,
  },
  armRight: {
    position: 'absolute',
    right: -12,
    top: 10,
    alignItems: 'center',
    height: 44,
    width: LIMB_W,
    zIndex: 1,
  },
  limbGradient: {
    width: LIMB_W,
    height: 34,
    borderRadius: LIMB_W / 2,
  },
  hand: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.sand[1],
    marginTop: -2,
  },
  legsRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: -4,
    zIndex: 0,
  },
  leg: {
    alignItems: 'center',
    height: 38,
    width: LIMB_W,
  },
  foot: {
    width: 12,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.copper[1],
    marginTop: -2,
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
