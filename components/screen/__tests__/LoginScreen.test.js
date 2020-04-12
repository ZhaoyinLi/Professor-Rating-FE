import React from 'react';
import { render, fireEvent } from 'react-native-testing-library';

import LoginScreen from '../user/LoginScreen';

test('LoginScreen renders all inputs as expected', () => {
  const { toJSON } = render(<LoginScreen />);

  expect(toJSON()).toMatchSnapshot();
});

// test('forwards remaining props to the underlying TextInput', () => {
//   const onChangeTextMock = jest.fn();

//   const { getByTestId } = render(
//     <TextInput
//       onChangeText={onChangeTextMock}
//     />
//   );

// //   expect(getByTestId('Comment.TextInput').props).toEqual(
// //     expect.objectContaining({
// //       passedProp: 'yes',
// //     })
// //   );
//   fireEvent.changeText(getByTestId('LoginScreen.TextInput'), 'testing!');
//   expect(onChangeTextMock).toHaveBeenCalled();
//   expect(onChangeTextMock).toHaveBeenCalledWith('testing!');
//   expect(onChangeTextMock).not.toHaveBeenCalledWith('no!');

// });