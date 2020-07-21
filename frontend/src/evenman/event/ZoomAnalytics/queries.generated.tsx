import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type EvenmanEvent_ForZoomAnalyticsFragment = (
  { __typename?: 'EventsEvent' }
  & Pick<Types.EventsEvent, 'id'>
  & { zoom_meeting?: Types.Maybe<(
    { __typename?: 'ZoomMeeting' }
    & Pick<Types.ZoomMeeting, 'id'>
    & { instances: Array<(
      { __typename?: 'ZoomMeetingInstance' }
      & Pick<Types.ZoomMeetingInstance, 'id' | 'start_time' | 'end_time'>
      & { participants: Array<(
        { __typename?: 'ZoomParticipant' }
        & Pick<Types.ZoomParticipant, 'id' | 'name' | 'join_time' | 'leave_time'>
      )> }
    )> }
  )> }
);

export type EvenmanEventForZoomAnalyticsQueryVariables = {
  id: Types.Scalars['ID'];
};


export type EvenmanEventForZoomAnalyticsQuery = (
  { __typename?: 'Query' }
  & { event?: Types.Maybe<(
    { __typename?: 'EventsEvent' }
    & EvenmanEvent_ForZoomAnalyticsFragment
  )> }
);

export const EvenmanEvent_ForZoomAnalyticsFragmentDoc = gql`
    fragment EvenmanEvent_ForZoomAnalytics on EventsEvent {
  id
  zoom_meeting {
    id
    instances {
      id
      start_time
      end_time
      participants {
        id
        name
        join_time
        leave_time
      }
    }
  }
}
    `;
export const EvenmanEventForZoomAnalyticsDocument = gql`
    query EvenmanEventForZoomAnalytics($id: ID!) {
  event(event_id: $id) {
    ...EvenmanEvent_ForZoomAnalytics
  }
}
    ${EvenmanEvent_ForZoomAnalyticsFragmentDoc}`;

/**
 * __useEvenmanEventForZoomAnalyticsQuery__
 *
 * To run a query within a React component, call `useEvenmanEventForZoomAnalyticsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanEventForZoomAnalyticsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanEventForZoomAnalyticsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEvenmanEventForZoomAnalyticsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanEventForZoomAnalyticsQuery, EvenmanEventForZoomAnalyticsQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanEventForZoomAnalyticsQuery, EvenmanEventForZoomAnalyticsQueryVariables>(EvenmanEventForZoomAnalyticsDocument, baseOptions);
      }
export function useEvenmanEventForZoomAnalyticsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanEventForZoomAnalyticsQuery, EvenmanEventForZoomAnalyticsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanEventForZoomAnalyticsQuery, EvenmanEventForZoomAnalyticsQueryVariables>(EvenmanEventForZoomAnalyticsDocument, baseOptions);
        }
export type EvenmanEventForZoomAnalyticsQueryHookResult = ReturnType<typeof useEvenmanEventForZoomAnalyticsQuery>;
export type EvenmanEventForZoomAnalyticsLazyQueryHookResult = ReturnType<typeof useEvenmanEventForZoomAnalyticsLazyQuery>;
export type EvenmanEventForZoomAnalyticsQueryResult = ApolloReactCommon.QueryResult<EvenmanEventForZoomAnalyticsQuery, EvenmanEventForZoomAnalyticsQueryVariables>;