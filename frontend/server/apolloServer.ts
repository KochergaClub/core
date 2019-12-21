import { ApolloServer } from 'apollo-server-express';
import { typeDefs, resolvers, KochergaAPI } from '../src/apollo/schema';
import { API_HOST } from './constants';

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    kochergaAPI: new KochergaAPI(API_HOST),
  }),
  context({ req }) {
    return {
      csrfToken: req.headers['x-csrftoken'],
      cookie: req.headers['cookie'],
    };
  },
});

export default apolloServer;
