import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import FeedScreen from '../screens/feed/FeedScreen';
import DuelsScreen from '../screens/duels/DuelsScreen';
import WorldDropScreen from '../screens/worlddrop/WorldDropScreen';
import SocialHubScreen from '../screens/social/SocialHubScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import { colors } from '../theme';

export type BottomTabParamList = {
  Home: undefined;
  Duels: undefined;
  Drop: undefined;
  Connect: undefined;
  Account: undefined;
};

const Tab = createBottomTabNavigator<BottomTabParamList>();

const tabIcons: Record<string, { active: keyof typeof Ionicons.glyphMap; inactive: keyof typeof Ionicons.glyphMap }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Duels: { active: 'flash', inactive: 'flash-outline' },
  Drop: { active: 'globe', inactive: 'globe-outline' },
  Connect: { active: 'people', inactive: 'people-outline' },
  Account: { active: 'person', inactive: 'person-outline' },
};

function TabIcon({ name, color, size, focused }: { name: string; color: string; size: number; focused: boolean }) {
  const icons = tabIcons[name];
  if (!icons) return null;
  
  if (focused) {
    return (
      <LinearGradient
        colors={colors.sand}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.activeIconBg}
      >
        <Ionicons name={icons.active} size={22} color="#0a0a0a" />
      </LinearGradient>
    );
  }
  
  return <Ionicons name={icons.inactive} size={size} color={color} />;
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: true,
        tabBarLabelStyle: styles.tabLabel,
        tabBarActiveTintColor: colors.textPrimary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ color, size, focused }) => (
          <TabIcon name={route.name} color={color} size={size} focused={focused} />
        ),
      })}
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
  tabBar: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    height: 80,
    paddingBottom: 8,
    paddingTop: 8,
    position: 'absolute',
    backdropFilter: 'blur(10px)',
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
  activeIconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
