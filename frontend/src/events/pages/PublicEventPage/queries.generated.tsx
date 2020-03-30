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

export type MyEventsTicketFragment = (
  { __typename?: 'MyEventsTicket' }
  & Pick<Types.MyEventsTicket, 'created' | 'status'>
);

export type EventsPublicEventFragment = (
  { __typename?: 'EventsPublicEvent' }
  & Pick<Types.EventsPublicEvent, 'event_id' | 'start' | 'title' | 'description' | 'image' | 'realm' | 'registration_type' | 'pricing_type'>
  & { project: Types.Maybe<(
    { __typename?: 'ProjectPage' }
    & ProjectPage_SummaryForEventFragment
  )>, my_ticket: Types.Maybe<(
    { __typename?: 'MyEventsTicket' }
    & MyEventsTicketFragment
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

export type MyEventsTicketRegisterAnonMutationVariables = {
  input: Types.MyEventsTicketRegisterAnonInput
};


export type MyEventsTicketRegisterAnonMutation = (
  { __typename?: 'Mutation' }
  & { myEventsTicketRegisterAnon: (
    { __typename?: 'MyEventsTicket' }
    & MyEventsTicketFragment
  ) }
);

export type MyEventsTicketRegisterMutationVariables = {
  event_id: Types.Scalars['ID']
};


export type MyEventsTicketRegisterMutation = (
  { __typename?: 'Mutation' }
  & { myEventsTicketRegister: (
    { __typename?: 'MyEventsTicket' }
    & MyEventsTicketFragment
  ) }
);

export type MyEventsTicketUnregisterMutationVariables = {
  event_id: Types.Scalars['ID']
};


export type MyEventsTicketUnregisterMutation = (
  { __typename?: 'Mutation' }
  & { myEventsTicketUnregister: (
    { __typename?: 'MyEventsTicket' }
    & MyEventsTicketFragment
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
export const MyEventsTicketFragmentDoc = gql`
    fragment MyEventsTicket on MyEventsTicket {
  created
  status
}
    `;
export const EventsPublicEventFragmentDoc = gql`
    fragment EventsPublicEvent on EventsPublicEvent {
  event_id
  start
  title
  description
  image
  realm
  registration_type
  pricing_type
  project {
    ...ProjectPage_SummaryForEvent
  }
  my_ticket {
    ...MyEventsTicket
  }
  announcements {
    timepad {
      link
    }
  }
}
    ${ProjectPage_SummaryForEventFragmentDoc}
${MyEventsTicketFragmentDoc}`;
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
export const MyEventsTicketRegisterAnonDocument = gql`
    mutation MyEventsTicketRegisterAnon($input: MyEventsTicketRegisterAnonInput!) {
  myEventsTicketRegisterAnon(input: $input) {
    ...MyEventsTicket
  }
}
    ${MyEventsTicketFragmentDoc}`;
export type MyEventsTicketRegisterAnonMutationFn = ApolloReactCommon.MutationFunction<MyEventsTicketRegisterAnonMutation, MyEventsTicketRegisterAnonMutationVariables>;

/**
 * __useMyEventsTicketRegisterAnonMutation__
 *
 * To run a mutation, you first call `useMyEventsTicketRegisterAnonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMyEventsTicketRegisterAnonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [myEventsTicketRegisterAnonMutation, { data, loading, error }] = useMyEventsTicketRegisterAnonMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useMyEventsTicketRegisterAnonMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MyEventsTicketRegisterAnonMutation, MyEventsTicketRegisterAnonMutationVariables>) {
        return ApolloReactHooks.useMutation<MyEventsTicketRegisterAnonMutation, MyEventsTicketRegisterAnonMutationVariables>(MyEventsTicketRegisterAnonDocument, baseOptions);
      }
export type MyEventsTicketRegisterAnonMutationHookResult = ReturnType<typeof useMyEventsTicketRegisterAnonMutation>;
export type MyEventsTicketRegisterAnonMutationResult = ApolloReactCommon.MutationResult<MyEventsTicketRegisterAnonMutation>;
export type MyEventsTicketRegisterAnonMutationOptions = ApolloReactCommon.BaseMutationOptions<MyEventsTicketRegisterAnonMutation, MyEventsTicketRegisterAnonMutationVariables>;
export const MyEventsTicketRegisterDocument = gql`
    mutation MyEventsTicketRegister($event_id: ID!) {
  myEventsTicketRegister(event_id: $event_id) {
    ...MyEventsTicket
  }
}
    ${MyEventsTicketFragmentDoc}`;
export type MyEventsTicketRegisterMutationFn = ApolloReactCommon.MutationFunction<MyEventsTicketRegisterMutation, MyEventsTicketRegisterMutationVariables>;

/**
 * __useMyEventsTicketRegisterMutation__
 *
 * To run a mutation, you first call `useMyEventsTicketRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMyEventsTicketRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [myEventsTicketRegisterMutation, { data, loading, error }] = useMyEventsTicketRegisterMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useMyEventsTicketRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MyEventsTicketRegisterMutation, MyEventsTicketRegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<MyEventsTicketRegisterMutation, MyEventsTicketRegisterMutationVariables>(MyEventsTicketRegisterDocument, baseOptions);
      }
export type MyEventsTicketRegisterMutationHookResult = ReturnType<typeof useMyEventsTicketRegisterMutation>;
export type MyEventsTicketRegisterMutationResult = ApolloReactCommon.MutationResult<MyEventsTicketRegisterMutation>;
export type MyEventsTicketRegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<MyEventsTicketRegisterMutation, MyEventsTicketRegisterMutationVariables>;
export const MyEventsTicketUnregisterDocument = gql`
    mutation MyEventsTicketUnregister($event_id: ID!) {
  myEventsTicketUnregister(event_id: $event_id) {
    ...MyEventsTicket
  }
}
    ${MyEventsTicketFragmentDoc}`;
export type MyEventsTicketUnregisterMutationFn = ApolloReactCommon.MutationFunction<MyEventsTicketUnregisterMutation, MyEventsTicketUnregisterMutationVariables>;

/**
 * __useMyEventsTicketUnregisterMutation__
 *
 * To run a mutation, you first call `useMyEventsTicketUnregisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMyEventsTicketUnregisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [myEventsTicketUnregisterMutation, { data, loading, error }] = useMyEventsTicketUnregisterMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useMyEventsTicketUnregisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MyEventsTicketUnregisterMutation, MyEventsTicketUnregisterMutationVariables>) {
        return ApolloReactHooks.useMutation<MyEventsTicketUnregisterMutation, MyEventsTicketUnregisterMutationVariables>(MyEventsTicketUnregisterDocument, baseOptions);
      }
export type MyEventsTicketUnregisterMutationHookResult = ReturnType<typeof useMyEventsTicketUnregisterMutation>;
export type MyEventsTicketUnregisterMutationResult = ApolloReactCommon.MutationResult<MyEventsTicketUnregisterMutation>;
export type MyEventsTicketUnregisterMutationOptions = ApolloReactCommon.BaseMutationOptions<MyEventsTicketUnregisterMutation, MyEventsTicketUnregisterMutationVariables>;