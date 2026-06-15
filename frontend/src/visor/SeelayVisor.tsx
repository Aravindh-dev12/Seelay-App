import { useEffect, useRef } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../theme';
import { useVisor } from './VisorContext';
import type { VisorExpression } from './types';

const BODY_WIDTH = 90;
const BODY_HEIGHT = 64;
const RING_SIZE = 120;

const EXPRESSION_CONFIG: Record<VisorExpression, { core: readonly string[]; ring: string; eye: string; speed: number }> = {
  idle:      { core: ['#1c1c1c', '#0f0f0f'], ring: 'rgba(255,255,255,0.15)', eye: '#ffffff', speed: 8000 },
  listening: { core: ['#3a3a3a', '#1a1a1a'], ring: 'rgba(255,255,255,0.35)', eye: '#ffffff', speed: 3000 },
  thinking:  { core: ['#121212', '#080808'], ring: 'rgba(255,255,255,0.20)', eye: '#888888', speed: 1500 },
  speaking:  { core: ['#4a4a4a', '#222222'], ring: 'rgba(255,255,255,0.50)', eye: '#ffffff', speed: 1000 },
  dancing:   { core: ['#3a3a3a', '#0a0a0a'], ring: 'rgba(255,255,255,0.60)', eye: '#ffffff', speed: 600 },
};

export default function SeelayVisor() {
  const { visible, expression, panelOpen, followMode, message, isLoading, providerUsed, openPanel, closePanel, startListening, toggleFollow } =
    useVisor();

  const cfg = EXPRESSION_CONFIG[expression];
  const win = Dimensions.get('window');

  const position = useRef(
    new Animated.ValueXY({ x: win.width - BODY_WIDTH - 24, y: win.height - 240 }),
  ).current;

  const breathe = useRef(new Animated.Value(1)).current;
  const ringSpin = useRef(new Animated.Value(0)).current;
  const eyeBlink = useRef(new Animated.Value(1)).current;
  const coreGlow = useRef(new Animated.Value(0.6)).current;
  const waveAnim = useRef(new Animated.Value(0)).current;
  const walkAnim = useRef(new Animated.Value(0)).current;
  const danceBounce = useRef(new Animated.Value(0)).current;
  const danceTilt = useRef(new Animated.Value(0)).current;
  const danceArms = useRef(new Animated.Value(0)).current;

  // Breathing heartbeat — always alive
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, { toValue: 1.05, duration: 1800, useNativeDriver: false }),
        Animated.timing(breathe, { toValue: 1, duration: 1800, useNativeDriver: false }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [breathe]);

  // Aura ring rotation
  useEffect(() => {
    const loop = Animated.loop(
      Animated.timing(ringSpin, { toValue: 1, duration: cfg.speed, useNativeDriver: false }),
    );
    loop.start();
    return () => loop.stop();
  }, [cfg.speed, ringSpin]);

  // Eye blink — faster when thinking/speaking
  useEffect(() => {
    const interval = expression === 'idle' ? 4000 : expression === 'listening' ? 2000 : 800;
    const blinkLoop = Animated.loop(
      Animated.sequence([
        Animated.delay(interval),
        Animated.timing(eyeBlink, { toValue: 0.15, duration: 120, useNativeDriver: false }),
        Animated.timing(eyeBlink, { toValue: 1, duration: 120, useNativeDriver: false }),
      ]),
    );
    blinkLoop.start();
    return () => blinkLoop.stop();
  }, [expression, eyeBlink]);

  // Wave arm loop when speaking or listening
  useEffect(() => {
    if (expression === 'speaking' || expression === 'listening') {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(waveAnim, { toValue: 1, duration: 400, useNativeDriver: false }),
          Animated.timing(waveAnim, { toValue: 0, duration: 400, useNativeDriver: false }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    } else {
      Animated.timing(waveAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    }
  }, [expression, waveAnim]);

  // Walk animation when followMode is active
  useEffect(() => {
    if (followMode) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(walkAnim, { toValue: 1, duration: 300, useNativeDriver: false }),
          Animated.timing(walkAnim, { toValue: -1, duration: 300, useNativeDriver: false }),
        ]),
      );
      loop.start();
      return () => loop.stop();
    } else {
      Animated.timing(walkAnim, { toValue: 0, duration: 300, useNativeDriver: false }).start();
    }
  }, [followMode, walkAnim]);

  // Dance animation loop
  useEffect(() => {
    if (expression === 'dancing') {
      const loop = Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(danceBounce, { toValue: -12, duration: 200, useNativeDriver: false }),
            Animated.timing(danceBounce, { toValue: 0, duration: 200, useNativeDriver: false }),
          ]),
          Animated.sequence([
            Animated.timing(danceTilt, { toValue: 1, duration: 300, useNativeDriver: false }),
            Animated.timing(danceTilt, { toValue: -1, duration: 300, useNativeDriver: false }),
          ]),
          Animated.sequence([
            Animated.timing(danceArms, { toValue: 1, duration: 150, useNativeDriver: false }),
            Animated.timing(danceArms, { toValue: -1, duration: 150, useNativeDriver: false }),
          ]),
        ])
      );
      loop.start();
      return () => {
        loop.stop();
        Animated.parallel([
          Animated.timing(danceBounce, { toValue: 0, duration: 150, useNativeDriver: false }),
          Animated.timing(danceTilt, { toValue: 0, duration: 150, useNativeDriver: false }),
          Animated.timing(danceArms, { toValue: 0, duration: 150, useNativeDriver: false }),
        ]).start();
      };
    }
  }, [expression, danceBounce, danceTilt, danceArms]);

  // Core glow intensity
  useEffect(() => {
    const target = expression === 'speaking' ? 1 : expression === 'dancing' ? 0.9 : expression === 'thinking' ? 0.4 : 0.7;
    Animated.timing(coreGlow, { toValue: target, duration: 600, useNativeDriver: false }).start();
  }, [expression, coreGlow]);

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt: any, gesture: any) => Math.abs(gesture.dx) + Math.abs(gesture.dy) > 6,
      onPanResponderMove: (_evt: any, gesture: any) => {
        position.setValue({ x: gesture.moveX - BODY_WIDTH / 2, y: gesture.moveY - BODY_HEIGHT / 2 - 40 });
      },
    }),
  ).current;

  if (!visible) return null;

  const ringRotate = ringSpin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  
  // Arm rotation interpolations
  const rightArmRotate = expression === 'dancing'
    ? danceArms.interpolate({
        inputRange: [-1, 1],
        outputRange: ['30deg', '-60deg']
      })
    : waveAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['15deg', '-60deg'] // waves up and down
      });

  const leftArmRotate = expression === 'dancing'
    ? danceArms.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-60deg', '30deg']
      })
    : walkAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: ['-10deg', '30deg']
      });

  // Leg rotation/offset interpolations for walking/dancing
  const leftLegOffset = expression === 'dancing'
    ? danceArms.interpolate({
        inputRange: [-1, 1],
        outputRange: [-5, 5]
      })
    : walkAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: [-4, 4]
      });

  const rightLegOffset = expression === 'dancing'
    ? danceArms.interpolate({
        inputRange: [-1, 1],
        outputRange: [5, -5]
      })
    : walkAnim.interpolate({
        inputRange: [-1, 1],
        outputRange: [4, -4]
      });

  const danceRotate = danceTilt.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-10deg', '10deg']
  });

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {followMode ? (
        <View
          style={styles.followLayer}
          onStartShouldSetResponder={() => true}
          onMoveShouldSetResponder={() => true}
          onResponderMove={(evt: any) => {
            const { pageX, pageY } = evt.nativeEvent;
            Animated.spring(position, {
              toValue: { x: pageX - BODY_WIDTH / 2, y: pageY - BODY_HEIGHT / 2 - 40 },
              useNativeDriver: false, speed: 30, bounciness: 6,
            }).start();
          }}
        />
      ) : null}

      {panelOpen ? (
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>Seelay</Text>
            {providerUsed ? (
              <View style={styles.providerBadge}>
                <Text style={styles.providerText}>{providerUsed === 'ollama' ? 'LOCAL' : 'CLOUD'}</Text>
              </View>
            ) : null}
          </View>
          <Text style={styles.panelMessage}>{isLoading ? 'Syncing neural pathways...' : message}</Text>
          <View style={styles.panelActions}>
            <TouchableOpacity style={styles.actionBtn} onPress={startListening}>
              <Ionicons name="mic" size={22} color={cfg.eye} />
              <Text style={styles.actionLabel}>Talk</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionBtn, followMode && styles.actionActive]} onPress={toggleFollow}>
              <Ionicons name="locate" size={22} color={followMode ? '#ffffff' : colors.textSecondary} />
              <Text style={styles.actionLabel}>{followMode ? 'Following' : 'Follow'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={closePanel}>
              <Ionicons name="close" size={22} color={colors.textSecondary} />
              <Text style={styles.actionLabel}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}

      <Animated.View
        {...pan.panHandlers}
        style={[{
          position: 'absolute',
          width: BODY_WIDTH + 40, // padding for arms
          height: BODY_HEIGHT + 50, // padding for legs
          alignItems: 'center',
          justifyContent: 'center',
          transform: [
            { translateX: position.x - 20 },
            { translateY: Animated.add(position.y, danceBounce) },
            { scale: breathe },
            { rotate: danceRotate },
          ],
        }]}
      >
        <TouchableOpacity 
          activeOpacity={0.9} 
          onPress={() => (panelOpen ? closePanel() : openPanel())}
          style={styles.characterContainer}
        >
          {/* AURA RING */}
          <Animated.View style={[styles.auraRing, {
            borderColor: cfg.ring,
            transform: [{ rotate: ringRotate }],
          }]}>
            <View style={[styles.auraDot, { top: 0, left: '50%', marginLeft: -2, backgroundColor: cfg.eye }]} />
            <View style={[styles.auraDot, { bottom: 0, left: '50%', marginLeft: -2, backgroundColor: cfg.eye }]} />
            <View style={[styles.auraDot, { left: 0, top: '50%', marginTop: -2, backgroundColor: cfg.eye }]} />
            <View style={[styles.auraDot, { right: 0, top: '50%', marginTop: -2, backgroundColor: cfg.eye }]} />
          </Animated.View>

          {/* LEFT ARM */}
          <Animated.View style={[styles.armLeft, { transform: [{ rotate: leftArmRotate }] }]}>
            <View style={styles.armLine} />
            <View style={styles.hand} />
          </Animated.View>

          {/* RIGHT ARM (WAVING) */}
          <Animated.View style={[styles.armRight, { transform: [{ rotate: rightArmRotate }] }]}>
            <View style={styles.armLine} />
            <View style={styles.hand} />
          </Animated.View>

          {/* LEGS (CONNECTED TO BOTTOM OF BODY) */}
          <View style={styles.legsRow}>
            {/* LEFT LEG */}
            <Animated.View style={[styles.legContainer, { transform: [{ translateY: leftLegOffset }] }]}>
              <View style={styles.legLine} />
              <View style={styles.shoe} />
            </Animated.View>
            {/* RIGHT LEG */}
            <Animated.View style={[styles.legContainer, { transform: [{ translateY: rightLegOffset }] }]}>
              <View style={styles.legLine} />
              <View style={styles.shoe} />
            </Animated.View>
          </View>

          {/* TV CAPSULE BODY */}
          <View style={styles.bodyOutline}>
            <LinearGradient
              colors={cfg.core}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.coreInner}
            >
              {/* SCREEN REFLECTION GLASS EFFECT */}
              <View style={styles.glassShine} />

              {/* FACE SCREEN */}
              <View style={styles.faceScreen}>
                {/* EYES */}
                <Animated.View style={[styles.eyeRow, { opacity: eyeBlink }]}>
                  <View style={[styles.eye, { backgroundColor: cfg.eye }]} />
                  <View style={[styles.eye, { backgroundColor: cfg.eye }]} />
                </Animated.View>

                {/* MOUTH */}
                <View style={[styles.mouth, {
                  borderColor: cfg.eye,
                  borderBottomWidth: (expression === 'speaking' || expression === 'dancing') ? 3 : 2,
                  borderRadius: (expression === 'speaking' || expression === 'dancing') ? 8 : 6,
                  height: (expression === 'speaking' || expression === 'dancing') ? 10 : 6,
                }]} />

                {/* GLOW BAR */}
                <Animated.View style={[styles.glowCore, { opacity: coreGlow, backgroundColor: cfg.eye }]} />
              </View>
            </LinearGradient>
          </View>

        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  followLayer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.01)',
  },
  characterContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: BODY_WIDTH + 40,
    height: BODY_HEIGHT + 40,
  },
  auraRing: {
    position: 'absolute',
    top: (BODY_HEIGHT + 40 - RING_SIZE) / 2,
    left: (BODY_WIDTH + 40 - RING_SIZE) / 2,
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 1,
    borderStyle: 'dashed' as any,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  auraDot: {
    position: 'absolute',
    width: 3,
    height: 3,
    borderRadius: 1.5,
  },
  bodyOutline: {
    width: BODY_WIDTH,
    height: BODY_HEIGHT,
    borderRadius: 18,
    borderWidth: 2.5,
    borderColor: '#ffffff',
    backgroundColor: '#000000',
    overflow: 'hidden',
    zIndex: 5,
    ...shadows.elevated,
  },
  coreInner: {
    flex: 1,
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  glassShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255,255,255,0.06)',
    transform: [{ skewY: '-15deg' }, { scaleY: 1.5 }],
  },
  faceScreen: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eyeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  eye: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 8,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
  },
  mouth: {
    width: 14,
    height: 6,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderColor: '#ffffff',
    borderRadius: 6,
    marginTop: 2,
  },
  glowCore: {
    position: 'absolute',
    bottom: 2,
    width: 16,
    height: 3,
    borderRadius: 1.5,
  },
  // ARMS
  armLeft: {
    position: 'absolute',
    left: 0,
    top: BODY_HEIGHT / 2 - 4,
    width: 24,
    height: 12,
    alignItems: 'flex-start',
    justifyContent: 'center',
    zIndex: 2,
  },
  armRight: {
    position: 'absolute',
    right: 0,
    top: BODY_HEIGHT / 2 - 4,
    width: 24,
    height: 12,
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 2,
  },
  armLine: {
    width: 16,
    height: 2,
    backgroundColor: '#ffffff',
  },
  hand: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
  },
  // LEGS
  legsRow: {
    position: 'absolute',
    bottom: 0,
    width: BODY_WIDTH - 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 1,
  },
  legContainer: {
    alignItems: 'center',
    width: 16,
  },
  legLine: {
    width: 2.5,
    height: 18,
    backgroundColor: '#ffffff',
  },
  shoe: {
    width: 12,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#000000',
  },
  // PANEL
  panel: {
    position: 'absolute',
    bottom: 140,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(10,10,10,0.96)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 24,
    padding: spacing.md,
    ...shadows.elevated,
    zIndex: 10,
  },
  panelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  panelTitle: {
    ...typography.tiny,
    color: '#ffffff',
    letterSpacing: 2,
    fontFamily: 'Sacramento_400Regular',
    fontSize: 18,
  },
  providerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: '#ffffff',
  },
  providerText: {
    ...typography.tiny,
    color: colors.textSecondary,
    fontSize: 9,
    letterSpacing: 1,
  },
  panelMessage: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.md,
    lineHeight: 22,
  },
  panelActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionBtn: {
    alignItems: 'center',
    padding: spacing.sm,
    borderRadius: 14,
  },
  actionActive: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  actionLabel: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
