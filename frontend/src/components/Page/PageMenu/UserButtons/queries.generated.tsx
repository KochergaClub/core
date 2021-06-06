import * as Types from '../../../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type WagtailEditablePageQueryVariables = Types.Exact<{
  path: Types.Scalars['String'];
}>;


export type WagtailEditablePageQuery = (
  { __typename: 'Query' }
  & { wagtailPage?: Types.Maybe<(
    { __typename: 'RatioPresentationIndexPage' }
    & Pick<Types.RatioPresentationIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'RatioSectionPage' }
    & Pick<Types.RatioSectionPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'RatioSectionIndexPage' }
    & Pick<Types.RatioSectionIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'RatioNotebookPage' }
    & Pick<Types.RatioNotebookPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'RatioNotebookIndexPage' }
    & Pick<Types.RatioNotebookIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'ProjectPage' }
    & Pick<Types.ProjectPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'ProjectIndexPage' }
    & Pick<Types.ProjectIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'FreeFormPage' }
    & Pick<Types.FreeFormPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'FolderPage' }
    & Pick<Types.FolderPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'BlogPostPage' }
    & Pick<Types.BlogPostPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'BlogIndexPage' }
    & Pick<Types.BlogIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'FaqPage' }
    & Pick<Types.FaqPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  ) | (
    { __typename: 'PresentationPage' }
    & Pick<Types.PresentationPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { permissions: (
        { __typename: 'WagtailPagePermissions' }
        & Pick<Types.WagtailPagePermissions, 'can_edit'>
      ) }
    ) }
  )> }
);


export const WagtailEditablePageDocument: DocumentNode<WagtailEditablePageQuery, WagtailEditablePageQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "WagtailEditablePage" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "path" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "wagtailPage" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "path" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "path" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "meta" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "permissions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "can_edit" } }] } }] } }] } }] } }] });
