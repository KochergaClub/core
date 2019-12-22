import { Resolvers } from './types';

interface Cm2CreateOrderInput {
  customer?: number;
}

interface Cm2CreateCustomerInput {
  card_id: number;
  first_name: string;
  last_name: string;
}

// endpoints
const CUSTOMER = 'cm2/customer';
const ORDER = 'cm2/orders';

export const resolvers: Resolvers = {
  Query: {
    cm2Customers: (
      _,
      { search, page }: { search?: string; page?: number },
      { dataSources }
    ) =>
      dataSources.kochergaAPI.listPage({
        resource: CUSTOMER,
        query: {
          search,
        },
        page,
      }),
    cm2Orders: (
      _,
      { status, page }: { status?: string; page?: number },
      { dataSources }
    ) =>
      dataSources.kochergaAPI.listPage({
        resource: ORDER,
        query: {
          status,
        },
        page,
      }),
    cm2Customer: (_, { id }: { id: string }, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({ resource: CUSTOMER, id }),
    cm2Order: (_, { id }: { id: string }, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({ resource: ORDER, id }),
  },
  Mutation: {
    cm2CreateOrder: (
      _,
      { params }: { params: Cm2CreateOrderInput },
      { dataSources }
    ) => dataSources.kochergaAPI.create({ resource: ORDER, params }),
    cm2CreateCustomer: (
      _,
      { params }: { params: Cm2CreateCustomerInput },
      { dataSources }
    ) => dataSources.kochergaAPI.create({ resource: CUSTOMER, params }),
    cm2CloseOrder: (_, { id }: { id: string }, { dataSources }) => {
      dataSources.kochergaAPI.postDetailsAction({
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
