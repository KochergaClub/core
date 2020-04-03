import * as Types from '../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type EvenmanProjectsListQueryVariables = {};


export type EvenmanProjectsListQuery = (
  { __typename?: 'Query' }
  & { projects: Array<(
    { __typename?: 'ProjectPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'slug'>
    ) }
  )> }
);


export const EvenmanProjectsListDocument = gql`
    query EvenmanProjectsList {
  projects {
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