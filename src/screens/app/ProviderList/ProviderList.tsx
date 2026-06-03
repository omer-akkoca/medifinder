import React, { useCallback } from 'react';
import { FlatList, View, ListRenderItemInfo } from 'react-native';
import {
  AppBar,
  AppButton,
  AppError,
  AppIconButton,
  AppInput,
  AppLoading,
  AppText,
  HorizontalLayout,
  ProviderCard,
} from '@/src/components';
import { useGetProviders } from '@/src/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Provider } from '@/src/types';
import { useForm } from 'react-hook-form';
import { SearchProviderFormData, searchProviderSchema } from '../@validations';
import { zodResolver } from '@hookform/resolvers/zod';
import { ChartLineIcon, FilterIcon, SearchIcon } from '@/assets/vectors';
import { useDebounce } from '@/src/hooks';
import { useNavigation } from '@react-navigation/native';
import { AppNavigationProp } from '@/src/navigation/types';

const ProviderList = () => {
  const { bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation<AppNavigationProp>();

  const { control, watch } = useForm<SearchProviderFormData>({
    resolver: zodResolver(searchProviderSchema),
    defaultValues: { query: '' },
  });

  const query = watch('query');

  const debouncedQuery = useDebounce(query, 500);

  const {
    data: providers,
    isLoading,
    refetch,
    isRefetching,
    isError,
    error,
  } = useGetProviders(debouncedQuery);

  const renderItem = useCallback(
    ({ item }: ListRenderItemInfo<Provider>) => <ProviderCard item={item} />,
    [],
  );

  const ListHeaderComponent = useCallback(
    () => (
      <AppInput
        control={control}
        name="query"
        placeholder="Search for any provider..."
        prefix={ChartLineIcon}
        suffix={SearchIcon}
      />
    ),
    [control],
  );

  const ListEmptyComponent = useCallback(() => {
    if (isLoading) return <AppLoading />;
    else
      return <AppText textAlign="center">Could not find any content.</AppText>;
  }, [isLoading]);

  return (
    <View style={{ flex: 1 }}>
      <AppBar
        title="Medifinder"
        actions={[
          <AppIconButton
            icon={{ icon: FilterIcon, height: 20, width: 20 }}
            onPress={() => navigate('ProviderFilter')}
          />,
        ]}
      />
      <View style={{ flex: 1 }}>
        <AppError error={error} isError={isError} refetch={refetch}>
          <FlatList
            data={providers}
            numColumns={2}
            renderItem={renderItem}
            contentContainerStyle={{
              padding: 16,
              paddingBottom: bottom + 16,
              gap: 16,
            }}
            columnWrapperStyle={{ gap: 16 }}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={ListHeaderComponent}
            ListEmptyComponent={ListEmptyComponent}
            onRefresh={refetch}
            refreshing={isRefetching}
          />
        </AppError>
      </View>
    </View>
  );
};

export { ProviderList };
