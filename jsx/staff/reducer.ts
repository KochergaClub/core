import { Member } from './types';

import { ActionTypes } from './actions';

interface State {
  members: Member[];
}

const initialState = {
  members: [],
};

const reducer = (state: State = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case 'STAFF_REPLACE_MEMBERS':
      return {
        ...state,
        members: action.members,
      };
    default:
      return state;
  }
};

export default reducer;
