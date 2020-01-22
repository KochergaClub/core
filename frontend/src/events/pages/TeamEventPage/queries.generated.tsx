import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type EventsTicketFragment = (
  { __typename?: 'EventsTicket' }
  & Pick<Types.EventsTicket, 'id' | 'status'>
  & { user: (
    { __typename?: 'AuthUser' }
    & Pick<Types.AuthUser, 'email'>
  ) }
);

export type GetEventTicketsQueryVariables = {
  event_id: Types.Scalars['ID']
};


export type GetEventTicketsQuery = (
  { __typename?: 'Query' }
  & { event: Types.Maybe<(
    { __typename?: 'EventsEvent' }
    & { tickets: Array<(
      { __typename?: 'EventsTicket' }
      & EventsTicketFragment
    )> }
  )> }
);

export const EventsTicketFragmentDoc = gql`
    fragment EventsTicket on EventsTicket {
  id
  status
  user {
    email
  }
}
    `;
export const GetEventTicketsDocument = gql`
    query GetEventTickets($event_id: ID!) {
  event(event_id: $event_id) {
    tickets {
      ...EventsTicket
    }
  }
}
    ${EventsTicketFragmentDoc}`;

/**
 * __useGetEventTicketsQuery__
 *
 * To run a query within a React component, call `useGetEventTicketsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetEventTicketsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetEventTicketsQuery({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useGetEventTicketsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetEventTicketsQuery, GetEventTicketsQueryVariables>) {
        return ApolloReactHooks.useQuery<GetEventTicketsQuery, GetEventTicketsQueryVariables>(GetEventTicketsDocument, baseOptions);
      }
export function useGetEventTicketsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetEventTicketsQuery, GetEventTicketsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetEventTicketsQuery, GetEventTicketsQueryVariables>(GetEventTicketsDocument, baseOptions);
        }
export type GetEventTicketsQueryHookResult = ReturnType<typeof useGetEventTicketsQuery>;
export type GetEventTicketsLazyQueryHookResult = ReturnType<typeof useGetEventTicketsLazyQuery>;
export type GetEventTicketsQueryResult = ApolloReactCommon.QueryResult<GetEventTicketsQuery, GetEventTicketsQueryVariables>;