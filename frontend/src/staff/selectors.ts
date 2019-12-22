import { createSelector, Selector } from 'reselect';

import { State } from '~/redux/store';

import { Member } from './types';

export const selectMemberById = (state: State, id: number): Member => {
  return state.staff.members[id];
};

export const selectMembers: Selector<State, Member[]> = createSelector(
  [state => state.staff.members, state => state.staff.memberIdsList],
  (members, memberIdsList) => memberIdsList.map(id => members[id])
);

export const selectStaffMembersWatchmenFirst: Selector<
  State,
  Member[]
> = createSelector(selectMembers, staffMembers => {
  const watchmen = staffMembers.filter(
    member => member.is_current && member.role === 'WATCHMAN'
  );
  const otherStaff = staffMembers.filter(
    member => member.is_current && member.role !== 'WATCHMAN'
  );
  return watchmen.concat(otherStaff);
});
