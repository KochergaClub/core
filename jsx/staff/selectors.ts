import { State } from '~/redux/store';

import { Member } from './types';

export const selectMembers = (state: State): Member[] => state.staff.members;

export const selectStaffMembersWatchmenFirst = (state: State): Member[] => {
  const staffMembers = selectMembers(state);

  const watchmen = staffMembers.filter(
    member => member.is_current && member.role === 'WATCHMAN'
  );
  const otherStaff = staffMembers.filter(
    member => member.is_current && member.role !== 'WATCHMAN'
  );

  return watchmen.concat(otherStaff);
};
