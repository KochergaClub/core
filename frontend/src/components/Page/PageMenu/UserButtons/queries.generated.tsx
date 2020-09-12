import * as Types from '../../../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type WagtailEditablePageQueryVariables = Types.Exact<{
  path: Types.Scalars['String'];
}>;


export type WagtailEditablePageQuery = (
  { __typename: 'Query' }
  & { wagtailPage?: Types.Maybe<(
    { __typename: 'BlogIndexPage' }
    & Pick<Types.BlogIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'BlogPostPage' }
    & Pick<Types.BlogPostPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'FaqPage' }
    & Pick<Types.FaqPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'FolderPage' }
    & Pick<Types.FolderPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'FreeFormPage' }
    & Pick<Types.FreeFormPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'PresentationPage' }
    & Pick<Types.PresentationPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'ProjectIndexPage' }
    & Pick<Types.ProjectIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'ProjectPage' }
    & Pick<Types.ProjectPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'RatioNotebookIndexPage' }
    & Pick<Types.RatioNotebookIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'RatioNotebookPage' }
    & Pick<Types.RatioNotebookPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'RatioPresentationIndexPage' }
    & Pick<Types.RatioPresentationIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'RatioSectionIndexPage' }
    & Pick<Types.RatioSectionIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'RatioSectionPage' }
    & Pick<Types.RatioSectionPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  )> }
);


export const WagtailEditablePageDocument = gql`
    query WagtailEditablePage($path: String!) {
  wagtailPage(path: $path) {
    id
    meta {
      permissions {
        can_edit
      }
    }
  }
}
    `;

/**
 * __useWagtailEditablePageQuery__
 *
 * To run a query within a React component, call `useWagtailEditablePageQuery` and pass it any options that fit your needs.
 * When your component renders, `useWagtailEditablePageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWagtailEditablePageQuery({
 *   variables: {
 *      path: // value for 'path'
 *   },
 * });
 */
export function useWagtailEditablePageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WagtailEditablePageQuery, WagtailEditablePageQueryVariables>) {
        return ApolloReactHooks.useQuery<WagtailEditablePageQuery, WagtailEditablePageQueryVariables>(WagtailEditablePageDocument, baseOptions);
      }
export function useWagtailEditablePageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WagtailEditablePageQuery, WagtailEditablePageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WagtailEditablePageQuery, WagtailEditablePageQueryVariables>(WagtailEditablePageDocument, baseOptions);
        }
export type WagtailEditablePageQueryHookResult = ReturnType<typeof useWagtailEditablePageQuery>;
export type WagtailEditablePageLazyQueryHookResult = ReturnType<typeof useWagtailEditablePageLazyQuery>;
export type WagtailEditablePageQueryResult = ApolloReactCommon.QueryResult<WagtailEditablePageQuery, WagtailEditablePageQueryVariables>;