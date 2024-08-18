import { render, screen } from '@testing-library/react-native';

import { UsersListItem } from '@/components/UsersList/UsersListItem';
import { IRepository } from '@/api/models';

const mockRepositopriesData = [
  { id: 1, name: 'repo1', description: 'description', stargaze_count: 0 },
  { id: 2, name: 'repo2', description: 'description', stargaze_count: 0 },
] as unknown as IRepository[];

jest.mock('expo-image', () => {
  const actualExpoImage = jest.requireActual('expo-image');
  const { Image } = jest.requireActual('react-native');

  return { ...actualExpoImage, Image };
});

describe('UsersListItem', () => {
  it('should match snapshot', () => {
    const tree = render(
      <UsersListItem
        login={''}
        userRepositories={undefined}
        isUserRepositoriesListExpanded={false}
        isLoadingRepositoriesByUserData={false}
        fetchRepositoriesByUserError={null}
        onPressExpand={jest.fn()}
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('should render loading view', () => {
    render(
      <UsersListItem
        login={''}
        userRepositories={undefined}
        isUserRepositoriesListExpanded={true}
        isLoadingRepositoriesByUserData={true}
        fetchRepositoriesByUserError={null}
        onPressExpand={jest.fn()}
        loadingViewTestID="users-list-item-loading-view"
      />,
    );

    const loadingView = screen.getByTestId('users-list-item-loading-view');

    expect(loadingView).not.toBeNull();
  });

  it('should render repositories list', () => {
    render(
      <UsersListItem
        login={''}
        userRepositories={mockRepositopriesData}
        isUserRepositoriesListExpanded={true}
        isLoadingRepositoriesByUserData={false}
        fetchRepositoriesByUserError={null}
        onPressExpand={jest.fn()}
        repositoriesListTestID="users-list-item-repositories-list"
      />,
    );

    const repositoriesList = screen.getByTestId(
      'users-list-item-repositories-list',
    );

    expect(repositoriesList).not.toBeNull();
  });

  it('should render no repositories found view', () => {
    render(
      <UsersListItem
        login={''}
        userRepositories={[]}
        isUserRepositoriesListExpanded={true}
        isLoadingRepositoriesByUserData={false}
        fetchRepositoriesByUserError={null}
        onPressExpand={jest.fn()}
        noRepositoriesFoundViewTestID="users-list-item-no-repositories-found-view"
      />,
    );

    const usersListItemNoRepositoriesFoundView = screen.getByTestId(
      'users-list-item-no-repositories-found-view',
    );

    expect(usersListItemNoRepositoriesFoundView).not.toBeNull();
  });

  it('should render error view', () => {
    render(
      <UsersListItem
        login={''}
        userRepositories={undefined}
        isUserRepositoriesListExpanded={true}
        isLoadingRepositoriesByUserData={false}
        fetchRepositoriesByUserError={new Error()}
        onPressExpand={jest.fn()}
        errorViewTestID="users-list-item-error-view"
      />,
    );

    const usersListItemErrorView = screen.getByTestId(
      'users-list-item-error-view',
    );

    expect(usersListItemErrorView).not.toBeNull();
  });
});
