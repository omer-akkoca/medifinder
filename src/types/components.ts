import React, { PropsWithChildren } from 'react';
import { Control, FieldValues, Path } from 'react-hook-form';
import {
  FlexAlignType,
  FlexStyle,
  TextInputProps,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { SvgProps } from 'react-native-svg';
import { SheetSelectOption } from './common';

export interface AppTextProps extends PropsWithChildren {
  size?: number;
  lineHeight?: number;
  numberOfLines?: number;
  color?: string;
  weight?: TextStyle['fontWeight'];
  textAlign?: TextStyle['textAlign'];
  letterSpacing?: number;
}

export interface HorizontalLayoutProps extends PropsWithChildren {
  alignItems?: FlexAlignType;
  justifyContent?: FlexStyle['justifyContent'];
  gap?: number;
  style?: ViewStyle;
}

export interface AppLoadingProps {
  fullScreen?: boolean;
}

export interface AppAvatarProps {
  url?: string;
  size?: number;
}

export interface AppBadgeProps {
  label: string;
  labelColor?: string;
  backgroundColor?: string;
}

export interface AppIconProps {
  icon: React.FC<SvgProps>;
  color?: string;
  width?: number;
  height?: number;
}

export interface AppInputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  prefix?: React.FC<SvgProps>;
  onPrefix?: () => void;
  suffix?: React.FC<SvgProps>;
  onSuffix?: () => void;
  flex?: boolean;
  iconSize?: number;
  placeholder?: string;
}

export interface AppBarProps {
  title?: string;
  backIcon?: boolean;
  actions?: React.ReactNode[];
}

export interface AppIconButtonProps {
  icon: AppIconProps;
  onPress: () => void;
  disabled?: boolean;
}

export interface AppBottomSheetSelectProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder?: string;
  options: SheetSelectOption[];
  multiple?: boolean;
  disabled?: boolean;
}

export interface AppButtonProps {
  label: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'secondary';
  flex?: boolean;
}

export interface AppErrorProps extends PropsWithChildren {
  isError: boolean;
  error: any;
  refetch: () => void;
}
