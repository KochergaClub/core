import { AsyncAction } from '~/redux/store';
import { selectAPI } from '~/core/selectors';

import { Member } from './types';

import { getMembers } from './api';

export const STAFF_MEMBERS_REPLACE = '[staff] MEMBERS_REPLACE';

export const replaceMembers = (members: Member[]) => ({
  type: STAFF_MEMBERS_REPLACE as typeof STAFF_MEMBERS_REPLACE,
  members,
});

export const loadMembers = (): AsyncAction<void> => async (
  dispatch,
  getState
) => {
  const api = selectAPI(getState());
  const members = await getMembers(api);
  dispatch(replaceMembers(members));
};

export type ActionTypes = ReturnType<typeof replaceMembers>;
