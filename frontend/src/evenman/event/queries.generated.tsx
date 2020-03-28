import * as Types from '../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type EvenmanSetRealmMutationVariables = {
  id: Types.Scalars['ID'],
  realm: Types.Scalars['String']
};


export type EvenmanSetRealmMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventSetRealmResult' }
    & Pick<Types.EventSetRealmResult, 'ok'>
  ) }
);


export const EvenmanSetRealmDocument = gql`
    mutation EvenmanSetRealm($id: ID!, $realm: String!) {
  result: eventSetRealm(input: {event_id: $id, realm: $realm}) {
    ok
  }
}
    `;
export type EvenmanSetRealmMutationFn = ApolloReactCommon.MutationFunction<EvenmanSetRealmMutation, EvenmanSetRealmMutationVariables>;

/**
 * __useEvenmanSetRealmMutation__
 *
 * To run a mutation, you first call `useEvenmanSetRealmMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanSetRealmMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanSetRealmMutation, { data, loading, error }] = useEvenmanSetRealmMutation({
 *   variables: {
 *      id: // value for 'id'
 *      realm: // value for 'realm'
 *   },
 * });
 */
export function useEvenmanSetRealmMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanSetRealmMutation, EvenmanSetRealmMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanSetRealmMutation, EvenmanSetRealmMutationVariables>(EvenmanSetRealmDocument, baseOptions);
      }
export type EvenmanSetRealmMutationHookResult = ReturnType<typeof useEvenmanSetRealmMutation>;
export type EvenmanSetRealmMutationResult = ApolloReactCommon.MutationResult<EvenmanSetRealmMutation>;
export type EvenmanSetRealmMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanSetRealmMutation, EvenmanSetRealmMutationVariables>;