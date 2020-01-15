import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type ProjectPage_SummaryForEventFragment = (
  { __typename?: 'ProjectPage' }
  & Pick<Types.ProjectPage, 'id' | 'title' | 'is_active'>
  & { meta: (
    { __typename?: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug'>
  ), upcoming_events: Array<(
    { __typename?: 'EventsPublicEvent' }
    & Pick<Types.EventsPublicEvent, 'event_id' | 'title'>
  )> }
);

export type EventsPublicEventFragment = (
  { __typename?: 'EventsPublicEvent' }
  & Pick<Types.EventsPublicEvent, 'event_id' | 'start' | 'title' | 'description' | 'image' | 'registration_type' | 'pricing_type'>
  & { project: Types.Maybe<(
    { __typename?: 'ProjectPage' }
    & ProjectPage_SummaryForEventFragment
  )>, my_ticket: Types.Maybe<(
    { __typename?: 'MyEventsTicket' }
    & Pick<Types.MyEventsTicket, 'created'>
  )>, announcements: (
    { __typename?: 'EventsAnnouncements' }
    & { timepad: Types.Maybe<(
      { __typename?: 'EventsTimepadAnnouncement' }
      & Pick<Types.EventsTimepadAnnouncement, 'link'>
    )> }
  ) }
);

export type GetPublicEventQueryVariables = {
  event_id: Types.Scalars['ID']
};


export type GetPublicEventQuery = (
  { __typename?: 'Query' }
  & { publicEvent: (
    { __typename?: 'EventsPublicEvent' }
    & EventsPublicEventFragment
  ) }
);

export const ProjectPage_SummaryForEventFragmentDoc = gql`
    fragment ProjectPage_SummaryForEvent on ProjectPage {
  id
  meta {
    slug
  }
  title
  is_active
  upcoming_events {
    event_id
    title
  }
}
    `;
export const EventsPublicEventFragmentDoc = gql`
    fragment EventsPublicEvent on EventsPublicEvent {
  event_id
  start
  title
  description
  image
  registration_type
  pricing_type
  project {
    ...ProjectPage_SummaryForEvent
  }
  my_ticket {
    created
  }
  announcements {
    timepad {
      link
    }
  }
}
    ${ProjectPage_SummaryForEventFragmentDoc}`;
export const GetPublicEventDocument = gql`
    query GetPublicEvent($event_id: ID!) {
  publicEvent(event_id: $event_id) {
    ...EventsPublicEvent
  }
}
    ${EventsPublicEventFragmentDoc}`;

/**
 * __useGetPublicEventQuery__
 *
 * To run a query within a React component, call `useGetPublicEventQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicEventQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicEventQuery({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useGetPublicEventQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetPublicEventQuery, GetPublicEventQueryVariables>) {
        return ApolloReactHooks.useQuery<GetPublicEventQuery, GetPublicEventQueryVariables>(GetPublicEventDocument, baseOptions);
      }
export function useGetPublicEventLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetPublicEventQuery, GetPublicEventQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetPublicEventQuery, GetPublicEventQueryVariables>(GetPublicEventDocument, baseOptions);
        }
export type GetPublicEventQueryHookResult = ReturnType<typeof useGetPublicEventQuery>;
export type GetPublicEventLazyQueryHookResult = ReturnType<typeof useGetPublicEventLazyQuery>;
export type GetPublicEventQueryResult = ApolloReactCommon.QueryResult<GetPublicEventQuery, GetPublicEventQueryVariables>;