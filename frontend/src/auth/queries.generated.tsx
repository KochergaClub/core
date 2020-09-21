import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AuthCurrentUserFragment = (
  { __typename: 'AuthCurrentUser' }
  & Pick<Types.AuthCurrentUser, 'id' | 'is_authenticated' | 'is_staff' | 'permissions' | 'email'>
);

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename: 'Query' }
  & { my: (
    { __typename: 'My' }
    & { user: (
      { __typename: 'AuthCurrentUser' }
      & AuthCurrentUserFragment
    ) }
  ) }
);

export type LoginMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type LoginMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'AuthLoginResult' }
    & Pick<Types.AuthLoginResult, 'error'>
    & { user?: Types.Maybe<(
      { __typename: 'AuthCurrentUser' }
      & AuthCurrentUserFragment
    )> }
  ) }
);

export type TokenLoginMutationVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;


export type TokenLoginMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'AuthLoginResult' }
    & Pick<Types.AuthLoginResult, 'error'>
    & { user?: Types.Maybe<(
      { __typename: 'AuthCurrentUser' }
      & AuthCurrentUserFragment
    )> }
  ) }
);

export type SendMagicLinkMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  next?: Types.Maybe<Types.Scalars['String']>;
}>;


export type SendMagicLinkMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'AuthSendMagicLinkResult' }
    & Pick<Types.AuthSendMagicLinkResult, 'ok' | 'error'>
  ) }
);

export const AuthCurrentUserFragmentDoc: DocumentNode<AuthCurrentUserFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AuthCurrentUser"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthCurrentUser"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"is_authenticated"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"is_staff"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"permissions"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"email"},"arguments":[],"directives":[]}]}}]};
export const CurrentUserDocument: DocumentNode<CurrentUserQuery, CurrentUserQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "CurrentUser" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "my" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "user" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "AuthCurrentUser" }, "directives": [] }] } }] } }] } }, ...AuthCurrentUserFragmentDoc.definitions] });

export const LoginDocument: DocumentNode<LoginMutation, LoginMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "Login" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "password" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "authLogin" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "credentials" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "email" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "password" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "password" } } }] } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "result" }, "value": { "kind": "StringValue", "value": "cookie", "block": false } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "error" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "user" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "AuthCurrentUser" }, "directives": [] }] } }] } }] } }, ...AuthCurrentUserFragmentDoc.definitions] });

export const TokenLoginDocument: DocumentNode<TokenLoginMutation, TokenLoginMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "TokenLogin" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "token" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "authLogin" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "credentials" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "token" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "token" } } }] } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "result" }, "value": { "kind": "StringValue", "value": "cookie", "block": false } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "error" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "user" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "AuthCurrentUser" }, "directives": [] }] } }] } }] } }, ...AuthCurrentUserFragmentDoc.definitions] });

export const SendMagicLinkDocument: DocumentNode<SendMagicLinkMutation, SendMagicLinkMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "SendMagicLink" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "next" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "authSendMagicLink" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "email" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } } }, { "kind": "ObjectField", "name": { "kind": "Name", "value": "next" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "next" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "error" }, "arguments": [], "directives": [] }] } }] } }] });
