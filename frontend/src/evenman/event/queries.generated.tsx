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

export type EvenmanSetZoomLinkMutationVariables = {
  id: Types.Scalars['ID'],
  link: Types.Scalars['String']
};


export type EvenmanSetZoomLinkMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventSetZoomLinkResult' }
    & Pick<Types.EventSetZoomLinkResult, 'ok'>
  ) }
);

export type EvenmanGenerateZoomLinkMutationVariables = {
  id: Types.Scalars['ID']
};


export type EvenmanGenerateZoomLinkMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventGenerateZoomLinkResult' }
    & Pick<Types.EventGenerateZoomLinkResult, 'ok'>
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
export const EvenmanSetZoomLinkDocument = gql`
    mutation EvenmanSetZoomLink($id: ID!, $link: String!) {
  result: eventSetZoomLink(input: {event_id: $id, zoom_link: $link}) {
    ok
  }
}
    `;
export type EvenmanSetZoomLinkMutationFn = ApolloReactCommon.MutationFunction<EvenmanSetZoomLinkMutation, EvenmanSetZoomLinkMutationVariables>;

/**
 * __useEvenmanSetZoomLinkMutation__
 *
 * To run a mutation, you first call `useEvenmanSetZoomLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanSetZoomLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanSetZoomLinkMutation, { data, loading, error }] = useEvenmanSetZoomLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *      link: // value for 'link'
 *   },
 * });
 */
export function useEvenmanSetZoomLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanSetZoomLinkMutation, EvenmanSetZoomLinkMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanSetZoomLinkMutation, EvenmanSetZoomLinkMutationVariables>(EvenmanSetZoomLinkDocument, baseOptions);
      }
export type EvenmanSetZoomLinkMutationHookResult = ReturnType<typeof useEvenmanSetZoomLinkMutation>;
export type EvenmanSetZoomLinkMutationResult = ApolloReactCommon.MutationResult<EvenmanSetZoomLinkMutation>;
export type EvenmanSetZoomLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanSetZoomLinkMutation, EvenmanSetZoomLinkMutationVariables>;
export const EvenmanGenerateZoomLinkDocument = gql`
    mutation EvenmanGenerateZoomLink($id: ID!) {
  result: eventGenerateZoomLink(input: {event_id: $id}) {
    ok
  }
}
    `;
export type EvenmanGenerateZoomLinkMutationFn = ApolloReactCommon.MutationFunction<EvenmanGenerateZoomLinkMutation, EvenmanGenerateZoomLinkMutationVariables>;

/**
 * __useEvenmanGenerateZoomLinkMutation__
 *
 * To run a mutation, you first call `useEvenmanGenerateZoomLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanGenerateZoomLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanGenerateZoomLinkMutation, { data, loading, error }] = useEvenmanGenerateZoomLinkMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEvenmanGenerateZoomLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanGenerateZoomLinkMutation, EvenmanGenerateZoomLinkMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanGenerateZoomLinkMutation, EvenmanGenerateZoomLinkMutationVariables>(EvenmanGenerateZoomLinkDocument, baseOptions);
      }
export type EvenmanGenerateZoomLinkMutationHookResult = ReturnType<typeof useEvenmanGenerateZoomLinkMutation>;
export type EvenmanGenerateZoomLinkMutationResult = ApolloReactCommon.MutationResult<EvenmanGenerateZoomLinkMutation>;
export type EvenmanGenerateZoomLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanGenerateZoomLinkMutation, EvenmanGenerateZoomLinkMutationVariables>;