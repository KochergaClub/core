import * as Types from '../apollo/gen-types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type AnalyticsBovStatFragment = (
  { __typename?: 'AnalyticsBovStat' }
  & Pick<Types.AnalyticsBovStat, 'date' | 'count' | 'total_income'>
);

export type AnalyticsBovStatsQueryVariables = {};


export type AnalyticsBovStatsQuery = (
  { __typename?: 'Query' }
  & { bovStats: Array<(
    { __typename?: 'AnalyticsBovStat' }
    & AnalyticsBovStatFragment
  )> }
);

export const AnalyticsBovStatFragmentDoc = gql`
    fragment AnalyticsBovStat on AnalyticsBovStat {
  date
  count
  total_income
}
    `;
export const AnalyticsBovStatsDocument = gql`
    query AnalyticsBovStats {
  bovStats: analyticsBovStats {
    ...AnalyticsBovStat
  }
}
    ${AnalyticsBovStatFragmentDoc}`;

/**
 * __useAnalyticsBovStatsQuery__
 *
 * To run a query within a React component, call `useAnalyticsBovStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAnalyticsBovStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAnalyticsBovStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAnalyticsBovStatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AnalyticsBovStatsQuery, AnalyticsBovStatsQueryVariables>) {
        return ApolloReactHooks.useQuery<AnalyticsBovStatsQuery, AnalyticsBovStatsQueryVariables>(AnalyticsBovStatsDocument, baseOptions);
      }
export function useAnalyticsBovStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AnalyticsBovStatsQuery, AnalyticsBovStatsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AnalyticsBovStatsQuery, AnalyticsBovStatsQueryVariables>(AnalyticsBovStatsDocument, baseOptions);
        }
export type AnalyticsBovStatsQueryHookResult = ReturnType<typeof useAnalyticsBovStatsQuery>;
export type AnalyticsBovStatsLazyQueryHookResult = ReturnType<typeof useAnalyticsBovStatsLazyQuery>;
export type AnalyticsBovStatsQueryResult = ApolloReactCommon.QueryResult<AnalyticsBovStatsQuery, AnalyticsBovStatsQueryVariables>;