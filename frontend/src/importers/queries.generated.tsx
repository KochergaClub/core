import * as Types from '../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ImportersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type ImportersQuery = (
  { __typename: 'Query' }
  & { importers: Array<(
    { __typename: 'Importer' }
    & Pick<Types.Importer, 'name'>
  )> }
);


export const ImportersDocument: DocumentNode<ImportersQuery, ImportersQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Importers"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"importers"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}}]};