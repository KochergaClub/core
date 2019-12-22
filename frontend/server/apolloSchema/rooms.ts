import { Resolvers } from './gen-types';

export const resolvers: Resolvers = {
  Query: {
    rooms: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({ resource: 'rooms' }),
  },
};
