import { Resolvers } from './gen-types';

// endpoints
const CUSTOMER = 'cm2/customer';
const ORDER = 'cm2/orders';

export const resolvers: Resolvers = {
  Query: {
    cm2Customers: (_, { search, page }, { dataSources }) =>
      dataSources.kochergaAPI.listPage({
        resource: CUSTOMER,
        query: {
          search,
        },
        page,
      }),
    cm2Orders: (_, { status, page }, { dataSources }) =>
      dataSources.kochergaAPI.listPage({
        resource: ORDER,
        query: {
          status,
        },
        page,
      }),
    cm2Customer: (_, { id }, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({ resource: CUSTOMER, id }),
    cm2Order: (_, { id }, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({ resource: ORDER, id }),
  },
  Mutation: {
    cm2CreateOrder: (_, { params }, { dataSources }) =>
      dataSources.kochergaAPI.create({ resource: ORDER, params }),
    cm2CreateCustomer: (_, { params }, { dataSources }) =>
      dataSources.kochergaAPI.create({ resource: CUSTOMER, params }),
    cm2CloseOrder: async (_, { id }, { dataSources }) => {
      await dataSources.kochergaAPI.postDetailsAction({
        resource: ORDER,
        id,
        action: 'close',
      });
      return true;
    },
  },
  Cm2Order: {
    customer: (parent, _, { dataSources }) => {
      if (!parent.customer) {
        return null;
      }
      return dataSources.kochergaAPI.retrieve({
        resource: CUSTOMER,
        id: parent.customer,
      }); // TODO - dataloader for batching
    },
  },
  Cm2Customer: {
    orders: (parent, _, { dataSources }) =>
      dataSources.kochergaAPI.listPage({
        resource: ORDER,
        query: {
          customer_id: parent.id,
        },
      }),
  },
};
