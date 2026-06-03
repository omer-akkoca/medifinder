import { AppErrorProps } from '@/src/types';
import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { AppButton, AppText } from '../ui';

const AppError: React.FC<AppErrorProps> = ({
  error,
  isError,
  refetch,
  children,
}) => {
  const message = useMemo(() => {
    const errorMessage =
      error instanceof Error ? error.message : 'Something went wrong';
    return errorMessage;
  }, [error]);

  if (isError) {
    return (
      <View style={styles.container}>
        <View>
          <AppText size={15} weight={600} textAlign="center" color="#000">
            Error
          </AppText>
          <AppText size={13} textAlign="center" color="#00000080">
            {message}
          </AppText>
        </View>
        <View style={{ width: '100%' }}>
          <AppButton label="Try Again" onPress={refetch} />
        </View>
      </View>
    );
  }

  return children;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
});

export { AppError };
