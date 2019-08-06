import { Member } from './types';

import { STAFF_MEMBERS_REPLACE, ActionTypes } from './actions';

interface State {
  members: Member[];
}

const initialState = {
  members: [],
};

const reducer = (state: State = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case STAFF_MEMBERS_REPLACE:
      return {
        ...state,
        members: action.members,
      };
    default:
      return state;
  }
};

export default reducer;
