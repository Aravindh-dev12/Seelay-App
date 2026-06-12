import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography } from '../theme';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotifications?: boolean;
  tokens?: number;
}

export default function Header({ title, showBack, showSearch = true, showNotifications = true, tokens = 1200 }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        {showBack ? (
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <Ionicons name="chevron-back" size={28} color={colors.textPrimary} />
          </TouchableOpacity>
        ) : (
          <View>
            <Text style={styles.tagline}>Where your body is the interface</Text>
            <Image source={require('../../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
          </View>
        )}
        {title && <Text style={styles.title}>{title}</Text>}
      </View>

      <View style={styles.right}>
        {showSearch && (
          <TouchableOpacity onPress={() => navigation.navigate('Search')} style={styles.iconButton}>
            <Ionicons name="search" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
        {showNotifications && (
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color={colors.textPrimary} />
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={() => navigation.navigate('Profile')} style={styles.tokenPill}>
          <LinearGradient
            colors={colors.sand}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.tokenGradient}
          >
            <Ionicons name="flash" size={14} color="#0a0a0a" />
            <Text style={styles.tokenText}>{tokens}</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  tagline: {
    ...typography.tiny,
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  logoImage: {
    width: 100,
    height: 32,
    marginTop: 4,
  },
  title: {
    ...typography.h3,
    color: colors.textPrimary,
    marginLeft: 8,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenPill: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  tokenGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 4,
    borderRadius: 20,
  },
  tokenText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0a0a0a',
  },
});
