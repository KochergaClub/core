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

export type AuthCurrentUser = {
   __typename?: 'AuthCurrentUser',
  is_authenticated: Scalars['Boolean'],
  permissions: Array<Scalars['String']>,
  is_staff?: Maybe<Scalars['Boolean']>,
  email?: Maybe<Scalars['String']>,
};

export type AuthGroup = {
   __typename?: 'AuthGroup',
  id: Scalars['ID'],
  name: Scalars['String'],
  permissions: Array<AuthPermission>,
  users: Array<AuthUser>,
};

export type AuthPermission = {
   __typename?: 'AuthPermission',
  id: Scalars['ID'],
  name: Scalars['String'],
  users: Array<AuthUser>,
};

export type AuthUser = {
   __typename?: 'AuthUser',
  id: Scalars['ID'],
  email: Scalars['String'],
  staff_member?: Maybe<StaffMember>,
};

export type CashierCreatePaymentInput = {
  amount: Scalars['Int'],
  whom: Scalars['ID'],
  comment?: Maybe<Scalars['String']>,
};

export type CashierPayment = {
   __typename?: 'CashierPayment',
  id: Scalars['ID'],
  amount: Scalars['Int'],
  whom: AuthUser,
  comment: Scalars['String'],
  is_redeemed: Scalars['Boolean'],
  created_dt: Scalars['String'],
  redeem_dt?: Maybe<Scalars['String']>,
};

export type CashierPaymentConnection = {
   __typename?: 'CashierPaymentConnection',
  pageInfo: PageInfo,
  nodes: Array<CashierPayment>,
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

export type Cm2CustomerConnection = {
   __typename?: 'Cm2CustomerConnection',
  pageInfo: PageInfo,
  nodes: Array<Cm2Customer>,
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
  nodes: Array<Cm2Order>,
};

export type Mutation = {
   __typename?: 'Mutation',
  authAddUserToGroup?: Maybe<Scalars['Boolean']>,
  authRemoveUserFromGroup?: Maybe<Scalars['Boolean']>,
  _empty?: Maybe<Scalars['String']>,
  cashierCreatePayment?: Maybe<Scalars['Boolean']>,
  cashierRedeemPayment?: Maybe<Scalars['Boolean']>,
  cm2CreateOrder: Cm2Order,
  cm2CreateCustomer: Cm2Customer,
  cm2CloseOrder?: Maybe<Scalars['Boolean']>,
  staffGrantGooglePermissionsToMember?: Maybe<Scalars['Boolean']>,
  staffFireMember?: Maybe<Scalars['Boolean']>,
};


export type MutationAuthAddUserToGroupArgs = {
  user_id: Scalars['ID'],
  group_id: Scalars['ID']
};


export type MutationAuthRemoveUserFromGroupArgs = {
  user_id: Scalars['ID'],
  group_id: Scalars['ID']
};


export type MutationCashierCreatePaymentArgs = {
  params: CashierCreatePaymentInput
};


export type MutationCashierRedeemPaymentArgs = {
  id: Scalars['ID']
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


export type MutationStaffGrantGooglePermissionsToMemberArgs = {
  id: Scalars['ID']
};


export type MutationStaffFireMemberArgs = {
  id: Scalars['ID']
};

export type PageInfo = {
   __typename?: 'PageInfo',
  pageNumber: Scalars['Int'],
  hasNextPage: Scalars['Boolean'],
};

export type Query = {
   __typename?: 'Query',
  currentUser: AuthCurrentUser,
  authGroupsAll: Array<AuthGroup>,
  authPermissionsAll: Array<AuthPermission>,
  _empty?: Maybe<Scalars['String']>,
  cashierPayments: CashierPaymentConnection,
  cm2Customers: Cm2CustomerConnection,
  cm2Orders: Cm2OrderConnection,
  cm2Customer: Cm2Customer,
  cm2Order: Cm2Order,
  rooms: Array<Maybe<Room>>,
  staffMembersAll: Array<StaffMember>,
  staffMember: StaffMember,
};


export type QueryCashierPaymentsArgs = {
  page?: Maybe<Scalars['Int']>
};


export type QueryCm2CustomersArgs = {
  search?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  page?: Maybe<Scalars['Int']>
};


export type QueryCm2OrdersArgs = {
  status?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  page?: Maybe<Scalars['Int']>
};


export type QueryCm2CustomerArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryCm2OrderArgs = {
  id?: Maybe<Scalars['ID']>
};


export type QueryStaffMemberArgs = {
  id: Scalars['ID']
};

export type Room = {
   __typename?: 'Room',
  name?: Maybe<Scalars['String']>,
  max_people?: Maybe<Scalars['Int']>,
  area?: Maybe<Scalars['Int']>,
};

export type StaffMember = {
   __typename?: 'StaffMember',
  id: Scalars['ID'],
  user_id: Scalars['ID'],
  full_name: Scalars['String'],
  short_name?: Maybe<Scalars['String']>,
  email: Scalars['String'],
  role: Scalars['String'],
  color?: Maybe<Scalars['String']>,
  is_current?: Maybe<Scalars['Boolean']>,
  slack_image?: Maybe<Scalars['String']>,
  slack_id?: Maybe<Scalars['String']>,
  vk?: Maybe<Scalars['String']>,
};

export type PaymentFragment = (
  { __typename?: 'CashierPayment' }
  & Pick<CashierPayment, 'id' | 'amount' | 'comment' | 'is_redeemed' | 'created_dt' | 'redeem_dt'>
  & { whom: (
    { __typename?: 'AuthUser' }
    & Pick<AuthUser, 'id' | 'email'>
    & { staff_member: Maybe<(
      { __typename?: 'StaffMember' }
      & Pick<StaffMember, 'id' | 'full_name'>
    )> }
  ) }
);

export type CashierPaymentsQueryVariables = {};


export type CashierPaymentsQuery = (
  { __typename?: 'Query' }
  & { payments: (
    { __typename?: 'CashierPaymentConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'hasNextPage' | 'pageNumber'>
    ), nodes: Array<(
      { __typename?: 'CashierPayment' }
      & PaymentFragment
    )> }
  ) }
);

export type CashierCreatePaymentMutationVariables = {
  params: CashierCreatePaymentInput
};


export type CashierCreatePaymentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cashierCreatePayment'>
);

export type CashierRedeemPaymentMutationVariables = {
  id: Scalars['ID']
};


export type CashierRedeemPaymentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'cashierRedeemPayment'>
);

export const PaymentFragmentDoc = gql`
    fragment Payment on CashierPayment {
  id
  amount
  whom {
    id
    email
    staff_member {
      id
      full_name
    }
  }
  comment
  is_redeemed
  created_dt
  redeem_dt
}
    `;
export const CashierPaymentsDocument = gql`
    query CashierPayments {
  payments: cashierPayments {
    pageInfo {
      hasNextPage
      pageNumber
    }
    nodes {
      ...Payment
    }
  }
}
    ${PaymentFragmentDoc}`;

/**
 * __useCashierPaymentsQuery__
 *
 * To run a query within a React component, call `useCashierPaymentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCashierPaymentsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCashierPaymentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCashierPaymentsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CashierPaymentsQuery, CashierPaymentsQueryVariables>) {
        return ApolloReactHooks.useQuery<CashierPaymentsQuery, CashierPaymentsQueryVariables>(CashierPaymentsDocument, baseOptions);
      }
export function useCashierPaymentsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CashierPaymentsQuery, CashierPaymentsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CashierPaymentsQuery, CashierPaymentsQueryVariables>(CashierPaymentsDocument, baseOptions);
        }
export type CashierPaymentsQueryHookResult = ReturnType<typeof useCashierPaymentsQuery>;
export type CashierPaymentsLazyQueryHookResult = ReturnType<typeof useCashierPaymentsLazyQuery>;
export type CashierPaymentsQueryResult = ApolloReactCommon.QueryResult<CashierPaymentsQuery, CashierPaymentsQueryVariables>;
export const CashierCreatePaymentDocument = gql`
    mutation CashierCreatePayment($params: CashierCreatePaymentInput!) {
  cashierCreatePayment(params: $params)
}
    `;
export type CashierCreatePaymentMutationFn = ApolloReactCommon.MutationFunction<CashierCreatePaymentMutation, CashierCreatePaymentMutationVariables>;

/**
 * __useCashierCreatePaymentMutation__
 *
 * To run a mutation, you first call `useCashierCreatePaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCashierCreatePaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cashierCreatePaymentMutation, { data, loading, error }] = useCashierCreatePaymentMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useCashierCreatePaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CashierCreatePaymentMutation, CashierCreatePaymentMutationVariables>) {
        return ApolloReactHooks.useMutation<CashierCreatePaymentMutation, CashierCreatePaymentMutationVariables>(CashierCreatePaymentDocument, baseOptions);
      }
export type CashierCreatePaymentMutationHookResult = ReturnType<typeof useCashierCreatePaymentMutation>;
export type CashierCreatePaymentMutationResult = ApolloReactCommon.MutationResult<CashierCreatePaymentMutation>;
export type CashierCreatePaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<CashierCreatePaymentMutation, CashierCreatePaymentMutationVariables>;
export const CashierRedeemPaymentDocument = gql`
    mutation CashierRedeemPayment($id: ID!) {
  cashierRedeemPayment(id: $id)
}
    `;
export type CashierRedeemPaymentMutationFn = ApolloReactCommon.MutationFunction<CashierRedeemPaymentMutation, CashierRedeemPaymentMutationVariables>;

/**
 * __useCashierRedeemPaymentMutation__
 *
 * To run a mutation, you first call `useCashierRedeemPaymentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCashierRedeemPaymentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cashierRedeemPaymentMutation, { data, loading, error }] = useCashierRedeemPaymentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useCashierRedeemPaymentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CashierRedeemPaymentMutation, CashierRedeemPaymentMutationVariables>) {
        return ApolloReactHooks.useMutation<CashierRedeemPaymentMutation, CashierRedeemPaymentMutationVariables>(CashierRedeemPaymentDocument, baseOptions);
      }
export type CashierRedeemPaymentMutationHookResult = ReturnType<typeof useCashierRedeemPaymentMutation>;
export type CashierRedeemPaymentMutationResult = ApolloReactCommon.MutationResult<CashierRedeemPaymentMutation>;
export type CashierRedeemPaymentMutationOptions = ApolloReactCommon.BaseMutationOptions<CashierRedeemPaymentMutation, CashierRedeemPaymentMutationVariables>;