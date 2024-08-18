import { act, renderHook } from '@testing-library/react-native';

import { useGithubRepositoryExplorer } from '@/hooks/useGithubRepositoryExplorer/useGithubRepositoryExplorer';
import { useGithubUserRepositories } from '@/hooks/useGithubUserRepositories/useGithubUserRepositories';
import { useGithubUsersResult } from '@/hooks/useGithubUsersResult/useGithubUsersResult';

jest.mock('@/hooks/useGithubUsersResult/useGithubUsersResult', () => ({
  useGithubUsersResult: jest.fn(),
}));

jest.mock(
  '@/hooks/useGithubUserRepositories/useGithubUserRepositories',
  () => ({
    useGithubUserRepositories: jest.fn(),
  }),
);

jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: [],
    refetch: jest.fn(),
  }),
}));

describe('useGithubRepositoryExplorer', () => {
  const mockOnChangeTextUsernameQuery = jest.fn();
  const mockOnSubmitEditingFetchUsersByQuery = jest.fn();
  const mockOnPressFetchUsersByQuery = jest.fn();

  const mockResetUserRepositoriesListExpanded = jest.fn();
  const mockOnPressUserRepositoriesListExpand = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useGithubUsersResult as jest.Mock).mockReturnValue({
      usernameValue: 'testUser',
      resultLabel: 'Test Label',
      usersByQueryData: [{ login: 'user1' }],
      isLoadingUsersListData: true,
      isUserListEnabled: true,
      isResultLabel: true,
      isValidationError: false,
      onChangeTextUsernameQuery: mockOnChangeTextUsernameQuery,
      onSubmitEditingFetchUsersByQuery: mockOnSubmitEditingFetchUsersByQuery,
      onPressFetchUsersByQuery: mockOnPressFetchUsersByQuery,
    });

    (useGithubUserRepositories as jest.Mock).mockReturnValue({
      repositoriesByUsernameData: [{ name: 'repo1' }],
      fetchRepositoriesByUserError: null,
      isLoadingRepositoriesByUserData: false,
      userRepositoriesListExpanded: 1,
      resetUserRepositoriesListExpanded: mockResetUserRepositoriesListExpanded,
      onPressUserRepositoriesListExpand: mockOnPressUserRepositoriesListExpand,
    });
  });

  it('should return values from useGithubUsersResult and useGithubUserRepositories', () => {
    const { result } = renderHook(() => useGithubRepositoryExplorer());

    expect(result.current.usernameValue).toBe('testUser');
    expect(result.current.resultLabel).toBe('Test Label');
    expect(result.current.usersByQueryData).toEqual([{ login: 'user1' }]);
    expect(result.current.isLoadingUsersListData).toBe(true);
    expect(result.current.isUserListEnabled).toBe(true);
    expect(result.current.isResultLabel).toBe(true);
    expect(result.current.isValidationError).toBe(false);
    expect(result.current.repositoriesByUsernameData).toEqual([
      { name: 'repo1' },
    ]);
    expect(result.current.fetchRepositoriesByUserError).toBeNull();
    expect(result.current.isLoadingRepositoriesByUserData).toBe(false);
    expect(result.current.userRepositoriesListExpanded).toBe(1);
  });

  it('should call handleOnSubmitEditingFetchUsersByQuery and resetUserRepositoriesListExpanded', () => {
    const { result } = renderHook(() => useGithubRepositoryExplorer());

    act(() => {
      result.current.handleOnSubmitEditingFetchUsersByQuery();
    });

    expect(mockOnSubmitEditingFetchUsersByQuery).toHaveBeenCalled();
    expect(mockResetUserRepositoriesListExpanded).toHaveBeenCalled();
  });

  it('should call handleOnPressFetchUsersByQuery and resetUserRepositoriesListExpanded', () => {
    const { result } = renderHook(() => useGithubRepositoryExplorer());

    act(() => {
      result.current.handleOnPressFetchUsersByQuery();
    });

    expect(mockOnPressFetchUsersByQuery).toHaveBeenCalled();
    expect(mockResetUserRepositoriesListExpanded).toHaveBeenCalled();
  });
});
