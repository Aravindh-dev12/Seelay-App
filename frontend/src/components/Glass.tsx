import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing } from '../theme';

/**
 * Glass design system primitives — used across every Seelay screen
 * to deliver the consistent glassmorphism + rounded-card aesthetic
 * inspired by the reference screenshots.
 */

export const glassTokens = {
  bg: 'rgba(255,255,255,0.06)',
  bgStrong: 'rgba(255,255,255,0.10)',
  bgSubtle: 'rgba(255,255,255,0.03)',
  border: 'rgba(255,255,255,0.12)',
  borderStrong: 'rgba(255,255,255,0.22)',
  radius: 24,
  radiusSm: 16,
  radiusLg: 32,
  radiusPill: 999,
};

interface GlassCardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  padding?: number;
  elevated?: boolean;
}

export function GlassCard({ children, style, padding = spacing.md, elevated }: GlassCardProps) {
  return (
    <View
      style={[
        styles.card,
        elevated && styles.cardElevated,
        { padding },
        style,
      ]}
    >
      {children}
    </View>
  );
}

interface GlassChipProps {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
  active?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

export function GlassChip({ label, icon, active, onPress, style }: GlassChipProps) {
  const Wrapper: any = onPress ? TouchableOpacity : View;
  return (
    <Wrapper
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive, style]}
    >
      {icon ? (
        <Ionicons
          name={icon}
          size={14}
          color={active ? '#0a0a0a' : colors.textPrimary}
          style={{ marginRight: 6 }}
        />
      ) : null}
      <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
    </Wrapper>
  );
}

interface GlassIconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  size?: number;
  active?: boolean;
  badge?: number;
  style?: StyleProp<ViewStyle>;
}

export function GlassIconButton({ icon, onPress, size = 44, active, badge, style }: GlassIconButtonProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.iconBtn,
        { width: size, height: size, borderRadius: size / 2 },
        active && styles.iconBtnActive,
        style,
      ]}
    >
      <Ionicons name={icon} size={size * 0.45} color={active ? '#0a0a0a' : colors.textPrimary} />
      {badge != null && badge > 0 ? (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{badge > 99 ? '99+' : badge}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
}

interface GlassActionRailProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function GlassActionRail({ children, style }: GlassActionRailProps) {
  return <View style={[styles.actionRail, style]}>{children}</View>;
}

interface GlassActionItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  label?: string;
  count?: string | number;
  onPress?: () => void;
  active?: boolean;
}

export function GlassActionItem({ icon, label, count, onPress, active }: GlassActionItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.actionItem, active && styles.actionItemActive]}
    >
      <Ionicons name={icon} size={22} color={active ? '#0a0a0a' : colors.textPrimary} />
      {count != null ? (
        <Text style={[styles.actionCount, active && { color: '#0a0a0a' }]}>{count}</Text>
      ) : null}
      {label ? <Text style={[styles.actionLabel, active && { color: '#0a0a0a' }]}>{label}</Text> : null}
    </TouchableOpacity>
  );
}

interface SectionHeaderProps {
  title: string;
  action?: string;
  onAction?: () => void;
}

export function SectionHeader({ title, action, onAction }: SectionHeaderProps) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {action ? (
        <TouchableOpacity onPress={onAction} hitSlop={10}>
          <Text style={styles.sectionAction}>{action}</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: glassTokens.bg,
    borderRadius: glassTokens.radius,
    borderWidth: 1,
    borderColor: glassTokens.border,
  },
  cardElevated: {
    backgroundColor: glassTokens.bgStrong,
    borderColor: glassTokens.borderStrong,
    shadowColor: '#000',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: glassTokens.radiusPill,
    backgroundColor: glassTokens.bg,
    borderWidth: 1,
    borderColor: glassTokens.border,
    alignSelf: 'flex-start',
  },
  chipActive: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  chipText: {
    ...typography.small,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#0a0a0a',
  },
  iconBtn: {
    backgroundColor: glassTokens.bg,
    borderWidth: 1,
    borderColor: glassTokens.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBtnActive: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    paddingHorizontal: 4,
    borderRadius: 9,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0a0a0a',
  },
  actionRail: {
    position: 'absolute',
    right: spacing.md,
    bottom: spacing.lg,
    gap: spacing.sm,
    alignItems: 'center',
  },
  actionItem: {
    width: 52,
    paddingVertical: 10,
    borderRadius: 26,
    backgroundColor: glassTokens.bg,
    borderWidth: 1,
    borderColor: glassTokens.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionItemActive: {
    backgroundColor: '#ffffff',
    borderColor: '#ffffff',
  },
  actionCount: {
    ...typography.tiny,
    color: colors.textPrimary,
    fontWeight: '700',
    marginTop: 2,
  },
  actionLabel: {
    ...typography.tiny,
    color: colors.textPrimary,
    fontWeight: '600',
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.h3,
    color: colors.textPrimary,
  },
  sectionAction: {
    ...typography.small,
    color: colors.textSecondary,
    fontWeight: '700',
  },
});
