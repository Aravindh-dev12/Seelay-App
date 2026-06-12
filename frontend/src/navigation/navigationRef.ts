import { createNavigationContainerRef } from '@react-navigation/native';
import type { RootStackParamList } from './RootNavigator';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigateTo(name: string) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name as never);
  }
}
