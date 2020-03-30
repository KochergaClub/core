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

export type EvenmanSetPricingTypeMutationVariables = {
  id: Types.Scalars['ID'],
  pricing_type: Types.Scalars['String']
};


export type EvenmanSetPricingTypeMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventSetPricingTypeResult' }
    & Pick<Types.EventSetPricingTypeResult, 'ok'>
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
export const EvenmanSetPricingTypeDocument = gql`
    mutation EvenmanSetPricingType($id: ID!, $pricing_type: String!) {
  result: eventSetPricingType(input: {event_id: $id, pricing_type: $pricing_type}) {
    ok
  }
}
    `;
export type EvenmanSetPricingTypeMutationFn = ApolloReactCommon.MutationFunction<EvenmanSetPricingTypeMutation, EvenmanSetPricingTypeMutationVariables>;

/**
 * __useEvenmanSetPricingTypeMutation__
 *
 * To run a mutation, you first call `useEvenmanSetPricingTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanSetPricingTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanSetPricingTypeMutation, { data, loading, error }] = useEvenmanSetPricingTypeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      pricing_type: // value for 'pricing_type'
 *   },
 * });
 */
export function useEvenmanSetPricingTypeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanSetPricingTypeMutation, EvenmanSetPricingTypeMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanSetPricingTypeMutation, EvenmanSetPricingTypeMutationVariables>(EvenmanSetPricingTypeDocument, baseOptions);
      }
export type EvenmanSetPricingTypeMutationHookResult = ReturnType<typeof useEvenmanSetPricingTypeMutation>;
export type EvenmanSetPricingTypeMutationResult = ApolloReactCommon.MutationResult<EvenmanSetPricingTypeMutation>;
export type EvenmanSetPricingTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanSetPricingTypeMutation, EvenmanSetPricingTypeMutationVariables>;