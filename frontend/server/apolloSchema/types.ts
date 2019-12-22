import { IResolvers } from 'graphql-tools';

import { KochergaAPI } from './api';

interface TContext {
  dataSources: {
    kochergaAPI: KochergaAPI;
  };
}

export type Resolvers = IResolvers<any, TContext>;
