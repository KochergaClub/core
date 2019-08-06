import 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import Entrypoint from '~/entry';
import { findScreen } from '~/screens';
import { configureStore } from '~/redux/store';

import { Store } from './types';

declare global {
  interface Window {
    store: Store; // populated by server
  }
}

function renderApp(props: any) {
  const domContainerNode = document.getElementById('react-app');

  const screen = findScreen(window.store.screenName);
  const store = configureStore(window.store.reduxState);

  const el = (
    <Entrypoint
      screen={screen}
      store={store}
      user={window.store.user}
      csrfToken={window.store.csrfToken}
      innerProps={props}
    />
  );

  ReactDOM.hydrate(el, domContainerNode);
}

renderApp(window['store'].props);
