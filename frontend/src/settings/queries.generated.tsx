import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GlobalSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GlobalSettingsQuery = (
  { __typename: 'Query' }
  & { settings: (
    { __typename: 'Settings' }
    & { default_events_images_collection?: Types.Maybe<(
      { __typename: 'WagtailCollection' }
      & Pick<Types.WagtailCollection, 'id' | 'name'>
    )>, default_events_vk_images_collection?: Types.Maybe<(
      { __typename: 'WagtailCollection' }
      & Pick<Types.WagtailCollection, 'id' | 'name'>
    )> }
  ) }
);


export const GlobalSettingsDocument: DocumentNode<GlobalSettingsQuery, GlobalSettingsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GlobalSettings" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "settings" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "default_events_images_collection" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "name" }, "arguments": [], "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "default_events_vk_images_collection" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "name" }, "arguments": [], "directives": [] }] } }] } }] } }] });
