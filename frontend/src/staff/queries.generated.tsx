import * as Types from '../apollo/gen-types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type StaffMemberFullFragment = (
  { __typename?: 'StaffMember' }
  & Pick<Types.StaffMember, 'id' | 'user_id' | 'full_name' | 'short_name' | 'email' | 'role' | 'color' | 'is_current' | 'slack_image' | 'slack_id' | 'vk'>
);

export type StaffMemberForPickerFragment = (
  { __typename?: 'StaffMember' }
  & Pick<Types.StaffMember, 'id' | 'user_id' | 'full_name' | 'short_name' | 'color'>
);

export type StaffMembersQueryVariables = {};


export type StaffMembersQuery = (
  { __typename?: 'Query' }
  & { staffMembersAll: Array<(
    { __typename?: 'StaffMember' }
    & StaffMemberFullFragment
  )> }
);

export type StaffMembersForPickerQueryVariables = {};


export type StaffMembersForPickerQuery = (
  { __typename?: 'Query' }
  & { members: Array<(
    { __typename?: 'StaffMember' }
    & StaffMemberForPickerFragment
  )> }
);

export type StaffMemberQueryVariables = {
  id: Types.Scalars['ID']
};


export type StaffMemberQuery = (
  { __typename?: 'Query' }
  & { staffMember: (
    { __typename?: 'StaffMember' }
    & StaffMemberFullFragment
  ) }
);

export type StaffGrantGooglePermissionsToMemberMutationVariables = {
  id: Types.Scalars['ID']
};


export type StaffGrantGooglePermissionsToMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'staffGrantGooglePermissionsToMember'>
);

export type StaffFireMemberMutationVariables = {
  id: Types.Scalars['ID']
};


export type StaffFireMemberMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'staffFireMember'>
);

export const StaffMemberFullFragmentDoc = gql`
    fragment StaffMemberFull on StaffMember {
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
export const StaffMemberForPickerFragmentDoc = gql`
    fragment StaffMemberForPicker on StaffMember {
  id
  user_id
  full_name
  short_name
  color
}
    `;
export const StaffMembersDocument = gql`
    query StaffMembers {
  staffMembersAll {
    ...StaffMemberFull
  }
}
    ${StaffMemberFullFragmentDoc}`;

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
export const StaffMembersForPickerDocument = gql`
    query StaffMembersForPicker {
  members: staffMembersAll {
    ...StaffMemberForPicker
  }
}
    ${StaffMemberForPickerFragmentDoc}`;

/**
 * __useStaffMembersForPickerQuery__
 *
 * To run a query within a React component, call `useStaffMembersForPickerQuery` and pass it any options that fit your needs.
 * When your component renders, `useStaffMembersForPickerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStaffMembersForPickerQuery({
 *   variables: {
 *   },
 * });
 */
export function useStaffMembersForPickerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<StaffMembersForPickerQuery, StaffMembersForPickerQueryVariables>) {
        return ApolloReactHooks.useQuery<StaffMembersForPickerQuery, StaffMembersForPickerQueryVariables>(StaffMembersForPickerDocument, baseOptions);
      }
export function useStaffMembersForPickerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<StaffMembersForPickerQuery, StaffMembersForPickerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<StaffMembersForPickerQuery, StaffMembersForPickerQueryVariables>(StaffMembersForPickerDocument, baseOptions);
        }
export type StaffMembersForPickerQueryHookResult = ReturnType<typeof useStaffMembersForPickerQuery>;
export type StaffMembersForPickerLazyQueryHookResult = ReturnType<typeof useStaffMembersForPickerLazyQuery>;
export type StaffMembersForPickerQueryResult = ApolloReactCommon.QueryResult<StaffMembersForPickerQuery, StaffMembersForPickerQueryVariables>;
export const StaffMemberDocument = gql`
    query StaffMember($id: ID!) {
  staffMember(id: $id) {
    ...StaffMemberFull
  }
}
    ${StaffMemberFullFragmentDoc}`;

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