import React from 'react';
import ReactDOM from 'react-dom';

function renderApp(props: any) {
  const component = require('./' + window['store'].component).default;
  const domContainerNode = document.getElementById('react-app');

  ReactDOM.hydrate(React.createElement(component, props), domContainerNode);
}

renderApp(window['store'].props);
