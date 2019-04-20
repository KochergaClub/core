import React from 'react';
import ReactDOM from 'react-dom';

declare global {
  interface Window {
    csrfToken: string;
  }
}

function renderApp(props: any) {
  const component = require('../jsx/' + window['store'].component).default;
  const GlobalContext = require('../jsx/components/GlobalContext').default;
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
