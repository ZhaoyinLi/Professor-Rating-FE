import React from 'react';
import { render } from 'react-native-testing-library';

import SignupScreen from '../user/SignupScreen';

test('SignupScreen renders all inputs as expected', () => {
  const { toJSON } = render(<SignupScreen />);

  expect(toJSON()).toMatchSnapshot();
});