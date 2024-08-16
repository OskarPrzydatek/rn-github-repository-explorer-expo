import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
  input: {
    height: 40,
    padding: 12,
    borderRadius: 6,
  },
  blurBorder: {
    borderWidth: 1,
    borderColor: colors.darkGrey,
    backgroundColor: colors.grey,
  },
  focusBorder: {
    borderWidth: 2,
    borderColor: colors.blue,
  },
});
