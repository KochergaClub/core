import { Resolvers } from './gen-types';

// endpoints
const PAYMENT = 'cashier/payment-paged';

export const resolvers: Resolvers = {
  Query: {
    cashierPayments: (_, { page }, { dataSources }) =>
      dataSources.kochergaAPI.listPage({
        resource: PAYMENT,
        page,
      }),
  },
  Mutation: {
    cashierCreatePayment: async (_, { params }, { dataSources }) => {
      await dataSources.kochergaAPI.create({
        resource: PAYMENT,
        params: {
          ...params,
          whom_id: params.whom,
        },
      });
      return true;
    },
    cashierRedeemPayment: async (_, { id }, { dataSources }) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: PAYMENT,
        id,
        action: 'redeem',
      });
      return true;
    },
  },
};
