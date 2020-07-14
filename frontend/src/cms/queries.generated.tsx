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
    { __typename: 'BlogIndexPage' }
    & Pick<Types.BlogIndexPage, 'id'>
  ) | (
    { __typename: 'BlogPostPage' }
    & Pick<Types.BlogPostPage, 'id'>
  ) | (
    { __typename: 'FaqPage' }
    & Pick<Types.FaqPage, 'id'>
  ) | (
    { __typename: 'FolderPage' }
    & Pick<Types.FolderPage, 'id'>
  ) | (
    { __typename: 'FreeFormPage' }
    & Pick<Types.FreeFormPage, 'id'>
  ) | (
    { __typename: 'ProjectIndexPage' }
    & Pick<Types.ProjectIndexPage, 'id'>
  ) | (
    { __typename: 'ProjectPage' }
    & Pick<Types.ProjectPage, 'id'>
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
    { __typename: 'RatioSectionIndexPage' }
    & Pick<Types.RatioSectionIndexPage, 'id'>
  ) | (
    { __typename: 'RatioSectionPage' }
    & Pick<Types.RatioSectionPage, 'id'>
  )> }
);

export type TildaPageQueryVariables = {
  path: Types.Scalars['String'];
};


export type TildaPageQuery = (
  { __typename?: 'Query' }
  & { tildaPage?: Types.Maybe<(
    { __typename?: 'TildaPage' }
    & Pick<Types.TildaPage, 'body' | 'title' | 'description' | 'show_header_and_footer'>
    & { css: Array<(
      { __typename?: 'TildaAsset' }
      & Pick<Types.TildaAsset, 'url'>
    )>, js: Array<(
      { __typename?: 'TildaAsset' }
      & Pick<Types.TildaAsset, 'url'>
    )> }
  )> }
);

export type TildaPagesQueryVariables = {};


export type TildaPagesQuery = (
  { __typename?: 'Query' }
  & { tildaPages: Array<(
    { __typename?: 'TildaPage' }
    & Pick<Types.TildaPage, 'path'>
  )> }
);

export type WagtailPagesQueryVariables = {};


export type WagtailPagesQuery = (
  { __typename?: 'Query' }
  & { wagtailPages: Array<(
    { __typename?: 'BlogIndexPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'BlogPostPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'FaqPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'FolderPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'FreeFormPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'ProjectIndexPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'ProjectPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'RatioNotebookIndexPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'RatioNotebookPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'RatioPresentationIndexPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'RatioPresentationPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'RatioSectionIndexPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'RatioSectionPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
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
    description
    show_header_and_footer
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
export const TildaPagesDocument = gql`
    query TildaPages {
  tildaPages {
    path
  }
}
    `;

/**
 * __useTildaPagesQuery__
 *
 * To run a query within a React component, call `useTildaPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useTildaPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTildaPagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useTildaPagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TildaPagesQuery, TildaPagesQueryVariables>) {
        return ApolloReactHooks.useQuery<TildaPagesQuery, TildaPagesQueryVariables>(TildaPagesDocument, baseOptions);
      }
export function useTildaPagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TildaPagesQuery, TildaPagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TildaPagesQuery, TildaPagesQueryVariables>(TildaPagesDocument, baseOptions);
        }
export type TildaPagesQueryHookResult = ReturnType<typeof useTildaPagesQuery>;
export type TildaPagesLazyQueryHookResult = ReturnType<typeof useTildaPagesLazyQuery>;
export type TildaPagesQueryResult = ApolloReactCommon.QueryResult<TildaPagesQuery, TildaPagesQueryVariables>;
export const WagtailPagesDocument = gql`
    query WagtailPages {
  wagtailPages {
    meta {
      html_url
    }
  }
}
    `;

/**
 * __useWagtailPagesQuery__
 *
 * To run a query within a React component, call `useWagtailPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWagtailPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWagtailPagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useWagtailPagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WagtailPagesQuery, WagtailPagesQueryVariables>) {
        return ApolloReactHooks.useQuery<WagtailPagesQuery, WagtailPagesQueryVariables>(WagtailPagesDocument, baseOptions);
      }
export function useWagtailPagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WagtailPagesQuery, WagtailPagesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WagtailPagesQuery, WagtailPagesQueryVariables>(WagtailPagesDocument, baseOptions);
        }
export type WagtailPagesQueryHookResult = ReturnType<typeof useWagtailPagesQuery>;
export type WagtailPagesLazyQueryHookResult = ReturnType<typeof useWagtailPagesLazyQuery>;
export type WagtailPagesQueryResult = ApolloReactCommon.QueryResult<WagtailPagesQuery, WagtailPagesQueryVariables>;