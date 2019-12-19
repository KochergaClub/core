const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('../../apollo/schema');

const { RESTDataSource } = require('apollo-datasource-rest');

class KochergaAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://kocherga-club.ru/api/'; // FIXME
  }

  async getAllRooms() {
    const response = await this.get('rooms');
    return response.map(room => this.roomReducer(room));
  }

  roomReducer(room) {
    return room;
  }
}

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    kochergaAPI: new KochergaAPI(),
  }),
});

exports.default = apolloServer;
