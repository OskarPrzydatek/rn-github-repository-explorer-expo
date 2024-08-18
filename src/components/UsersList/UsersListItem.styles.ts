import { StyleSheet } from 'react-native';

import { colors } from '@/constants';

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
  isLoadingRepositories: {
    padding: 18,
    alignItems: 'center',
  },
  noRepositoriesFound: {
    paddingTop: 8,
    paddingBottom: 32,
    paddingLeft: 24,
  },
  fetchError: {
    paddingTop: 8,
    paddingBottom: 32,
    paddingLeft: 24,
  },
});
