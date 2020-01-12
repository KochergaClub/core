import * as Types from '../apollo/gen-types';

import { PageInfoFragment } from '../apollo/queries.generated';
import gql from 'graphql-tag';
import { PageInfoFragmentDoc } from '../apollo/queries.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type CustomerFragment = (
  { __typename?: 'Cm2Customer' }
  & Pick<Types.Cm2Customer, 'id' | 'first_name' | 'last_name' | 'card_id'>
);

export type OrderWithCustomerFragment = (
  { __typename?: 'Cm2Order' }
  & Pick<Types.Cm2Order, 'id' | 'start' | 'end' | 'value'>
  & { customer: Types.Maybe<(
    { __typename?: 'Cm2Customer' }
    & CustomerFragment
  )> }
);

export type Cm2OrdersQueryVariables = {
  status?: Types.Maybe<Types.Scalars['String']>,
  after?: Types.Maybe<Types.Scalars['String']>,
  before?: Types.Maybe<Types.Scalars['String']>,
  first?: Types.Maybe<Types.Scalars['Int']>,
  last?: Types.Maybe<Types.Scalars['Int']>
};


export type Cm2OrdersQuery = (
  { __typename?: 'Query' }
  & { cm2Orders: (
    { __typename?: 'Cm2OrderConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<(
      { __typename?: 'Cm2OrderEdge' }
      & { node: (
        { __typename?: 'Cm2Order' }
        & OrderWithCustomerFragment
      ) }
    )> }
  ) }
);

export type Cm2OrderQueryVariables = {
  id: Types.Scalars['ID']
};


export type Cm2OrderQuery = (
  { __typename?: 'Query' }
  & { cm2Order: (
    { __typename?: 'Cm2Order' }
    & OrderWithCustomerFragment
  ) }
);

export type Cm2CreateOrderMutationVariables = {
  params: Types.Cm2CreateOrderInput
};


export type Cm2CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { cm2CreateOrder: (
    { __typename?: 'Cm2Order' }
    & { customer: Types.Maybe<(
      { __typename?: 'Cm2Customer' }
      & Pick<Types.Cm2Customer, 'id'>
    )> }
  ) }
);

export type Cm2SearchCustomersQueryVariables = {
  search: Types.Scalars['String']
};


export type Cm2SearchCustomersQuery = (
  { __typename?: 'Query' }
  & { cm2Customers: (
    { __typename?: 'Cm2CustomerConnection' }
    & { edges: Array<(
      { __typename?: 'Cm2CustomerEdge' }
      & { node: (
        { __typename?: 'Cm2Customer' }
        & CustomerFragment
      ) }
    )> }
  ) }
);

export type Cm2CustomersQueryVariables = {
  after?: Types.Maybe<Types.Scalars['String']>,
  before?: Types.Maybe<Types.Scalars['String']>,
  first?: Types.Maybe<Types.Scalars['Int']>,
  last?: Types.Maybe<Types.Scalars['Int']>
};


export type Cm2CustomersQuery = (
  { __typename?: 'Query' }
  & { cm2Customers: (
    { __typename?: 'Cm2CustomerConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<(
      { __typename?: 'Cm2CustomerEdge' }
      & { node: (
        { __typename?: 'Cm2Customer' }
        & CustomerFragment
      ) }
    )> }
  ) }
);

export type Cm2CreateCustomerMutationVariables = {
  params: Types.Cm2CreateCustomerInput
};


export type Cm2CreateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { cm2CreateCustomer: (
    { __typename?: 'Cm2Customer' }
    & Pick<Types.Cm2Customer, 'id'>
  ) }
);

export type Cm2CloseOrderMutationVariables = {
  id: Types.Scalars['ID']
};


export type Cm2CloseOrderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'cm2CloseOrder'>
);

export type Cm2CustomerPageQueryVariables = {
  id: Types.Scalars['ID']
};


export type Cm2CustomerPageQuery = (
  { __typename?: 'Query' }
  & { cm2Customer: (
    { __typename?: 'Cm2Customer' }
    & { orders: (
      { __typename?: 'Cm2OrderConnection' }
      & { edges: Array<(
        { __typename?: 'Cm2OrderEdge' }
        & { node: (
          { __typename?: 'Cm2Order' }
          & Pick<Types.Cm2Order, 'id' | 'start'>
        ) }
      )> }
    ) }
    & CustomerFragment
  ) }
);

export const CustomerFragmentDoc = gql`
    fragment Customer on Cm2Customer {
  id
  first_name
  last_name
  card_id
}
    `;
export const OrderWithCustomerFragmentDoc = gql`
    fragment OrderWithCustomer on Cm2Order {
  id
  start
  end
  value
  customer {
    ...Customer
  }
}
    ${CustomerFragmentDoc}`;
export const Cm2OrdersDocument = gql`
    query Cm2Orders($status: String, $after: String, $before: String, $first: Int, $last: Int) {
  cm2Orders(status: $status, after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...OrderWithCustomer
      }
    }
  }
}
    ${PageInfoFragmentDoc}
${OrderWithCustomerFragmentDoc}`;

/**
 * __useCm2OrdersQuery__
 *
 * To run a query within a React component, call `useCm2OrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCm2OrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCm2OrdersQuery({
 *   variables: {
 *      status: // value for 'status'
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useCm2OrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Cm2OrdersQuery, Cm2OrdersQueryVariables>) {
        return ApolloReactHooks.useQuery<Cm2OrdersQuery, Cm2OrdersQueryVariables>(Cm2OrdersDocument, baseOptions);
      }
export function useCm2OrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Cm2OrdersQuery, Cm2OrdersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Cm2OrdersQuery, Cm2OrdersQueryVariables>(Cm2OrdersDocument, baseOptions);
        }
export type Cm2OrdersQueryHookResult = ReturnType<typeof useCm2OrdersQuery>;
export type Cm2OrdersLazyQueryHookResult = ReturnType<typeof useCm2OrdersLazyQuery>;
export type Cm2OrdersQueryResult = ApolloReactCommon.QueryResult<Cm2OrdersQuery, Cm2OrdersQueryVariables>;
export const Cm2OrderDocument = gql`
    query Cm2Order($id: ID!) {
  cm2Order(id: $id) {
    ...OrderWithCustomer
  }
}
    ${OrderWithCustomerFragmentDoc}`;

/**
 * __useCm2OrderQuery__
 *
 * To run a query within a React component, call `useCm2OrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useCm2OrderQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCm2OrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCm2OrderQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Cm2OrderQuery, Cm2OrderQueryVariables>) {
        return ApolloReactHooks.useQuery<Cm2OrderQuery, Cm2OrderQueryVariables>(Cm2OrderDocument, baseOptions);
      }
export function useCm2OrderLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Cm2OrderQuery, Cm2OrderQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Cm2OrderQuery, Cm2OrderQueryVariables>(Cm2OrderDocument, baseOptions);
        }
export type Cm2OrderQueryHookResult = ReturnType<typeof useCm2OrderQuery>;
export type Cm2OrderLazyQueryHookResult = ReturnType<typeof useCm2OrderLazyQuery>;
export type Cm2OrderQueryResult = ApolloReactCommon.QueryResult<Cm2OrderQuery, Cm2OrderQueryVariables>;
export const Cm2CreateOrderDocument = gql`
    mutation Cm2CreateOrder($params: Cm2CreateOrderInput!) {
  cm2CreateOrder(input: $params) {
    customer {
      id
    }
  }
}
    `;
export type Cm2CreateOrderMutationFn = ApolloReactCommon.MutationFunction<Cm2CreateOrderMutation, Cm2CreateOrderMutationVariables>;

/**
 * __useCm2CreateOrderMutation__
 *
 * To run a mutation, you first call `useCm2CreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCm2CreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cm2CreateOrderMutation, { data, loading, error }] = useCm2CreateOrderMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useCm2CreateOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Cm2CreateOrderMutation, Cm2CreateOrderMutationVariables>) {
        return ApolloReactHooks.useMutation<Cm2CreateOrderMutation, Cm2CreateOrderMutationVariables>(Cm2CreateOrderDocument, baseOptions);
      }
export type Cm2CreateOrderMutationHookResult = ReturnType<typeof useCm2CreateOrderMutation>;
export type Cm2CreateOrderMutationResult = ApolloReactCommon.MutationResult<Cm2CreateOrderMutation>;
export type Cm2CreateOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<Cm2CreateOrderMutation, Cm2CreateOrderMutationVariables>;
export const Cm2SearchCustomersDocument = gql`
    query Cm2SearchCustomers($search: String!) {
  cm2Customers(search: $search, first: 10) {
    edges {
      node {
        ...Customer
      }
    }
  }
}
    ${CustomerFragmentDoc}`;

/**
 * __useCm2SearchCustomersQuery__
 *
 * To run a query within a React component, call `useCm2SearchCustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCm2SearchCustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCm2SearchCustomersQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useCm2SearchCustomersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Cm2SearchCustomersQuery, Cm2SearchCustomersQueryVariables>) {
        return ApolloReactHooks.useQuery<Cm2SearchCustomersQuery, Cm2SearchCustomersQueryVariables>(Cm2SearchCustomersDocument, baseOptions);
      }
export function useCm2SearchCustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Cm2SearchCustomersQuery, Cm2SearchCustomersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Cm2SearchCustomersQuery, Cm2SearchCustomersQueryVariables>(Cm2SearchCustomersDocument, baseOptions);
        }
export type Cm2SearchCustomersQueryHookResult = ReturnType<typeof useCm2SearchCustomersQuery>;
export type Cm2SearchCustomersLazyQueryHookResult = ReturnType<typeof useCm2SearchCustomersLazyQuery>;
export type Cm2SearchCustomersQueryResult = ApolloReactCommon.QueryResult<Cm2SearchCustomersQuery, Cm2SearchCustomersQueryVariables>;
export const Cm2CustomersDocument = gql`
    query Cm2Customers($after: String, $before: String, $first: Int, $last: Int) {
  cm2Customers(after: $after, before: $before, first: $first, last: $last) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...Customer
      }
    }
  }
}
    ${PageInfoFragmentDoc}
${CustomerFragmentDoc}`;

/**
 * __useCm2CustomersQuery__
 *
 * To run a query within a React component, call `useCm2CustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useCm2CustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCm2CustomersQuery({
 *   variables: {
 *      after: // value for 'after'
 *      before: // value for 'before'
 *      first: // value for 'first'
 *      last: // value for 'last'
 *   },
 * });
 */
export function useCm2CustomersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Cm2CustomersQuery, Cm2CustomersQueryVariables>) {
        return ApolloReactHooks.useQuery<Cm2CustomersQuery, Cm2CustomersQueryVariables>(Cm2CustomersDocument, baseOptions);
      }
export function useCm2CustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Cm2CustomersQuery, Cm2CustomersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Cm2CustomersQuery, Cm2CustomersQueryVariables>(Cm2CustomersDocument, baseOptions);
        }
export type Cm2CustomersQueryHookResult = ReturnType<typeof useCm2CustomersQuery>;
export type Cm2CustomersLazyQueryHookResult = ReturnType<typeof useCm2CustomersLazyQuery>;
export type Cm2CustomersQueryResult = ApolloReactCommon.QueryResult<Cm2CustomersQuery, Cm2CustomersQueryVariables>;
export const Cm2CreateCustomerDocument = gql`
    mutation Cm2CreateCustomer($params: Cm2CreateCustomerInput!) {
  cm2CreateCustomer(input: $params) {
    id
  }
}
    `;
export type Cm2CreateCustomerMutationFn = ApolloReactCommon.MutationFunction<Cm2CreateCustomerMutation, Cm2CreateCustomerMutationVariables>;

/**
 * __useCm2CreateCustomerMutation__
 *
 * To run a mutation, you first call `useCm2CreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCm2CreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cm2CreateCustomerMutation, { data, loading, error }] = useCm2CreateCustomerMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useCm2CreateCustomerMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Cm2CreateCustomerMutation, Cm2CreateCustomerMutationVariables>) {
        return ApolloReactHooks.useMutation<Cm2CreateCustomerMutation, Cm2CreateCustomerMutationVariables>(Cm2CreateCustomerDocument, baseOptions);
      }
export type Cm2CreateCustomerMutationHookResult = ReturnType<typeof useCm2CreateCustomerMutation>;
export type Cm2CreateCustomerMutationResult = ApolloReactCommon.MutationResult<Cm2CreateCustomerMutation>;
export type Cm2CreateCustomerMutationOptions = ApolloReactCommon.BaseMutationOptions<Cm2CreateCustomerMutation, Cm2CreateCustomerMutationVariables>;
export const Cm2CloseOrderDocument = gql`
    mutation Cm2CloseOrder($id: ID!) {
  cm2CloseOrder(id: $id)
}
    `;
export type Cm2CloseOrderMutationFn = ApolloReactCommon.MutationFunction<Cm2CloseOrderMutation, Cm2CloseOrderMutationVariables>;

/**
 * __useCm2CloseOrderMutation__
 *
 * To run a mutation, you first call `useCm2CloseOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCm2CloseOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cm2CloseOrderMutation, { data, loading, error }] = useCm2CloseOrderMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCm2CloseOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<Cm2CloseOrderMutation, Cm2CloseOrderMutationVariables>) {
        return ApolloReactHooks.useMutation<Cm2CloseOrderMutation, Cm2CloseOrderMutationVariables>(Cm2CloseOrderDocument, baseOptions);
      }
export type Cm2CloseOrderMutationHookResult = ReturnType<typeof useCm2CloseOrderMutation>;
export type Cm2CloseOrderMutationResult = ApolloReactCommon.MutationResult<Cm2CloseOrderMutation>;
export type Cm2CloseOrderMutationOptions = ApolloReactCommon.BaseMutationOptions<Cm2CloseOrderMutation, Cm2CloseOrderMutationVariables>;
export const Cm2CustomerPageDocument = gql`
    query Cm2CustomerPage($id: ID!) {
  cm2Customer(id: $id) {
    ...Customer
    orders(first: 20) {
      edges {
        node {
          id
          start
        }
      }
    }
  }
}
    ${CustomerFragmentDoc}`;

/**
 * __useCm2CustomerPageQuery__
 *
 * To run a query within a React component, call `useCm2CustomerPageQuery` and pass it any options that fit your needs.
 * When your component renders, `useCm2CustomerPageQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCm2CustomerPageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCm2CustomerPageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Cm2CustomerPageQuery, Cm2CustomerPageQueryVariables>) {
        return ApolloReactHooks.useQuery<Cm2CustomerPageQuery, Cm2CustomerPageQueryVariables>(Cm2CustomerPageDocument, baseOptions);
      }
export function useCm2CustomerPageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Cm2CustomerPageQuery, Cm2CustomerPageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Cm2CustomerPageQuery, Cm2CustomerPageQueryVariables>(Cm2CustomerPageDocument, baseOptions);
        }
export type Cm2CustomerPageQueryHookResult = ReturnType<typeof useCm2CustomerPageQuery>;
export type Cm2CustomerPageLazyQueryHookResult = ReturnType<typeof useCm2CustomerPageLazyQuery>;
export type Cm2CustomerPageQueryResult = ApolloReactCommon.QueryResult<Cm2CustomerPageQuery, Cm2CustomerPageQueryVariables>;