import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import reducer from './reducer';

export const configureStore = (preloadedState = undefined) => {
  const store = createStore(
    reducer,
    preloadedState,
    devToolsEnhancer({}) // https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm
  );
  return store;
};

export type State = ReturnType<typeof reducer>;
