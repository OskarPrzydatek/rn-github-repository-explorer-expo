import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const userListItemStyles = StyleSheet.create({
  userListItem: {
    borderWidth: 1,
    borderRadius: 6,
    borderColor: colors.darkGrey,
  },
  collapseButton: {
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.grey,
  },
  collapseButtonClose: {
    borderRadius: 6,
  },
  collapseButtonOpen: {
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGrey,
  },
  collapseButtonChevron: {
    width: 10,
    height: 10,
  },
  collapseButtonChevronOpen: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
});
