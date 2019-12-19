import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers } from '../src/apollo/schema';

import { RESTDataSource } from 'apollo-datasource-rest';

class KochergaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://kocherga-club.ru/api/'; // FIXME
  }

  async getAllRooms() {
    const response = await this.get('rooms');
    return response;
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    kochergaAPI: new KochergaAPI(),
  }),
});

export default apolloServer;
