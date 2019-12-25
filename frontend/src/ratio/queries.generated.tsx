import * as Types from '../apollo/gen-types';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type TicketFragment = (
  { __typename?: 'RatioTicket' }
  & Pick<Types.RatioTicket, 'id' | 'email' | 'first_name' | 'last_name' | 'payment_amount' | 'status' | 'fiscalization_status' | 'ticket_type' | 'payment_type'>
);

export type TrainingFragment = (
  { __typename?: 'RatioTraining' }
  & Pick<Types.RatioTraining, 'id' | 'slug' | 'name' | 'date' | 'tickets_count' | 'total_income'>
  & { tickets: Array<(
    { __typename?: 'RatioTicket' }
    & TicketFragment
  )> }
);

export type RatioTrainingsQueryVariables = {
  page?: Types.Maybe<Types.Scalars['Int']>
};


export type RatioTrainingsQuery = (
  { __typename?: 'Query' }
  & { trainings: (
    { __typename?: 'RatioTrainingConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & Pick<Types.PageInfo, 'pageNumber' | 'hasNextPage'>
    ), nodes: Array<(
      { __typename?: 'RatioTraining' }
      & TrainingFragment
    )> }
  ) }
);

export type RatioTrainingBySlugQueryVariables = {
  slug: Types.Scalars['String']
};


export type RatioTrainingBySlugQuery = (
  { __typename?: 'Query' }
  & { training: (
    { __typename?: 'RatioTraining' }
    & TrainingFragment
  ) }
);

export type RatioAddTrainingMutationVariables = {
  params: Types.RatioAddTrainingInput
};


export type RatioAddTrainingMutation = (
  { __typename?: 'Mutation' }
  & { ratioAddTraining: (
    { __typename?: 'RatioTraining' }
    & TrainingFragment
  ) }
);

export type RatioAddTicketMutationVariables = {
  params: Types.RatioAddTicketInput
};


export type RatioAddTicketMutation = (
  { __typename?: 'Mutation' }
  & { ratioAddTicket: (
    { __typename?: 'RatioTicket' }
    & TicketFragment
  ) }
);

export const TicketFragmentDoc = gql`
    fragment Ticket on RatioTicket {
  id
  email
  first_name
  last_name
  payment_amount
  status
  fiscalization_status
  ticket_type
  payment_type
}
    `;
export const TrainingFragmentDoc = gql`
    fragment Training on RatioTraining {
  id
  slug
  name
  date
  tickets_count
  total_income
  tickets {
    ...Ticket
  }
}
    ${TicketFragmentDoc}`;
export const RatioTrainingsDocument = gql`
    query RatioTrainings($page: Int) {
  trainings: ratioTrainings(page: $page) {
    pageInfo {
      pageNumber
      hasNextPage
    }
    nodes {
      ...Training
    }
  }
}
    ${TrainingFragmentDoc}`;

/**
 * __useRatioTrainingsQuery__
 *
 * To run a query within a React component, call `useRatioTrainingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRatioTrainingsQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRatioTrainingsQuery({
 *   variables: {
 *      page: // value for 'page'
 *   },
 * });
 */
export function useRatioTrainingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RatioTrainingsQuery, RatioTrainingsQueryVariables>) {
        return ApolloReactHooks.useQuery<RatioTrainingsQuery, RatioTrainingsQueryVariables>(RatioTrainingsDocument, baseOptions);
      }
export function useRatioTrainingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RatioTrainingsQuery, RatioTrainingsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RatioTrainingsQuery, RatioTrainingsQueryVariables>(RatioTrainingsDocument, baseOptions);
        }
export type RatioTrainingsQueryHookResult = ReturnType<typeof useRatioTrainingsQuery>;
export type RatioTrainingsLazyQueryHookResult = ReturnType<typeof useRatioTrainingsLazyQuery>;
export type RatioTrainingsQueryResult = ApolloReactCommon.QueryResult<RatioTrainingsQuery, RatioTrainingsQueryVariables>;
export const RatioTrainingBySlugDocument = gql`
    query RatioTrainingBySlug($slug: String!) {
  training: ratioTrainingBySlug(slug: $slug) {
    ...Training
  }
}
    ${TrainingFragmentDoc}`;

/**
 * __useRatioTrainingBySlugQuery__
 *
 * To run a query within a React component, call `useRatioTrainingBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useRatioTrainingBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRatioTrainingBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useRatioTrainingBySlugQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RatioTrainingBySlugQuery, RatioTrainingBySlugQueryVariables>) {
        return ApolloReactHooks.useQuery<RatioTrainingBySlugQuery, RatioTrainingBySlugQueryVariables>(RatioTrainingBySlugDocument, baseOptions);
      }
export function useRatioTrainingBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RatioTrainingBySlugQuery, RatioTrainingBySlugQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RatioTrainingBySlugQuery, RatioTrainingBySlugQueryVariables>(RatioTrainingBySlugDocument, baseOptions);
        }
export type RatioTrainingBySlugQueryHookResult = ReturnType<typeof useRatioTrainingBySlugQuery>;
export type RatioTrainingBySlugLazyQueryHookResult = ReturnType<typeof useRatioTrainingBySlugLazyQuery>;
export type RatioTrainingBySlugQueryResult = ApolloReactCommon.QueryResult<RatioTrainingBySlugQuery, RatioTrainingBySlugQueryVariables>;
export const RatioAddTrainingDocument = gql`
    mutation RatioAddTraining($params: RatioAddTrainingInput!) {
  ratioAddTraining(params: $params) {
    ...Training
  }
}
    ${TrainingFragmentDoc}`;
export type RatioAddTrainingMutationFn = ApolloReactCommon.MutationFunction<RatioAddTrainingMutation, RatioAddTrainingMutationVariables>;

/**
 * __useRatioAddTrainingMutation__
 *
 * To run a mutation, you first call `useRatioAddTrainingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatioAddTrainingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratioAddTrainingMutation, { data, loading, error }] = useRatioAddTrainingMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useRatioAddTrainingMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RatioAddTrainingMutation, RatioAddTrainingMutationVariables>) {
        return ApolloReactHooks.useMutation<RatioAddTrainingMutation, RatioAddTrainingMutationVariables>(RatioAddTrainingDocument, baseOptions);
      }
export type RatioAddTrainingMutationHookResult = ReturnType<typeof useRatioAddTrainingMutation>;
export type RatioAddTrainingMutationResult = ApolloReactCommon.MutationResult<RatioAddTrainingMutation>;
export type RatioAddTrainingMutationOptions = ApolloReactCommon.BaseMutationOptions<RatioAddTrainingMutation, RatioAddTrainingMutationVariables>;
export const RatioAddTicketDocument = gql`
    mutation RatioAddTicket($params: RatioAddTicketInput!) {
  ratioAddTicket(params: $params) {
    ...Ticket
  }
}
    ${TicketFragmentDoc}`;
export type RatioAddTicketMutationFn = ApolloReactCommon.MutationFunction<RatioAddTicketMutation, RatioAddTicketMutationVariables>;

/**
 * __useRatioAddTicketMutation__
 *
 * To run a mutation, you first call `useRatioAddTicketMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatioAddTicketMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratioAddTicketMutation, { data, loading, error }] = useRatioAddTicketMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useRatioAddTicketMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RatioAddTicketMutation, RatioAddTicketMutationVariables>) {
        return ApolloReactHooks.useMutation<RatioAddTicketMutation, RatioAddTicketMutationVariables>(RatioAddTicketDocument, baseOptions);
      }
export type RatioAddTicketMutationHookResult = ReturnType<typeof useRatioAddTicketMutation>;
export type RatioAddTicketMutationResult = ApolloReactCommon.MutationResult<RatioAddTicketMutation>;
export type RatioAddTicketMutationOptions = ApolloReactCommon.BaseMutationOptions<RatioAddTicketMutation, RatioAddTicketMutationVariables>;