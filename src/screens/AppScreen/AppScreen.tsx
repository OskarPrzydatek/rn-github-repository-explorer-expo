import React from 'react';

import { AppLayout, Button, Input, ResultLabel, UsersList } from '@/components';
import { useGithubRepositoryExplorer } from '@/hooks';

export const AppScreen = () => {
  const {
    usernameValue,
    resultLabel,
    usersByQueryData,
    isLoadingUsersByQueryData,
    isUserListEnabled,
    isResultLabel,
    isValidationError,
    onChangeTextUsernameQuery,
    handleOnSubmitEditingFetchUsersByQuery,
    handleOnPressFetchUsersByQuery,

    repositoriesByUsernameData,
    fetchRepositoriesByUserError,
    isLoadingRepositoriesByUserData,
    userRepositoriesListExpanded,
    onPressUserRepositoriesListExpand,
  } = useGithubRepositoryExplorer();

  return (
    <AppLayout>
      <Input
        value={usernameValue}
        placeholder="Enter username"
        isValidationError={isValidationError}
        isValidationErrorMessage="Username can't be empty"
        onChangeText={onChangeTextUsernameQuery}
        onSubmitEditing={handleOnSubmitEditingFetchUsersByQuery}
      />

      <Button
        label="Search"
        isLoading={isLoadingUsersByQueryData}
        onPress={handleOnPressFetchUsersByQuery}
      />

      {isResultLabel && <ResultLabel resultLabel={resultLabel} />}

      {isUserListEnabled && (
        <UsersList
          users={usersByQueryData?.items}
          userRepositories={repositoriesByUsernameData}
          fetchRepositoriesByUserError={fetchRepositoriesByUserError}
          isLoadingRepositoriesByUserData={isLoadingRepositoriesByUserData}
          userRepositoriesListExpanded={userRepositoriesListExpanded}
          onPressUserRepositoriesListExpand={onPressUserRepositoriesListExpand}
        />
      )}
    </AppLayout>
  );
};
