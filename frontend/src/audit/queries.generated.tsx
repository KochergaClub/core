import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type MaybeStaffUserFragment = (
  { __typename: 'AuthUser' }
  & Pick<Types.AuthUser, 'id' | 'email'>
  & { staff_member?: Types.Maybe<(
    { __typename: 'StaffMember' }
    & Pick<Types.StaffMember, 'id' | 'full_name'>
  )> }
);

export type AuthGroupsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AuthGroupsQuery = (
  { __typename: 'Query' }
  & { groups: Array<(
    { __typename: 'AuthGroup' }
    & Pick<Types.AuthGroup, 'id' | 'name'>
    & { permissions: Array<(
      { __typename: 'AuthPermission' }
      & Pick<Types.AuthPermission, 'id' | 'name'>
    )>, users: Array<(
      { __typename: 'AuthUser' }
      & MaybeStaffUserFragment
    )> }
  )> }
);

export type AuthAddUserToGroupMutationVariables = Types.Exact<{
  user_id: Types.Scalars['ID'];
  group_id: Types.Scalars['ID'];
}>;


export type AuthAddUserToGroupMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'authAddUserToGroup'>
);

export type AuthRemoveUserFromGroupMutationVariables = Types.Exact<{
  user_id: Types.Scalars['ID'];
  group_id: Types.Scalars['ID'];
}>;


export type AuthRemoveUserFromGroupMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'authRemoveUserFromGroup'>
);

export type AuthPermissionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AuthPermissionsQuery = (
  { __typename: 'Query' }
  & { permissions: Array<(
    { __typename: 'AuthPermission' }
    & Pick<Types.AuthPermission, 'id' | 'name'>
    & { users: Array<(
      { __typename: 'AuthUser' }
      & MaybeStaffUserFragment
    )> }
  )> }
);

export type CreateAuthGroupMutationVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type CreateAuthGroupMutation = (
  { __typename: 'Mutation' }
  & { createAuthGroup: (
    { __typename: 'AuthGroup' }
    & Pick<Types.AuthGroup, 'id'>
  ) }
);

export type DeleteAuthGroupMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteAuthGroupMutation = (
  { __typename: 'Mutation' }
  & { deleteAuthGroup: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export const MaybeStaffUserFragmentDoc: DocumentNode<MaybeStaffUserFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaybeStaffUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthUser"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"email"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"staff_member"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"full_name"},"arguments":[],"directives":[]}]}}]}}]};
export const AuthGroupsDocument: DocumentNode<AuthGroupsQuery, AuthGroupsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "AuthGroups" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "groups" }, "name": { "kind": "Name", "value": "authGroupsAll" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "name" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "permissions" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "name" }, "arguments": [], "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "users" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "MaybeStaffUser" }, "directives": [] }] } }] } }] } }, ...MaybeStaffUserFragmentDoc.definitions] });

export const AuthAddUserToGroupDocument: DocumentNode<AuthAddUserToGroupMutation, AuthAddUserToGroupMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AuthAddUserToGroup" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "user_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "group_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "authAddUserToGroup" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "user_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "user_id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "group_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "group_id" } } }], "directives": [] }] } }] });

export const AuthRemoveUserFromGroupDocument: DocumentNode<AuthRemoveUserFromGroupMutation, AuthRemoveUserFromGroupMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AuthRemoveUserFromGroup" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "user_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "group_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "authRemoveUserFromGroup" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "user_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "user_id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "group_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "group_id" } } }], "directives": [] }] } }] });

export const AuthPermissionsDocument: DocumentNode<AuthPermissionsQuery, AuthPermissionsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "AuthPermissions" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "permissions" }, "name": { "kind": "Name", "value": "authPermissionsAll" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "name" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "users" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "MaybeStaffUser" }, "directives": [] }] } }] } }] } }, ...MaybeStaffUserFragmentDoc.definitions] });

export const CreateAuthGroupDocument: DocumentNode<CreateAuthGroupMutation, CreateAuthGroupMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateAuthGroup" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createAuthGroup" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "name" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }] } }] } }] });

export const DeleteAuthGroupDocument: DocumentNode<DeleteAuthGroupMutation, DeleteAuthGroupMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteAuthGroup" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deleteAuthGroup" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });
