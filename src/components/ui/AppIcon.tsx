import React, { useMemo } from 'react';
import { W } from '@/src/constants';
import { AppIconProps } from '@/src/types';

const AppIcon: React.FC<AppIconProps> = ({ icon, color, height, width }) => {
  const Icon = useMemo(() => icon, [icon]);
  const iconWidth = useMemo(() => (width ? W(width) : undefined), [width]);
  const iconHeight = useMemo(() => (height ? W(height) : undefined), [height]);

  return <Icon color={color} width={iconWidth} height={iconHeight} />;
};

export { AppIcon };
