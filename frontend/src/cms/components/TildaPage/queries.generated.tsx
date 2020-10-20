import * as Types from '../../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type RatioCreateOrderMutationVariables = Types.Exact<{
  input: Types.RatioCreateOrderInput;
}>;


export type RatioCreateOrderMutation = (
  { __typename: 'Mutation' }
  & { ratioCreateOrder: (
    { __typename: 'RatioCreateOrderResult' }
    & { order: (
      { __typename: 'RatioOrder' }
      & Pick<Types.RatioOrder, 'confirmation_token'>
    ) }
  ) }
);


export const RatioCreateOrderDocument: DocumentNode<RatioCreateOrderMutation, RatioCreateOrderMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RatioCreateOrder" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioCreateOrderInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ratioCreateOrder" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "order" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "confirmation_token" }, "arguments": [], "directives": [] }] } }] } }] } }] });
