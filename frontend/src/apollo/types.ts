import { ApolloClient } from '@apollo/client';
import { NormalizedCacheObject } from '@apollo/client/cache';

import { NextPageContext } from '~/common/types';

export type KochergaApolloClient = ApolloClient<NormalizedCacheObject>;

// copy-pasted from next-js types to patch getInitialProps context type
export type NextApolloPageContext = NextPageContext & {
  apolloClient: KochergaApolloClient;
};

export type NextApolloPage<P = {}, IP = P> = {
  (props: P): JSX.Element | null;
  defaultProps?: Partial<P>;
  displayName?: string;
  getInitialProps?(ctx: NextApolloPageContext): Promise<IP>;
};
