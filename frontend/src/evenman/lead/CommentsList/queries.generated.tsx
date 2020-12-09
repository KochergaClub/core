import * as Types from '../../../apollo/types.generated';

import { UserFragment } from '../../../components/UserLink/fragments.generated';
import { GenericErrorFragment, ValidationErrorFragment } from '../../../apollo/common-fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { UserFragmentDoc } from '../../../components/UserLink/fragments.generated';
import { GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../../../apollo/common-fragments.generated';
export type CommentFragment = (
  { __typename: 'Comment' }
  & Pick<Types.Comment, 'id' | 'text' | 'created'>
  & { author: (
    { __typename: 'AuthUser' }
    & UserFragment
  ) }
);

export type CommentableFragment = (
  { __typename: 'CommunityLead' }
  & Pick<Types.CommunityLead, 'comments_count'>
  & { comments: Array<(
    { __typename: 'Comment' }
    & CommentFragment
  )> }
);

export type DeleteCommentMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteCommentMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);

export type EditCommentMutationVariables = Types.Exact<{
  input: Types.EditCommentInput;
}>;


export type EditCommentMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'Comment' }
    & CommentFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);

export const CommentFragmentDoc: DocumentNode<CommentFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"text"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"created"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"author"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"},"directives":[]}]}}]}},...UserFragmentDoc.definitions]};
export const CommentableFragmentDoc: DocumentNode<CommentableFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Commentable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commentable"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments_count"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"comments"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"},"directives":[]}]}}]}},...CommentFragmentDoc.definitions]};
export const DeleteCommentDocument: DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteComment" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "deleteComment" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "BasicResult" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" }, "directives": [] }] } }] } }, ...GenericErrorFragmentDoc.definitions] });

export const EditCommentDocument: DocumentNode<EditCommentMutation, EditCommentMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EditComment" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "EditCommentInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "editComment" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Comment" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" }, "directives": [] }] } }] } }, ...CommentFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions] });
