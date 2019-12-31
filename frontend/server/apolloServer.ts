//import { ApolloServer } from 'apollo-server-express';
//import { schema } from './apolloSchema';
//import { KochergaAPI } from './apolloSchema/api';
//import { API_HOST } from './constants';
//
//const apolloServer = new ApolloServer({
//  schema,
//  dataSources: () => ({
//    kochergaAPI: new KochergaAPI(API_HOST),
//  }),
//  context({ req }) {
//    return {
//      csrfToken: req.headers['x-csrftoken'],
//      cookie: req.headers['cookie'],
//      realHost: req.headers['host'],
//    };
//  },
//});
//
//export default apolloServer;

export default 42;
