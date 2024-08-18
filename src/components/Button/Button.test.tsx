import { render, screen } from '@testing-library/react-native';

import { Button } from '@/components/Button/Button';

describe('Button', () => {
  it('should match snapshot', () => {
    const tree = render(
      <Button label="Label" isLoading={false} onPress={jest.fn()} />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('should render activity indicator when loading', () => {
    render(
      <Button
        label="Label"
        isLoading={true}
        onPress={jest.fn()}
        activityIndicatorTestID="button-activity-indicator"
      />,
    );

    const activityIndicator = screen.getByTestId('button-activity-indicator');

    expect(activityIndicator).not.toBeNull();
  });
});
