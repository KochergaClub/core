import * as Types from '../../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type UserForPickerFragment = (
  { __typename: 'AuthUser' }
  & Pick<Types.AuthUser, 'id' | 'email'>
);

export type SearchUsersForPickerQueryVariables = Types.Exact<{
  input: Types.SearchUsersInput;
}>;


export type SearchUsersForPickerQuery = (
  { __typename: 'Query' }
  & { searchUsers: (
    { __typename: 'SearchUsersResult' }
    & { results: Array<(
      { __typename: 'AuthUser' }
      & UserForPickerFragment
    )> }
  ) }
);

export const UserForPickerFragmentDoc: DocumentNode<UserForPickerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserForPicker"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]};
export const SearchUsersForPickerDocument: DocumentNode<SearchUsersForPickerQuery, SearchUsersForPickerQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "SearchUsersForPicker" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "SearchUsersInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "searchUsers" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "results" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "UserForPicker" } }] } }] } }] } }, ...UserForPickerFragmentDoc.definitions] });
