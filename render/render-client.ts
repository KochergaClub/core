import React from 'react';
import ReactDOM from 'react-dom';

import { getPage } from '../jsx/entry';

import GlobalContext from '../jsx/components/GlobalContext';

declare global {
  interface Window {
    csrfToken: string;
  }
}

function renderApp(props: any) {
  const component = getPage(window['store'].component);
  const domContainerNode = document.getElementById('react-app');

  const el = React.createElement(component, props);

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
