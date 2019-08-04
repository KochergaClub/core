import 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import Entrypoint from '../jsx/entry';
import { findScreen } from '../jsx/screens';

import { Store } from './types';

declare global {
  interface Window {
    store: Store; // populated by server.ts
  }
}

function renderApp(props: any) {
  const domContainerNode = document.getElementById('react-app');

  const screen = findScreen(window.store.screenName);

  const el = React.createElement(Entrypoint, {
    screen,
    user: window.store.user,
    csrfToken: window.store.csrfToken, // extract from page
    innerProps: props,
  });

  ReactDOM.hydrate(el, domContainerNode);
}

renderApp(window['store'].props);
