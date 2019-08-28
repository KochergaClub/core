import { apiThunk } from '~/redux/action-utils';

import { groupsSlice, permissionsSlice } from './slices';
import { User, Group } from './types';

export const loadGroups = groupsSlice.actions.loadAll;
export const loadPermissions = permissionsSlice.actions.loadAll;

export const removeUserFromGroup = (group: Group, user: User) =>
  apiThunk(async (api, dispatch) => {
    await api.call(`auth/groups/${group.id}/remove_user`, 'POST', {
      user_id: user.id,
    });
    await dispatch(loadGroups());
  });
