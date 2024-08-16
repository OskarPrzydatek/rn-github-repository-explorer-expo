import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const buttonStyles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green,
  },
  label: {
    fontWeight: 'bold',
    color: colors.white,
  },
});
