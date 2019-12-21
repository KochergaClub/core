import gql from 'graphql-tag';
import { RESTDataSource, RequestOptions } from 'apollo-datasource-rest';
import { makeExecutableSchema, IResolvers } from 'graphql-tools';
import { buildQueryString } from '../common/utils';

export const typeDefs = gql`
  type Query {
    rooms: [Room]!
    cm2Customers(search: String): Cm2CustomerConnection!
    cm2Orders(status: String): Cm2OrderConnection!
    cm2Customer(id: ID): Cm2Customer!
    cm2Order(id: ID): Cm2Order!
  }

  type Room {
    name: String
    max_people: Int
    area: Int
  }

  type Cm2CustomerConnection {
    hasNextPage: Boolean!
    items: [Cm2Customer!]!
  }

  type Cm2Customer {
    id: ID!
    card_id: Int!
    first_name: String!
    last_name: String!
  }

  type Cm2OrderConnection {
    hasNextPage: Boolean!
    items: [Cm2Order!]!
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

  // generic methods
  async list({
    resource,
    query,
  }: {
    resource: string;
    query?: { [s: string]: string };
  }) {
    let url = resource;
    if (query) {
      url += '?' + buildQueryString(query);
    }
    return await this.get(url);
  }

  async listPage({
    resource,
    query,
  }: {
    resource: string;
    query?: { [s: string]: string };
  }) {
    let url = resource;
    if (query) {
      url += '?' + buildQueryString(query);
    }
    const response = await this.get(url);
    return {
      hasNextPage: Boolean(response.next),
      items: response.results,
    };
  }

  async retrieve({ resource, id }: { resource: string; id: string }) {
    const response = await this.get(`${resource}/${id}`);
    return response;
  }

  async create({ resource, params }: { resource: string; params: object }) {
    const response = await this.post(resource, params);
    return response;
  }

  async postAction({
    resource,
    action,
    params,
  }: {
    resource: string;
    action: string;
    params?: object;
  }) {
    const response = await this.post(`${resource}/${action}`, params);
    return response;
  }

  async postDetailsAction({
    resource,
    id,
    action,
    params,
  }: {
    resource: string;
    id: string;
    action: string;
    params?: object;
  }) {
    const response = await this.post(`${resource}/${id}/${action}`, params);
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
    rooms: (_, __, { dataSources }) =>
      dataSources.kochergaAPI.list({ resource: 'rooms' }),
    cm2Customers: (_, { search }: { search?: string }, { dataSources }) =>
      dataSources.kochergaAPI.listPage({
        resource: 'cm2/customer',
        query: {
          ...(search ? { search } : {}),
        },
      }),
    cm2Orders: (_, { status }: { status?: string }, { dataSources }) =>
      dataSources.kochergaAPI.listPage({
        resource: 'cm2/orders',
        query: {
          ...(status ? { status } : {}),
        },
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

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});
