import { useEffect, useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { Keyboard } from 'react-native';

import { IGetUsersByQueryResponse } from '@/api/models';
import { getUsersByQuery } from '@/api';

/**
 *
 * @description - Hook to manage the state and logic
 * for fetching of users based on a query.
 *
 * @returns {Object} Returns an object containing
 * various states, methods, and helper values.
 *
 * @property {string} usernameValue - The current text input value
 * of the user query for fetcher function.
 * @property {string} resultLabel - The result label, which is
 * updated based on the query status.
 * @property {IGetUsersByQueryResponse} usersByQueryData - The response data
 * of users returned by the query form input.
 * @property {boolean} isLoadingUsersByQueryData - A flag indicating
 * whether the query is currently loading.
 * @property {boolean} isResultLabel - A flag indicating whether
 * the result label should be displayed.
 * @property {boolean} isValidationError - A flag indicating whether
 * a validation error occurred. API validatiopn status with code 422.
 * @property {Function} onChangeTextUsernameQuery - A function to change the `usernameValue`.
 * @property {Function} onSubmitEditingFetchUsersByQuery - A function triggered
 * when pressing "Enter", which fetches users.
 * @property {Function} onPressFetchUsersByQuery - A function triggered
 * when pressing a button, which fetches users and dismisses the keyboard.
 *
 */
export const useGithubUsersResult = () => {
  const [usernameValue, setUsernameValue] = useState('');

  const [resultLabel, setResultLabel] = useState('');
  const [resultLabelUser, setResultLabelUser] = useState('');

  const getUsersByQueryFetcher = () => getUsersByQuery(usernameValue);

  const {
    data: usersByQueryData,
    refetch: fetchUsersByQuery,
    error: fetchUsersByQueryError,
    isLoading: isLoadingUsersByQueryData,
    isFetching: isFetchingUsersByQueryData,
    isRefetching: isRefetchingFetchingUsersByQueryData,
  } = useQuery<IGetUsersByQueryResponse>({
    // Keep key without usernameValue for no reset
    // usersByQueryData when usernameValue is modified
    queryKey: ['get_users_by_query'],
    queryFn: getUsersByQueryFetcher,
    enabled: false,
    retry: 0,
  });

  const isResultLabel = !!resultLabel && !isLoadingUsersByQueryData;
  const isUserListEnabled =
    !isFetchingUsersByQueryData || !isRefetchingFetchingUsersByQueryData;
  const isLoadingUsersListData =
    isLoadingUsersByQueryData || !isUserListEnabled;
  const isValidationError =
    fetchUsersByQueryError?.message === 'Request failed with status code 422';

  const onChangeTextUsernameQuery = (text: string) => setUsernameValue(text);

  const onSubmitEditingFetchUsersByQuery = () => {
    setResultLabelUser(usernameValue);
    fetchUsersByQuery();
  };

  const onPressFetchUsersByQuery = () => {
    setResultLabelUser(usernameValue);
    fetchUsersByQuery();
    Keyboard.dismiss();
  };

  useEffect(() => {
    if (isValidationError) {
      setResultLabel('Press valid username value (ex. Oskar)');
    }

    if (resultLabelUser && usersByQueryData?.items) {
      setResultLabel(`Showing users for "${resultLabelUser}"`);
    }

    if (usersByQueryData?.items?.length === 0 && !isValidationError) {
      setResultLabel(`No users found`);
    }

    if (!isValidationError && fetchUsersByQueryError) {
      setResultLabel('Oops! Something went wrong  :(');
    }

    if (isLoadingUsersListData) {
      setResultLabel(`Looking for users "${resultLabelUser}"`);
    }
  }, [
    fetchUsersByQueryError,
    isLoadingUsersByQueryData,
    isLoadingUsersListData,
    isValidationError,
    resultLabelUser,
    usernameValue,
    usersByQueryData?.items,
  ]);

  return {
    usernameValue,
    resultLabel,
    usersByQueryData,
    isLoadingUsersListData,
    isUserListEnabled,
    isResultLabel,
    isValidationError,
    onChangeTextUsernameQuery,
    onSubmitEditingFetchUsersByQuery,
    onPressFetchUsersByQuery,
  };
};
