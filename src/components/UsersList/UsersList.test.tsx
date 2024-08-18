import { fireEvent, render, screen } from '@testing-library/react-native';

import { UsersList } from '@/components/UsersList/UsersList';
import { IUser } from '@/api/models';

const mockUsersData = [
  {
    id: 1,
    login: 'mockUser1',
  },
] as IUser[];

const mockOnPressUserRepositoriesListExpand = jest.fn();

jest.mock('expo-image', () => {
  const actualExpoImage = jest.requireActual('expo-image');
  const { Image } = jest.requireActual('react-native');

  return { ...actualExpoImage, Image };
});

describe('UsersList', () => {
  it('should match snapshot', () => {
    const tree = render(
      <UsersList
        users={undefined}
        userRepositories={undefined}
        fetchRepositoriesByUserError={null}
        isLoadingRepositoriesByUserData={false}
        userRepositoriesListExpanded={null}
        onPressUserRepositoriesListExpand={
          mockOnPressUserRepositoriesListExpand
        }
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('should pressing expand ahndle user login and list index', () => {
    render(
      <UsersList
        users={mockUsersData}
        userRepositories={undefined}
        fetchRepositoriesByUserError={null}
        isLoadingRepositoriesByUserData={false}
        userRepositoriesListExpanded={null}
        onPressUserRepositoriesListExpand={
          mockOnPressUserRepositoriesListExpand
        }
        usersListItemExpandingPressableTestID="users-list-item-expanding-pressable"
      />,
    );

    const usersListItemExpandingPressable = screen.getByTestId(
      '0-users-list-item-expanding-pressable',
    );

    fireEvent.press(usersListItemExpandingPressable);

    expect(mockOnPressUserRepositoriesListExpand).toHaveBeenCalled();
    expect(mockOnPressUserRepositoriesListExpand).toHaveBeenCalledWith(
      'mockUser1',
      0,
    );
  });
});
