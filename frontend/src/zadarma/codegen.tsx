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
  zadarmaSetMemberForPbxCall?: Maybe<Scalars['Boolean']>,
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


export type MutationZadarmaSetMemberForPbxCallArgs = {
  pbx_call_id: Scalars['ID'],
  member_id: Scalars['ID']
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
  zadarmaPbxCalls: ZadarmaPbxCallConnection,
  zadarmaPbxCall: ZadarmaPbxCall,
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
  id: Scalars['ID']
};


export type QueryCm2OrderArgs = {
  id: Scalars['ID']
};


export type QueryStaffMemberArgs = {
  id: Scalars['ID']
};


export type QueryZadarmaPbxCallsArgs = {
  page?: Maybe<Scalars['Int']>,
  page_size?: Maybe<Scalars['Int']>
};


export type QueryZadarmaPbxCallArgs = {
  pbx_call_id: Scalars['ID']
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

export type ZadarmaCall = {
   __typename?: 'ZadarmaCall',
  call_id: Scalars['ID'],
  ts: Scalars['String'],
  watchman?: Maybe<Scalars['String']>,
  call_type: Scalars['String'],
  disposition: Scalars['String'],
  clid: Scalars['String'],
  destination: Scalars['String'],
  sip: Scalars['String'],
  record?: Maybe<Scalars['String']>,
};

export type ZadarmaData = {
   __typename?: 'ZadarmaData',
  staff_member?: Maybe<StaffMember>,
};

export type ZadarmaPbxCall = {
   __typename?: 'ZadarmaPbxCall',
  pbx_call_id: Scalars['ID'],
  ts: Scalars['String'],
  calls: Array<ZadarmaCall>,
  data?: Maybe<ZadarmaData>,
};

export type ZadarmaPbxCallConnection = {
   __typename?: 'ZadarmaPbxCallConnection',
  pageInfo: PageInfo,
  nodes: Array<ZadarmaPbxCall>,
};

export type CommonZadarmaPbxCallFragment = (
  { __typename?: 'ZadarmaPbxCall' }
  & Pick<ZadarmaPbxCall, 'pbx_call_id' | 'ts'>
  & { calls: Array<(
    { __typename?: 'ZadarmaCall' }
    & Pick<ZadarmaCall, 'call_id' | 'ts' | 'call_type' | 'destination' | 'disposition' | 'clid' | 'sip' | 'record' | 'watchman'>
  )>, data: Maybe<(
    { __typename?: 'ZadarmaData' }
    & { staff_member: Maybe<(
      { __typename?: 'StaffMember' }
      & Pick<StaffMember, 'color' | 'short_name'>
    )> }
  )> }
);

export type ZadarmaPbxCallsQueryVariables = {
  page?: Maybe<Scalars['Int']>
};


export type ZadarmaPbxCallsQuery = (
  { __typename?: 'Query' }
  & { pbxCalls: (
    { __typename?: 'ZadarmaPbxCallConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<PageInfo, 'pageNumber' | 'hasNextPage'>
    ), nodes: Array<(
      { __typename?: 'ZadarmaPbxCall' }
      & CommonZadarmaPbxCallFragment
    )> }
  ) }
);

export type ZadarmaPbxCallQueryVariables = {
  pbx_call_id: Scalars['ID']
};


export type ZadarmaPbxCallQuery = (
  { __typename?: 'Query' }
  & { pbxCall: (
    { __typename?: 'ZadarmaPbxCall' }
    & CommonZadarmaPbxCallFragment
  ) }
);

export type ZadarmaSetMemberForPbxCallMutationVariables = {
  member_id: Scalars['ID'],
  pbx_call_id: Scalars['ID']
};


export type ZadarmaSetMemberForPbxCallMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'zadarmaSetMemberForPbxCall'>
);

export const CommonZadarmaPbxCallFragmentDoc = gql`
    fragment CommonZadarmaPbxCall on ZadarmaPbxCall {
  pbx_call_id
  ts
  calls {
    call_id
    ts
    call_type
    destination
    disposition
    clid
    sip
    record
    watchman
  }
  data {
    staff_member {
      color
      short_name
    }
  }
}
    `;
export const ZadarmaPbxCallsDocument = gql`
    query ZadarmaPbxCalls($page: Int) {
  pbxCalls: zadarmaPbxCalls(page: $page, page_size: 20) {
    pageInfo {
      pageNumber
      hasNextPage
    }
    nodes {
      ...CommonZadarmaPbxCall
    }
  }
}
    ${CommonZadarmaPbxCallFragmentDoc}`;

/**
 * __useZadarmaPbxCallsQuery__
 *
 * To run a query within a React component, call `useZadarmaPbxCallsQuery` and pass it any options that fit your needs.
 * When your component renders, `useZadarmaPbxCallsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useZadarmaPbxCallsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useZadarmaPbxCallsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ZadarmaPbxCallsQuery, ZadarmaPbxCallsQueryVariables>) {
        return ApolloReactHooks.useQuery<ZadarmaPbxCallsQuery, ZadarmaPbxCallsQueryVariables>(ZadarmaPbxCallsDocument, baseOptions);
      }
export function useZadarmaPbxCallsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ZadarmaPbxCallsQuery, ZadarmaPbxCallsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ZadarmaPbxCallsQuery, ZadarmaPbxCallsQueryVariables>(ZadarmaPbxCallsDocument, baseOptions);
        }
export type ZadarmaPbxCallsQueryHookResult = ReturnType<typeof useZadarmaPbxCallsQuery>;
export type ZadarmaPbxCallsLazyQueryHookResult = ReturnType<typeof useZadarmaPbxCallsLazyQuery>;
export type ZadarmaPbxCallsQueryResult = ApolloReactCommon.QueryResult<ZadarmaPbxCallsQuery, ZadarmaPbxCallsQueryVariables>;
export const ZadarmaPbxCallDocument = gql`
    query ZadarmaPbxCall($pbx_call_id: ID!) {
  pbxCall: zadarmaPbxCall(pbx_call_id: $pbx_call_id) {
    ...CommonZadarmaPbxCall
  }
}
    ${CommonZadarmaPbxCallFragmentDoc}`;

/**
 * __useZadarmaPbxCallQuery__
 *
 * To run a query within a React component, call `useZadarmaPbxCallQuery` and pass it any options that fit your needs.
 * When your component renders, `useZadarmaPbxCallQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useZadarmaPbxCallQuery({
 *   variables: {
 *      pbx_call_id: // value for 'pbx_call_id'
 *   },
 * });
 */
export function useZadarmaPbxCallQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ZadarmaPbxCallQuery, ZadarmaPbxCallQueryVariables>) {
        return ApolloReactHooks.useQuery<ZadarmaPbxCallQuery, ZadarmaPbxCallQueryVariables>(ZadarmaPbxCallDocument, baseOptions);
      }
export function useZadarmaPbxCallLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ZadarmaPbxCallQuery, ZadarmaPbxCallQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ZadarmaPbxCallQuery, ZadarmaPbxCallQueryVariables>(ZadarmaPbxCallDocument, baseOptions);
        }
export type ZadarmaPbxCallQueryHookResult = ReturnType<typeof useZadarmaPbxCallQuery>;
export type ZadarmaPbxCallLazyQueryHookResult = ReturnType<typeof useZadarmaPbxCallLazyQuery>;
export type ZadarmaPbxCallQueryResult = ApolloReactCommon.QueryResult<ZadarmaPbxCallQuery, ZadarmaPbxCallQueryVariables>;
export const ZadarmaSetMemberForPbxCallDocument = gql`
    mutation ZadarmaSetMemberForPbxCall($member_id: ID!, $pbx_call_id: ID!) {
  zadarmaSetMemberForPbxCall(member_id: $member_id, pbx_call_id: $pbx_call_id)
}
    `;
export type ZadarmaSetMemberForPbxCallMutationFn = ApolloReactCommon.MutationFunction<ZadarmaSetMemberForPbxCallMutation, ZadarmaSetMemberForPbxCallMutationVariables>;

/**
 * __useZadarmaSetMemberForPbxCallMutation__
 *
 * To run a mutation, you first call `useZadarmaSetMemberForPbxCallMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useZadarmaSetMemberForPbxCallMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [zadarmaSetMemberForPbxCallMutation, { data, loading, error }] = useZadarmaSetMemberForPbxCallMutation({
 *   variables: {
 *      member_id: // value for 'member_id'
 *      pbx_call_id: // value for 'pbx_call_id'
 *   },
 * });
 */
export function useZadarmaSetMemberForPbxCallMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ZadarmaSetMemberForPbxCallMutation, ZadarmaSetMemberForPbxCallMutationVariables>) {
        return ApolloReactHooks.useMutation<ZadarmaSetMemberForPbxCallMutation, ZadarmaSetMemberForPbxCallMutationVariables>(ZadarmaSetMemberForPbxCallDocument, baseOptions);
      }
export type ZadarmaSetMemberForPbxCallMutationHookResult = ReturnType<typeof useZadarmaSetMemberForPbxCallMutation>;
export type ZadarmaSetMemberForPbxCallMutationResult = ApolloReactCommon.MutationResult<ZadarmaSetMemberForPbxCallMutation>;
export type ZadarmaSetMemberForPbxCallMutationOptions = ApolloReactCommon.BaseMutationOptions<ZadarmaSetMemberForPbxCallMutation, ZadarmaSetMemberForPbxCallMutationVariables>;