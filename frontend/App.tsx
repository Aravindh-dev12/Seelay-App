import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';
import { navigationRef } from './src/navigation/navigationRef';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { AuthProvider } from './src/auth/AuthContext';
import { VisorProvider } from './src/visor/VisorContext';
import SeelayVisor from './src/visor/SeelayVisor';

export default function App() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider>
        <ThemeProvider>
          <AuthProvider>
            <VisorProvider>
              <NavigationContainer ref={navigationRef}>
                <RootNavigator />
                <SeelayVisor />
                <StatusBar style="light" />
              </NavigationContainer>
            </VisorProvider>
          </AuthProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
