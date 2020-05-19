import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type EventsPublicEvent_SummaryFragment = (
  { __typename?: 'EventsPublicEvent' }
  & Pick<Types.EventsPublicEvent, 'event_id' | 'title' | 'summary' | 'start'>
  & { image?: Types.Maybe<(
    { __typename?: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )>, image_2x?: Types.Maybe<(
    { __typename?: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )> }
);

export type UpcomingPublicEventsQueryVariables = {
  today: Types.Scalars['String'];
};


export type UpcomingPublicEventsQuery = (
  { __typename?: 'Query' }
  & { publicEvents: (
    { __typename?: 'EventsPublicEventConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage'>
    ), nodes: Array<(
      { __typename?: 'EventsPublicEvent' }
      & EventsPublicEvent_SummaryFragment
    )> }
  ) }
);

export type TeamCalendarEventFragment = (
  { __typename?: 'EventsEvent' }
  & Pick<Types.EventsEvent, 'id' | 'start' | 'end' | 'title' | 'summary' | 'description' | 'event_type' | 'room' | 'creator'>
  & { announcements: (
    { __typename?: 'EventsAnnouncements' }
    & { vk: (
      { __typename?: 'EventsAnnouncementVk' }
      & Pick<Types.EventsAnnouncementVk, 'link'>
    ), fb: (
      { __typename?: 'EventsAnnouncementFb' }
      & Pick<Types.EventsAnnouncementFb, 'link'>
    ), timepad: (
      { __typename?: 'EventsAnnouncementTimepad' }
      & Pick<Types.EventsAnnouncementTimepad, 'link'>
    ) }
  ) }
);

export type EventsInRangeQueryVariables = {
  start: Types.Scalars['String'];
  end: Types.Scalars['String'];
};


export type EventsInRangeQuery = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'EventsEventConnection' }
    & { nodes: Array<(
      { __typename?: 'EventsEvent' }
      & TeamCalendarEventFragment
    )> }
  ) }
);

export type TeamCalendarEventQueryVariables = {
  id: Types.Scalars['ID'];
};


export type TeamCalendarEventQuery = (
  { __typename?: 'Query' }
  & { event?: Types.Maybe<(
    { __typename?: 'EventsEvent' }
    & TeamCalendarEventFragment
  )> }
);

export type ResizeEventMutationVariables = {
  id: Types.Scalars['ID'];
  start: Types.Scalars['String'];
  end: Types.Scalars['String'];
};


export type ResizeEventMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventUpdateResult' }
    & { event: (
      { __typename?: 'EventsEvent' }
      & TeamCalendarEventFragment
    ) }
  ) }
);

export type TeamCalendarCreateEventMutationVariables = {
  start: Types.Scalars['String'];
  end: Types.Scalars['String'];
  title: Types.Scalars['String'];
  description: Types.Scalars['String'];
  room: Types.Scalars['String'];
};


export type TeamCalendarCreateEventMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventCreateResult' }
    & Pick<Types.EventCreateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & TeamCalendarEventFragment
    ) }
  ) }
);

export type TeamCalendarUpdateEventMutationVariables = {
  id: Types.Scalars['ID'];
  title?: Types.Maybe<Types.Scalars['String']>;
  description?: Types.Maybe<Types.Scalars['String']>;
  location?: Types.Maybe<Types.Scalars['String']>;
};


export type TeamCalendarUpdateEventMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & TeamCalendarEventFragment
    ) }
  ) }
);

export type TeamCalendarDeleteEventMutationVariables = {
  id: Types.Scalars['ID'];
};


export type TeamCalendarDeleteEventMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type TeamEventFeedbackFragment = (
  { __typename?: 'EventsFeedback' }
  & Pick<Types.EventsFeedback, 'id' | 'overall_score' | 'recommend_score' | 'content_score' | 'conductor_score' | 'source_friend' | 'source_vk' | 'source_fb' | 'source_timepad' | 'source_email' | 'source_website' | 'custom_source' | 'comment'>
);

export type TeamEventDetailsFragment = (
  { __typename?: 'EventsEvent' }
  & { feedbacks: Array<(
    { __typename?: 'EventsFeedback' }
    & TeamEventFeedbackFragment
  )> }
  & TeamCalendarEventFragment
);

export type TeamEventDetailsQueryVariables = {
  id: Types.Scalars['ID'];
};


export type TeamEventDetailsQuery = (
  { __typename?: 'Query' }
  & { event?: Types.Maybe<(
    { __typename?: 'EventsEvent' }
    & TeamEventDetailsFragment
  )> }
);

export type EventFeedbackCreateMutationVariables = {
  event_id: Types.Scalars['ID'];
  overall_score?: Types.Maybe<Types.Scalars['Int']>;
  recommend_score?: Types.Maybe<Types.Scalars['Int']>;
  content_score?: Types.Maybe<Types.Scalars['Int']>;
  conductor_score?: Types.Maybe<Types.Scalars['Int']>;
  source_friend: Types.Scalars['Boolean'];
  source_vk: Types.Scalars['Boolean'];
  source_fb: Types.Scalars['Boolean'];
  source_timepad: Types.Scalars['Boolean'];
  source_email: Types.Scalars['Boolean'];
  source_website: Types.Scalars['Boolean'];
  custom_source: Types.Scalars['String'];
  comment: Types.Scalars['String'];
};


export type EventFeedbackCreateMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventsFeedbackCreateResult' }
    & Pick<Types.EventsFeedbackCreateResult, 'ok'>
    & { feedback: (
      { __typename?: 'EventsFeedback' }
      & TeamEventFeedbackFragment
    ) }
  ) }
);

export type EventFeedbackDeleteMutationVariables = {
  id: Types.Scalars['ID'];
};


export type EventFeedbackDeleteMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export const EventsPublicEvent_SummaryFragmentDoc = gql`
    fragment EventsPublicEvent_Summary on EventsPublicEvent {
  event_id
  title
  summary
  image: image_rendition(spec: "fill-760x200") {
    id
    url
  }
  image_2x: image_rendition(spec: "fill-1520x400") {
    id
    url
  }
  start
}
    `;
export const TeamCalendarEventFragmentDoc = gql`
    fragment TeamCalendarEvent on EventsEvent {
  id
  start
  end
  title
  summary
  description
  event_type
  room
  creator
  announcements {
    vk {
      link
    }
    fb {
      link
    }
    timepad {
      link
    }
  }
}
    `;
export const TeamEventFeedbackFragmentDoc = gql`
    fragment TeamEventFeedback on EventsFeedback {
  id
  overall_score
  recommend_score
  content_score
  conductor_score
  source_friend
  source_vk
  source_fb
  source_timepad
  source_email
  source_website
  custom_source
  comment
}
    `;
export const TeamEventDetailsFragmentDoc = gql`
    fragment TeamEventDetails on EventsEvent {
  ...TeamCalendarEvent
  feedbacks {
    ...TeamEventFeedback
  }
}
    ${TeamCalendarEventFragmentDoc}
${TeamEventFeedbackFragmentDoc}`;
export const UpcomingPublicEventsDocument = gql`
    query UpcomingPublicEvents($today: String!) {
  publicEvents(from_date: $today, first: 20) {
    pageInfo {
      hasNextPage
    }
    nodes {
      ...EventsPublicEvent_Summary
    }
  }
}
    ${EventsPublicEvent_SummaryFragmentDoc}`;

/**
 * __useUpcomingPublicEventsQuery__
 *
 * To run a query within a React component, call `useUpcomingPublicEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpcomingPublicEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpcomingPublicEventsQuery({
 *   variables: {
 *      today: // value for 'today'
 *   },
 * });
 */
export function useUpcomingPublicEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UpcomingPublicEventsQuery, UpcomingPublicEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<UpcomingPublicEventsQuery, UpcomingPublicEventsQueryVariables>(UpcomingPublicEventsDocument, baseOptions);
      }
export function useUpcomingPublicEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UpcomingPublicEventsQuery, UpcomingPublicEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UpcomingPublicEventsQuery, UpcomingPublicEventsQueryVariables>(UpcomingPublicEventsDocument, baseOptions);
        }
export type UpcomingPublicEventsQueryHookResult = ReturnType<typeof useUpcomingPublicEventsQuery>;
export type UpcomingPublicEventsLazyQueryHookResult = ReturnType<typeof useUpcomingPublicEventsLazyQuery>;
export type UpcomingPublicEventsQueryResult = ApolloReactCommon.QueryResult<UpcomingPublicEventsQuery, UpcomingPublicEventsQueryVariables>;
export const EventsInRangeDocument = gql`
    query EventsInRange($start: String!, $end: String!) {
  events(after: $start, before: $end, first: 100) {
    nodes {
      ...TeamCalendarEvent
    }
  }
}
    ${TeamCalendarEventFragmentDoc}`;

/**
 * __useEventsInRangeQuery__
 *
 * To run a query within a React component, call `useEventsInRangeQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsInRangeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsInRangeQuery({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useEventsInRangeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventsInRangeQuery, EventsInRangeQueryVariables>) {
        return ApolloReactHooks.useQuery<EventsInRangeQuery, EventsInRangeQueryVariables>(EventsInRangeDocument, baseOptions);
      }
export function useEventsInRangeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventsInRangeQuery, EventsInRangeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EventsInRangeQuery, EventsInRangeQueryVariables>(EventsInRangeDocument, baseOptions);
        }
export type EventsInRangeQueryHookResult = ReturnType<typeof useEventsInRangeQuery>;
export type EventsInRangeLazyQueryHookResult = ReturnType<typeof useEventsInRangeLazyQuery>;
export type EventsInRangeQueryResult = ApolloReactCommon.QueryResult<EventsInRangeQuery, EventsInRangeQueryVariables>;
export const TeamCalendarEventDocument = gql`
    query TeamCalendarEvent($id: ID!) {
  event(event_id: $id) {
    ...TeamCalendarEvent
  }
}
    ${TeamCalendarEventFragmentDoc}`;

/**
 * __useTeamCalendarEventQuery__
 *
 * To run a query within a React component, call `useTeamCalendarEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamCalendarEventQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamCalendarEventQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamCalendarEventQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TeamCalendarEventQuery, TeamCalendarEventQueryVariables>) {
        return ApolloReactHooks.useQuery<TeamCalendarEventQuery, TeamCalendarEventQueryVariables>(TeamCalendarEventDocument, baseOptions);
      }
export function useTeamCalendarEventLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TeamCalendarEventQuery, TeamCalendarEventQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TeamCalendarEventQuery, TeamCalendarEventQueryVariables>(TeamCalendarEventDocument, baseOptions);
        }
export type TeamCalendarEventQueryHookResult = ReturnType<typeof useTeamCalendarEventQuery>;
export type TeamCalendarEventLazyQueryHookResult = ReturnType<typeof useTeamCalendarEventLazyQuery>;
export type TeamCalendarEventQueryResult = ApolloReactCommon.QueryResult<TeamCalendarEventQuery, TeamCalendarEventQueryVariables>;
export const ResizeEventDocument = gql`
    mutation ResizeEvent($id: ID!, $start: String!, $end: String!) {
  result: eventUpdate(input: {event_id: $id, start: $start, end: $end}) {
    event {
      ...TeamCalendarEvent
    }
  }
}
    ${TeamCalendarEventFragmentDoc}`;
export type ResizeEventMutationFn = ApolloReactCommon.MutationFunction<ResizeEventMutation, ResizeEventMutationVariables>;

/**
 * __useResizeEventMutation__
 *
 * To run a mutation, you first call `useResizeEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResizeEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resizeEventMutation, { data, loading, error }] = useResizeEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useResizeEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ResizeEventMutation, ResizeEventMutationVariables>) {
        return ApolloReactHooks.useMutation<ResizeEventMutation, ResizeEventMutationVariables>(ResizeEventDocument, baseOptions);
      }
export type ResizeEventMutationHookResult = ReturnType<typeof useResizeEventMutation>;
export type ResizeEventMutationResult = ApolloReactCommon.MutationResult<ResizeEventMutation>;
export type ResizeEventMutationOptions = ApolloReactCommon.BaseMutationOptions<ResizeEventMutation, ResizeEventMutationVariables>;
export const TeamCalendarCreateEventDocument = gql`
    mutation TeamCalendarCreateEvent($start: String!, $end: String!, $title: String!, $description: String!, $room: String!) {
  result: eventCreate(input: {title: $title, start: $start, end: $end, description: $description, location: $room}) {
    ok
    event {
      ...TeamCalendarEvent
    }
  }
}
    ${TeamCalendarEventFragmentDoc}`;
export type TeamCalendarCreateEventMutationFn = ApolloReactCommon.MutationFunction<TeamCalendarCreateEventMutation, TeamCalendarCreateEventMutationVariables>;

/**
 * __useTeamCalendarCreateEventMutation__
 *
 * To run a mutation, you first call `useTeamCalendarCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTeamCalendarCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [teamCalendarCreateEventMutation, { data, loading, error }] = useTeamCalendarCreateEventMutation({
 *   variables: {
 *      start: // value for 'start'
 *      end: // value for 'end'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      room: // value for 'room'
 *   },
 * });
 */
export function useTeamCalendarCreateEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TeamCalendarCreateEventMutation, TeamCalendarCreateEventMutationVariables>) {
        return ApolloReactHooks.useMutation<TeamCalendarCreateEventMutation, TeamCalendarCreateEventMutationVariables>(TeamCalendarCreateEventDocument, baseOptions);
      }
export type TeamCalendarCreateEventMutationHookResult = ReturnType<typeof useTeamCalendarCreateEventMutation>;
export type TeamCalendarCreateEventMutationResult = ApolloReactCommon.MutationResult<TeamCalendarCreateEventMutation>;
export type TeamCalendarCreateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<TeamCalendarCreateEventMutation, TeamCalendarCreateEventMutationVariables>;
export const TeamCalendarUpdateEventDocument = gql`
    mutation TeamCalendarUpdateEvent($id: ID!, $title: String, $description: String, $location: String) {
  result: eventUpdate(input: {event_id: $id, title: $title, description: $description, location: $location}) {
    ok
    event {
      ...TeamCalendarEvent
    }
  }
}
    ${TeamCalendarEventFragmentDoc}`;
export type TeamCalendarUpdateEventMutationFn = ApolloReactCommon.MutationFunction<TeamCalendarUpdateEventMutation, TeamCalendarUpdateEventMutationVariables>;

/**
 * __useTeamCalendarUpdateEventMutation__
 *
 * To run a mutation, you first call `useTeamCalendarUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTeamCalendarUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [teamCalendarUpdateEventMutation, { data, loading, error }] = useTeamCalendarUpdateEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      location: // value for 'location'
 *   },
 * });
 */
export function useTeamCalendarUpdateEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TeamCalendarUpdateEventMutation, TeamCalendarUpdateEventMutationVariables>) {
        return ApolloReactHooks.useMutation<TeamCalendarUpdateEventMutation, TeamCalendarUpdateEventMutationVariables>(TeamCalendarUpdateEventDocument, baseOptions);
      }
export type TeamCalendarUpdateEventMutationHookResult = ReturnType<typeof useTeamCalendarUpdateEventMutation>;
export type TeamCalendarUpdateEventMutationResult = ApolloReactCommon.MutationResult<TeamCalendarUpdateEventMutation>;
export type TeamCalendarUpdateEventMutationOptions = ApolloReactCommon.BaseMutationOptions<TeamCalendarUpdateEventMutation, TeamCalendarUpdateEventMutationVariables>;
export const TeamCalendarDeleteEventDocument = gql`
    mutation TeamCalendarDeleteEvent($id: ID!) {
  result: eventDelete(input: {event_id: $id}) {
    ok
  }
}
    `;
export type TeamCalendarDeleteEventMutationFn = ApolloReactCommon.MutationFunction<TeamCalendarDeleteEventMutation, TeamCalendarDeleteEventMutationVariables>;

/**
 * __useTeamCalendarDeleteEventMutation__
 *
 * To run a mutation, you first call `useTeamCalendarDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTeamCalendarDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [teamCalendarDeleteEventMutation, { data, loading, error }] = useTeamCalendarDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamCalendarDeleteEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TeamCalendarDeleteEventMutation, TeamCalendarDeleteEventMutationVariables>) {
        return ApolloReactHooks.useMutation<TeamCalendarDeleteEventMutation, TeamCalendarDeleteEventMutationVariables>(TeamCalendarDeleteEventDocument, baseOptions);
      }
export type TeamCalendarDeleteEventMutationHookResult = ReturnType<typeof useTeamCalendarDeleteEventMutation>;
export type TeamCalendarDeleteEventMutationResult = ApolloReactCommon.MutationResult<TeamCalendarDeleteEventMutation>;
export type TeamCalendarDeleteEventMutationOptions = ApolloReactCommon.BaseMutationOptions<TeamCalendarDeleteEventMutation, TeamCalendarDeleteEventMutationVariables>;
export const TeamEventDetailsDocument = gql`
    query TeamEventDetails($id: ID!) {
  event(event_id: $id) {
    ...TeamEventDetails
  }
}
    ${TeamEventDetailsFragmentDoc}`;

/**
 * __useTeamEventDetailsQuery__
 *
 * To run a query within a React component, call `useTeamEventDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTeamEventDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTeamEventDetailsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTeamEventDetailsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<TeamEventDetailsQuery, TeamEventDetailsQueryVariables>) {
        return ApolloReactHooks.useQuery<TeamEventDetailsQuery, TeamEventDetailsQueryVariables>(TeamEventDetailsDocument, baseOptions);
      }
export function useTeamEventDetailsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<TeamEventDetailsQuery, TeamEventDetailsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<TeamEventDetailsQuery, TeamEventDetailsQueryVariables>(TeamEventDetailsDocument, baseOptions);
        }
export type TeamEventDetailsQueryHookResult = ReturnType<typeof useTeamEventDetailsQuery>;
export type TeamEventDetailsLazyQueryHookResult = ReturnType<typeof useTeamEventDetailsLazyQuery>;
export type TeamEventDetailsQueryResult = ApolloReactCommon.QueryResult<TeamEventDetailsQuery, TeamEventDetailsQueryVariables>;
export const EventFeedbackCreateDocument = gql`
    mutation EventFeedbackCreate($event_id: ID!, $overall_score: Int, $recommend_score: Int, $content_score: Int, $conductor_score: Int, $source_friend: Boolean!, $source_vk: Boolean!, $source_fb: Boolean!, $source_timepad: Boolean!, $source_email: Boolean!, $source_website: Boolean!, $custom_source: String!, $comment: String!) {
  result: eventsFeedbackCreate(input: {event_id: $event_id, overall_score: $overall_score, recommend_score: $recommend_score, content_score: $content_score, conductor_score: $conductor_score, source_friend: $source_friend, source_vk: $source_vk, source_fb: $source_fb, source_timepad: $source_timepad, source_email: $source_email, source_website: $source_website, custom_source: $custom_source, comment: $comment}) {
    ok
    feedback {
      ...TeamEventFeedback
    }
  }
}
    ${TeamEventFeedbackFragmentDoc}`;
export type EventFeedbackCreateMutationFn = ApolloReactCommon.MutationFunction<EventFeedbackCreateMutation, EventFeedbackCreateMutationVariables>;

/**
 * __useEventFeedbackCreateMutation__
 *
 * To run a mutation, you first call `useEventFeedbackCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventFeedbackCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventFeedbackCreateMutation, { data, loading, error }] = useEventFeedbackCreateMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *      overall_score: // value for 'overall_score'
 *      recommend_score: // value for 'recommend_score'
 *      content_score: // value for 'content_score'
 *      conductor_score: // value for 'conductor_score'
 *      source_friend: // value for 'source_friend'
 *      source_vk: // value for 'source_vk'
 *      source_fb: // value for 'source_fb'
 *      source_timepad: // value for 'source_timepad'
 *      source_email: // value for 'source_email'
 *      source_website: // value for 'source_website'
 *      custom_source: // value for 'custom_source'
 *      comment: // value for 'comment'
 *   },
 * });
 */
export function useEventFeedbackCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EventFeedbackCreateMutation, EventFeedbackCreateMutationVariables>) {
        return ApolloReactHooks.useMutation<EventFeedbackCreateMutation, EventFeedbackCreateMutationVariables>(EventFeedbackCreateDocument, baseOptions);
      }
export type EventFeedbackCreateMutationHookResult = ReturnType<typeof useEventFeedbackCreateMutation>;
export type EventFeedbackCreateMutationResult = ApolloReactCommon.MutationResult<EventFeedbackCreateMutation>;
export type EventFeedbackCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<EventFeedbackCreateMutation, EventFeedbackCreateMutationVariables>;
export const EventFeedbackDeleteDocument = gql`
    mutation EventFeedbackDelete($id: ID!) {
  result: eventsFeedbackDelete(input: {id: $id}) {
    ok
  }
}
    `;
export type EventFeedbackDeleteMutationFn = ApolloReactCommon.MutationFunction<EventFeedbackDeleteMutation, EventFeedbackDeleteMutationVariables>;

/**
 * __useEventFeedbackDeleteMutation__
 *
 * To run a mutation, you first call `useEventFeedbackDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventFeedbackDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventFeedbackDeleteMutation, { data, loading, error }] = useEventFeedbackDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventFeedbackDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EventFeedbackDeleteMutation, EventFeedbackDeleteMutationVariables>) {
        return ApolloReactHooks.useMutation<EventFeedbackDeleteMutation, EventFeedbackDeleteMutationVariables>(EventFeedbackDeleteDocument, baseOptions);
      }
export type EventFeedbackDeleteMutationHookResult = ReturnType<typeof useEventFeedbackDeleteMutation>;
export type EventFeedbackDeleteMutationResult = ApolloReactCommon.MutationResult<EventFeedbackDeleteMutation>;
export type EventFeedbackDeleteMutationOptions = ApolloReactCommon.BaseMutationOptions<EventFeedbackDeleteMutation, EventFeedbackDeleteMutationVariables>;