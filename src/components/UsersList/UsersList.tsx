import React from 'react';

import { FlatList, ListRenderItem } from 'react-native';

import { UsersListItem } from '@/components/UsersList/UsersListItem';
import { userListStyles } from '@/components/UsersList/UserList.styles';
import { IRepository, IUser } from '@/api/models';

interface IUsersList {
  users: IUser[] | undefined;
  userRepositories: IRepository[] | undefined;
  fetchRepositoriesByUserError: Error | null;
  isLoadingRepositoriesByUserData: boolean;
  userRepositoriesListExpanded: number | null;
  onPressUserRepositoriesListExpand: (username: string, index: number) => void;
}

export const UsersList = ({
  users,
  userRepositories,
  isLoadingRepositoriesByUserData,
  fetchRepositoriesByUserError,
  userRepositoriesListExpanded,
  onPressUserRepositoriesListExpand,
}: IUsersList) => {
  const renderItemForUsersList: ListRenderItem<IUser> = ({ item, index }) => {
    const isUserRepositoriesListExpanded =
      userRepositoriesListExpanded === index;

    const handleOnPressUserRepositoriesListExpand = () =>
      onPressUserRepositoriesListExpand(item.login, index);

    return (
      <UsersListItem
        login={item.login}
        userRepositories={userRepositories}
        isUserRepositoriesListExpanded={isUserRepositoriesListExpanded}
        isLoadingRepositoriesByUserData={isLoadingRepositoriesByUserData}
        fetchRepositoriesByUserError={fetchRepositoriesByUserError}
        onPressExpand={handleOnPressUserRepositoriesListExpand}
      />
    );
  };

  return (
    <FlatList
      data={users}
      renderItem={renderItemForUsersList}
      contentContainerStyle={userListStyles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
};
