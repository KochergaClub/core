import * as Types from '../../../apollo/types.generated';

import { OfdShiftFragment } from '../ofd/queries.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { OfdShiftFragmentDoc } from '../ofd/queries.generated';
export type KkmDashboardQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type KkmDashboardQuery = (
  { __typename: 'Query' }
  & { ofdShifts: (
    { __typename: 'OfdShiftConnection' }
    & { nodes: Array<(
      { __typename: 'OfdShift' }
      & OfdShiftFragment
    )> }
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


export const KkmDashboardDocument: DocumentNode<KkmDashboardQuery, KkmDashboardQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "KkmDashboard" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ofdShifts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "IntValue", "value": "20" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "filter" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "open_only" }, "value": { "kind": "BooleanValue", "value": true } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "nodes" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "OfdShift" }, "directives": [] }] } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "importer" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "module_name" }, "value": { "kind": "StringValue", "value": "kkm", "block": false } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "last_dt" }, "arguments": [], "directives": [] }] } }] } }, ...OfdShiftFragmentDoc.definitions] });

export const CloseKkmShiftDocument: DocumentNode<CloseKkmShiftMutation, CloseKkmShiftMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CloseKkmShift" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "closeKkmShift" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });
