import * as Types from '../apollo/types.generated';

import { ValidationErrorFragment, GenericErrorFragment } from '../apollo/common-fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { ValidationErrorFragmentDoc, GenericErrorFragmentDoc } from '../apollo/common-fragments.generated';
export type TelegramChatFragment = (
  { __typename: 'TelegramChat' }
  & Pick<Types.TelegramChat, 'id' | 'username' | 'link' | 'title'>
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

export type TelegramChatsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type TelegramChatsQuery = (
  { __typename: 'Query' }
  & { telegramChats: Array<(
    { __typename: 'TelegramChat' }
    & TelegramChatFragment
  )> }
);

export type CreateTelegramChatMutationVariables = Types.Exact<{
  input: Types.CreateTelegramChatInput;
}>;


export type CreateTelegramChatMutation = (
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

export type CreateTelegramChatByInviteLinkMutationVariables = Types.Exact<{
  input: Types.CreateTelegramChatByInviteLinkInput;
}>;


export type CreateTelegramChatByInviteLinkMutation = (
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

export const TelegramChatFragmentDoc: DocumentNode<TelegramChatFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"TelegramChat"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"TelegramChat"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"username"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"photo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-50x50","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]}]}},{"kind":"Field","alias":{"kind":"Name","value":"photo_x2"},"name":{"kind":"Name","value":"photo"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-100x100","block":false}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"project"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"meta"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"slug"},"arguments":[],"directives":[]}]}}]}}]}}]};
export const TelegramChatsDocument: DocumentNode<TelegramChatsQuery, TelegramChatsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "TelegramChats" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "telegramChats" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TelegramChat" }, "directives": [] }] } }] } }, ...TelegramChatFragmentDoc.definitions] });

export const CreateTelegramChatDocument: DocumentNode<CreateTelegramChatMutation, CreateTelegramChatMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateTelegramChat" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateTelegramChatInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "createTelegramChat" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TelegramChat" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" }, "directives": [] }] } }] } }, ...TelegramChatFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions] });

export const CreateTelegramChatByInviteLinkDocument: DocumentNode<CreateTelegramChatByInviteLinkMutation, CreateTelegramChatByInviteLinkMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateTelegramChatByInviteLink" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateTelegramChatByInviteLinkInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "createTelegramChatByInviteLink" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TelegramChat" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" }, "directives": [] }] } }] } }, ...TelegramChatFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions] });

export const DeleteTelegramChatDocument: DocumentNode<DeleteTelegramChatMutation, DeleteTelegramChatMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteTelegramChat" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "deleteTelegramChat" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "BasicResult" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] } }] });

export const RefreshTelegramChatDataDocument: DocumentNode<RefreshTelegramChatDataMutation, RefreshTelegramChatDataMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RefreshTelegramChatData" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "refreshTelegramChatData" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "TelegramChat" }, "directives": [] }] } }] } }, ...TelegramChatFragmentDoc.definitions] });
