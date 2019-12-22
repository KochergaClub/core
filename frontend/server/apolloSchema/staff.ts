import { Resolvers } from './gen-types';

// endpoints
const MEMBER = 'staff/member';

export const resolvers: Resolvers = {
  Query: {
    staffMembersAll: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({
        resource: MEMBER,
      }),
    staffMember: (_, { id }, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({
        resource: MEMBER,
        id,
      }),
  },
  Mutation: {
    staffGrantGooglePermissionsToMember: async (_, { id }, { dataSources }) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: MEMBER,
        id,
        action: 'grant_google_permissions',
      });
      return true;
    },
    staffFireMember: async (_, { id }, { dataSources }) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: MEMBER,
        id,
        action: 'fire',
      });
      return true;
    },
  },
};
