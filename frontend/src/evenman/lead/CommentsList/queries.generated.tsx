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

export type Commentable_CommunityInitiative_Fragment = (
  { __typename: 'CommunityInitiative' }
  & Pick<Types.CommunityInitiative, 'comments_count'>
  & { comments: Array<(
    { __typename: 'Comment' }
    & CommentFragment
  )> }
);

export type Commentable_CommunityLead_Fragment = (
  { __typename: 'CommunityLead' }
  & Pick<Types.CommunityLead, 'comments_count'>
  & { comments: Array<(
    { __typename: 'Comment' }
    & CommentFragment
  )> }
);

export type CommentableFragment = Commentable_CommunityInitiative_Fragment | Commentable_CommunityLead_Fragment;

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

export const CommentFragmentDoc: DocumentNode<CommentFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Comment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Comment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"author"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}}]}},...UserFragmentDoc.definitions]};
export const CommentableFragmentDoc: DocumentNode<CommentableFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Commentable"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Commentable"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"comments_count"}},{"kind":"Field","name":{"kind":"Name","value":"comments"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Comment"}}]}}]}},...CommentFragmentDoc.definitions]};
export const DeleteCommentDocument: DocumentNode<DeleteCommentMutation, DeleteCommentMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteComment" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "deleteComment" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "BasicResult" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }] } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" } }] } }] } }, ...GenericErrorFragmentDoc.definitions] });

export const EditCommentDocument: DocumentNode<EditCommentMutation, EditCommentMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "EditComment" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "EditCommentInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "editComment" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Comment" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" } }] } }] } }, ...CommentFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions] });
