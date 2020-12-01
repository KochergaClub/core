import * as Types from '../apollo/types.generated';

import { PageInfoFragment } from '../apollo/common-fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { PageInfoFragmentDoc } from '../apollo/common-fragments.generated';
export type CustomerFragment = (
  { __typename: 'Cm2Customer' }
  & Pick<Types.Cm2Customer, 'id' | 'first_name' | 'last_name' | 'card_id'>
);

export type OrderWithCustomerFragment = (
  { __typename: 'Cm2Order' }
  & Pick<Types.Cm2Order, 'id' | 'start' | 'end' | 'value'>
  & { customer?: Types.Maybe<(
    { __typename: 'Cm2Customer' }
    & CustomerFragment
  )> }
);

export type Cm2OrdersQueryVariables = Types.Exact<{
  status?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  before?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type Cm2OrdersQuery = (
  { __typename: 'Query' }
  & { cm2Orders: (
    { __typename: 'Cm2OrderConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<(
      { __typename: 'Cm2OrderEdge' }
      & { node: (
        { __typename: 'Cm2Order' }
        & OrderWithCustomerFragment
      ) }
    )> }
  ) }
);

export type Cm2OrderQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type Cm2OrderQuery = (
  { __typename: 'Query' }
  & { cm2Order: (
    { __typename: 'Cm2Order' }
    & OrderWithCustomerFragment
  ) }
);

export type Cm2CreateOrderMutationVariables = Types.Exact<{
  params: Types.Cm2CreateOrderInput;
}>;


export type Cm2CreateOrderMutation = (
  { __typename: 'Mutation' }
  & { cm2CreateOrder: (
    { __typename: 'Cm2Order' }
    & { customer?: Types.Maybe<(
      { __typename: 'Cm2Customer' }
      & Pick<Types.Cm2Customer, 'id'>
    )> }
  ) }
);

export type Cm2SearchCustomersQueryVariables = Types.Exact<{
  search: Types.Scalars['String'];
}>;


export type Cm2SearchCustomersQuery = (
  { __typename: 'Query' }
  & { cm2Customers: (
    { __typename: 'Cm2CustomerConnection' }
    & { edges: Array<(
      { __typename: 'Cm2CustomerEdge' }
      & { node: (
        { __typename: 'Cm2Customer' }
        & CustomerFragment
      ) }
    )> }
  ) }
);

export type Cm2CustomersQueryVariables = Types.Exact<{
  after?: Types.Maybe<Types.Scalars['String']>;
  before?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type Cm2CustomersQuery = (
  { __typename: 'Query' }
  & { cm2Customers: (
    { __typename: 'Cm2CustomerConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<(
      { __typename: 'Cm2CustomerEdge' }
      & { node: (
        { __typename: 'Cm2Customer' }
        & CustomerFragment
      ) }
    )> }
  ) }
);

export type Cm2CreateCustomerMutationVariables = Types.Exact<{
  params: Types.Cm2CreateCustomerInput;
}>;


export type Cm2CreateCustomerMutation = (
  { __typename: 'Mutation' }
  & { cm2CreateCustomer: (
    { __typename: 'Cm2Customer' }
    & Pick<Types.Cm2Customer, 'id'>
  ) }
);

export type Cm2CloseOrderMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type Cm2CloseOrderMutation = (
  { __typename: 'Mutation' }
  & Pick<Types.Mutation, 'cm2CloseOrder'>
);

export type Cm2CustomerPageQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type Cm2CustomerPageQuery = (
  { __typename: 'Query' }
  & { cm2Customer: (
    { __typename: 'Cm2Customer' }
    & { orders: (
      { __typename: 'Cm2OrderConnection' }
      & { edges: Array<(
        { __typename: 'Cm2OrderEdge' }
        & { node: (
          { __typename: 'Cm2Order' }
          & Pick<Types.Cm2Order, 'id' | 'start'>
        ) }
      )> }
    ) }
    & CustomerFragment
  ) }
);

export const CustomerFragmentDoc: DocumentNode<CustomerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Customer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cm2Customer"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"first_name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"last_name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"card_id"},"arguments":[],"directives":[]}]}}]};
export const OrderWithCustomerFragmentDoc: DocumentNode<OrderWithCustomerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"OrderWithCustomer"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Cm2Order"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"start"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"end"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"value"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"customer"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Customer"},"directives":[]}]}}]}},...CustomerFragmentDoc.definitions]};
export const Cm2OrdersDocument: DocumentNode<Cm2OrdersQuery, Cm2OrdersQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Cm2Orders" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "status" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cm2Orders" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "status" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "status" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "PageInfo" }, "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "OrderWithCustomer" }, "directives": [] }] } }] } }] } }] } }, ...PageInfoFragmentDoc.definitions, ...OrderWithCustomerFragmentDoc.definitions] });

export const Cm2OrderDocument: DocumentNode<Cm2OrderQuery, Cm2OrderQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Cm2Order" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cm2Order" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "OrderWithCustomer" }, "directives": [] }] } }] } }, ...OrderWithCustomerFragmentDoc.definitions] });

export const Cm2CreateOrderDocument: DocumentNode<Cm2CreateOrderMutation, Cm2CreateOrderMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "Cm2CreateOrder" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Cm2CreateOrderInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cm2CreateOrder" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "customer" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }] } }] } }] } }] });

export const Cm2SearchCustomersDocument: DocumentNode<Cm2SearchCustomersQuery, Cm2SearchCustomersQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Cm2SearchCustomers" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "search" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cm2Customers" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "search" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "search" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "IntValue", "value": "10" } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Customer" }, "directives": [] }] } }] } }] } }] } }, ...CustomerFragmentDoc.definitions] });

export const Cm2CustomersDocument: DocumentNode<Cm2CustomersQuery, Cm2CustomersQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Cm2Customers" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cm2Customers" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "PageInfo" }, "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Customer" }, "directives": [] }] } }] } }] } }] } }, ...PageInfoFragmentDoc.definitions, ...CustomerFragmentDoc.definitions] });

export const Cm2CreateCustomerDocument: DocumentNode<Cm2CreateCustomerMutation, Cm2CreateCustomerMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "Cm2CreateCustomer" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Cm2CreateCustomerInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cm2CreateCustomer" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }] } }] } }] });

export const Cm2CloseOrderDocument: DocumentNode<Cm2CloseOrderMutation, Cm2CloseOrderMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "Cm2CloseOrder" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cm2CloseOrder" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "directives": [] }] } }] });

export const Cm2CustomerPageDocument: DocumentNode<Cm2CustomerPageQuery, Cm2CustomerPageQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "Cm2CustomerPage" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "cm2Customer" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "Customer" }, "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "orders" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "IntValue", "value": "20" } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "start" }, "arguments": [], "directives": [] }] } }] } }] } }] } }] } }, ...CustomerFragmentDoc.definitions] });
