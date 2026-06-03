import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { W } from '@/src/constants';
import { AppAvatarProps } from '@/src/types';

const AppAvatar: React.FC<AppAvatarProps> = ({ size = 25, url }) => {
  return (
    <View style={[styles.avatarContainer, { width: W(size), height: W(size) }]}>
      <Image style={{ flex: 1 }} source={{ uri: url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    borderRadius: 999,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});

export { AppAvatar };
