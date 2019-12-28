import { Resolvers } from './gen-types';

// endpoints
const KKM = 'cashier/kkm';

export const resolvers: Resolvers = {
  Mutation: {
    kkmRegisterCheck: async (_, { params }, { dataSources }) => {
      const result = await dataSources.kochergaAPI.postResourceAction({
        resource: KKM,
        action: 'register_check',
        params,
      });
      return result;
    },
  },
};
