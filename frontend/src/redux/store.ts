import { createStore, applyMiddleware, Action } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk, {
  ThunkMiddleware,
  ThunkDispatch,
  ThunkAction,
} from 'redux-thunk';

import reducer from './reducer';

export const configureStore = (
  preloadedState: State | undefined = undefined
) => {
  // https://github.com/zalmoxisus/redux-devtools-extension#13-use-redux-devtools-extension-package-from-npm
  const enhancer = composeWithDevTools(
    applyMiddleware(thunk as ThunkMiddleware<State>)
  );

  const store = createStore(reducer, preloadedState, enhancer);
  return store;
};

export type State = ReturnType<typeof reducer>;
export type Store = ReturnType<typeof configureStore>;
export type Dispatch = ThunkDispatch<State, undefined, Action>;
export type AsyncAction<T = void> = ThunkAction<
  Promise<T>,
  State,
  undefined,
  Action
>;
