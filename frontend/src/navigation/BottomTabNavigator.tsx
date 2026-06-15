import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import * as Haptics from 'expo-haptics';

import FeedScreen from '../screens/feed/FeedScreen';
import DuelsScreen from '../screens/duels/DuelsScreen';
import WorldDropScreen from '../screens/worlddrop/WorldDropScreen';
import SocialHubScreen from '../screens/social/SocialHubScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { colors, typography } from '../theme';

export type BottomTabParamList = {
  Home: undefined;
  Duels: undefined;
  Drop: undefined;
  Connect: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator();

const tabIcons: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap; label: string }> = {
  Home: { active: 'home', inactive: 'home-outline', label: 'Home' },
  Duels: { active: 'flash', inactive: 'flash-outline', label: 'Duels' },
  Drop: { active: 'globe', inactive: 'globe-outline', label: 'Drop' },
  Connect: { active: 'people', inactive: 'people-outline', label: 'Connect' },
  Account: { active: 'person', inactive: 'person-outline', label: 'You' },
};

function FloatingTabBar({ state, navigation }: any) {
  return (
    <View pointerEvents="box-none" style={styles.tabBarWrapper}>
      <View style={styles.tabBarBlur}>
        <View style={styles.tabBarInner}>
          {state.routes.map((route: any, index: number) => {
            const focused = state.index === index;
            const meta = tabIcons[route.name];
            if (!meta) return null;

            const onPress = () => {
              const event = navigation.emit({ type: 'tabPress', target: route.key, canPreventDefault: true });
              Haptics.selectionAsync().catch(() => {});
              if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
            };

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={focused ? { selected: true } : {}}
                onPress={onPress}
                activeOpacity={0.85}
                style={[styles.tabItem, focused && styles.tabItemActive]}
              >
                <Ionicons
                  name={focused ? meta.active : meta.inactive}
                  size={focused ? 22 : 24}
                  color={focused ? '#0a0a0a' : colors.textPrimary}
                />
                {focused && <Text style={styles.tabLabelActive}>{meta.label}</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props: any) => <FloatingTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Home" component={FeedScreen} />
      <Tab.Screen name="Duels" component={DuelsScreen} />
      <Tab.Screen name="Drop" component={WorldDropScreen} />
      <Tab.Screen name="Connect" component={SocialHubScreen} />
      <Tab.Screen name="Account" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 18,
    alignItems: 'center',
  },
  tabBarBlur: {
    borderRadius: 36,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.12)',
    backgroundColor: 'rgba(20,20,20,0.55)',
  },
  tabBarInner: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 4,
  },
  tabItem: {
    height: 48,
    minWidth: 48,
    paddingHorizontal: 14,
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  tabItemActive: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 18,
  },
  tabLabelActive: {
    ...typography.small,
    color: '#0a0a0a',
    fontWeight: '700',
  },
});
