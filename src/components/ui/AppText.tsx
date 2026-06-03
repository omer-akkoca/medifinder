import React from 'react';
import { Text } from 'react-native';
import { AppTextProps } from '@/src/types';

const AppText: React.FC<AppTextProps> = ({
  size = 14,
  lineHeight,
  numberOfLines,
  color,
  weight,
  textAlign,
  letterSpacing,
  children,
}) => {
  return (
    <Text
      style={{
        fontSize: size,
        lineHeight,
        color,
        fontWeight: weight,
        textAlign,
        letterSpacing,
      }}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export { AppText };
