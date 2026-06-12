import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './BottomTabNavigator';
import ChatScreen from '../screens/inbox/ChatScreen';
import DuelRoomScreen from '../screens/duels/DuelRoomScreen';
import SettingsScreen from '../screens/profile/SettingsScreen';
import StoreScreen from '../screens/profile/StoreScreen';
import LifeStampsScreen from '../screens/profile/LifeStampsScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import SearchScreen from '../screens/search/SearchScreen';
import MotionMatchScreen from '../screens/motionmatch/MotionMatchScreen';
import IdentityHubScreen from '../screens/identity/IdentityHubScreen';
import VibeDNADetailScreen from '../screens/identity/VibeDNADetailScreen';
import SoundAlchemyScreen from '../screens/identity/SoundAlchemyScreen';
import AlterEgoScreen from '../screens/identity/AlterEgoScreen';
import EnergyTokensScreen from '../screens/identity/EnergyTokensScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import { useAuth } from '../auth/AuthContext';

export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  MainTabs: undefined;
  Chat: { chatId: string; participantName: string };
  DuelRoom: { duelId: string };
  Settings: undefined;
  Store: undefined;
  LifeStamps: undefined;
  Notifications: undefined;
  Search: undefined;
  MotionMatch: undefined;
  Identity: undefined;
  VibeDNA: undefined;
  SoundAlchemy: undefined;
  AlterEgo: undefined;
  EnergyTokens: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isSignedIn } = useAuth();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#000000' },
      }}
    >
      {!isSignedIn ? (
        <>
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="DuelRoom" component={DuelRoomScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          <Stack.Screen name="Store" component={StoreScreen} />
          <Stack.Screen name="LifeStamps" component={LifeStampsScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="MotionMatch" component={MotionMatchScreen} />
          <Stack.Screen name="Identity" component={IdentityHubScreen} />
          <Stack.Screen name="VibeDNA" component={VibeDNADetailScreen} />
          <Stack.Screen name="SoundAlchemy" component={SoundAlchemyScreen} />
          <Stack.Screen name="AlterEgo" component={AlterEgoScreen} />
          <Stack.Screen name="EnergyTokens" component={EnergyTokensScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}
