import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import { colors, typography, spacing } from '../../theme';

interface ChatSummary {
  id: string;
  participant: { displayName: string; username: string };
  lastMessage: string;
  unreadCount: number;
}

export default function InboxScreen() {
  const [chats, setChats] = useState<ChatSummary[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const mock: ChatSummary[] = [
      { id: 'chat_1', participant: { displayName: 'Zara Alchemy', username: 'zara.alchemy' }, lastMessage: 'That duel was fire!', unreadCount: 2 },
      { id: 'chat_2', participant: { displayName: 'Ravi Swarm', username: 'ravi.swarm' }, lastMessage: 'Check out my new clip', unreadCount: 0 },
    ];
    setChats(mock);
  }, []);

  return (
    <ScreenContainer>
      <Header title="Inbox" showSearch={false} showNotifications={false} />
      <FlatList
        data={chats}
        keyExtractor={(item: ChatSummary) => item.id}
        renderItem={({ item }: { item: ChatSummary }) => (
          <TouchableOpacity
            style={styles.chatRow}
            onPress={() => navigation.navigate('Chat', { chatId: item.id, participantName: item.participant.displayName })}
          >
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={colors.textSecondary} />
            </View>
            <View style={styles.chatContent}>
              <Text style={styles.chatName}>{item.participant.displayName}</Text>
              <Text style={styles.chatPreview}>{item.lastMessage}</Text>
            </View>
            {item.unreadCount > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.unreadCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: 8,
  },
  chatRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
    gap: spacing.md,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.05)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  chatContent: {
    flex: 1,
  },
  chatName: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  chatPreview: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 2,
  },
  badge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.copper[0],
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    ...typography.small,
    color: '#fff',
    fontWeight: '800',
  },
});
