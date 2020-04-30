import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ImportersQueryVariables = {};


export type ImportersQuery = (
  { __typename?: 'Query' }
  & { importers: Array<(
    { __typename?: 'Importer' }
    & Pick<Types.Importer, 'name'>
  )> }
);


export const ImportersDocument = gql`
    query Importers {
  importers {
    name
  }
}
    `;

/**
 * __useImportersQuery__
 *
 * To run a query within a React component, call `useImportersQuery` and pass it any options that fit your needs.
 * When your component renders, `useImportersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useImportersQuery({
 *   variables: {
 *   },
 * });
 */
export function useImportersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ImportersQuery, ImportersQueryVariables>) {
        return ApolloReactHooks.useQuery<ImportersQuery, ImportersQueryVariables>(ImportersDocument, baseOptions);
      }
export function useImportersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ImportersQuery, ImportersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ImportersQuery, ImportersQueryVariables>(ImportersDocument, baseOptions);
        }
export type ImportersQueryHookResult = ReturnType<typeof useImportersQuery>;
export type ImportersLazyQueryHookResult = ReturnType<typeof useImportersLazyQuery>;
export type ImportersQueryResult = ApolloReactCommon.QueryResult<ImportersQuery, ImportersQueryVariables>;