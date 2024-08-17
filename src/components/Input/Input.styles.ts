import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const inputStyles = StyleSheet.create({
  input: {
    gap: 8,
  },
  textInput: {
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
  errorMessage: {
    fontSize: 12,
    fontWeight: 'bold',
    color: colors.red,
  },
});
