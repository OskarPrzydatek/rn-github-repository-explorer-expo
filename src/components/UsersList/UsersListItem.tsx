import React from 'react';

import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  Pressable,
  Text,
  View,
} from 'react-native';
import { Image } from 'expo-image';

import { IRepository } from '@/api/models';
import { RepositoryListItem } from '@/components/UsersList/RepositoryListItem';
import { userListItemStyles } from '@/components/UsersList/UsersListItem.styles';
import { colors } from '@/constants';

interface IUsersListItem {
  login: string;
  userRepositories: IRepository[] | undefined;
  isUserRepositoriesListExpanded: boolean;
  isLoadingRepositoriesByUserData: boolean;
  fetchRepositoriesByUserError: Error | null;
  onPressExpand: () => void;

  expandingPressableTestID?: string;
  loadingViewTestID?: string;
  repositoriesListTestID?: string;
  noRepositoriesFoundViewTestID?: string;
  errorViewTestID?: string;
}

const CHEVRON_ICON = require('../../../assets/svg/chevron.svg');

export const UsersListItem = ({
  isUserRepositoriesListExpanded,
  login,
  userRepositories,
  isLoadingRepositoriesByUserData,
  fetchRepositoriesByUserError,
  onPressExpand,

  expandingPressableTestID,
  loadingViewTestID,
  repositoriesListTestID,
  noRepositoriesFoundViewTestID,
  errorViewTestID,
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
        testID={expandingPressableTestID}
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
        <View
          style={userListItemStyles.isLoadingRepositories}
          testID={loadingViewTestID}
        >
          <ActivityIndicator color={colors.black} />
        </View>
      )}

      {isExpandedWithRepositories && (
        <FlatList
          data={userRepositories}
          renderItem={renderItemForRepositoriesList}
          scrollEnabled={false}
          testID={repositoriesListTestID}
        />
      )}

      {isExpandedWithNoRepositories && (
        <View
          style={userListItemStyles.noRepositoriesFound}
          testID={noRepositoriesFoundViewTestID}
        >
          <Text>No repositories found</Text>
        </View>
      )}

      {isExpandedWithError && (
        <View style={userListItemStyles.fetchError} testID={errorViewTestID}>
          <Text>Oops! Somethiong went wrong :(</Text>
        </View>
      )}
    </View>
  );
};
