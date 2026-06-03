import React, { useCallback, useEffect, useMemo } from 'react';
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { useGetFilterProviders } from '@/src/actions';
import {
  AppBar,
  AppBottomSheetSelect,
  AppError,
  AppLoading,
  AppText,
  HorizontalLayout,
  ProviderCard,
} from '@/src/components';
import { Provider } from '@/src/types';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useForm } from 'react-hook-form';
import { FilterProviderFormData, filterProviderSchema } from '../@validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { categories, countries } from '@/src/constants';
import { getCitiesByCountry } from '@/src/utils';

const ProviderFilter = () => {
  const { bottom } = useSafeAreaInsets();

  const { control, watch, setValue } = useForm<FilterProviderFormData>({
    resolver: zodResolver(filterProviderSchema),
    defaultValues: { category: '', city: '', country: '' },
  });

  const country = watch('country');
  const city = watch('city');
  const category = watch('category');

  const { data, isLoading, isError, error, refetch, isRefetching } =
    useGetFilterProviders({
      category,
      city,
      country,
    });

  const cities = useMemo(
    () => (country ? getCitiesByCountry(country) : []),
    [country],
  );

  useEffect(() => {
    if (country) {
      setValue('city', '');
    }
  }, [country, setValue]);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Provider>) => <ProviderCard item={item} />,
    [],
  );

  const ListHeaderComponent = useCallback(
    () => (
      <HorizontalLayout gap={16}>
        <AppBottomSheetSelect
          control={control}
          name="country"
          placeholder="Country"
          options={countries}
        />
        <AppBottomSheetSelect
          control={control}
          name="city"
          placeholder="Cities"
          options={cities}
          disabled={cities.length === 0}
        />
        <AppBottomSheetSelect
          control={control}
          name="category"
          placeholder="Category"
          options={categories}
        />
      </HorizontalLayout>
    ),
    [control, cities],
  );

  const ListEmptyComponent = useCallback(() => {
    if (isLoading) return <AppLoading />;
    else
      return <AppText textAlign="center">Could not find any content.</AppText>;
  }, [isLoading]);

  return (
    <View style={{ flex: 1 }}>
      <AppBar backIcon title="Provider Filter" />
      <View style={{ flex: 1 }}>
        <AppError error={error} isError={isError} refetch={refetch}>
          <FlatList
            data={data}
            keyExtractor={e => e.id}
            renderItem={renderItem}
            numColumns={2}
            contentContainerStyle={{
              padding: 16,
              paddingBottom: bottom + 16,
              gap: 16,
            }}
            columnWrapperStyle={{ gap: 16 }}
            ListEmptyComponent={ListEmptyComponent}
            ListHeaderComponent={ListHeaderComponent}
            refreshing={isRefetching}
            onRefresh={refetch}
          />
        </AppError>
      </View>
    </View>
  );
};

export { ProviderFilter };
