import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type WagtailPageTypeQueryVariables = {
  path?: Types.Maybe<Types.Scalars['String']>,
  preview_token?: Types.Maybe<Types.Scalars['String']>
};


export type WagtailPageTypeQuery = (
  { __typename?: 'Query' }
  & { wagtailPage: Types.Maybe<{ __typename: 'ProjectPage' } | { __typename: 'RatioSectionIndexPage' } | { __typename: 'RatioSectionPage' } | { __typename: 'RatioNotebookPage' } | { __typename: 'ProjectIndexPage' } | { __typename: 'FreeFormPage' } | { __typename: 'BlogPostPage' } | { __typename: 'BlogIndexPage' } | { __typename: 'FaqPage' }> }
);


export const WagtailPageTypeDocument = gql`
    query WagtailPageType($path: String, $preview_token: String) {
  wagtailPage(path: $path, preview_token: $preview_token) {
    __typename
  }
}
    `;

/**
 * __useWagtailPageTypeQuery__
 *
 * To run a query within a React component, call `useWagtailPageTypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useWagtailPageTypeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWagtailPageTypeQuery({
 *   variables: {
 *      path: // value for 'path'
 *      preview_token: // value for 'preview_token'
 *   },
 * });
 */
export function useWagtailPageTypeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WagtailPageTypeQuery, WagtailPageTypeQueryVariables>) {
        return ApolloReactHooks.useQuery<WagtailPageTypeQuery, WagtailPageTypeQueryVariables>(WagtailPageTypeDocument, baseOptions);
      }
export function useWagtailPageTypeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WagtailPageTypeQuery, WagtailPageTypeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WagtailPageTypeQuery, WagtailPageTypeQueryVariables>(WagtailPageTypeDocument, baseOptions);
        }
export type WagtailPageTypeQueryHookResult = ReturnType<typeof useWagtailPageTypeQuery>;
export type WagtailPageTypeLazyQueryHookResult = ReturnType<typeof useWagtailPageTypeLazyQuery>;
export type WagtailPageTypeQueryResult = ApolloReactCommon.QueryResult<WagtailPageTypeQuery, WagtailPageTypeQueryVariables>;