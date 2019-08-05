import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, { ThunkMiddleware } from 'redux-thunk';

import reducer from './reducer';

export const configureStore = (preloadedState = undefined) => {
  // https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm
  const enhancer = composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware)
  );

  const store = createStore(reducer, preloadedState, enhancer);
  return store;
};

export type State = ReturnType<typeof reducer>;
export type Store = ReturnType<typeof configureStore>;
