import * as Types from '../../../apollo/types.generated';

import { PageInfoFragment } from '../../../apollo/common-fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { PageInfoFragmentDoc } from '../../../apollo/common-fragments.generated';
export type OfdFiscalDrivesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type OfdFiscalDrivesQuery = (
  { __typename: 'Query' }
  & { ofdFiscalDrives: Array<(
    { __typename: 'OfdFiscalDrive' }
    & Pick<Types.OfdFiscalDrive, 'id' | 'fiscal_drive_number'>
  )> }
);

export type OfdDocumentFragment = (
  { __typename: 'OfdDocument' }
  & Pick<Types.OfdDocument, 'id' | 'created' | 'cash' | 'electronic'>
  & { items: Array<(
    { __typename: 'OfdDocumentItem' }
    & Pick<Types.OfdDocumentItem, 'id' | 'name'>
  )> }
);

export type OfdDocumentsQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type OfdDocumentsQuery = (
  { __typename: 'Query' }
  & { ofdDocuments: (
    { __typename: 'OfdDocumentConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<(
      { __typename: 'OfdDocumentEdge' }
      & { node: (
        { __typename: 'OfdDocument' }
        & OfdDocumentFragment
      ) }
    )> }
  ), importer: (
    { __typename: 'Importer' }
    & Pick<Types.Importer, 'last_dt'>
  ) }
);

export type OfdShiftFragment = (
  { __typename: 'OfdShift' }
  & Pick<Types.OfdShift, 'id' | 'shift_id' | 'open_dt' | 'close_dt' | 'cash' | 'electronic'>
);

export type OfdShiftsQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type OfdShiftsQuery = (
  { __typename: 'Query' }
  & { ofdShifts: (
    { __typename: 'OfdShiftConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<(
      { __typename: 'OfdShiftEdge' }
      & { node: (
        { __typename: 'OfdShift' }
        & OfdShiftFragment
      ) }
    )> }
  ) }
);

export const OfdDocumentFragmentDoc: DocumentNode<OfdDocumentFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OfdDocument"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OfdDocument"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"created"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"cash"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"electronic"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"items"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]};
export const OfdShiftFragmentDoc: DocumentNode<OfdShiftFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OfdShift"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"OfdShift"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"shift_id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"open_dt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"close_dt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"cash"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"electronic"},"arguments":[],"directives":[]}]}}]};
export const OfdFiscalDrivesDocument: DocumentNode<OfdFiscalDrivesQuery, OfdFiscalDrivesQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "OfdFiscalDrives" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ofdFiscalDrives" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "fiscal_drive_number" }, "arguments": [], "directives": [] }] } }] } }] });

export const OfdDocumentsDocument: DocumentNode<OfdDocumentsQuery, OfdDocumentsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "OfdDocuments" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ofdDocuments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "PageInfo" }, "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "OfdDocument" }, "directives": [] }] } }] } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "importer" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "module_name" }, "value": { "kind": "StringValue", "value": "kkm", "block": false } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "last_dt" }, "arguments": [], "directives": [] }] } }] } }, ...PageInfoFragmentDoc.definitions, ...OfdDocumentFragmentDoc.definitions] });

export const OfdShiftsDocument: DocumentNode<OfdShiftsQuery, OfdShiftsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "OfdShifts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ofdShifts" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "PageInfo" }, "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "OfdShift" }, "directives": [] }] } }] } }] } }] } }, ...PageInfoFragmentDoc.definitions, ...OfdShiftFragmentDoc.definitions] });
