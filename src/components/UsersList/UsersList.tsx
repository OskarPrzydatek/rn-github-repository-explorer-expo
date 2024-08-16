import { IRepository, IUser } from '@/api/models';
import React from 'react';
import { FlatList, ListRenderItem } from 'react-native';
import { UsersListItem } from './UsersListItem';
import { userListStyles } from './UserList.styles';

interface IUsersList {
  users: IUser[];
  userRepositories: IRepository[];
}

export const UsersList = ({ users, userRepositories }: IUsersList) => {
  const renderItemForUsersList: ListRenderItem<IUser> = ({ item }) => (
    <UsersListItem login={item.login} userRepositories={userRepositories} />
  );

  return (
    <FlatList
      data={users}
      renderItem={renderItemForUsersList}
      contentContainerStyle={userListStyles.contentContainerStyle}
      showsVerticalScrollIndicator={false}
    />
  );
};
