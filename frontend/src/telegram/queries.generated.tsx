import * as Types from '../apollo/types.generated';

import { ValidationErrorFragment, GenericErrorFragment } from '../apollo/common-fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { ValidationErrorFragmentDoc, GenericErrorFragmentDoc } from '../apollo/common-fragments.generated';
export type TelegramChatFragment = (
  { __typename: 'TelegramChat' }
  & Pick<Types.TelegramChat, 'id' | 'username' | 'link' | 'title' | 'force_public' | 'delisted'>
  & { photo?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )>, photo_x2?: Types.Maybe<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )>, project?: Types.Maybe<(
    { __typename: 'ProjectPage' }
    & Pick<Types.ProjectPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'slug'>
    ) }
  )> }
);

export type PublicTelegramChatsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type PublicTelegramChatsQuery = (
  { __typename: 'Query' }
  & { chats: Array<(
    { __typename: 'TelegramChat' }
    & TelegramChatFragment
  )> }
);

export type AllTelegramChatsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AllTelegramChatsQuery = (
  { __typename: 'Query' }
  & { chats: Array<(
    { __typename: 'TelegramChat' }
    & TelegramChatFragment
  )> }
);

export type AddTelegramChatMutationVariables = Types.Exact<{
  input: Types.AddTelegramChatInput;
}>;


export type AddTelegramChatMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'TelegramChat' }
    & TelegramChatFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);

export type AddTelegramChatByInviteLinkMutationVariables = Types.Exact<{
  input: Types.AddTelegramChatByInviteLinkInput;
}>;


export type AddTelegramChatByInviteLinkMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'TelegramChat' }
    & TelegramChatFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);

export type UpdateTelegramChatMutationVariables = Types.Exact<{
  input: Types.UpdateTelegramChatInput;
}>;


export type UpdateTelegramChatMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'TelegramChat' }
    & TelegramChatFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) }
);

export type DeleteTelegramChatMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteTelegramChatMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type RefreshTelegramChatDataMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type RefreshTelegramChatDataMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'TelegramChat' }
    & TelegramChatFragment
  ) }
);

export type PostToTelegramChatMutationVariables = Types.Exact<{
  input: Types.PostToTelegramChatInput;
}>;


export type PostToTelegramChatMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export const TelegramChatFragmentDoc: DocumentNode<TelegramChatFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TelegramChat"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TelegramChat"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"force_public"}},{"kind":"Field","name":{"kind":"Name","value":"delisted"}},{"kind":"Field","name":{"kind":"Name","value":"photo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-50x50","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"photo_x2"},"name":{"kind":"Name","value":"photo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-100x100","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"}}]}}]}}]}}]};
export const PublicTelegramChatsDocument: DocumentNode<PublicTelegramChatsQuery, PublicTelegramChatsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "PublicTelegramChats" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "chats" }, "name": { "kind": "Name", "value": "publicTelegramChats" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TelegramChat" } }] } }] } }, ...TelegramChatFragmentDoc.definitions] });

export const AllTelegramChatsDocument: DocumentNode<AllTelegramChatsQuery, AllTelegramChatsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "AllTelegramChats" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "chats" }, "name": { "kind": "Name", "value": "allTelegramChats" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TelegramChat" } }] } }] } }, ...TelegramChatFragmentDoc.definitions] });

export const AddTelegramChatDocument: DocumentNode<AddTelegramChatMutation, AddTelegramChatMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AddTelegramChat" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "AddTelegramChatInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "addTelegramChat" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TelegramChat" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" } }] } }] } }, ...TelegramChatFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions] });

export const AddTelegramChatByInviteLinkDocument: DocumentNode<AddTelegramChatByInviteLinkMutation, AddTelegramChatByInviteLinkMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AddTelegramChatByInviteLink" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "AddTelegramChatByInviteLinkInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "addTelegramChatByInviteLink" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TelegramChat" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" } }] } }] } }, ...TelegramChatFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions] });

export const UpdateTelegramChatDocument: DocumentNode<UpdateTelegramChatMutation, UpdateTelegramChatMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateTelegramChat" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UpdateTelegramChatInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "updateTelegramChat" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TelegramChat" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" } }] } }] } }, ...TelegramChatFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions] });

export const DeleteTelegramChatDocument: DocumentNode<DeleteTelegramChatMutation, DeleteTelegramChatMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteTelegramChat" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "deleteTelegramChat" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "BasicResult" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }] } }] } }] } }] });

export const RefreshTelegramChatDataDocument: DocumentNode<RefreshTelegramChatDataMutation, RefreshTelegramChatDataMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RefreshTelegramChatData" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "refreshTelegramChatData" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TelegramChat" } }] } }] } }, ...TelegramChatFragmentDoc.definitions] });

export const PostToTelegramChatDocument: DocumentNode<PostToTelegramChatMutation, PostToTelegramChatMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "PostToTelegramChat" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "PostToTelegramChatInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "postToTelegramChat" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "BasicResult" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }] } }] } }] } }] });
