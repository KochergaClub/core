import * as Types from '../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type EventsEvent_SummaryFragment = (
  { __typename?: 'EventsEvent' }
  & Pick<Types.EventsEvent, 'event_id' | 'title' | 'start' | 'published' | 'event_type'>
  & { announcements: (
    { __typename?: 'EventsAnnouncements' }
    & { timepad: (
      { __typename?: 'EventsAnnouncementTimepad' }
      & Pick<Types.EventsAnnouncementTimepad, 'link'>
    ), vk: (
      { __typename?: 'EventsAnnouncementVk' }
      & Pick<Types.EventsAnnouncementVk, 'link'>
    ), fb: (
      { __typename?: 'EventsAnnouncementFb' }
      & Pick<Types.EventsAnnouncementFb, 'link'>
    ) }
  ) }
);

export type EvenmanEventsQueryVariables = {
  start: Types.Scalars['String'],
  end: Types.Scalars['String']
};


export type EvenmanEventsQuery = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'EventsEventConnection' }
    & { nodes: Array<(
      { __typename?: 'EventsEvent' }
      & EventsEvent_SummaryFragment
    )> }
  ) }
);

export type EvenmanUnknownEventFragment = (
  { __typename?: 'EventsEvent' }
  & Pick<Types.EventsEvent, 'event_id' | 'title'>
);

export type EvenmanUnknownEventsQueryVariables = {};


export type EvenmanUnknownEventsQuery = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'EventsEventConnection' }
    & { nodes: Array<(
      { __typename?: 'EventsEvent' }
      & EvenmanUnknownEventFragment
    )> }
  ) }
);

export type EvenmanEventQueryVariables = {
  id: Types.Scalars['ID']
};


export type EvenmanEventQuery = (
  { __typename?: 'Query' }
  & { event: Types.Maybe<(
    { __typename?: 'EventsEvent' }
    & EventsEvent_SummaryFragment
  )> }
);

export type EvenmanSetEventTypeMutationVariables = {
  id: Types.Scalars['ID'],
  event_type: Types.Scalars['String']
};


export type EvenmanSetEventTypeMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventSetEventTypeResult' }
    & Pick<Types.EventSetEventTypeResult, 'ok'>
  ) }
);

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

export const EventsEvent_SummaryFragmentDoc = gql`
    fragment EventsEvent_Summary on EventsEvent {
  event_id
  title
  start
  published
  event_type
  announcements {
    timepad {
      link
    }
    vk {
      link
    }
    fb {
      link
    }
  }
}
    `;
export const EvenmanUnknownEventFragmentDoc = gql`
    fragment EvenmanUnknownEvent on EventsEvent {
  event_id
  title
}
    `;
export const EvenmanEventsDocument = gql`
    query EvenmanEvents($start: String!, $end: String!) {
  events(after: $start, before: $end, first: 100) {
    nodes {
      ...EventsEvent_Summary
    }
  }
}
    ${EventsEvent_SummaryFragmentDoc}`;

/**
 * __useEvenmanEventsQuery__
 *
 * To run a query within a React component, call `useEvenmanEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanEventsQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useEvenmanEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanEventsQuery, EvenmanEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanEventsQuery, EvenmanEventsQueryVariables>(EvenmanEventsDocument, baseOptions);
      }
export function useEvenmanEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanEventsQuery, EvenmanEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanEventsQuery, EvenmanEventsQueryVariables>(EvenmanEventsDocument, baseOptions);
        }
export type EvenmanEventsQueryHookResult = ReturnType<typeof useEvenmanEventsQuery>;
export type EvenmanEventsLazyQueryHookResult = ReturnType<typeof useEvenmanEventsLazyQuery>;
export type EvenmanEventsQueryResult = ApolloReactCommon.QueryResult<EvenmanEventsQuery, EvenmanEventsQueryVariables>;
export const EvenmanUnknownEventsDocument = gql`
    query EvenmanUnknownEvents {
  events(filter: {event_type: "unknown"}, first: 20) {
    nodes {
      ...EvenmanUnknownEvent
    }
  }
}
    ${EvenmanUnknownEventFragmentDoc}`;

/**
 * __useEvenmanUnknownEventsQuery__
 *
 * To run a query within a React component, call `useEvenmanUnknownEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanUnknownEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanUnknownEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEvenmanUnknownEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanUnknownEventsQuery, EvenmanUnknownEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanUnknownEventsQuery, EvenmanUnknownEventsQueryVariables>(EvenmanUnknownEventsDocument, baseOptions);
      }
export function useEvenmanUnknownEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanUnknownEventsQuery, EvenmanUnknownEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanUnknownEventsQuery, EvenmanUnknownEventsQueryVariables>(EvenmanUnknownEventsDocument, baseOptions);
        }
export type EvenmanUnknownEventsQueryHookResult = ReturnType<typeof useEvenmanUnknownEventsQuery>;
export type EvenmanUnknownEventsLazyQueryHookResult = ReturnType<typeof useEvenmanUnknownEventsLazyQuery>;
export type EvenmanUnknownEventsQueryResult = ApolloReactCommon.QueryResult<EvenmanUnknownEventsQuery, EvenmanUnknownEventsQueryVariables>;
export const EvenmanEventDocument = gql`
    query EvenmanEvent($id: ID!) {
  event(event_id: $id) {
    ...EventsEvent_Summary
  }
}
    ${EventsEvent_SummaryFragmentDoc}`;

/**
 * __useEvenmanEventQuery__
 *
 * To run a query within a React component, call `useEvenmanEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanEventQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEvenmanEventQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanEventQuery, EvenmanEventQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanEventQuery, EvenmanEventQueryVariables>(EvenmanEventDocument, baseOptions);
      }
export function useEvenmanEventLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanEventQuery, EvenmanEventQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanEventQuery, EvenmanEventQueryVariables>(EvenmanEventDocument, baseOptions);
        }
export type EvenmanEventQueryHookResult = ReturnType<typeof useEvenmanEventQuery>;
export type EvenmanEventLazyQueryHookResult = ReturnType<typeof useEvenmanEventLazyQuery>;
export type EvenmanEventQueryResult = ApolloReactCommon.QueryResult<EvenmanEventQuery, EvenmanEventQueryVariables>;
export const EvenmanSetEventTypeDocument = gql`
    mutation EvenmanSetEventType($id: ID!, $event_type: String!) {
  result: eventSetEventType(input: {event_id: $id, event_type: $event_type}) {
    ok
  }
}
    `;
export type EvenmanSetEventTypeMutationFn = ApolloReactCommon.MutationFunction<EvenmanSetEventTypeMutation, EvenmanSetEventTypeMutationVariables>;

/**
 * __useEvenmanSetEventTypeMutation__
 *
 * To run a mutation, you first call `useEvenmanSetEventTypeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanSetEventTypeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanSetEventTypeMutation, { data, loading, error }] = useEvenmanSetEventTypeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      event_type: // value for 'event_type'
 *   },
 * });
 */
export function useEvenmanSetEventTypeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanSetEventTypeMutation, EvenmanSetEventTypeMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanSetEventTypeMutation, EvenmanSetEventTypeMutationVariables>(EvenmanSetEventTypeDocument, baseOptions);
      }
export type EvenmanSetEventTypeMutationHookResult = ReturnType<typeof useEvenmanSetEventTypeMutation>;
export type EvenmanSetEventTypeMutationResult = ApolloReactCommon.MutationResult<EvenmanSetEventTypeMutation>;
export type EvenmanSetEventTypeMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanSetEventTypeMutation, EvenmanSetEventTypeMutationVariables>;
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