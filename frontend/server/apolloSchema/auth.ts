import { Resolvers } from './gen-types';

// endpoints
const CURRENT_USER = 'me';
const GROUPS = 'auth/groups';
const PERMISSIONS = 'auth/permissions';
const USERS = 'auth/users';

export const resolvers: Resolvers = {
  Query: {
    currentUser: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({
        resource: CURRENT_USER,
      }),
    authGroupsAll: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({
        resource: GROUPS,
      }),
    authPermissionsAll: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({
        resource: PERMISSIONS,
      }),
  },
  Mutation: {
    authAddUserToGroup: async (_, { user_id, group_id }, { dataSources }) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: GROUPS,
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
        resource: GROUPS,
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
      return dataSources.kochergaAPI.retrieve({
        resource: 'staff/member', // FIXME - import { MEMBER } from './staff'
        id: parent.staff_member,
      }); // TODO - dataloader for batching
    },
  },
  AuthGroup: {
    permissions: (parent, _, { dataSources }) => {
      if (!parent.permissions) {
        return [];
      }
      return parent.permissions.map(
        id =>
          dataSources.kochergaAPI.retrieve({
            resource: PERMISSIONS,
            id,
          }) // TODO - dataloader for batching
      );
    },
    users: (parent, _, { dataSources }) => {
      if (!parent.users) {
        return [];
      }
      return parent.users.map(
        id =>
          dataSources.kochergaAPI.retrieve({
            resource: USERS,
            id,
          }) // TODO - dataloader for batching
      );
    },
  },
  AuthPermission: {
    users: (parent, _, { dataSources }) => {
      if (!parent.users) {
        return [];
      }
      return parent.users.map(
        id =>
          dataSources.kochergaAPI.retrieve({
            resource: USERS,
            id,
          }) // TODO - dataloader for batching
      );
    },
  },
};
