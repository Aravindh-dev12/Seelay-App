import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GlassCard, GlassChip, GlassIconButton, glassTokens } from '../../components/Glass';
import { api } from '../../api/client';
import { colors, typography, spacing, gradients } from '../../theme';

const { width } = Dimensions.get('window');
const GRID_GAP = 10;
const GRID_COL = (width - spacing.md * 2 - GRID_GAP * 2) / 3;

type Tab = 'photos' | 'video' | 'tagged';

interface GridItem {
  id: string;
  poster: string;
  views?: string;
}

const PHOTO_ITEMS: GridItem[] = [
  { id: 'p1', poster: 'https://images.unsplash.com/photo-1492366254240-43affaefc3e3?auto=format&fit=crop&w=400&q=80', views: '1.2k' },
  { id: 'p2', poster: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80', views: '3.2k' },
  { id: 'p3', poster: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80', views: '5.6k' },
  { id: 'p4', poster: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=400&q=80', views: '5.7k' },
  { id: 'p5', poster: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=400&q=80', views: '2.9k' },
  { id: 'p6', poster: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&w=400&q=80', views: '6.3k' },
];

interface MeData {
  user?: { id: string; displayName: string; username: string; avatarUrl?: string; campus?: string };
  stats?: { posts: number; followers: number; following: number };
}

export default function ProfileScreen() {
  const navigation = useNavigation<any>();
  const [tab, setTab] = useState<Tab>('photos');
  const [me, setMe] = useState<MeData>({});

  useEffect(() => {
    api
      .me()
      .then((data: any) => setMe({ user: data.user || data, stats: data.stats }))
      .catch(() => {});
  }, []);

  const user = me.user;
  const displayName = user?.displayName || 'Mira Kalyani';
  const username = user?.username || 'mira.kalyani';
  const avatarUrl =
    user?.avatarUrl ||
    'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80';
  const stats = me.stats || { posts: 264, followers: 14900, following: 378 };

  return (
    <LinearGradient
      colors={gradients.background.colors}
      start={gradients.background.start}
      end={gradients.background.end}
      style={styles.container}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 140 }}>
          {/* Top bar */}
          <View style={styles.topBar}>
            <GlassIconButton icon="chevron-back" size={42} onPress={() => navigation.goBack()} />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <GlassIconButton icon="settings-outline" size={42} onPress={() => navigation.navigate('Settings')} />
              <GlassIconButton icon="ellipsis-horizontal" size={42} />
            </View>
          </View>

          {/* Profile glass card */}
          <GlassCard style={styles.profileCard} padding={spacing.lg} elevated>
            <View style={styles.profileRow}>
              <LinearGradient
                colors={['#ffffff', '#bdbdbd']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatarRing}
              >
                <View style={styles.avatarRingInner}>
                  <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                </View>
              </LinearGradient>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={styles.name}>{displayName}</Text>
                <Text style={styles.username}>@{username}</Text>
                <View style={styles.actionRow}>
                  <GlassChip label="Following" active />
                  <GlassChip label="Message" icon="chatbubble-outline" />
                </View>
              </View>
            </View>

            <View style={styles.statsRow}>
              <Stat label="Posts" value={formatNum(stats.posts)} />
              <View style={styles.statDivider} />
              <Stat label="Followers" value={formatNum(stats.followers)} />
              <View style={styles.statDivider} />
              <Stat label="Following" value={formatNum(stats.following)} />
            </View>
          </GlassCard>

          {/* Tabs */}
          <View style={styles.tabsRow}>
            <TabButton label="Photos" active={tab === 'photos'} onPress={() => setTab('photos')} />
            <TabButton label="Video" active={tab === 'video'} onPress={() => setTab('video')} />
            <TabButton label="Tagged" active={tab === 'tagged'} onPress={() => setTab('tagged')} />
          </View>

          {/* Grid */}
          <FlatList
            data={PHOTO_ITEMS}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            numColumns={3}
            contentContainerStyle={styles.grid}
            columnWrapperStyle={{ gap: GRID_GAP }}
            ItemSeparatorComponent={() => <View style={{ height: GRID_GAP }} />}
            renderItem={({ item }) => (
              <TouchableOpacity activeOpacity={0.85} style={styles.gridItem}>
                <Image source={{ uri: item.poster }} style={styles.gridImage} />
                {item.views ? (
                  <View style={styles.viewPill}>
                    <Text style={styles.viewText}>{item.views}</Text>
                  </View>
                ) : null}
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function TabButton({ label, active, onPress }: { label: string; active: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={styles.tabBtn}>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{label}</Text>
      {active ? <View style={styles.tabUnderline} /> : <View style={{ height: 3 }} />}
    </TouchableOpacity>
  );
}

function formatNum(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n >= 10000 ? 1 : 1)}k`.replace('.0k', 'k');
  return String(n);
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
  profileCard: {
    marginHorizontal: spacing.md,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarRing: {
    width: 84,
    height: 84,
    borderRadius: 42,
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarRingInner: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    padding: 2,
    backgroundColor: '#000',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 38,
  },
  name: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  username: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: spacing.sm,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: glassTokens.border,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  statLabel: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 28,
    backgroundColor: glassTokens.border,
  },
  tabsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.xl,
    marginBottom: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  tabBtn: {
    alignItems: 'center',
    paddingVertical: 8,
  },
  tabLabel: {
    ...typography.h3,
    color: colors.textMuted,
    fontWeight: '700',
    marginBottom: 6,
  },
  tabLabelActive: {
    color: colors.textPrimary,
  },
  tabUnderline: {
    width: 32,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#ffffff',
  },
  grid: {
    paddingHorizontal: spacing.md,
  },
  gridItem: {
    width: GRID_COL,
    height: GRID_COL * 1.4,
    borderRadius: glassTokens.radiusSm,
    overflow: 'hidden',
    backgroundColor: glassTokens.bgSubtle,
  },
  gridImage: {
    width: '100%',
    height: '100%',
  },
  viewPill: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 1,
    borderColor: glassTokens.border,
  },
  viewText: {
    ...typography.tiny,
    color: colors.textPrimary,
    fontWeight: '700',
  },
});
