import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type PaymentFragment = (
  { __typename?: 'CashierPayment' }
  & Pick<Types.CashierPayment, 'id' | 'amount' | 'comment' | 'is_redeemed' | 'created_dt' | 'redeem_dt'>
  & { whom: (
    { __typename?: 'AuthUser' }
    & Pick<Types.AuthUser, 'id' | 'email'>
    & { staff_member?: Types.Maybe<(
      { __typename?: 'StaffMember' }
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
  { __typename?: 'Query' }
  & { payments: (
    { __typename?: 'CashierPaymentConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ), edges: Array<(
      { __typename?: 'CashierPaymentEdge' }
      & { node: (
        { __typename?: 'CashierPayment' }
        & PaymentFragment
      ) }
    )> }
  ) }
);

export type CashierCreatePaymentMutationVariables = Types.Exact<{
  params: Types.CashierCreatePaymentInput;
}>;


export type CashierCreatePaymentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'cashierCreatePayment'>
);

export type CashierRedeemPaymentMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type CashierRedeemPaymentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'cashierRedeemPayment'>
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
    query CashierPayments($before: String, $after: String, $first: Int, $last: Int) {
  payments: cashierPayments(before: $before, after: $after, first: $first, last: $last) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        ...Payment
      }
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
 *      before: // value for 'before'
 *      after: // value for 'after'
 *      first: // value for 'first'
 *      last: // value for 'last'
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