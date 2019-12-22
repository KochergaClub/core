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

export type MemberFragment = (
  { __typename?: 'StaffMember' }
  & Pick<StaffMember, 'id' | 'user_id' | 'full_name' | 'short_name' | 'email' | 'role' | 'color' | 'is_current' | 'slack_image' | 'slack_id' | 'vk'>
);

export type StaffMembersQueryVariables = {};


export type StaffMembersQuery = (
  { __typename?: 'Query' }
  & { staffMembersAll: Array<(
    { __typename?: 'StaffMember' }
    & MemberFragment
  )> }
);

export type StaffMemberQueryVariables = {
  id: Scalars['ID']
};


export type StaffMemberQuery = (
  { __typename?: 'Query' }
  & { staffMember: (
    { __typename?: 'StaffMember' }
    & MemberFragment
  ) }
);

export type StaffGrantGooglePermissionsToMemberMutationVariables = {
  id: Scalars['ID']
};


export type StaffGrantGooglePermissionsToMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'staffGrantGooglePermissionsToMember'>
);

export type StaffFireMemberMutationVariables = {
  id: Scalars['ID']
};


export type StaffFireMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'staffFireMember'>
);

export const MemberFragmentDoc = gql`
    fragment Member on StaffMember {
  id
  user_id
  full_name
  short_name
  email
  role
  color
  is_current
  slack_image
  slack_id
  vk
}
    `;
export const StaffMembersDocument = gql`
    query StaffMembers {
  staffMembersAll {
    ...Member
  }
}
    ${MemberFragmentDoc}`;

/**
 * __useStaffMembersQuery__
 *
 * To run a query within a React component, call `useStaffMembersQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffMembersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffMembersQuery({
 *   variables: {
 *   },
 * });
 */
export function useStaffMembersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<StaffMembersQuery, StaffMembersQueryVariables>) {
        return ApolloReactHooks.useQuery<StaffMembersQuery, StaffMembersQueryVariables>(StaffMembersDocument, baseOptions);
      }
export function useStaffMembersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StaffMembersQuery, StaffMembersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<StaffMembersQuery, StaffMembersQueryVariables>(StaffMembersDocument, baseOptions);
        }
export type StaffMembersQueryHookResult = ReturnType<typeof useStaffMembersQuery>;
export type StaffMembersLazyQueryHookResult = ReturnType<typeof useStaffMembersLazyQuery>;
export type StaffMembersQueryResult = ApolloReactCommon.QueryResult<StaffMembersQuery, StaffMembersQueryVariables>;
export const StaffMemberDocument = gql`
    query StaffMember($id: ID!) {
  staffMember(id: $id) {
    ...Member
  }
}
    ${MemberFragmentDoc}`;

/**
 * __useStaffMemberQuery__
 *
 * To run a query within a React component, call `useStaffMemberQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffMemberQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffMemberQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStaffMemberQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<StaffMemberQuery, StaffMemberQueryVariables>) {
        return ApolloReactHooks.useQuery<StaffMemberQuery, StaffMemberQueryVariables>(StaffMemberDocument, baseOptions);
      }
export function useStaffMemberLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StaffMemberQuery, StaffMemberQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<StaffMemberQuery, StaffMemberQueryVariables>(StaffMemberDocument, baseOptions);
        }
export type StaffMemberQueryHookResult = ReturnType<typeof useStaffMemberQuery>;
export type StaffMemberLazyQueryHookResult = ReturnType<typeof useStaffMemberLazyQuery>;
export type StaffMemberQueryResult = ApolloReactCommon.QueryResult<StaffMemberQuery, StaffMemberQueryVariables>;
export const StaffGrantGooglePermissionsToMemberDocument = gql`
    mutation StaffGrantGooglePermissionsToMember($id: ID!) {
  staffGrantGooglePermissionsToMember(id: $id)
}
    `;
export type StaffGrantGooglePermissionsToMemberMutationFn = ApolloReactCommon.MutationFunction<StaffGrantGooglePermissionsToMemberMutation, StaffGrantGooglePermissionsToMemberMutationVariables>;

/**
 * __useStaffGrantGooglePermissionsToMemberMutation__
 *
 * To run a mutation, you first call `useStaffGrantGooglePermissionsToMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStaffGrantGooglePermissionsToMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [staffGrantGooglePermissionsToMemberMutation, { data, loading, error }] = useStaffGrantGooglePermissionsToMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStaffGrantGooglePermissionsToMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StaffGrantGooglePermissionsToMemberMutation, StaffGrantGooglePermissionsToMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<StaffGrantGooglePermissionsToMemberMutation, StaffGrantGooglePermissionsToMemberMutationVariables>(StaffGrantGooglePermissionsToMemberDocument, baseOptions);
      }
export type StaffGrantGooglePermissionsToMemberMutationHookResult = ReturnType<typeof useStaffGrantGooglePermissionsToMemberMutation>;
export type StaffGrantGooglePermissionsToMemberMutationResult = ApolloReactCommon.MutationResult<StaffGrantGooglePermissionsToMemberMutation>;
export type StaffGrantGooglePermissionsToMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<StaffGrantGooglePermissionsToMemberMutation, StaffGrantGooglePermissionsToMemberMutationVariables>;
export const StaffFireMemberDocument = gql`
    mutation StaffFireMember($id: ID!) {
  staffFireMember(id: $id)
}
    `;
export type StaffFireMemberMutationFn = ApolloReactCommon.MutationFunction<StaffFireMemberMutation, StaffFireMemberMutationVariables>;

/**
 * __useStaffFireMemberMutation__
 *
 * To run a mutation, you first call `useStaffFireMemberMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStaffFireMemberMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [staffFireMemberMutation, { data, loading, error }] = useStaffFireMemberMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStaffFireMemberMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<StaffFireMemberMutation, StaffFireMemberMutationVariables>) {
        return ApolloReactHooks.useMutation<StaffFireMemberMutation, StaffFireMemberMutationVariables>(StaffFireMemberDocument, baseOptions);
      }
export type StaffFireMemberMutationHookResult = ReturnType<typeof useStaffFireMemberMutation>;
export type StaffFireMemberMutationResult = ApolloReactCommon.MutationResult<StaffFireMemberMutation>;
export type StaffFireMemberMutationOptions = ApolloReactCommon.BaseMutationOptions<StaffFireMemberMutation, StaffFireMemberMutationVariables>;