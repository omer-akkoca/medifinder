import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

type ProviderConfig = {
  component: React.ComponentType<any>;
  props: Record<string, any>;
};

const queryClient = new QueryClient();

const providersConfig: ProviderConfig[] = [
  { component: SafeAreaProvider, props: {} },
  { component: GestureHandlerRootView, props: {} },
  { component: QueryClientProvider, props: { client: queryClient } },
  { component: NavigationContainer, props: {} },
  { component: BottomSheetModalProvider, props: {} },
];

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return providersConfig.reduceRight((acc, { component: Component, props }) => {
    return <Component {...props}>{acc}</Component>;
  }, children);
};

export { Providers };
