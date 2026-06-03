import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { AppLoadingProps } from '@/src/types';

const AppLoading: React.FC<AppLoadingProps> = ({ fullScreen = false }) => {
  return (
    <View
      style={
        fullScreen
          ? { flex: 1, justifyContent: 'center', alignItems: 'center' }
          : undefined
      }
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

export { AppLoading };
