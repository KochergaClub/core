import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type WagtailSearchQueryVariables = {
  input: Types.WagtailSearchInput;
};


export type WagtailSearchQuery = (
  { __typename?: 'Query' }
  & { wagtailSearch: Array<(
    { __typename?: 'BlogIndexPage' }
    & Pick<Types.BlogIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'BlogPostPage' }
    & Pick<Types.BlogPostPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'FaqPage' }
    & Pick<Types.FaqPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'FolderPage' }
    & Pick<Types.FolderPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'FreeFormPage' }
    & Pick<Types.FreeFormPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'ProjectIndexPage' }
    & Pick<Types.ProjectIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'ProjectPage' }
    & Pick<Types.ProjectPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'RatioNotebookIndexPage' }
    & Pick<Types.RatioNotebookIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'RatioNotebookPage' }
    & Pick<Types.RatioNotebookPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'RatioPresentationIndexPage' }
    & Pick<Types.RatioPresentationIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'RatioPresentationPage' }
    & Pick<Types.RatioPresentationPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'RatioSectionIndexPage' }
    & Pick<Types.RatioSectionIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename?: 'RatioSectionPage' }
    & Pick<Types.RatioSectionPage, 'id' | 'title'>
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  )> }
);


export const WagtailSearchDocument = gql`
    query WagtailSearch($input: WagtailSearchInput!) {
  wagtailSearch(input: $input) {
    id
    title
    meta {
      html_url
    }
  }
}
    `;

/**
 * __useWagtailSearchQuery__
 *
 * To run a query within a React component, call `useWagtailSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useWagtailSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWagtailSearchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useWagtailSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WagtailSearchQuery, WagtailSearchQueryVariables>) {
        return ApolloReactHooks.useQuery<WagtailSearchQuery, WagtailSearchQueryVariables>(WagtailSearchDocument, baseOptions);
      }
export function useWagtailSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WagtailSearchQuery, WagtailSearchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WagtailSearchQuery, WagtailSearchQueryVariables>(WagtailSearchDocument, baseOptions);
        }
export type WagtailSearchQueryHookResult = ReturnType<typeof useWagtailSearchQuery>;
export type WagtailSearchLazyQueryHookResult = ReturnType<typeof useWagtailSearchLazyQuery>;
export type WagtailSearchQueryResult = ApolloReactCommon.QueryResult<WagtailSearchQuery, WagtailSearchQueryVariables>;