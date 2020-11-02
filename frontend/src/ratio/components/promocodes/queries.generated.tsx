import * as Types from '../../../apollo/types.generated';

import { RatioPromocodeFragment } from '../../queries.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { RatioPromocodeFragmentDoc } from '../../queries.generated';
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

export type SendUniqueRatioPromocodeMutationVariables = Types.Exact<{
  input: Types.SendUniqueRatioPromocodeInput;
}>;


export type SendUniqueRatioPromocodeMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) | (
    { __typename: 'GenericError' }
    & Pick<Types.GenericError, 'message'>
  ) }
);


export const CreateRatioPromocodeDocument: DocumentNode<CreateRatioPromocodeMutation, CreateRatioPromocodeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateRatioPromocode" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateRatioPromocodeInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "createRatioPromocode" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioPromocode" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioPromocode" }, "directives": [] }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "GenericError" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "message" }, "arguments": [], "directives": [] }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ValidationError" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "errors" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "messages" }, "arguments": [], "directives": [] }] } }] } }] } }] } }, ...RatioPromocodeFragmentDoc.definitions] });

export const SendUniqueRatioPromocodeDocument: DocumentNode<SendUniqueRatioPromocodeMutation, SendUniqueRatioPromocodeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "SendUniqueRatioPromocode" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "SendUniqueRatioPromocodeInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "sendUniqueRatioPromocode" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "BasicResult" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "GenericError" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "message" }, "arguments": [], "directives": [] }] } }] } }] } }] });
