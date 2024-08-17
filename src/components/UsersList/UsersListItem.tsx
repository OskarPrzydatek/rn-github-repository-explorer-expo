import { IRepository } from '@/api/models';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  Text,
  View,
} from 'react-native';
import { RepositoryListItem } from '@/components/UsersList/RepositoryListItem';
import { userListItemStyles } from '@/components/UsersList/UsersListItem.styles';
import { Image } from 'expo-image';
import { colors } from '@/constants';

interface IUsersListItem {
  login: string;
  userRepositories: IRepository[] | undefined;
  isUserRepositoriesListExpanded: boolean;
  isLoadingRepositoriesByUserData: boolean;
  fetchRepositoriesByUserError: Error | null;
  onPressExpand: () => void;
}

const CHEVRON_ICON = require('../../../assets/svg/chevron.svg');

export const UsersListItem = ({
  isUserRepositoriesListExpanded,
  login,
  userRepositories,
  isLoadingRepositoriesByUserData,
  fetchRepositoriesByUserError,
  onPressExpand,
}: IUsersListItem) => {
  const expandStateButtonStyle = isUserRepositoriesListExpanded
    ? userListItemStyles.collapseButtonOpen
    : userListItemStyles.collapseButtonClose;
  const expandStateChevronRotateStyle =
    isUserRepositoriesListExpanded &&
    userListItemStyles.collapseButtonChevronOpen;

  const isExpandedWithLoading =
    isUserRepositoriesListExpanded && isLoadingRepositoriesByUserData;
  const isExpandedWithRepositories =
    isUserRepositoriesListExpanded &&
    userRepositories &&
    userRepositories?.length > 0;
  const isExpandedWithNoRepositories =
    isUserRepositoriesListExpanded &&
    userRepositories &&
    userRepositories?.length === 0;
  const isExpandedWithError =
    isUserRepositoriesListExpanded && fetchRepositoriesByUserError;

  const renderItemForRepositoriesList: ListRenderItem<IRepository> = ({
    item,
    index,
  }) => {
    const isLastItem = index + 1 === userRepositories?.length;

    return (
      <RepositoryListItem
        name={item.name}
        description={item.description}
        stargazersCount={item.stargazers_count}
        isLastItem={isLastItem}
      />
    );
  };

  return (
    <View style={userListItemStyles.userListItem}>
      <Pressable
        style={[userListItemStyles.collapseButton, expandStateButtonStyle]}
        onPress={onPressExpand}
      >
        <Text>{login}</Text>

        <Image
          style={[
            userListItemStyles.collapseButtonChevron,
            expandStateChevronRotateStyle,
          ]}
          source={CHEVRON_ICON}
        />
      </Pressable>

      {isExpandedWithLoading && (
        <View style={userListItemStyles.isLoadingRepositories}>
          <ActivityIndicator color={colors.black} />
        </View>
      )}

      {isExpandedWithRepositories && (
        <FlatList
          data={userRepositories}
          renderItem={renderItemForRepositoriesList}
          scrollEnabled={false}
        />
      )}

      {isExpandedWithNoRepositories && (
        <View style={userListItemStyles.noRepositoriesFound}>
          <Text>No repositories found</Text>
        </View>
      )}

      {isExpandedWithError && (
        <View style={userListItemStyles.fetchError}>
          <Text>Oops! Somethiong went wrong :(</Text>
        </View>
      )}
    </View>
  );
};
