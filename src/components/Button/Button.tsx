import React from 'react';
import { ActivityIndicator, Text, TouchableHighlight } from 'react-native';
import { buttonStyles } from '@/components/Button/Button.styles';
import { colors } from '@/constants';

interface IButton {
  label: string;
  isLoading: boolean;
  onPress: () => void;
}

export const Button = ({ label, isLoading, onPress }: IButton) => {
  return (
    <TouchableHighlight
      style={buttonStyles.button}
      activeOpacity={0.7}
      underlayColor={colors.activeGreen}
      onPress={onPress}
    >
      {isLoading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={buttonStyles.label}>{label}</Text>
      )}
    </TouchableHighlight>
  );
};
