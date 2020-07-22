import * as Types from '../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type EventsEvent_SummaryFragment = (
  { __typename?: 'EventsEvent' }
  & Pick<Types.EventsEvent, 'id' | 'title' | 'start' | 'published' | 'event_type'>
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
  start: Types.Scalars['String'];
  end: Types.Scalars['String'];
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
  & Pick<Types.EventsEvent, 'id' | 'title'>
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

export type EvenmanEvent_DetailsFragment = (
  { __typename?: 'EventsEvent' }
  & Pick<Types.EventsEvent, 'id' | 'created' | 'start' | 'end' | 'title' | 'summary' | 'description' | 'timing_description_override' | 'location' | 'zoom_link' | 'event_type' | 'pricing_type' | 'registration_type' | 'realm' | 'visitors' | 'tags' | 'published'>
  & { zoom_meeting?: Types.Maybe<(
    { __typename?: 'ZoomMeeting' }
    & Pick<Types.ZoomMeeting, 'id' | 'participants_count'>
  )>, image?: Types.Maybe<(
    { __typename?: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )>, imageForVkBackground?: Types.Maybe<(
    { __typename?: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'url'>
  )>, prototype?: Types.Maybe<(
    { __typename?: 'EventsPrototype' }
    & Pick<Types.EventsPrototype, 'id'>
  )>, project?: Types.Maybe<(
    { __typename?: 'ProjectPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'slug'>
    ) }
  )>, announcements: (
    { __typename?: 'EventsAnnouncements' }
    & { timepad: (
      { __typename?: 'EventsAnnouncementTimepad' }
      & Pick<Types.EventsAnnouncementTimepad, 'link' | 'category_code' | 'prepaid_tickets'>
    ), vk: (
      { __typename?: 'EventsAnnouncementVk' }
      & Pick<Types.EventsAnnouncementVk, 'link' | 'group'>
      & { image?: Types.Maybe<(
        { __typename?: 'WagtailImageRendition' }
        & Pick<Types.WagtailImageRendition, 'url'>
      )> }
    ), fb: (
      { __typename?: 'EventsAnnouncementFb' }
      & Pick<Types.EventsAnnouncementFb, 'link' | 'group'>
    ) }
  ) }
);

export type EvenmanEventQueryVariables = {
  id: Types.Scalars['ID'];
};


export type EvenmanEventQuery = (
  { __typename?: 'Query' }
  & { event?: Types.Maybe<(
    { __typename?: 'EventsEvent' }
    & EvenmanEvent_DetailsFragment
  )> }
);

export type EvenmanSetEventTypeMutationVariables = {
  id: Types.Scalars['ID'];
  event_type: Types.Scalars['String'];
};


export type EvenmanSetEventTypeMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & Pick<Types.EventsEvent, 'id' | 'event_type'>
    ) }
  ) }
);

export type EvenmanSetZoomLinkMutationVariables = {
  id: Types.Scalars['ID'];
  link: Types.Scalars['String'];
};


export type EvenmanSetZoomLinkMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & Pick<Types.EventsEvent, 'id' | 'zoom_link'>
    ) }
  ) }
);

export type EvenmanGenerateZoomLinkMutationVariables = {
  id: Types.Scalars['ID'];
};


export type EvenmanGenerateZoomLinkMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & Pick<Types.EventsEvent, 'id' | 'zoom_link'>
    ) }
  ) }
);

export type EvenmanUpdateMutationVariables = {
  id: Types.Scalars['ID'];
  published?: Types.Maybe<Types.Scalars['Boolean']>;
  visitors?: Types.Maybe<Types.Scalars['String']>;
  title?: Types.Maybe<Types.Scalars['String']>;
  description?: Types.Maybe<Types.Scalars['String']>;
  summary?: Types.Maybe<Types.Scalars['String']>;
  event_type?: Types.Maybe<Types.Scalars['String']>;
  registration_type?: Types.Maybe<Types.Scalars['String']>;
  pricing_type?: Types.Maybe<Types.Scalars['String']>;
  realm?: Types.Maybe<Types.Scalars['String']>;
  location?: Types.Maybe<Types.Scalars['String']>;
  prototype_id?: Types.Maybe<Types.Scalars['ID']>;
  project_slug?: Types.Maybe<Types.Scalars['String']>;
  timing_description_override?: Types.Maybe<Types.Scalars['String']>;
  image_id?: Types.Maybe<Types.Scalars['ID']>;
};


export type EvenmanUpdateMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & EvenmanEvent_DetailsFragment
    ) }
  ) }
);

export type EvenmanEventDeleteMutationVariables = {
  id: Types.Scalars['ID'];
};


export type EvenmanEventDeleteMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type EvenmanEventAddTagMutationVariables = {
  id: Types.Scalars['ID'];
  tag: Types.Scalars['String'];
};


export type EvenmanEventAddTagMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & Pick<Types.EventsEvent, 'id' | 'tags'>
    ) }
  ) }
);

export type EvenmanEventDeleteTagMutationVariables = {
  id: Types.Scalars['ID'];
  tag: Types.Scalars['String'];
};


export type EvenmanEventDeleteTagMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & Pick<Types.EventsEvent, 'id' | 'tags'>
    ) }
  ) }
);

export type EvenmanEventSetImageFromUrlMutationVariables = {
  id: Types.Scalars['ID'];
  url: Types.Scalars['String'];
};


export type EvenmanEventSetImageFromUrlMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & EvenmanEvent_DetailsFragment
    ) }
  ) }
);

export type EvenmanVkAnnouncementSetImageMutationVariables = {
  event_id: Types.Scalars['ID'];
  image_id: Types.Scalars['ID'];
};


export type EvenmanVkAnnouncementSetImageMutation = (
  { __typename?: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & EvenmanEvent_DetailsFragment
    ) }
  )> }
);

export type EvenmanAnnounceMutationVariables = {
  event_id: Types.Scalars['ID'];
  target: Types.EventAnnounceTarget;
};


export type EvenmanAnnounceMutation = (
  { __typename?: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & EvenmanEvent_DetailsFragment
    ) }
  )> }
);

export type EvenmanSetAnnounceUrlMutationVariables = {
  event_id: Types.Scalars['ID'];
  target: Types.EventAnnounceTarget;
  url: Types.Scalars['String'];
};


export type EvenmanSetAnnounceUrlMutation = (
  { __typename?: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & EvenmanEvent_DetailsFragment
    ) }
  )> }
);

export type EvenmanEventMoveMutationVariables = {
  event_id: Types.Scalars['ID'];
  start: Types.Scalars['String'];
};


export type EvenmanEventMoveMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & Pick<Types.EventsEvent, 'id' | 'start' | 'end'>
    ) }
  ) }
);

export type EvenmanEventCreateMutationVariables = {
  title: Types.Scalars['String'];
  start: Types.Scalars['String'];
  end: Types.Scalars['String'];
};


export type EvenmanEventCreateMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventCreateResult' }
    & Pick<Types.EventCreateResult, 'ok'>
    & { event: (
      { __typename?: 'EventsEvent' }
      & EvenmanEvent_DetailsFragment
    ) }
  ) }
);

export type OnEventsSubscriptionVariables = {};


export type OnEventsSubscription = (
  { __typename?: 'Subscription' }
  & { events: (
    { __typename?: 'EventNotification' }
    & Pick<Types.EventNotification, 'type' | 'id'>
  ) }
);

export type EvenmanPrototypesForPickerQueryVariables = {};


export type EvenmanPrototypesForPickerQuery = (
  { __typename?: 'Query' }
  & { prototypes: Array<(
    { __typename?: 'EventsPrototype' }
    & Pick<Types.EventsPrototype, 'id' | 'title'>
  )> }
);

export const EventsEvent_SummaryFragmentDoc = gql`
    fragment EventsEvent_Summary on EventsEvent {
  id
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
  id
  title
}
    `;
export const EvenmanEvent_DetailsFragmentDoc = gql`
    fragment EvenmanEvent_Details on EventsEvent {
  id
  created
  start
  end
  title
  summary
  description
  timing_description_override
  location
  zoom_link
  zoom_meeting {
    id
    participants_count
  }
  event_type
  pricing_type
  registration_type
  realm
  visitors
  tags
  image(spec: "width-240") {
    id
    url
  }
  imageForVkBackground: image(spec: "width-1100") {
    url
  }
  prototype {
    id
  }
  project {
    meta {
      slug
    }
  }
  published
  announcements {
    timepad {
      link
      category_code
      prepaid_tickets
    }
    vk {
      link
      group
      image(spec: "width-240") {
        url
      }
    }
    fb {
      link
      group
    }
  }
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
    ...EvenmanEvent_Details
  }
}
    ${EvenmanEvent_DetailsFragmentDoc}`;

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
    event {
      id
      event_type
    }
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
export const EvenmanSetZoomLinkDocument = gql`
    mutation EvenmanSetZoomLink($id: ID!, $link: String!) {
  result: eventSetZoomLink(input: {event_id: $id, zoom_link: $link}) {
    ok
    event {
      id
      zoom_link
    }
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
    event {
      id
      zoom_link
    }
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
export const EvenmanUpdateDocument = gql`
    mutation EvenmanUpdate($id: ID!, $published: Boolean, $visitors: String, $title: String, $description: String, $summary: String, $event_type: String, $registration_type: String, $pricing_type: String, $realm: String, $location: String, $prototype_id: ID, $project_slug: String, $timing_description_override: String, $image_id: ID) {
  result: eventUpdate(input: {event_id: $id, published: $published, visitors: $visitors, title: $title, description: $description, summary: $summary, event_type: $event_type, registration_type: $registration_type, pricing_type: $pricing_type, realm: $realm, location: $location, prototype_id: $prototype_id, project_slug: $project_slug, timing_description_override: $timing_description_override, image_id: $image_id}) {
    ok
    event {
      ...EvenmanEvent_Details
    }
  }
}
    ${EvenmanEvent_DetailsFragmentDoc}`;
export type EvenmanUpdateMutationFn = ApolloReactCommon.MutationFunction<EvenmanUpdateMutation, EvenmanUpdateMutationVariables>;

/**
 * __useEvenmanUpdateMutation__
 *
 * To run a mutation, you first call `useEvenmanUpdateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanUpdateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanUpdateMutation, { data, loading, error }] = useEvenmanUpdateMutation({
 *   variables: {
 *      id: // value for 'id'
 *      published: // value for 'published'
 *      visitors: // value for 'visitors'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      summary: // value for 'summary'
 *      event_type: // value for 'event_type'
 *      registration_type: // value for 'registration_type'
 *      pricing_type: // value for 'pricing_type'
 *      realm: // value for 'realm'
 *      location: // value for 'location'
 *      prototype_id: // value for 'prototype_id'
 *      project_slug: // value for 'project_slug'
 *      timing_description_override: // value for 'timing_description_override'
 *      image_id: // value for 'image_id'
 *   },
 * });
 */
export function useEvenmanUpdateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanUpdateMutation, EvenmanUpdateMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanUpdateMutation, EvenmanUpdateMutationVariables>(EvenmanUpdateDocument, baseOptions);
      }
export type EvenmanUpdateMutationHookResult = ReturnType<typeof useEvenmanUpdateMutation>;
export type EvenmanUpdateMutationResult = ApolloReactCommon.MutationResult<EvenmanUpdateMutation>;
export type EvenmanUpdateMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanUpdateMutation, EvenmanUpdateMutationVariables>;
export const EvenmanEventDeleteDocument = gql`
    mutation EvenmanEventDelete($id: ID!) {
  result: eventDelete(input: {event_id: $id}) {
    ok
  }
}
    `;
export type EvenmanEventDeleteMutationFn = ApolloReactCommon.MutationFunction<EvenmanEventDeleteMutation, EvenmanEventDeleteMutationVariables>;

/**
 * __useEvenmanEventDeleteMutation__
 *
 * To run a mutation, you first call `useEvenmanEventDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanEventDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanEventDeleteMutation, { data, loading, error }] = useEvenmanEventDeleteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEvenmanEventDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanEventDeleteMutation, EvenmanEventDeleteMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanEventDeleteMutation, EvenmanEventDeleteMutationVariables>(EvenmanEventDeleteDocument, baseOptions);
      }
export type EvenmanEventDeleteMutationHookResult = ReturnType<typeof useEvenmanEventDeleteMutation>;
export type EvenmanEventDeleteMutationResult = ApolloReactCommon.MutationResult<EvenmanEventDeleteMutation>;
export type EvenmanEventDeleteMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanEventDeleteMutation, EvenmanEventDeleteMutationVariables>;
export const EvenmanEventAddTagDocument = gql`
    mutation EvenmanEventAddTag($id: ID!, $tag: String!) {
  result: eventAddTag(input: {event_id: $id, tag: $tag}) {
    ok
    event {
      id
      tags
    }
  }
}
    `;
export type EvenmanEventAddTagMutationFn = ApolloReactCommon.MutationFunction<EvenmanEventAddTagMutation, EvenmanEventAddTagMutationVariables>;

/**
 * __useEvenmanEventAddTagMutation__
 *
 * To run a mutation, you first call `useEvenmanEventAddTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanEventAddTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanEventAddTagMutation, { data, loading, error }] = useEvenmanEventAddTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useEvenmanEventAddTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanEventAddTagMutation, EvenmanEventAddTagMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanEventAddTagMutation, EvenmanEventAddTagMutationVariables>(EvenmanEventAddTagDocument, baseOptions);
      }
export type EvenmanEventAddTagMutationHookResult = ReturnType<typeof useEvenmanEventAddTagMutation>;
export type EvenmanEventAddTagMutationResult = ApolloReactCommon.MutationResult<EvenmanEventAddTagMutation>;
export type EvenmanEventAddTagMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanEventAddTagMutation, EvenmanEventAddTagMutationVariables>;
export const EvenmanEventDeleteTagDocument = gql`
    mutation EvenmanEventDeleteTag($id: ID!, $tag: String!) {
  result: eventDeleteTag(input: {event_id: $id, tag: $tag}) {
    ok
    event {
      id
      tags
    }
  }
}
    `;
export type EvenmanEventDeleteTagMutationFn = ApolloReactCommon.MutationFunction<EvenmanEventDeleteTagMutation, EvenmanEventDeleteTagMutationVariables>;

/**
 * __useEvenmanEventDeleteTagMutation__
 *
 * To run a mutation, you first call `useEvenmanEventDeleteTagMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanEventDeleteTagMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanEventDeleteTagMutation, { data, loading, error }] = useEvenmanEventDeleteTagMutation({
 *   variables: {
 *      id: // value for 'id'
 *      tag: // value for 'tag'
 *   },
 * });
 */
export function useEvenmanEventDeleteTagMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanEventDeleteTagMutation, EvenmanEventDeleteTagMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanEventDeleteTagMutation, EvenmanEventDeleteTagMutationVariables>(EvenmanEventDeleteTagDocument, baseOptions);
      }
export type EvenmanEventDeleteTagMutationHookResult = ReturnType<typeof useEvenmanEventDeleteTagMutation>;
export type EvenmanEventDeleteTagMutationResult = ApolloReactCommon.MutationResult<EvenmanEventDeleteTagMutation>;
export type EvenmanEventDeleteTagMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanEventDeleteTagMutation, EvenmanEventDeleteTagMutationVariables>;
export const EvenmanEventSetImageFromUrlDocument = gql`
    mutation EvenmanEventSetImageFromUrl($id: ID!, $url: String!) {
  result: eventSetImageFromUrl(input: {event_id: $id, url: $url}) {
    ok
    event {
      ...EvenmanEvent_Details
    }
  }
}
    ${EvenmanEvent_DetailsFragmentDoc}`;
export type EvenmanEventSetImageFromUrlMutationFn = ApolloReactCommon.MutationFunction<EvenmanEventSetImageFromUrlMutation, EvenmanEventSetImageFromUrlMutationVariables>;

/**
 * __useEvenmanEventSetImageFromUrlMutation__
 *
 * To run a mutation, you first call `useEvenmanEventSetImageFromUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanEventSetImageFromUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanEventSetImageFromUrlMutation, { data, loading, error }] = useEvenmanEventSetImageFromUrlMutation({
 *   variables: {
 *      id: // value for 'id'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useEvenmanEventSetImageFromUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanEventSetImageFromUrlMutation, EvenmanEventSetImageFromUrlMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanEventSetImageFromUrlMutation, EvenmanEventSetImageFromUrlMutationVariables>(EvenmanEventSetImageFromUrlDocument, baseOptions);
      }
export type EvenmanEventSetImageFromUrlMutationHookResult = ReturnType<typeof useEvenmanEventSetImageFromUrlMutation>;
export type EvenmanEventSetImageFromUrlMutationResult = ApolloReactCommon.MutationResult<EvenmanEventSetImageFromUrlMutation>;
export type EvenmanEventSetImageFromUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanEventSetImageFromUrlMutation, EvenmanEventSetImageFromUrlMutationVariables>;
export const EvenmanVkAnnouncementSetImageDocument = gql`
    mutation EvenmanVkAnnouncementSetImage($event_id: ID!, $image_id: ID!) {
  result: eventVkAnnouncementSetImage(input: {event_id: $event_id, image_id: $image_id}) {
    ok
    event {
      ...EvenmanEvent_Details
    }
  }
}
    ${EvenmanEvent_DetailsFragmentDoc}`;
export type EvenmanVkAnnouncementSetImageMutationFn = ApolloReactCommon.MutationFunction<EvenmanVkAnnouncementSetImageMutation, EvenmanVkAnnouncementSetImageMutationVariables>;

/**
 * __useEvenmanVkAnnouncementSetImageMutation__
 *
 * To run a mutation, you first call `useEvenmanVkAnnouncementSetImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanVkAnnouncementSetImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanVkAnnouncementSetImageMutation, { data, loading, error }] = useEvenmanVkAnnouncementSetImageMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *      image_id: // value for 'image_id'
 *   },
 * });
 */
export function useEvenmanVkAnnouncementSetImageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanVkAnnouncementSetImageMutation, EvenmanVkAnnouncementSetImageMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanVkAnnouncementSetImageMutation, EvenmanVkAnnouncementSetImageMutationVariables>(EvenmanVkAnnouncementSetImageDocument, baseOptions);
      }
export type EvenmanVkAnnouncementSetImageMutationHookResult = ReturnType<typeof useEvenmanVkAnnouncementSetImageMutation>;
export type EvenmanVkAnnouncementSetImageMutationResult = ApolloReactCommon.MutationResult<EvenmanVkAnnouncementSetImageMutation>;
export type EvenmanVkAnnouncementSetImageMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanVkAnnouncementSetImageMutation, EvenmanVkAnnouncementSetImageMutationVariables>;
export const EvenmanAnnounceDocument = gql`
    mutation EvenmanAnnounce($event_id: ID!, $target: EventAnnounceTarget!) {
  result: eventAnnounce(input: {event_id: $event_id, target: $target}) {
    ok
    event {
      ...EvenmanEvent_Details
    }
  }
}
    ${EvenmanEvent_DetailsFragmentDoc}`;
export type EvenmanAnnounceMutationFn = ApolloReactCommon.MutationFunction<EvenmanAnnounceMutation, EvenmanAnnounceMutationVariables>;

/**
 * __useEvenmanAnnounceMutation__
 *
 * To run a mutation, you first call `useEvenmanAnnounceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanAnnounceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanAnnounceMutation, { data, loading, error }] = useEvenmanAnnounceMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *      target: // value for 'target'
 *   },
 * });
 */
export function useEvenmanAnnounceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanAnnounceMutation, EvenmanAnnounceMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanAnnounceMutation, EvenmanAnnounceMutationVariables>(EvenmanAnnounceDocument, baseOptions);
      }
export type EvenmanAnnounceMutationHookResult = ReturnType<typeof useEvenmanAnnounceMutation>;
export type EvenmanAnnounceMutationResult = ApolloReactCommon.MutationResult<EvenmanAnnounceMutation>;
export type EvenmanAnnounceMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanAnnounceMutation, EvenmanAnnounceMutationVariables>;
export const EvenmanSetAnnounceUrlDocument = gql`
    mutation EvenmanSetAnnounceUrl($event_id: ID!, $target: EventAnnounceTarget!, $url: String!) {
  result: eventSetAnnounceUrl(input: {event_id: $event_id, target: $target, url: $url}) {
    ok
    event {
      ...EvenmanEvent_Details
    }
  }
}
    ${EvenmanEvent_DetailsFragmentDoc}`;
export type EvenmanSetAnnounceUrlMutationFn = ApolloReactCommon.MutationFunction<EvenmanSetAnnounceUrlMutation, EvenmanSetAnnounceUrlMutationVariables>;

/**
 * __useEvenmanSetAnnounceUrlMutation__
 *
 * To run a mutation, you first call `useEvenmanSetAnnounceUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanSetAnnounceUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanSetAnnounceUrlMutation, { data, loading, error }] = useEvenmanSetAnnounceUrlMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *      target: // value for 'target'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useEvenmanSetAnnounceUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanSetAnnounceUrlMutation, EvenmanSetAnnounceUrlMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanSetAnnounceUrlMutation, EvenmanSetAnnounceUrlMutationVariables>(EvenmanSetAnnounceUrlDocument, baseOptions);
      }
export type EvenmanSetAnnounceUrlMutationHookResult = ReturnType<typeof useEvenmanSetAnnounceUrlMutation>;
export type EvenmanSetAnnounceUrlMutationResult = ApolloReactCommon.MutationResult<EvenmanSetAnnounceUrlMutation>;
export type EvenmanSetAnnounceUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanSetAnnounceUrlMutation, EvenmanSetAnnounceUrlMutationVariables>;
export const EvenmanEventMoveDocument = gql`
    mutation EvenmanEventMove($event_id: ID!, $start: String!) {
  result: eventMove(input: {event_id: $event_id, start: $start}) {
    ok
    event {
      id
      start
      end
    }
  }
}
    `;
export type EvenmanEventMoveMutationFn = ApolloReactCommon.MutationFunction<EvenmanEventMoveMutation, EvenmanEventMoveMutationVariables>;

/**
 * __useEvenmanEventMoveMutation__
 *
 * To run a mutation, you first call `useEvenmanEventMoveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanEventMoveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanEventMoveMutation, { data, loading, error }] = useEvenmanEventMoveMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *      start: // value for 'start'
 *   },
 * });
 */
export function useEvenmanEventMoveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanEventMoveMutation, EvenmanEventMoveMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanEventMoveMutation, EvenmanEventMoveMutationVariables>(EvenmanEventMoveDocument, baseOptions);
      }
export type EvenmanEventMoveMutationHookResult = ReturnType<typeof useEvenmanEventMoveMutation>;
export type EvenmanEventMoveMutationResult = ApolloReactCommon.MutationResult<EvenmanEventMoveMutation>;
export type EvenmanEventMoveMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanEventMoveMutation, EvenmanEventMoveMutationVariables>;
export const EvenmanEventCreateDocument = gql`
    mutation EvenmanEventCreate($title: String!, $start: String!, $end: String!) {
  result: eventCreate(input: {title: $title, start: $start, end: $end}) {
    ok
    event {
      ...EvenmanEvent_Details
    }
  }
}
    ${EvenmanEvent_DetailsFragmentDoc}`;
export type EvenmanEventCreateMutationFn = ApolloReactCommon.MutationFunction<EvenmanEventCreateMutation, EvenmanEventCreateMutationVariables>;

/**
 * __useEvenmanEventCreateMutation__
 *
 * To run a mutation, you first call `useEvenmanEventCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanEventCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanEventCreateMutation, { data, loading, error }] = useEvenmanEventCreateMutation({
 *   variables: {
 *      title: // value for 'title'
 *      start: // value for 'start'
 *      end: // value for 'end'
 *   },
 * });
 */
export function useEvenmanEventCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanEventCreateMutation, EvenmanEventCreateMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanEventCreateMutation, EvenmanEventCreateMutationVariables>(EvenmanEventCreateDocument, baseOptions);
      }
export type EvenmanEventCreateMutationHookResult = ReturnType<typeof useEvenmanEventCreateMutation>;
export type EvenmanEventCreateMutationResult = ApolloReactCommon.MutationResult<EvenmanEventCreateMutation>;
export type EvenmanEventCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanEventCreateMutation, EvenmanEventCreateMutationVariables>;
export const OnEventsDocument = gql`
    subscription onEvents {
  events {
    type
    id
  }
}
    `;

/**
 * __useOnEventsSubscription__
 *
 * To run a query within a React component, call `useOnEventsSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnEventsSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnEventsSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnEventsSubscription(baseOptions?: ApolloReactHooks.SubscriptionHookOptions<OnEventsSubscription, OnEventsSubscriptionVariables>) {
        return ApolloReactHooks.useSubscription<OnEventsSubscription, OnEventsSubscriptionVariables>(OnEventsDocument, baseOptions);
      }
export type OnEventsSubscriptionHookResult = ReturnType<typeof useOnEventsSubscription>;
export type OnEventsSubscriptionResult = ApolloReactCommon.SubscriptionResult<OnEventsSubscription>;
export const EvenmanPrototypesForPickerDocument = gql`
    query EvenmanPrototypesForPicker {
  prototypes: eventsPrototypes {
    id
    title
  }
}
    `;

/**
 * __useEvenmanPrototypesForPickerQuery__
 *
 * To run a query within a React component, call `useEvenmanPrototypesForPickerQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypesForPickerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanPrototypesForPickerQuery({
 *   variables: {
 *   },
 * });
 */
export function useEvenmanPrototypesForPickerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanPrototypesForPickerQuery, EvenmanPrototypesForPickerQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanPrototypesForPickerQuery, EvenmanPrototypesForPickerQueryVariables>(EvenmanPrototypesForPickerDocument, baseOptions);
      }
export function useEvenmanPrototypesForPickerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanPrototypesForPickerQuery, EvenmanPrototypesForPickerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanPrototypesForPickerQuery, EvenmanPrototypesForPickerQueryVariables>(EvenmanPrototypesForPickerDocument, baseOptions);
        }
export type EvenmanPrototypesForPickerQueryHookResult = ReturnType<typeof useEvenmanPrototypesForPickerQuery>;
export type EvenmanPrototypesForPickerLazyQueryHookResult = ReturnType<typeof useEvenmanPrototypesForPickerLazyQuery>;
export type EvenmanPrototypesForPickerQueryResult = ApolloReactCommon.QueryResult<EvenmanPrototypesForPickerQuery, EvenmanPrototypesForPickerQueryVariables>;