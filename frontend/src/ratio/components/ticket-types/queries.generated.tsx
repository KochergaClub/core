import * as Types from '../../../apollo/types.generated';

import { RatioTicketTypeFragment, RatioTicketTypePromocodesFragment, RatioPromocodeFragment } from '../../queries.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { RatioTicketTypeFragmentDoc, RatioTicketTypePromocodesFragmentDoc, RatioPromocodeFragmentDoc } from '../../queries.generated';
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

export type CreateRatioPromocodeMutationVariables = Types.Exact<{
  input: Types.CreateRatioPromocodeInput;
}>;


export type CreateRatioPromocodeMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'RatioPromocode' }
    & RatioPromocodeFragment
  ) | (
    { __typename: 'ValidationError' }
    & { errors: Array<(
      { __typename: 'ValidationErrorItem' }
      & Pick<Types.ValidationErrorItem, 'name' | 'messages'>
    )> }
  ) | (
    { __typename: 'GenericError' }
    & Pick<Types.GenericError, 'message'>
  ) }
);

export type RatioPromocodesPageQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  ticket_type_id: Types.Scalars['ID'];
}>;


export type RatioPromocodesPageQuery = (
  { __typename: 'Query' }
  & { ratioTicketType: (
    { __typename: 'RatioTicketType' }
    & Pick<Types.RatioTicketType, 'id'>
    & { promocodes: (
      { __typename: 'RatioPromocodeConnection' }
      & RatioTicketTypePromocodesFragment
    ) }
  ) }
);

export type SendUniqueRatioPromocodeMutationVariables = Types.Exact<{
  input: Types.SendUniqueRatioPromocodeInput;
}>;


export type SendUniqueRatioPromocodeMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);


export const CreateRatioTicketTypeDocument: DocumentNode<CreateRatioTicketTypeMutation, CreateRatioTicketTypeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateRatioTicketType" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateRatioTicketTypeInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "createRatioTicketType" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicketType" }, "directives": [] }] } }] } }, ...RatioTicketTypeFragmentDoc.definitions] });

export const UpdateRatioTicketTypeDocument: DocumentNode<UpdateRatioTicketTypeMutation, UpdateRatioTicketTypeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateRatioTicketType" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UpdateRatioTicketTypeInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "updateRatioTicketType" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicketType" }, "directives": [] }] } }] } }, ...RatioTicketTypeFragmentDoc.definitions] });

export const DeleteRatioTicketTypeDocument: DocumentNode<DeleteRatioTicketTypeMutation, DeleteRatioTicketTypeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteRatioTicketType" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "DeleteRatioTicketTypeInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deleteRatioTicketType" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });

export const CreateRatioPromocodeDocument: DocumentNode<CreateRatioPromocodeMutation, CreateRatioPromocodeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateRatioPromocode" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateRatioPromocodeInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "createRatioPromocode" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioPromocode" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioPromocode" }, "directives": [] }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "GenericError" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "message" }, "arguments": [], "directives": [] }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ValidationError" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "errors" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "messages" }, "arguments": [], "directives": [] }] } }] } }] } }] } }, ...RatioPromocodeFragmentDoc.definitions] });

export const RatioPromocodesPageDocument: DocumentNode<RatioPromocodesPageQuery, RatioPromocodesPageQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioPromocodesPage" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "ticket_type_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ratioTicketType" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "ticket_type_id" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "promocodes" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicketTypePromocodes" }, "directives": [] }] } }] } }] } }, ...RatioTicketTypePromocodesFragmentDoc.definitions] });

export const SendUniqueRatioPromocodeDocument: DocumentNode<SendUniqueRatioPromocodeMutation, SendUniqueRatioPromocodeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "SendUniqueRatioPromocode" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "SendUniqueRatioPromocodeInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "sendUniqueRatioPromocode" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });
