import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type TildaPagesForAdminQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TildaPagesForAdminQuery = (
  { __typename: 'Query' }
  & { tildaPages: Array<(
    { __typename: 'TildaPage' }
    & Pick<Types.TildaPage, 'page_id' | 'title' | 'description' | 'path' | 'imported_dt'>
  )> }
);

export type TildaImportAllMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type TildaImportAllMutation = (
  { __typename: 'Mutation' }
  & { tildaImportAll?: Types.Maybe<(
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  )> }
);

export type TildaImportMutationVariables = Types.Exact<{
  page_id: Types.Scalars['Int'];
}>;


export type TildaImportMutation = (
  { __typename: 'Mutation' }
  & { tildaImport?: Types.Maybe<(
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  )> }
);


export const TildaPagesForAdminDocument: DocumentNode<TildaPagesForAdminQuery, TildaPagesForAdminQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "TildaPagesForAdmin" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tildaPages" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "page_id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "title" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "description" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "path" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "imported_dt" }, "arguments": [], "directives": [] }] } }] } }] });

export const TildaImportAllDocument: DocumentNode<TildaImportAllMutation, TildaImportAllMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "TildaImportAll" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tildaImportAll" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });

export const TildaImportDocument: DocumentNode<TildaImportMutation, TildaImportMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "TildaImport" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "page_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tildaImport" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "page_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "page_id" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });
