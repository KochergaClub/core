import { Member } from './types';

export const replaceMembers = (members: Member[]) => ({
  type: 'STAFF_REPLACE_MEMBERS',
  members,
});

export type ActionTypes = ReturnType<typeof replaceMembers>;
