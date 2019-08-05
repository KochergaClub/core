import {
  useReducer,
  Reducer,
  ReducerState,
  Dispatch,
  ReducerAction,
} from 'react';

// Code from https://blog.solutelabs.com/configuring-thunk-action-creators-and-redux-dev-tools-with-reacts-usereducer-hook-5a1608476812.
// Types copied from @types/react.
function useReducerWithThunk<R extends Reducer<any, any>, I>(
  reducer: R,
  initializerArg: I & ReducerState<R>,
  initializer: (arg: I & ReducerState<R>) => ReducerState<R>
): [ReducerState<R>, Dispatch<ReducerAction<R>>] {
  const [state, dispatch] = useReducer(reducer, initializerArg, initializer);

  const customDispatch: Dispatch<ReducerAction<R>> = action => {
    if (typeof action === 'function') {
      action(customDispatch);
    } else {
      dispatch(action);
    }
  };

  return [state, customDispatch];
}

export default useReducerWithThunk;
