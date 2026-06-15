import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import Header from '../../components/Header';
import { GlassIconButton, glassTokens } from '../../components/Glass';
import { colors, typography, spacing } from '../../theme';

interface Message {
  id: string;
  sender: 'me' | 'them';
  body: string;
}

export default function ChatScreen() {
  const route = useRoute();
  const { participantName } = route.params as any;
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'them', body: 'Hey, love your moves!' },
    { id: '2', sender: 'me', body: 'Thanks! That duel was intense' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = useCallback(() => {
    if (!input.trim()) return;
    const msg: Message = { id: Date.now().toString(), sender: 'me', body: input.trim() };
    setMessages((prev) => [...prev, msg]);
    setInput('');
  }, [input]);

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Header title={participantName} showBack showSearch={false} showNotifications={false} />
      <FlatList
        data={messages}
        keyExtractor={(item: Message) => item.id}
        renderItem={({ item }: { item: Message }) => (
          <View style={[styles.bubble, item.sender === 'me' ? styles.bubbleMe : styles.bubbleThem]}>
            <Text style={item.sender === 'me' ? styles.bubbleTextMe : styles.bubbleTextThem}>{item.body}</Text>
          </View>
        )}
        contentContainerStyle={styles.messages}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.inputRow}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          placeholderTextColor={colors.textMuted}
          style={styles.input}
          onSubmitEditing={sendMessage}
        />
        <GlassIconButton icon="send" onPress={sendMessage} size={44} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  messages: {
    padding: spacing.md,
    gap: spacing.sm,
  },
  bubble: {
    maxWidth: '75%',
    padding: spacing.sm,
    borderRadius: 16,
  },
  bubbleMe: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(212,184,150,0.2)',
    borderColor: 'rgba(212,184,150,0.3)',
    borderWidth: 1,
  },
  bubbleThem: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderColor: colors.border,
    borderWidth: 1,
  },
  bubbleTextMe: {
    ...typography.body,
    color: colors.textPrimary,
  },
  bubbleTextThem: {
    ...typography.body,
    color: colors.textSecondary,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 24,
    paddingHorizontal: spacing.md,
    paddingVertical: 12,
    color: colors.textPrimary,
    ...typography.body,
  },
  sendBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: glassTokens.bgStrong,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
