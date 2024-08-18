import { StyleSheet } from 'react-native';

import { colors } from '@/constants';

export const resultLabelStyles = StyleSheet.create({
  resultLabel: {
    alignItems: 'baseline',
    width: '80%',
  },
  divider: {
    paddingBottom: 8,
    borderBottomWidth: 2,
    borderBottomColor: colors.orange,
  },
  text: {
    fontWeight: 'bold',
  },
});
