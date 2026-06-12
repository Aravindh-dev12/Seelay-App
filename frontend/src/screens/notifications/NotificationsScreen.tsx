import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import { colors, typography, spacing } from '../../theme';

const NOTIFICATIONS = [
  { id: '1', type: 'like', text: 'Zara Alchemy liked your clip', time: '2m ago' },
  { id: '2', type: 'duel', text: 'Campus Duel is live now', time: '15m ago' },
  { id: '3', type: 'follow', text: 'Ravi Swarm started following you', time: '1h ago' },
  { id: '4', type: 'worlddrop', text: 'World Drop starts in 30 minutes', time: '3h ago' },
];

export default function NotificationsScreen() {
  return (
    <ScreenContainer>
      <Header title="Notifications" showBack showSearch={false} showNotifications={false} />
      <FlatList
        data={NOTIFICATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Ionicons
                name={
                  item.type === 'like' ? 'heart' :
                  item.type === 'duel' ? 'flash' :
                  item.type === 'follow' ? 'person-add' : 'globe'
                }
                size={20}
                color={colors.sand[0]}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.text}>{item.text}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </View>
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: spacing.md,
    gap: spacing.md,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(212,184,150,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  text: {
    ...typography.body,
    color: colors.textPrimary,
  },
  time: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
  },
});
