import { getRepositoriesByUser } from '@/api';
import { IRepository } from '@/api/models';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

/**
 *
 * @description - Hook to manage the state and logic for
 * fetching and displaying a user's repositories.
 *
 * @returns {Object} Returns an object containing
 * the repositories data, error state, loading state,
 * and functions to manage the repositories list expansion.
 *
 * @property {IRepository[]} repositoriesByUsernameData - The data of repositories
 * fetched for the specified user.
 * @property {Error | null} fetchRepositoriesByUserError - The error object
 * if the repository fetch fails, or null if no error.
 * @property {boolean} isLoadingRepositoriesByUserData - A flag indicating whether
 * the repositories data is currently loading.
 * @property {number | null} userRepositoriesListExpanded - The index of the currently
 * expanded repositories list, or null if none are expanded.
 * @property {Function} onPressUserRepositoriesListExpand - A function to handle the expansion of a user's repositories list.
 * It toggles the list expansion based on the provided username and index.
 *
 */
export const useGithubUserRepositories = () => {
  const [repositoryUsername, setRepositoryUsername] = useState('');
  const [userRepositoriesListExpanded, setUserRepositoriesListExpanded] =
    useState<number | null>(null);

  const getRepositoriesByUserFetcher = () =>
    getRepositoriesByUser(repositoryUsername);

  const {
    data: repositoriesByUsernameData,
    refetch: fetchRepositoriesByUser,
    error: fetchRepositoriesByUserError,
    isLoading: isLoadingRepositoriesByUserData,
  } = useQuery<IRepository[]>({
    queryKey: ['get_user_repositories', repositoryUsername],
    queryFn: getRepositoriesByUserFetcher,
    enabled: false,
    retry: 0,
  });

  const resetUserRepositoriesListExpanded = () =>
    setUserRepositoriesListExpanded(null);

  const onPressUserRepositoriesListExpand = (
    username: string,
    index: number,
  ) => {
    const isUserRepositoriesListExpanded =
      userRepositoriesListExpanded === index;

    // Close the repositories list when the onPress event
    // is triggered on the currently open list
    if (isUserRepositoriesListExpanded) {
      setUserRepositoriesListExpanded(null);
      return;
    }

    setUserRepositoriesListExpanded(index);
    setRepositoryUsername(username);
  };

  useEffect(() => {
    if (repositoryUsername) {
      fetchRepositoriesByUser();
    }
  }, [fetchRepositoriesByUser, repositoryUsername]);

  return {
    repositoriesByUsernameData,
    fetchRepositoriesByUserError,
    isLoadingRepositoriesByUserData,
    userRepositoriesListExpanded,
    resetUserRepositoriesListExpanded,
    onPressUserRepositoriesListExpand,
  };
};
