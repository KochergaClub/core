import { AsyncAction } from '~/redux/store';
import { API } from '~/common/api';

import { Member } from './types';

import { getMembers } from './api';

export const STAFF_MEMBERS_REPLACE = '[staff] MEMBERS_REPLACE';

export const replaceMembers = (members: Member[]) => ({
  type: STAFF_MEMBERS_REPLACE as typeof STAFF_MEMBERS_REPLACE,
  members,
});

export const loadMembers = (api: API): AsyncAction<void> => async dispatch => {
  const members = await getMembers(api);
  dispatch(replaceMembers(members));
};

export type ActionTypes = ReturnType<typeof replaceMembers>;
