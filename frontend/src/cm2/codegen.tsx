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
  orders: Cm2OrderConnection,
};

/** TODO - generate connection+edge string with helper */
export type Cm2CustomerConnection = {
   __typename?: 'Cm2CustomerConnection',
  pageInfo: PageInfo,
  edges: Array<Cm2CustomerEdge>,
};

export type Cm2CustomerEdge = {
   __typename?: 'Cm2CustomerEdge',
  cursor: Scalars['String'],
  node: Cm2Customer,
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
  pageInfo: PageInfo,
  edges: Array<Cm2OrderEdge>,
};

export type Cm2OrderEdge = {
   __typename?: 'Cm2OrderEdge',
  cursor: Scalars['String'],
  node: Cm2Order,
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

/** TODO - move outside of cm2 */
export type PageInfo = {
   __typename?: 'PageInfo',
  pageNumber: Scalars['Int'],
  endCursor?: Maybe<Scalars['String']>,
  hasNextPage: Scalars['Boolean'],
};

/** 
 * FIXME - Can't use 'extend type Query' in separate files because of
 * https://github.com/dotansimha/graphql-code-generator/issues/2731
 */
export type Query = {
   __typename?: 'Query',
  cm2Customers: Cm2CustomerConnection,
  cm2Orders: Cm2OrderConnection,
  cm2Customer: Cm2Customer,
  cm2Order: Cm2Order,
  rooms: Array<Maybe<Room>>,
};


/** 
 * FIXME - Can't use 'extend type Query' in separate files because of
 * https://github.com/dotansimha/graphql-code-generator/issues/2731
 */
export type QueryCm2CustomersArgs = {
  search?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  page?: Maybe<Scalars['Int']>
};


/** 
 * FIXME - Can't use 'extend type Query' in separate files because of
 * https://github.com/dotansimha/graphql-code-generator/issues/2731
 */
export type QueryCm2OrdersArgs = {
  status?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  page?: Maybe<Scalars['Int']>
};


/** 
 * FIXME - Can't use 'extend type Query' in separate files because of
 * https://github.com/dotansimha/graphql-code-generator/issues/2731
 */
export type QueryCm2CustomerArgs = {
  id?: Maybe<Scalars['ID']>
};


/** 
 * FIXME - Can't use 'extend type Query' in separate files because of
 * https://github.com/dotansimha/graphql-code-generator/issues/2731
 */
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
  status?: Maybe<Scalars['String']>,
  page?: Maybe<Scalars['Int']>
};


export type GetCm2OrdersQuery = (
  { __typename?: 'Query' }
  & { cm2Orders: (
    { __typename?: 'Cm2OrderConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'pageNumber'>
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
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage'>
    ), edges: Array<(
      { __typename?: 'Cm2CustomerEdge' }
      & { node: (
        { __typename?: 'Cm2Customer' }
        & CustomerFragment
      ) }
    )> }
  ) }
);

export type Cm2CustomersQueryVariables = {
  page?: Maybe<Scalars['Int']>
};


export type Cm2CustomersQuery = (
  { __typename?: 'Query' }
  & { cm2Customers: (
    { __typename?: 'Cm2CustomerConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'pageNumber'>
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

export type Cm2CustomerPageQueryVariables = {
  id: Scalars['ID']
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
          & Pick<Cm2Order, 'id' | 'start'>
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
export const GetCm2OrdersDocument = gql`
    query GetCm2Orders($status: String, $page: Int) {
  cm2Orders(status: $status, page: $page) {
    pageInfo {
      hasNextPage
      pageNumber
    }
    edges {
      node {
        ...OrderWithCustomer
      }
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
 *      page: // value for 'page'
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
  cm2Customers(search: $search, first: 10) {
    pageInfo {
      hasNextPage
    }
    edges {
      node {
        ...Customer
      }
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
    query Cm2Customers($page: Int) {
  cm2Customers(page: $page) {
    pageInfo {
      hasNextPage
      pageNumber
    }
    edges {
      node {
        ...Customer
      }
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
 *      page: // value for 'page'
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
export const Cm2CustomerPageDocument = gql`
    query Cm2CustomerPage($id: ID!) {
  cm2Customer(id: $id) {
    ...Customer
    orders {
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