import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type KkmRegisterCheckMutationVariables = {
  params: Types.KkmRegisterCheckInput;
};


export type KkmRegisterCheckMutation = (
  { __typename?: 'Mutation' }
  & { kkmRegisterCheck: (
    { __typename?: 'KkmRegisterCheckResult' }
    & Pick<Types.KkmRegisterCheckResult, 'url' | 'error' | 'status'>
  ) }
);


export const KkmRegisterCheckDocument = gql`
    mutation KkmRegisterCheck($params: KkmRegisterCheckInput!) {
  kkmRegisterCheck(params: $params) {
    url
    error
    status
  }
}
    `;
export type KkmRegisterCheckMutationFn = ApolloReactCommon.MutationFunction<KkmRegisterCheckMutation, KkmRegisterCheckMutationVariables>;

/**
 * __useKkmRegisterCheckMutation__
 *
 * To run a mutation, you first call `useKkmRegisterCheckMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useKkmRegisterCheckMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [kkmRegisterCheckMutation, { data, loading, error }] = useKkmRegisterCheckMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useKkmRegisterCheckMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<KkmRegisterCheckMutation, KkmRegisterCheckMutationVariables>) {
        return ApolloReactHooks.useMutation<KkmRegisterCheckMutation, KkmRegisterCheckMutationVariables>(KkmRegisterCheckDocument, baseOptions);
      }
export type KkmRegisterCheckMutationHookResult = ReturnType<typeof useKkmRegisterCheckMutation>;
export type KkmRegisterCheckMutationResult = ApolloReactCommon.MutationResult<KkmRegisterCheckMutation>;
export type KkmRegisterCheckMutationOptions = ApolloReactCommon.BaseMutationOptions<KkmRegisterCheckMutation, KkmRegisterCheckMutationVariables>;