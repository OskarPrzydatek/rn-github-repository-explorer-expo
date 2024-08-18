import { QueryObserverPendingResult, useQuery } from '@tanstack/react-query';
import { act, renderHook } from '@testing-library/react-native';

import { useGithubUserRepositories } from '@/hooks/useGithubUserRepositories/useGithubUserRepositories';

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
}));

jest.mock('@/api', () => ({
  getRepositoriesByUser: jest.fn(),
}));

describe('useGithubUserRepositories', () => {
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
    } as unknown as QueryObserverPendingResult<unknown, unknown>);

    const { result } = renderHook(() => useGithubUserRepositories());

    expect(result.current.repositoriesByUsernameData).toBeUndefined();
    expect(result.current.fetchRepositoriesByUserError).toBeNull();
    expect(result.current.isLoadingRepositoriesByUserData).toBe(false);
    expect(result.current.userRepositoriesListExpanded).toBeNull();
  });

  it('should handle onPressUserRepositoriesListExpand correctly', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      refetch: jest.fn(),
      error: null,
      isLoading: false,
    } as unknown as QueryObserverPendingResult<unknown, unknown>);

    const { result } = renderHook(() => useGithubUserRepositories());

    act(() => {
      result.current.onPressUserRepositoriesListExpand('user1', 1);
    });

    expect(result.current.userRepositoriesListExpanded).toBe(1);
    expect(result.current.fetchRepositoriesByUser).toHaveBeenCalled();
  });

  it('should close expanded list when the same index is clicked', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      refetch: jest.fn(),
      error: null,
      isLoading: false,
    } as unknown as QueryObserverPendingResult<unknown, unknown>);

    const { result } = renderHook(() => useGithubUserRepositories());

    act(() => {
      result.current.onPressUserRepositoriesListExpand('user1', 1);
    });

    act(() => {
      result.current.onPressUserRepositoriesListExpand('user1', 1);
    });

    expect(result.current.userRepositoriesListExpanded).toBeNull();
  });

  it('should call fetchRepositoriesByUser when repositoryUsername changes', () => {
    const fetchRepositoriesByUser = jest.fn();
    mockUseQuery.mockReturnValue({
      data: undefined,
      refetch: fetchRepositoriesByUser,
      error: null,
      isLoading: false,
    } as unknown as QueryObserverPendingResult<unknown, unknown>);

    const { result } = renderHook(() => useGithubUserRepositories());

    act(() => {
      result.current.onPressUserRepositoriesListExpand('user1', 1);
    });

    expect(result.current.repositoriesByUsernameData).toBeUndefined();
    expect(fetchRepositoriesByUser).toHaveBeenCalled();
  });

  it('should reset userRepositoriesListExpanded', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      refetch: jest.fn(),
      error: null,
      isLoading: false,
    } as unknown as QueryObserverPendingResult<unknown, unknown>);

    const { result } = renderHook(() => useGithubUserRepositories());

    act(() => {
      result.current.onPressUserRepositoriesListExpand('user1', 1);
    });

    act(() => {
      result.current.resetUserRepositoriesListExpanded();
    });

    expect(result.current.userRepositoriesListExpanded).toBeNull();
  });

  it('should set correct state on successful data fetch', () => {
    const mockData = [{ id: 1, name: 'repo1' }];
    mockUseQuery.mockReturnValue({
      data: mockData,
      refetch: jest.fn(),
      error: null,
      isLoading: false,
    } as unknown as QueryObserverPendingResult<unknown, unknown>);

    const { result } = renderHook(() => useGithubUserRepositories());

    act(() => {
      result.current.onPressUserRepositoriesListExpand('user1', 1);
    });

    expect(result.current.repositoriesByUsernameData).toEqual(mockData);
  });

  it('should handle fetchRepositoriesByUserError correctly', () => {
    const mockError = new Error('Network error');
    mockUseQuery.mockReturnValue({
      data: undefined,
      refetch: jest.fn(),
      error: mockError,
      isLoading: false,
    } as unknown as QueryObserverPendingResult<unknown, unknown>);

    const { result } = renderHook(() => useGithubUserRepositories());

    act(() => {
      result.current.onPressUserRepositoriesListExpand('user1', 1);
    });

    expect(result.current.fetchRepositoriesByUserError).toEqual(mockError);
  });

  it('should handle loading state correctly', () => {
    mockUseQuery.mockReturnValue({
      data: undefined,
      refetch: jest.fn(),
      error: null,
      isLoading: true,
    } as unknown as QueryObserverPendingResult<unknown, unknown>);

    const { result } = renderHook(() => useGithubUserRepositories());

    expect(result.current.isLoadingRepositoriesByUserData).toBe(true);
  });
});
