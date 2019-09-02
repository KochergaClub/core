import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { configureStore } from '~/redux/store';

import Page from './index';

jest.mock('next/router', () => ({
  useRouter: () => ({ pathname: 'whatever' }),
}));

it('renders without crashing', () => {
  const div = document.createElement('div');
  const store = configureStore();
  ReactDOM.render(
    <Provider store={store}>
      <Page title="test">test</Page>
    </Provider>,
    div
  );
});
