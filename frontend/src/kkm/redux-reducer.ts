import { Reducer } from 'redux';

import { KKM_PASSWORD_SET, ActionTypes } from './actions';

interface KkmState {
  password: string | undefined;
}

const initialState: KkmState = { password: undefined };

const reducer: Reducer<KkmState, ActionTypes> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case KKM_PASSWORD_SET:
      return {
        ...state,
        password: action.payload,
      };
    default:
      return state;
  }
};
export default reducer;
