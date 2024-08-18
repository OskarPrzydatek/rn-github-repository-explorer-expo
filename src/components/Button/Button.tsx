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
}

export const Button = ({ label, isLoading, onPress }: IButton) => {
  const isIOSActivityIndicatorStyles =
    Platform.OS === 'ios' && buttonStyles.activityIndicator;

  return (
    <TouchableHighlight
      style={buttonStyles.button}
      activeOpacity={0.7}
      underlayColor={colors.activeGreen}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator
          color={colors.white}
          size={19.5} // Android only
          style={isIOSActivityIndicatorStyles}
        />
      ) : (
        <Text style={buttonStyles.label}>{label}</Text>
      )}
    </TouchableHighlight>
  );
};
