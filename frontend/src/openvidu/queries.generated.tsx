import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type GenerateOpenViduTokenMutationVariables = {
  event_id: Types.Scalars['ID'];
};


export type GenerateOpenViduTokenMutation = (
  { __typename?: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename?: 'EventGenerateOpenViduTokenResult' }
    & Pick<Types.EventGenerateOpenViduTokenResult, 'token'>
  )> }
);


export const GenerateOpenViduTokenDocument = gql`
    mutation GenerateOpenViduToken($event_id: ID!) {
  result: eventGenerateOpenViduToken(input: {event_id: $event_id}) {
    token
  }
}
    `;
export type GenerateOpenViduTokenMutationFn = ApolloReactCommon.MutationFunction<GenerateOpenViduTokenMutation, GenerateOpenViduTokenMutationVariables>;

/**
 * __useGenerateOpenViduTokenMutation__
 *
 * To run a mutation, you first call `useGenerateOpenViduTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGenerateOpenViduTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [generateOpenViduTokenMutation, { data, loading, error }] = useGenerateOpenViduTokenMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useGenerateOpenViduTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<GenerateOpenViduTokenMutation, GenerateOpenViduTokenMutationVariables>) {
        return ApolloReactHooks.useMutation<GenerateOpenViduTokenMutation, GenerateOpenViduTokenMutationVariables>(GenerateOpenViduTokenDocument, baseOptions);
      }
export type GenerateOpenViduTokenMutationHookResult = ReturnType<typeof useGenerateOpenViduTokenMutation>;
export type GenerateOpenViduTokenMutationResult = ApolloReactCommon.MutationResult<GenerateOpenViduTokenMutation>;
export type GenerateOpenViduTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<GenerateOpenViduTokenMutation, GenerateOpenViduTokenMutationVariables>;