import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type StaffMemberFullFragment = (
  { __typename: 'StaffMember' }
  & Pick<Types.StaffMember, 'id' | 'full_name' | 'short_name' | 'role' | 'color' | 'is_current' | 'vk'>
  & { slack_user?: Types.Maybe<(
    { __typename: 'SlackUser' }
    & Pick<Types.SlackUser, 'slack_id' | 'image_url'>
  )>, user: (
    { __typename: 'AuthUser' }
    & Pick<Types.AuthUser, 'id' | 'email'>
  ) }
);

export type StaffMemberExternalAccountsFragment = (
  { __typename: 'StaffMember' }
  & Pick<Types.StaffMember, 'id'>
  & { user: (
    { __typename: 'AuthUser' }
    & Pick<Types.AuthUser, 'id'>
    & { external_accounts: Array<(
      { __typename: 'SlackAccount' }
      & { service: (
        { __typename: 'SlackExternalService' }
        & Pick<Types.SlackExternalService, 'slug'>
      ) }
    ) | (
      { __typename: 'WikiAccount' }
      & { service: (
        { __typename: 'WikiExternalService' }
        & Pick<Types.WikiExternalService, 'slug'>
      ) }
    )> }
  ) }
);

export type StaffMemberForListFragment = (
  { __typename: 'StaffMember' }
  & Pick<Types.StaffMember, 'id' | 'full_name' | 'is_current' | 'role'>
);

export type StaffMemberForPickerFragment = (
  { __typename: 'StaffMember' }
  & Pick<Types.StaffMember, 'id' | 'full_name' | 'short_name' | 'is_current' | 'color'>
  & { user: (
    { __typename: 'AuthUser' }
    & Pick<Types.AuthUser, 'id'>
  ) }
);

export type StaffMembersQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StaffMembersQuery = (
  { __typename: 'Query' }
  & { staffMembersAll: Array<(
    { __typename: 'StaffMember' }
    & StaffMemberForListFragment
  )> }
);

export type StaffMembersForPickerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type StaffMembersForPickerQuery = (
  { __typename: 'Query' }
  & { members: Array<(
    { __typename: 'StaffMember' }
    & StaffMemberForPickerFragment
  )> }
);

export type StaffMemberQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type StaffMemberQuery = (
  { __typename: 'Query' }
  & { staffMember: (
    { __typename: 'StaffMember' }
    & StaffMemberFullFragment
  ) }
);

export type StaffMemberExternalAccountsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type StaffMemberExternalAccountsQuery = (
  { __typename: 'Query' }
  & { staffMember: (
    { __typename: 'StaffMember' }
    & StaffMemberExternalAccountsFragment
  ) }
);

export type StaffGrantGooglePermissionsToMemberMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type StaffGrantGooglePermissionsToMemberMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'staffGrantGooglePermissionsToMember'>
);

export type StaffFireMemberMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type StaffFireMemberMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'staffFireMember'>
);

export type StaffUnfireMemberMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type StaffUnfireMemberMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'staffUnfireMember'>
);

export const StaffMemberFullFragmentDoc: DocumentNode<StaffMemberFullFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StaffMemberFull"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StaffMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"short_name"}},{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"color"}},{"kind":"Field","name":{"kind":"Name","value":"is_current"}},{"kind":"Field","name":{"kind":"Name","value":"slack_user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slack_id"}},{"kind":"Field","name":{"kind":"Name","value":"image_url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"vk"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]};
export const StaffMemberExternalAccountsFragmentDoc: DocumentNode<StaffMemberExternalAccountsFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StaffMemberExternalAccounts"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StaffMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"external_accounts"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"service"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]}}]};
export const StaffMemberForListFragmentDoc: DocumentNode<StaffMemberForListFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StaffMemberForList"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StaffMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"is_current"}},{"kind":"Field","name":{"kind":"Name","value":"role"}}]}}]};
export const StaffMemberForPickerFragmentDoc: DocumentNode<StaffMemberForPickerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StaffMemberForPicker"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"StaffMember"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"short_name"}},{"kind":"Field","name":{"kind":"Name","value":"is_current"}},{"kind":"Field","name":{"kind":"Name","value":"color"}}]}}]};
export const StaffMembersDocument: DocumentNode<StaffMembersQuery, StaffMembersQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "StaffMembers" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "staffMembersAll" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "StaffMemberForList" } }] } }] } }, ...StaffMemberForListFragmentDoc.definitions] });

export const StaffMembersForPickerDocument: DocumentNode<StaffMembersForPickerQuery, StaffMembersForPickerQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "StaffMembersForPicker" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "members" }, "name": { "kind": "Name", "value": "staffMembersAll" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "StaffMemberForPicker" } }] } }] } }, ...StaffMemberForPickerFragmentDoc.definitions] });

export const StaffMemberDocument: DocumentNode<StaffMemberQuery, StaffMemberQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "StaffMember" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "staffMember" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "StaffMemberFull" } }] } }] } }, ...StaffMemberFullFragmentDoc.definitions] });

export const StaffMemberExternalAccountsDocument: DocumentNode<StaffMemberExternalAccountsQuery, StaffMemberExternalAccountsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "StaffMemberExternalAccounts" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "staffMember" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "StaffMemberExternalAccounts" } }] } }] } }, ...StaffMemberExternalAccountsFragmentDoc.definitions] });

export const StaffGrantGooglePermissionsToMemberDocument: DocumentNode<StaffGrantGooglePermissionsToMemberMutation, StaffGrantGooglePermissionsToMemberMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "StaffGrantGooglePermissionsToMember" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "staffGrantGooglePermissionsToMember" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] }] } }] });

export const StaffFireMemberDocument: DocumentNode<StaffFireMemberMutation, StaffFireMemberMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "StaffFireMember" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "staffFireMember" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] }] } }] });

export const StaffUnfireMemberDocument: DocumentNode<StaffUnfireMemberMutation, StaffUnfireMemberMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "StaffUnfireMember" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "staffUnfireMember" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] }] } }] });
