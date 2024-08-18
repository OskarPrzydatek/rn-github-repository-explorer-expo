import React from 'react';

import { Text, View } from 'react-native';

import { resultLabelStyles } from '@/components/ResultLabel/ResultLabel.styles';

interface IResultLabel {
  resultLabel: string;

  testID?: string;
}

export const ResultLabel = ({ resultLabel, testID }: IResultLabel) => {
  return (
    <View style={resultLabelStyles.resultLabel} testID={testID}>
      <View style={resultLabelStyles.divider}>
        <Text numberOfLines={1} style={resultLabelStyles.text}>
          {resultLabel}
        </Text>
      </View>
    </View>
  );
};
