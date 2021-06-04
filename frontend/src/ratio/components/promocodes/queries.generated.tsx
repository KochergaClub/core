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


export const CreateRatioPromocodeDocument: DocumentNode<CreateRatioPromocodeMutation, CreateRatioPromocodeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateRatioPromocode" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateRatioPromocodeInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "createRatioPromocode" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioPromocode" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioPromocode" } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "GenericError" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "message" } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "ValidationError" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "errors" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "name" } }, { "kind": "Field", "name": { "kind": "Name", "value": "messages" } }] } }] } }] } }] } }, ...RatioPromocodeFragmentDoc.definitions] });

export const SendUniqueRatioPromocodeDocument: DocumentNode<SendUniqueRatioPromocodeMutation, SendUniqueRatioPromocodeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "SendUniqueRatioPromocode" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "SendUniqueRatioPromocodeInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "sendUniqueRatioPromocode" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "BasicResult" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "GenericError" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "message" } }] } }] } }] } }] });
