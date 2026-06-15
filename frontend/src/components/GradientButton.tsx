import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { colors, typography } from '../theme';

type Variant = 'primary' | 'secondary' | 'danger' | 'success';

const variantGlass: Record<Variant, { bg: string; border: string }> = {
  primary: { bg: 'rgba(255,255,255,0.10)', border: 'rgba(255,255,255,0.25)' },
  secondary: { bg: 'rgba(255,255,255,0.05)', border: 'rgba(255,255,255,0.12)' },
  danger: { bg: 'rgba(255,80,80,0.12)', border: 'rgba(255,100,100,0.30)' },
  success: { bg: 'rgba(80,255,120,0.10)', border: 'rgba(100,255,140,0.25)' },
};

interface GlassButtonProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function GradientButton({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  style,
  textStyle,
}: GlassButtonProps) {
  const sizeStyles = {
    sm: { paddingVertical: 8, paddingHorizontal: 16 },
    md: { paddingVertical: 14, paddingHorizontal: 24 },
    lg: { paddingVertical: 18, paddingHorizontal: 32 },
  };

  const glass = variantGlass[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        sizeStyles[size],
        {
          backgroundColor: glass.bg,
          borderColor: glass.border,
        },
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
    borderWidth: 1,
  },
  text: {
    ...typography.body,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  disabled: {
    opacity: 0.4,
  },
});
