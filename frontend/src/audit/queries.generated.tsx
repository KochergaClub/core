import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type MaybeStaffUserFragment = (
  { __typename?: 'AuthUser' }
  & Pick<Types.AuthUser, 'id' | 'email'>
  & { staff_member?: Types.Maybe<(
    { __typename?: 'StaffMember' }
    & Pick<Types.StaffMember, 'id' | 'full_name'>
  )> }
);

export type AuthGroupsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AuthGroupsQuery = (
  { __typename?: 'Query' }
  & { groups: Array<(
    { __typename?: 'AuthGroup' }
    & Pick<Types.AuthGroup, 'id' | 'name'>
    & { permissions: Array<(
      { __typename?: 'AuthPermission' }
      & Pick<Types.AuthPermission, 'id' | 'name'>
    )>, users: Array<(
      { __typename?: 'AuthUser' }
      & MaybeStaffUserFragment
    )> }
  )> }
);

export type AuthAddUserToGroupMutationVariables = Types.Exact<{
  user_id: Types.Scalars['ID'];
  group_id: Types.Scalars['ID'];
}>;


export type AuthAddUserToGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'authAddUserToGroup'>
);

export type AuthRemoveUserFromGroupMutationVariables = Types.Exact<{
  user_id: Types.Scalars['ID'];
  group_id: Types.Scalars['ID'];
}>;


export type AuthRemoveUserFromGroupMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'authRemoveUserFromGroup'>
);

export type AuthPermissionsQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type AuthPermissionsQuery = (
  { __typename?: 'Query' }
  & { permissions: Array<(
    { __typename?: 'AuthPermission' }
    & Pick<Types.AuthPermission, 'id' | 'name'>
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