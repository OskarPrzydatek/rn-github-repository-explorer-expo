import { StyleSheet } from 'react-native';

import { colors } from '@/constants';

export const buttonStyles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
  },
  activityIndicator: {
    height: 17,
  },
  label: {
    fontWeight: 'bold',
    color: colors.white,
  },
});
