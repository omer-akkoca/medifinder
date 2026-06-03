import React, { useCallback, useMemo, useRef } from 'react';
import { ListRenderItemInfo, Pressable, StyleSheet, View } from 'react-native';
import { appInputHeight, height } from '@/src/constants';
import { AppBottomSheetSelectProps, SheetSelectOption } from '@/src/types';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { Controller, FieldValues } from 'react-hook-form';
import { AppIcon, AppText } from '../ui';
import { ChevronBottomIcon } from '@/assets/vectors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getSelectedItemLabel } from '@/src/utils';
import { HorizontalLayout } from '../layouts';

const AppBottomSheetSelect = <T extends FieldValues>({
  control,
  name,
  options,
  multiple,
  placeholder,
  disabled = false,
}: AppBottomSheetSelectProps<T>) => {
  const { bottom } = useSafeAreaInsets();

  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['75%'], []);

  const openSheet = () => {
    bottomSheetRef.current?.present();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  const handleOnChange = useCallback(
    (
      currentValue: string,
      value: string,
      onChange: (...event: any[]) => void,
    ) => {
      if (multiple) {
        const currentValueArray = currentValue
          .split(',')
          .map(e => e.trim())
          .filter(e => e);
        if (currentValueArray.includes(value)) {
          const updatedArray = currentValueArray.filter(e => e !== value);
          onChange(updatedArray.join(','));
        } else {
          const updatedArray = [...currentValueArray, value];
          onChange(updatedArray.join(','));
        }
      } else {
        if (currentValue === value) {
          onChange('');
        } else {
          onChange(value);
        }
        bottomSheetRef.current?.close();
      }
    },
    [multiple],
  );

  const handleIsSelected = useCallback(
    (currentValue: string, value: string): boolean => {
      if (multiple) {
        const currentValueArray = currentValue.split(',').map(e => e.trim());
        return currentValueArray.includes(value);
      } else {
        return currentValue === value;
      }
    },
    [multiple],
  );

  const ListHeaderComponent = useCallback(
    (value: string, onChange: (value: string) => void) => {
      return (
        <HorizontalLayout
          justifyContent="flex-end"
          style={{ paddingBottom: 16 }}
        >
          <Pressable
            onPress={() => {
              onChange('');
              bottomSheetRef.current?.close();
            }}
            disabled={!value}
          >
            <AppText>Clean Filter</AppText>
          </Pressable>
        </HorizontalLayout>
      );
    },
    [],
  );

  const renderItem = useCallback(
    (
      { index, item }: ListRenderItemInfo<SheetSelectOption>,
      value: string,
      onChange: () => void,
    ) => {
      const isSelected = handleIsSelected(value, item.value);
      return (
        <Pressable
          onPress={() => handleOnChange(value, item.value, onChange)}
          style={{
            marginBottom: index + 1 === options.length ? 16 + bottom : 16,
          }}
        >
          <HorizontalLayout justifyContent="space-between">
            <AppText>{item.label}</AppText>
            <View
              style={[
                styles.selected,
                {
                  backgroundColor: isSelected ? '#000' : 'transparent',
                },
              ]}
            />
          </HorizontalLayout>
        </Pressable>
      );
    },
    [bottom, handleIsSelected, handleOnChange, options],
  );

  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <>
            <Pressable
              onPress={openSheet}
              disabled={disabled}
              style={[styles.container, { opacity: disabled ? 0.75 : 1 }]}
            >
              <HorizontalLayout style={{ flex: 1 }} gap={8}>
                <View style={{ flex: 1 }}>
                  <AppText
                    size={14}
                    color={value ? '#000' : '#8F9BB3'}
                    numberOfLines={1}
                  >
                    {value ? getSelectedItemLabel(value, options) : placeholder}
                  </AppText>
                </View>
                <AppIcon
                  icon={ChevronBottomIcon}
                  width={16}
                  height={16}
                  color="#8F9BB3"
                />
              </HorizontalLayout>
            </Pressable>
            <BottomSheetModal
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              enablePanDownToClose
              backdropComponent={renderBackdrop}
              backgroundStyle={{ backgroundColor: '#fff' }}
              handleIndicatorStyle={{ backgroundColor: '#000' }}
              enableOverDrag={false}
              maxDynamicContentSize={(height * 3) / 4}
              enableContentPanningGesture={false}
            >
              <View style={styles.sheetContent}>
                <BottomSheetFlatList
                  data={options}
                  keyExtractor={(item: SheetSelectOption) => item.value}
                  renderItem={item => renderItem(item, value, onChange)}
                  ListHeaderComponent={() =>
                    ListHeaderComponent(value, onChange)
                  }
                />
              </View>
            </BottomSheetModal>
          </>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: appInputHeight,
    borderWidth: 1,
    borderColor: '#49464668',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  sheetContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 12,
  },
  option: {
    height: appInputHeight,
    borderWidth: 1,
    paddingHorizontal: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  selected: {
    width: 20,
    height: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#000',
  },
});

export { AppBottomSheetSelect };
