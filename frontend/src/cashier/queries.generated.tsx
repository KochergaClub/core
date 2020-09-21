import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PaymentFragment = (
  { __typename: 'CashierPayment' }
  & Pick<Types.CashierPayment, 'id' | 'amount' | 'comment' | 'is_redeemed' | 'created_dt' | 'redeem_dt'>
  & { whom: (
    { __typename: 'AuthUser' }
    & Pick<Types.AuthUser, 'id' | 'email'>
    & { staff_member?: Types.Maybe<(
      { __typename: 'StaffMember' }
      & Pick<Types.StaffMember, 'id' | 'full_name'>
    )> }
  ) }
);

export type CashierPaymentsQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type CashierPaymentsQuery = (
  { __typename: 'Query' }
  & { payments: (
    { __typename: 'CashierPaymentConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ), edges: Array<(
      { __typename: 'CashierPaymentEdge' }
      & { node: (
        { __typename: 'CashierPayment' }
        & PaymentFragment
      ) }
    )> }
  ) }
);

export type CashierCreatePaymentMutationVariables = Types.Exact<{
  params: Types.CashierCreatePaymentInput;
}>;


export type CashierCreatePaymentMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'cashierCreatePayment'>
);

export type CashierRedeemPaymentMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type CashierRedeemPaymentMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'cashierRedeemPayment'>
);

export const PaymentFragmentDoc: DocumentNode<PaymentFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Payment"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CashierPayment"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"amount"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"whom"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"email"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"staff_member"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"full_name"},"arguments":[],"directives":[]}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"comment"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"is_redeemed"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"created_dt"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"redeem_dt"},"arguments":[],"directives":[]}]}}]};
export const CashierPaymentsDocument: DocumentNode<CashierPaymentsQuery, CashierPaymentsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "CashierPayments" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "payments" }, "name": { "kind": "Name", "value": "cashierPayments" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "hasNextPage" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "hasPreviousPage" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "startCursor" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "endCursor" }, "arguments": [], "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Payment" }, "directives": [] }] } }] } }] } }] } }, ...PaymentFragmentDoc.definitions] });

export const CashierCreatePaymentDocument: DocumentNode<CashierCreatePaymentMutation, CashierCreatePaymentMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CashierCreatePayment" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CashierCreatePaymentInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cashierCreatePayment" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "params" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "directives": [] }] } }] });

export const CashierRedeemPaymentDocument: DocumentNode<CashierRedeemPaymentMutation, CashierRedeemPaymentMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CashierRedeemPayment" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cashierRedeemPayment" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "directives": [] }] } }] });
