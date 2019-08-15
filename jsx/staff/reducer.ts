import { Member } from './types';

import {
  STAFF_MEMBERS_REPLACE,
  STAFF_MEMBER_REPLACE,
  STAFF_MEMBER_SET_AND_VIEW,
  ActionTypes,
} from './actions';

interface State {
  members: { [k: number]: Member };
  memberIdsList: number[];
  allMembersLoaded: boolean;
  viewingMember?: number;
}

const initialState: State = {
  members: {},
  memberIdsList: [],
  allMembersLoaded: false,
};

const reducer = (state: State = initialState, action: ActionTypes): State => {
  switch (action.type) {
    case STAFF_MEMBERS_REPLACE:
      const membersObj: State['members'] = {};
      action.payload.forEach(m => (membersObj[m.id] = m));

      return {
        ...state,
        members: membersObj,
        memberIdsList: action.payload.map(m => m.id),
        allMembersLoaded: true,
      };
    case STAFF_MEMBER_REPLACE:
      return {
        ...state,
        members: {
          ...state.members,
          [action.payload.id]: action.payload,
        },
      };
    case STAFF_MEMBER_SET_AND_VIEW:
      return {
        ...state,
        members: {
          ...state.members,
          [action.payload.id]: action.payload,
        },
        viewingMember: action.payload.id,
      };
    default:
      return state;
  }
};

export default reducer;
