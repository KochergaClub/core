import { createResourceSlice } from '~/redux/slices/resource';

import { Permission, Group } from './types';

export const permissionsSlice = createResourceSlice<Permission>({
  url: 'auth/permissions',
  actionPrefix: '[audit] PERMISSION',
});

export const groupsSlice = createResourceSlice<Group>({
  url: 'auth/groups',
  actionPrefix: '[audit] GROUP',
});
