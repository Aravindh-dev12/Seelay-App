import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, FlatList } from 'react-native';
import { Video } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import { api } from '../../api/client';
import { colors, typography, spacing } from '../../theme';

const { height } = Dimensions.get('window');

interface Clip {
  id: string;
  creator: { displayName: string; username: string; campus: string };
  caption: string;
  challengeTag: string;
  videoUrl: string;
  vibeScore: number;
  metrics: { likes: number; comments: number; shares: number; saves: number };
}

function FeedCard({ clip, active }: { clip: Clip; active: boolean }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const scale = useSharedValue(1);

  const heartStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleLike = () => {
    setLiked(!liked);
    scale.value = withSpring(1.3, { damping: 5, stiffness: 200 });
    setTimeout(() => { scale.value = withSpring(1); }, 150);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    api.likeClip(clip.id).catch(() => {});
  };

  return (
    <View style={[styles.card, { height: height - 160 }]}>
      <Video
        source={{ uri: clip.videoUrl }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        isLooping
        shouldPlay={active}
        isMuted={false}
      />
      <View style={styles.overlay} />

      <View style={styles.content}>
        <View style={styles.leftContent}>
          <View style={styles.badge}>
            <Ionicons name="scan" size={14} color={colors.sand[0]} />
            <Text style={styles.badgeText}>Motion auto-captured</Text>
          </View>
          <Text style={styles.creatorName}>{clip.creator.displayName}</Text>
          <Text style={styles.username}>@{clip.creator.username} · {clip.creator.campus}</Text>
          <Text style={styles.caption}>{clip.caption}</Text>
          <Text style={styles.challengeTag}>{clip.challengeTag}</Text>
        </View>

        <View style={styles.actions}>
          <ActionButton icon="heart" count={clip.metrics.likes} onPress={handleLike} active={liked} activeColor={colors.copper[0]} />
          <ActionButton icon="chatbubble" count={clip.metrics.comments} onPress={() => {}} />
          <ActionButton icon="share-social" count={clip.metrics.shares} onPress={() => {}} />
          <ActionButton icon="bookmark" count={clip.metrics.saves} onPress={() => { setSaved(!saved); api.saveClip(clip.id).catch(() => {}); }} active={saved} />
        </View>
      </View>

      <Animated.View style={[styles.heartBurst, heartStyle]} pointerEvents="none">
        {liked && <Ionicons name="heart" size={120} color={colors.copper[0]} />}
      </Animated.View>
    </View>
  );
}

function ActionButton({ icon, count, onPress, active, activeColor }: any) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.actionButton}>
      <View style={styles.actionIcon}>
        <Ionicons name={active ? icon : `${icon}-outline`} size={28} color={active ? (activeColor || colors.sand[0]) : colors.textPrimary} />
      </View>
      <Text style={styles.actionCount}>{count}</Text>
    </TouchableOpacity>
  );
}

export default function FeedScreen() {
  const [clips, setClips] = useState<Clip[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    api.feed().then((data: any) => setClips(data.items)).catch(() => {});
  }, []);

  const onViewableItemsChanged = useCallback(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={clips}
        keyExtractor={(item: Clip) => item.id}
        renderItem={({ item, index }: { item: Clip; index: number }) => (
          <FeedCard clip={item} active={index === activeIndex} />
        )}
        pagingEnabled
        vertical
        showsVerticalScrollIndicator={false}
        overScrollMode="never"
        bounces={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        decelerationRate="fast"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: { position: 'relative', overflow: 'hidden' },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  leftContent: { flex: 1, marginRight: spacing.md },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212,184,150,0.16)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: spacing.sm,
  },
  badgeText: {
    ...typography.small,
    color: colors.sand[0],
    fontWeight: '700',
    marginLeft: 4,
  },
  creatorName: {
    ...typography.h1,
    color: colors.textPrimary,
  },
  username: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  caption: {
    ...typography.body,
    color: colors.textPrimary,
    marginTop: spacing.sm,
    fontWeight: '600',
  },
  challengeTag: {
    ...typography.small,
    color: colors.sand[0],
    marginTop: spacing.sm,
    fontWeight: '700',
  },
  actions: {
    alignItems: 'center',
    gap: spacing.md,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionCount: {
    ...typography.small,
    color: colors.textPrimary,
    marginTop: 4,
    fontWeight: '700',
  },
  heartBurst: {
    position: 'absolute',
    top: '40%',
    left: '35%',
    opacity: 0.6,
  },
});
