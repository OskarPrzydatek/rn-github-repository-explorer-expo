import React from 'react';

import {
  ActivityIndicator,
  Platform,
  Text,
  TouchableHighlight,
} from 'react-native';

import { buttonStyles } from '@/components/Button/Button.styles';
import { colors } from '@/constants';

interface IButton {
  label: string;
  isLoading: boolean;
  onPress: () => void;

  testID?: string;
  activityIndicatorTestID?: string;
}

export const Button = ({
  label,
  isLoading,
  onPress,

  testID,
  activityIndicatorTestID,
}: IButton) => {
  const isIOSActivityIndicatorStyles =
    Platform.OS === 'ios' && buttonStyles.activityIndicator;

  return (
    <TouchableHighlight
      style={buttonStyles.button}
      activeOpacity={0.7}
      underlayColor={colors.activeGreen}
      onPress={onPress}
      testID={testID}
    >
      {isLoading ? (
        <ActivityIndicator
          color={colors.white}
          size={19.5} // Android only
          style={isIOSActivityIndicatorStyles}
          testID={activityIndicatorTestID}
        />
      ) : (
        <Text style={buttonStyles.label}>{label}</Text>
      )}
    </TouchableHighlight>
  );
};
