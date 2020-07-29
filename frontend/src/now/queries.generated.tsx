import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type NowFragment = (
  { __typename?: 'NowInfo' }
  & Pick<Types.NowInfo, 'total'>
  & { customers: Array<(
    { __typename?: 'NowCustomer' }
    & Pick<Types.NowCustomer, 'first_name' | 'last_name'>
  )> }
);

export type NowQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type NowQuery = (
  { __typename?: 'Query' }
  & { now: (
    { __typename?: 'NowInfo' }
    & NowFragment
  ) }
);

export const NowFragmentDoc = gql`
    fragment Now on NowInfo {
  total
  customers {
    first_name
    last_name
  }
}
    `;
export const NowDocument = gql`
    query Now {
  now {
    ...Now
  }
}
    ${NowFragmentDoc}`;

/**
 * __useNowQuery__
 *
 * To run a query within a React component, call `useNowQuery` and pass it any options that fit your needs.
 * When your component renders, `useNowQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNowQuery({
 *   variables: {
 *   },
 * });
 */
export function useNowQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NowQuery, NowQueryVariables>) {
        return ApolloReactHooks.useQuery<NowQuery, NowQueryVariables>(NowDocument, baseOptions);
      }
export function useNowLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NowQuery, NowQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<NowQuery, NowQueryVariables>(NowDocument, baseOptions);
        }
export type NowQueryHookResult = ReturnType<typeof useNowQuery>;
export type NowLazyQueryHookResult = ReturnType<typeof useNowLazyQuery>;
export type NowQueryResult = ApolloReactCommon.QueryResult<NowQuery, NowQueryVariables>;