import * as Types from '../../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type KkmDashboardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type KkmDashboardQuery = (
  { __typename: 'Query' }
  & { kkmStatus: (
    { __typename: 'KkmStatusResult' }
    & Pick<Types.KkmStatusResult, 'last_shift_closed'>
  ), importer: (
    { __typename: 'Importer' }
    & Pick<Types.Importer, 'last_dt'>
  ) }
);

export type CloseKkmShiftMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type CloseKkmShiftMutation = (
  { __typename: 'Mutation' }
  & { closeKkmShift: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);


export const KkmDashboardDocument: DocumentNode<KkmDashboardQuery, KkmDashboardQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "KkmDashboard" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "kkmStatus" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "last_shift_closed" }, "arguments": [], "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "importer" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "module_name" }, "value": { "kind": "StringValue", "value": "kkm", "block": false } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "last_dt" }, "arguments": [], "directives": [] }] } }] } }] });

export const CloseKkmShiftDocument: DocumentNode<CloseKkmShiftMutation, CloseKkmShiftMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CloseKkmShift" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "closeKkmShift" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });
