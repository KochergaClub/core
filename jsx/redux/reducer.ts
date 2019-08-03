import { State } from './types';

import { ActionTypes } from './actions';

const testReducer = (state: State, action: ActionTypes): State => {
  switch (action.type) {
    case 'TEST':
      return {
        i: state.i + 1,
      };
    default:
      return state;
  }
};

export default testReducer;
