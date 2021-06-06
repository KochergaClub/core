import * as Types from '../../apollo/types.generated';

import { WagtailImage_ForEditorFragment } from '../../components/images/ImageEditor/fragments.generated';
import { GenericErrorFragment, ValidationErrorFragment } from '../../apollo/common-fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { WagtailImage_ForEditorFragmentDoc } from '../../components/images/ImageEditor/fragments.generated';
import { GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../../apollo/common-fragments.generated';
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

export type EventsPrototype_ProjectionsFragment = (
  { __typename: 'EventsPrototype' }
  & Pick<Types.EventsPrototype, 'id' | 'title' | 'active' | 'weekday' | 'hour' | 'minute' | 'suggested_dates'>
);

export type EvenmanEventsCalendarQueryVariables = Types.Exact<{
  start: Types.Scalars['String'];
  end: Types.Scalars['String'];
}>;


export type EvenmanEventsCalendarQuery = (
  { __typename: 'Query' }
  & { events: (
    { __typename: 'EventConnection' }
    & { nodes: Array<(
      { __typename: 'Event' }
      & EventsEvent_SummaryFragment
    )> }
  ), prototypes: Array<(
    { __typename: 'EventsPrototype' }
    & EventsPrototype_ProjectionsFragment
  )> }
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
  )>, youtube_videos: Array<(
    { __typename: 'EventsYoutubeVideo' }
    & Pick<Types.EventsYoutubeVideo, 'id' | 'embed_id'>
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
  input: Types.EventUpdateInput;
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

export type EvenmanCancelEventMutationVariables = Types.Exact<{
  input: Types.CancelEventInput;
}>;


export type EvenmanCancelEventMutation = (
  { __typename: 'Mutation' }
  & { result: { __typename: 'BasicResult' } | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) | { __typename: 'ValidationError' } }
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

export type EvenmanAddYoutubeVideoMutationVariables = Types.Exact<{
  input: Types.AddYoutubeVideoInput;
}>;


export type EvenmanAddYoutubeVideoMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'Event' }
    & EvenmanEvent_DetailsFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) | { __typename: 'ValidationError' } }
);

export type EvenmanDeleteYoutubeVideoMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type EvenmanDeleteYoutubeVideoMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
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

export type EvenmanGlobalSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanGlobalSettingsQuery = (
  { __typename: 'Query' }
  & { settings: (
    { __typename: 'Settings' }
    & { default_events_images_collection: (
      { __typename: 'WagtailCollection' }
      & Pick<Types.WagtailCollection, 'id'>
    ), default_events_vk_images_collection: (
      { __typename: 'WagtailCollection' }
      & Pick<Types.WagtailCollection, 'id'>
    ) }
  ) }
);

export const EventsEvent_SummaryFragmentDoc: DocumentNode<EventsEvent_SummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventsEvent_Summary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"event_type"}},{"kind":"Field","name":{"kind":"Name","value":"announcements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timepad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}},{"kind":"Field","name":{"kind":"Name","value":"fb"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}}]};
export const EventsPrototype_ProjectionsFragmentDoc: DocumentNode<EventsPrototype_ProjectionsFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventsPrototype_Projections"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventsPrototype"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"active"}},{"kind":"Field","name":{"kind":"Name","value":"weekday"}},{"kind":"Field","name":{"kind":"Name","value":"hour"}},{"kind":"Field","name":{"kind":"Name","value":"minute"}},{"kind":"Field","name":{"kind":"Name","value":"suggested_dates"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"from_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"start"}}},{"kind":"Argument","name":{"kind":"Name","value":"to_date"},"value":{"kind":"Variable","name":{"kind":"Name","value":"end"}}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"100"}}]}]}}]};
export const EvenmanUnknownEventFragmentDoc: DocumentNode<EvenmanUnknownEventFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvenmanUnknownEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]};
export const EvenmanEvent_DetailsFragmentDoc: DocumentNode<EvenmanEvent_DetailsFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvenmanEvent_Details"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"format"},"value":{"kind":"EnumValue","value":"SOURCE"}}]},{"kind":"Field","name":{"kind":"Name","value":"timing_description_override"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"zoom_link"}},{"kind":"Field","name":{"kind":"Name","value":"zoom_meeting"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"participants_count"}}]}},{"kind":"Field","name":{"kind":"Name","value":"event_type"}},{"kind":"Field","name":{"kind":"Name","value":"pricing_type"}},{"kind":"Field","name":{"kind":"Name","value":"registration_type"}},{"kind":"Field","name":{"kind":"Name","value":"realm"}},{"kind":"Field","name":{"kind":"Name","value":"visitors"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"width-240","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"original_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailImage_ForEditor"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"imageForVkBackground"},"name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"width-1100","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prototype"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"published"}},{"kind":"Field","name":{"kind":"Name","value":"announcements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timepad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"category_code"}},{"kind":"Field","name":{"kind":"Name","value":"prepaid_tickets"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vk"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"group"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"width-240","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"original_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailImage_ForEditor"}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"fb"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"group"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tickets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"youtube_videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"embed_id"}}]}}]}},...WagtailImage_ForEditorFragmentDoc.definitions]};
export const EvenmanEventsCalendarDocument: DocumentNode<EvenmanEventsCalendarQuery, EvenmanEventsCalendarQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanEventsCalendar" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "start" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "end" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "events" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "start" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "end" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "IntValue", "value": "100" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "nodes" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EventsEvent_Summary" } }] } }] } }, { "kind": "Field", "alias": { "kind": "Name", "value": "prototypes" }, "name": { "kind": "Name", "value": "eventsPrototypes" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EventsPrototype_Projections" } }] } }] } }, ...EventsEvent_SummaryFragmentDoc.definitions, ...EventsPrototype_ProjectionsFragmentDoc.definitions] });

export const EvenmanUnknownEventsDocument: DocumentNode<EvenmanUnknownEventsQuery, EvenmanUnknownEventsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanUnknownEvents" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "events" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "filter" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "event_type" }, "value": { "kind": "StringValue", "value": "unknown", "block": false } }] } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "IntValue", "value": "20" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "nodes" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanUnknownEvent" } }] } }] } }] } }, ...EvenmanUnknownEventFragmentDoc.definitions] });

export const EvenmanEventDocument: DocumentNode<EvenmanEventQuery, EvenmanEventQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanEvent" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "event" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanEvent_Details" } }] } }] } }, ...EvenmanEvent_DetailsFragmentDoc.definitions] });

export const EvenmanGenerateZoomLinkDocument: DocumentNode<EvenmanGenerateZoomLinkMutation, EvenmanGenerateZoomLinkMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanGenerateZoomLink" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventGenerateZoomLink" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }, { "kind": "Field", "name": { "kind": "Name", "value": "event" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "zoom_link" } }] } }] } }] } }] });

export const EvenmanUpdateDocument: DocumentNode<EvenmanUpdateMutation, EvenmanUpdateMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanUpdate" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "EventUpdateInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventUpdate" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }, { "kind": "Field", "name": { "kind": "Name", "value": "event" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanEvent_Details" } }] } }] } }] } }, ...EvenmanEvent_DetailsFragmentDoc.definitions] });

export const EvenmanEventDeleteDocument: DocumentNode<EvenmanEventDeleteMutation, EvenmanEventDeleteMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanEventDelete" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventDelete" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }] } }] } }] });

export const EvenmanCancelEventDocument: DocumentNode<EvenmanCancelEventMutation, EvenmanCancelEventMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanCancelEvent" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CancelEventInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "cancelEvent" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" } }] } }] } }, ...GenericErrorFragmentDoc.definitions] });

export const EvenmanEventAddTagDocument: DocumentNode<EvenmanEventAddTagMutation, EvenmanEventAddTagMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanEventAddTag" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "tag" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventAddTag" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "tag" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "tag" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }, { "kind": "Field", "name": { "kind": "Name", "value": "event" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tags" } }] } }] } }] } }] });

export const EvenmanEventDeleteTagDocument: DocumentNode<EvenmanEventDeleteTagMutation, EvenmanEventDeleteTagMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanEventDeleteTag" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "tag" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventDeleteTag" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "tag" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "tag" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }, { "kind": "Field", "name": { "kind": "Name", "value": "event" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "tags" } }] } }] } }] } }] });

export const EvenmanVkAnnouncementSetImageDocument: DocumentNode<EvenmanVkAnnouncementSetImageMutation, EvenmanVkAnnouncementSetImageMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanVkAnnouncementSetImage" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "image_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventVkAnnouncementSetImage" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "image_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "image_id" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }, { "kind": "Field", "name": { "kind": "Name", "value": "event" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanEvent_Details" } }] } }] } }] } }, ...EvenmanEvent_DetailsFragmentDoc.definitions] });

export const EvenmanAnnounceDocument: DocumentNode<EvenmanAnnounceMutation, EvenmanAnnounceMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanAnnounce" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "target" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "EventAnnounceTarget" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventAnnounce" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "target" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "target" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }, { "kind": "Field", "name": { "kind": "Name", "value": "event" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanEvent_Details" } }] } }] } }] } }, ...EvenmanEvent_DetailsFragmentDoc.definitions] });

export const EvenmanSetAnnounceUrlDocument: DocumentNode<EvenmanSetAnnounceUrlMutation, EvenmanSetAnnounceUrlMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanSetAnnounceUrl" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "target" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "EventAnnounceTarget" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "url" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventSetAnnounceUrl" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "target" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "target" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "url" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "url" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }, { "kind": "Field", "name": { "kind": "Name", "value": "event" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanEvent_Details" } }] } }] } }] } }, ...EvenmanEvent_DetailsFragmentDoc.definitions] });

export const EvenmanEventMoveDocument: DocumentNode<EvenmanEventMoveMutation, EvenmanEventMoveMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanEventMove" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "start" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventMove" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "start" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "start" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }, { "kind": "Field", "name": { "kind": "Name", "value": "event" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "start" } }, { "kind": "Field", "name": { "kind": "Name", "value": "end" } }] } }] } }] } }] });

export const EvenmanEventCreateDocument: DocumentNode<EvenmanEventCreateMutation, EvenmanEventCreateMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanEventCreate" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "title" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "start" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "end" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "eventCreate" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "title" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "title" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "start" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "start" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "end" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "end" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }, { "kind": "Field", "name": { "kind": "Name", "value": "event" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanEvent_Details" } }] } }] } }] } }, ...EvenmanEvent_DetailsFragmentDoc.definitions] });

export const EvenmanAddYoutubeVideoDocument: DocumentNode<EvenmanAddYoutubeVideoMutation, EvenmanAddYoutubeVideoMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanAddYoutubeVideo" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "AddYoutubeVideoInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "addYoutubeVideo" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanEvent_Details" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" } }] } }] } }, ...EvenmanEvent_DetailsFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions] });

export const EvenmanDeleteYoutubeVideoDocument: DocumentNode<EvenmanDeleteYoutubeVideoMutation, EvenmanDeleteYoutubeVideoMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EvenmanDeleteYoutubeVideo" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "deleteYoutubeVideo" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "BasicResult" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }] } }] } }] } }] });

export const OnEventsDocument: DocumentNode<OnEventsSubscription, OnEventsSubscriptionVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "subscription", "name": { "kind": "Name", "value": "onEvents" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "events" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "type" } }, { "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }] });

export const EvenmanPrototypesForPickerDocument: DocumentNode<EvenmanPrototypesForPickerQuery, EvenmanPrototypesForPickerQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanPrototypesForPicker" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "prototypes" }, "name": { "kind": "Name", "value": "eventsPrototypes" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }] } }] } }] });

export const EvenmanGlobalSettingsDocument: DocumentNode<EvenmanGlobalSettingsQuery, EvenmanGlobalSettingsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanGlobalSettings" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "settings" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "default_events_images_collection" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "default_events_vk_images_collection" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }] } }] });
