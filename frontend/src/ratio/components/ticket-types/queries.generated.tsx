import * as Types from '../../../apollo/types.generated';

import { RatioTicketTypeFragment } from '../../queries.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { RatioTicketTypeFragmentDoc } from '../../queries.generated';
export type CreateRatioTicketTypeMutationVariables = Types.Exact<{
  input: Types.CreateRatioTicketTypeInput;
}>;


export type CreateRatioTicketTypeMutation = (
  { __typename: 'Mutation' }
  & { createRatioTicketType: (
    { __typename: 'RatioTicketType' }
    & RatioTicketTypeFragment
  ) }
);

export type UpdateRatioTicketTypeMutationVariables = Types.Exact<{
  input: Types.UpdateRatioTicketTypeInput;
}>;


export type UpdateRatioTicketTypeMutation = (
  { __typename: 'Mutation' }
  & { updateRatioTicketType: (
    { __typename: 'RatioTicketType' }
    & RatioTicketTypeFragment
  ) }
);

export type DeleteRatioTicketTypeMutationVariables = Types.Exact<{
  input: Types.DeleteRatioTicketTypeInput;
}>;


export type DeleteRatioTicketTypeMutation = (
  { __typename: 'Mutation' }
  & { deleteRatioTicketType: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);


export const CreateRatioTicketTypeDocument: DocumentNode<CreateRatioTicketTypeMutation, CreateRatioTicketTypeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateRatioTicketType" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateRatioTicketTypeInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createRatioTicketType" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicketType" }, "directives": [] }] } }] } }, ...RatioTicketTypeFragmentDoc.definitions] });

export const UpdateRatioTicketTypeDocument: DocumentNode<UpdateRatioTicketTypeMutation, UpdateRatioTicketTypeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateRatioTicketType" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UpdateRatioTicketTypeInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "updateRatioTicketType" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicketType" }, "directives": [] }] } }] } }, ...RatioTicketTypeFragmentDoc.definitions] });

export const DeleteRatioTicketTypeDocument: DocumentNode<DeleteRatioTicketTypeMutation, DeleteRatioTicketTypeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteRatioTicketType" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "DeleteRatioTicketTypeInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deleteRatioTicketType" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });
