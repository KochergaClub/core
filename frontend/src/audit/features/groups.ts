import { createResourceFeature } from '~/redux/features';
import { apiThunk } from '~/redux/action-utils';

import { Member } from '~/staff/types';

import { User, Group } from '../types';

const feature = createResourceFeature<Group>({
  name: 'audit/groups',
  endpoint: 'auth/groups',
});

/**************** thunks **************/
export const loadGroups = feature.thunks.load;

export const removeUserFromGroup = (group: Group, user: User) =>
  apiThunk(async (api, dispatch) => {
    await api.call(`auth/groups/${group.id}/remove_user`, 'POST', {
      user_id: user.id,
    });
    await dispatch(loadGroups());
  });

export const addMemberToGroup = (group: Group, member: Member) =>
  apiThunk(async (api, dispatch) => {
    await api.call(`auth/groups/${group.id}/add_user`, 'POST', {
      user_id: member.user_id,
    });
    await dispatch(loadGroups());
  });

/**************** selectors **************/
export const selectGroups = feature.selectors.asList;

export default feature.slice;
