import React from 'react';
import { View } from 'react-native';
import { HorizontalLayoutProps } from '@/src/types';

const HorizontalLayout: React.FC<HorizontalLayoutProps> = ({
  children,
  alignItems = 'center',
  justifyContent = 'flex-start',
  gap = 8,
  style,
}) => {
  return (
    <View
      style={[{ flexDirection: 'row', alignItems, justifyContent, gap }, style]}
    >
      {children}
    </View>
  );
};

export { HorizontalLayout };
