import { Resolvers } from './gen-types';

import { MEMBER as STAFF_MEMBER } from './staff';

// endpoints
const CURRENT_USER = 'me';
const GROUP = 'auth/groups';
const PERMISSION = 'auth/permissions';
const USER = 'auth/users';

export const resolvers: Resolvers = {
  Query: {
    currentUser: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.retrieveSingleton({ resource: CURRENT_USER }),
    authGroupsAll: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({
        resource: GROUP,
      }),
    authPermissionsAll: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({
        resource: PERMISSION,
      }),
  },
  Mutation: {
    authAddUserToGroup: async (_, { user_id, group_id }, { dataSources }) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: GROUP,
        id: group_id,
        action: 'add_user',
        params: { user_id },
      });
      return true;
    },
    authRemoveUserFromGroup: async (
      _,
      { user_id, group_id },
      { dataSources }
    ) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: GROUP,
        id: group_id,
        action: 'remove_user',
        params: { user_id },
      });
      return true;
    },
  },
  AuthUser: {
    staff_member: (parent, _, { dataSources }) => {
      if (!parent.staff_member) {
        return null;
      }
      return dataSources.kochergaAPI
        .loader({ resource: STAFF_MEMBER })
        .load((parent.staff_member as any) as string);
    },
  },
  AuthGroup: {
    permissions: (parent, _, { dataSources }) => {
      if (!parent.permissions) {
        return [];
      }
      return parent.permissions.map(id =>
        dataSources.kochergaAPI
          .loader({ resource: PERMISSION })
          .load((id as any) as string)
      );
    },
    users: (parent, _, { dataSources }) => {
      if (!parent.users) {
        return [];
      }
      return parent.users.map(id =>
        dataSources.kochergaAPI
          .loader({ resource: USER })
          .load((id as any) as string)
      );
    },
  },
  AuthPermission: {
    users: (parent, _, { dataSources }) => {
      if (!parent.users) {
        return [];
      }
      return parent.users.map(id =>
        dataSources.kochergaAPI
          .loader({ resource: USER })
          .load((id as any) as string)
      );
    },
  },
};