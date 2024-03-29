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
    ), community_org_team_telegram_chat?: Types.Maybe<(
      { __typename: 'TelegramChat' }
      & Pick<Types.TelegramChat, 'id' | 'title' | 'link'>
    )> }
  ) }
);

export const WagtailCollection_ForSettingsFragmentDoc: DocumentNode<WagtailCollection_ForSettingsFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WagtailCollection_ForSettings"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]};
export const GlobalSettingsDocument: DocumentNode<GlobalSettingsQuery, GlobalSettingsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "GlobalSettings" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "settings" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "default_events_images_collection" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "WagtailCollection_ForSettings" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "default_events_vk_images_collection" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "WagtailCollection_ForSettings" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "weekly_digest_images_collection" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "WagtailCollection_ForSettings" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "telegram_images_collection" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "WagtailCollection_ForSettings" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "community_org_team_telegram_chat" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "title" } }, { "kind": "Field", "name": { "kind": "Name", "value": "link" } }] } }] } }] } }, ...WagtailCollection_ForSettingsFragmentDoc.definitions] });
