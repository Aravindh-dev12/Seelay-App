import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import GradientButton from '../../components/GradientButton';
import { colors, typography, spacing } from '../../theme';

const ITEMS = [
  { id: 'sku_1', title: 'Alter Ego Unlock', price: '₹49', icon: 'sparkles' },
  { id: 'sku_2', title: '5 Motion Match Credits', price: '₹99', icon: 'heart' },
  { id: 'sku_3', title: 'Life Book Export', price: '₹29', icon: 'book' },
  { id: 'sku_4', title: 'Clip Boost', price: '300 tokens', icon: 'flash' },
];

export default function StoreScreen() {
  return (
    <ScreenContainer>
      <Header title="Store" showBack showSearch={false} showNotifications={false} />
      <Text style={styles.subtitle}>Buy premium features with real money or Energy Tokens</Text>
      <FlatList
        data={ITEMS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.itemIcon}>
              <Ionicons name={item.icon as any} size={24} color={colors.sand[0]} />
            </View>
            <View style={styles.itemContent}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
            </View>
            <GradientButton title="Buy" onPress={() => {}} size="sm" />
          </View>
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  list: {
    gap: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    padding: spacing.md,
    gap: spacing.md,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(212,184,150,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  itemPrice: {
    ...typography.caption,
    color: colors.sand[0],
    marginTop: 2,
  },
});
