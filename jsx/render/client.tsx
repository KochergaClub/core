import 'react-hot-loader';

import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import Entrypoint from '~/navigation/Entrypoint';
import { configureStore } from '~/redux/store';

import { RenderContext } from './types';

declare global {
  interface Window {
    RENDER_CONTEXT: RenderContext; // populated by server
  }
}

function renderApp() {
  const domContainerNode = document.getElementById('react-app');

  const renderContext = window.RENDER_CONTEXT;
  const store = configureStore(renderContext.reduxState);

  const el = (
    <BrowserRouter>
      <Entrypoint store={store} renderContext={renderContext} />
    </BrowserRouter>
  );

  ReactDOM.hydrate(el, domContainerNode);
}

renderApp();
