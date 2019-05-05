import 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import Entrypoint from '../jsx/entry';
import { findScreen } from '../jsx/screens';

declare global {
  interface Window {
    csrfToken: string; // populated by server.ts
    store: any;
  }
}

function renderApp(props: any) {
  const domContainerNode = document.getElementById('react-app');

  const screen = findScreen(window['store'].screenName);

  const el = React.createElement(Entrypoint, {
    screen,
    csrfToken: window.csrfToken, // extract from page
    innerProps: props,
  });

  ReactDOM.hydrate(el, domContainerNode);
}

renderApp(window['store'].props);
