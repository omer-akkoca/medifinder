import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type AppScreenList = {
  /** Provider List */
  ProviderList: undefined;
  /** Provider Details */
  ProviderDetails: { providerId: string };
  /** Provider Filter */
  ProviderFilter: undefined;
};

export type AppNavigationProp = NativeStackNavigationProp<AppScreenList>;
