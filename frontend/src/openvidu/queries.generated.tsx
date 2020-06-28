import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type OpenviduGenerateRoomTokenMutationVariables = {};


export type OpenviduGenerateRoomTokenMutation = (
  { __typename?: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename?: 'OpenviduGenerateRoomTokenResult' }
    & Pick<Types.OpenviduGenerateRoomTokenResult, 'token'>
  )> }
);


export const OpenviduGenerateRoomTokenDocument = gql`
    mutation OpenviduGenerateRoomToken {
  result: openviduGenerateRoomToken {
    token
  }
}
    `;
export type OpenviduGenerateRoomTokenMutationFn = ApolloReactCommon.MutationFunction<OpenviduGenerateRoomTokenMutation, OpenviduGenerateRoomTokenMutationVariables>;

/**
 * __useOpenviduGenerateRoomTokenMutation__
 *
 * To run a mutation, you first call `useOpenviduGenerateRoomTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenviduGenerateRoomTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openviduGenerateRoomTokenMutation, { data, loading, error }] = useOpenviduGenerateRoomTokenMutation({
 *   variables: {
 *   },
 * });
 */
export function useOpenviduGenerateRoomTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<OpenviduGenerateRoomTokenMutation, OpenviduGenerateRoomTokenMutationVariables>) {
        return ApolloReactHooks.useMutation<OpenviduGenerateRoomTokenMutation, OpenviduGenerateRoomTokenMutationVariables>(OpenviduGenerateRoomTokenDocument, baseOptions);
      }
export type OpenviduGenerateRoomTokenMutationHookResult = ReturnType<typeof useOpenviduGenerateRoomTokenMutation>;
export type OpenviduGenerateRoomTokenMutationResult = ApolloReactCommon.MutationResult<OpenviduGenerateRoomTokenMutation>;
export type OpenviduGenerateRoomTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<OpenviduGenerateRoomTokenMutation, OpenviduGenerateRoomTokenMutationVariables>;