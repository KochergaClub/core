import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import { configureStore } from '~/redux/store';
import { configureAPI } from '~/core/actions';

import CohortCollection from './CohortCollection';

it('empty list renders without crashing', () => {
  const store = configureStore();
  store.dispatch(configureAPI({ csrfToken: 'fake' }));

  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <CohortCollection cohorts={[]} />
    </Provider>,
    div
  );
});
