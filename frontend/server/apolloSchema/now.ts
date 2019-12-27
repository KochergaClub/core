import { Resolvers } from './gen-types';

// endpoints
const NOW = 'people/now';

export const resolvers: Resolvers = {
  Query: {
    now: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.retrieveSingleton({
        resource: NOW,
      }),
  },
};
