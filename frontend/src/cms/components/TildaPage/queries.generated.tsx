import * as Types from '../../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type RatioOrderFragment = (
  { __typename: 'RatioOrder' }
  & Pick<Types.RatioOrder, 'id' | 'confirmation_token'>
);

export type RatioCreateOrderMutationVariables = Types.Exact<{
  input: Types.RatioCreateOrderInput;
}>;


export type RatioCreateOrderMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'RatioCreateOrderResult' }
    & { order: (
      { __typename: 'RatioOrder' }
      & RatioOrderFragment
    ) }
  ) }
);

export type RatioTicketType_ForPickerFragment = (
  { __typename: 'RatioTicketType' }
  & Pick<Types.RatioTicketType, 'id' | 'price'>
);

export type RatioTicketTypesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type RatioTicketTypesQuery = (
  { __typename: 'Query' }
  & { result: Array<(
    { __typename: 'RatioTicketType' }
    & RatioTicketType_ForPickerFragment
  )> }
);

export const RatioOrderFragmentDoc: DocumentNode<RatioOrderFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioOrder"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioOrder"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"confirmation_token"},"arguments":[],"directives":[]}]}}]};
export const RatioTicketType_ForPickerFragmentDoc: DocumentNode<RatioTicketType_ForPickerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioTicketType_ForPicker"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTicketType"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"price"},"arguments":[],"directives":[]}]}}]};
export const RatioCreateOrderDocument: DocumentNode<RatioCreateOrderMutation, RatioCreateOrderMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RatioCreateOrder" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioCreateOrderInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "ratioCreateOrder" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "order" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioOrder" }, "directives": [] }] } }] } }] } }, ...RatioOrderFragmentDoc.definitions] });

export const RatioTicketTypesDocument: DocumentNode<RatioTicketTypesQuery, RatioTicketTypesQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTicketTypes" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "ratioTicketTypes" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicketType_ForPicker" }, "directives": [] }] } }] } }, ...RatioTicketType_ForPickerFragmentDoc.definitions] });
