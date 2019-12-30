import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

/// <reference path="./graphql.d.ts" />

import Room from './rooms.graphql';
import { resolvers as roomResolvers } from './rooms';

import Email from './email.graphql';
import { resolvers as emailResolvers } from './email';

import Now from './now.graphql';
import { resolvers as nowResolvers } from './now';

import My from './my.graphql';
import { resolvers as myResolvers } from './my';

import Kkm from './kkm.graphql';
import { resolvers as kkmResolvers } from './kkm';

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
export const schema = makeExecutableSchema({
  typeDefs: [Room, Email, Now, My, Kkm],
  // NB: there's a mismatch between codegen's Resolvers type and apollo Resolvers type.
  // It could be fixed with `useIndexSignature = true` config option to typescript-resolvers codegen plugin,
  // but it makes types too weak, so this is a lesser evil.
  resolvers: merge(
    {},
    roomResolvers,
    emailResolvers,
    nowResolvers,
    myResolvers,
    kkmResolvers
  ) as any,
});
