import React, { useState } from 'react';

import { Text, TextInput, View } from 'react-native';

import { inputStyles } from '@/components/Input/Input.styles';
import { colors } from '@/constants';

interface IInput {
  value: string;
  placeholder: string;
  isValidationError: boolean;
  isValidationErrorMessage: string;
  onChangeText: (text: string) => void;
  onSubmitEditing: () => void;

  testID?: string;
  validationMessageTestID?: string;
}

export const Input = ({
  value,
  placeholder,
  isValidationError,
  isValidationErrorMessage,
  onChangeText,
  onSubmitEditing,

  testID,
  validationMessageTestID,
}: IInput) => {
  const [isFocused, setIsFocused] = useState(false);

  const isFocusedStyle = isFocused
    ? inputStyles.focusBorder
    : inputStyles.blurBorder;

  const onFocus = () => setIsFocused(true);
  const onBlur = () => setIsFocused(false);

  return (
    <View style={inputStyles.input}>
      <TextInput
        value={value}
        style={[inputStyles.textInput, isFocusedStyle]}
        selectionColor={colors.black}
        placeholder={placeholder}
        onFocus={onFocus}
        onBlur={onBlur}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        testID={testID}
      />

      {isValidationError && (
        <Text style={inputStyles.errorMessage} testID={validationMessageTestID}>
          {isValidationErrorMessage}
        </Text>
      )}
    </View>
  );
};
