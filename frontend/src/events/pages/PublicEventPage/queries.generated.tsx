import * as Types from '../../../apollo/types.generated';

import { AnyWagtailBlock_RatioNotebookSectionBlock_Fragment, AnyWagtailBlock_RatioHeaderBlock_Fragment, AnyWagtailBlock_RatioParagraphBlock_Fragment, AnyWagtailBlock_RatioInsetBlock_Fragment, AnyWagtailBlock_RatioExerciseBlock_Fragment, AnyWagtailBlock_RatioExerciseOnelineBlock_Fragment, AnyWagtailBlock_RatioBriefingBlock_Fragment, AnyWagtailBlock_RatioMathBlock_Fragment, AnyWagtailBlock_BasicTextBlock_Fragment, AnyWagtailBlock_BasicCardBlock_Fragment, AnyWagtailBlock_SectionHeaderBlock_Fragment, AnyWagtailBlock_ColumnsBasicBlock_Fragment, AnyWagtailBlock_ColumnsButtonsBlock_Fragment, AnyWagtailBlock_BigContactsBlock_Fragment, AnyWagtailBlock_MailchimpSubscribeBlock_Fragment, AnyWagtailBlock_HeroFrontBlock_Fragment, AnyWagtailBlock_LandingHeroBlock_Fragment, AnyWagtailBlock_LandingTextBlock_Fragment, AnyWagtailBlock_FrontPartnersBlock_Fragment, AnyWagtailBlock_EventsListBlock_Fragment, AnyWagtailBlock_PhotoRibbonBlock_Fragment, AnyWagtailBlock_HrBlock_Fragment, AnyWagtailBlock_FrontSocialLinksBlock_Fragment, AnyWagtailBlock_SlideTitleBlock_Fragment, AnyWagtailBlock_SlideRichTextBlock_Fragment, AnyWagtailBlock_SlideRawHtmlBlock_Fragment, AnyWagtailBlock_SlideFragmentsBlock_Fragment, AnyWagtailBlock_SlideFragmentsBlock_RichTextBlock_Fragment, AnyWagtailBlock_SlideFragmentsBlock_RawHtmlBlock_Fragment } from '../../../wagtail/fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { AnyWagtailBlockFragmentDoc } from '../../../wagtail/fragments.generated';
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
  & { stream_body: Array<(
    { __typename: 'RatioNotebookSectionBlock' }
    & AnyWagtailBlock_RatioNotebookSectionBlock_Fragment
  ) | (
    { __typename: 'RatioHeaderBlock' }
    & AnyWagtailBlock_RatioHeaderBlock_Fragment
  ) | (
    { __typename: 'RatioParagraphBlock' }
    & AnyWagtailBlock_RatioParagraphBlock_Fragment
  ) | (
    { __typename: 'RatioInsetBlock' }
    & AnyWagtailBlock_RatioInsetBlock_Fragment
  ) | (
    { __typename: 'RatioExerciseBlock' }
    & AnyWagtailBlock_RatioExerciseBlock_Fragment
  ) | (
    { __typename: 'RatioExerciseOnelineBlock' }
    & AnyWagtailBlock_RatioExerciseOnelineBlock_Fragment
  ) | (
    { __typename: 'RatioBriefingBlock' }
    & AnyWagtailBlock_RatioBriefingBlock_Fragment
  ) | (
    { __typename: 'RatioMathBlock' }
    & AnyWagtailBlock_RatioMathBlock_Fragment
  ) | (
    { __typename: 'BasicTextBlock' }
    & AnyWagtailBlock_BasicTextBlock_Fragment
  ) | (
    { __typename: 'BasicCardBlock' }
    & AnyWagtailBlock_BasicCardBlock_Fragment
  ) | (
    { __typename: 'SectionHeaderBlock' }
    & AnyWagtailBlock_SectionHeaderBlock_Fragment
  ) | (
    { __typename: 'ColumnsBasicBlock' }
    & AnyWagtailBlock_ColumnsBasicBlock_Fragment
  ) | (
    { __typename: 'ColumnsButtonsBlock' }
    & AnyWagtailBlock_ColumnsButtonsBlock_Fragment
  ) | (
    { __typename: 'BigContactsBlock' }
    & AnyWagtailBlock_BigContactsBlock_Fragment
  ) | (
    { __typename: 'MailchimpSubscribeBlock' }
    & AnyWagtailBlock_MailchimpSubscribeBlock_Fragment
  ) | (
    { __typename: 'HeroFrontBlock' }
    & AnyWagtailBlock_HeroFrontBlock_Fragment
  ) | (
    { __typename: 'LandingHeroBlock' }
    & AnyWagtailBlock_LandingHeroBlock_Fragment
  ) | (
    { __typename: 'LandingTextBlock' }
    & AnyWagtailBlock_LandingTextBlock_Fragment
  ) | (
    { __typename: 'FrontPartnersBlock' }
    & AnyWagtailBlock_FrontPartnersBlock_Fragment
  ) | (
    { __typename: 'EventsListBlock' }
    & AnyWagtailBlock_EventsListBlock_Fragment
  ) | (
    { __typename: 'PhotoRibbonBlock' }
    & AnyWagtailBlock_PhotoRibbonBlock_Fragment
  ) | (
    { __typename: 'HrBlock' }
    & AnyWagtailBlock_HrBlock_Fragment
  ) | (
    { __typename: 'FrontSocialLinksBlock' }
    & AnyWagtailBlock_FrontSocialLinksBlock_Fragment
  ) | (
    { __typename: 'SlideTitleBlock' }
    & AnyWagtailBlock_SlideTitleBlock_Fragment
  ) | (
    { __typename: 'SlideRichTextBlock' }
    & AnyWagtailBlock_SlideRichTextBlock_Fragment
  ) | (
    { __typename: 'SlideRawHtmlBlock' }
    & AnyWagtailBlock_SlideRawHtmlBlock_Fragment
  ) | (
    { __typename: 'SlideFragmentsBlock' }
    & AnyWagtailBlock_SlideFragmentsBlock_Fragment
  ) | (
    { __typename: 'SlideFragmentsBlock_RichTextBlock' }
    & AnyWagtailBlock_SlideFragmentsBlock_RichTextBlock_Fragment
  ) | (
    { __typename: 'SlideFragmentsBlock_RawHtmlBlock' }
    & AnyWagtailBlock_SlideFragmentsBlock_RawHtmlBlock_Fragment
  )>, image?: Types.Maybe<(
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
  ), youtube_videos: Array<(
    { __typename: 'EventsYoutubeVideo' }
    & Pick<Types.EventsYoutubeVideo, 'id' | 'embed_id'>
  )> }
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
export const Event_DetailsFragmentDoc: DocumentNode<Event_DetailsFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event_Details"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"end"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"stream_body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnyWagtailBlock"}}]}},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"original","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"realm"}},{"kind":"Field","name":{"kind":"Name","value":"registration_type"}},{"kind":"Field","name":{"kind":"Name","value":"pricing_type"}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"ProjectPage_SummaryForEvent"}}]}},{"kind":"Field","name":{"kind":"Name","value":"my_ticket"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MyEventsTicket"}}]}},{"kind":"Field","name":{"kind":"Name","value":"announcements"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timepad"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"link"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"youtube_videos"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"embed_id"}}]}}]}},...AnyWagtailBlockFragmentDoc.definitions,...ProjectPage_SummaryForEventFragmentDoc.definitions,...MyEventsTicketFragmentDoc.definitions]};
export const GetPublicEventDocument: DocumentNode<GetPublicEventQuery, GetPublicEventQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GetPublicEvent" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "publicEvent" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Event_Details" } }] } }] } }, ...Event_DetailsFragmentDoc.definitions] });

export const MyEventsTicketRegisterAnonDocument: DocumentNode<MyEventsTicketRegisterAnonMutation, MyEventsTicketRegisterAnonMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "MyEventsTicketRegisterAnon" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "MyEventsTicketRegisterAnonInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "myEventsTicketRegisterAnon" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "MyEventsTicket" } }] } }] } }, ...MyEventsTicketFragmentDoc.definitions] });

export const MyEventsTicketRegisterDocument: DocumentNode<MyEventsTicketRegisterMutation, MyEventsTicketRegisterMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "MyEventsTicketRegister" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "myEventsTicketRegister" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "MyEventsTicket" } }] } }] } }, ...MyEventsTicketFragmentDoc.definitions] });

export const MyEventsTicketUnregisterDocument: DocumentNode<MyEventsTicketUnregisterMutation, MyEventsTicketUnregisterMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "MyEventsTicketUnregister" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "myEventsTicketUnregister" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "event_id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "MyEventsTicket" } }] } }] } }, ...MyEventsTicketFragmentDoc.definitions] });
