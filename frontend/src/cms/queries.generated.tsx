import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type WagtailPageTypeQueryVariables = {
  path?: Types.Maybe<Types.Scalars['String']>;
  preview_token?: Types.Maybe<Types.Scalars['String']>;
};


export type WagtailPageTypeQuery = (
  { __typename?: 'Query' }
  & { wagtailPage?: Types.Maybe<(
    { __typename: 'RatioSectionIndexPage' }
    & Pick<Types.RatioSectionIndexPage, 'id'>
  ) | (
    { __typename: 'RatioSectionPage' }
    & Pick<Types.RatioSectionPage, 'id'>
  ) | (
    { __typename: 'RatioNotebookIndexPage' }
    & Pick<Types.RatioNotebookIndexPage, 'id'>
  ) | (
    { __typename: 'RatioNotebookPage' }
    & Pick<Types.RatioNotebookPage, 'id'>
  ) | (
    { __typename: 'RatioPresentationIndexPage' }
    & Pick<Types.RatioPresentationIndexPage, 'id'>
  ) | (
    { __typename: 'RatioPresentationPage' }
    & Pick<Types.RatioPresentationPage, 'id'>
  ) | (
    { __typename: 'ProjectIndexPage' }
    & Pick<Types.ProjectIndexPage, 'id'>
  ) | (
    { __typename: 'ProjectPage' }
    & Pick<Types.ProjectPage, 'id'>
  ) | (
    { __typename: 'FreeFormPage' }
    & Pick<Types.FreeFormPage, 'id'>
  ) | (
    { __typename: 'BlogPostPage' }
    & Pick<Types.BlogPostPage, 'id'>
  ) | (
    { __typename: 'BlogIndexPage' }
    & Pick<Types.BlogIndexPage, 'id'>
  ) | (
    { __typename: 'FaqPage' }
    & Pick<Types.FaqPage, 'id'>
  )> }
);

export type TildaPageQueryVariables = {
  path: Types.Scalars['String'];
};


export type TildaPageQuery = (
  { __typename?: 'Query' }
  & { tildaPage?: Types.Maybe<(
    { __typename?: 'TildaPage' }
    & Pick<Types.TildaPage, 'body' | 'title'>
    & { css: Array<(
      { __typename?: 'TildaAsset' }
      & Pick<Types.TildaAsset, 'url'>
    )>, js: Array<(
      { __typename?: 'TildaAsset' }
      & Pick<Types.TildaAsset, 'url'>
    )> }
  )> }
);


export const WagtailPageTypeDocument = gql`
    query WagtailPageType($path: String, $preview_token: String) {
  wagtailPage(path: $path, preview_token: $preview_token) {
    __typename
    id
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
export const TildaPageDocument = gql`
    query TildaPage($path: String!) {
  tildaPage(path: $path) {
    body
    title
    css {
      url
    }
    js {
      url
    }
  }
}
    `;

/**
 * __useTildaPageQuery__
 *
 * To run a query within a React component, call `useTildaPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useTildaPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTildaPageQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useTildaPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TildaPageQuery, TildaPageQueryVariables>) {
        return ApolloReactHooks.useQuery<TildaPageQuery, TildaPageQueryVariables>(TildaPageDocument, baseOptions);
      }
export function useTildaPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TildaPageQuery, TildaPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TildaPageQuery, TildaPageQueryVariables>(TildaPageDocument, baseOptions);
        }
export type TildaPageQueryHookResult = ReturnType<typeof useTildaPageQuery>;
export type TildaPageLazyQueryHookResult = ReturnType<typeof useTildaPageLazyQuery>;
export type TildaPageQueryResult = ApolloReactCommon.QueryResult<TildaPageQuery, TildaPageQueryVariables>;