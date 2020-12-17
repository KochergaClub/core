import * as Types from '../apollo/types.generated';

import { GenericErrorFragment, ValidationErrorFragment } from '../apollo/common-fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../apollo/common-fragments.generated';
export type AdminTildaPageFragment = (
  { __typename: 'TildaPage' }
  & Pick<Types.TildaPage, 'id' | 'page_id' | 'title' | 'description' | 'path' | 'imported_dt'>
);

export type TildaPagesForAdminQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TildaPagesForAdminQuery = (
  { __typename: 'Query' }
  & { tildaPages: Array<(
    { __typename: 'TildaPage' }
    & AdminTildaPageFragment
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

export type ImportTildaPageMutationVariables = Types.Exact<{
  input: Types.ImportTildaPageInput;
}>;


export type ImportTildaPageMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'TildaPage' }
    & AdminTildaPageFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);

export type RemoveTildaPageMutationVariables = Types.Exact<{
  input: Types.RemoveTildaPageInput;
}>;


export type RemoveTildaPageMutation = (
  { __typename: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  )> }
);

export const AdminTildaPageFragmentDoc: DocumentNode<AdminTildaPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AdminTildaPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TildaPage"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"page_id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"path"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"imported_dt"},"arguments":[],"directives":[]}]}}]};
export const TildaPagesForAdminDocument: DocumentNode<TildaPagesForAdminQuery, TildaPagesForAdminQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "TildaPagesForAdmin" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tildaPages" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "AdminTildaPage" }, "directives": [] }] } }] } }, ...AdminTildaPageFragmentDoc.definitions] });

export const TildaImportAllDocument: DocumentNode<TildaImportAllMutation, TildaImportAllMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "TildaImportAll" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "tildaImportAll" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });

export const ImportTildaPageDocument: DocumentNode<ImportTildaPageMutation, ImportTildaPageMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "ImportTildaPage" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ImportTildaPageInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "importTildaPage" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "AdminTildaPage" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" }, "directives": [] }] } }] } }, ...AdminTildaPageFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions] });

export const RemoveTildaPageDocument: DocumentNode<RemoveTildaPageMutation, RemoveTildaPageMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RemoveTildaPage" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RemoveTildaPageInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "removeTildaPage" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });
