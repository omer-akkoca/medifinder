import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const W = (size: number) => (width * size) / 375;
export const H = (size: number) => (height * size) / 812;

export const appBarHeight = 48;
export const appInputHeight = 44;
export const appButtonHeight = 36;

export { width, height };
