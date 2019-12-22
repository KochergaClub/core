import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory';
import cookie from 'cookie';

import { NextPage, NextPageContext } from '~/common/types';

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 */
export function withApollo(PageComponent: NextPage<any>, { ssr = true } = {}) {
  const WithApollo: NextPage<any> = ({
    apolloClient,
    apolloState,
    ...pageProps
  }) => {
    const client = apolloClient || initApolloClient(apolloState);
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

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 */
function initApolloClient(
  initialState = undefined,
  req: NextPageContext['req'] = undefined
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, req);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState);
  }

  return apolloClient;
}

/**
 * Creates and configures the ApolloClient
 */
function createApolloClient(
  initialState = {},
  req: NextPageContext['req'] = undefined
) {
  const ssrMode = typeof window === 'undefined';
  const cache = new InMemoryCache().restore(initialState);

  return new ApolloClient({
    ssrMode,
    link: ssrMode ? createServerLink(req) : createClientLink(),
    cache,
    assumeImmutableResults: true, // see https://blog.apollographql.com/whats-new-in-apollo-client-2-6-b3acf28ecad1
  });
}

function createServerLink(req: NextPageContext['req']) {
  // this is important for webpack to remove this code on client
  if (typeof window === 'undefined') {
    const { SchemaLink } = require('apollo-link-schema');
    const { KochergaAPI } = require('../../server/apolloSchema/api');
    const { schema } = require('../../server/apolloSchema');
    const { API_HOST } = require('../../server/constants');

    // req can be empty when we do the last styled-components-extracting rendering pass in _document.
    // Note that we can't pass always `apolloClient` to WithApollo props, since it can't be serialized.
    // This is ugly - it means that we do 3 rendering passes on all apollo pages, and that we create server-side ApolloClient twice.
    const cookieHeader = req ? req.headers.cookie : undefined;

    const cookies = cookie.parse(cookieHeader || '');
    const csrfToken = cookies.csrftoken as string;

    const authContext = {
      csrfToken,
      cookie: cookieHeader,
    };

    return new SchemaLink({
      schema,
      context() {
        const kochergaAPI = new KochergaAPI(API_HOST);
        kochergaAPI.initialize({ context: authContext });
        return {
          dataSources: {
            kochergaAPI,
          },
          ...authContext,
        };
      },
    });
  } else {
    throw new Error("Shouldn't be called on client side");
  }
}

function createClientLink() {
  if (typeof window === 'undefined') {
    throw new Error('Should be called on client side');
  }

  const cookies = cookie.parse(document.cookie || '');
  const csrfToken = cookies.csrftoken as string;

  const { HttpLink } = require('apollo-link-http');
  return new HttpLink({
    uri: '/graphql',
    credentials: 'same-origin',
    headers: {
      'X-CSRFToken': csrfToken,
    },
  });
}
