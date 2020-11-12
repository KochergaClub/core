import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type WagtailCollection_ForSettingsFragment = (
  { __typename: 'WagtailCollection' }
  & Pick<Types.WagtailCollection, 'id' | 'name'>
);

export type GlobalSettingsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GlobalSettingsQuery = (
  { __typename: 'Query' }
  & { settings: (
    { __typename: 'Settings' }
    & { default_events_images_collection: (
      { __typename: 'WagtailCollection' }
      & WagtailCollection_ForSettingsFragment
    ), default_events_vk_images_collection: (
      { __typename: 'WagtailCollection' }
      & WagtailCollection_ForSettingsFragment
    ), weekly_digest_images_collection: (
      { __typename: 'WagtailCollection' }
      & WagtailCollection_ForSettingsFragment
    ), telegram_images_collection: (
      { __typename: 'WagtailCollection' }
      & WagtailCollection_ForSettingsFragment
    ) }
  ) }
);

export const WagtailCollection_ForSettingsFragmentDoc: DocumentNode<WagtailCollection_ForSettingsFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WagtailCollection_ForSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailCollection"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]};
export const GlobalSettingsDocument: DocumentNode<GlobalSettingsQuery, GlobalSettingsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GlobalSettings" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "settings" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "default_events_images_collection" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "WagtailCollection_ForSettings" }, "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "default_events_vk_images_collection" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "WagtailCollection_ForSettings" }, "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "weekly_digest_images_collection" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "WagtailCollection_ForSettings" }, "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "telegram_images_collection" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "WagtailCollection_ForSettings" }, "directives": [] }] } }] } }] } }, ...WagtailCollection_ForSettingsFragmentDoc.definitions] });
