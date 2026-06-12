import React from 'react';
import { View, StyleSheet, ScrollView, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { gradients } from '../theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export default function ScreenContainer({ children, scroll = true, style, contentStyle }: ScreenContainerProps) {
  const Wrapper = scroll ? ScrollView : View;
  
  return (
    <LinearGradient
      colors={gradients.background.colors}
      start={gradients.background.start}
      end={gradients.background.end}
      style={[styles.container, style]}
    >
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <Wrapper style={[styles.content, contentStyle]} showsVerticalScrollIndicator={false}>
          {children}
        </Wrapper>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 100,
  },
});
