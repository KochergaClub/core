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

export type AuthPermissionFragment = (
  { __typename: 'AuthPermission' }
  & Pick<Types.AuthPermission, 'id' | 'name' | 'perm'>
);

export type AuthGroup_ForCardFragment = (
  { __typename: 'AuthGroup' }
  & Pick<Types.AuthGroup, 'id' | 'name'>
  & { permissions: Array<(
    { __typename: 'AuthPermission' }
    & AuthPermissionFragment
  )>, wagtailPagePermissions: Array<(
    { __typename: 'WagtailRootPagePermission' }
    & Pick<Types.WagtailRootPagePermission, 'permission_type'>
  ) | (
    { __typename: 'WagtailSpecificPagePermission' }
    & Pick<Types.WagtailSpecificPagePermission, 'permission_type'>
    & { page: (
      { __typename: 'BlogIndexPage' }
      & Pick<Types.BlogIndexPage, 'id'>
    ) | (
      { __typename: 'BlogPostPage' }
      & Pick<Types.BlogPostPage, 'id'>
    ) | (
      { __typename: 'FaqPage' }
      & Pick<Types.FaqPage, 'id'>
    ) | (
      { __typename: 'FolderPage' }
      & Pick<Types.FolderPage, 'id'>
    ) | (
      { __typename: 'FreeFormPage' }
      & Pick<Types.FreeFormPage, 'id'>
    ) | (
      { __typename: 'PresentationPage' }
      & Pick<Types.PresentationPage, 'id'>
    ) | (
      { __typename: 'ProjectIndexPage' }
      & Pick<Types.ProjectIndexPage, 'id'>
    ) | (
      { __typename: 'ProjectPage' }
      & Pick<Types.ProjectPage, 'id'>
    ) | (
      { __typename: 'RatioNotebookIndexPage' }
      & Pick<Types.RatioNotebookIndexPage, 'id'>
    ) | (
      { __typename: 'RatioNotebookPage' }
      & Pick<Types.RatioNotebookPage, 'id'>
    ) | (
      { __typename: 'RatioPresentationIndexPage' }
      & Pick<Types.RatioPresentationIndexPage, 'id'>
    ) | (
      { __typename: 'RatioSectionIndexPage' }
      & Pick<Types.RatioSectionIndexPage, 'id'>
    ) | (
      { __typename: 'RatioSectionPage' }
      & Pick<Types.RatioSectionPage, 'id'>
    ) }
  )>, wagtailCollectionPermissions: Array<(
    { __typename: 'WagtailCollectionPermission' }
    & Pick<Types.WagtailCollectionPermission, 'id'>
    & { collection: (
      { __typename: 'WagtailCollection' }
      & Pick<Types.WagtailCollection, 'id' | 'name'>
    ), permission: (
      { __typename: 'AuthPermission' }
      & AuthPermissionFragment
    ) }
  )>, users: Array<(
    { __typename: 'AuthUser' }
    & MaybeStaffUserFragment
  )> }
);

export type AuthGroupsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AuthGroupsQuery = (
  { __typename: 'Query' }
  & { groups: Array<(
    { __typename: 'AuthGroup' }
    & AuthGroup_ForCardFragment
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

export type AuthPermissionsWithUsersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AuthPermissionsWithUsersQuery = (
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

export type AddPermissionToAuthGroupMutationVariables = Types.Exact<{
  group_id: Types.Scalars['ID'];
  perm: Types.Scalars['String'];
}>;


export type AddPermissionToAuthGroupMutation = (
  { __typename: 'Mutation' }
  & { addPermissionToAuthGroup: (
    { __typename: 'AuthGroup' }
    & Pick<Types.AuthGroup, 'id'>
    & { permissions: Array<(
      { __typename: 'AuthPermission' }
      & AuthPermissionFragment
    )> }
  ) }
);

export type RemovePermissionFromAuthGroupMutationVariables = Types.Exact<{
  group_id: Types.Scalars['ID'];
  perm: Types.Scalars['String'];
}>;


export type RemovePermissionFromAuthGroupMutation = (
  { __typename: 'Mutation' }
  & { removePermissionFromAuthGroup: (
    { __typename: 'AuthGroup' }
    & Pick<Types.AuthGroup, 'id'>
    & { permissions: Array<(
      { __typename: 'AuthPermission' }
      & AuthPermissionFragment
    )> }
  ) }
);

export type AuthPermissionsForPickerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AuthPermissionsForPickerQuery = (
  { __typename: 'Query' }
  & { permissions: Array<(
    { __typename: 'AuthPermission' }
    & Pick<Types.AuthPermission, 'id' | 'name' | 'perm'>
  )> }
);

export const AuthPermissionFragmentDoc: DocumentNode<AuthPermissionFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthPermission"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthPermission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"perm"}}]}}]};
export const MaybeStaffUserFragmentDoc: DocumentNode<MaybeStaffUserFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MaybeStaffUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthUser"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"staff_member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}}]}}]}}]};
export const AuthGroup_ForCardFragmentDoc: DocumentNode<AuthGroup_ForCardFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthGroup_ForCard"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthGroup"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthPermission"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wagtailPagePermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailSpecificPagePermission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permission_type"}},{"kind":"Field","name":{"kind":"Name","value":"page"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailRootPagePermission"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"permission_type"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"wagtailCollectionPermissions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"permission"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AuthPermission"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MaybeStaffUser"}}]}}]}},...AuthPermissionFragmentDoc.definitions,...MaybeStaffUserFragmentDoc.definitions]};
export const AuthGroupsDocument: DocumentNode<AuthGroupsQuery, AuthGroupsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "AuthGroups" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "groups" }, "name": { "kind": "Name", "value": "authGroupsAll" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "AuthGroup_ForCard" } }] } }] } }, ...AuthGroup_ForCardFragmentDoc.definitions] });

export const AuthAddUserToGroupDocument: DocumentNode<AuthAddUserToGroupMutation, AuthAddUserToGroupMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AuthAddUserToGroup" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "user_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "group_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "authAddUserToGroup" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "user_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "user_id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "group_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "group_id" } } }] }] } }] });

export const AuthRemoveUserFromGroupDocument: DocumentNode<AuthRemoveUserFromGroupMutation, AuthRemoveUserFromGroupMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AuthRemoveUserFromGroup" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "user_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "group_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "authRemoveUserFromGroup" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "user_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "user_id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "group_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "group_id" } } }] }] } }] });

export const AuthPermissionsWithUsersDocument: DocumentNode<AuthPermissionsWithUsersQuery, AuthPermissionsWithUsersQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "AuthPermissionsWithUsers" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "permissions" }, "name": { "kind": "Name", "value": "authPermissionsAll" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "users" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "MaybeStaffUser" } }] } }] } }] } }, ...MaybeStaffUserFragmentDoc.definitions] });

export const CreateAuthGroupDocument: DocumentNode<CreateAuthGroupMutation, CreateAuthGroupMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateAuthGroup" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createAuthGroup" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "name" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }] } }] } }] });

export const DeleteAuthGroupDocument: DocumentNode<DeleteAuthGroupMutation, DeleteAuthGroupMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteAuthGroup" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deleteAuthGroup" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }] } }] } }] });

export const AddPermissionToAuthGroupDocument: DocumentNode<AddPermissionToAuthGroupMutation, AddPermissionToAuthGroupMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AddPermissionToAuthGroup" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "group_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "perm" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "addPermissionToAuthGroup" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "group_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "group_id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "perm" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "perm" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "permissions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "AuthPermission" } }] } }] } }] } }, ...AuthPermissionFragmentDoc.definitions] });

export const RemovePermissionFromAuthGroupDocument: DocumentNode<RemovePermissionFromAuthGroupMutation, RemovePermissionFromAuthGroupMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RemovePermissionFromAuthGroup" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "group_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "perm" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "removePermissionFromAuthGroup" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "group_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "group_id" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "perm" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "perm" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "permissions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "AuthPermission" } }] } }] } }] } }, ...AuthPermissionFragmentDoc.definitions] });

export const AuthPermissionsForPickerDocument: DocumentNode<AuthPermissionsForPickerQuery, AuthPermissionsForPickerQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "AuthPermissionsForPicker" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "permissions" }, "name": { "kind": "Name", "value": "authPermissionsAll" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "perm" } }] } }] } }] });
