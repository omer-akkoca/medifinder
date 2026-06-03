import React, { useMemo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { AppText } from '../ui';
import { AppButtonProps } from '@/src/types';
import { appButtonHeight } from '@/src/constants';

const AppButton: React.FC<AppButtonProps> = ({
  label,
  onPress,
  disabled = false,
  variant = 'primary',
  flex = false,
}) => {
  const bgColor = useMemo(() => {
    switch (variant) {
      case 'primary':
        return '#2563ea';
      case 'secondary':
        return '#f2f2f2';
      default:
        return 'transparent';
    }
  }, [variant]);
  const textColor = useMemo(() => {
    switch (variant) {
      case 'primary':
        return '#fff';
      case 'secondary':
        return '#000';
      default:
        return 'transparent';
    }
  }, [variant]);
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: bgColor,
          opacity: disabled ? 0.75 : 1,
          flex: flex ? 1 : undefined,
        },
      ]}
      disabled={disabled}
    >
      <AppText size={12} weight={'500'} textAlign="center" color={textColor}>
        {label}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    height: appButtonHeight,
    borderRadius: 99,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export { AppButton };
