import { Member } from './types';

interface ReplaceMembersAction {
  type: 'STAFF_REPLACE_MEMBERS';
  members: Member[];
}

type ActionTypes = ReplaceMembersAction;

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
