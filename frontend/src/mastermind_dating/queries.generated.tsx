import * as Types from '../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type MastermindDatingCohortSummaryFragment = (
  { __typename: 'MastermindDatingCohort' }
  & Pick<Types.MastermindDatingCohort, 'id'>
  & { event?: Types.Maybe<(
    { __typename: 'Event' }
    & Pick<Types.Event, 'id' | 'start'>
  )> }
);

export type MastermindDatingParticipantSummaryFragment = (
  { __typename: 'MastermindDatingParticipant' }
  & Pick<Types.MastermindDatingParticipant, 'id' | 'name'>
);

export type MastermindDatingParticipantFragment = (
  { __typename: 'MastermindDatingParticipant' }
  & Pick<Types.MastermindDatingParticipant, 'id' | 'name' | 'invite_email_sent' | 'voted_for' | 'photo' | 'present' | 'desc'>
  & { user: (
    { __typename: 'AuthUser' }
    & Pick<Types.AuthUser, 'id' | 'email'>
  ) }
);

export type MastermindDatingGroupFragment = (
  { __typename: 'MastermindDatingGroup' }
  & Pick<Types.MastermindDatingGroup, 'id' | 'telegram_invite_link'>
  & { participants: Array<(
    { __typename: 'MastermindDatingParticipant' }
    & MastermindDatingParticipantSummaryFragment
  )> }
);

export type MastermindDatingCohortDetailsFragment = (
  { __typename: 'MastermindDatingCohort' }
  & Pick<Types.MastermindDatingCohort, 'id' | 'leader_telegram_uid'>
  & { event?: Types.Maybe<(
    { __typename: 'Event' }
    & Pick<Types.Event, 'id' | 'start' | 'title'>
  )>, participants: Array<(
    { __typename: 'MastermindDatingParticipant' }
    & MastermindDatingParticipantFragment
  )>, groups: Array<(
    { __typename: 'MastermindDatingGroup' }
    & MastermindDatingGroupFragment
  )> }
);

export type MastermindDatingEventFragment = (
  { __typename: 'Event' }
  & Pick<Types.Event, 'id' | 'title' | 'start'>
);

export type MastermindDatingCohortsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MastermindDatingCohortsQuery = (
  { __typename: 'Query' }
  & { cohorts: Array<(
    { __typename: 'MastermindDatingCohort' }
    & MastermindDatingCohortSummaryFragment
  )> }
);

export type MastermindDatingCohortByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type MastermindDatingCohortByIdQuery = (
  { __typename: 'Query' }
  & { cohort: (
    { __typename: 'MastermindDatingCohort' }
    & MastermindDatingCohortDetailsFragment
  ) }
);

export type MastermindDatingSearchEventsQueryVariables = Types.Exact<{
  search: Types.Scalars['String'];
}>;


export type MastermindDatingSearchEventsQuery = (
  { __typename: 'Query' }
  & { events: (
    { __typename: 'EventConnection' }
    & { nodes: Array<(
      { __typename: 'Event' }
      & MastermindDatingEventFragment
    )> }
  ) }
);

export type MastermindDatingCreateCohortMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type MastermindDatingCreateCohortMutation = (
  { __typename: 'Mutation' }
  & { mastermindDatingCreateCohort: (
    { __typename: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename: 'MastermindDatingCohort' }
      & MastermindDatingCohortSummaryFragment
    ) }
  ) }
);

export type MastermindDatingPopulateCohortFromEventMutationVariables = Types.Exact<{
  cohort_id: Types.Scalars['ID'];
}>;


export type MastermindDatingPopulateCohortFromEventMutation = (
  { __typename: 'Mutation' }
  & { mastermindDatingPopulateCohortFromEvent: (
    { __typename: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename: 'MastermindDatingCohort' }
      & MastermindDatingCohortDetailsFragment
    ) }
  ) }
);

export type MastermindDatingDeleteCohortMutationVariables = Types.Exact<{
  cohort_id: Types.Scalars['ID'];
}>;


export type MastermindDatingDeleteCohortMutation = (
  { __typename: 'Mutation' }
  & { mastermindDatingDeleteCohort: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type MastermindDatingSendInviteEmailsMutationVariables = Types.Exact<{
  cohort_id: Types.Scalars['ID'];
}>;


export type MastermindDatingSendInviteEmailsMutation = (
  { __typename: 'Mutation' }
  & { mastermindDatingSendInviteEmails: (
    { __typename: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename: 'MastermindDatingCohort' }
      & MastermindDatingCohortDetailsFragment
    ) }
  ) }
);

export type MastermindDatingRunSolverMutationVariables = Types.Exact<{
  cohort_id: Types.Scalars['ID'];
}>;


export type MastermindDatingRunSolverMutation = (
  { __typename: 'Mutation' }
  & { mastermindDatingRunSolver: (
    { __typename: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename: 'MastermindDatingCohort' }
      & MastermindDatingCohortDetailsFragment
    ) }
  ) }
);

export type MastermindDatingSetEventForCohortMutationVariables = Types.Exact<{
  cohort_id: Types.Scalars['ID'];
  event_id: Types.Scalars['ID'];
}>;


export type MastermindDatingSetEventForCohortMutation = (
  { __typename: 'Mutation' }
  & { mastermindDatingSetEventForCohort: (
    { __typename: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename: 'MastermindDatingCohort' }
      & MastermindDatingCohortDetailsFragment
    ) }
  ) }
);

export type MastermindDatingUnsetEventForCohortMutationVariables = Types.Exact<{
  cohort_id: Types.Scalars['ID'];
}>;


export type MastermindDatingUnsetEventForCohortMutation = (
  { __typename: 'Mutation' }
  & { mastermindDatingUnsetEventForCohort: (
    { __typename: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename: 'MastermindDatingCohort' }
      & MastermindDatingCohortDetailsFragment
    ) }
  ) }
);

export type MastermindDatingActivateVotingMutationVariables = Types.Exact<{
  participant_id: Types.Scalars['ID'];
}>;


export type MastermindDatingActivateVotingMutation = (
  { __typename: 'Mutation' }
  & { mastermindDatingActivateVoting: (
    { __typename: 'MastermindDatingParticipantMutationResult' }
    & { participant: (
      { __typename: 'MastermindDatingParticipant' }
      & MastermindDatingParticipantFragment
    ) }
  ) }
);

export type MastermindDatingSetPresenceStatusMutationVariables = Types.Exact<{
  participant_id: Types.Scalars['ID'];
  present: Types.Scalars['Boolean'];
}>;


export type MastermindDatingSetPresenceStatusMutation = (
  { __typename: 'Mutation' }
  & { mastermindDatingSetPresenceStatus: (
    { __typename: 'MastermindDatingParticipantMutationResult' }
    & { participant: (
      { __typename: 'MastermindDatingParticipant' }
      & MastermindDatingParticipantFragment
    ) }
  ) }
);

export type MastermindDatingCreateGroupMutationVariables = Types.Exact<{
  cohort_id: Types.Scalars['ID'];
}>;


export type MastermindDatingCreateGroupMutation = (
  { __typename: 'Mutation' }
  & { mastermindDatingCreateGroup: (
    { __typename: 'MastermindDatingCohortMutationResult' }
    & { cohort: (
      { __typename: 'MastermindDatingCohort' }
      & MastermindDatingCohortDetailsFragment
    ) }
  ) }
);

export type MastermindDatingCreateParticipantMutationVariables = Types.Exact<{
  cohort_id: Types.Scalars['ID'];
  email: Types.Scalars['String'];
}>;


export type MastermindDatingCreateParticipantMutation = (
  { __typename: 'Mutation' }
  & { mastermindDatingCreateParticipant: (
    { __typename: 'MastermindDatingParticipantMutationResult' }
    & { participant: (
      { __typename: 'MastermindDatingParticipant' }
      & MastermindDatingParticipantFragment
    ) }
  ) }
);

export const MastermindDatingCohortSummaryFragmentDoc: DocumentNode<MastermindDatingCohortSummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MastermindDatingCohortSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MastermindDatingCohort"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[],"directives":[]}]}}]}}]};
export const MastermindDatingParticipantFragmentDoc: DocumentNode<MastermindDatingParticipantFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MastermindDatingParticipant"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MastermindDatingParticipant"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"invite_email_sent"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"voted_for"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"photo"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"present"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"desc"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"email"},"arguments":[],"directives":[]}]}}]}}]};
export const MastermindDatingParticipantSummaryFragmentDoc: DocumentNode<MastermindDatingParticipantSummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MastermindDatingParticipantSummary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MastermindDatingParticipant"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]};
export const MastermindDatingGroupFragmentDoc: DocumentNode<MastermindDatingGroupFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MastermindDatingGroup"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MastermindDatingGroup"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"telegram_invite_link"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"participants"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingParticipantSummary"},"directives":[]}]}}]}},...MastermindDatingParticipantSummaryFragmentDoc.definitions]};
export const MastermindDatingCohortDetailsFragmentDoc: DocumentNode<MastermindDatingCohortDetailsFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MastermindDatingCohortDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MastermindDatingCohort"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"leader_telegram_uid"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"participants"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingParticipant"},"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"groups"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingGroup"},"directives":[]}]}}]}},...MastermindDatingParticipantFragmentDoc.definitions,...MastermindDatingGroupFragmentDoc.definitions]};
export const MastermindDatingEventFragmentDoc: DocumentNode<MastermindDatingEventFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MastermindDatingEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[],"directives":[]}]}}]};
export const MastermindDatingCohortsDocument: DocumentNode<MastermindDatingCohortsQuery, MastermindDatingCohortsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MastermindDatingCohorts"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"cohorts"},"name":{"kind":"Name","value":"mastermindDatingCohorts"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingCohortSummary"},"directives":[]}]}}]}},...MastermindDatingCohortSummaryFragmentDoc.definitions]};
export const MastermindDatingCohortByIdDocument: DocumentNode<MastermindDatingCohortByIdQuery, MastermindDatingCohortByIdQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MastermindDatingCohortById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"cohort"},"name":{"kind":"Name","value":"mastermindDatingCohortById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingCohortDetails"},"directives":[]}]}}]}},...MastermindDatingCohortDetailsFragmentDoc.definitions]};
export const MastermindDatingSearchEventsDocument: DocumentNode<MastermindDatingSearchEventsQuery, MastermindDatingSearchEventsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MastermindDatingSearchEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"search"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"search"},"value":{"kind":"Variable","name":{"kind":"Name","value":"search"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"20"}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingEvent"},"directives":[]}]}}]}}]}},...MastermindDatingEventFragmentDoc.definitions]};
export const MastermindDatingCreateCohortDocument: DocumentNode<MastermindDatingCreateCohortMutation, MastermindDatingCreateCohortMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MastermindDatingCreateCohort"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mastermindDatingCreateCohort"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cohort"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingCohortSummary"},"directives":[]}]}}]}}]}},...MastermindDatingCohortSummaryFragmentDoc.definitions]};
export const MastermindDatingPopulateCohortFromEventDocument: DocumentNode<MastermindDatingPopulateCohortFromEventMutation, MastermindDatingPopulateCohortFromEventMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MastermindDatingPopulateCohortFromEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mastermindDatingPopulateCohortFromEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cohort_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cohort"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingCohortDetails"},"directives":[]}]}}]}}]}},...MastermindDatingCohortDetailsFragmentDoc.definitions]};
export const MastermindDatingDeleteCohortDocument: DocumentNode<MastermindDatingDeleteCohortMutation, MastermindDatingDeleteCohortMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MastermindDatingDeleteCohort"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mastermindDatingDeleteCohort"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cohort_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]}]}}]}}]};
export const MastermindDatingSendInviteEmailsDocument: DocumentNode<MastermindDatingSendInviteEmailsMutation, MastermindDatingSendInviteEmailsMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MastermindDatingSendInviteEmails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mastermindDatingSendInviteEmails"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cohort_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cohort"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingCohortDetails"},"directives":[]}]}}]}}]}},...MastermindDatingCohortDetailsFragmentDoc.definitions]};
export const MastermindDatingRunSolverDocument: DocumentNode<MastermindDatingRunSolverMutation, MastermindDatingRunSolverMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MastermindDatingRunSolver"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mastermindDatingRunSolver"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cohort_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cohort"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingCohortDetails"},"directives":[]}]}}]}}]}},...MastermindDatingCohortDetailsFragmentDoc.definitions]};
export const MastermindDatingSetEventForCohortDocument: DocumentNode<MastermindDatingSetEventForCohortMutation, MastermindDatingSetEventForCohortMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MastermindDatingSetEventForCohort"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mastermindDatingSetEventForCohort"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cohort_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cohort"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingCohortDetails"},"directives":[]}]}}]}}]}},...MastermindDatingCohortDetailsFragmentDoc.definitions]};
export const MastermindDatingUnsetEventForCohortDocument: DocumentNode<MastermindDatingUnsetEventForCohortMutation, MastermindDatingUnsetEventForCohortMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MastermindDatingUnsetEventForCohort"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mastermindDatingUnsetEventForCohort"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cohort_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cohort"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingCohortDetails"},"directives":[]}]}}]}}]}},...MastermindDatingCohortDetailsFragmentDoc.definitions]};
export const MastermindDatingActivateVotingDocument: DocumentNode<MastermindDatingActivateVotingMutation, MastermindDatingActivateVotingMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MastermindDatingActivateVoting"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participant_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mastermindDatingActivateVoting"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"participant_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participant_id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"participant"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingParticipant"},"directives":[]}]}}]}}]}},...MastermindDatingParticipantFragmentDoc.definitions]};
export const MastermindDatingSetPresenceStatusDocument: DocumentNode<MastermindDatingSetPresenceStatusMutation, MastermindDatingSetPresenceStatusMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MastermindDatingSetPresenceStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"participant_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"present"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mastermindDatingSetPresenceStatus"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"participant_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"participant_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"present"},"value":{"kind":"Variable","name":{"kind":"Name","value":"present"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"participant"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingParticipant"},"directives":[]}]}}]}}]}},...MastermindDatingParticipantFragmentDoc.definitions]};
export const MastermindDatingCreateGroupDocument: DocumentNode<MastermindDatingCreateGroupMutation, MastermindDatingCreateGroupMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MastermindDatingCreateGroup"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mastermindDatingCreateGroup"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cohort_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cohort"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingCohortDetails"},"directives":[]}]}}]}}]}},...MastermindDatingCohortDetailsFragmentDoc.definitions]};
export const MastermindDatingCreateParticipantDocument: DocumentNode<MastermindDatingCreateParticipantMutation, MastermindDatingCreateParticipantMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MastermindDatingCreateParticipant"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"mastermindDatingCreateParticipant"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"cohort_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"cohort_id"}}},{"kind":"Argument","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"participant"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MastermindDatingParticipant"},"directives":[]}]}}]}}]}},...MastermindDatingParticipantFragmentDoc.definitions]};