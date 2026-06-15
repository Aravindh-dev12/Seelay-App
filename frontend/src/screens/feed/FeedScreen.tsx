import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  ImageBackground,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard, GlassIconButton, glassTokens } from '../../components/Glass';
import { api } from '../../api/client';
import { colors, typography, spacing, gradients } from '../../theme';

const { width } = Dimensions.get('window');

interface Clip {
  id: string;
  creator: { id: string; displayName: string; username: string; avatarUrl?: string };
  caption: string;
  challengeTag?: string;
  posterUrl?: string;
  videoUrl: string;
  metrics: { likes: number; comments: number; shares: number; saves: number };
}

interface Story {
  id: string;
  user: { id: string; displayName: string; avatarUrl?: string };
  isMine?: boolean;
}

const FALLBACK_STORIES: Story[] = [
  { id: 's_me', user: { id: 'me', displayName: 'Add Story' }, isMine: true },
  { id: 's_1', user: { id: 'u_mira', displayName: 'Mira', avatarUrl: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80' } },
  { id: 's_2', user: { id: 'u_raj', displayName: 'Raj', avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' } },
  { id: 's_3', user: { id: 'u_zara', displayName: 'Zara', avatarUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80' } },
  { id: 's_4', user: { id: 'u_kai', displayName: 'Kai', avatarUrl: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80' } },
];

function StoryRing({ story, onPress }: { story: Story; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.storyItem} onPress={onPress} activeOpacity={0.85}>
      {story.isMine ? (
        <View style={[styles.storyRing, styles.storyRingMine]}>
          <View style={styles.storyMine}>
            <Ionicons name="add" size={28} color={colors.textPrimary} />
          </View>
        </View>
      ) : (
        <LinearGradient
          colors={['#ffffff', '#bdbdbd', '#7a7a7a']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.storyRing}
        >
          <View style={styles.storyAvatarWrap}>
            {story.user.avatarUrl ? (
              <Image source={{ uri: story.user.avatarUrl }} style={styles.storyAvatar} />
            ) : (
              <View style={[styles.storyAvatar, styles.storyAvatarPlaceholder]}>
                <Ionicons name="person" size={24} color={colors.textSecondary} />
              </View>
            )}
          </View>
        </LinearGradient>
      )}
      <Text style={styles.storyLabel} numberOfLines={1}>
        {story.isMine ? 'Add Story' : story.user.displayName}
      </Text>
    </TouchableOpacity>
  );
}

function FeedCard({ clip }: { clip: Clip }) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comment, setComment] = useState('');
  const navigation = useNavigation<any>();

  const handleLike = () => {
    setLiked((l) => !l);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    if (!liked) api.likeClip(clip.id).catch(() => {});
    else api.unlikeClip(clip.id).catch(() => {});
  };

  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    api.addComment(clip.id, comment.trim()).catch(() => {});
    setComment('');
  };

  const poster =
    clip.posterUrl ||
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80';

  return (
    <View style={styles.cardWrapper}>
      <ImageBackground source={{ uri: poster }} style={styles.cardImage} imageStyle={styles.cardImageRadius}>
        <LinearGradient
          colors={['rgba(0,0,0,0.10)', 'rgba(0,0,0,0.55)']}
          style={[StyleSheet.absoluteFillObject, { borderRadius: glassTokens.radius }]}
        />

        <View style={styles.cardHeader}>
          <View style={styles.cardAvatar}>
            {clip.creator.avatarUrl ? (
              <Image source={{ uri: clip.creator.avatarUrl }} style={styles.cardAvatarImg} />
            ) : (
              <Ionicons name="person" size={18} color={colors.textPrimary} />
            )}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.cardUser}>@{clip.creator.username}</Text>
            <Text style={styles.cardMeta}>2m ago</Text>
          </View>
          <TouchableOpacity hitSlop={10}>
            <Ionicons name="ellipsis-horizontal" size={20} color={colors.textPrimary} />
          </TouchableOpacity>
        </View>

        <View style={styles.cardCaptionWrap}>
          <Text style={styles.cardCaption}>{clip.caption}</Text>
        </View>
      </ImageBackground>

      <View style={styles.cardCommentBar}>
        <View style={styles.commentInputWrap}>
          <Ionicons name="chatbubble-outline" size={18} color={colors.textPrimary} />
          <TextInput
            placeholder="Add a comment"
            placeholderTextColor={colors.textMuted}
            style={styles.commentInput}
            value={comment}
            onChangeText={setComment}
            onSubmitEditing={handleSubmitComment}
            returnKeyType="send"
          />
        </View>
        <TouchableOpacity onPress={handleLike} activeOpacity={0.8} style={[styles.heartBtn, liked && styles.heartBtnActive]}>
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={20} color={liked ? '#0a0a0a' : colors.textPrimary} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSaved(!saved);
            api.saveClip(clip.id).catch(() => {});
          }}
          activeOpacity={0.8}
          style={[styles.heartBtn, saved && styles.heartBtnActive]}
        >
          <Ionicons name={saved ? 'bookmark' : 'bookmark-outline'} size={18} color={saved ? '#0a0a0a' : colors.textPrimary} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardMetricsRow}>
        <Text style={styles.metricText}>{clip.metrics.likes.toLocaleString()} likes</Text>
        <Text style={styles.metricDot}>·</Text>
        <Text style={styles.metricText}>{clip.metrics.comments} comments</Text>
        {clip.challengeTag ? (
          <>
            <Text style={styles.metricDot}>·</Text>
            <Text style={[styles.metricText, { color: colors.textPrimary, fontWeight: '700' }]}>{clip.challengeTag}</Text>
          </>
        ) : null}
      </View>
    </View>
  );
}

export default function FeedScreen() {
  const navigation = useNavigation<any>();
  const [clips, setClips] = useState<Clip[]>([]);
  const [stories] = useState<Story[]>(FALLBACK_STORIES);

  useEffect(() => {
    api
      .feed()
      .then((data: any) => setClips(data.items || []))
      .catch(() => {});
  }, []);

  return (
    <LinearGradient
      colors={gradients.background.colors}
      start={gradients.background.start}
      end={gradients.background.end}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <FlatList
          data={clips}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <FeedCard clip={item} />}
          ListHeaderComponent={
            <View>
              {/* Top bar */}
              <View style={styles.topBar}>
                <GlassIconButton icon="search" size={42} onPress={() => navigation.navigate('Search')} />
                <View style={styles.topCenter}>
                  <Text style={styles.brand}>Seelay</Text>
                  <Text style={styles.brandSub}>Feed</Text>
                </View>
                <GlassIconButton
                  icon="notifications-outline"
                  size={42}
                  onPress={() => navigation.navigate('Notifications')}
                />
              </View>

              {/* Stories row */}
              <FlatList
                data={stories}
                keyExtractor={(s) => s.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.storiesRow}
                renderItem={({ item }) => (
                  <StoryRing
                    story={item}
                    onPress={() =>
                      item.isMine
                        ? navigation.navigate('Mirror')
                        : navigation.navigate('StoryViewer', { storyId: item.id })
                    }
                  />
                )}
              />
            </View>
          }
          ListEmptyComponent={
            <GlassCard style={{ marginHorizontal: spacing.md, marginTop: spacing.lg }}>
              <Text style={styles.emptyTitle}>No clips yet</Text>
              <Text style={styles.emptySub}>Follow creators or capture your first Mirror Moment.</Text>
            </GlassCard>
          }
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 140 }}
        />
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  topCenter: {
    alignItems: 'center',
  },
  brand: {
    ...typography.titleSmall,
    color: colors.textPrimary,
  },
  brandSub: {
    ...typography.tiny,
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginTop: -4,
  },
  storiesRow: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    gap: 14,
  },
  storyItem: {
    alignItems: 'center',
    width: 70,
  },
  storyRing: {
    width: 66,
    height: 66,
    borderRadius: 33,
    padding: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyRingMine: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.25)',
  },
  storyAvatarWrap: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    padding: 2,
    backgroundColor: '#000',
  },
  storyAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
  },
  storyAvatarPlaceholder: {
    backgroundColor: glassTokens.bgSubtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  storyMine: {
    width: '100%',
    height: '100%',
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: glassTokens.bg,
  },
  storyLabel: {
    ...typography.tiny,
    color: colors.textSecondary,
    marginTop: 6,
    textAlign: 'center',
  },
  cardWrapper: {
    marginHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  cardImage: {
    height: width * 1.05,
    borderRadius: glassTokens.radius,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  cardImageRadius: {
    borderRadius: glassTokens.radius,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    gap: 10,
  },
  cardAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: glassTokens.bg,
    borderWidth: 1,
    borderColor: glassTokens.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardAvatarImg: {
    width: '100%',
    height: '100%',
  },
  cardUser: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  cardMeta: {
    ...typography.tiny,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  cardCaptionWrap: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
  },
  cardCaption: {
    ...typography.h3,
    color: colors.textPrimary,
    fontWeight: '700',
    lineHeight: 28,
  },
  cardCommentBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: -28,
    marginHorizontal: spacing.md,
    gap: 8,
    zIndex: 2,
  },
  commentInputWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(20,20,20,0.7)',
    borderWidth: 1,
    borderColor: glassTokens.border,
    gap: 8,
  },
  commentInput: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
  },
  heartBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(20,20,20,0.7)',
    borderWidth: 1,
    borderColor: glassTokens.border,
  },
  heartBtnActive: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  cardMetricsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    marginTop: 12,
    gap: 6,
  },
  metricText: {
    ...typography.small,
    color: colors.textSecondary,
  },
  metricDot: {
    color: colors.textMuted,
  },
  emptyTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: 4,
  },
  emptySub: {
    ...typography.caption,
    color: colors.textMuted,
  },
});
