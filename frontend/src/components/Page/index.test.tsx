import React from 'react';
import ReactDOM from 'react-dom';

import Page from './index';

jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: 'whatever' }),
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Page title="test">test</Page>, div);
});
