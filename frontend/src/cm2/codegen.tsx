import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type Cm2CreateCustomerInput = {
  card_id: Scalars['Int'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
};

export type Cm2CreateOrderInput = {
  customer?: Maybe<Scalars['ID']>,
};

export type Cm2Customer = {
   __typename?: 'Cm2Customer',
  id: Scalars['ID'],
  card_id: Scalars['Int'],
  first_name: Scalars['String'],
  last_name: Scalars['String'],
};

export type Cm2CustomerConnection = {
   __typename?: 'Cm2CustomerConnection',
  hasNextPage: Scalars['Boolean'],
  items: Array<Cm2Customer>,
};

export type Cm2Order = {
   __typename?: 'Cm2Order',
  id: Scalars['ID'],
  start: Scalars['String'],
  end?: Maybe<Scalars['String']>,
  value?: Maybe<Scalars['Int']>,
  customer?: Maybe<Cm2Customer>,
};

export type Cm2OrderConnection = {
   __typename?: 'Cm2OrderConnection',
  hasNextPage: Scalars['Boolean'],
  items: Array<Cm2Order>,
};

export type Mutation = {
   __typename?: 'Mutation',
  cm2CreateOrder: Cm2Order,
  cm2CreateCustomer: Cm2Customer,
  cm2CloseOrder?: Maybe<Scalars['Boolean']>,
};


export type MutationCm2CreateOrderArgs = {
  params: Cm2CreateOrderInput
};


export type MutationCm2CreateCustomerArgs = {
  params: Cm2CreateCustomerInput
};


export type MutationCm2CloseOrderArgs = {
  id: Scalars['ID']
};

export type Query = {
   __typename?: 'Query',
  rooms: Array<Maybe<Room>>,
  cm2Customers: Cm2CustomerConnection,
  cm2Orders: Cm2OrderConnection,
  cm2Customer: Cm2Customer,
  cm2Order: Cm2Order,
};


export type QueryCm2CustomersArgs = {
  search?: Maybe<Scalars['String']>
};


export type QueryCm2OrdersArgs = {
  status?: Maybe<Scalars['String']>
};


export type QueryCm2CustomerArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryCm2OrderArgs = {
  id?: Maybe<Scalars['ID']>
};

export type Room = {
   __typename?: 'Room',
  name?: Maybe<Scalars['String']>,
  max_people?: Maybe<Scalars['Int']>,
  area?: Maybe<Scalars['Int']>,
};

export type CustomerFragment = (
  { __typename?: 'Cm2Customer' }
  & Pick<Cm2Customer, 'id' | 'first_name' | 'last_name' | 'card_id'>
);

export type OrderWithCustomerFragment = (
  { __typename?: 'Cm2Order' }
  & Pick<Cm2Order, 'id' | 'start' | 'end' | 'value'>
  & { customer: Maybe<(
    { __typename?: 'Cm2Customer' }
    & CustomerFragment
  )> }
);

export type GetCm2OrdersQueryVariables = {
  status: Scalars['String']
};


export type GetCm2OrdersQuery = (
  { __typename?: 'Query' }
  & { cm2Orders: (
    { __typename?: 'Cm2OrderConnection' }
    & Pick<Cm2OrderConnection, 'hasNextPage'>
    & { items: Array<(
      { __typename?: 'Cm2Order' }
      & OrderWithCustomerFragment
    )> }
  ) }
);

export type Cm2OrderQueryVariables = {
  id: Scalars['ID']
};


export type Cm2OrderQuery = (
  { __typename?: 'Query' }
  & { cm2Order: (
    { __typename?: 'Cm2Order' }
    & OrderWithCustomerFragment
  ) }
);

export type Cm2CreateOrderMutationVariables = {
  params: Cm2CreateOrderInput
};


export type Cm2CreateOrderMutation = (
  { __typename?: 'Mutation' }
  & { cm2CreateOrder: (
    { __typename?: 'Cm2Order' }
    & { customer: Maybe<(
      { __typename?: 'Cm2Customer' }
      & Pick<Cm2Customer, 'id'>
    )> }
  ) }
);

export type SearchCm2CustomersQueryVariables = {
  search: Scalars['String']
};


export type SearchCm2CustomersQuery = (
  { __typename?: 'Query' }
  & { cm2Customers: (
    { __typename?: 'Cm2CustomerConnection' }
    & Pick<Cm2CustomerConnection, 'hasNextPage'>
    & { items: Array<(
      { __typename?: 'Cm2Customer' }
      & CustomerFragment
    )> }
  ) }
);

export type Cm2CustomersQueryVariables = {};


export type Cm2CustomersQuery = (
  { __typename?: 'Query' }
  & { cm2Customers: (
    { __typename?: 'Cm2CustomerConnection' }
    & Pick<Cm2CustomerConnection, 'hasNextPage'>
    & { items: Array<(
      { __typename?: 'Cm2Customer' }
      & CustomerFragment
    )> }
  ) }
);

export type Cm2CreateCustomerMutationVariables = {
  params: Cm2CreateCustomerInput
};


export type Cm2CreateCustomerMutation = (
  { __typename?: 'Mutation' }
  & { cm2CreateCustomer: (
    { __typename?: 'Cm2Customer' }
    & Pick<Cm2Customer, 'id'>
  ) }
);

export type Cm2CloseOrderMutationVariables = {
  id: Scalars['ID']
};


export type Cm2CloseOrderMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cm2CloseOrder'>
);

export type Cm2CustomerQueryVariables = {
  id: Scalars['ID']
};


export type Cm2CustomerQuery = (
  { __typename?: 'Query' }
  & { cm2Customer: (
    { __typename?: 'Cm2Customer' }
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
export const GetCm2OrdersDocument = gql`
    query GetCm2Orders($status: String!) {
  cm2Orders(status: $status) {
    hasNextPage
    items {
      ...OrderWithCustomer
    }
  }
}
    ${OrderWithCustomerFragmentDoc}`;

/**
 * __useGetCm2OrdersQuery__
 *
 * To run a query within a React component, call `useGetCm2OrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCm2OrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCm2OrdersQuery({
 *   variables: {
 *      status: // value for 'status'
 *   },
 * });
 */
export function useGetCm2OrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<GetCm2OrdersQuery, GetCm2OrdersQueryVariables>) {
        return ApolloReactHooks.useQuery<GetCm2OrdersQuery, GetCm2OrdersQueryVariables>(GetCm2OrdersDocument, baseOptions);
      }
export function useGetCm2OrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GetCm2OrdersQuery, GetCm2OrdersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<GetCm2OrdersQuery, GetCm2OrdersQueryVariables>(GetCm2OrdersDocument, baseOptions);
        }
export type GetCm2OrdersQueryHookResult = ReturnType<typeof useGetCm2OrdersQuery>;
export type GetCm2OrdersLazyQueryHookResult = ReturnType<typeof useGetCm2OrdersLazyQuery>;
export type GetCm2OrdersQueryResult = ApolloReactCommon.QueryResult<GetCm2OrdersQuery, GetCm2OrdersQueryVariables>;
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
  cm2CreateOrder(params: $params) {
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
export const SearchCm2CustomersDocument = gql`
    query SearchCm2Customers($search: String!) {
  cm2Customers(search: $search) {
    hasNextPage
    items {
      ...Customer
    }
  }
}
    ${CustomerFragmentDoc}`;

/**
 * __useSearchCm2CustomersQuery__
 *
 * To run a query within a React component, call `useSearchCm2CustomersQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchCm2CustomersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchCm2CustomersQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useSearchCm2CustomersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SearchCm2CustomersQuery, SearchCm2CustomersQueryVariables>) {
        return ApolloReactHooks.useQuery<SearchCm2CustomersQuery, SearchCm2CustomersQueryVariables>(SearchCm2CustomersDocument, baseOptions);
      }
export function useSearchCm2CustomersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SearchCm2CustomersQuery, SearchCm2CustomersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SearchCm2CustomersQuery, SearchCm2CustomersQueryVariables>(SearchCm2CustomersDocument, baseOptions);
        }
export type SearchCm2CustomersQueryHookResult = ReturnType<typeof useSearchCm2CustomersQuery>;
export type SearchCm2CustomersLazyQueryHookResult = ReturnType<typeof useSearchCm2CustomersLazyQuery>;
export type SearchCm2CustomersQueryResult = ApolloReactCommon.QueryResult<SearchCm2CustomersQuery, SearchCm2CustomersQueryVariables>;
export const Cm2CustomersDocument = gql`
    query Cm2Customers {
  cm2Customers {
    hasNextPage
    items {
      ...Customer
    }
  }
}
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
  cm2CreateCustomer(params: $params) {
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
export const Cm2CustomerDocument = gql`
    query Cm2Customer($id: ID!) {
  cm2Customer(id: $id) {
    ...Customer
  }
}
    ${CustomerFragmentDoc}`;

/**
 * __useCm2CustomerQuery__
 *
 * To run a query within a React component, call `useCm2CustomerQuery` and pass it any options that fit your needs.
 * When your component renders, `useCm2CustomerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCm2CustomerQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCm2CustomerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<Cm2CustomerQuery, Cm2CustomerQueryVariables>) {
        return ApolloReactHooks.useQuery<Cm2CustomerQuery, Cm2CustomerQueryVariables>(Cm2CustomerDocument, baseOptions);
      }
export function useCm2CustomerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<Cm2CustomerQuery, Cm2CustomerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<Cm2CustomerQuery, Cm2CustomerQueryVariables>(Cm2CustomerDocument, baseOptions);
        }
export type Cm2CustomerQueryHookResult = ReturnType<typeof useCm2CustomerQuery>;
export type Cm2CustomerLazyQueryHookResult = ReturnType<typeof useCm2CustomerLazyQuery>;
export type Cm2CustomerQueryResult = ApolloReactCommon.QueryResult<Cm2CustomerQuery, Cm2CustomerQueryVariables>;