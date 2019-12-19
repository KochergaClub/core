const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    rooms: [Room]!
  }

  type Room {
    name: String
    max_people: Int
    area: Int
  }
`;

const resolvers = {
  Query: {
    rooms: (_, __, { dataSources }) => dataSources.kochergaAPI.getAllRooms(),
  },
};

module.exports = { typeDefs, resolvers };
