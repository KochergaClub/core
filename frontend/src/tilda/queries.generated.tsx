import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type TildaPagesForAdminQueryVariables = {};


export type TildaPagesForAdminQuery = (
  { __typename?: 'Query' }
  & { tildaPages: Array<(
    { __typename?: 'TildaPage' }
    & Pick<Types.TildaPage, 'page_id' | 'title' | 'description' | 'path'>
  )> }
);

export type TildaImportAllMutationVariables = {};


export type TildaImportAllMutation = (
  { __typename?: 'Mutation' }
  & { tildaImportAll?: Types.Maybe<(
    { __typename?: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  )> }
);

export type TildaImportMutationVariables = {
  page_id: Types.Scalars['ID'];
};


export type TildaImportMutation = (
  { __typename?: 'Mutation' }
  & { tildaImport?: Types.Maybe<(
    { __typename?: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  )> }
);


export const TildaPagesForAdminDocument = gql`
    query TildaPagesForAdmin {
  tildaPages {
    page_id
    title
    description
    path
  }
}
    `;

/**
 * __useTildaPagesForAdminQuery__
 *
 * To run a query within a React component, call `useTildaPagesForAdminQuery` and pass it any options that fit your needs.
 * When your component renders, `useTildaPagesForAdminQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTildaPagesForAdminQuery({
 *   variables: {
 *   },
 * });
 */
export function useTildaPagesForAdminQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TildaPagesForAdminQuery, TildaPagesForAdminQueryVariables>) {
        return ApolloReactHooks.useQuery<TildaPagesForAdminQuery, TildaPagesForAdminQueryVariables>(TildaPagesForAdminDocument, baseOptions);
      }
export function useTildaPagesForAdminLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TildaPagesForAdminQuery, TildaPagesForAdminQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TildaPagesForAdminQuery, TildaPagesForAdminQueryVariables>(TildaPagesForAdminDocument, baseOptions);
        }
export type TildaPagesForAdminQueryHookResult = ReturnType<typeof useTildaPagesForAdminQuery>;
export type TildaPagesForAdminLazyQueryHookResult = ReturnType<typeof useTildaPagesForAdminLazyQuery>;
export type TildaPagesForAdminQueryResult = ApolloReactCommon.QueryResult<TildaPagesForAdminQuery, TildaPagesForAdminQueryVariables>;
export const TildaImportAllDocument = gql`
    mutation TildaImportAll {
  tildaImportAll {
    ok
  }
}
    `;
export type TildaImportAllMutationFn = ApolloReactCommon.MutationFunction<TildaImportAllMutation, TildaImportAllMutationVariables>;

/**
 * __useTildaImportAllMutation__
 *
 * To run a mutation, you first call `useTildaImportAllMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTildaImportAllMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tildaImportAllMutation, { data, loading, error }] = useTildaImportAllMutation({
 *   variables: {
 *   },
 * });
 */
export function useTildaImportAllMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TildaImportAllMutation, TildaImportAllMutationVariables>) {
        return ApolloReactHooks.useMutation<TildaImportAllMutation, TildaImportAllMutationVariables>(TildaImportAllDocument, baseOptions);
      }
export type TildaImportAllMutationHookResult = ReturnType<typeof useTildaImportAllMutation>;
export type TildaImportAllMutationResult = ApolloReactCommon.MutationResult<TildaImportAllMutation>;
export type TildaImportAllMutationOptions = ApolloReactCommon.BaseMutationOptions<TildaImportAllMutation, TildaImportAllMutationVariables>;
export const TildaImportDocument = gql`
    mutation TildaImport($page_id: ID!) {
  tildaImport(input: {page_id: $page_id}) {
    ok
  }
}
    `;
export type TildaImportMutationFn = ApolloReactCommon.MutationFunction<TildaImportMutation, TildaImportMutationVariables>;

/**
 * __useTildaImportMutation__
 *
 * To run a mutation, you first call `useTildaImportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTildaImportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tildaImportMutation, { data, loading, error }] = useTildaImportMutation({
 *   variables: {
 *      page_id: // value for 'page_id'
 *   },
 * });
 */
export function useTildaImportMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TildaImportMutation, TildaImportMutationVariables>) {
        return ApolloReactHooks.useMutation<TildaImportMutation, TildaImportMutationVariables>(TildaImportDocument, baseOptions);
      }
export type TildaImportMutationHookResult = ReturnType<typeof useTildaImportMutation>;
export type TildaImportMutationResult = ApolloReactCommon.MutationResult<TildaImportMutation>;
export type TildaImportMutationOptions = ApolloReactCommon.BaseMutationOptions<TildaImportMutation, TildaImportMutationVariables>;