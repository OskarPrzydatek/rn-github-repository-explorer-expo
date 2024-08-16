import React from 'react';
import { Text, TouchableHighlight } from 'react-native';
import { buttonStyles } from '@/components/Button/Button.styles';
import { colors } from '@/constants';

interface IButton {
  label: string;
  onPress: () => void;
}

export const Button = ({ label, onPress }: IButton) => {
  return (
    <TouchableHighlight
      style={buttonStyles.button}
      activeOpacity={0.7}
      underlayColor={colors.activeGreen}
      onPress={onPress}
    >
      <Text style={buttonStyles.label}>{label}</Text>
    </TouchableHighlight>
  );
};
