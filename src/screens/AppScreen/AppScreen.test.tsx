import { render, screen } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AppScreen } from '@/screens/AppScreen/AppScreen';

const queryClient = new QueryClient();

jest.mock('@/hooks', () => ({
  useGithubRepositoryExplorer: () => ({
    isResultLabel: true,
    isUserListEnabled: true,
  }),
}));

describe('AppScreen', () => {
  it('should match snapshot', () => {
    const tree = render(
      <QueryClientProvider client={queryClient}>
        <AppScreen />
      </QueryClientProvider>,
    );

    expect(tree).toMatchSnapshot();
  });

  it('should render result label and users list', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AppScreen />
      </QueryClientProvider>,
    );

    const resultLabel = screen.getByTestId('app-screen-result-label');
    const usersList = screen.getByTestId('app-screen-users-list');

    expect(resultLabel).not.toBeNull();
    expect(usersList).not.toBeNull();
  });
});
