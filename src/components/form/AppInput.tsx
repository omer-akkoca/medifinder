import React from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { AppInputProps } from '@/src/types';
import { Controller, FieldValues } from 'react-hook-form';
import { AppIcon } from '../ui';
import { appInputHeight } from '@/src/constants';
import { HorizontalLayout } from '../layouts';

const AppInput = <T extends FieldValues>({
  control,
  name,
  prefix,
  onPrefix,
  suffix,
  onSuffix,
  placeholder,
  ...rest
}: AppInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange, onBlur } }) => {
        return (
          <HorizontalLayout style={styles.container} gap={16}>
            {prefix ? (
              <Pressable onPress={onPrefix}>
                <AppIcon icon={prefix} width={16} height={16} />
              </Pressable>
            ) : (
              <></>
            )}
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              style={styles.input}
              placeholder={placeholder}
              placeholderTextColor="#8F9BB3"
              {...rest}
            />
            {suffix ? (
              <Pressable onPress={onSuffix}>
                <AppIcon icon={suffix} width={16} height={16} />
              </Pressable>
            ) : (
              <></>
            )}
          </HorizontalLayout>
        );
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: appInputHeight,
    borderWidth: 1,
    borderColor: '#49464668',
    borderRadius: 8,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  input: {
    flex: 1,
    fontSize: 14,
    padding: 0,
    margin: 0,
  },
});

export { AppInput };
