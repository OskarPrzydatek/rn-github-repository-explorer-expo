import { render } from '@testing-library/react-native';

import { ResultLabel } from '@/components/ResultLabel/ResultLabel';

describe('ResultLabel', () => {
  it('should match snapshot', () => {
    const tree = render(<ResultLabel resultLabel={''} />);
    expect(tree).toMatchSnapshot();
  });
});
