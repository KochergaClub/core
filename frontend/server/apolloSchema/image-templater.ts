import { Resolvers } from './gen-types';

// endpoints
const TEMPLATE = 'templater';

export const resolvers: Resolvers = {
  Query: {
    imageTemplatesAll: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({
        resource: TEMPLATE,
      }),
    imageTemplateBySlug: (_, { slug }, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({
        resource: TEMPLATE,
        id: slug,
      }),
  },
};
