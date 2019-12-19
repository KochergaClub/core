import { gql } from 'apollo-server-express';

export const typeDefs = gql`
  type Query {
    rooms: [Room]!
  }

  type Room {
    name: String
    max_people: Int
    area: Int
  }
`;

export const resolvers = {
  Query: {
    rooms: (_: any, __: any, { dataSources }: { dataSources: any }) =>
      dataSources.kochergaAPI.getAllRooms(),
  },
};
