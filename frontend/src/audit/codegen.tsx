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

export type MaybeStaffUserFragment = (
  { __typename?: 'AuthUser' }
  & Pick<AuthUser, 'id' | 'email'>
  & { staff_member: Maybe<(
    { __typename?: 'StaffMember' }
    & Pick<StaffMember, 'id' | 'full_name'>
  )> }
);

export type AuthGroupsQueryVariables = {};


export type AuthGroupsQuery = (
  { __typename?: 'Query' }
  & { groups: Array<(
    { __typename?: 'AuthGroup' }
    & Pick<AuthGroup, 'id' | 'name'>
    & { permissions: Array<(
      { __typename?: 'AuthPermission' }
      & Pick<AuthPermission, 'id' | 'name'>
    )>, users: Array<(
      { __typename?: 'AuthUser' }
      & MaybeStaffUserFragment
    )> }
  )> }
);

export type AuthAddUserToGroupMutationVariables = {
  user_id: Scalars['ID'],
  group_id: Scalars['ID']
};


export type AuthAddUserToGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'authAddUserToGroup'>
);

export type AuthRemoveUserFromGroupMutationVariables = {
  user_id: Scalars['ID'],
  group_id: Scalars['ID']
};


export type AuthRemoveUserFromGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'authRemoveUserFromGroup'>
);

export type AuthPermissionsQueryVariables = {};


export type AuthPermissionsQuery = (
  { __typename?: 'Query' }
  & { permissions: Array<(
    { __typename?: 'AuthPermission' }
    & Pick<AuthPermission, 'id' | 'name'>
    & { users: Array<(
      { __typename?: 'AuthUser' }
      & MaybeStaffUserFragment
    )> }
  )> }
);

export const MaybeStaffUserFragmentDoc = gql`
    fragment MaybeStaffUser on AuthUser {
  id
  email
  staff_member {
    id
    full_name
  }
}
    `;
export const AuthGroupsDocument = gql`
    query AuthGroups {
  groups: authGroupsAll {
    id
    name
    permissions {
      id
      name
    }
    users {
      ...MaybeStaffUser
    }
  }
}
    ${MaybeStaffUserFragmentDoc}`;

/**
 * __useAuthGroupsQuery__
 *
 * To run a query within a React component, call `useAuthGroupsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthGroupsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthGroupsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthGroupsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthGroupsQuery, AuthGroupsQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthGroupsQuery, AuthGroupsQueryVariables>(AuthGroupsDocument, baseOptions);
      }
export function useAuthGroupsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthGroupsQuery, AuthGroupsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthGroupsQuery, AuthGroupsQueryVariables>(AuthGroupsDocument, baseOptions);
        }
export type AuthGroupsQueryHookResult = ReturnType<typeof useAuthGroupsQuery>;
export type AuthGroupsLazyQueryHookResult = ReturnType<typeof useAuthGroupsLazyQuery>;
export type AuthGroupsQueryResult = ApolloReactCommon.QueryResult<AuthGroupsQuery, AuthGroupsQueryVariables>;
export const AuthAddUserToGroupDocument = gql`
    mutation AuthAddUserToGroup($user_id: ID!, $group_id: ID!) {
  authAddUserToGroup(user_id: $user_id, group_id: $group_id)
}
    `;
export type AuthAddUserToGroupMutationFn = ApolloReactCommon.MutationFunction<AuthAddUserToGroupMutation, AuthAddUserToGroupMutationVariables>;

/**
 * __useAuthAddUserToGroupMutation__
 *
 * To run a mutation, you first call `useAuthAddUserToGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthAddUserToGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authAddUserToGroupMutation, { data, loading, error }] = useAuthAddUserToGroupMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      group_id: // value for 'group_id'
 *   },
 * });
 */
export function useAuthAddUserToGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthAddUserToGroupMutation, AuthAddUserToGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthAddUserToGroupMutation, AuthAddUserToGroupMutationVariables>(AuthAddUserToGroupDocument, baseOptions);
      }
export type AuthAddUserToGroupMutationHookResult = ReturnType<typeof useAuthAddUserToGroupMutation>;
export type AuthAddUserToGroupMutationResult = ApolloReactCommon.MutationResult<AuthAddUserToGroupMutation>;
export type AuthAddUserToGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthAddUserToGroupMutation, AuthAddUserToGroupMutationVariables>;
export const AuthRemoveUserFromGroupDocument = gql`
    mutation AuthRemoveUserFromGroup($user_id: ID!, $group_id: ID!) {
  authRemoveUserFromGroup(user_id: $user_id, group_id: $group_id)
}
    `;
export type AuthRemoveUserFromGroupMutationFn = ApolloReactCommon.MutationFunction<AuthRemoveUserFromGroupMutation, AuthRemoveUserFromGroupMutationVariables>;

/**
 * __useAuthRemoveUserFromGroupMutation__
 *
 * To run a mutation, you first call `useAuthRemoveUserFromGroupMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAuthRemoveUserFromGroupMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [authRemoveUserFromGroupMutation, { data, loading, error }] = useAuthRemoveUserFromGroupMutation({
 *   variables: {
 *      user_id: // value for 'user_id'
 *      group_id: // value for 'group_id'
 *   },
 * });
 */
export function useAuthRemoveUserFromGroupMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AuthRemoveUserFromGroupMutation, AuthRemoveUserFromGroupMutationVariables>) {
        return ApolloReactHooks.useMutation<AuthRemoveUserFromGroupMutation, AuthRemoveUserFromGroupMutationVariables>(AuthRemoveUserFromGroupDocument, baseOptions);
      }
export type AuthRemoveUserFromGroupMutationHookResult = ReturnType<typeof useAuthRemoveUserFromGroupMutation>;
export type AuthRemoveUserFromGroupMutationResult = ApolloReactCommon.MutationResult<AuthRemoveUserFromGroupMutation>;
export type AuthRemoveUserFromGroupMutationOptions = ApolloReactCommon.BaseMutationOptions<AuthRemoveUserFromGroupMutation, AuthRemoveUserFromGroupMutationVariables>;
export const AuthPermissionsDocument = gql`
    query AuthPermissions {
  permissions: authPermissionsAll {
    id
    name
    users {
      ...MaybeStaffUser
    }
  }
}
    ${MaybeStaffUserFragmentDoc}`;

/**
 * __useAuthPermissionsQuery__
 *
 * To run a query within a React component, call `useAuthPermissionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthPermissionsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthPermissionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthPermissionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AuthPermissionsQuery, AuthPermissionsQueryVariables>) {
        return ApolloReactHooks.useQuery<AuthPermissionsQuery, AuthPermissionsQueryVariables>(AuthPermissionsDocument, baseOptions);
      }
export function useAuthPermissionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AuthPermissionsQuery, AuthPermissionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<AuthPermissionsQuery, AuthPermissionsQueryVariables>(AuthPermissionsDocument, baseOptions);
        }
export type AuthPermissionsQueryHookResult = ReturnType<typeof useAuthPermissionsQuery>;
export type AuthPermissionsLazyQueryHookResult = ReturnType<typeof useAuthPermissionsLazyQuery>;
export type AuthPermissionsQueryResult = ApolloReactCommon.QueryResult<AuthPermissionsQuery, AuthPermissionsQueryVariables>;