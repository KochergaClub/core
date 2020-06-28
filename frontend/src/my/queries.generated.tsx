import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type MembershipFragment = (
  { __typename?: 'MyCmCustomer' }
  & Pick<Types.MyCmCustomer, 'card_id' | 'orders_count' | 'subscription_until'>
  & { orders: Array<(
    { __typename?: 'MyCmOrder' }
    & Pick<Types.MyCmOrder, 'start_dt'>
  )> }
);

export type EmailSubscriptionInterestFragment = (
  { __typename?: 'MyEmailSubscriptionInterest' }
  & Pick<Types.MyEmailSubscriptionInterest, 'id' | 'name' | 'subscribed'>
);

export type EmailSubscriptionFragment = (
  { __typename?: 'MyEmailSubscription' }
  & Pick<Types.MyEmailSubscription, 'status'>
  & { interests?: Types.Maybe<Array<(
    { __typename?: 'MyEmailSubscriptionInterest' }
    & EmailSubscriptionInterestFragment
  )>> }
);

export type MyTicketFragment = (
  { __typename?: 'MyEventsTicket' }
  & Pick<Types.MyEventsTicket, 'zoom_link'>
  & { event: (
    { __typename?: 'EventsPublicEvent' }
    & Pick<Types.EventsPublicEvent, 'event_id' | 'start' | 'title'>
  ) }
);

export type MyVisitsPageFragment = (
  { __typename?: 'My' }
  & { membership?: Types.Maybe<(
    { __typename?: 'MyCmCustomer' }
    & MembershipFragment
  )> }
);

export type MyTicketsPageFragment = (
  { __typename?: 'My' }
  & { tickets: (
    { __typename?: 'MyEventsTicketConnection' }
    & { nodes: Array<(
      { __typename?: 'MyEventsTicket' }
      & MyTicketFragment
    )> }
  ) }
);

export type MySettingsPageFragment = (
  { __typename?: 'My' }
  & { email_subscription: (
    { __typename?: 'MyEmailSubscription' }
    & EmailSubscriptionFragment
  ), membership?: Types.Maybe<(
    { __typename?: 'MyCmCustomer' }
    & Pick<Types.MyCmCustomer, 'privacy_mode'>
  )> }
);

export type MyVisitsPageQueryVariables = {};


export type MyVisitsPageQuery = (
  { __typename?: 'Query' }
  & { my: (
    { __typename?: 'My' }
    & MyVisitsPageFragment
  ) }
);

export type MyTicketsPageQueryVariables = {};


export type MyTicketsPageQuery = (
  { __typename?: 'Query' }
  & { my: (
    { __typename?: 'My' }
    & MyTicketsPageFragment
  ) }
);

export type MySettingsPageQueryVariables = {};


export type MySettingsPageQuery = (
  { __typename?: 'Query' }
  & { my: (
    { __typename?: 'My' }
    & MySettingsPageFragment
  ) }
);

export type MyEmailResubscribeMutationVariables = {};


export type MyEmailResubscribeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'myEmailResubscribe'>
);

export type MyEmailUnsubscribeMutationVariables = {};


export type MyEmailUnsubscribeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'myEmailUnsubscribe'>
);

export type MyEmailSubscribeToInterestMutationVariables = {
  interest_id: Types.Scalars['ID'];
};


export type MyEmailSubscribeToInterestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'myEmailSubscribeToInterest'>
);

export type MyEmailUnsubscribeFromInterestMutationVariables = {
  interest_id: Types.Scalars['ID'];
};


export type MyEmailUnsubscribeFromInterestMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'myEmailUnsubscribeFromInterest'>
);

export type MyPrivacyModeSetMutationVariables = {
  mode: Types.Scalars['String'];
};


export type MyPrivacyModeSetMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'myPrivacyModeSet'>
);

export type MyTicketDeleteMutationVariables = {
  event_id: Types.Scalars['ID'];
};


export type MyTicketDeleteMutation = (
  { __typename?: 'Mutation' }
  & { myEventsTicketUnregister: (
    { __typename?: 'MyEventsTicket' }
    & Pick<Types.MyEventsTicket, 'created'>
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'AuthLogoutResult' }
    & Pick<Types.AuthLogoutResult, 'ok'>
  ) }
);

export type SetPasswordMutationVariables = {
  old_password?: Types.Maybe<Types.Scalars['String']>;
  new_password: Types.Scalars['String'];
};


export type SetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'AuthSetPasswordResult' }
    & Pick<Types.AuthSetPasswordResult, 'ok' | 'error'>
  ) }
);

export type MyEventPageQueryVariables = {
  event_id: Types.Scalars['ID'];
};


export type MyEventPageQuery = (
  { __typename?: 'Query' }
  & { publicEvent: (
    { __typename?: 'EventsPublicEvent' }
    & Pick<Types.EventsPublicEvent, 'event_id' | 'start' | 'title'>
    & { my_ticket?: Types.Maybe<(
      { __typename?: 'MyEventsTicket' }
      & Pick<Types.MyEventsTicket, 'status'>
    )> }
  ) }
);

export type EventGenerateOpenViduTokenMutationVariables = {
  event_id: Types.Scalars['ID'];
};


export type EventGenerateOpenViduTokenMutation = (
  { __typename?: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename?: 'EventGenerateOpenViduTokenResult' }
    & Pick<Types.EventGenerateOpenViduTokenResult, 'token'>
  )> }
);

export const MembershipFragmentDoc = gql`
    fragment Membership on MyCmCustomer {
  card_id
  orders_count
  subscription_until
  orders {
    start_dt
  }
}
    `;
export const MyVisitsPageFragmentDoc = gql`
    fragment MyVisitsPage on My {
  membership {
    ...Membership
  }
}
    ${MembershipFragmentDoc}`;
export const MyTicketFragmentDoc = gql`
    fragment MyTicket on MyEventsTicket {
  zoom_link
  event {
    event_id
    start
    title
  }
}
    `;
export const MyTicketsPageFragmentDoc = gql`
    fragment MyTicketsPage on My {
  tickets(first: 100) {
    nodes {
      ...MyTicket
    }
  }
}
    ${MyTicketFragmentDoc}`;
export const EmailSubscriptionInterestFragmentDoc = gql`
    fragment EmailSubscriptionInterest on MyEmailSubscriptionInterest {
  id
  name
  subscribed
}
    `;
export const EmailSubscriptionFragmentDoc = gql`
    fragment EmailSubscription on MyEmailSubscription {
  status
  interests {
    ...EmailSubscriptionInterest
  }
}
    ${EmailSubscriptionInterestFragmentDoc}`;
export const MySettingsPageFragmentDoc = gql`
    fragment MySettingsPage on My {
  email_subscription {
    ...EmailSubscription
  }
  membership {
    privacy_mode
  }
}
    ${EmailSubscriptionFragmentDoc}`;
export const MyVisitsPageDocument = gql`
    query MyVisitsPage {
  my {
    ...MyVisitsPage
  }
}
    ${MyVisitsPageFragmentDoc}`;

/**
 * __useMyVisitsPageQuery__
 *
 * To run a query within a React component, call `useMyVisitsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyVisitsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyVisitsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyVisitsPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyVisitsPageQuery, MyVisitsPageQueryVariables>) {
        return ApolloReactHooks.useQuery<MyVisitsPageQuery, MyVisitsPageQueryVariables>(MyVisitsPageDocument, baseOptions);
      }
export function useMyVisitsPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyVisitsPageQuery, MyVisitsPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyVisitsPageQuery, MyVisitsPageQueryVariables>(MyVisitsPageDocument, baseOptions);
        }
export type MyVisitsPageQueryHookResult = ReturnType<typeof useMyVisitsPageQuery>;
export type MyVisitsPageLazyQueryHookResult = ReturnType<typeof useMyVisitsPageLazyQuery>;
export type MyVisitsPageQueryResult = ApolloReactCommon.QueryResult<MyVisitsPageQuery, MyVisitsPageQueryVariables>;
export const MyTicketsPageDocument = gql`
    query MyTicketsPage {
  my {
    ...MyTicketsPage
  }
}
    ${MyTicketsPageFragmentDoc}`;

/**
 * __useMyTicketsPageQuery__
 *
 * To run a query within a React component, call `useMyTicketsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyTicketsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyTicketsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyTicketsPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyTicketsPageQuery, MyTicketsPageQueryVariables>) {
        return ApolloReactHooks.useQuery<MyTicketsPageQuery, MyTicketsPageQueryVariables>(MyTicketsPageDocument, baseOptions);
      }
export function useMyTicketsPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyTicketsPageQuery, MyTicketsPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyTicketsPageQuery, MyTicketsPageQueryVariables>(MyTicketsPageDocument, baseOptions);
        }
export type MyTicketsPageQueryHookResult = ReturnType<typeof useMyTicketsPageQuery>;
export type MyTicketsPageLazyQueryHookResult = ReturnType<typeof useMyTicketsPageLazyQuery>;
export type MyTicketsPageQueryResult = ApolloReactCommon.QueryResult<MyTicketsPageQuery, MyTicketsPageQueryVariables>;
export const MySettingsPageDocument = gql`
    query MySettingsPage {
  my {
    ...MySettingsPage
  }
}
    ${MySettingsPageFragmentDoc}`;

/**
 * __useMySettingsPageQuery__
 *
 * To run a query within a React component, call `useMySettingsPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMySettingsPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMySettingsPageQuery({
 *   variables: {
 *   },
 * });
 */
export function useMySettingsPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MySettingsPageQuery, MySettingsPageQueryVariables>) {
        return ApolloReactHooks.useQuery<MySettingsPageQuery, MySettingsPageQueryVariables>(MySettingsPageDocument, baseOptions);
      }
export function useMySettingsPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MySettingsPageQuery, MySettingsPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MySettingsPageQuery, MySettingsPageQueryVariables>(MySettingsPageDocument, baseOptions);
        }
export type MySettingsPageQueryHookResult = ReturnType<typeof useMySettingsPageQuery>;
export type MySettingsPageLazyQueryHookResult = ReturnType<typeof useMySettingsPageLazyQuery>;
export type MySettingsPageQueryResult = ApolloReactCommon.QueryResult<MySettingsPageQuery, MySettingsPageQueryVariables>;
export const MyEmailResubscribeDocument = gql`
    mutation MyEmailResubscribe {
  myEmailResubscribe
}
    `;
export type MyEmailResubscribeMutationFn = ApolloReactCommon.MutationFunction<MyEmailResubscribeMutation, MyEmailResubscribeMutationVariables>;

/**
 * __useMyEmailResubscribeMutation__
 *
 * To run a mutation, you first call `useMyEmailResubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMyEmailResubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [myEmailResubscribeMutation, { data, loading, error }] = useMyEmailResubscribeMutation({
 *   variables: {
 *   },
 * });
 */
export function useMyEmailResubscribeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MyEmailResubscribeMutation, MyEmailResubscribeMutationVariables>) {
        return ApolloReactHooks.useMutation<MyEmailResubscribeMutation, MyEmailResubscribeMutationVariables>(MyEmailResubscribeDocument, baseOptions);
      }
export type MyEmailResubscribeMutationHookResult = ReturnType<typeof useMyEmailResubscribeMutation>;
export type MyEmailResubscribeMutationResult = ApolloReactCommon.MutationResult<MyEmailResubscribeMutation>;
export type MyEmailResubscribeMutationOptions = ApolloReactCommon.BaseMutationOptions<MyEmailResubscribeMutation, MyEmailResubscribeMutationVariables>;
export const MyEmailUnsubscribeDocument = gql`
    mutation MyEmailUnsubscribe {
  myEmailUnsubscribe
}
    `;
export type MyEmailUnsubscribeMutationFn = ApolloReactCommon.MutationFunction<MyEmailUnsubscribeMutation, MyEmailUnsubscribeMutationVariables>;

/**
 * __useMyEmailUnsubscribeMutation__
 *
 * To run a mutation, you first call `useMyEmailUnsubscribeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMyEmailUnsubscribeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [myEmailUnsubscribeMutation, { data, loading, error }] = useMyEmailUnsubscribeMutation({
 *   variables: {
 *   },
 * });
 */
export function useMyEmailUnsubscribeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MyEmailUnsubscribeMutation, MyEmailUnsubscribeMutationVariables>) {
        return ApolloReactHooks.useMutation<MyEmailUnsubscribeMutation, MyEmailUnsubscribeMutationVariables>(MyEmailUnsubscribeDocument, baseOptions);
      }
export type MyEmailUnsubscribeMutationHookResult = ReturnType<typeof useMyEmailUnsubscribeMutation>;
export type MyEmailUnsubscribeMutationResult = ApolloReactCommon.MutationResult<MyEmailUnsubscribeMutation>;
export type MyEmailUnsubscribeMutationOptions = ApolloReactCommon.BaseMutationOptions<MyEmailUnsubscribeMutation, MyEmailUnsubscribeMutationVariables>;
export const MyEmailSubscribeToInterestDocument = gql`
    mutation MyEmailSubscribeToInterest($interest_id: ID!) {
  myEmailSubscribeToInterest(interest_id: $interest_id)
}
    `;
export type MyEmailSubscribeToInterestMutationFn = ApolloReactCommon.MutationFunction<MyEmailSubscribeToInterestMutation, MyEmailSubscribeToInterestMutationVariables>;

/**
 * __useMyEmailSubscribeToInterestMutation__
 *
 * To run a mutation, you first call `useMyEmailSubscribeToInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMyEmailSubscribeToInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [myEmailSubscribeToInterestMutation, { data, loading, error }] = useMyEmailSubscribeToInterestMutation({
 *   variables: {
 *      interest_id: // value for 'interest_id'
 *   },
 * });
 */
export function useMyEmailSubscribeToInterestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MyEmailSubscribeToInterestMutation, MyEmailSubscribeToInterestMutationVariables>) {
        return ApolloReactHooks.useMutation<MyEmailSubscribeToInterestMutation, MyEmailSubscribeToInterestMutationVariables>(MyEmailSubscribeToInterestDocument, baseOptions);
      }
export type MyEmailSubscribeToInterestMutationHookResult = ReturnType<typeof useMyEmailSubscribeToInterestMutation>;
export type MyEmailSubscribeToInterestMutationResult = ApolloReactCommon.MutationResult<MyEmailSubscribeToInterestMutation>;
export type MyEmailSubscribeToInterestMutationOptions = ApolloReactCommon.BaseMutationOptions<MyEmailSubscribeToInterestMutation, MyEmailSubscribeToInterestMutationVariables>;
export const MyEmailUnsubscribeFromInterestDocument = gql`
    mutation MyEmailUnsubscribeFromInterest($interest_id: ID!) {
  myEmailUnsubscribeFromInterest(interest_id: $interest_id)
}
    `;
export type MyEmailUnsubscribeFromInterestMutationFn = ApolloReactCommon.MutationFunction<MyEmailUnsubscribeFromInterestMutation, MyEmailUnsubscribeFromInterestMutationVariables>;

/**
 * __useMyEmailUnsubscribeFromInterestMutation__
 *
 * To run a mutation, you first call `useMyEmailUnsubscribeFromInterestMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMyEmailUnsubscribeFromInterestMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [myEmailUnsubscribeFromInterestMutation, { data, loading, error }] = useMyEmailUnsubscribeFromInterestMutation({
 *   variables: {
 *      interest_id: // value for 'interest_id'
 *   },
 * });
 */
export function useMyEmailUnsubscribeFromInterestMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MyEmailUnsubscribeFromInterestMutation, MyEmailUnsubscribeFromInterestMutationVariables>) {
        return ApolloReactHooks.useMutation<MyEmailUnsubscribeFromInterestMutation, MyEmailUnsubscribeFromInterestMutationVariables>(MyEmailUnsubscribeFromInterestDocument, baseOptions);
      }
export type MyEmailUnsubscribeFromInterestMutationHookResult = ReturnType<typeof useMyEmailUnsubscribeFromInterestMutation>;
export type MyEmailUnsubscribeFromInterestMutationResult = ApolloReactCommon.MutationResult<MyEmailUnsubscribeFromInterestMutation>;
export type MyEmailUnsubscribeFromInterestMutationOptions = ApolloReactCommon.BaseMutationOptions<MyEmailUnsubscribeFromInterestMutation, MyEmailUnsubscribeFromInterestMutationVariables>;
export const MyPrivacyModeSetDocument = gql`
    mutation MyPrivacyModeSet($mode: String!) {
  myPrivacyModeSet(mode: $mode)
}
    `;
export type MyPrivacyModeSetMutationFn = ApolloReactCommon.MutationFunction<MyPrivacyModeSetMutation, MyPrivacyModeSetMutationVariables>;

/**
 * __useMyPrivacyModeSetMutation__
 *
 * To run a mutation, you first call `useMyPrivacyModeSetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMyPrivacyModeSetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [myPrivacyModeSetMutation, { data, loading, error }] = useMyPrivacyModeSetMutation({
 *   variables: {
 *      mode: // value for 'mode'
 *   },
 * });
 */
export function useMyPrivacyModeSetMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MyPrivacyModeSetMutation, MyPrivacyModeSetMutationVariables>) {
        return ApolloReactHooks.useMutation<MyPrivacyModeSetMutation, MyPrivacyModeSetMutationVariables>(MyPrivacyModeSetDocument, baseOptions);
      }
export type MyPrivacyModeSetMutationHookResult = ReturnType<typeof useMyPrivacyModeSetMutation>;
export type MyPrivacyModeSetMutationResult = ApolloReactCommon.MutationResult<MyPrivacyModeSetMutation>;
export type MyPrivacyModeSetMutationOptions = ApolloReactCommon.BaseMutationOptions<MyPrivacyModeSetMutation, MyPrivacyModeSetMutationVariables>;
export const MyTicketDeleteDocument = gql`
    mutation MyTicketDelete($event_id: ID!) {
  myEventsTicketUnregister(event_id: $event_id) {
    created
  }
}
    `;
export type MyTicketDeleteMutationFn = ApolloReactCommon.MutationFunction<MyTicketDeleteMutation, MyTicketDeleteMutationVariables>;

/**
 * __useMyTicketDeleteMutation__
 *
 * To run a mutation, you first call `useMyTicketDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMyTicketDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [myTicketDeleteMutation, { data, loading, error }] = useMyTicketDeleteMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useMyTicketDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MyTicketDeleteMutation, MyTicketDeleteMutationVariables>) {
        return ApolloReactHooks.useMutation<MyTicketDeleteMutation, MyTicketDeleteMutationVariables>(MyTicketDeleteDocument, baseOptions);
      }
export type MyTicketDeleteMutationHookResult = ReturnType<typeof useMyTicketDeleteMutation>;
export type MyTicketDeleteMutationResult = ApolloReactCommon.MutationResult<MyTicketDeleteMutation>;
export type MyTicketDeleteMutationOptions = ApolloReactCommon.BaseMutationOptions<MyTicketDeleteMutation, MyTicketDeleteMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  result: authLogout {
    ok
  }
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SetPasswordDocument = gql`
    mutation SetPassword($old_password: String, $new_password: String!) {
  result: authSetPassword(input: {old_password: $old_password, new_password: $new_password}) {
    ok
    error
  }
}
    `;
export type SetPasswordMutationFn = ApolloReactCommon.MutationFunction<SetPasswordMutation, SetPasswordMutationVariables>;

/**
 * __useSetPasswordMutation__
 *
 * To run a mutation, you first call `useSetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [setPasswordMutation, { data, loading, error }] = useSetPasswordMutation({
 *   variables: {
 *      old_password: // value for 'old_password'
 *      new_password: // value for 'new_password'
 *   },
 * });
 */
export function useSetPasswordMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SetPasswordMutation, SetPasswordMutationVariables>) {
        return ApolloReactHooks.useMutation<SetPasswordMutation, SetPasswordMutationVariables>(SetPasswordDocument, baseOptions);
      }
export type SetPasswordMutationHookResult = ReturnType<typeof useSetPasswordMutation>;
export type SetPasswordMutationResult = ApolloReactCommon.MutationResult<SetPasswordMutation>;
export type SetPasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<SetPasswordMutation, SetPasswordMutationVariables>;
export const MyEventPageDocument = gql`
    query MyEventPage($event_id: ID!) {
  publicEvent(event_id: $event_id) {
    event_id
    start
    title
    my_ticket {
      status
    }
  }
}
    `;

/**
 * __useMyEventPageQuery__
 *
 * To run a query within a React component, call `useMyEventPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyEventPageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyEventPageQuery({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useMyEventPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyEventPageQuery, MyEventPageQueryVariables>) {
        return ApolloReactHooks.useQuery<MyEventPageQuery, MyEventPageQueryVariables>(MyEventPageDocument, baseOptions);
      }
export function useMyEventPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyEventPageQuery, MyEventPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyEventPageQuery, MyEventPageQueryVariables>(MyEventPageDocument, baseOptions);
        }
export type MyEventPageQueryHookResult = ReturnType<typeof useMyEventPageQuery>;
export type MyEventPageLazyQueryHookResult = ReturnType<typeof useMyEventPageLazyQuery>;
export type MyEventPageQueryResult = ApolloReactCommon.QueryResult<MyEventPageQuery, MyEventPageQueryVariables>;
export const EventGenerateOpenViduTokenDocument = gql`
    mutation EventGenerateOpenViduToken($event_id: ID!) {
  result: eventGenerateOpenViduToken(input: {event_id: $event_id}) {
    token
  }
}
    `;
export type EventGenerateOpenViduTokenMutationFn = ApolloReactCommon.MutationFunction<EventGenerateOpenViduTokenMutation, EventGenerateOpenViduTokenMutationVariables>;

/**
 * __useEventGenerateOpenViduTokenMutation__
 *
 * To run a mutation, you first call `useEventGenerateOpenViduTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEventGenerateOpenViduTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [eventGenerateOpenViduTokenMutation, { data, loading, error }] = useEventGenerateOpenViduTokenMutation({
 *   variables: {
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useEventGenerateOpenViduTokenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EventGenerateOpenViduTokenMutation, EventGenerateOpenViduTokenMutationVariables>) {
        return ApolloReactHooks.useMutation<EventGenerateOpenViduTokenMutation, EventGenerateOpenViduTokenMutationVariables>(EventGenerateOpenViduTokenDocument, baseOptions);
      }
export type EventGenerateOpenViduTokenMutationHookResult = ReturnType<typeof useEventGenerateOpenViduTokenMutation>;
export type EventGenerateOpenViduTokenMutationResult = ApolloReactCommon.MutationResult<EventGenerateOpenViduTokenMutation>;
export type EventGenerateOpenViduTokenMutationOptions = ApolloReactCommon.BaseMutationOptions<EventGenerateOpenViduTokenMutation, EventGenerateOpenViduTokenMutationVariables>;