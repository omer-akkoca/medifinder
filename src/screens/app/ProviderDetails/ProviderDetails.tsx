import React, { useMemo } from 'react';
import { RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import {
  AppAvatar,
  AppBadge,
  AppBar,
  AppButton,
  AppError,
  AppIcon,
  AppLoading,
  AppText,
  HorizontalLayout,
} from '@/src/components';
import { AppScreenList } from '@/src/navigation/types';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useGetProviderDetail } from '@/src/actions';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  AddressIcon,
  EmailIcon,
  NotVerifiedIcon,
  PhoneIcon,
  StarIcon,
  VerifiedIcon,
} from '@/assets/vectors';
import { getCategoryLabel, getCityLabel, getCountryLabel } from '@/src/utils';

const ProviderDetails = () => {
  const { params } = useRoute<RouteProp<AppScreenList, 'ProviderDetails'>>();
  const { providerId } = params;

  const { bottom } = useSafeAreaInsets();

  const { data, isLoading, refetch, isError, error } =
    useGetProviderDetail(providerId);

  const category = useMemo(
    () => (data ? getCategoryLabel(data.category) : ''),
    [data],
  );
  const country = useMemo(
    () => (data ? getCountryLabel(data.country) : ''),
    [data],
  );
  const city = useMemo(
    () => (data ? getCityLabel(data.country, data.city) : ''),
    [data],
  );

  if (isLoading) return <AppLoading fullScreen />;

  if (!data) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <AppText size={16} weight="400">
          Provider bulunamadı. Lütfen daha sonra tekrar deneyin.
        </AppText>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <AppBar backIcon title="Provider Details" />
      <View style={{ flex: 1 }}>
        <AppError error={error} isError={isError} refetch={refetch}>
          <ScrollView
            contentContainerStyle={{
              padding: 16,
              paddingBottom: bottom + 16,
              gap: 16,
            }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={isLoading} onRefresh={refetch} />
            }
          >
            <HorizontalLayout gap={16}>
              <AppAvatar url={data?.image} size={75} />
              <View style={{ flex: 1, gap: 4 }}>
                <AppText size={18} weight="500">
                  {data?.name}
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
              </View>
            </HorizontalLayout>
            <HorizontalLayout>
              <View style={styles.infoBox}>
                <AppIcon
                  icon={StarIcon}
                  color="#ffae00"
                  width={12}
                  height={12}
                />
                <AppText size={12} weight={500}>
                  {data.rating}
                </AppText>
              </View>
              <View
                style={{
                  height: '100%',
                  width: 1,
                  backgroundColor: '#55555557',
                }}
              />
              <View style={styles.infoBox}>
                <AppIcon
                  icon={data.verified ? VerifiedIcon : NotVerifiedIcon}
                  width={16}
                  height={16}
                  color={data.verified ? '#028002' : '#ff0000'}
                />
                <AppText size={12} weight={500}>
                  {data.verified ? 'Doğrulanmış' : 'Doğrulanmamış Hesap'}
                </AppText>
              </View>
            </HorizontalLayout>
            <View style={{ gap: 8 }}>
              <HorizontalLayout gap={8}>
                <AppIcon icon={EmailIcon} width={12} height={12} />
                <AppText>{data.email}</AppText>
              </HorizontalLayout>
              <HorizontalLayout gap={8}>
                <AppIcon icon={PhoneIcon} width={12} height={12} />
                <AppText>{data.phone}</AppText>
              </HorizontalLayout>
              <HorizontalLayout gap={8}>
                <AppIcon icon={AddressIcon} width={12} height={12} />
                <AppText>{data.address}</AppText>
              </HorizontalLayout>
            </View>
            <HorizontalLayout gap={16}>
              <AppButton
                label="Message"
                onPress={() => null}
                variant="secondary"
                flex
              />
              <AppButton label="Follow" onPress={() => null} flex />
            </HorizontalLayout>
            <View style={{ gap: 8 }}>
              <AppText color="#00000099">Bio/Description</AppText>
              <AppText>{data.bio}</AppText>
            </View>
          </ScrollView>
        </AppError>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  infoBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 24,
    gap: 4,
  },
});

export { ProviderDetails };
