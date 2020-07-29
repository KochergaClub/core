import { ApolloClient } from '@apollo/client';
import { NormalizedCacheObject } from '@apollo/client/cache';

import { NextComponentType } from 'next';
import { NextPageContext } from '~/common/types';

export type KochergaApolloClient = ApolloClient<NormalizedCacheObject>;

// copy-pasted from next-js types to patch getInitialProps context type
export type NextApolloPageContext = NextPageContext & {
  apolloClient: KochergaApolloClient;
};

export type NextApolloPage<P extends {} = {}, IP = P> = NextComponentType<
  NextApolloPageContext,
  IP,
  P
>;
