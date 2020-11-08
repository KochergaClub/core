import * as Types from '../../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type OfdFiscalDrivesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type OfdFiscalDrivesQuery = (
  { __typename: 'Query' }
  & { ofdFiscalDrives: Array<(
    { __typename: 'OfdFiscalDrive' }
    & Pick<Types.OfdFiscalDrive, 'id' | 'fiscal_drive_number'>
  )> }
);


export const OfdFiscalDrivesDocument: DocumentNode<OfdFiscalDrivesQuery, OfdFiscalDrivesQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "OfdFiscalDrives" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ofdFiscalDrives" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "fiscal_drive_number" }, "arguments": [], "directives": [] }] } }] } }] });
