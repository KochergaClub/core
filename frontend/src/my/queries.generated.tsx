import * as Types from '../apollo/types.generated';

import { AuthCurrentUserFragment } from '../auth/queries.generated';
import { GenericErrorFragment, ValidationErrorFragment } from '../apollo/common-fragments.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { AuthCurrentUserFragmentDoc } from '../auth/queries.generated';
import { GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../apollo/common-fragments.generated';
export type ExtendedCurrentUserFragment = (
  { __typename: 'AuthCurrentUser' }
  & Pick<Types.AuthCurrentUser, 'first_name' | 'last_name'>
  & AuthCurrentUserFragment
);

export type MembershipFragment = (
  { __typename: 'MyCmCustomer' }
  & Pick<Types.MyCmCustomer, 'card_id' | 'orders_count' | 'subscription_until'>
  & { orders: Array<(
    { __typename: 'MyCmOrder' }
    & Pick<Types.MyCmOrder, 'start_dt'>
  )> }
);

export type EmailSubscriptionInterestFragment = (
  { __typename: 'MyEmailSubscriptionInterest' }
  & Pick<Types.MyEmailSubscriptionInterest, 'id' | 'name' | 'subscribed'>
);

export type EmailSubscriptionFragment = (
  { __typename: 'MyEmailSubscription' }
  & Pick<Types.MyEmailSubscription, 'status'>
  & { interests?: Types.Maybe<Array<(
    { __typename: 'MyEmailSubscriptionInterest' }
    & EmailSubscriptionInterestFragment
  )>> }
);

export type MyTicketFragment = (
  { __typename: 'MyEventsTicket' }
  & Pick<Types.MyEventsTicket, 'id' | 'status' | 'zoom_link'>
  & { event: (
    { __typename: 'Event' }
    & Pick<Types.Event, 'id' | 'start' | 'title'>
  ) }
);

export type MyVisitsPageFragment = (
  { __typename: 'My' }
  & { membership?: Types.Maybe<(
    { __typename: 'MyCmCustomer' }
    & MembershipFragment
  )> }
);

export type MyTicketsPageFragment = (
  { __typename: 'My' }
  & { tickets: (
    { __typename: 'MyEventsTicketConnection' }
    & { nodes: Array<(
      { __typename: 'MyEventsTicket' }
      & MyTicketFragment
    )> }
  ) }
);

export type MySettingsPageFragment = (
  { __typename: 'My' }
  & { user: (
    { __typename: 'AuthCurrentUser' }
    & ExtendedCurrentUserFragment
  ), email_subscription: (
    { __typename: 'MyEmailSubscription' }
    & EmailSubscriptionFragment
  ), membership?: Types.Maybe<(
    { __typename: 'MyCmCustomer' }
    & Pick<Types.MyCmCustomer, 'privacy_mode'>
  )> }
);

export type MyVisitsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyVisitsPageQuery = (
  { __typename: 'Query' }
  & { my: (
    { __typename: 'My' }
    & MyVisitsPageFragment
  ) }
);

export type MyTicketsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MyTicketsPageQuery = (
  { __typename: 'Query' }
  & { my: (
    { __typename: 'My' }
    & MyTicketsPageFragment
  ) }
);

export type MySettingsPageQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type MySettingsPageQuery = (
  { __typename: 'Query' }
  & { my: (
    { __typename: 'My' }
    & MySettingsPageFragment
  ) }
);

export type MyEmailResubscribeMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type MyEmailResubscribeMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'myEmailResubscribe'>
);

export type MyEmailUnsubscribeMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type MyEmailUnsubscribeMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'myEmailUnsubscribe'>
);

export type MyEmailSubscribeToInterestMutationVariables = Types.Exact<{
  interest_id: Types.Scalars['ID'];
}>;


export type MyEmailSubscribeToInterestMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'myEmailSubscribeToInterest'>
);

export type MyEmailUnsubscribeFromInterestMutationVariables = Types.Exact<{
  interest_id: Types.Scalars['ID'];
}>;


export type MyEmailUnsubscribeFromInterestMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'myEmailUnsubscribeFromInterest'>
);

export type MyPrivacyModeSetMutationVariables = Types.Exact<{
  mode: Types.Scalars['String'];
}>;


export type MyPrivacyModeSetMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'myPrivacyModeSet'>
);

export type MyTicketDeleteMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
}>;


export type MyTicketDeleteMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'MyEventsTicket' }
    & Pick<Types.MyEventsTicket, 'id' | 'created' | 'status'>
  ) }
);

export type LogoutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'AuthLogoutResult' }
    & Pick<Types.AuthLogoutResult, 'ok'>
  ) }
);

export type SetPasswordMutationVariables = Types.Exact<{
  old_password?: Types.Maybe<Types.Scalars['String']>;
  new_password: Types.Scalars['String'];
}>;


export type SetPasswordMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'SetMyPasswordOkResult' }
    & Pick<Types.SetMyPasswordOkResult, 'ok'>
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) }
);

export type MyEventPageQueryVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
}>;


export type MyEventPageQuery = (
  { __typename: 'Query' }
  & { publicEvent?: Types.Maybe<(
    { __typename: 'Event' }
    & Pick<Types.Event, 'id' | 'start' | 'title'>
    & { my_ticket?: Types.Maybe<(
      { __typename: 'MyEventsTicket' }
      & Pick<Types.MyEventsTicket, 'status'>
    )> }
  )> }
);

export type EventGenerateOpenViduTokenMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
}>;


export type EventGenerateOpenViduTokenMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventGenerateOpenViduTokenResult' }
    & Pick<Types.EventGenerateOpenViduTokenResult, 'token'>
  ) }
);

export type SetMyNamesMutationVariables = Types.Exact<{
  input: Types.AuthSetMyNamesInput;
}>;


export type SetMyNamesMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'AuthCurrentUser' }
    & ExtendedCurrentUserFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) }
);

export const MembershipFragmentDoc: DocumentNode<MembershipFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Membership"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyCmCustomer"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"card_id"}},{"kind":"Field","name":{"kind":"Name","value":"orders_count"}},{"kind":"Field","name":{"kind":"Name","value":"subscription_until"}},{"kind":"Field","name":{"kind":"Name","value":"orders"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"start_dt"}}]}}]}}]};
export const MyVisitsPageFragmentDoc: DocumentNode<MyVisitsPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyVisitsPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"My"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"membership"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Membership"}}]}}]}},...MembershipFragmentDoc.definitions]};
export const MyTicketFragmentDoc: DocumentNode<MyTicketFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyTicket"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyEventsTicket"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"zoom_link"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]};
export const MyTicketsPageFragmentDoc: DocumentNode<MyTicketsPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyTicketsPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"My"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"tickets"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyTicket"}}]}}]}}]}},...MyTicketFragmentDoc.definitions]};
export const ExtendedCurrentUserFragmentDoc: DocumentNode<ExtendedCurrentUserFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ExtendedCurrentUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthCurrentUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthCurrentUser"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}}]}},...AuthCurrentUserFragmentDoc.definitions]};
export const EmailSubscriptionInterestFragmentDoc: DocumentNode<EmailSubscriptionInterestFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailSubscriptionInterest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyEmailSubscriptionInterest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"subscribed"}}]}}]};
export const EmailSubscriptionFragmentDoc: DocumentNode<EmailSubscriptionFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EmailSubscription"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyEmailSubscription"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"interests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailSubscriptionInterest"}}]}}]}},...EmailSubscriptionInterestFragmentDoc.definitions]};
export const MySettingsPageFragmentDoc: DocumentNode<MySettingsPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MySettingsPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"My"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExtendedCurrentUser"}}]}},{"kind":"Field","name":{"kind":"Name","value":"email_subscription"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EmailSubscription"}}]}},{"kind":"Field","name":{"kind":"Name","value":"membership"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"privacy_mode"}}]}}]}},...ExtendedCurrentUserFragmentDoc.definitions,...EmailSubscriptionFragmentDoc.definitions]};
export const MyVisitsPageDocument: DocumentNode<MyVisitsPageQuery, MyVisitsPageQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyVisitsPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"my"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyVisitsPage"}}]}}]}},...MyVisitsPageFragmentDoc.definitions]};
export const MyTicketsPageDocument: DocumentNode<MyTicketsPageQuery, MyTicketsPageQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyTicketsPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"my"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyTicketsPage"}}]}}]}},...MyTicketsPageFragmentDoc.definitions]};
export const MySettingsPageDocument: DocumentNode<MySettingsPageQuery, MySettingsPageQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MySettingsPage"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"my"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MySettingsPage"}}]}}]}},...MySettingsPageFragmentDoc.definitions]};
export const MyEmailResubscribeDocument: DocumentNode<MyEmailResubscribeMutation, MyEmailResubscribeMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MyEmailResubscribe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myEmailResubscribe"}}]}}]};
export const MyEmailUnsubscribeDocument: DocumentNode<MyEmailUnsubscribeMutation, MyEmailUnsubscribeMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MyEmailUnsubscribe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myEmailUnsubscribe"}}]}}]};
export const MyEmailSubscribeToInterestDocument: DocumentNode<MyEmailSubscribeToInterestMutation, MyEmailSubscribeToInterestMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MyEmailSubscribeToInterest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interest_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myEmailSubscribeToInterest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"interest_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interest_id"}}}]}]}}]};
export const MyEmailUnsubscribeFromInterestDocument: DocumentNode<MyEmailUnsubscribeFromInterestMutation, MyEmailUnsubscribeFromInterestMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MyEmailUnsubscribeFromInterest"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"interest_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myEmailUnsubscribeFromInterest"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"interest_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"interest_id"}}}]}]}}]};
export const MyPrivacyModeSetDocument: DocumentNode<MyPrivacyModeSetMutation, MyPrivacyModeSetMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MyPrivacyModeSet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"mode"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"myPrivacyModeSet"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"mode"},"value":{"kind":"Variable","name":{"kind":"Name","value":"mode"}}}]}]}}]};
export const MyTicketDeleteDocument: DocumentNode<MyTicketDeleteMutation, MyTicketDeleteMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"MyTicketDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"myEventsTicketUnregister"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]};
export const LogoutDocument: DocumentNode<LogoutMutation, LogoutMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Logout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"authLogout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]};
export const SetPasswordDocument: DocumentNode<SetPasswordMutation, SetPasswordMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetPassword"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"old_password"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"new_password"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"setMyPassword"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"old_password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"old_password"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"new_password"},"value":{"kind":"Variable","name":{"kind":"Name","value":"new_password"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SetMyPasswordOkResult"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenericError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationError"}}]}}]}},...GenericErrorFragmentDoc.definitions,...ValidationErrorFragmentDoc.definitions]};
export const MyEventPageDocument: DocumentNode<MyEventPageQuery, MyEventPageQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyEventPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicEvent"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"my_ticket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]}}]};
export const EventGenerateOpenViduTokenDocument: DocumentNode<EventGenerateOpenViduTokenMutation, EventGenerateOpenViduTokenMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EventGenerateOpenViduToken"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventGenerateOpenViduToken"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]};
export const SetMyNamesDocument: DocumentNode<SetMyNamesMutation, SetMyNamesMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetMyNames"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthSetMyNamesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"authSetMyNames"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ExtendedCurrentUser"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenericError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationError"}}]}}]}},...ExtendedCurrentUserFragmentDoc.definitions,...GenericErrorFragmentDoc.definitions,...ValidationErrorFragmentDoc.definitions]};