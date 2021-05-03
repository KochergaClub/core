import * as Types from '../../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ProjectPage_SummaryForEventFragment = (
  { __typename: 'ProjectPage' }
  & Pick<Types.ProjectPage, 'id' | 'title' | 'is_active'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug'>
  ), upcoming_events: Array<(
    { __typename: 'Event' }
    & Pick<Types.Event, 'id' | 'title'>
  )> }
);

export type MyEventsTicketFragment = (
  { __typename: 'MyEventsTicket' }
  & Pick<Types.MyEventsTicket, 'id' | 'created' | 'status' | 'zoom_link'>
);

export type Event_DetailsFragment = (
  { __typename: 'Event' }
  & Pick<Types.Event, 'id' | 'start' | 'end' | 'title' | 'summary' | 'description' | 'realm' | 'registration_type' | 'pricing_type'>
  & { image?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'url'>
  )>, project?: Types.Maybe<(
    { __typename: 'ProjectPage' }
    & ProjectPage_SummaryForEventFragment
  )>, my_ticket?: Types.Maybe<(
    { __typename: 'MyEventsTicket' }
    & MyEventsTicketFragment
  )>, announcements: (
    { __typename: 'EventsAnnouncements' }
    & { timepad: (
      { __typename: 'EventsAnnouncementTimepad' }
      & Pick<Types.EventsAnnouncementTimepad, 'link'>
    ) }
  ) }
);

export type GetPublicEventQueryVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
}>;


export type GetPublicEventQuery = (
  { __typename: 'Query' }
  & { publicEvent?: Types.Maybe<(
    { __typename: 'Event' }
    & Event_DetailsFragment
  )> }
);

export type MyEventsTicketRegisterAnonMutationVariables = Types.Exact<{
  input: Types.MyEventsTicketRegisterAnonInput;
}>;


export type MyEventsTicketRegisterAnonMutation = (
  { __typename: 'Mutation' }
  & { myEventsTicketRegisterAnon: (
    { __typename: 'MyEventsTicket' }
    & MyEventsTicketFragment
  ) }
);

export type MyEventsTicketRegisterMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
}>;


export type MyEventsTicketRegisterMutation = (
  { __typename: 'Mutation' }
  & { myEventsTicketRegister: (
    { __typename: 'MyEventsTicket' }
    & MyEventsTicketFragment
  ) }
);

export type MyEventsTicketUnregisterMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
}>;


export type MyEventsTicketUnregisterMutation = (
  { __typename: 'Mutation' }
  & { myEventsTicketUnregister: (
    { __typename: 'MyEventsTicket' }
    & MyEventsTicketFragment
  ) }
);

export const ProjectPage_SummaryForEventFragmentDoc: DocumentNode<ProjectPage_SummaryForEventFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectPage_SummaryForEvent"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"is_active"}},{"kind":"Field","name":{"kind":"Name","value":"upcoming_events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}}]};
export const MyEventsTicketFragmentDoc: DocumentNode<MyEventsTicketFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MyEventsTicket"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"MyEventsTicket"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"zoom_link"}}]}}]};
export const Event_DetailsFragmentDoc: DocumentNode<Event_DetailsFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event_Details"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"original","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"realm"}},{"kind":"Field","name":{"kind":"Name","value":"registration_type"}},{"kind":"Field","name":{"kind":"Name","value":"pricing_type"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectPage_SummaryForEvent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"my_ticket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyEventsTicket"}}]}},{"kind":"Field","name":{"kind":"Name","value":"announcements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timepad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}}]}},...ProjectPage_SummaryForEventFragmentDoc.definitions,...MyEventsTicketFragmentDoc.definitions]};
export const GetPublicEventDocument: DocumentNode<GetPublicEventQuery, GetPublicEventQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetPublicEvent" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "publicEvent" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Event_Details" } }] } }] } }, ...Event_DetailsFragmentDoc.definitions] });

export const MyEventsTicketRegisterAnonDocument: DocumentNode<MyEventsTicketRegisterAnonMutation, MyEventsTicketRegisterAnonMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "MyEventsTicketRegisterAnon" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "MyEventsTicketRegisterAnonInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "myEventsTicketRegisterAnon" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "MyEventsTicket" } }] } }] } }, ...MyEventsTicketFragmentDoc.definitions] });

export const MyEventsTicketRegisterDocument: DocumentNode<MyEventsTicketRegisterMutation, MyEventsTicketRegisterMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "MyEventsTicketRegister" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "myEventsTicketRegister" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "MyEventsTicket" } }] } }] } }, ...MyEventsTicketFragmentDoc.definitions] });

export const MyEventsTicketUnregisterDocument: DocumentNode<MyEventsTicketUnregisterMutation, MyEventsTicketUnregisterMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "MyEventsTicketUnregister" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "myEventsTicketUnregister" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "MyEventsTicket" } }] } }] } }, ...MyEventsTicketFragmentDoc.definitions] });
