import * as Types from '../apollo/gen-types';

import { PageInfoFragment } from '../apollo/queries.generated';
import gql from 'graphql-tag';
import { PageInfoFragmentDoc } from '../apollo/queries.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';


export type TrainingForPickerFragment = (
  { __typename?: 'RatioTraining' }
  & Pick<Types.RatioTraining, 'id' | 'slug' | 'name'>
);

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

export type TrainerFragment = (
  { __typename?: 'RatioTrainer' }
  & Pick<Types.RatioTrainer, 'id' | 'short_name' | 'long_name'>
);

export type ActivityFragment = (
  { __typename?: 'RatioActivity' }
  & Pick<Types.RatioActivity, 'id' | 'time' | 'activity_type' | 'name' | 'location'>
  & { trainer: Types.Maybe<(
    { __typename?: 'RatioTrainer' }
    & TrainerFragment
  )> }
);

export type TrainingDayFragment = (
  { __typename?: 'RatioTrainingDay' }
  & Pick<Types.RatioTrainingDay, 'id' | 'date'>
  & { activities: Array<(
    { __typename?: 'RatioActivity' }
    & ActivityFragment
  )> }
);

export type TrainingWithScheduleFragment = (
  { __typename?: 'RatioTraining' }
  & { schedule: Array<(
    { __typename?: 'RatioTrainingDay' }
    & TrainingDayFragment
  )> }
  & TrainingFragment
);

export type RatioTrainingsQueryVariables = {
  before?: Types.Maybe<Types.Scalars['String']>,
  after?: Types.Maybe<Types.Scalars['String']>
};


export type RatioTrainingsQuery = (
  { __typename?: 'Query' }
  & { trainings: (
    { __typename?: 'RatioTrainingConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<(
      { __typename?: 'RatioTrainingEdge' }
      & { node: (
        { __typename?: 'RatioTraining' }
        & TrainingFragment
      ) }
    )> }
  ) }
);

export type RatioTrainingsForPickerQueryVariables = {
  before?: Types.Maybe<Types.Scalars['String']>,
  after?: Types.Maybe<Types.Scalars['String']>
};


export type RatioTrainingsForPickerQuery = (
  { __typename?: 'Query' }
  & { trainings: (
    { __typename?: 'RatioTrainingConnection' }
    & { pageInfo: (
      { __typename?: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<(
      { __typename?: 'RatioTrainingEdge' }
      & { node: (
        { __typename?: 'RatioTraining' }
        & TrainingForPickerFragment
      ) }
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

export type RatioTrainingWithScheduleQueryVariables = {
  slug: Types.Scalars['String']
};


export type RatioTrainingWithScheduleQuery = (
  { __typename?: 'Query' }
  & { training: (
    { __typename?: 'RatioTraining' }
    & TrainingWithScheduleFragment
  ) }
);

export type RatioTrainersQueryVariables = {};


export type RatioTrainersQuery = (
  { __typename?: 'Query' }
  & { trainers: Array<(
    { __typename?: 'RatioTrainer' }
    & TrainerFragment
  )> }
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

export type RatioTicketFiscalizeMutationVariables = {
  ticket_id: Types.Scalars['ID']
};


export type RatioTicketFiscalizeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'ratioTicketFiscalize'>
);

export type RatioTrainingAddDayMutationVariables = {
  params: Types.RatioTrainingAddDayInput
};


export type RatioTrainingAddDayMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'ratioTrainingAddDay'>
);

export type RatioTrainingCopyScheduleFromMutationVariables = {
  params: Types.RatioTrainingCopyScheduleFromInput
};


export type RatioTrainingCopyScheduleFromMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'ratioTrainingCopyScheduleFrom'>
);

export const TrainingForPickerFragmentDoc = gql`
    fragment TrainingForPicker on RatioTraining {
  id
  slug
  name
}
    `;
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
export const TrainerFragmentDoc = gql`
    fragment Trainer on RatioTrainer {
  id
  short_name
  long_name
}
    `;
export const ActivityFragmentDoc = gql`
    fragment Activity on RatioActivity {
  id
  time
  activity_type
  name
  location
  trainer {
    ...Trainer
  }
}
    ${TrainerFragmentDoc}`;
export const TrainingDayFragmentDoc = gql`
    fragment TrainingDay on RatioTrainingDay {
  id
  date
  activities {
    ...Activity
  }
}
    ${ActivityFragmentDoc}`;
export const TrainingWithScheduleFragmentDoc = gql`
    fragment TrainingWithSchedule on RatioTraining {
  ...Training
  schedule {
    ...TrainingDay
  }
}
    ${TrainingFragmentDoc}
${TrainingDayFragmentDoc}`;
export const RatioTrainingsDocument = gql`
    query RatioTrainings($before: String, $after: String) {
  trainings: ratioTrainings(before: $before, after: $after) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...Training
      }
    }
  }
}
    ${PageInfoFragmentDoc}
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
 *      before: // value for 'before'
 *      after: // value for 'after'
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
export const RatioTrainingsForPickerDocument = gql`
    query RatioTrainingsForPicker($before: String, $after: String) {
  trainings: ratioTrainings(before: $before, after: $after) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...TrainingForPicker
      }
    }
  }
}
    ${PageInfoFragmentDoc}
${TrainingForPickerFragmentDoc}`;

/**
 * __useRatioTrainingsForPickerQuery__
 *
 * To run a query within a React component, call `useRatioTrainingsForPickerQuery` and pass it any options that fit your needs.
 * When your component renders, `useRatioTrainingsForPickerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRatioTrainingsForPickerQuery({
 *   variables: {
 *      before: // value for 'before'
 *      after: // value for 'after'
 *   },
 * });
 */
export function useRatioTrainingsForPickerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RatioTrainingsForPickerQuery, RatioTrainingsForPickerQueryVariables>) {
        return ApolloReactHooks.useQuery<RatioTrainingsForPickerQuery, RatioTrainingsForPickerQueryVariables>(RatioTrainingsForPickerDocument, baseOptions);
      }
export function useRatioTrainingsForPickerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RatioTrainingsForPickerQuery, RatioTrainingsForPickerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RatioTrainingsForPickerQuery, RatioTrainingsForPickerQueryVariables>(RatioTrainingsForPickerDocument, baseOptions);
        }
export type RatioTrainingsForPickerQueryHookResult = ReturnType<typeof useRatioTrainingsForPickerQuery>;
export type RatioTrainingsForPickerLazyQueryHookResult = ReturnType<typeof useRatioTrainingsForPickerLazyQuery>;
export type RatioTrainingsForPickerQueryResult = ApolloReactCommon.QueryResult<RatioTrainingsForPickerQuery, RatioTrainingsForPickerQueryVariables>;
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
export const RatioTrainingWithScheduleDocument = gql`
    query RatioTrainingWithSchedule($slug: String!) {
  training: ratioTrainingBySlug(slug: $slug) {
    ...TrainingWithSchedule
  }
}
    ${TrainingWithScheduleFragmentDoc}`;

/**
 * __useRatioTrainingWithScheduleQuery__
 *
 * To run a query within a React component, call `useRatioTrainingWithScheduleQuery` and pass it any options that fit your needs.
 * When your component renders, `useRatioTrainingWithScheduleQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRatioTrainingWithScheduleQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useRatioTrainingWithScheduleQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RatioTrainingWithScheduleQuery, RatioTrainingWithScheduleQueryVariables>) {
        return ApolloReactHooks.useQuery<RatioTrainingWithScheduleQuery, RatioTrainingWithScheduleQueryVariables>(RatioTrainingWithScheduleDocument, baseOptions);
      }
export function useRatioTrainingWithScheduleLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RatioTrainingWithScheduleQuery, RatioTrainingWithScheduleQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RatioTrainingWithScheduleQuery, RatioTrainingWithScheduleQueryVariables>(RatioTrainingWithScheduleDocument, baseOptions);
        }
export type RatioTrainingWithScheduleQueryHookResult = ReturnType<typeof useRatioTrainingWithScheduleQuery>;
export type RatioTrainingWithScheduleLazyQueryHookResult = ReturnType<typeof useRatioTrainingWithScheduleLazyQuery>;
export type RatioTrainingWithScheduleQueryResult = ApolloReactCommon.QueryResult<RatioTrainingWithScheduleQuery, RatioTrainingWithScheduleQueryVariables>;
export const RatioTrainersDocument = gql`
    query RatioTrainers {
  trainers: ratioTrainersAll {
    ...Trainer
  }
}
    ${TrainerFragmentDoc}`;

/**
 * __useRatioTrainersQuery__
 *
 * To run a query within a React component, call `useRatioTrainersQuery` and pass it any options that fit your needs.
 * When your component renders, `useRatioTrainersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRatioTrainersQuery({
 *   variables: {
 *   },
 * });
 */
export function useRatioTrainersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RatioTrainersQuery, RatioTrainersQueryVariables>) {
        return ApolloReactHooks.useQuery<RatioTrainersQuery, RatioTrainersQueryVariables>(RatioTrainersDocument, baseOptions);
      }
export function useRatioTrainersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RatioTrainersQuery, RatioTrainersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RatioTrainersQuery, RatioTrainersQueryVariables>(RatioTrainersDocument, baseOptions);
        }
export type RatioTrainersQueryHookResult = ReturnType<typeof useRatioTrainersQuery>;
export type RatioTrainersLazyQueryHookResult = ReturnType<typeof useRatioTrainersLazyQuery>;
export type RatioTrainersQueryResult = ApolloReactCommon.QueryResult<RatioTrainersQuery, RatioTrainersQueryVariables>;
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
  ratioAddTicket(input: $params) {
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
export const RatioTicketFiscalizeDocument = gql`
    mutation RatioTicketFiscalize($ticket_id: ID!) {
  ratioTicketFiscalize(ticket_id: $ticket_id)
}
    `;
export type RatioTicketFiscalizeMutationFn = ApolloReactCommon.MutationFunction<RatioTicketFiscalizeMutation, RatioTicketFiscalizeMutationVariables>;

/**
 * __useRatioTicketFiscalizeMutation__
 *
 * To run a mutation, you first call `useRatioTicketFiscalizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatioTicketFiscalizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratioTicketFiscalizeMutation, { data, loading, error }] = useRatioTicketFiscalizeMutation({
 *   variables: {
 *      ticket_id: // value for 'ticket_id'
 *   },
 * });
 */
export function useRatioTicketFiscalizeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RatioTicketFiscalizeMutation, RatioTicketFiscalizeMutationVariables>) {
        return ApolloReactHooks.useMutation<RatioTicketFiscalizeMutation, RatioTicketFiscalizeMutationVariables>(RatioTicketFiscalizeDocument, baseOptions);
      }
export type RatioTicketFiscalizeMutationHookResult = ReturnType<typeof useRatioTicketFiscalizeMutation>;
export type RatioTicketFiscalizeMutationResult = ApolloReactCommon.MutationResult<RatioTicketFiscalizeMutation>;
export type RatioTicketFiscalizeMutationOptions = ApolloReactCommon.BaseMutationOptions<RatioTicketFiscalizeMutation, RatioTicketFiscalizeMutationVariables>;
export const RatioTrainingAddDayDocument = gql`
    mutation RatioTrainingAddDay($params: RatioTrainingAddDayInput!) {
  ratioTrainingAddDay(params: $params)
}
    `;
export type RatioTrainingAddDayMutationFn = ApolloReactCommon.MutationFunction<RatioTrainingAddDayMutation, RatioTrainingAddDayMutationVariables>;

/**
 * __useRatioTrainingAddDayMutation__
 *
 * To run a mutation, you first call `useRatioTrainingAddDayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatioTrainingAddDayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratioTrainingAddDayMutation, { data, loading, error }] = useRatioTrainingAddDayMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useRatioTrainingAddDayMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RatioTrainingAddDayMutation, RatioTrainingAddDayMutationVariables>) {
        return ApolloReactHooks.useMutation<RatioTrainingAddDayMutation, RatioTrainingAddDayMutationVariables>(RatioTrainingAddDayDocument, baseOptions);
      }
export type RatioTrainingAddDayMutationHookResult = ReturnType<typeof useRatioTrainingAddDayMutation>;
export type RatioTrainingAddDayMutationResult = ApolloReactCommon.MutationResult<RatioTrainingAddDayMutation>;
export type RatioTrainingAddDayMutationOptions = ApolloReactCommon.BaseMutationOptions<RatioTrainingAddDayMutation, RatioTrainingAddDayMutationVariables>;
export const RatioTrainingCopyScheduleFromDocument = gql`
    mutation RatioTrainingCopyScheduleFrom($params: RatioTrainingCopyScheduleFromInput!) {
  ratioTrainingCopyScheduleFrom(params: $params)
}
    `;
export type RatioTrainingCopyScheduleFromMutationFn = ApolloReactCommon.MutationFunction<RatioTrainingCopyScheduleFromMutation, RatioTrainingCopyScheduleFromMutationVariables>;

/**
 * __useRatioTrainingCopyScheduleFromMutation__
 *
 * To run a mutation, you first call `useRatioTrainingCopyScheduleFromMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatioTrainingCopyScheduleFromMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratioTrainingCopyScheduleFromMutation, { data, loading, error }] = useRatioTrainingCopyScheduleFromMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useRatioTrainingCopyScheduleFromMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RatioTrainingCopyScheduleFromMutation, RatioTrainingCopyScheduleFromMutationVariables>) {
        return ApolloReactHooks.useMutation<RatioTrainingCopyScheduleFromMutation, RatioTrainingCopyScheduleFromMutationVariables>(RatioTrainingCopyScheduleFromDocument, baseOptions);
      }
export type RatioTrainingCopyScheduleFromMutationHookResult = ReturnType<typeof useRatioTrainingCopyScheduleFromMutation>;
export type RatioTrainingCopyScheduleFromMutationResult = ApolloReactCommon.MutationResult<RatioTrainingCopyScheduleFromMutation>;
export type RatioTrainingCopyScheduleFromMutationOptions = ApolloReactCommon.BaseMutationOptions<RatioTrainingCopyScheduleFromMutation, RatioTrainingCopyScheduleFromMutationVariables>;