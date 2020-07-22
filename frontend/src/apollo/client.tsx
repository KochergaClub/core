import { useEffect } from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';

import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';

import KochergaApolloCache from './cache';
import cookie from 'cookie';

import {
  KochergaApolloClient,
  NextApolloPage,
  NextApolloPageContext,
} from './types';
import {
  CurrentUserQuery,
  CurrentUserDocument,
} from '~/auth/queries.generated';

let apolloClient: KochergaApolloClient | null = null;

const createServerLink = (req: NextApolloPageContext['req']) => {
  // this is important for webpack to remove this code on client
  if (typeof window === 'undefined') {
    const { API_HOST } = require('../../server/constants');

    // req can be empty:
    // - when we do the last styled-components-extracting rendering pass in _document.
    // - when we init apollo client from getStaticProps which doesn't have access to req.
    //
    // Note that we can't pass always `apolloClient` to WithApollo props, since it can't be serialized.
    // This is ugly - it means that we do 3 rendering passes on all apollo pages, and that we create server-side ApolloClient twice.
    // (TODO - recheck if it's true; I suspect React strict mode might actually be to blame here, and it's fixed now.)
    const cookieHeader = req ? req.headers.cookie : undefined;

    const cookies = cookie.parse(cookieHeader || '');
    const csrfToken = cookies.csrftoken as string;

    const httpLink = new HttpLink({
      uri: `http://${API_HOST}/api/graphql`,
      credentials: 'same-origin',
      headers: {
        'X-CSRFToken': csrfToken,
        Cookie: cookieHeader,
        'X-Forwarded-Host': req?.headers?.host || 'localhost',
      },
    });

    // https://www.apollographql.com/docs/react/data/subscriptions/#client-setup
    const link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      () => null, // subscriptions are not needed on server but still get invoked for some reason and cause server-side errors on backend
      httpLink
    );

    return link;
  } else {
    throw new Error("Shouldn't be called on client side");
  }
};

function createClientLink() {
  if (typeof window === 'undefined') {
    throw new Error('Should be called on client side');
  }

  const cookies = cookie.parse(document.cookie || '');
  const csrfToken = cookies.csrftoken as string;

  const httpLink = new HttpLink({
    uri: '/api/graphql',
    credentials: 'same-origin',
    headers: {
      'X-CSRFToken': csrfToken,
    },
  });

  const WS_ENDPOINT =
    (window.location.protocol === 'http:' ? 'ws://' : 'wss://') +
    window.location.host +
    '/ws/graphql';

  const wsLink = new WebSocketLink({
    uri: WS_ENDPOINT,
    options: {
      reconnect: true,
    },
  });

  // https://www.apollographql.com/docs/react/data/subscriptions/#client-setup
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink
  );
  return link;
}

/**
 * Creates and configures the ApolloClient
 */
const createApolloClient = (
  initialState = {},
  req: NextApolloPageContext['req'] = undefined
) => {
  const ssrMode = typeof window === 'undefined';
  const cache = new KochergaApolloCache().restore(initialState);

  return new ApolloClient({
    ssrMode,
    link: ssrMode ? createServerLink(req) : createClientLink(),
    cache,
    assumeImmutableResults: true, // see https://blog.apollographql.com/whats-new-in-apollo-client-2-6-b3acf28ecad1
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
      },
      query: {
        fetchPolicy: 'network-only',
      },
    },
  });
};

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
const initApolloClient = (
  initialState = undefined,
  req: NextApolloPageContext['req'] = undefined
) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, req);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);

    // avoiding refetch on client side, see https://github.com/apollographql/apollo-client/issues/4814
    apolloClient.disableNetworkFetches = true;
  }

  return apolloClient;
};

export const apolloClientForStaticProps = async () => {
  const apolloClient = initApolloClient();

  // the result is always non-authenticated user, but a lot of components still rely of this data being in apollo cache
  const currentUserQueryResult = await apolloClient.query<CurrentUserQuery>({
    query: CurrentUserDocument,
  });

  if (!currentUserQueryResult.data) {
    throw new Error('CurrentUser query failed');
  }

  return apolloClient;
};

/**
 * Creates and provides the apolloContext
 * to a Next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 */
export function withApollo(
  PageComponent: NextApolloPage<any>,
  { ssr = true } = {}
) {
  const WithApollo: NextApolloPage<any> = ({
    apolloClient,
    apolloState,
    ...pageProps
  }) => {
    const client = apolloClient || initApolloClient(apolloState);

    // reenable fetching on client-side, see https://github.com/apollographql/apollo-client/issues/4814
    useEffect(() => {
      client.disableNetworkFetches = false;
    }, [client]);

    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    );
  };

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component';

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.');
    }

    WithApollo.displayName = `withApollo(${displayName})`;
  }

  if (ssr || PageComponent.getInitialProps) {
    WithApollo.getInitialProps = async ctx => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient(
        undefined,
        ctx.req
      ));

      const currentUserQueryResult = await apolloClient.query<CurrentUserQuery>(
        {
          query: CurrentUserDocument,
        }
      );

      if (!currentUserQueryResult.data) {
        throw new Error('CurrentUser query failed');
      }

      // Run wrapped getInitialProps methods
      let pageProps = {};
      if (PageComponent.getInitialProps) {
        pageProps = await PageComponent.getInitialProps(ctx);
      }

      // Only on the server:
      if (typeof window === 'undefined') {
        // When redirecting, the response is finished.
        // No point in continuing to render
        if (ctx.res && ctx.res.finished) {
          return pageProps;
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import('@apollo/react-ssr');
            await getDataFromTree(
              <AppTree
                pageProps={{
                  ...pageProps,
                  apolloClient,
                }}
              />
            );
          } catch (error) {
            // Prevent Apollo Client GraphQL errors from crashing SSR.
            // Handle them in components via the data.error prop:
            // https://www.apollographql.com/docs/react/api/react-apollo.html#graphql-query-data-error
            console.error('Error while running `getDataFromTree`', error);
          }

          // getDataFromTree does not call componentWillUnmount
          // head side effect therefore need to be cleared manually
          Head.rewind();
        }
      }

      // Extract query data from the Apollo store
      const apolloState = apolloClient.cache.extract();

      return {
        ...pageProps,
        apolloState,
      };
    };
  }

  return WithApollo;
}
