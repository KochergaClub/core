import { PbxCall } from './types';
import { ShortStaffMember as StaffMember } from '~/staff/types';

export interface Action {
  type: 'UPDATE_STAFF_MEMBER';
  payload: {
    pbx_call_id: string;
    staff_member: StaffMember;
  };
}

export type Dispatch = (action: Action) => void;

type SingleState = PbxCall;

export const singleReducer = (
  state: SingleState,
  action: Action
): SingleState => {
  switch (action.type) {
    case 'UPDATE_STAFF_MEMBER':
      return {
        ...state,
        data: {
          ...state.data,
          staff_member: action.payload.staff_member,
        },
      };
    default:
      return state;
  }
};

type ListState = PbxCall[];

export const listReducer = (state: ListState, action: Action): ListState => {
  switch (action.type) {
    case 'UPDATE_STAFF_MEMBER':
      return state.map(
        call =>
          call.pbx_call_id == action.payload.pbx_call_id
            ? singleReducer(call, action)
            : call
      );
    default:
      return state;
  }
};
