import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type EventsPublicEvent_SummaryFragment = (
  { __typename?: 'EventsPublicEvent' }
  & Pick<Types.EventsPublicEvent, 'event_id' | 'title' | 'summary' | 'image' | 'start'>
);

export type UpcomingPublicEventsQueryVariables = {
  today: Types.Scalars['String']
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

export const EventsPublicEvent_SummaryFragmentDoc = gql`
    fragment EventsPublicEvent_Summary on EventsPublicEvent {
  event_id
  title
  summary
  image
  start
}
    `;
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