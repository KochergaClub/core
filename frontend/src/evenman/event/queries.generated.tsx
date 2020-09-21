import * as Types from '../../apollo/types.generated';

import { WagtailImage_ForEditorFragment } from '../../components/images/ImageEditor/fragments.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { WagtailImage_ForEditorFragmentDoc } from '../../components/images/ImageEditor/fragments.generated';
export type EventsEvent_SummaryFragment = (
  { __typename: 'Event' }
  & Pick<Types.Event, 'id' | 'title' | 'start' | 'published' | 'event_type'>
  & { announcements: (
    { __typename: 'EventsAnnouncements' }
    & { timepad: (
      { __typename: 'EventsAnnouncementTimepad' }
      & Pick<Types.EventsAnnouncementTimepad, 'link'>
    ), vk: (
      { __typename: 'EventsAnnouncementVk' }
      & Pick<Types.EventsAnnouncementVk, 'link'>
    ), fb: (
      { __typename: 'EventsAnnouncementFb' }
      & Pick<Types.EventsAnnouncementFb, 'link'>
    ) }
  ) }
);

export type EvenmanEventsQueryVariables = Types.Exact<{
  start: Types.Scalars['String'];
  end: Types.Scalars['String'];
}>;


export type EvenmanEventsQuery = (
  { __typename: 'Query' }
  & { events: (
    { __typename: 'EventConnection' }
    & { nodes: Array<(
      { __typename: 'Event' }
      & EventsEvent_SummaryFragment
    )> }
  ) }
);

export type EvenmanUnknownEventFragment = (
  { __typename: 'Event' }
  & Pick<Types.Event, 'id' | 'title'>
);

export type EvenmanUnknownEventsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanUnknownEventsQuery = (
  { __typename: 'Query' }
  & { events: (
    { __typename: 'EventConnection' }
    & { nodes: Array<(
      { __typename: 'Event' }
      & EvenmanUnknownEventFragment
    )> }
  ) }
);

export type EvenmanEvent_DetailsFragment = (
  { __typename: 'Event' }
  & Pick<Types.Event, 'id' | 'created' | 'start' | 'end' | 'title' | 'summary' | 'description' | 'timing_description_override' | 'location' | 'zoom_link' | 'event_type' | 'pricing_type' | 'registration_type' | 'realm' | 'visitors' | 'tags' | 'published'>
  & { zoom_meeting?: Types.Maybe<(
    { __typename: 'ZoomMeeting' }
    & Pick<Types.ZoomMeeting, 'id' | 'participants_count'>
  )>, image?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
    & { original_image: (
      { __typename: 'WagtailImage' }
      & WagtailImage_ForEditorFragment
    ) }
  )>, imageForVkBackground?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )>, prototype?: Types.Maybe<(
    { __typename: 'EventsPrototype' }
    & Pick<Types.EventsPrototype, 'id'>
  )>, project?: Types.Maybe<(
    { __typename: 'ProjectPage' }
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'slug'>
    ) }
  )>, announcements: (
    { __typename: 'EventsAnnouncements' }
    & { timepad: (
      { __typename: 'EventsAnnouncementTimepad' }
      & Pick<Types.EventsAnnouncementTimepad, 'link' | 'category_code' | 'prepaid_tickets'>
    ), vk: (
      { __typename: 'EventsAnnouncementVk' }
      & Pick<Types.EventsAnnouncementVk, 'link' | 'group'>
      & { image?: Types.Maybe<(
        { __typename: 'WagtailImageRendition' }
        & Pick<Types.WagtailImageRendition, 'id' | 'url'>
        & { original_image: (
          { __typename: 'WagtailImage' }
          & WagtailImage_ForEditorFragment
        ) }
      )> }
    ), fb: (
      { __typename: 'EventsAnnouncementFb' }
      & Pick<Types.EventsAnnouncementFb, 'link' | 'group'>
    ) }
  ), tickets: Array<(
    { __typename: 'EventsTicket' }
    & Pick<Types.EventsTicket, 'id'>
  )> }
);

export type EvenmanEventQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type EvenmanEventQuery = (
  { __typename: 'Query' }
  & { event?: Types.Maybe<(
    { __typename: 'Event' }
    & EvenmanEvent_DetailsFragment
  )> }
);

export type EvenmanSetEventTypeMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  event_type: Types.Scalars['String'];
}>;


export type EvenmanSetEventTypeMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & Pick<Types.Event, 'id' | 'event_type'>
    ) }
  ) }
);

export type EvenmanSetZoomLinkMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  link: Types.Scalars['String'];
}>;


export type EvenmanSetZoomLinkMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & Pick<Types.Event, 'id' | 'zoom_link'>
    ) }
  ) }
);

export type EvenmanGenerateZoomLinkMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type EvenmanGenerateZoomLinkMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & Pick<Types.Event, 'id' | 'zoom_link'>
    ) }
  ) }
);

export type EvenmanUpdateMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  published?: Types.Maybe<Types.Scalars['Boolean']>;
  visitors?: Types.Maybe<Types.Scalars['String']>;
  title?: Types.Maybe<Types.Scalars['String']>;
  description?: Types.Maybe<Types.Scalars['String']>;
  summary?: Types.Maybe<Types.Scalars['String']>;
  event_type?: Types.Maybe<Types.Scalars['String']>;
  registration_type?: Types.Maybe<Types.Scalars['String']>;
  pricing_type?: Types.Maybe<Types.Scalars['String']>;
  realm?: Types.Maybe<Types.Scalars['String']>;
  location?: Types.Maybe<Types.Scalars['String']>;
  prototype_id?: Types.Maybe<Types.Scalars['ID']>;
  project_slug?: Types.Maybe<Types.Scalars['String']>;
  timing_description_override?: Types.Maybe<Types.Scalars['String']>;
  image_id?: Types.Maybe<Types.Scalars['ID']>;
}>;


export type EvenmanUpdateMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & EvenmanEvent_DetailsFragment
    ) }
  ) }
);

export type EvenmanEventDeleteMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type EvenmanEventDeleteMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type EvenmanEventAddTagMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  tag: Types.Scalars['String'];
}>;


export type EvenmanEventAddTagMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & Pick<Types.Event, 'id' | 'tags'>
    ) }
  ) }
);

export type EvenmanEventDeleteTagMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
  tag: Types.Scalars['String'];
}>;


export type EvenmanEventDeleteTagMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & Pick<Types.Event, 'id' | 'tags'>
    ) }
  ) }
);

export type EvenmanVkAnnouncementSetImageMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
  image_id: Types.Scalars['ID'];
}>;


export type EvenmanVkAnnouncementSetImageMutation = (
  { __typename: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & EvenmanEvent_DetailsFragment
    ) }
  )> }
);

export type EvenmanAnnounceMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
  target: Types.EventAnnounceTarget;
}>;


export type EvenmanAnnounceMutation = (
  { __typename: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & EvenmanEvent_DetailsFragment
    ) }
  )> }
);

export type EvenmanSetAnnounceUrlMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
  target: Types.EventAnnounceTarget;
  url: Types.Scalars['String'];
}>;


export type EvenmanSetAnnounceUrlMutation = (
  { __typename: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & EvenmanEvent_DetailsFragment
    ) }
  )> }
);

export type EvenmanEventMoveMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
  start: Types.Scalars['String'];
}>;


export type EvenmanEventMoveMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & Pick<Types.Event, 'id' | 'start' | 'end'>
    ) }
  ) }
);

export type EvenmanEventCreateMutationVariables = Types.Exact<{
  title: Types.Scalars['String'];
  start: Types.Scalars['String'];
  end: Types.Scalars['String'];
}>;


export type EvenmanEventCreateMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'EventCreateResult' }
    & Pick<Types.EventCreateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & EvenmanEvent_DetailsFragment
    ) }
  ) }
);

export type OnEventsSubscriptionVariables = Types.Exact<{ [key: string]: never; }>;


export type OnEventsSubscription = (
  { __typename: 'Subscription' }
  & { events: (
    { __typename: 'EventNotification' }
    & Pick<Types.EventNotification, 'type' | 'id'>
  ) }
);

export type EvenmanPrototypesForPickerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanPrototypesForPickerQuery = (
  { __typename: 'Query' }
  & { prototypes: Array<(
    { __typename: 'EventsPrototype' }
    & Pick<Types.EventsPrototype, 'id' | 'title'>
  )> }
);

export const EventsEvent_SummaryFragmentDoc: DocumentNode<EventsEvent_SummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventsEvent_Summary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event_type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"announcements"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timepad"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"vk"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"fb"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]}]}}]}}]}}]};
export const EvenmanUnknownEventFragmentDoc: DocumentNode<EvenmanUnknownEventFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvenmanUnknownEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]}]}}]};
export const EvenmanEvent_DetailsFragmentDoc: DocumentNode<EvenmanEvent_DetailsFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvenmanEvent_Details"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"created"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"end"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"summary"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"SOURCE"}}],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"timing_description_override"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"location"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zoom_link"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zoom_meeting"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"participants_count"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"event_type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"pricing_type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"registration_type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"realm"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"visitors"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"width-240","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"original_image"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailImage_ForEditor"},"directives":[]}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"imageForVkBackground"},"name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"width-1100","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"prototype"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"arguments":[],"directives":[]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"announcements"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timepad"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"category_code"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"prepaid_tickets"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"vk"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"group"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"width-240","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"original_image"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailImage_ForEditor"},"directives":[]}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fb"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"group"},"arguments":[],"directives":[]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tickets"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}},...WagtailImage_ForEditorFragmentDoc.definitions]};
export const EvenmanEventsDocument: DocumentNode<EvenmanEventsQuery, EvenmanEventsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EvenmanEvents"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"100"}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventsEvent_Summary"},"directives":[]}]}}]}}]}},...EventsEvent_SummaryFragmentDoc.definitions]};
export const EvenmanUnknownEventsDocument: DocumentNode<EvenmanUnknownEventsQuery, EvenmanUnknownEventsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EvenmanUnknownEvents"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_type"},"value":{"kind":"StringValue","value":"unknown","block":false}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"20"}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanUnknownEvent"},"directives":[]}]}}]}}]}},...EvenmanUnknownEventFragmentDoc.definitions]};
export const EvenmanEventDocument: DocumentNode<EvenmanEventQuery, EvenmanEventQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EvenmanEvent"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanEvent_Details"},"directives":[]}]}}]}},...EvenmanEvent_DetailsFragmentDoc.definitions]};
export const EvenmanSetEventTypeDocument: DocumentNode<EvenmanSetEventTypeMutation, EvenmanSetEventTypeMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanSetEventType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_type"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventSetEventType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"event_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_type"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event_type"},"arguments":[],"directives":[]}]}}]}}]}}]};
export const EvenmanSetZoomLinkDocument: DocumentNode<EvenmanSetZoomLinkMutation, EvenmanSetZoomLinkMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanSetZoomLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"link"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventSetZoomLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"zoom_link"},"value":{"kind":"Variable","name":{"kind":"Name","value":"link"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zoom_link"},"arguments":[],"directives":[]}]}}]}}]}}]};
export const EvenmanGenerateZoomLinkDocument: DocumentNode<EvenmanGenerateZoomLinkMutation, EvenmanGenerateZoomLinkMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanGenerateZoomLink"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventGenerateZoomLink"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zoom_link"},"arguments":[],"directives":[]}]}}]}}]}}]};
export const EvenmanUpdateDocument: DocumentNode<EvenmanUpdateMutation, EvenmanUpdateMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"published"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"visitors"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"description"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"summary"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"registration_type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"pricing_type"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"realm"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"location"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prototype_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"project_slug"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"timing_description_override"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image_id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"published"},"value":{"kind":"Variable","name":{"kind":"Name","value":"published"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"visitors"},"value":{"kind":"Variable","name":{"kind":"Name","value":"visitors"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"description"},"value":{"kind":"Variable","name":{"kind":"Name","value":"description"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"summary"},"value":{"kind":"Variable","name":{"kind":"Name","value":"summary"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"event_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"registration_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"registration_type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"pricing_type"},"value":{"kind":"Variable","name":{"kind":"Name","value":"pricing_type"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"realm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"realm"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"location"},"value":{"kind":"Variable","name":{"kind":"Name","value":"location"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"prototype_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prototype_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"project_slug"},"value":{"kind":"Variable","name":{"kind":"Name","value":"project_slug"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"timing_description_override"},"value":{"kind":"Variable","name":{"kind":"Name","value":"timing_description_override"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"image_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image_id"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanEvent_Details"},"directives":[]}]}}]}}]}},...EvenmanEvent_DetailsFragmentDoc.definitions]};
export const EvenmanEventDeleteDocument: DocumentNode<EvenmanEventDeleteMutation, EvenmanEventDeleteMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanEventDelete"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventDelete"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]}]}}]}}]};
export const EvenmanEventAddTagDocument: DocumentNode<EvenmanEventAddTagMutation, EvenmanEventAddTagMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanEventAddTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventAddTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[],"directives":[]}]}}]}}]}}]};
export const EvenmanEventDeleteTagDocument: DocumentNode<EvenmanEventDeleteTagMutation, EvenmanEventDeleteTagMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanEventDeleteTag"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"tag"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventDeleteTag"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"tag"},"value":{"kind":"Variable","name":{"kind":"Name","value":"tag"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tags"},"arguments":[],"directives":[]}]}}]}}]}}]};
export const EvenmanVkAnnouncementSetImageDocument: DocumentNode<EvenmanVkAnnouncementSetImageMutation, EvenmanVkAnnouncementSetImageMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanVkAnnouncementSetImage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"image_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventVkAnnouncementSetImage"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"image_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"image_id"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanEvent_Details"},"directives":[]}]}}]}}]}},...EvenmanEvent_DetailsFragmentDoc.definitions]};
export const EvenmanAnnounceDocument: DocumentNode<EvenmanAnnounceMutation, EvenmanAnnounceMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanAnnounce"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"target"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventAnnounceTarget"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventAnnounce"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"target"},"value":{"kind":"Variable","name":{"kind":"Name","value":"target"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanEvent_Details"},"directives":[]}]}}]}}]}},...EvenmanEvent_DetailsFragmentDoc.definitions]};
export const EvenmanSetAnnounceUrlDocument: DocumentNode<EvenmanSetAnnounceUrlMutation, EvenmanSetAnnounceUrlMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanSetAnnounceUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"target"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"EventAnnounceTarget"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"url"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventSetAnnounceUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"target"},"value":{"kind":"Variable","name":{"kind":"Name","value":"target"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"url"},"value":{"kind":"Variable","name":{"kind":"Name","value":"url"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanEvent_Details"},"directives":[]}]}}]}}]}},...EvenmanEvent_DetailsFragmentDoc.definitions]};
export const EvenmanEventMoveDocument: DocumentNode<EvenmanEventMoveMutation, EvenmanEventMoveMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanEventMove"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventMove"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"end"},"arguments":[],"directives":[]}]}}]}}]}}]};
export const EvenmanEventCreateDocument: DocumentNode<EvenmanEventCreateMutation, EvenmanEventCreateMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanEventCreate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"title"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"start"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"end"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventCreate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"title"},"value":{"kind":"Variable","name":{"kind":"Name","value":"title"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"start"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"end"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}}]}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanEvent_Details"},"directives":[]}]}}]}}]}},...EvenmanEvent_DetailsFragmentDoc.definitions]};
export const OnEventsDocument: DocumentNode<OnEventsSubscription, OnEventsSubscriptionVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"onEvents"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"events"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]}}]};
export const EvenmanPrototypesForPickerDocument: DocumentNode<EvenmanPrototypesForPickerQuery, EvenmanPrototypesForPickerQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"EvenmanPrototypesForPicker"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"prototypes"},"name":{"kind":"Name","value":"eventsPrototypes"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]}]}}]}}]};