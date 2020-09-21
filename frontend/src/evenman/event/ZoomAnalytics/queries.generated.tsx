import * as Types from '../../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type EvenmanEvent_ForZoomAnalyticsFragment = (
  { __typename: 'Event' }
  & Pick<Types.Event, 'id'>
  & { zoom_meeting?: Types.Maybe<(
    { __typename: 'ZoomMeeting' }
    & Pick<Types.ZoomMeeting, 'id'>
    & { instances: Array<(
      { __typename: 'ZoomMeetingInstance' }
      & Pick<Types.ZoomMeetingInstance, 'id' | 'start_time' | 'end_time'>
      & { participants: Array<(
        { __typename: 'ZoomParticipant' }
        & Pick<Types.ZoomParticipant, 'id' | 'name' | 'join_time' | 'leave_time'>
      )> }
    )> }
  )> }
);

export type EvenmanEventForZoomAnalyticsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type EvenmanEventForZoomAnalyticsQuery = (
  { __typename: 'Query' }
  & { event?: Types.Maybe<(
    { __typename: 'Event' }
    & EvenmanEvent_ForZoomAnalyticsFragment
  )> }
);

export const EvenmanEvent_ForZoomAnalyticsFragmentDoc: DocumentNode<EvenmanEvent_ForZoomAnalyticsFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvenmanEvent_ForZoomAnalytics"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"zoom_meeting"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"instances"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"start_time"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"end_time"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"participants"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"join_time"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"leave_time"},"arguments":[],"directives":[]}]}}]}}]}}]}}]};
export const EvenmanEventForZoomAnalyticsDocument: DocumentNode<EvenmanEventForZoomAnalyticsQuery, EvenmanEventForZoomAnalyticsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanEventForZoomAnalytics" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "event" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "event_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanEvent_ForZoomAnalytics" }, "directives": [] }] } }] } }, ...EvenmanEvent_ForZoomAnalyticsFragmentDoc.definitions] });
