import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

/// <reference path="./graphql.d.ts" />
import Cm2 from './cm2.graphql';
import { resolvers as cm2Resolvers } from './cm2';

/// <reference path="./graphql.d.ts" />
import Room from './rooms.graphql';
import { resolvers as roomResolvers } from './rooms';

/// <reference path="./graphql.d.ts" />
import Staff from './staff.graphql';
import { resolvers as staffResolvers } from './staff';

/// <reference path="./graphql.d.ts" />
import { default as Base } from './base.graphql';

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
export const schema = makeExecutableSchema({
  typeDefs: [Base, Cm2, Room, Staff],
  resolvers: merge({}, cm2Resolvers, roomResolvers, staffResolvers),
});
