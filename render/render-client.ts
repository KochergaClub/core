import 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import Entrypoint from '../jsx/entry';

import GlobalContext from '../jsx/components/GlobalContext';

declare global {
  interface Window {
    csrfToken: string;
  }
}

function renderApp(props: any) {
  const domContainerNode = document.getElementById('react-app');

  const el = React.createElement(Entrypoint, {
    name: window['store'].component,
    innerProps: props,
  });

  const csrfToken = window.csrfToken; // extract from page
  const wrapperEl = React.createElement(
    GlobalContext.Provider,
    {
      value: {
        csrfToken,
      },
    },
    el
  );

  ReactDOM.hydrate(wrapperEl, domContainerNode);
}

renderApp(window['store'].props);
