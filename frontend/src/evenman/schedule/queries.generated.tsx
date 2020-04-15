import * as Types from '../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type EvenmanWeeklyDigestFragment = (
  { __typename?: 'EventsWeeklyDigest' }
  & Pick<Types.EventsWeeklyDigest, 'id' | 'start'>
  & { image: Types.Maybe<(
    { __typename?: 'WagtailImage' }
    & Pick<Types.WagtailImage, 'url'>
  )>, mailchimp: (
    { __typename?: 'EventsWeeklyDigestMailchimp' }
    & Pick<Types.EventsWeeklyDigestMailchimp, 'link'>
  ), telegram: (
    { __typename?: 'EventsWeeklyDigestTelegram' }
    & Pick<Types.EventsWeeklyDigestTelegram, 'link'>
  ), vk: (
    { __typename?: 'EventsWeeklyDigestVk' }
    & Pick<Types.EventsWeeklyDigestVk, 'link'>
  ) }
);

export type EvenmanWeeklyDigestQueryVariables = {};


export type EvenmanWeeklyDigestQuery = (
  { __typename?: 'Query' }
  & { digest: (
    { __typename?: 'EventsWeeklyDigest' }
    & EvenmanWeeklyDigestFragment
  ) }
);

export type EvenmanDigestToVkMutationVariables = {};


export type EvenmanDigestToVkMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventsWeeklyDigestUpdateResult' }
    & Pick<Types.EventsWeeklyDigestUpdateResult, 'ok'>
    & { digest: (
      { __typename?: 'EventsWeeklyDigest' }
      & EvenmanWeeklyDigestFragment
    ) }
  ) }
);

export type EvenmanDigestToTelegramMutationVariables = {};


export type EvenmanDigestToTelegramMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventsWeeklyDigestUpdateResult' }
    & Pick<Types.EventsWeeklyDigestUpdateResult, 'ok'>
    & { digest: (
      { __typename?: 'EventsWeeklyDigest' }
      & EvenmanWeeklyDigestFragment
    ) }
  ) }
);

export type EvenmanDigestToMailchimpMutationVariables = {
  text: Types.Scalars['String']
};


export type EvenmanDigestToMailchimpMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventsWeeklyDigestUpdateResult' }
    & Pick<Types.EventsWeeklyDigestUpdateResult, 'ok'>
    & { digest: (
      { __typename?: 'EventsWeeklyDigest' }
      & EvenmanWeeklyDigestFragment
    ) }
  ) }
);

export type EvenmanVkWikiScheduleUpdateMutationVariables = {};


export type EvenmanVkWikiScheduleUpdateMutation = (
  { __typename?: 'Mutation' }
  & { result: Types.Maybe<(
    { __typename?: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  )> }
);

export const EvenmanWeeklyDigestFragmentDoc = gql`
    fragment EvenmanWeeklyDigest on EventsWeeklyDigest {
  id
  start
  image(spec: "width-240") {
    url
  }
  mailchimp {
    link
  }
  telegram {
    link
  }
  vk {
    link
  }
}
    `;
export const EvenmanWeeklyDigestDocument = gql`
    query EvenmanWeeklyDigest {
  digest: eventsWeeklyDigestCurrent {
    ...EvenmanWeeklyDigest
  }
}
    ${EvenmanWeeklyDigestFragmentDoc}`;

/**
 * __useEvenmanWeeklyDigestQuery__
 *
 * To run a query within a React component, call `useEvenmanWeeklyDigestQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanWeeklyDigestQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanWeeklyDigestQuery({
 *   variables: {
 *   },
 * });
 */
export function useEvenmanWeeklyDigestQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanWeeklyDigestQuery, EvenmanWeeklyDigestQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanWeeklyDigestQuery, EvenmanWeeklyDigestQueryVariables>(EvenmanWeeklyDigestDocument, baseOptions);
      }
export function useEvenmanWeeklyDigestLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanWeeklyDigestQuery, EvenmanWeeklyDigestQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanWeeklyDigestQuery, EvenmanWeeklyDigestQueryVariables>(EvenmanWeeklyDigestDocument, baseOptions);
        }
export type EvenmanWeeklyDigestQueryHookResult = ReturnType<typeof useEvenmanWeeklyDigestQuery>;
export type EvenmanWeeklyDigestLazyQueryHookResult = ReturnType<typeof useEvenmanWeeklyDigestLazyQuery>;
export type EvenmanWeeklyDigestQueryResult = ApolloReactCommon.QueryResult<EvenmanWeeklyDigestQuery, EvenmanWeeklyDigestQueryVariables>;
export const EvenmanDigestToVkDocument = gql`
    mutation EvenmanDigestToVk {
  result: eventsWeeklyDigestPostVk {
    ok
    digest {
      ...EvenmanWeeklyDigest
    }
  }
}
    ${EvenmanWeeklyDigestFragmentDoc}`;
export type EvenmanDigestToVkMutationFn = ApolloReactCommon.MutationFunction<EvenmanDigestToVkMutation, EvenmanDigestToVkMutationVariables>;

/**
 * __useEvenmanDigestToVkMutation__
 *
 * To run a mutation, you first call `useEvenmanDigestToVkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanDigestToVkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanDigestToVkMutation, { data, loading, error }] = useEvenmanDigestToVkMutation({
 *   variables: {
 *   },
 * });
 */
export function useEvenmanDigestToVkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanDigestToVkMutation, EvenmanDigestToVkMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanDigestToVkMutation, EvenmanDigestToVkMutationVariables>(EvenmanDigestToVkDocument, baseOptions);
      }
export type EvenmanDigestToVkMutationHookResult = ReturnType<typeof useEvenmanDigestToVkMutation>;
export type EvenmanDigestToVkMutationResult = ApolloReactCommon.MutationResult<EvenmanDigestToVkMutation>;
export type EvenmanDigestToVkMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanDigestToVkMutation, EvenmanDigestToVkMutationVariables>;
export const EvenmanDigestToTelegramDocument = gql`
    mutation EvenmanDigestToTelegram {
  result: eventsWeeklyDigestPostTelegram {
    ok
    digest {
      ...EvenmanWeeklyDigest
    }
  }
}
    ${EvenmanWeeklyDigestFragmentDoc}`;
export type EvenmanDigestToTelegramMutationFn = ApolloReactCommon.MutationFunction<EvenmanDigestToTelegramMutation, EvenmanDigestToTelegramMutationVariables>;

/**
 * __useEvenmanDigestToTelegramMutation__
 *
 * To run a mutation, you first call `useEvenmanDigestToTelegramMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanDigestToTelegramMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanDigestToTelegramMutation, { data, loading, error }] = useEvenmanDigestToTelegramMutation({
 *   variables: {
 *   },
 * });
 */
export function useEvenmanDigestToTelegramMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanDigestToTelegramMutation, EvenmanDigestToTelegramMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanDigestToTelegramMutation, EvenmanDigestToTelegramMutationVariables>(EvenmanDigestToTelegramDocument, baseOptions);
      }
export type EvenmanDigestToTelegramMutationHookResult = ReturnType<typeof useEvenmanDigestToTelegramMutation>;
export type EvenmanDigestToTelegramMutationResult = ApolloReactCommon.MutationResult<EvenmanDigestToTelegramMutation>;
export type EvenmanDigestToTelegramMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanDigestToTelegramMutation, EvenmanDigestToTelegramMutationVariables>;
export const EvenmanDigestToMailchimpDocument = gql`
    mutation EvenmanDigestToMailchimp($text: String!) {
  result: eventsWeeklyDigestPostMailchimp(input: {text: $text}) {
    ok
    digest {
      ...EvenmanWeeklyDigest
    }
  }
}
    ${EvenmanWeeklyDigestFragmentDoc}`;
export type EvenmanDigestToMailchimpMutationFn = ApolloReactCommon.MutationFunction<EvenmanDigestToMailchimpMutation, EvenmanDigestToMailchimpMutationVariables>;

/**
 * __useEvenmanDigestToMailchimpMutation__
 *
 * To run a mutation, you first call `useEvenmanDigestToMailchimpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanDigestToMailchimpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanDigestToMailchimpMutation, { data, loading, error }] = useEvenmanDigestToMailchimpMutation({
 *   variables: {
 *      text: // value for 'text'
 *   },
 * });
 */
export function useEvenmanDigestToMailchimpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanDigestToMailchimpMutation, EvenmanDigestToMailchimpMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanDigestToMailchimpMutation, EvenmanDigestToMailchimpMutationVariables>(EvenmanDigestToMailchimpDocument, baseOptions);
      }
export type EvenmanDigestToMailchimpMutationHookResult = ReturnType<typeof useEvenmanDigestToMailchimpMutation>;
export type EvenmanDigestToMailchimpMutationResult = ApolloReactCommon.MutationResult<EvenmanDigestToMailchimpMutation>;
export type EvenmanDigestToMailchimpMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanDigestToMailchimpMutation, EvenmanDigestToMailchimpMutationVariables>;
export const EvenmanVkWikiScheduleUpdateDocument = gql`
    mutation EvenmanVkWikiScheduleUpdate {
  result: vkWikiScheduleUpdate {
    ok
  }
}
    `;
export type EvenmanVkWikiScheduleUpdateMutationFn = ApolloReactCommon.MutationFunction<EvenmanVkWikiScheduleUpdateMutation, EvenmanVkWikiScheduleUpdateMutationVariables>;

/**
 * __useEvenmanVkWikiScheduleUpdateMutation__
 *
 * To run a mutation, you first call `useEvenmanVkWikiScheduleUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanVkWikiScheduleUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanVkWikiScheduleUpdateMutation, { data, loading, error }] = useEvenmanVkWikiScheduleUpdateMutation({
 *   variables: {
 *   },
 * });
 */
export function useEvenmanVkWikiScheduleUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanVkWikiScheduleUpdateMutation, EvenmanVkWikiScheduleUpdateMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanVkWikiScheduleUpdateMutation, EvenmanVkWikiScheduleUpdateMutationVariables>(EvenmanVkWikiScheduleUpdateDocument, baseOptions);
      }
export type EvenmanVkWikiScheduleUpdateMutationHookResult = ReturnType<typeof useEvenmanVkWikiScheduleUpdateMutation>;
export type EvenmanVkWikiScheduleUpdateMutationResult = ApolloReactCommon.MutationResult<EvenmanVkWikiScheduleUpdateMutation>;
export type EvenmanVkWikiScheduleUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanVkWikiScheduleUpdateMutation, EvenmanVkWikiScheduleUpdateMutationVariables>;