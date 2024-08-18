import { fireEvent, render, screen } from '@testing-library/react-native';

import { Input } from '@/components/Input/Input';
import { inputStyles } from '@/components/Input/Input.styles';

describe('Input', () => {
  it('should match snapshot', () => {
    const tree = render(
      <Input
        value={''}
        placeholder={''}
        isValidationError={false}
        isValidationErrorMessage={''}
        onChangeText={jest.fn()}
        onSubmitEditing={jest.fn()}
      />,
    );

    expect(tree).toMatchSnapshot();
  });

  it('should render validation message when is validation error', () => {
    render(
      <Input
        value={''}
        placeholder={''}
        isValidationError={true}
        isValidationErrorMessage="Validation error message"
        onChangeText={jest.fn()}
        onSubmitEditing={jest.fn()}
        validationMessageTestID="input-validation-message"
      />,
    );

    const validationErrorMessage = screen.getByTestId(
      'input-validation-message',
    );

    expect(validationErrorMessage).not.toBeNull();
  });

  it('should change styles when focus', () => {
    render(
      <Input
        value={''}
        placeholder={''}
        isValidationError={true}
        isValidationErrorMessage="Validation error message"
        onChangeText={jest.fn()}
        onSubmitEditing={jest.fn()}
        testID="input-component"
      />,
    );

    const input = screen.getByTestId('input-component');

    fireEvent(input, 'focus');

    expect(input.props.style).toEqual([
      inputStyles.textInput,
      inputStyles.focusBorder,
    ]);

    fireEvent(input, 'blur');

    expect(input.props.style).toEqual([
      inputStyles.textInput,
      inputStyles.blurBorder,
    ]);
  });
});
