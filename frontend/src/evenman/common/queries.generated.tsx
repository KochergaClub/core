import * as Types from '../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ProjectPage_ForPickerFragment = (
  { __typename: 'ProjectPage' }
  & Pick<Types.ProjectPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug' | 'url'>
  ) }
);

export type EvenmanProjectsListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanProjectsListQuery = (
  { __typename: 'Query' }
  & { projects: Array<(
    { __typename: 'ProjectPage' }
    & ProjectPage_ForPickerFragment
  )> }
);

export type EvenmanVkGroupsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanVkGroupsQuery = (
  { __typename: 'Query' }
  & { vkGroups: Array<(
    { __typename: 'VkGroup' }
    & Pick<Types.VkGroup, 'name'>
  )> }
);

export type EvenmanTimepadCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EvenmanTimepadCategoriesQuery = (
  { __typename: 'Query' }
  & { timepadCategories: Array<(
    { __typename: 'TimepadCategory' }
    & Pick<Types.TimepadCategory, 'id' | 'code' | 'name'>
  )> }
);

export const ProjectPage_ForPickerFragmentDoc: DocumentNode<ProjectPage_ForPickerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ProjectPage_ForPicker"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ProjectPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]};
export const EvenmanProjectsListDocument: DocumentNode<EvenmanProjectsListQuery, EvenmanProjectsListQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanProjectsList" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "projects" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ProjectPage_ForPicker" } }] } }] } }, ...ProjectPage_ForPickerFragmentDoc.definitions] });

export const EvenmanVkGroupsDocument: DocumentNode<EvenmanVkGroupsQuery, EvenmanVkGroupsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanVkGroups" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "vkGroups" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } }] });

export const EvenmanTimepadCategoriesDocument: DocumentNode<EvenmanTimepadCategoriesQuery, EvenmanTimepadCategoriesQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanTimepadCategories" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "timepadCategories" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "code" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }] } }] } }] });
