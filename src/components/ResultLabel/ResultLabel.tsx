import React from 'react';
import { Text, View } from 'react-native';
import { resultLabelStyles } from './ResultLabel.styles';

interface IResultLabel {
  children: string;
}

export const ResultLabel = ({ children }: IResultLabel) => {
  return (
    <View style={resultLabelStyles.resultLabel}>
      <View style={resultLabelStyles.divider}>
        <Text numberOfLines={1} style={resultLabelStyles.text}>
          {children}
        </Text>
      </View>
    </View>
  );
};
