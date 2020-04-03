import * as Types from '../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type EventsPrototypeFragment = (
  { __typename?: 'EventsPrototype' }
  & Pick<Types.EventsPrototype, 'id' | 'title' | 'location' | 'active' | 'weekday' | 'hour' | 'minute' | 'length'>
  & { project: Types.Maybe<(
    { __typename?: 'ProjectPage' }
    & { meta: (
      { __typename?: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'slug'>
    ) }
  )> }
);

export type EventsPrototype_SummaryFragment = (
  { __typename?: 'EventsPrototype' }
  & Pick<Types.EventsPrototype, 'id' | 'title' | 'active' | 'weekday' | 'hour' | 'minute' | 'suggested_dates'>
);

export type EvenmanPrototypesQueryVariables = {
  suggested_until_ts: Types.Scalars['Int']
};


export type EvenmanPrototypesQuery = (
  { __typename?: 'Query' }
  & { prototypes: Array<(
    { __typename?: 'EventsPrototype' }
    & EventsPrototype_SummaryFragment
  )> }
);

export type EvenmanPrototypeQueryVariables = {
  id: Types.Scalars['ID']
};


export type EvenmanPrototypeQuery = (
  { __typename?: 'Query' }
  & { prototype: (
    { __typename?: 'EventsPrototype' }
    & EventsPrototypeFragment
  ) }
);

export type EvenmanPrototypeSetTitleMutationVariables = {
  id: Types.Scalars['ID'],
  title: Types.Scalars['String']
};


export type EvenmanPrototypeSetTitleMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
  ) }
);

export type EvenmanPrototypeSetLocationMutationVariables = {
  id: Types.Scalars['ID'],
  location: Types.Scalars['String']
};


export type EvenmanPrototypeSetLocationMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
  ) }
);

export type EvenmanPrototypeSetActiveMutationVariables = {
  id: Types.Scalars['ID'],
  active: Types.Scalars['Boolean']
};


export type EvenmanPrototypeSetActiveMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
  ) }
);

export type EvenmanPrototypeSetProjectMutationVariables = {
  id: Types.Scalars['ID'],
  project_slug: Types.Scalars['String']
};


export type EvenmanPrototypeSetProjectMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'EventPrototypeUpdateResult' }
    & Pick<Types.EventPrototypeUpdateResult, 'ok'>
  ) }
);

export const EventsPrototypeFragmentDoc = gql`
    fragment EventsPrototype on EventsPrototype {
  id
  title
  location
  active
  weekday
  hour
  minute
  length
  project {
    meta {
      slug
    }
  }
}
    `;
export const EventsPrototype_SummaryFragmentDoc = gql`
    fragment EventsPrototype_Summary on EventsPrototype {
  id
  title
  active
  weekday
  hour
  minute
  suggested_dates(until_ts: $suggested_until_ts, limit: 10)
}
    `;
export const EvenmanPrototypesDocument = gql`
    query EvenmanPrototypes($suggested_until_ts: Int!) {
  prototypes: eventsPrototypes {
    ...EventsPrototype_Summary
  }
}
    ${EventsPrototype_SummaryFragmentDoc}`;

/**
 * __useEvenmanPrototypesQuery__
 *
 * To run a query within a React component, call `useEvenmanPrototypesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanPrototypesQuery({
 *   variables: {
 *      suggested_until_ts: // value for 'suggested_until_ts'
 *   },
 * });
 */
export function useEvenmanPrototypesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanPrototypesQuery, EvenmanPrototypesQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanPrototypesQuery, EvenmanPrototypesQueryVariables>(EvenmanPrototypesDocument, baseOptions);
      }
export function useEvenmanPrototypesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanPrototypesQuery, EvenmanPrototypesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanPrototypesQuery, EvenmanPrototypesQueryVariables>(EvenmanPrototypesDocument, baseOptions);
        }
export type EvenmanPrototypesQueryHookResult = ReturnType<typeof useEvenmanPrototypesQuery>;
export type EvenmanPrototypesLazyQueryHookResult = ReturnType<typeof useEvenmanPrototypesLazyQuery>;
export type EvenmanPrototypesQueryResult = ApolloReactCommon.QueryResult<EvenmanPrototypesQuery, EvenmanPrototypesQueryVariables>;
export const EvenmanPrototypeDocument = gql`
    query EvenmanPrototype($id: ID!) {
  prototype: eventsPrototype(id: $id) {
    ...EventsPrototype
  }
}
    ${EventsPrototypeFragmentDoc}`;

/**
 * __useEvenmanPrototypeQuery__
 *
 * To run a query within a React component, call `useEvenmanPrototypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanPrototypeQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEvenmanPrototypeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanPrototypeQuery, EvenmanPrototypeQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanPrototypeQuery, EvenmanPrototypeQueryVariables>(EvenmanPrototypeDocument, baseOptions);
      }
export function useEvenmanPrototypeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanPrototypeQuery, EvenmanPrototypeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanPrototypeQuery, EvenmanPrototypeQueryVariables>(EvenmanPrototypeDocument, baseOptions);
        }
export type EvenmanPrototypeQueryHookResult = ReturnType<typeof useEvenmanPrototypeQuery>;
export type EvenmanPrototypeLazyQueryHookResult = ReturnType<typeof useEvenmanPrototypeLazyQuery>;
export type EvenmanPrototypeQueryResult = ApolloReactCommon.QueryResult<EvenmanPrototypeQuery, EvenmanPrototypeQueryVariables>;
export const EvenmanPrototypeSetTitleDocument = gql`
    mutation EvenmanPrototypeSetTitle($id: ID!, $title: String!) {
  result: eventPrototypeUpdate(input: {id: $id, title: $title}) {
    ok
  }
}
    `;
export type EvenmanPrototypeSetTitleMutationFn = ApolloReactCommon.MutationFunction<EvenmanPrototypeSetTitleMutation, EvenmanPrototypeSetTitleMutationVariables>;

/**
 * __useEvenmanPrototypeSetTitleMutation__
 *
 * To run a mutation, you first call `useEvenmanPrototypeSetTitleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeSetTitleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanPrototypeSetTitleMutation, { data, loading, error }] = useEvenmanPrototypeSetTitleMutation({
 *   variables: {
 *      id: // value for 'id'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useEvenmanPrototypeSetTitleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanPrototypeSetTitleMutation, EvenmanPrototypeSetTitleMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanPrototypeSetTitleMutation, EvenmanPrototypeSetTitleMutationVariables>(EvenmanPrototypeSetTitleDocument, baseOptions);
      }
export type EvenmanPrototypeSetTitleMutationHookResult = ReturnType<typeof useEvenmanPrototypeSetTitleMutation>;
export type EvenmanPrototypeSetTitleMutationResult = ApolloReactCommon.MutationResult<EvenmanPrototypeSetTitleMutation>;
export type EvenmanPrototypeSetTitleMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanPrototypeSetTitleMutation, EvenmanPrototypeSetTitleMutationVariables>;
export const EvenmanPrototypeSetLocationDocument = gql`
    mutation EvenmanPrototypeSetLocation($id: ID!, $location: String!) {
  result: eventPrototypeUpdate(input: {id: $id, location: $location}) {
    ok
  }
}
    `;
export type EvenmanPrototypeSetLocationMutationFn = ApolloReactCommon.MutationFunction<EvenmanPrototypeSetLocationMutation, EvenmanPrototypeSetLocationMutationVariables>;

/**
 * __useEvenmanPrototypeSetLocationMutation__
 *
 * To run a mutation, you first call `useEvenmanPrototypeSetLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeSetLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanPrototypeSetLocationMutation, { data, loading, error }] = useEvenmanPrototypeSetLocationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      location: // value for 'location'
 *   },
 * });
 */
export function useEvenmanPrototypeSetLocationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanPrototypeSetLocationMutation, EvenmanPrototypeSetLocationMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanPrototypeSetLocationMutation, EvenmanPrototypeSetLocationMutationVariables>(EvenmanPrototypeSetLocationDocument, baseOptions);
      }
export type EvenmanPrototypeSetLocationMutationHookResult = ReturnType<typeof useEvenmanPrototypeSetLocationMutation>;
export type EvenmanPrototypeSetLocationMutationResult = ApolloReactCommon.MutationResult<EvenmanPrototypeSetLocationMutation>;
export type EvenmanPrototypeSetLocationMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanPrototypeSetLocationMutation, EvenmanPrototypeSetLocationMutationVariables>;
export const EvenmanPrototypeSetActiveDocument = gql`
    mutation EvenmanPrototypeSetActive($id: ID!, $active: Boolean!) {
  result: eventPrototypeUpdate(input: {id: $id, active: $active}) {
    ok
  }
}
    `;
export type EvenmanPrototypeSetActiveMutationFn = ApolloReactCommon.MutationFunction<EvenmanPrototypeSetActiveMutation, EvenmanPrototypeSetActiveMutationVariables>;

/**
 * __useEvenmanPrototypeSetActiveMutation__
 *
 * To run a mutation, you first call `useEvenmanPrototypeSetActiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeSetActiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanPrototypeSetActiveMutation, { data, loading, error }] = useEvenmanPrototypeSetActiveMutation({
 *   variables: {
 *      id: // value for 'id'
 *      active: // value for 'active'
 *   },
 * });
 */
export function useEvenmanPrototypeSetActiveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanPrototypeSetActiveMutation, EvenmanPrototypeSetActiveMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanPrototypeSetActiveMutation, EvenmanPrototypeSetActiveMutationVariables>(EvenmanPrototypeSetActiveDocument, baseOptions);
      }
export type EvenmanPrototypeSetActiveMutationHookResult = ReturnType<typeof useEvenmanPrototypeSetActiveMutation>;
export type EvenmanPrototypeSetActiveMutationResult = ApolloReactCommon.MutationResult<EvenmanPrototypeSetActiveMutation>;
export type EvenmanPrototypeSetActiveMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanPrototypeSetActiveMutation, EvenmanPrototypeSetActiveMutationVariables>;
export const EvenmanPrototypeSetProjectDocument = gql`
    mutation EvenmanPrototypeSetProject($id: ID!, $project_slug: String!) {
  result: eventPrototypeUpdate(input: {id: $id, project_slug: $project_slug}) {
    ok
  }
}
    `;
export type EvenmanPrototypeSetProjectMutationFn = ApolloReactCommon.MutationFunction<EvenmanPrototypeSetProjectMutation, EvenmanPrototypeSetProjectMutationVariables>;

/**
 * __useEvenmanPrototypeSetProjectMutation__
 *
 * To run a mutation, you first call `useEvenmanPrototypeSetProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypeSetProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [evenmanPrototypeSetProjectMutation, { data, loading, error }] = useEvenmanPrototypeSetProjectMutation({
 *   variables: {
 *      id: // value for 'id'
 *      project_slug: // value for 'project_slug'
 *   },
 * });
 */
export function useEvenmanPrototypeSetProjectMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EvenmanPrototypeSetProjectMutation, EvenmanPrototypeSetProjectMutationVariables>) {
        return ApolloReactHooks.useMutation<EvenmanPrototypeSetProjectMutation, EvenmanPrototypeSetProjectMutationVariables>(EvenmanPrototypeSetProjectDocument, baseOptions);
      }
export type EvenmanPrototypeSetProjectMutationHookResult = ReturnType<typeof useEvenmanPrototypeSetProjectMutation>;
export type EvenmanPrototypeSetProjectMutationResult = ApolloReactCommon.MutationResult<EvenmanPrototypeSetProjectMutation>;
export type EvenmanPrototypeSetProjectMutationOptions = ApolloReactCommon.BaseMutationOptions<EvenmanPrototypeSetProjectMutation, EvenmanPrototypeSetProjectMutationVariables>;