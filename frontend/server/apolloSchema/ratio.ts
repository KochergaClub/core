import { Resolvers } from './gen-types';

// endpoints
const TRAINING = 'ratio/training';
const TICKET = 'ratio/ticket';

export const resolvers: Resolvers = {
  Query: {
    ratioTrainings: (_, { page }, { dataSources }) =>
      dataSources.kochergaAPI.listPage({
        resource: TRAINING,
        page,
      }),
    ratioTrainingBySlug: (_, { slug }, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({ resource: TRAINING, id: slug }),
  },
  Mutation: {
    ratioAddTraining: (_, { params }, { dataSources }) =>
      dataSources.kochergaAPI.create({ resource: TRAINING, params }),
    ratioAddTicket: (_, { params }, { dataSources }) =>
      dataSources.kochergaAPI.create({ resource: TICKET, params }),
  },
  RatioTraining: {
    tickets: (parent, _, { dataSources }) =>
      dataSources.kochergaAPI.list({
        resource: `${TRAINING}/${parent.slug}/tickets`,
      }),
  },
};
