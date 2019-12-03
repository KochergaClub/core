import { AsyncAction } from '~/redux/store';
import { selectAPI } from '~/core/selectors';

import { Member } from './types';

import { getMembers, getMember } from './api';

export const STAFF_MEMBERS_REPLACE = '[staff] MEMBERS_REPLACE';
export const STAFF_MEMBER_REPLACE = '[staff] MEMBER_REPLACE';
export const STAFF_MEMBER_SET_AND_VIEW = '[staff] MEMBERS_SET_AND_VIEW';

export const replaceMembers = (members: Member[]) => ({
  type: STAFF_MEMBERS_REPLACE as typeof STAFF_MEMBERS_REPLACE,
  payload: members,
});

export const replaceMember = (member: Member) => ({
  type: STAFF_MEMBER_REPLACE as typeof STAFF_MEMBER_REPLACE,
  payload: member,
});

export const setAndViewMember = (member: Member) => ({
  type: STAFF_MEMBER_SET_AND_VIEW as typeof STAFF_MEMBER_SET_AND_VIEW,
  payload: member,
});

export const loadMembers = (): AsyncAction<void> => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());
  const members = await getMembers(api);
  dispatch(replaceMembers(members));
};

export const fetchAndViewMember = (id: number): AsyncAction<void> => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());
  const member = await getMember(api, id);
  dispatch(setAndViewMember(member));
};

export const fireMember = (member: Member): AsyncAction<void> => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());
  await api.call(`staff/member/${member.id}/fire`, 'POST');
  const memberUpdated = await getMember(api, member.id);
  await dispatch(replaceMember(memberUpdated));
};

export type ActionTypes =
  | ReturnType<typeof replaceMembers>
  | ReturnType<typeof replaceMember>
  | ReturnType<typeof setAndViewMember>;
