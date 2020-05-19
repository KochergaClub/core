import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type MastermindDatingCohortSummaryFragment = (
  { __typename?: 'MastermindDatingCohort' }
  & Pick<Types.MastermindDatingCohort, 'id'>
  & { event?: Types.Maybe<(
    { __typename?: 'EventsEvent' }
    & Pick<Types.EventsEvent, 'start'>
  )> }
);

export type MastermindDatingParticipantSummaryFragment = (
  { __typename?: 'MastermindDatingParticipant' }
  & Pick<Types.MastermindDatingParticipant, 'id' | 'name'>
);

export type MastermindDatingParticipantFragment = (
  { __typename?: 'MastermindDatingParticipant' }
  & Pick<Types.MastermindDatingParticipant, 'id' | 'name' | 'invite_email_sent' | 'voted_for' | 'photo' | 'present' | 'desc'>
  & { user: (
    { __typename?: 'AuthUser' }
    & Pick<Types.AuthUser, 'email'>
  ) }
);

export type MastermindDatingGroupFragment = (
  { __typename?: 'MastermindDatingGroup' }
  & Pick<Types.MastermindDatingGroup, 'id' | 'telegram_invite_link'>
  & { participants: Array<(
    { __typename?: 'MastermindDatingParticipant' }
    & MastermindDatingParticipantSummaryFragment
  )> }
);

export type MastermindDatingCohortDetailsFragment = (
  { __typename?: 'MastermindDatingCohort' }
  & Pick<Types.MastermindDatingCohort, 'id' | 'leader_telegram_uid'>
  & { event?: Types.Maybe<(
    { __typename?: 'EventsEvent' }
    & Pick<Types.EventsEvent, 'event_id' | 'start' | 'title'>
  )>, participants: Array<(
    { __typename?: 'MastermindDatingParticipant' }
    & MastermindDatingParticipantFragment
  )>, groups: Array<(
    { __typename?: 'MastermindDatingGroup' }
    & MastermindDatingGroupFragment
  )> }
);

export type MastermindDatingEventFragment = (
  { __typename?: 'EventsEvent' }
  & Pick<Types.EventsEvent, 'event_id' | 'title' | 'start'>
);

export type MastermindDatingCohortsQueryVariables = {};


export type MastermindDatingCohortsQuery = (
  { __typename?: 'Query' }
  & { cohorts: Array<(
    { __typename?: 'MastermindDatingCohort' }
    & MastermindDatingCohortSummaryFragment
  )> }
);

export type MastermindDatingCohortByIdQueryVariables = {
  id: Types.Scalars['ID'];
};


export type MastermindDatingCohortByIdQuery = (
  { __typename?: 'Query' }
  & { cohort: (
    { __typename?: 'MastermindDatingCohort' }
    & MastermindDatingCohortDetailsFragment
  ) }
);

export type MastermindDatingSearchEventsQueryVariables = {
  search: Types.Scalars['String'];
};


export type MastermindDatingSearchEventsQuery = (
  { __typename?: 'Query' }
  & { events: (
    { __typename?: 'EventsEventConnection' }
    & { nodes: Array<(
      { __typename?: 'EventsEvent' }
      & MastermindDatingEventFragment
    )> }
  ) }
);

export type MastermindDatingCreateCohortMutationVariables = {};


export type MastermindDatingCreateCohortMutation = (
  { __typename?: 'Mutation' }
  & { mastermindDatingCreateCohort: (
    { __typename?: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename?: 'MastermindDatingCohort' }
      & MastermindDatingCohortSummaryFragment
    ) }
  ) }
);

export type MastermindDatingPopulateCohortFromEventMutationVariables = {
  cohort_id: Types.Scalars['ID'];
};


export type MastermindDatingPopulateCohortFromEventMutation = (
  { __typename?: 'Mutation' }
  & { mastermindDatingPopulateCohortFromEvent: (
    { __typename?: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename?: 'MastermindDatingCohort' }
      & MastermindDatingCohortDetailsFragment
    ) }
  ) }
);

export type MastermindDatingDeleteCohortMutationVariables = {
  cohort_id: Types.Scalars['ID'];
};


export type MastermindDatingDeleteCohortMutation = (
  { __typename?: 'Mutation' }
  & { mastermindDatingDeleteCohort: (
    { __typename?: 'MastermindDatingTrivialMutationResult' }
    & Pick<Types.MastermindDatingTrivialMutationResult, 'ok'>
  ) }
);

export type MastermindDatingSendInviteEmailsMutationVariables = {
  cohort_id: Types.Scalars['ID'];
};


export type MastermindDatingSendInviteEmailsMutation = (
  { __typename?: 'Mutation' }
  & { mastermindDatingSendInviteEmails: (
    { __typename?: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename?: 'MastermindDatingCohort' }
      & MastermindDatingCohortDetailsFragment
    ) }
  ) }
);

export type MastermindDatingRunSolverMutationVariables = {
  cohort_id: Types.Scalars['ID'];
};


export type MastermindDatingRunSolverMutation = (
  { __typename?: 'Mutation' }
  & { mastermindDatingRunSolver: (
    { __typename?: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename?: 'MastermindDatingCohort' }
      & MastermindDatingCohortDetailsFragment
    ) }
  ) }
);

export type MastermindDatingSetEventForCohortMutationVariables = {
  cohort_id: Types.Scalars['ID'];
  event_id: Types.Scalars['String'];
};


export type MastermindDatingSetEventForCohortMutation = (
  { __typename?: 'Mutation' }
  & { mastermindDatingSetEventForCohort: (
    { __typename?: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename?: 'MastermindDatingCohort' }
      & MastermindDatingCohortDetailsFragment
    ) }
  ) }
);

export type MastermindDatingUnsetEventForCohortMutationVariables = {
  cohort_id: Types.Scalars['ID'];
};


export type MastermindDatingUnsetEventForCohortMutation = (
  { __typename?: 'Mutation' }
  & { mastermindDatingUnsetEventForCohort: (
    { __typename?: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename?: 'MastermindDatingCohort' }
      & MastermindDatingCohortDetailsFragment
    ) }
  ) }
);

export type MastermindDatingActivateVotingMutationVariables = {
  participant_id: Types.Scalars['ID'];
};


export type MastermindDatingActivateVotingMutation = (
  { __typename?: 'Mutation' }
  & { mastermindDatingActivateVoting: (
    { __typename?: 'MastermindDatingParticipantMutationResult' }
    & { participant: (
      { __typename?: 'MastermindDatingParticipant' }
      & MastermindDatingParticipantFragment
    ) }
  ) }
);

export type MastermindDatingSetPresenceStatusMutationVariables = {
  participant_id: Types.Scalars['ID'];
  present: Types.Scalars['Boolean'];
};


export type MastermindDatingSetPresenceStatusMutation = (
  { __typename?: 'Mutation' }
  & { mastermindDatingSetPresenceStatus: (
    { __typename?: 'MastermindDatingParticipantMutationResult' }
    & { participant: (
      { __typename?: 'MastermindDatingParticipant' }
      & MastermindDatingParticipantFragment
    ) }
  ) }
);

export type MastermindDatingCreateGroupMutationVariables = {
  cohort_id: Types.Scalars['ID'];
};


export type MastermindDatingCreateGroupMutation = (
  { __typename?: 'Mutation' }
  & { mastermindDatingCreateGroup: (
    { __typename?: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename?: 'MastermindDatingCohort' }
      & MastermindDatingCohortDetailsFragment
    ) }
  ) }
);

export type MastermindDatingCreateParticipantMutationVariables = {
  cohort_id: Types.Scalars['ID'];
  email: Types.Scalars['String'];
};


export type MastermindDatingCreateParticipantMutation = (
  { __typename?: 'Mutation' }
  & { mastermindDatingCreateParticipant: (
    { __typename?: 'MastermindDatingParticipantMutationResult' }
    & { participant: (
      { __typename?: 'MastermindDatingParticipant' }
      & MastermindDatingParticipantFragment
    ) }
  ) }
);

export const MastermindDatingCohortSummaryFragmentDoc = gql`
    fragment MastermindDatingCohortSummary on MastermindDatingCohort {
  id
  event {
    start
  }
}
    `;
export const MastermindDatingParticipantFragmentDoc = gql`
    fragment MastermindDatingParticipant on MastermindDatingParticipant {
  id
  name
  invite_email_sent
  voted_for
  photo
  present
  desc
  user {
    email
  }
}
    `;
export const MastermindDatingParticipantSummaryFragmentDoc = gql`
    fragment MastermindDatingParticipantSummary on MastermindDatingParticipant {
  id
  name
}
    `;
export const MastermindDatingGroupFragmentDoc = gql`
    fragment MastermindDatingGroup on MastermindDatingGroup {
  id
  telegram_invite_link
  participants {
    ...MastermindDatingParticipantSummary
  }
}
    ${MastermindDatingParticipantSummaryFragmentDoc}`;
export const MastermindDatingCohortDetailsFragmentDoc = gql`
    fragment MastermindDatingCohortDetails on MastermindDatingCohort {
  id
  leader_telegram_uid
  event {
    event_id
    start
    title
  }
  participants {
    ...MastermindDatingParticipant
  }
  groups {
    ...MastermindDatingGroup
  }
}
    ${MastermindDatingParticipantFragmentDoc}
${MastermindDatingGroupFragmentDoc}`;
export const MastermindDatingEventFragmentDoc = gql`
    fragment MastermindDatingEvent on EventsEvent {
  event_id
  title
  start
}
    `;
export const MastermindDatingCohortsDocument = gql`
    query MastermindDatingCohorts {
  cohorts: mastermindDatingCohorts {
    ...MastermindDatingCohortSummary
  }
}
    ${MastermindDatingCohortSummaryFragmentDoc}`;

/**
 * __useMastermindDatingCohortsQuery__
 *
 * To run a query within a React component, call `useMastermindDatingCohortsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingCohortsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMastermindDatingCohortsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMastermindDatingCohortsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MastermindDatingCohortsQuery, MastermindDatingCohortsQueryVariables>) {
        return ApolloReactHooks.useQuery<MastermindDatingCohortsQuery, MastermindDatingCohortsQueryVariables>(MastermindDatingCohortsDocument, baseOptions);
      }
export function useMastermindDatingCohortsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MastermindDatingCohortsQuery, MastermindDatingCohortsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MastermindDatingCohortsQuery, MastermindDatingCohortsQueryVariables>(MastermindDatingCohortsDocument, baseOptions);
        }
export type MastermindDatingCohortsQueryHookResult = ReturnType<typeof useMastermindDatingCohortsQuery>;
export type MastermindDatingCohortsLazyQueryHookResult = ReturnType<typeof useMastermindDatingCohortsLazyQuery>;
export type MastermindDatingCohortsQueryResult = ApolloReactCommon.QueryResult<MastermindDatingCohortsQuery, MastermindDatingCohortsQueryVariables>;
export const MastermindDatingCohortByIdDocument = gql`
    query MastermindDatingCohortById($id: ID!) {
  cohort: mastermindDatingCohortById(id: $id) {
    ...MastermindDatingCohortDetails
  }
}
    ${MastermindDatingCohortDetailsFragmentDoc}`;

/**
 * __useMastermindDatingCohortByIdQuery__
 *
 * To run a query within a React component, call `useMastermindDatingCohortByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingCohortByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMastermindDatingCohortByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useMastermindDatingCohortByIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MastermindDatingCohortByIdQuery, MastermindDatingCohortByIdQueryVariables>) {
        return ApolloReactHooks.useQuery<MastermindDatingCohortByIdQuery, MastermindDatingCohortByIdQueryVariables>(MastermindDatingCohortByIdDocument, baseOptions);
      }
export function useMastermindDatingCohortByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MastermindDatingCohortByIdQuery, MastermindDatingCohortByIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MastermindDatingCohortByIdQuery, MastermindDatingCohortByIdQueryVariables>(MastermindDatingCohortByIdDocument, baseOptions);
        }
export type MastermindDatingCohortByIdQueryHookResult = ReturnType<typeof useMastermindDatingCohortByIdQuery>;
export type MastermindDatingCohortByIdLazyQueryHookResult = ReturnType<typeof useMastermindDatingCohortByIdLazyQuery>;
export type MastermindDatingCohortByIdQueryResult = ApolloReactCommon.QueryResult<MastermindDatingCohortByIdQuery, MastermindDatingCohortByIdQueryVariables>;
export const MastermindDatingSearchEventsDocument = gql`
    query MastermindDatingSearchEvents($search: String!) {
  events(search: $search, first: 20) {
    nodes {
      ...MastermindDatingEvent
    }
  }
}
    ${MastermindDatingEventFragmentDoc}`;

/**
 * __useMastermindDatingSearchEventsQuery__
 *
 * To run a query within a React component, call `useMastermindDatingSearchEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingSearchEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMastermindDatingSearchEventsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useMastermindDatingSearchEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MastermindDatingSearchEventsQuery, MastermindDatingSearchEventsQueryVariables>) {
        return ApolloReactHooks.useQuery<MastermindDatingSearchEventsQuery, MastermindDatingSearchEventsQueryVariables>(MastermindDatingSearchEventsDocument, baseOptions);
      }
export function useMastermindDatingSearchEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MastermindDatingSearchEventsQuery, MastermindDatingSearchEventsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MastermindDatingSearchEventsQuery, MastermindDatingSearchEventsQueryVariables>(MastermindDatingSearchEventsDocument, baseOptions);
        }
export type MastermindDatingSearchEventsQueryHookResult = ReturnType<typeof useMastermindDatingSearchEventsQuery>;
export type MastermindDatingSearchEventsLazyQueryHookResult = ReturnType<typeof useMastermindDatingSearchEventsLazyQuery>;
export type MastermindDatingSearchEventsQueryResult = ApolloReactCommon.QueryResult<MastermindDatingSearchEventsQuery, MastermindDatingSearchEventsQueryVariables>;
export const MastermindDatingCreateCohortDocument = gql`
    mutation MastermindDatingCreateCohort {
  mastermindDatingCreateCohort {
    cohort {
      ...MastermindDatingCohortSummary
    }
  }
}
    ${MastermindDatingCohortSummaryFragmentDoc}`;
export type MastermindDatingCreateCohortMutationFn = ApolloReactCommon.MutationFunction<MastermindDatingCreateCohortMutation, MastermindDatingCreateCohortMutationVariables>;

/**
 * __useMastermindDatingCreateCohortMutation__
 *
 * To run a mutation, you first call `useMastermindDatingCreateCohortMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingCreateCohortMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mastermindDatingCreateCohortMutation, { data, loading, error }] = useMastermindDatingCreateCohortMutation({
 *   variables: {
 *   },
 * });
 */
export function useMastermindDatingCreateCohortMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MastermindDatingCreateCohortMutation, MastermindDatingCreateCohortMutationVariables>) {
        return ApolloReactHooks.useMutation<MastermindDatingCreateCohortMutation, MastermindDatingCreateCohortMutationVariables>(MastermindDatingCreateCohortDocument, baseOptions);
      }
export type MastermindDatingCreateCohortMutationHookResult = ReturnType<typeof useMastermindDatingCreateCohortMutation>;
export type MastermindDatingCreateCohortMutationResult = ApolloReactCommon.MutationResult<MastermindDatingCreateCohortMutation>;
export type MastermindDatingCreateCohortMutationOptions = ApolloReactCommon.BaseMutationOptions<MastermindDatingCreateCohortMutation, MastermindDatingCreateCohortMutationVariables>;
export const MastermindDatingPopulateCohortFromEventDocument = gql`
    mutation MastermindDatingPopulateCohortFromEvent($cohort_id: ID!) {
  mastermindDatingPopulateCohortFromEvent(cohort_id: $cohort_id) {
    cohort {
      ...MastermindDatingCohortDetails
    }
  }
}
    ${MastermindDatingCohortDetailsFragmentDoc}`;
export type MastermindDatingPopulateCohortFromEventMutationFn = ApolloReactCommon.MutationFunction<MastermindDatingPopulateCohortFromEventMutation, MastermindDatingPopulateCohortFromEventMutationVariables>;

/**
 * __useMastermindDatingPopulateCohortFromEventMutation__
 *
 * To run a mutation, you first call `useMastermindDatingPopulateCohortFromEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingPopulateCohortFromEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mastermindDatingPopulateCohortFromEventMutation, { data, loading, error }] = useMastermindDatingPopulateCohortFromEventMutation({
 *   variables: {
 *      cohort_id: // value for 'cohort_id'
 *   },
 * });
 */
export function useMastermindDatingPopulateCohortFromEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MastermindDatingPopulateCohortFromEventMutation, MastermindDatingPopulateCohortFromEventMutationVariables>) {
        return ApolloReactHooks.useMutation<MastermindDatingPopulateCohortFromEventMutation, MastermindDatingPopulateCohortFromEventMutationVariables>(MastermindDatingPopulateCohortFromEventDocument, baseOptions);
      }
export type MastermindDatingPopulateCohortFromEventMutationHookResult = ReturnType<typeof useMastermindDatingPopulateCohortFromEventMutation>;
export type MastermindDatingPopulateCohortFromEventMutationResult = ApolloReactCommon.MutationResult<MastermindDatingPopulateCohortFromEventMutation>;
export type MastermindDatingPopulateCohortFromEventMutationOptions = ApolloReactCommon.BaseMutationOptions<MastermindDatingPopulateCohortFromEventMutation, MastermindDatingPopulateCohortFromEventMutationVariables>;
export const MastermindDatingDeleteCohortDocument = gql`
    mutation MastermindDatingDeleteCohort($cohort_id: ID!) {
  mastermindDatingDeleteCohort(cohort_id: $cohort_id) {
    ok
  }
}
    `;
export type MastermindDatingDeleteCohortMutationFn = ApolloReactCommon.MutationFunction<MastermindDatingDeleteCohortMutation, MastermindDatingDeleteCohortMutationVariables>;

/**
 * __useMastermindDatingDeleteCohortMutation__
 *
 * To run a mutation, you first call `useMastermindDatingDeleteCohortMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingDeleteCohortMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mastermindDatingDeleteCohortMutation, { data, loading, error }] = useMastermindDatingDeleteCohortMutation({
 *   variables: {
 *      cohort_id: // value for 'cohort_id'
 *   },
 * });
 */
export function useMastermindDatingDeleteCohortMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MastermindDatingDeleteCohortMutation, MastermindDatingDeleteCohortMutationVariables>) {
        return ApolloReactHooks.useMutation<MastermindDatingDeleteCohortMutation, MastermindDatingDeleteCohortMutationVariables>(MastermindDatingDeleteCohortDocument, baseOptions);
      }
export type MastermindDatingDeleteCohortMutationHookResult = ReturnType<typeof useMastermindDatingDeleteCohortMutation>;
export type MastermindDatingDeleteCohortMutationResult = ApolloReactCommon.MutationResult<MastermindDatingDeleteCohortMutation>;
export type MastermindDatingDeleteCohortMutationOptions = ApolloReactCommon.BaseMutationOptions<MastermindDatingDeleteCohortMutation, MastermindDatingDeleteCohortMutationVariables>;
export const MastermindDatingSendInviteEmailsDocument = gql`
    mutation MastermindDatingSendInviteEmails($cohort_id: ID!) {
  mastermindDatingSendInviteEmails(cohort_id: $cohort_id) {
    cohort {
      ...MastermindDatingCohortDetails
    }
  }
}
    ${MastermindDatingCohortDetailsFragmentDoc}`;
export type MastermindDatingSendInviteEmailsMutationFn = ApolloReactCommon.MutationFunction<MastermindDatingSendInviteEmailsMutation, MastermindDatingSendInviteEmailsMutationVariables>;

/**
 * __useMastermindDatingSendInviteEmailsMutation__
 *
 * To run a mutation, you first call `useMastermindDatingSendInviteEmailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingSendInviteEmailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mastermindDatingSendInviteEmailsMutation, { data, loading, error }] = useMastermindDatingSendInviteEmailsMutation({
 *   variables: {
 *      cohort_id: // value for 'cohort_id'
 *   },
 * });
 */
export function useMastermindDatingSendInviteEmailsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MastermindDatingSendInviteEmailsMutation, MastermindDatingSendInviteEmailsMutationVariables>) {
        return ApolloReactHooks.useMutation<MastermindDatingSendInviteEmailsMutation, MastermindDatingSendInviteEmailsMutationVariables>(MastermindDatingSendInviteEmailsDocument, baseOptions);
      }
export type MastermindDatingSendInviteEmailsMutationHookResult = ReturnType<typeof useMastermindDatingSendInviteEmailsMutation>;
export type MastermindDatingSendInviteEmailsMutationResult = ApolloReactCommon.MutationResult<MastermindDatingSendInviteEmailsMutation>;
export type MastermindDatingSendInviteEmailsMutationOptions = ApolloReactCommon.BaseMutationOptions<MastermindDatingSendInviteEmailsMutation, MastermindDatingSendInviteEmailsMutationVariables>;
export const MastermindDatingRunSolverDocument = gql`
    mutation MastermindDatingRunSolver($cohort_id: ID!) {
  mastermindDatingRunSolver(cohort_id: $cohort_id) {
    cohort {
      ...MastermindDatingCohortDetails
    }
  }
}
    ${MastermindDatingCohortDetailsFragmentDoc}`;
export type MastermindDatingRunSolverMutationFn = ApolloReactCommon.MutationFunction<MastermindDatingRunSolverMutation, MastermindDatingRunSolverMutationVariables>;

/**
 * __useMastermindDatingRunSolverMutation__
 *
 * To run a mutation, you first call `useMastermindDatingRunSolverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingRunSolverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mastermindDatingRunSolverMutation, { data, loading, error }] = useMastermindDatingRunSolverMutation({
 *   variables: {
 *      cohort_id: // value for 'cohort_id'
 *   },
 * });
 */
export function useMastermindDatingRunSolverMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MastermindDatingRunSolverMutation, MastermindDatingRunSolverMutationVariables>) {
        return ApolloReactHooks.useMutation<MastermindDatingRunSolverMutation, MastermindDatingRunSolverMutationVariables>(MastermindDatingRunSolverDocument, baseOptions);
      }
export type MastermindDatingRunSolverMutationHookResult = ReturnType<typeof useMastermindDatingRunSolverMutation>;
export type MastermindDatingRunSolverMutationResult = ApolloReactCommon.MutationResult<MastermindDatingRunSolverMutation>;
export type MastermindDatingRunSolverMutationOptions = ApolloReactCommon.BaseMutationOptions<MastermindDatingRunSolverMutation, MastermindDatingRunSolverMutationVariables>;
export const MastermindDatingSetEventForCohortDocument = gql`
    mutation MastermindDatingSetEventForCohort($cohort_id: ID!, $event_id: String!) {
  mastermindDatingSetEventForCohort(cohort_id: $cohort_id, event_id: $event_id) {
    cohort {
      ...MastermindDatingCohortDetails
    }
  }
}
    ${MastermindDatingCohortDetailsFragmentDoc}`;
export type MastermindDatingSetEventForCohortMutationFn = ApolloReactCommon.MutationFunction<MastermindDatingSetEventForCohortMutation, MastermindDatingSetEventForCohortMutationVariables>;

/**
 * __useMastermindDatingSetEventForCohortMutation__
 *
 * To run a mutation, you first call `useMastermindDatingSetEventForCohortMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingSetEventForCohortMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mastermindDatingSetEventForCohortMutation, { data, loading, error }] = useMastermindDatingSetEventForCohortMutation({
 *   variables: {
 *      cohort_id: // value for 'cohort_id'
 *      event_id: // value for 'event_id'
 *   },
 * });
 */
export function useMastermindDatingSetEventForCohortMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MastermindDatingSetEventForCohortMutation, MastermindDatingSetEventForCohortMutationVariables>) {
        return ApolloReactHooks.useMutation<MastermindDatingSetEventForCohortMutation, MastermindDatingSetEventForCohortMutationVariables>(MastermindDatingSetEventForCohortDocument, baseOptions);
      }
export type MastermindDatingSetEventForCohortMutationHookResult = ReturnType<typeof useMastermindDatingSetEventForCohortMutation>;
export type MastermindDatingSetEventForCohortMutationResult = ApolloReactCommon.MutationResult<MastermindDatingSetEventForCohortMutation>;
export type MastermindDatingSetEventForCohortMutationOptions = ApolloReactCommon.BaseMutationOptions<MastermindDatingSetEventForCohortMutation, MastermindDatingSetEventForCohortMutationVariables>;
export const MastermindDatingUnsetEventForCohortDocument = gql`
    mutation MastermindDatingUnsetEventForCohort($cohort_id: ID!) {
  mastermindDatingUnsetEventForCohort(cohort_id: $cohort_id) {
    cohort {
      ...MastermindDatingCohortDetails
    }
  }
}
    ${MastermindDatingCohortDetailsFragmentDoc}`;
export type MastermindDatingUnsetEventForCohortMutationFn = ApolloReactCommon.MutationFunction<MastermindDatingUnsetEventForCohortMutation, MastermindDatingUnsetEventForCohortMutationVariables>;

/**
 * __useMastermindDatingUnsetEventForCohortMutation__
 *
 * To run a mutation, you first call `useMastermindDatingUnsetEventForCohortMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingUnsetEventForCohortMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mastermindDatingUnsetEventForCohortMutation, { data, loading, error }] = useMastermindDatingUnsetEventForCohortMutation({
 *   variables: {
 *      cohort_id: // value for 'cohort_id'
 *   },
 * });
 */
export function useMastermindDatingUnsetEventForCohortMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MastermindDatingUnsetEventForCohortMutation, MastermindDatingUnsetEventForCohortMutationVariables>) {
        return ApolloReactHooks.useMutation<MastermindDatingUnsetEventForCohortMutation, MastermindDatingUnsetEventForCohortMutationVariables>(MastermindDatingUnsetEventForCohortDocument, baseOptions);
      }
export type MastermindDatingUnsetEventForCohortMutationHookResult = ReturnType<typeof useMastermindDatingUnsetEventForCohortMutation>;
export type MastermindDatingUnsetEventForCohortMutationResult = ApolloReactCommon.MutationResult<MastermindDatingUnsetEventForCohortMutation>;
export type MastermindDatingUnsetEventForCohortMutationOptions = ApolloReactCommon.BaseMutationOptions<MastermindDatingUnsetEventForCohortMutation, MastermindDatingUnsetEventForCohortMutationVariables>;
export const MastermindDatingActivateVotingDocument = gql`
    mutation MastermindDatingActivateVoting($participant_id: ID!) {
  mastermindDatingActivateVoting(participant_id: $participant_id) {
    participant {
      ...MastermindDatingParticipant
    }
  }
}
    ${MastermindDatingParticipantFragmentDoc}`;
export type MastermindDatingActivateVotingMutationFn = ApolloReactCommon.MutationFunction<MastermindDatingActivateVotingMutation, MastermindDatingActivateVotingMutationVariables>;

/**
 * __useMastermindDatingActivateVotingMutation__
 *
 * To run a mutation, you first call `useMastermindDatingActivateVotingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingActivateVotingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mastermindDatingActivateVotingMutation, { data, loading, error }] = useMastermindDatingActivateVotingMutation({
 *   variables: {
 *      participant_id: // value for 'participant_id'
 *   },
 * });
 */
export function useMastermindDatingActivateVotingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MastermindDatingActivateVotingMutation, MastermindDatingActivateVotingMutationVariables>) {
        return ApolloReactHooks.useMutation<MastermindDatingActivateVotingMutation, MastermindDatingActivateVotingMutationVariables>(MastermindDatingActivateVotingDocument, baseOptions);
      }
export type MastermindDatingActivateVotingMutationHookResult = ReturnType<typeof useMastermindDatingActivateVotingMutation>;
export type MastermindDatingActivateVotingMutationResult = ApolloReactCommon.MutationResult<MastermindDatingActivateVotingMutation>;
export type MastermindDatingActivateVotingMutationOptions = ApolloReactCommon.BaseMutationOptions<MastermindDatingActivateVotingMutation, MastermindDatingActivateVotingMutationVariables>;
export const MastermindDatingSetPresenceStatusDocument = gql`
    mutation MastermindDatingSetPresenceStatus($participant_id: ID!, $present: Boolean!) {
  mastermindDatingSetPresenceStatus(participant_id: $participant_id, present: $present) {
    participant {
      ...MastermindDatingParticipant
    }
  }
}
    ${MastermindDatingParticipantFragmentDoc}`;
export type MastermindDatingSetPresenceStatusMutationFn = ApolloReactCommon.MutationFunction<MastermindDatingSetPresenceStatusMutation, MastermindDatingSetPresenceStatusMutationVariables>;

/**
 * __useMastermindDatingSetPresenceStatusMutation__
 *
 * To run a mutation, you first call `useMastermindDatingSetPresenceStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingSetPresenceStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mastermindDatingSetPresenceStatusMutation, { data, loading, error }] = useMastermindDatingSetPresenceStatusMutation({
 *   variables: {
 *      participant_id: // value for 'participant_id'
 *      present: // value for 'present'
 *   },
 * });
 */
export function useMastermindDatingSetPresenceStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MastermindDatingSetPresenceStatusMutation, MastermindDatingSetPresenceStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<MastermindDatingSetPresenceStatusMutation, MastermindDatingSetPresenceStatusMutationVariables>(MastermindDatingSetPresenceStatusDocument, baseOptions);
      }
export type MastermindDatingSetPresenceStatusMutationHookResult = ReturnType<typeof useMastermindDatingSetPresenceStatusMutation>;
export type MastermindDatingSetPresenceStatusMutationResult = ApolloReactCommon.MutationResult<MastermindDatingSetPresenceStatusMutation>;
export type MastermindDatingSetPresenceStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<MastermindDatingSetPresenceStatusMutation, MastermindDatingSetPresenceStatusMutationVariables>;
export const MastermindDatingCreateGroupDocument = gql`
    mutation MastermindDatingCreateGroup($cohort_id: ID!) {
  mastermindDatingCreateGroup(cohort_id: $cohort_id) {
    cohort {
      ...MastermindDatingCohortDetails
    }
  }
}
    ${MastermindDatingCohortDetailsFragmentDoc}`;
export type MastermindDatingCreateGroupMutationFn = ApolloReactCommon.MutationFunction<MastermindDatingCreateGroupMutation, MastermindDatingCreateGroupMutationVariables>;

/**
 * __useMastermindDatingCreateGroupMutation__
 *
 * To run a mutation, you first call `useMastermindDatingCreateGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingCreateGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mastermindDatingCreateGroupMutation, { data, loading, error }] = useMastermindDatingCreateGroupMutation({
 *   variables: {
 *      cohort_id: // value for 'cohort_id'
 *   },
 * });
 */
export function useMastermindDatingCreateGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MastermindDatingCreateGroupMutation, MastermindDatingCreateGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<MastermindDatingCreateGroupMutation, MastermindDatingCreateGroupMutationVariables>(MastermindDatingCreateGroupDocument, baseOptions);
      }
export type MastermindDatingCreateGroupMutationHookResult = ReturnType<typeof useMastermindDatingCreateGroupMutation>;
export type MastermindDatingCreateGroupMutationResult = ApolloReactCommon.MutationResult<MastermindDatingCreateGroupMutation>;
export type MastermindDatingCreateGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<MastermindDatingCreateGroupMutation, MastermindDatingCreateGroupMutationVariables>;
export const MastermindDatingCreateParticipantDocument = gql`
    mutation MastermindDatingCreateParticipant($cohort_id: ID!, $email: String!) {
  mastermindDatingCreateParticipant(cohort_id: $cohort_id, email: $email) {
    participant {
      ...MastermindDatingParticipant
    }
  }
}
    ${MastermindDatingParticipantFragmentDoc}`;
export type MastermindDatingCreateParticipantMutationFn = ApolloReactCommon.MutationFunction<MastermindDatingCreateParticipantMutation, MastermindDatingCreateParticipantMutationVariables>;

/**
 * __useMastermindDatingCreateParticipantMutation__
 *
 * To run a mutation, you first call `useMastermindDatingCreateParticipantMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMastermindDatingCreateParticipantMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mastermindDatingCreateParticipantMutation, { data, loading, error }] = useMastermindDatingCreateParticipantMutation({
 *   variables: {
 *      cohort_id: // value for 'cohort_id'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useMastermindDatingCreateParticipantMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MastermindDatingCreateParticipantMutation, MastermindDatingCreateParticipantMutationVariables>) {
        return ApolloReactHooks.useMutation<MastermindDatingCreateParticipantMutation, MastermindDatingCreateParticipantMutationVariables>(MastermindDatingCreateParticipantDocument, baseOptions);
      }
export type MastermindDatingCreateParticipantMutationHookResult = ReturnType<typeof useMastermindDatingCreateParticipantMutation>;
export type MastermindDatingCreateParticipantMutationResult = ApolloReactCommon.MutationResult<MastermindDatingCreateParticipantMutation>;
export type MastermindDatingCreateParticipantMutationOptions = ApolloReactCommon.BaseMutationOptions<MastermindDatingCreateParticipantMutation, MastermindDatingCreateParticipantMutationVariables>;