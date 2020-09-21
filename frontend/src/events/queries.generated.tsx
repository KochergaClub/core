import * as Types from '../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Event_SummaryFragment = (
  { __typename: 'Event' }
  & Pick<Types.Event, 'id' | 'title' | 'summary' | 'start' | 'end'>
  & { image?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )>, image_2x?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )> }
);

export type UpcomingPublicEventsQueryVariables = Types.Exact<{
  today: Types.Scalars['String'];
}>;


export type UpcomingPublicEventsQuery = (
  { __typename: 'Query' }
  & { publicEvents: (
    { __typename: 'EventConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage'>
    ), nodes: Array<(
      { __typename: 'Event' }
      & Event_SummaryFragment
    )> }
  ) }
);

export type Event_ForCalendarFragment = (
  { __typename: 'Event' }
  & Pick<Types.Event, 'id' | 'title' | 'start' | 'public_tags'>
);

export type PublicEventsForCalendarQueryVariables = Types.Exact<{
  from: Types.Scalars['String'];
  to: Types.Scalars['String'];
}>;


export type PublicEventsForCalendarQuery = (
  { __typename: 'Query' }
  & { publicEvents: (
    { __typename: 'EventConnection' }
    & { nodes: Array<(
      { __typename: 'Event' }
      & Event_ForCalendarFragment
    )> }
  ) }
);

export type EventsPublicGoogleCalendarQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EventsPublicGoogleCalendarQuery = (
  { __typename: 'Query' }
  & { eventsPublicGoogleCalendar?: Types.Maybe<(
    { __typename: 'EventsGoogleCalendar' }
    & Pick<Types.EventsGoogleCalendar, 'url'>
  )> }
);

export type TeamCalendarEventFragment = (
  { __typename: 'Event' }
  & Pick<Types.Event, 'id' | 'start' | 'end' | 'title' | 'summary' | 'description' | 'event_type' | 'room' | 'creator'>
  & { announcements: (
    { __typename: 'EventsAnnouncements' }
    & { vk: (
      { __typename: 'EventsAnnouncementVk' }
      & Pick<Types.EventsAnnouncementVk, 'link'>
    ), fb: (
      { __typename: 'EventsAnnouncementFb' }
      & Pick<Types.EventsAnnouncementFb, 'link'>
    ), timepad: (
      { __typename: 'EventsAnnouncementTimepad' }
      & Pick<Types.EventsAnnouncementTimepad, 'link'>
    ) }
  ) }
);

export type EventsInRangeQueryVariables = Types.Exact<{
  start: Types.Scalars['String'];
  end: Types.Scalars['String'];
}>;


export type EventsInRangeQuery = (
  { __typename: 'Query' }
  & { events: (
    { __typename: 'EventConnection' }
    & { nodes: Array<(
      { __typename: 'Event' }
      & TeamCalendarEventFragment
    )> }
  ) }
);

export type TeamCalendarEventQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type TeamCalendarEventQuery = (
  { __typename: 'Query' }
  & { event?: Types.Maybe<(
    { __typename: 'Event' }
    & TeamCalendarEventFragment
  )> }
);

export type ResizeEventMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  start: Types.Scalars['String'];
  end: Types.Scalars['String'];
}>;


export type ResizeEventMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventUpdateResult' }
    & { event: (
      { __typename: 'Event' }
      & TeamCalendarEventFragment
    ) }
  ) }
);

export type TeamCalendarCreateEventMutationVariables = Types.Exact<{
  start: Types.Scalars['String'];
  end: Types.Scalars['String'];
  title: Types.Scalars['String'];
  description: Types.Scalars['String'];
  room: Types.Scalars['String'];
}>;


export type TeamCalendarCreateEventMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventCreateResult' }
    & Pick<Types.EventCreateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & TeamCalendarEventFragment
    ) }
  ) }
);

export type TeamCalendarUpdateEventMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  title?: Types.Maybe<Types.Scalars['String']>;
  description?: Types.Maybe<Types.Scalars['String']>;
  location?: Types.Maybe<Types.Scalars['String']>;
}>;


export type TeamCalendarUpdateEventMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & TeamCalendarEventFragment
    ) }
  ) }
);

export type TeamCalendarDeleteEventMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type TeamCalendarDeleteEventMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type TeamEventFeedbackFragment = (
  { __typename: 'EventsFeedback' }
  & Pick<Types.EventsFeedback, 'id' | 'overall_score' | 'recommend_score' | 'content_score' | 'conductor_score' | 'source_friend' | 'source_vk' | 'source_fb' | 'source_timepad' | 'source_email' | 'source_website' | 'custom_source' | 'comment'>
);

export type TeamEventDetailsFragment = (
  { __typename: 'Event' }
  & { feedbacks: Array<(
    { __typename: 'EventsFeedback' }
    & TeamEventFeedbackFragment
  )> }
  & TeamCalendarEventFragment
);

export type TeamEventDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type TeamEventDetailsQuery = (
  { __typename: 'Query' }
  & { event?: Types.Maybe<(
    { __typename: 'Event' }
    & TeamEventDetailsFragment
  )> }
);

export type EventFeedbackCreateMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
  overall_score?: Types.Maybe<Types.Scalars['Int']>;
  recommend_score?: Types.Maybe<Types.Scalars['Int']>;
  content_score?: Types.Maybe<Types.Scalars['Int']>;
  conductor_score?: Types.Maybe<Types.Scalars['Int']>;
  source_friend: Types.Scalars['Boolean'];
  source_vk: Types.Scalars['Boolean'];
  source_fb: Types.Scalars['Boolean'];
  source_timepad: Types.Scalars['Boolean'];
  source_email: Types.Scalars['Boolean'];
  source_website: Types.Scalars['Boolean'];
  custom_source: Types.Scalars['String'];
  comment: Types.Scalars['String'];
}>;


export type EventFeedbackCreateMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventsFeedbackCreateResult' }
    & Pick<Types.EventsFeedbackCreateResult, 'ok'>
    & { feedback: (
      { __typename: 'EventsFeedback' }
      & TeamEventFeedbackFragment
    ) }
  ) }
);

export type EventFeedbackDeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type EventFeedbackDeleteMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export const Event_SummaryFragmentDoc: DocumentNode<Event_SummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event_Summary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"summary"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-760x200","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]}]}},{"kind":"Field","alias":{"kind":"Name","value":"image_2x"},"name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-1520x400","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"end"},"arguments":[],"directives":[]}]}}]};
export const Event_ForCalendarFragmentDoc: DocumentNode<Event_ForCalendarFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event_ForCalendar"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"public_tags"},"arguments":[],"directives":[]}]}}]};
export const TeamCalendarEventFragmentDoc: DocumentNode<TeamCalendarEventFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamCalendarEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"end"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"summary"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event_type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"room"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"creator"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"announcements"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"vk"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"fb"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"timepad"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]}]}}]}}]}}]};
export const TeamEventFeedbackFragmentDoc: DocumentNode<TeamEventFeedbackFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamEventFeedback"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventsFeedback"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"overall_score"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"recommend_score"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"content_score"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"conductor_score"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"source_friend"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"source_vk"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"source_fb"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"source_timepad"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"source_email"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"source_website"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"custom_source"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"comment"},"arguments":[],"directives":[]}]}}]};
export const TeamEventDetailsFragmentDoc: DocumentNode<TeamEventDetailsFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TeamEventDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamCalendarEvent"},"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"feedbacks"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamEventFeedback"},"directives":[]}]}}]}},...TeamCalendarEventFragmentDoc.definitions,...TeamEventFeedbackFragmentDoc.definitions]};
export const UpcomingPublicEventsDocument: DocumentNode<UpcomingPublicEventsQuery, UpcomingPublicEventsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"UpcomingPublicEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"today"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"from_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"today"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"20"}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"nodes"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event_Summary"},"directives":[]}]}}]}}]}},...Event_SummaryFragmentDoc.definitions]};
export const PublicEventsForCalendarDocument: DocumentNode<PublicEventsForCalendarQuery, PublicEventsForCalendarQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"PublicEventsForCalendar"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"to"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"publicEvents"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"to"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Event_ForCalendar"},"directives":[]}]}}]}}]}},...Event_ForCalendarFragmentDoc.definitions]};
export const EventsPublicGoogleCalendarDocument: DocumentNode<EventsPublicGoogleCalendarQuery, EventsPublicGoogleCalendarQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventsPublicGoogleCalendar"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"eventsPublicGoogleCalendar"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]}]}}]}}]};
export const EventsInRangeDocument: DocumentNode<EventsInRangeQuery, EventsInRangeQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EventsInRange"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamCalendarEvent"},"directives":[]}]}}]}}]}},...TeamCalendarEventFragmentDoc.definitions]};
export const TeamCalendarEventDocument: DocumentNode<TeamCalendarEventQuery, TeamCalendarEventQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeamCalendarEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamCalendarEvent"},"directives":[]}]}}]}},...TeamCalendarEventFragmentDoc.definitions]};
export const ResizeEventDocument: DocumentNode<ResizeEventMutation, ResizeEventMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"ResizeEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamCalendarEvent"},"directives":[]}]}}]}}]}},...TeamCalendarEventFragmentDoc.definitions]};
export const TeamCalendarCreateEventDocument: DocumentNode<TeamCalendarCreateEventMutation, TeamCalendarCreateEventMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TeamCalendarCreateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"room"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"room"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamCalendarEvent"},"directives":[]}]}}]}}]}},...TeamCalendarEventFragmentDoc.definitions]};
export const TeamCalendarUpdateEventDocument: DocumentNode<TeamCalendarUpdateEventMutation, TeamCalendarUpdateEventMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TeamCalendarUpdateEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamCalendarEvent"},"directives":[]}]}}]}}]}},...TeamCalendarEventFragmentDoc.definitions]};
export const TeamCalendarDeleteEventDocument: DocumentNode<TeamCalendarDeleteEventMutation, TeamCalendarDeleteEventMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"TeamCalendarDeleteEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]}]}}]}}]};
export const TeamEventDetailsDocument: DocumentNode<TeamEventDetailsQuery, TeamEventDetailsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TeamEventDetails"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamEventDetails"},"directives":[]}]}}]}},...TeamEventDetailsFragmentDoc.definitions]};
export const EventFeedbackCreateDocument: DocumentNode<EventFeedbackCreateMutation, EventFeedbackCreateMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EventFeedbackCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"overall_score"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"recommend_score"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"content_score"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"conductor_score"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source_friend"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source_vk"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source_fb"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source_timepad"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source_email"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"source_website"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"custom_source"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"comment"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventsFeedbackCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"overall_score"},"value":{"kind":"Variable","name":{"kind":"Name","value":"overall_score"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"recommend_score"},"value":{"kind":"Variable","name":{"kind":"Name","value":"recommend_score"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"content_score"},"value":{"kind":"Variable","name":{"kind":"Name","value":"content_score"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"conductor_score"},"value":{"kind":"Variable","name":{"kind":"Name","value":"conductor_score"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"source_friend"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source_friend"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"source_vk"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source_vk"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"source_fb"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source_fb"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"source_timepad"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source_timepad"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"source_email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source_email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"source_website"},"value":{"kind":"Variable","name":{"kind":"Name","value":"source_website"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"custom_source"},"value":{"kind":"Variable","name":{"kind":"Name","value":"custom_source"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"comment"},"value":{"kind":"Variable","name":{"kind":"Name","value":"comment"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"feedback"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"TeamEventFeedback"},"directives":[]}]}}]}}]}},...TeamEventFeedbackFragmentDoc.definitions]};
export const EventFeedbackDeleteDocument: DocumentNode<EventFeedbackDeleteMutation, EventFeedbackDeleteMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EventFeedbackDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventsFeedbackDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]}]}}]}}]};