import React from 'react';
import { View } from 'react-native';
import { AppText } from './AppText';
import { AppBadgeProps } from '@/src/types';

const AppBadge: React.FC<AppBadgeProps> = ({
  backgroundColor,
  label,
  labelColor,
}) => {
  return (
    <View
      style={{
        backgroundColor,
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: 99,
        alignSelf: 'flex-start',
      }}
    >
      <AppText
        size={10}
        lineHeight={14}
        color={labelColor}
        weight="500"
        numberOfLines={1}
      >
        {label}
      </AppText>
    </View>
  );
};

export { AppBadge };
