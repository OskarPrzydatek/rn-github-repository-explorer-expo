import React from 'react';
import { Text, View } from 'react-native';
import { repositoryListItemStyles } from '@/components/UsersList/RepositoryListItem.styles';
import { Image } from 'expo-image';

interface IRepositoryListItem {
  name: string;
  description: string | null;
  stargazersCount: number;
  isLastItem: boolean;
}

const STAR_ICON = require('../../../assets/svg/star.svg');

export const RepositoryListItem = ({
  name,
  description,
  stargazersCount,
  isLastItem,
}: IRepositoryListItem) => {
  const isItemDividerStyles = !isLastItem && repositoryListItemStyles.divider;

  return (
    <View
      style={[repositoryListItemStyles.repositoryListItem, isItemDividerStyles]}
    >
      <View style={repositoryListItemStyles.row}>
        <Text numberOfLines={1} style={repositoryListItemStyles.name}>
          {name}
        </Text>

        <View style={repositoryListItemStyles.stargazersCounter}>
          <Text>{stargazersCount}</Text>

          <Image
            style={repositoryListItemStyles.stargazersIcon}
            source={STAR_ICON}
          />
        </View>
      </View>

      <Text numberOfLines={3} style={repositoryListItemStyles.description}>
        {description ?? 'No repository description'}
      </Text>
    </View>
  );
};
