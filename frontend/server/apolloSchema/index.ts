import { makeExecutableSchema } from 'graphql-tools';
import merge from 'lodash/merge';

/// <reference path="./graphql.d.ts" />

import Cm2 from './cm2.graphql';
import { resolvers as cm2Resolvers } from './cm2';

import Room from './rooms.graphql';
import { resolvers as roomResolvers } from './rooms';

import Staff from './staff.graphql';
import { resolvers as staffResolvers } from './staff';

import Auth from './auth.graphql';
import { resolvers as authResolvers } from './auth';

import Cashier from './cashier.graphql';
import { resolvers as cashierResolvers } from './cashier';

import Zadarma from './zadarma.graphql';
import { resolvers as zadarmaResolvers } from './zadarma';

import Watchmen from './watchmen.graphql';
import { resolvers as watchmenResolvers } from './watchmen';

import Ratio from './ratio.graphql';
import { resolvers as ratioResolvers } from './ratio';

import Email from './email.graphql';
import { resolvers as emailResolvers } from './email';

import ImageTemplater from './image-templater.graphql';
import { resolvers as imageTemplaterResolvers } from './image-templater';

import Now from './now.graphql';
import { resolvers as nowResolvers } from './now';

import My from './my.graphql';
import { resolvers as myResolvers } from './my';

import { default as Base } from './base.graphql';

// https://blog.apollographql.com/modularizing-your-graphql-schema-code-d7f71d5ed5f2
export const schema = makeExecutableSchema({
  typeDefs: [
    Base,
    Cm2,
    Room,
    Staff,
    Auth,
    Cashier,
    Zadarma,
    Watchmen,
    Ratio,
    Email,
    ImageTemplater,
    Now,
    My,
  ],
  // NB: there's a mismatch between codegen's Resolvers type and apollo Resolvers type.
  // It could be fixed with `useIndexSignature = true` config option to typescript-resolvers codegen plugin,
  // but it makes types too weak, so this is a lesser evil.
  resolvers: merge(
    {},
    cm2Resolvers,
    roomResolvers,
    staffResolvers,
    authResolvers,
    cashierResolvers,
    zadarmaResolvers,
    watchmenResolvers,
    ratioResolvers,
    emailResolvers,
    imageTemplaterResolvers,
    nowResolvers,
    myResolvers,
  ) as any,
});
