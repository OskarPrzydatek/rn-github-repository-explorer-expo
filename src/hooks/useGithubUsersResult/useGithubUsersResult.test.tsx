import { QueryObserverPendingResult, useQuery } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react-native';

import { useGithubUsersResult } from '@/hooks/useGithubUsersResult/useGithubUsersResult';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@/api', () => ({
  getUsersByQuery: jest.fn(),
}));

describe('useGithubUsersResult', () => {
  const mockUseQuery = useQuery as jest.MockedFunction<typeof useQuery>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default values', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      refetch: jest.fn(),
      error: null,
      isLoading: false,
      isFetching: false,
      isRefetching: false,
    } as unknown as QueryObserverPendingResult<unknown, unknown>);

    const { result } = renderHook(() => useGithubUsersResult());

    expect(result.current.usernameValue).toBe('');
    expect(result.current.resultLabel).toBe('');
    expect(result.current.usersByQueryData).toBeUndefined();
    expect(result.current.isLoadingUsersListData).toBe(false);
    expect(result.current.isUserListEnabled).toBe(true);
    expect(result.current.isResultLabel).toBe(false);
    expect(result.current.isValidationError).toBe(false);
  });

  it('should handle onChangeTextUsernameQuery correctly', () => {
    const { result } = renderHook(() => useGithubUsersResult());

    act(() => {
      result.current.onChangeTextUsernameQuery('newUser');
    });

    expect(result.current.usernameValue).toBe('newUser');
  });

  it('should call fetchUsersByQuery and dismiss keyboard on onPressFetchUsersByQuery', () => {
    const fetchUsersByQuery = jest.fn();
    mockUseQuery.mockReturnValue({
      data: undefined,
      refetch: fetchUsersByQuery,
      error: null,
      isLoading: false,
      isFetching: false,
      isRefetching: false,
    } as unknown as QueryObserverPendingResult<unknown, unknown>);

    const { result } = renderHook(() => useGithubUsersResult());

    act(() => {
      result.current.onChangeTextUsernameQuery('newUser');
      result.current.onPressFetchUsersByQuery();
    });

    expect(fetchUsersByQuery).toHaveBeenCalled();
  });

  it('should update resultLabel based on query states', () => {
    mockUseQuery.mockReturnValue({
      data: { items: [] },
      refetch: jest.fn(),
      error: null,
      isLoading: false,
      isFetching: false,
      isRefetching: false,
    } as unknown as QueryObserverPendingResult<unknown, unknown>);

    const { result } = renderHook(() => useGithubUsersResult());

    act(() => {
      result.current.onChangeTextUsernameQuery('newUser');
      result.current.onSubmitEditingFetchUsersByQuery();
    });

    expect(result.current.resultLabel).toBe('No users found');
  });

  it('should handle validation error correctly', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      refetch: jest.fn(),
      error: { message: 'Request failed with status code 422' },
      isLoading: false,
      isFetching: false,
      isRefetching: false,
    } as unknown as QueryObserverPendingResult<unknown, unknown>);

    const { result } = renderHook(() => useGithubUsersResult());

    act(() => {
      result.current.onChangeTextUsernameQuery('newUser');
      result.current.onSubmitEditingFetchUsersByQuery();
    });

    expect(result.current.isValidationError).toBe(true);
    expect(result.current.resultLabel).toBe(
      'Press valid username value (ex. Oskar)',
    );
  });
});
