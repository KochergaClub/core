import gql from 'graphql-tag';
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';

export const typeDefs = gql`
  type Query {
    rooms: [Room]!
    cm2Customers(search: String): [Cm2Customer]
    cm2Orders(status: String): [Cm2Order]
    cm2Customer(id: ID): Cm2Customer
    cm2Order(id: ID): Cm2Order
  }

  type Room {
    name: String
    max_people: Int
    area: Int
  }

  type Cm2Customer {
    id: ID!
    card_id: Int!
    first_name: String!
    last_name: String!
  }

  type Cm2Order {
    id: ID!
    start: String! # FIXME
    end: String # FIXME
    value: Int
    customer: Cm2Customer
  }

  input Cm2CreateOrderInput {
    customer: ID
  }

  input Cm2CreateCustomerInput {
    card_id: Int!
    first_name: String!
    last_name: String!
  }

  type Mutation {
    cm2CreateOrder(params: Cm2CreateOrderInput!): Cm2Order!
    cm2CreateCustomer(params: Cm2CreateCustomerInput!): Cm2Customer!
    cm2CloseOrder(id: ID!): Boolean
  }
`;

interface Cm2CreateOrderInput {
  customer?: number;
}

interface Cm2CreateCustomerInput {
  card_id: number;
  first_name: string;
  last_name: string;
}

export class KochergaAPI extends RESTDataSource {
  constructor(host: string) {
    super();
    this.baseURL = 'http://' + host + '/api';
  }

  willSendRequest(request: RequestOptions) {
    if (this.context.cookie) {
      request.headers.set('Cookie', this.context.cookie);
    }
    if (this.context.csrfToken) {
      request.headers.set('X-CSRFToken', this.context.csrfToken);
    }
  }

  async getAllRooms() {
    const response = await this.get('rooms');
    return response;
  }

  async cm2OrderById(id: string) {
    const response = await this.get(`cm2/orders/${id}`);
    return response;
  }

  async cm2Orders({ status }: { status?: string }) {
    let url = 'cm2/orders';
    if (status) {
      url += `?status=${status}`;
    }
    const response = await this.get(url);
    return response.results;
  }

  async cm2CustomerById(id: string) {
    const response = await this.get(`cm2/customer/${id}`);
    return response;
  }

  async cm2Customers({ search }: { search?: string }) {
    let url = 'cm2/customer';
    if (search) {
      url += `?search=${search}`;
    }
    const response = await this.get(url);
    return response.results;
  }

  async cm2CreateOrder({ customer }: Cm2CreateOrderInput) {
    const response = await this.post('cm2/orders', { customer });
    return response;
  }

  async cm2CloseOrder(id: string) {
    await this.post(`cm2/orders/${id}/close`);
    return true;
  }

  async cm2CreateCustomer({
    card_id,
    first_name,
    last_name,
  }: Cm2CreateCustomerInput) {
    const response = await this.post('cm2/customer', {
      card_id,
      first_name,
      last_name,
    });
    return response;
  }
}

interface TContext {
  dataSources: {
    kochergaAPI: KochergaAPI;
  };
}

export const resolvers: IResolvers<any, TContext> = {
  Query: {
    rooms: (_, __, { dataSources }) => dataSources.kochergaAPI.getAllRooms(),
    cm2Customers: (_, { search }: { search?: string }, { dataSources }) =>
      dataSources.kochergaAPI.cm2Customers({ search }),
    cm2Orders: (_, { status }: { status?: string }, { dataSources }) =>
      dataSources.kochergaAPI.cm2Orders({ status }),
    cm2Customer: (_, { id }: { id: string }, { dataSources }) =>
      dataSources.kochergaAPI.cm2CustomerById(id),
    cm2Order: (_, { id }: { id: string }, { dataSources }) =>
      dataSources.kochergaAPI.cm2OrderById(id),
  },
  Mutation: {
    cm2CreateOrder: (
      _,
      { params }: { params: Cm2CreateOrderInput },
      { dataSources }
    ) => dataSources.kochergaAPI.cm2CreateOrder(params),
    cm2CreateCustomer: (
      _,
      { params }: { params: Cm2CreateCustomerInput },
      { dataSources }
    ) => dataSources.kochergaAPI.cm2CreateCustomer(params),
    cm2CloseOrder: (_, { id }: { id: string }, { dataSources }) =>
      dataSources.kochergaAPI.cm2CloseOrder(id),
  },
  Cm2Order: {
    customer: (parent, _, { dataSources }) => {
      if (!parent.customer) {
        return null;
      }
      return dataSources.kochergaAPI.cm2CustomerById(parent.customer); // TODO - dataloader for batching
    },
  },
};

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
