import { useEffect, useRef } from 'react';
import { Animated, Dimensions, PanResponder, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, shadows } from '../theme';
import { useVisor } from './VisorContext';
import type { VisorExpression } from './types';

const CORE_SIZE = 72;
const RING_SIZE = 96;

const EXPRESSION_CONFIG: Record<VisorExpression, { core: readonly string[]; ring: string; eye: string; speed: number }> = {
  idle:    { core: colors.sand,  ring: 'rgba(212,184,150,0.25)', eye: colors.sand[0],  speed: 8000 },
  listening:{ core: colors.sage,  ring: 'rgba(125,168,138,0.35)', eye: colors.sage[0],  speed: 3000 },
  thinking:{ core: colors.ash,   ring: 'rgba(107,107,107,0.30)', eye: colors.ash[0],   speed: 1500 },
  speaking:{ core: colors.copper,ring: 'rgba(196,144,122,0.40)', eye: colors.copper[0],speed: 1000 },
};

export default function SeelayVisor() {
  const { visible, expression, panelOpen, followMode, message, isLoading, providerUsed, openPanel, closePanel, startListening, toggleFollow } =
    useVisor();

  const cfg = EXPRESSION_CONFIG[expression];
  const win = Dimensions.get('window');

  const position = useRef(
    new Animated.ValueXY({ x: win.width - CORE_SIZE - 24, y: win.height - 200 }),
  ).current;

  const breathe = useRef(new Animated.Value(1)).current;
  const ringSpin = useRef(new Animated.Value(0)).current;
  const eyeBlink = useRef(new Animated.Value(1)).current;
  const coreGlow = useRef(new Animated.Value(0.6)).current;
  const antennaLeft = useRef(new Animated.Value(0)).current;
  const antennaRight = useRef(new Animated.Value(0)).current;

  // Breathing heartbeat — always alive
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, { toValue: 1.08, duration: 1800, useNativeDriver: false }),
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

  // Eye blink — more when thinking/speaking
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

  // Core glow intensity
  useEffect(() => {
    const target = expression === 'speaking' ? 1 : expression === 'thinking' ? 0.4 : 0.7;
    Animated.timing(coreGlow, { toValue: target, duration: 600, useNativeDriver: false }).start();
  }, [expression, coreGlow]);

  // Antennae extend when listening
  useEffect(() => {
    const target = expression === 'listening' ? 1 : 0;
    Animated.spring(antennaLeft, { toValue: target, useNativeDriver: false, friction: 5 }).start();
    Animated.spring(antennaRight, { toValue: target, useNativeDriver: false, friction: 5 }).start();
  }, [expression, antennaLeft, antennaRight]);

  const pan = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_evt: any, gesture: any) => Math.abs(gesture.dx) + Math.abs(gesture.dy) > 6,
      onPanResponderMove: (_evt: any, gesture: any) => {
        position.setValue({ x: gesture.moveX - CORE_SIZE / 2, y: gesture.moveY - CORE_SIZE / 2 - 40 });
      },
    }),
  ).current;

  if (!visible) return null;

  const ringRotate = ringSpin.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const antLeft = antennaLeft.interpolate({ inputRange: [0, 1], outputRange: ['-45deg', '-75deg'] });
  const antRight = antennaRight.interpolate({ inputRange: [0, 1], outputRange: ['45deg', '75deg'] });

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
              toValue: { x: pageX - CORE_SIZE / 2, y: pageY - CORE_SIZE / 2 - 40 },
              useNativeDriver: false, speed: 30, bounciness: 6,
            }).start();
          }}
        />
      ) : null}

      {panelOpen ? (
        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <Text style={styles.panelTitle}>SEELAY</Text>
            {providerUsed ? (
              <View style={[styles.providerBadge, providerUsed === 'ollama' && styles.providerOllama]}>
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
              <Ionicons name="locate" size={22} color={followMode ? colors.sage[0] : colors.textSecondary} />
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
          transform: [
            { translateX: position.x },
            { translateY: position.y },
            { scale: breathe },
          ],
        }]}
      >
        <TouchableOpacity activeOpacity={0.9} onPress={() => (panelOpen ? closePanel() : openPanel())}>
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

          {/* CORE ORB */}
          <LinearGradient
            colors={cfg.core}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.coreOrb}
          >
            {/* Inner shadow layer */}
            <View style={styles.coreInner}>
              {/* LEFT ANTENNA */}
              <Animated.View style={[styles.antenna, { left: 16, top: -8, transform: [{ rotate: antLeft }] }]}>
                <View style={[styles.antennaTip, { backgroundColor: cfg.eye }]} />
              </Animated.View>
              {/* RIGHT ANTENNA */}
              <Animated.View style={[styles.antenna, { right: 16, top: -8, transform: [{ rotate: antRight }] }]}>
                <View style={[styles.antennaTip, { backgroundColor: cfg.eye }]} />
              </Animated.View>

              {/* EYES */}
              <Animated.View style={[styles.eyeRow, { opacity: eyeBlink }]}>
                <View style={[styles.eye, { backgroundColor: cfg.eye }]}>
                  <View style={styles.eyePupil} />
                </View>
                <View style={[styles.eye, { backgroundColor: cfg.eye }]}>
                  <View style={styles.eyePupil} />
                </View>
              </Animated.View>

              {/* MOUTH */}
              <View style={[styles.mouth, {
                borderColor: cfg.eye,
                borderBottomWidth: expression === 'speaking' ? 3 : expression === 'thinking' ? 1 : 2,
                borderRadius: expression === 'speaking' ? 8 : expression === 'thinking' ? 2 : 6,
              }]} />

              {/* GLOW CORE */}
              <Animated.View style={[styles.glowCore, { opacity: coreGlow, backgroundColor: cfg.eye }]} />
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
    backgroundColor: 'rgba(0,0,0,0.02)',
  },
  auraRing: {
    position: 'absolute',
    top: -(RING_SIZE - CORE_SIZE) / 2,
    left: -(RING_SIZE - CORE_SIZE) / 2,
    width: RING_SIZE,
    height: RING_SIZE,
    borderRadius: RING_SIZE / 2,
    borderWidth: 1.5,
    borderStyle: 'dashed' as any,
    borderColor: 'rgba(212,184,150,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 0,
  },
  auraDot: {
    position: 'absolute',
    width: 4,
    height: 4,
    borderRadius: 2,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  coreOrb: {
    width: CORE_SIZE,
    height: CORE_SIZE,
    borderRadius: CORE_SIZE / 2,
    padding: 3,
    zIndex: 2,
    ...shadows.elevated,
  },
  coreInner: {
    flex: 1,
    borderRadius: (CORE_SIZE - 6) / 2,
    backgroundColor: 'rgba(5,5,8,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden' as any,
  },
  antenna: {
    position: 'absolute',
    width: 2,
    height: 14,
    backgroundColor: 'rgba(212,184,150,0.6)',
    borderRadius: 1,
    transformOrigin: 'bottom center' as any,
  },
  antennaTip: {
    position: 'absolute',
    top: -3,
    left: -2,
    width: 6,
    height: 6,
    borderRadius: 3,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 4,
  },
  eyeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -2,
  },
  eye: {
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 6,
  },
  eyePupil: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#000',
  },
  mouth: {
    width: 16,
    height: 8,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderBottomWidth: 2,
    borderColor: colors.sand[0],
    borderRadius: 6,
    marginTop: 4,
  },
  glowCore: {
    position: 'absolute',
    bottom: 6,
    width: 20,
    height: 6,
    borderRadius: 3,
    opacity: 0.6,
  },
  panel: {
    position: 'absolute',
    bottom: 110,
    left: 16,
    right: 16,
    backgroundColor: 'rgba(8,8,12,0.98)',
    borderWidth: 1,
    borderColor: colors.borderActive,
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
    color: colors.sand[0],
    letterSpacing: 4,
    fontWeight: '900',
  },
  providerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: 'rgba(200,160,120,0.2)',
    borderWidth: 1,
    borderColor: colors.copper[0],
  },
  providerOllama: {
    backgroundColor: 'rgba(125,168,138,0.2)',
    borderColor: colors.sage[0],
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
    backgroundColor: 'rgba(125,168,138,0.12)',
  },
  actionLabel: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 4,
  },
});
