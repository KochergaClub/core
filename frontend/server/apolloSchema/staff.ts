import { Resolvers } from './types';

// endpoints
const MEMBER = 'staff/member';

export const resolvers: Resolvers = {
  Query: {
    staffMembersAll: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({
        resource: MEMBER,
      }),
    staffMember: (_, { id }: { id: string }, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({
        resource: MEMBER,
        id,
      }),
  },
  Mutation: {
    staffGrantGooglePermissionsToMember: async (
      _,
      { id }: { id: string },
      { dataSources }
    ) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: MEMBER,
        id,
        action: 'grant_google_permissions',
      });
      return true;
    },
    staffFireMember: async (_, { id }: { id: string }, { dataSources }) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: MEMBER,
        id,
        action: 'fire',
      });
      return true;
    },
  },
};
