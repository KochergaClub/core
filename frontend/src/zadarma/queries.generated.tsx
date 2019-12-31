import * as Types from '../apollo/gen-types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type CommonZadarmaPbxCallFragment = (
  { __typename?: 'ZadarmaPbxCall' }
  & Pick<Types.ZadarmaPbxCall, 'pbx_call_id' | 'ts'>
  & { calls: Array<(
    { __typename?: 'ZadarmaCall' }
    & Pick<Types.ZadarmaCall, 'call_id' | 'ts' | 'call_type' | 'destination' | 'disposition' | 'clid' | 'sip' | 'record' | 'watchman'>
  )>, data: Types.Maybe<(
    { __typename?: 'ZadarmaData' }
    & { staff_member: Types.Maybe<(
      { __typename?: 'StaffMember' }
      & Pick<Types.StaffMember, 'color' | 'short_name'>
    )> }
  )> }
);

export type ZadarmaPbxCallsQueryVariables = {
  before?: Types.Maybe<Types.Scalars['String']>,
  after?: Types.Maybe<Types.Scalars['String']>
};


export type ZadarmaPbxCallsQuery = (
  { __typename?: 'Query' }
  & { pbxCalls: (
    { __typename?: 'ZadarmaPbxCallConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ), edges: Array<(
      { __typename?: 'ZadarmaPbxCallEdge' }
      & { node: (
        { __typename?: 'ZadarmaPbxCall' }
        & CommonZadarmaPbxCallFragment
      ) }
    )> }
  ) }
);

export type ZadarmaPbxCallQueryVariables = {
  pbx_call_id: Types.Scalars['ID']
};


export type ZadarmaPbxCallQuery = (
  { __typename?: 'Query' }
  & { pbxCall: (
    { __typename?: 'ZadarmaPbxCall' }
    & CommonZadarmaPbxCallFragment
  ) }
);

export type ZadarmaSetMemberForPbxCallMutationVariables = {
  member_id: Types.Scalars['ID'],
  pbx_call_id: Types.Scalars['ID']
};


export type ZadarmaSetMemberForPbxCallMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'zadarmaSetMemberForPbxCall'>
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
    query ZadarmaPbxCalls($before: String, $after: String) {
  pbxCalls: zadarmaPbxCalls(before: $before, after: $after) {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      node {
        ...CommonZadarmaPbxCall
      }
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
 *      before: // value for 'before'
 *      after: // value for 'after'
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