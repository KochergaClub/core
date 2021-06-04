import * as Types from '../../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Event_ForPickerFragment = (
  { __typename: 'Event' }
  & Pick<Types.Event, 'id' | 'title' | 'start'>
);

export type SearchEventsForPickerQueryVariables = Types.Exact<{
  search: Types.Scalars['String'];
}>;


export type SearchEventsForPickerQuery = (
  { __typename: 'Query' }
  & { events: (
    { __typename: 'EventConnection' }
    & { nodes: Array<(
      { __typename: 'Event' }
      & Event_ForPickerFragment
    )> }
  ) }
);

export const Event_ForPickerFragmentDoc: DocumentNode<Event_ForPickerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Event_ForPicker"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Event"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start"}}]}}]};
export const SearchEventsForPickerDocument: DocumentNode<SearchEventsForPickerQuery, SearchEventsForPickerQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "SearchEventsForPicker" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "search" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "events" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "search" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "search" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "IntValue", "value": "20" } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "nodes" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Event_ForPicker" } }] } }] } }] } }, ...Event_ForPickerFragmentDoc.definitions] });
