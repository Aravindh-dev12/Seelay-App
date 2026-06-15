import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard, GlassChip, GlassIconButton, SectionHeader, glassTokens } from '../../components/Glass';
import { colors, typography, spacing, gradients } from '../../theme';

const ONLINE_FRIENDS = [
  { id: 'u1', name: 'Mira', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80', online: true },
  { id: 'u2', name: 'Raj', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80', online: true },
  { id: 'u3', name: 'Zara', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80', online: false },
  { id: 'u4', name: 'Kai', avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80', online: true },
];

const CHATS = [
  { id: 'c1', name: 'Mira', last: 'See you at the cypher tonight 🔥', time: '2m', unread: 3, avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=200&q=80' },
  { id: 'c2', name: 'Campus Crew', last: 'Raj: Friday Drop training session 7pm', time: '14m', unread: 0, avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=200&q=80' },
  { id: 'c3', name: 'Zara', last: 'You sent a clip', time: '1h', unread: 0, avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=200&q=80' },
];

export default function SocialHubScreen() {
  const navigation = useNavigation<any>();

  return (
    <LinearGradient
      colors={gradients.background.colors}
      start={gradients.background.start}
      end={gradients.background.end}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView contentContainerStyle={{ paddingBottom: 140 }} showsVerticalScrollIndicator={false}>
          <View style={styles.topBar}>
            <View>
              <Text style={styles.eyebrow}>YOUR PEOPLE</Text>
              <Text style={styles.title}>Connect</Text>
            </View>
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <GlassIconButton icon="search" size={42} onPress={() => navigation.navigate('Search')} />
              <GlassIconButton icon="add" size={42} />
            </View>
          </View>

          {/* Hero CTA cards */}
          <View style={{ paddingHorizontal: spacing.md, gap: spacing.md }}>
            <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('MotionMatch')}>
              <GlassCard padding={spacing.lg} elevated>
                <View style={styles.cardRow}>
                  <View style={styles.iconBubble}>
                    <Ionicons name="heart" size={22} color={colors.textPrimary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>Motion Match</Text>
                    <Text style={styles.cardBody}>AI matches you by movement DNA. No photos. Just vibe.</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </View>
              </GlassCard>
            </TouchableOpacity>

            <TouchableOpacity activeOpacity={0.85} onPress={() => navigation.navigate('Identity')}>
              <GlassCard padding={spacing.lg}>
                <View style={styles.cardRow}>
                  <View style={styles.iconBubble}>
                    <Ionicons name="finger-print" size={22} color={colors.textPrimary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardTitle}>Identity Hub</Text>
                    <Text style={styles.cardBody}>Vibe DNA · Life Stamps · Sound Alchemy · Alter Ego · Tokens</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </View>
              </GlassCard>
            </TouchableOpacity>
          </View>

          <SectionHeader title="Online" action="See all" />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.onlineRow}>
            {ONLINE_FRIENDS.map((f) => (
              <TouchableOpacity key={f.id} activeOpacity={0.85} style={styles.onlineItem}>
                <LinearGradient
                  colors={f.online ? ['#ffffff', '#bdbdbd'] : ['#3a3a3a', '#1a1a1a']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.onlineRing}
                >
                  <View style={styles.onlineAvatarWrap}>
                    <Image source={{ uri: f.avatar }} style={styles.onlineAvatar} />
                  </View>
                </LinearGradient>
                {f.online ? <View style={styles.onlineDot} /> : null}
                <Text style={styles.onlineName} numberOfLines={1}>{f.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <SectionHeader title="Chats" action="New chat" />

          <View style={{ paddingHorizontal: spacing.md, gap: 8 }}>
            {CHATS.map((chat) => (
              <TouchableOpacity
                key={chat.id}
                activeOpacity={0.85}
                onPress={() => navigation.navigate('Chat', { chatId: chat.id, participantName: chat.name })}
              >
                <GlassCard padding={spacing.md}>
                  <View style={styles.chatRow}>
                    <Image source={{ uri: chat.avatar }} style={styles.chatAvatar} />
                    <View style={{ flex: 1 }}>
                      <View style={styles.chatHead}>
                        <Text style={styles.chatName} numberOfLines={1}>{chat.name}</Text>
                        <Text style={styles.chatTime}>{chat.time}</Text>
                      </View>
                      <Text style={styles.chatLast} numberOfLines={1}>{chat.last}</Text>
                    </View>
                    {chat.unread > 0 ? (
                      <View style={styles.unread}>
                        <Text style={styles.unreadText}>{chat.unread}</Text>
                      </View>
                    ) : null}
                  </View>
                </GlassCard>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
  },
  eyebrow: {
    ...typography.tiny,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginTop: 2,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconBubble: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: glassTokens.bgStrong,
    borderWidth: 1,
    borderColor: glassTokens.borderStrong,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  cardBody: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: 4,
    lineHeight: 18,
  },
  onlineRow: {
    paddingHorizontal: spacing.md,
    gap: 14,
    paddingBottom: spacing.sm,
  },
  onlineItem: {
    width: 70,
    alignItems: 'center',
  },
  onlineRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineAvatarWrap: {
    width: '100%',
    height: '100%',
    padding: 2,
    borderRadius: 30,
    backgroundColor: '#000',
  },
  onlineAvatar: {
    width: '100%',
    height: '100%',
    borderRadius: 28,
  },
  onlineDot: {
    position: 'absolute',
    right: 6,
    top: 4,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#4ade80',
    borderWidth: 2,
    borderColor: '#000',
  },
  onlineName: {
    ...typography.tiny,
    color: colors.textSecondary,
    marginTop: 6,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chatAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: glassTokens.bgSubtle,
  },
  chatHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chatName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  chatTime: {
    ...typography.tiny,
    color: colors.textMuted,
  },
  chatLast: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: 2,
  },
  unread: {
    minWidth: 22,
    height: 22,
    paddingHorizontal: 6,
    borderRadius: 11,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  unreadText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0a0a0a',
  },
});
