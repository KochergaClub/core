import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type MailchimpInterestFragment = (
  { __typename: 'EmailMailchimpInterest' }
  & Pick<Types.EmailMailchimpInterest, 'id' | 'name'>
);

export type SubscribeChannelFragment = (
  { __typename: 'EmailSubscribeChannel' }
  & Pick<Types.EmailSubscribeChannel, 'id' | 'slug'>
  & { interests: Array<(
    { __typename: 'EmailMailchimpInterest' }
    & { category: (
      { __typename: 'EmailMailchimpCategory' }
      & Pick<Types.EmailMailchimpCategory, 'id' | 'title'>
    ) }
    & MailchimpInterestFragment
  )>, log: (
    { __typename: 'EmailSubscribeChannelLogConnection' }
    & { nodes: Array<(
      { __typename: 'EmailSubscribeChannelLog' }
      & Pick<Types.EmailSubscribeChannelLog, 'id' | 'dt' | 'email'>
    )> }
  ) }
);

export type MailchimpCategoryFragment = (
  { __typename: 'EmailMailchimpCategory' }
  & Pick<Types.EmailMailchimpCategory, 'id' | 'title'>
  & { interests: Array<(
    { __typename: 'EmailMailchimpInterest' }
    & MailchimpInterestFragment
  )> }
);

export type EmailSubscribeChannelsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EmailSubscribeChannelsQuery = (
  { __typename: 'Query' }
  & { subscribeChannels: Array<(
    { __typename: 'EmailSubscribeChannel' }
    & SubscribeChannelFragment
  )> }
);

export type EmailMailchimpCategoriesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type EmailMailchimpCategoriesQuery = (
  { __typename: 'Query' }
  & { mailchimpCategories: Array<(
    { __typename: 'EmailMailchimpCategory' }
    & MailchimpCategoryFragment
  )> }
);

export type EmailSubscribeChannelDeleteMutationVariables = Types.Exact<{
  slug: Types.Scalars['String'];
}>;


export type EmailSubscribeChannelDeleteMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'emailSubscribeChannelDelete'>
);

export type EmailSubscribeChannelAddEmailMutationVariables = Types.Exact<{
  slug: Types.Scalars['String'];
  email: Types.Scalars['String'];
}>;


export type EmailSubscribeChannelAddEmailMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'emailSubscribeChannelAddEmail'>
);

export type EmailSubscribeChannelCreateMutationVariables = Types.Exact<{
  params: Types.EmailSubscribeChannelCreateInput;
}>;


export type EmailSubscribeChannelCreateMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'emailSubscribeChannelCreate'>
);

export const MailchimpInterestFragmentDoc: DocumentNode<MailchimpInterestFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MailchimpInterest"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EmailMailchimpInterest"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]};
export const SubscribeChannelFragmentDoc: DocumentNode<SubscribeChannelFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SubscribeChannel"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EmailSubscribeChannel"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"interests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MailchimpInterest"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"log"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"IntValue","value":"3"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"nodes"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"dt"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}}]}}]}},...MailchimpInterestFragmentDoc.definitions]};
export const MailchimpCategoryFragmentDoc: DocumentNode<MailchimpCategoryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"MailchimpCategory"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EmailMailchimpCategory"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"interests"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"MailchimpInterest"}}]}}]}},...MailchimpInterestFragmentDoc.definitions]};
export const EmailSubscribeChannelsDocument: DocumentNode<EmailSubscribeChannelsQuery, EmailSubscribeChannelsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EmailSubscribeChannels" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "subscribeChannels" }, "name": { "kind": "Name", "value": "emailSubscribeChannelsAll" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "SubscribeChannel" } }] } }] } }, ...SubscribeChannelFragmentDoc.definitions] });

export const EmailMailchimpCategoriesDocument: DocumentNode<EmailMailchimpCategoriesQuery, EmailMailchimpCategoriesQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EmailMailchimpCategories" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "mailchimpCategories" }, "name": { "kind": "Name", "value": "emailMailchimpCategoriesAll" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "MailchimpCategory" } }] } }] } }, ...MailchimpCategoryFragmentDoc.definitions] });

export const EmailSubscribeChannelDeleteDocument: DocumentNode<EmailSubscribeChannelDeleteMutation, EmailSubscribeChannelDeleteMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EmailSubscribeChannelDelete" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "emailSubscribeChannelDelete" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "slug" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } } }] }] } }] });

export const EmailSubscribeChannelAddEmailDocument: DocumentNode<EmailSubscribeChannelAddEmailMutation, EmailSubscribeChannelAddEmailMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EmailSubscribeChannelAddEmail" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "emailSubscribeChannelAddEmail" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "slug" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "email" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "email" } } }] }] } }] });

export const EmailSubscribeChannelCreateDocument: DocumentNode<EmailSubscribeChannelCreateMutation, EmailSubscribeChannelCreateMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EmailSubscribeChannelCreate" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "EmailSubscribeChannelCreateInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "emailSubscribeChannelCreate" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }] }] } }] });
