import { Resolvers } from './types';

interface Cm2CreateOrderInput {
  customer?: number;
}

interface Cm2CreateCustomerInput {
  card_id: number;
  first_name: string;
  last_name: string;
}

export const resolvers: Resolvers = {
  Query: {
    cm2Customers: (
      _,
      { search, page }: { search?: string; page?: number },
      { dataSources }
    ) =>
      dataSources.kochergaAPI.listPage({
        resource: 'cm2/customer',
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
        resource: 'cm2/orders',
        query: {
          status,
        },
        page,
      }),
    cm2Customer: (_, { id }: { id: string }, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({ resource: 'cm2/customer', id }),
    cm2Order: (_, { id }: { id: string }, { dataSources }) =>
      dataSources.kochergaAPI.retrieve({ resource: 'cm2/orders', id }),
  },
  Mutation: {
    cm2CreateOrder: (
      _,
      { params }: { params: Cm2CreateOrderInput },
      { dataSources }
    ) => dataSources.kochergaAPI.create({ resource: 'cm2/orders', params }),
    cm2CreateCustomer: (
      _,
      { params }: { params: Cm2CreateCustomerInput },
      { dataSources }
    ) => dataSources.kochergaAPI.create({ resource: 'cm2/customer', params }),
    cm2CloseOrder: (_, { id }: { id: string }, { dataSources }) => {
      dataSources.kochergaAPI.postDetailsAction({
        resource: 'cm2/orders',
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
        resource: 'cm2/customer',
        id: parent.customer,
      }); // TODO - dataloader for batching
    },
  },
};
