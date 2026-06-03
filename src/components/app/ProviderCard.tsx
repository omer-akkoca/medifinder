import React, { useMemo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Provider } from '@/src/types';
import { W, width } from '@/src/constants';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@/src/navigation/types';
import { getCategoryLabel, getCityLabel, getCountryLabel } from '@/src/utils';
import { HorizontalLayout } from '../layouts';
import { AppAvatar, AppBadge, AppText } from '../ui';

interface ProviderCardProps {
  item: Provider;
}

const ProviderCard: React.FC<ProviderCardProps> = ({ item }) => {
  const { navigate } = useNavigation<AppNavigationProp>();

  const category = useMemo(() => getCategoryLabel(item.category), [item]);
  const country = useMemo(() => getCountryLabel(item.country), [item]);
  const city = useMemo(() => getCityLabel(item.country, item.city), [item]);

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigate('ProviderDetails', { providerId: item.id })}
    >
      <HorizontalLayout justifyContent="space-between">
        <AppAvatar url={item.image} size={45} />
        <View style={{ gap: 4, alignItems: 'center' }}>
          <View style={styles.ratingBox}>
            <AppText size={12} lineHeight={14} weight="600">
              {item.rating}
            </AppText>
          </View>
          <AppText size={10} lineHeight={14} weight="400">
            Rating
          </AppText>
        </View>
      </HorizontalLayout>
      <AppText size={16} lineHeight={24} numberOfLines={1} weight={'600'}>
        {item.name}
      </AppText>
      <AppBadge
        label={category}
        backgroundColor="#c3ddff"
        labelColor="#0367eb"
      />
      <AppBadge
        label={`${country}, ${city}`}
        backgroundColor="#f0f0f0"
        labelColor="#555"
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (width - 48) / 2,
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#00000080',
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    rowGap: 12,
  },
  ratingBox: {
    width: W(30),
    height: W(30),
    borderRadius: 99,
    backgroundColor: '#f3eea3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { ProviderCard };
