import { render } from '@testing-library/react-native';

import { RepositoryListItem } from '@/components/UsersList/RepositoryListItem';

jest.mock('expo-image', () => {
  const actualExpoImage = jest.requireActual('expo-image');
  const { Image } = jest.requireActual('react-native');

  return { ...actualExpoImage, Image };
});

describe('RepositoryListItem', () => {
  it('should match snapshot', () => {
    const tree = render(
      <RepositoryListItem
        name={''}
        description={null}
        stargazersCount={0}
        isLastItem={false}
      />,
    );

    expect(tree).toMatchSnapshot();
  });
});
