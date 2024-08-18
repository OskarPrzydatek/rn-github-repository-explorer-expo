import { useGithubUserRepositories } from '@/hooks/useGithubUserRepositories/useGithubUserRepositories';
import { useGithubUsersResult } from '@/hooks/useGithubUsersResult/useGithubUsersResult';

/**
 *
 * @description - Custom hook that combines the logic for
 * searching GitHub users and exploring their repositories.
 *
 * @returns {Object} Returns an object with states, data, and methods
 * for managing GitHub user search and repository exploration.
 *
 * @property {string} usernameValue - The current input value for the
 * GitHub username search query.
 * @property {string} resultLabel - The label indicating the current
 * state or result of the user search query.
 * @property {Array} usersByQueryData - The data of users returned by the search query.
 * @property {boolean} isLoadingUsersListData - A flag indicating whether
 * the user search query is currently loading.
 * @property {boolean} isResultLabel - A flag indicating whether the result
 * label should be displayed.
 * @property {boolean} isValidationError - A flag indicating whether
 * a validation error occurred during the search query.
 * @property {Function} onChangeTextUsernameQuery - Function to update the
 * `usernameValue` based on user input.
 * @property {Function} handleOnSubmitEditingFetchUsersByQuery - Function
 * to handle the submission of the user search query, which also resets
 * the expanded repository list.
 * @property {Function} handleOnPressFetchUsersByQuery - Function to handle
 * the user search query triggered by a button press,
 * which also resets the expanded repository list.
 *
 * @property {Array} repositoriesByUsernameData - The data of repositories
 * fetched for the specified GitHub user.
 * @property {Error | null} fetchRepositoriesByUserError - The error object
 * if fetching repositories fails, or null if there is no error.
 * @property {boolean} isLoadingRepositoriesByUserData - A flag indicating
 * whether the repositories data is currently loading.
 * @property {number | null} userRepositoriesListExpanded - The index of the
 * currently expanded repositories list, or null if none are expanded.
 * @property {Function} onPressUserRepositoriesListExpand - Function to handle
 * the expansion and collapse of a user's repositories list.
 *
 */
export const useGithubRepositoryExplorer = () => {
  const {
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
  } = useGithubUsersResult();

  const {
    repositoriesByUsernameData,
    fetchRepositoriesByUserError,
    isLoadingRepositoriesByUserData,
    userRepositoriesListExpanded,
    resetUserRepositoriesListExpanded,
    onPressUserRepositoriesListExpand,
  } = useGithubUserRepositories();

  const handleOnSubmitEditingFetchUsersByQuery = () => {
    onSubmitEditingFetchUsersByQuery();
    resetUserRepositoriesListExpanded();
  };

  const handleOnPressFetchUsersByQuery = () => {
    onPressFetchUsersByQuery();
    resetUserRepositoriesListExpanded();
  };

  return {
    usernameValue,
    resultLabel,
    usersByQueryData,
    isLoadingUsersListData,
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
  };
};
