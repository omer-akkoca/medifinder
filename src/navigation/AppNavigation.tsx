import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppScreenList } from './types';
import { ProviderList, ProviderDetails, ProviderFilter } from '@/src/screens';

const Stack = createNativeStackNavigator<AppScreenList>();

export const AppNavigation = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProviderList"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name={'ProviderList'} component={ProviderList} />
      <Stack.Screen name={'ProviderDetails'} component={ProviderDetails} />
      <Stack.Screen name={'ProviderFilter'} component={ProviderFilter} />
    </Stack.Navigator>
  );
};
