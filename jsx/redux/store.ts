import { createStore } from 'redux';
import { devToolsEnhancer } from 'redux-devtools-extension';

import reducer from './reducer';

const store = createStore(
  reducer,
  devToolsEnhancer({}) // https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm
);
export default store;

export type State = ReturnType<typeof reducer>;
