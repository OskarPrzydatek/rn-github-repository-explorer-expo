import { IRepository } from '@/api/models';
import React, { useState } from 'react';
import { FlatList, ListRenderItem, Pressable, Text, View } from 'react-native';
import { CollapseView } from '@/components/UsersList/CollapseView';
import { RepositoryListItem } from '@/components/UsersList/RepositoryListItem';
import { userListItemStyles } from '@/components/UsersList/UsersListItem.styles';
import { Image } from 'expo-image';

interface IUsersListItem {
  login: string;
  userRepositories: IRepository[];
}

const CHEVRON_ICON = require('../../../assets/svg/chevron.svg');

export const UsersListItem = ({ login, userRepositories }: IUsersListItem) => {
  const [expanded, setExpanded] = useState(false);

  const expandStateButtonStyle = expanded
    ? userListItemStyles.collapseButtonOpen
    : userListItemStyles.collapseButtonClose;

  const expandStateChevronRotateStyle =
    expanded && userListItemStyles.collapseButtonChevronOpen;

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

  const onPressExpand = () =>
    setExpanded((previousState: boolean) => !previousState);

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

      <CollapseView expanded={expanded}>
        <FlatList
          data={userRepositories}
          renderItem={renderItemForRepositoriesList}
          scrollEnabled={false}
        />
      </CollapseView>
    </View>
  );
};
