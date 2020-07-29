import * as Types from '../../../apollo/types.generated';

import { EvenmanEvent_DetailsFragment } from '../queries.generated';
import gql from 'graphql-tag';
import { EvenmanEvent_DetailsFragmentDoc } from '../queries.generated';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type EvenmanTimepadAnnouncementUpdateMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
  category_code?: Types.Maybe<Types.Scalars['String']>;
  prepaid_tickets?: Types.Maybe<Types.Scalars['Boolean']>;
}>;


export type EvenmanTimepadAnnouncementUpdateMutation = (
  { __typename?: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'Event' }
      & EvenmanEvent_DetailsFragment
    ) }
  )> }
);

export type EvenmanVkAnnouncementUpdateMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
  group?: Types.Maybe<Types.Scalars['String']>;
}>;


export type EvenmanVkAnnouncementUpdateMutation = (
  { __typename?: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'Event' }
      & EvenmanEvent_DetailsFragment
    ) }
  )> }
);


export const EvenmanTimepadAnnouncementUpdateDocument = gql`
    mutation EvenmanTimepadAnnouncementUpdate($event_id: ID!, $category_code: String, $prepaid_tickets: Boolean) {
  result: eventTimepadAnnouncementUpdate(input: {event_id: $event_id, category_code: $category_code, prepaid_tickets: $prepaid_tickets}) {
    ok
    event {
      ...EvenmanEvent_Details
    }
  }
}
    ${EvenmanEvent_DetailsFragmentDoc}`;
export type EvenmanTimepadAnnouncementUpdateMutationFn = ApolloReactCommon.MutationFunction<EvenmanTimepadAnnouncementUpdateMutation, EvenmanTimepadAnnouncementUpdateMutationVariables>;

/**
 * __useEvenmanTimepadAnnouncementUpdateMutation__
 *
 * To run a mutation, you first call `useEvenmanTimepadAnnouncementUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanTimepadAnnouncementUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanTimepadAnnouncementUpdateMutation, { data, loading, error }] = useEvenmanTimepadAnnouncementUpdateMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *      category_code: // value for 'category_code'
 *      prepaid_tickets: // value for 'prepaid_tickets'
 *   },
 * });
 */
export function useEvenmanTimepadAnnouncementUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanTimepadAnnouncementUpdateMutation, EvenmanTimepadAnnouncementUpdateMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanTimepadAnnouncementUpdateMutation, EvenmanTimepadAnnouncementUpdateMutationVariables>(EvenmanTimepadAnnouncementUpdateDocument, baseOptions);
      }
export type EvenmanTimepadAnnouncementUpdateMutationHookResult = ReturnType<typeof useEvenmanTimepadAnnouncementUpdateMutation>;
export type EvenmanTimepadAnnouncementUpdateMutationResult = ApolloReactCommon.MutationResult<EvenmanTimepadAnnouncementUpdateMutation>;
export type EvenmanTimepadAnnouncementUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanTimepadAnnouncementUpdateMutation, EvenmanTimepadAnnouncementUpdateMutationVariables>;
export const EvenmanVkAnnouncementUpdateDocument = gql`
    mutation EvenmanVkAnnouncementUpdate($event_id: ID!, $group: String) {
  result: eventVkAnnouncementUpdate(input: {event_id: $event_id, group: $group}) {
    ok
    event {
      ...EvenmanEvent_Details
    }
  }
}
    ${EvenmanEvent_DetailsFragmentDoc}`;
export type EvenmanVkAnnouncementUpdateMutationFn = ApolloReactCommon.MutationFunction<EvenmanVkAnnouncementUpdateMutation, EvenmanVkAnnouncementUpdateMutationVariables>;

/**
 * __useEvenmanVkAnnouncementUpdateMutation__
 *
 * To run a mutation, you first call `useEvenmanVkAnnouncementUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanVkAnnouncementUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanVkAnnouncementUpdateMutation, { data, loading, error }] = useEvenmanVkAnnouncementUpdateMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *      group: // value for 'group'
 *   },
 * });
 */
export function useEvenmanVkAnnouncementUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanVkAnnouncementUpdateMutation, EvenmanVkAnnouncementUpdateMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanVkAnnouncementUpdateMutation, EvenmanVkAnnouncementUpdateMutationVariables>(EvenmanVkAnnouncementUpdateDocument, baseOptions);
      }
export type EvenmanVkAnnouncementUpdateMutationHookResult = ReturnType<typeof useEvenmanVkAnnouncementUpdateMutation>;
export type EvenmanVkAnnouncementUpdateMutationResult = ApolloReactCommon.MutationResult<EvenmanVkAnnouncementUpdateMutation>;
export type EvenmanVkAnnouncementUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanVkAnnouncementUpdateMutation, EvenmanVkAnnouncementUpdateMutationVariables>;