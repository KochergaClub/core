import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ImportersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ImportersQuery = (
  { __typename: 'Query' }
  & { importers: Array<(
    { __typename: 'Importer' }
    & Pick<Types.Importer, 'name' | 'last_dt'>
  )> }
);


export const ImportersDocument: DocumentNode<ImportersQuery, ImportersQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Importers" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "importers" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "last_dt" } }] } }] } }] });
