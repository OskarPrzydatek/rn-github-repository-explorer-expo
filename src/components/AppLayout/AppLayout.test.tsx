import { render } from '@testing-library/react-native';
import { View } from 'react-native';

import { AppLayout } from '@/components/AppLayout/AppLayout';

describe('AppLayout', () => {
  it('should match snapshot', () => {
    const tree = render(
      <AppLayout>
        <View />
      </AppLayout>,
    );

    expect(tree).toMatchSnapshot();
  });
});
