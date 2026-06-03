import React from 'react';
import { AppIconButtonProps } from '@/src/types';
import { Pressable } from 'react-native';
import { AppIcon } from '../ui';

const AppIconButton: React.FC<AppIconButtonProps> = ({
  icon,
  disabled = false,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={{ bottom: 4, left: 4, right: 4, top: 4 }}
    >
      <AppIcon {...icon} />
    </Pressable>
  );
};

export { AppIconButton };
