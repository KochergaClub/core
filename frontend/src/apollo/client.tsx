import cookie from 'cookie';
import Head from 'next/head';
import { useEffect } from 'react';

import { ApolloClient, ApolloProvider, HttpLink, split } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';

import { CurrentUserDocument } from '~/auth/queries.generated';
import { IS_SERVER } from '~/common/utils';

import KochergaApolloCache from './cache';
import { KochergaApolloClient, NextApolloPage, NextApolloPageContext } from './types';

type CacheState = KochergaApolloClient extends ApolloClient<infer T>
  ? T
  : never;

let apolloClient: KochergaApolloClient | null = null;

const createServerLink = (req: NextApolloPageContext['req']) => {
  // this is important for webpack to remove this code on client
  if (IS_SERVER) {
    const API_HOST = process.env.DJANGO_HOST;
    if (!API_HOST) {
      throw new Error('DJANGO_HOST should be set in env');
    }

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
  if (IS_SERVER) {
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
  initialState: CacheState = {},
  req: NextApolloPageContext['req'] = undefined
) => {
  const cache = new KochergaApolloCache().restore(initialState);

  return new ApolloClient({
    ssrMode: IS_SERVER,
    link: IS_SERVER ? createServerLink(req) : createClientLink(),
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
  initialState: CacheState | undefined = undefined,
  req: NextApolloPageContext['req'] = undefined
) => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (IS_SERVER) {
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

export const apolloClientForStaticProps = async (
  req: NextApolloPageContext['req'] = undefined
) => {
  const apolloClient = initApolloClient(undefined, req);

  // the result is always non-authenticated user, but a lot of components still rely of this data being in apollo cache
  const currentUserQueryResult = await apolloClient.query({
    query: CurrentUserDocument,
  });

  if (!currentUserQueryResult.data) {
    throw new Error('CurrentUser query failed');
  }

  return apolloClient;
};

// Creates and provides the apolloContext to a Next.js PageTree.
// Use it by wrapping your PageComponent via HOC pattern.

// typing cases:
// 1) ssr, getInitialProps, P >= {}
// 2) ssr, no getInitialProps, P = {}
// 3) no ssr, P >= {}

export const withApollo = <P extends {}, IP = P>(
  PageComponent: NextApolloPage<P, IP>,
  { ssr = true } = {}
) => {
  type ApolloP = {
    apolloClient?: KochergaApolloClient;
    apolloState?: KochergaApolloClient extends ApolloClient<infer T>
      ? T
      : never;
  };
  type ExtendedP = P & ApolloP;

  type ExtendedIP = IP & ApolloP;

  const WithApollo: NextApolloPage<ExtendedP, ExtendedIP> = ({
    apolloState,
    apolloClient, // don't delete this! it'll break SSR
    ...pageProps
  }) => {
    const client = apolloClient || initApolloClient(apolloState);

    // reenable fetching on client-side, see https://github.com/apollographql/apollo-client/issues/4814
    useEffect(() => {
      client.disableNetworkFetches = false;
    }, [client]);

    return (
      <ApolloProvider client={client}>
        <PageComponent
          {
            ...(pageProps as P) /* casting because typescript is not smart enough to guess that this is ok*/
          }
        />
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
    WithApollo.getInitialProps = async (ctx) => {
      const { AppTree } = ctx;

      // Initialize ApolloClient, add it to the ctx object so
      // we can use it in `PageComponent.getInitialProp`.
      const apolloClient = (ctx.apolloClient = initApolloClient(
        undefined,
        ctx.req
      ));

      const currentUserQueryResult = await apolloClient.query({
        query: CurrentUserDocument,
      });

      if (!currentUserQueryResult.data) {
        throw new Error('CurrentUser query failed');
      }

      // Run wrapped getInitialProps methods.
      // NOTE: So, about this `any`... Sorry.
      // Some pages can use Props which are obtained via getStaticProps, and getStaticProps is unfortunately
      // a separate function and not an attribute on NextPage. It *might* be fixable with smart withApollo type unions,
      // something like: EITHER { ssr: false } OR { ssr: true } and non-empty P.
      // But I'm too lazy to try to implement it now, since we'll also need inferences to check if `getInitialProps` is
      // present, and that sounds like too much work for non-significant benefit.
      const pageProps: IP | any = PageComponent.getInitialProps
        ? await PageComponent.getInitialProps(ctx)
        : {};

      // Only on the server:
      if (IS_SERVER) {
        // When redirecting, the response is finished.
        // No point in continuing to render.
        if (ctx.res && ctx.res.finished) {
          return {
            ...pageProps,
            apolloState: {}, // to satisfy typescript
          };
        }

        // Only if ssr is enabled
        if (ssr) {
          try {
            // Run all GraphQL queries
            const { getDataFromTree } = await import(
              '@apollo/client/react/ssr'
            );
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
        apolloState,
        ...pageProps,
      };
    };
  }

  return WithApollo;
};
