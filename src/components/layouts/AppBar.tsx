import React, { useCallback } from 'react';
import { HorizontalLayout } from '../layouts/HorizontalLayout';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet, View } from 'react-native';
import { appBarHeight } from '@/src/constants';
import { AppBarProps } from '@/src/types';
import { LeftArrowIcon } from '@/assets/vectors';
import { useNavigation } from '@react-navigation/native';
import { AppIconButton, AppText } from '../ui';

const AppBar: React.FC<AppBarProps> = ({
  title,
  actions = [],
  backIcon = false,
}) => {
  const { top } = useSafeAreaInsets();
  const { goBack } = useNavigation();

  const renderBackButton = useCallback(() => {
    if (!backIcon) return <></>;
    return (
      <AppIconButton
        onPress={goBack}
        icon={{ icon: LeftArrowIcon, width: 20, height: 20 }}
      />
    );
  }, [backIcon, goBack]);

  const renderTitle = useCallback(() => {
    if (!title) return <></>;
    return (
      <AppText
        size={16}
        color="#000"
        weight={600}
        letterSpacing={-0.1}
        numberOfLines={1}
      >
        {title}
      </AppText>
    );
  }, [title]);

  const renderActions = useCallback(() => {
    if (actions.length === 0) return <></>;
    return actions.map((e, i) => <View key={i.toString()} children={e} />);
  }, [actions]);

  return (
    <View style={[styles.container, { paddingTop: top }]}>
      <HorizontalLayout
        justifyContent="space-between"
        style={{ height: appBarHeight }}
      >
        <HorizontalLayout style={{ flex: 1 }} gap={16}>
          {renderBackButton()}
          {renderTitle()}
        </HorizontalLayout>
        <HorizontalLayout gap={16}>{renderActions()}</HorizontalLayout>
      </HorizontalLayout>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    shadowColor: '#00000089',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export { AppBar };
