import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type WatchmanFragment = (
  { __typename?: 'WatchmenWatchman' }
  & Pick<Types.WatchmenWatchman, 'id' | 'priority'>
  & { grade?: Types.Maybe<(
    { __typename?: 'WatchmenGrade' }
    & Pick<Types.WatchmenGrade, 'id' | 'code'>
  )>, member: (
    { __typename?: 'StaffMember' }
    & Pick<Types.StaffMember, 'id' | 'short_name'>
  ) }
);

export type WatchmanForPickerFragment = (
  { __typename?: 'WatchmenWatchman' }
  & Pick<Types.WatchmenWatchman, 'id' | 'priority'>
  & { member: (
    { __typename?: 'StaffMember' }
    & Pick<Types.StaffMember, 'id' | 'short_name' | 'color'>
  ) }
);

export type GradeFragment = (
  { __typename?: 'WatchmenGrade' }
  & Pick<Types.WatchmenGrade, 'id' | 'code' | 'multiplier'>
);

export type ShiftFragment = (
  { __typename?: 'WatchmenShift' }
  & Pick<Types.WatchmenShift, 'date' | 'shift' | 'is_night'>
  & { watchman?: Types.Maybe<(
    { __typename?: 'WatchmenWatchman' }
    & WatchmanForPickerFragment
  )> }
);

export type WatchmenWatchmenListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WatchmenWatchmenListQuery = (
  { __typename?: 'Query' }
  & { watchmen: Array<(
    { __typename?: 'WatchmenWatchman' }
    & WatchmanFragment
  )> }
);

export type WatchmenWatchmenListForPickerQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WatchmenWatchmenListForPickerQuery = (
  { __typename?: 'Query' }
  & { watchmen: Array<(
    { __typename?: 'WatchmenWatchman' }
    & WatchmanForPickerFragment
  )> }
);

export type WatchmenGradesListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WatchmenGradesListQuery = (
  { __typename?: 'Query' }
  & { grades: Array<(
    { __typename?: 'WatchmenGrade' }
    & GradeFragment
  )> }
);

export type WatchmenShiftsQueryVariables = Types.Exact<{
  from_date: Types.Scalars['String'];
  to_date: Types.Scalars['String'];
}>;


export type WatchmenShiftsQuery = (
  { __typename?: 'Query' }
  & { shifts: Array<(
    { __typename?: 'WatchmenShift' }
    & ShiftFragment
  )> }
);

export type WatchmenSetWatchmanPriorityMutationVariables = Types.Exact<{
  params: Types.WatchmenSetWatchmanPriorityInput;
}>;


export type WatchmenSetWatchmanPriorityMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'watchmenSetWatchmanPriority'>
);

export type WatchmenSetWatchmanGradeMutationVariables = Types.Exact<{
  params: Types.WatchmenSetWatchmanGradeInput;
}>;


export type WatchmenSetWatchmanGradeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'watchmenSetWatchmanGrade'>
);

export type WatchmenCreateWatchmanMutationVariables = Types.Exact<{
  params: Types.WatchmenCreateWatchmanInput;
}>;


export type WatchmenCreateWatchmanMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'watchmenCreateWatchman'>
);

export type WatchmenUpdateShiftMutationVariables = Types.Exact<{
  params: Types.WatchmenUpdateShiftInput;
}>;


export type WatchmenUpdateShiftMutation = (
  { __typename?: 'Mutation' }
  & { shift: (
    { __typename?: 'WatchmenShift' }
    & ShiftFragment
  ) }
);

export const WatchmanFragmentDoc = gql`
    fragment Watchman on WatchmenWatchman {
  id
  priority
  grade {
    id
    code
  }
  member {
    id
    short_name
  }
}
    `;
export const GradeFragmentDoc = gql`
    fragment Grade on WatchmenGrade {
  id
  code
  multiplier
}
    `;
export const WatchmanForPickerFragmentDoc = gql`
    fragment WatchmanForPicker on WatchmenWatchman {
  id
  priority
  member {
    id
    short_name
    color
  }
}
    `;
export const ShiftFragmentDoc = gql`
    fragment Shift on WatchmenShift {
  date
  shift
  watchman {
    ...WatchmanForPicker
  }
  is_night
}
    ${WatchmanForPickerFragmentDoc}`;
export const WatchmenWatchmenListDocument = gql`
    query WatchmenWatchmenList {
  watchmen: watchmenWatchmenAll(currentStaff: true) {
    ...Watchman
  }
}
    ${WatchmanFragmentDoc}`;

/**
 * __useWatchmenWatchmenListQuery__
 *
 * To run a query within a React component, call `useWatchmenWatchmenListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWatchmenWatchmenListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchmenWatchmenListQuery({
 *   variables: {
 *   },
 * });
 */
export function useWatchmenWatchmenListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WatchmenWatchmenListQuery, WatchmenWatchmenListQueryVariables>) {
        return ApolloReactHooks.useQuery<WatchmenWatchmenListQuery, WatchmenWatchmenListQueryVariables>(WatchmenWatchmenListDocument, baseOptions);
      }
export function useWatchmenWatchmenListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WatchmenWatchmenListQuery, WatchmenWatchmenListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WatchmenWatchmenListQuery, WatchmenWatchmenListQueryVariables>(WatchmenWatchmenListDocument, baseOptions);
        }
export type WatchmenWatchmenListQueryHookResult = ReturnType<typeof useWatchmenWatchmenListQuery>;
export type WatchmenWatchmenListLazyQueryHookResult = ReturnType<typeof useWatchmenWatchmenListLazyQuery>;
export type WatchmenWatchmenListQueryResult = ApolloReactCommon.QueryResult<WatchmenWatchmenListQuery, WatchmenWatchmenListQueryVariables>;
export const WatchmenWatchmenListForPickerDocument = gql`
    query WatchmenWatchmenListForPicker {
  watchmen: watchmenWatchmenAll(currentStaff: true, currentRole: true) {
    ...WatchmanForPicker
  }
}
    ${WatchmanForPickerFragmentDoc}`;

/**
 * __useWatchmenWatchmenListForPickerQuery__
 *
 * To run a query within a React component, call `useWatchmenWatchmenListForPickerQuery` and pass it any options that fit your needs.
 * When your component renders, `useWatchmenWatchmenListForPickerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchmenWatchmenListForPickerQuery({
 *   variables: {
 *   },
 * });
 */
export function useWatchmenWatchmenListForPickerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WatchmenWatchmenListForPickerQuery, WatchmenWatchmenListForPickerQueryVariables>) {
        return ApolloReactHooks.useQuery<WatchmenWatchmenListForPickerQuery, WatchmenWatchmenListForPickerQueryVariables>(WatchmenWatchmenListForPickerDocument, baseOptions);
      }
export function useWatchmenWatchmenListForPickerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WatchmenWatchmenListForPickerQuery, WatchmenWatchmenListForPickerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WatchmenWatchmenListForPickerQuery, WatchmenWatchmenListForPickerQueryVariables>(WatchmenWatchmenListForPickerDocument, baseOptions);
        }
export type WatchmenWatchmenListForPickerQueryHookResult = ReturnType<typeof useWatchmenWatchmenListForPickerQuery>;
export type WatchmenWatchmenListForPickerLazyQueryHookResult = ReturnType<typeof useWatchmenWatchmenListForPickerLazyQuery>;
export type WatchmenWatchmenListForPickerQueryResult = ApolloReactCommon.QueryResult<WatchmenWatchmenListForPickerQuery, WatchmenWatchmenListForPickerQueryVariables>;
export const WatchmenGradesListDocument = gql`
    query WatchmenGradesList {
  grades: watchmenGradesAll {
    ...Grade
  }
}
    ${GradeFragmentDoc}`;

/**
 * __useWatchmenGradesListQuery__
 *
 * To run a query within a React component, call `useWatchmenGradesListQuery` and pass it any options that fit your needs.
 * When your component renders, `useWatchmenGradesListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchmenGradesListQuery({
 *   variables: {
 *   },
 * });
 */
export function useWatchmenGradesListQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WatchmenGradesListQuery, WatchmenGradesListQueryVariables>) {
        return ApolloReactHooks.useQuery<WatchmenGradesListQuery, WatchmenGradesListQueryVariables>(WatchmenGradesListDocument, baseOptions);
      }
export function useWatchmenGradesListLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WatchmenGradesListQuery, WatchmenGradesListQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WatchmenGradesListQuery, WatchmenGradesListQueryVariables>(WatchmenGradesListDocument, baseOptions);
        }
export type WatchmenGradesListQueryHookResult = ReturnType<typeof useWatchmenGradesListQuery>;
export type WatchmenGradesListLazyQueryHookResult = ReturnType<typeof useWatchmenGradesListLazyQuery>;
export type WatchmenGradesListQueryResult = ApolloReactCommon.QueryResult<WatchmenGradesListQuery, WatchmenGradesListQueryVariables>;
export const WatchmenShiftsDocument = gql`
    query WatchmenShifts($from_date: String!, $to_date: String!) {
  shifts: watchmenShifts(from_date: $from_date, to_date: $to_date) {
    ...Shift
  }
}
    ${ShiftFragmentDoc}`;

/**
 * __useWatchmenShiftsQuery__
 *
 * To run a query within a React component, call `useWatchmenShiftsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWatchmenShiftsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWatchmenShiftsQuery({
 *   variables: {
 *      from_date: // value for 'from_date'
 *      to_date: // value for 'to_date'
 *   },
 * });
 */
export function useWatchmenShiftsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WatchmenShiftsQuery, WatchmenShiftsQueryVariables>) {
        return ApolloReactHooks.useQuery<WatchmenShiftsQuery, WatchmenShiftsQueryVariables>(WatchmenShiftsDocument, baseOptions);
      }
export function useWatchmenShiftsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WatchmenShiftsQuery, WatchmenShiftsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WatchmenShiftsQuery, WatchmenShiftsQueryVariables>(WatchmenShiftsDocument, baseOptions);
        }
export type WatchmenShiftsQueryHookResult = ReturnType<typeof useWatchmenShiftsQuery>;
export type WatchmenShiftsLazyQueryHookResult = ReturnType<typeof useWatchmenShiftsLazyQuery>;
export type WatchmenShiftsQueryResult = ApolloReactCommon.QueryResult<WatchmenShiftsQuery, WatchmenShiftsQueryVariables>;
export const WatchmenSetWatchmanPriorityDocument = gql`
    mutation WatchmenSetWatchmanPriority($params: WatchmenSetWatchmanPriorityInput!) {
  watchmenSetWatchmanPriority(params: $params)
}
    `;
export type WatchmenSetWatchmanPriorityMutationFn = ApolloReactCommon.MutationFunction<WatchmenSetWatchmanPriorityMutation, WatchmenSetWatchmanPriorityMutationVariables>;

/**
 * __useWatchmenSetWatchmanPriorityMutation__
 *
 * To run a mutation, you first call `useWatchmenSetWatchmanPriorityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWatchmenSetWatchmanPriorityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [watchmenSetWatchmanPriorityMutation, { data, loading, error }] = useWatchmenSetWatchmanPriorityMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useWatchmenSetWatchmanPriorityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<WatchmenSetWatchmanPriorityMutation, WatchmenSetWatchmanPriorityMutationVariables>) {
        return ApolloReactHooks.useMutation<WatchmenSetWatchmanPriorityMutation, WatchmenSetWatchmanPriorityMutationVariables>(WatchmenSetWatchmanPriorityDocument, baseOptions);
      }
export type WatchmenSetWatchmanPriorityMutationHookResult = ReturnType<typeof useWatchmenSetWatchmanPriorityMutation>;
export type WatchmenSetWatchmanPriorityMutationResult = ApolloReactCommon.MutationResult<WatchmenSetWatchmanPriorityMutation>;
export type WatchmenSetWatchmanPriorityMutationOptions = ApolloReactCommon.BaseMutationOptions<WatchmenSetWatchmanPriorityMutation, WatchmenSetWatchmanPriorityMutationVariables>;
export const WatchmenSetWatchmanGradeDocument = gql`
    mutation WatchmenSetWatchmanGrade($params: WatchmenSetWatchmanGradeInput!) {
  watchmenSetWatchmanGrade(params: $params)
}
    `;
export type WatchmenSetWatchmanGradeMutationFn = ApolloReactCommon.MutationFunction<WatchmenSetWatchmanGradeMutation, WatchmenSetWatchmanGradeMutationVariables>;

/**
 * __useWatchmenSetWatchmanGradeMutation__
 *
 * To run a mutation, you first call `useWatchmenSetWatchmanGradeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWatchmenSetWatchmanGradeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [watchmenSetWatchmanGradeMutation, { data, loading, error }] = useWatchmenSetWatchmanGradeMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useWatchmenSetWatchmanGradeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<WatchmenSetWatchmanGradeMutation, WatchmenSetWatchmanGradeMutationVariables>) {
        return ApolloReactHooks.useMutation<WatchmenSetWatchmanGradeMutation, WatchmenSetWatchmanGradeMutationVariables>(WatchmenSetWatchmanGradeDocument, baseOptions);
      }
export type WatchmenSetWatchmanGradeMutationHookResult = ReturnType<typeof useWatchmenSetWatchmanGradeMutation>;
export type WatchmenSetWatchmanGradeMutationResult = ApolloReactCommon.MutationResult<WatchmenSetWatchmanGradeMutation>;
export type WatchmenSetWatchmanGradeMutationOptions = ApolloReactCommon.BaseMutationOptions<WatchmenSetWatchmanGradeMutation, WatchmenSetWatchmanGradeMutationVariables>;
export const WatchmenCreateWatchmanDocument = gql`
    mutation WatchmenCreateWatchman($params: WatchmenCreateWatchmanInput!) {
  watchmenCreateWatchman(params: $params)
}
    `;
export type WatchmenCreateWatchmanMutationFn = ApolloReactCommon.MutationFunction<WatchmenCreateWatchmanMutation, WatchmenCreateWatchmanMutationVariables>;

/**
 * __useWatchmenCreateWatchmanMutation__
 *
 * To run a mutation, you first call `useWatchmenCreateWatchmanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWatchmenCreateWatchmanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [watchmenCreateWatchmanMutation, { data, loading, error }] = useWatchmenCreateWatchmanMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useWatchmenCreateWatchmanMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<WatchmenCreateWatchmanMutation, WatchmenCreateWatchmanMutationVariables>) {
        return ApolloReactHooks.useMutation<WatchmenCreateWatchmanMutation, WatchmenCreateWatchmanMutationVariables>(WatchmenCreateWatchmanDocument, baseOptions);
      }
export type WatchmenCreateWatchmanMutationHookResult = ReturnType<typeof useWatchmenCreateWatchmanMutation>;
export type WatchmenCreateWatchmanMutationResult = ApolloReactCommon.MutationResult<WatchmenCreateWatchmanMutation>;
export type WatchmenCreateWatchmanMutationOptions = ApolloReactCommon.BaseMutationOptions<WatchmenCreateWatchmanMutation, WatchmenCreateWatchmanMutationVariables>;
export const WatchmenUpdateShiftDocument = gql`
    mutation WatchmenUpdateShift($params: WatchmenUpdateShiftInput!) {
  shift: watchmenUpdateShift(params: $params) {
    ...Shift
  }
}
    ${ShiftFragmentDoc}`;
export type WatchmenUpdateShiftMutationFn = ApolloReactCommon.MutationFunction<WatchmenUpdateShiftMutation, WatchmenUpdateShiftMutationVariables>;

/**
 * __useWatchmenUpdateShiftMutation__
 *
 * To run a mutation, you first call `useWatchmenUpdateShiftMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWatchmenUpdateShiftMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [watchmenUpdateShiftMutation, { data, loading, error }] = useWatchmenUpdateShiftMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useWatchmenUpdateShiftMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<WatchmenUpdateShiftMutation, WatchmenUpdateShiftMutationVariables>) {
        return ApolloReactHooks.useMutation<WatchmenUpdateShiftMutation, WatchmenUpdateShiftMutationVariables>(WatchmenUpdateShiftDocument, baseOptions);
      }
export type WatchmenUpdateShiftMutationHookResult = ReturnType<typeof useWatchmenUpdateShiftMutation>;
export type WatchmenUpdateShiftMutationResult = ApolloReactCommon.MutationResult<WatchmenUpdateShiftMutation>;
export type WatchmenUpdateShiftMutationOptions = ApolloReactCommon.BaseMutationOptions<WatchmenUpdateShiftMutation, WatchmenUpdateShiftMutationVariables>;