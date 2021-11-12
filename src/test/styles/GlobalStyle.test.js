import React from 'react';
import { render } from 'test-utils';

import { GlobalStyle } from 'components/styles/GlobalStyle';

test('match snapshot', () => {
  render(<GlobalStyle />);

  expect(document.head).toMatchSnapshot();
});
