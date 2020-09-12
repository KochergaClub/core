import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type PageSearchItemFragment = (
  { __typename: 'PageSearchItem' }
  & { page: (
    { __typename: 'BlogIndexPage' }
    & Pick<Types.BlogIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename: 'BlogPostPage' }
    & Pick<Types.BlogPostPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename: 'FaqPage' }
    & Pick<Types.FaqPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename: 'FolderPage' }
    & Pick<Types.FolderPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename: 'FreeFormPage' }
    & Pick<Types.FreeFormPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename: 'PresentationPage' }
    & Pick<Types.PresentationPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename: 'ProjectIndexPage' }
    & Pick<Types.ProjectIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename: 'ProjectPage' }
    & Pick<Types.ProjectPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename: 'RatioNotebookIndexPage' }
    & Pick<Types.RatioNotebookIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename: 'RatioNotebookPage' }
    & Pick<Types.RatioNotebookPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename: 'RatioPresentationIndexPage' }
    & Pick<Types.RatioPresentationIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename: 'RatioSectionIndexPage' }
    & Pick<Types.RatioSectionIndexPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) | (
    { __typename: 'RatioSectionPage' }
    & Pick<Types.RatioSectionPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  ) }
);

export type EventSearchItemFragment = (
  { __typename: 'EventSearchItem' }
  & { event: (
    { __typename: 'Event' }
    & Pick<Types.Event, 'id' | 'title' | 'start'>
  ) }
);

export type SearchQueryVariables = Types.Exact<{
  input: Types.SearchInput;
}>;


export type SearchQuery = (
  { __typename: 'Query' }
  & { search: (
    { __typename: 'SearchResult' }
    & Pick<Types.SearchResult, 'more'>
    & { results: Array<(
      { __typename: 'PageSearchItem' }
      & PageSearchItemFragment
    ) | (
      { __typename: 'EventSearchItem' }
      & EventSearchItemFragment
    )> }
  ) }
);

export const PageSearchItemFragmentDoc = gql`
    fragment PageSearchItem on PageSearchItem {
  page {
    id
    title
    meta {
      html_url
    }
  }
}
    `;
export const EventSearchItemFragmentDoc = gql`
    fragment EventSearchItem on EventSearchItem {
  event {
    id
    title
    start
  }
}
    `;
export const SearchDocument = gql`
    query Search($input: SearchInput!) {
  search(input: $input) {
    results {
      ...PageSearchItem
      ...EventSearchItem
    }
    more
  }
}
    ${PageSearchItemFragmentDoc}
${EventSearchItemFragmentDoc}`;

/**
 * __useSearchQuery__
 *
 * To run a query within a React component, call `useSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSearchQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchQuery, SearchQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchQuery, SearchQueryVariables>(SearchDocument, baseOptions);
      }
export function useSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchQuery, SearchQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchQuery, SearchQueryVariables>(SearchDocument, baseOptions);
        }
export type SearchQueryHookResult = ReturnType<typeof useSearchQuery>;
export type SearchLazyQueryHookResult = ReturnType<typeof useSearchLazyQuery>;
export type SearchQueryResult = ApolloReactCommon.QueryResult<SearchQuery, SearchQueryVariables>;