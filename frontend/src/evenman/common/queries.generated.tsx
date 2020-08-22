import * as Types from '../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type EvenmanProjectsListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanProjectsListQuery = (
  { __typename: 'Query' }
  & { projects: Array<(
    { __typename: 'ProjectPage' }
    & Pick<Types.ProjectPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'slug'>
    ) }
  )> }
);

export type EvenmanVkGroupsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanVkGroupsQuery = (
  { __typename: 'Query' }
  & { vkGroups: Array<(
    { __typename: 'VkGroup' }
    & Pick<Types.VkGroup, 'name'>
  )> }
);

export type EvenmanTimepadCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanTimepadCategoriesQuery = (
  { __typename: 'Query' }
  & { timepadCategories: Array<(
    { __typename: 'TimepadCategory' }
    & Pick<Types.TimepadCategory, 'id' | 'code' | 'name'>
  )> }
);


export const EvenmanProjectsListDocument = gql`
    query EvenmanProjectsList {
  projects {
    id
    meta {
      slug
    }
  }
}
    `;

/**
 * __useEvenmanProjectsListQuery__
 *
 * To run a query within a React component, call `useEvenmanProjectsListQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanProjectsListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanProjectsListQuery({
 *   variables: {
 *   },
 * });
 */
export function useEvenmanProjectsListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanProjectsListQuery, EvenmanProjectsListQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanProjectsListQuery, EvenmanProjectsListQueryVariables>(EvenmanProjectsListDocument, baseOptions);
      }
export function useEvenmanProjectsListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanProjectsListQuery, EvenmanProjectsListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanProjectsListQuery, EvenmanProjectsListQueryVariables>(EvenmanProjectsListDocument, baseOptions);
        }
export type EvenmanProjectsListQueryHookResult = ReturnType<typeof useEvenmanProjectsListQuery>;
export type EvenmanProjectsListLazyQueryHookResult = ReturnType<typeof useEvenmanProjectsListLazyQuery>;
export type EvenmanProjectsListQueryResult = ApolloReactCommon.QueryResult<EvenmanProjectsListQuery, EvenmanProjectsListQueryVariables>;
export const EvenmanVkGroupsDocument = gql`
    query EvenmanVkGroups {
  vkGroups {
    name
  }
}
    `;

/**
 * __useEvenmanVkGroupsQuery__
 *
 * To run a query within a React component, call `useEvenmanVkGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanVkGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanVkGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEvenmanVkGroupsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanVkGroupsQuery, EvenmanVkGroupsQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanVkGroupsQuery, EvenmanVkGroupsQueryVariables>(EvenmanVkGroupsDocument, baseOptions);
      }
export function useEvenmanVkGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanVkGroupsQuery, EvenmanVkGroupsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanVkGroupsQuery, EvenmanVkGroupsQueryVariables>(EvenmanVkGroupsDocument, baseOptions);
        }
export type EvenmanVkGroupsQueryHookResult = ReturnType<typeof useEvenmanVkGroupsQuery>;
export type EvenmanVkGroupsLazyQueryHookResult = ReturnType<typeof useEvenmanVkGroupsLazyQuery>;
export type EvenmanVkGroupsQueryResult = ApolloReactCommon.QueryResult<EvenmanVkGroupsQuery, EvenmanVkGroupsQueryVariables>;
export const EvenmanTimepadCategoriesDocument = gql`
    query EvenmanTimepadCategories {
  timepadCategories {
    id
    code
    name
  }
}
    `;

/**
 * __useEvenmanTimepadCategoriesQuery__
 *
 * To run a query within a React component, call `useEvenmanTimepadCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanTimepadCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanTimepadCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useEvenmanTimepadCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanTimepadCategoriesQuery, EvenmanTimepadCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanTimepadCategoriesQuery, EvenmanTimepadCategoriesQueryVariables>(EvenmanTimepadCategoriesDocument, baseOptions);
      }
export function useEvenmanTimepadCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanTimepadCategoriesQuery, EvenmanTimepadCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanTimepadCategoriesQuery, EvenmanTimepadCategoriesQueryVariables>(EvenmanTimepadCategoriesDocument, baseOptions);
        }
export type EvenmanTimepadCategoriesQueryHookResult = ReturnType<typeof useEvenmanTimepadCategoriesQuery>;
export type EvenmanTimepadCategoriesLazyQueryHookResult = ReturnType<typeof useEvenmanTimepadCategoriesLazyQuery>;
export type EvenmanTimepadCategoriesQueryResult = ApolloReactCommon.QueryResult<EvenmanTimepadCategoriesQuery, EvenmanTimepadCategoriesQueryVariables>;