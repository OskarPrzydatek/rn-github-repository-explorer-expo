import React, { useState } from 'react';
import { TextInput } from 'react-native';
import { inputStyles } from '@/components/Input/Input.styles';
import { colors } from '@/constants';

interface IInput {
  placeholder: string;
}

export const Input = ({ placeholder }: IInput) => {
  const [isFocused, setIsFocused] = useState(false);

  const isFocusedStyle = isFocused
    ? inputStyles.focusBorder
    : inputStyles.blurBorder;

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return (
    <TextInput
      style={[inputStyles.input, isFocusedStyle]}
      selectionColor={colors.black}
      placeholder={placeholder}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
};
