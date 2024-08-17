import { colors } from '@/constants';
import { StyleSheet } from 'react-native';

export const repositoryListItemStyles = StyleSheet.create({
  repositoryListItem: {
    paddingTop: 8,
    paddingRight: 8,
    paddingBottom: 32,
    paddingLeft: 24,
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    width: '80%',
  },
  stargazersCounter: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  stargazersIcon: {
    width: 16,
    height: 16,
  },
  divider: {
    borderBottomWidth: 1,
    borderBottomColor: colors.darkGrey,
  },
  description: {
    width: '85%',
  },
});
