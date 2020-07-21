import * as Types from '../apollo/types.generated';

import { PageInfoFragment } from '../apollo/queries.generated';
import gql from 'graphql-tag';
import { PageInfoFragmentDoc } from '../apollo/queries.generated';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type TrainingForPickerFragment = (
  { __typename?: 'RatioTraining' }
  & Pick<Types.RatioTraining, 'id' | 'slug' | 'name'>
);

export type RatioPaymentFragment = (
  { __typename?: 'RatioPayment' }
  & Pick<Types.RatioPayment, 'id' | 'amount' | 'payment_type' | 'status' | 'fiscalization_status'>
);

export type RatioTicketFragment = (
  { __typename?: 'RatioTicket' }
  & Pick<Types.RatioTicket, 'id' | 'email' | 'first_name' | 'last_name' | 'payment_amount' | 'status' | 'ticket_type'>
  & { payments: Array<(
    { __typename?: 'RatioPayment' }
    & RatioPaymentFragment
  )> }
);

export type RatioTrainingFragment = (
  { __typename?: 'RatioTraining' }
  & Pick<Types.RatioTraining, 'id' | 'slug' | 'name' | 'date' | 'telegram_link' | 'tickets_count' | 'total_income'>
  & { tickets: Array<(
    { __typename?: 'RatioTicket' }
    & RatioTicketFragment
  )> }
);

export type RatioTrainerFragment = (
  { __typename?: 'RatioTrainer' }
  & Pick<Types.RatioTrainer, 'id' | 'short_name' | 'long_name'>
);

export type ActivityFragment = (
  { __typename?: 'RatioActivity' }
  & Pick<Types.RatioActivity, 'id' | 'time' | 'activity_type' | 'name' | 'location'>
  & { trainer?: Types.Maybe<(
    { __typename?: 'RatioTrainer' }
    & RatioTrainerFragment
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
  & RatioTrainingFragment
);

export type RatioTrainingsQueryVariables = {
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
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
        & RatioTrainingFragment
      ) }
    )> }
  ) }
);

export type RatioTrainingsForPickerQueryVariables = {
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
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
  slug: Types.Scalars['String'];
};


export type RatioTrainingBySlugQuery = (
  { __typename?: 'Query' }
  & { training: (
    { __typename?: 'RatioTraining' }
    & RatioTrainingFragment
  ) }
);

export type RatioTrainingWithScheduleQueryVariables = {
  slug: Types.Scalars['String'];
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
    & RatioTrainerFragment
  )> }
);

export type RatioTrainingEmailPrototypeQueryVariables = {
  training_id: Types.Scalars['ID'];
  type: Types.Scalars['String'];
};


export type RatioTrainingEmailPrototypeQuery = (
  { __typename?: 'Query' }
  & { content: Types.Query['ratioTrainingEmailPrototype'] }
);

export type RatioAddTrainingMutationVariables = {
  params: Types.RatioAddTrainingInput;
};


export type RatioAddTrainingMutation = (
  { __typename?: 'Mutation' }
  & { ratioAddTraining: (
    { __typename?: 'RatioTraining' }
    & RatioTrainingFragment
  ) }
);

export type RatioAddTicketMutationVariables = {
  params: Types.RatioAddTicketInput;
};


export type RatioAddTicketMutation = (
  { __typename?: 'Mutation' }
  & { ratioAddTicket: (
    { __typename?: 'RatioTicket' }
    & RatioTicketFragment
  ) }
);

export type RatioPaymentAddMutationVariables = {
  params: Types.RatioPaymentAddInput;
};


export type RatioPaymentAddMutation = (
  { __typename?: 'Mutation' }
  & { ratioPaymentAdd: (
    { __typename?: 'RatioPaymentAddResult' }
    & { payment: (
      { __typename?: 'RatioPayment' }
      & RatioPaymentFragment
    ) }
  ) }
);

export type RatioPaymentDeleteMutationVariables = {
  payment_id: Types.Scalars['ID'];
};


export type RatioPaymentDeleteMutation = (
  { __typename?: 'Mutation' }
  & { ratioPaymentDelete: (
    { __typename?: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type RatioPaymentSetStatusMutationVariables = {
  input: Types.RatioPaymentSetStatusInput;
};


export type RatioPaymentSetStatusMutation = (
  { __typename?: 'Mutation' }
  & { ratioPaymentSetStatus: (
    { __typename?: 'RatioPaymentSetStatusResult' }
    & { payment: (
      { __typename?: 'RatioPayment' }
      & RatioPaymentFragment
    ) }
  ) }
);

export type RatioPaymentFiscalizeMutationVariables = {
  payment_id: Types.Scalars['ID'];
};


export type RatioPaymentFiscalizeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'ratioPaymentFiscalize'>
);

export type RatioPaymentFiscalizedManuallyMutationVariables = {
  payment_id: Types.Scalars['ID'];
};


export type RatioPaymentFiscalizedManuallyMutation = (
  { __typename?: 'Mutation' }
  & { ratioPaymentFiscalizedManually: (
    { __typename?: 'RatioPaymentFiscalizedManuallyResult' }
    & { payment: (
      { __typename?: 'RatioPayment' }
      & RatioPaymentFragment
    ) }
  ) }
);

export type RatioTrainingAddDayMutationVariables = {
  params: Types.RatioTrainingAddDayInput;
};


export type RatioTrainingAddDayMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'ratioTrainingAddDay'>
);

export type RatioTrainingCopyScheduleFromMutationVariables = {
  params: Types.RatioTrainingCopyScheduleFromInput;
};


export type RatioTrainingCopyScheduleFromMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'ratioTrainingCopyScheduleFrom'>
);

export type RatioTrainingSendEmailMutationVariables = {
  input: Types.RatioTrainingSendEmailInput;
};


export type RatioTrainingSendEmailMutation = (
  { __typename?: 'Mutation' }
  & { email: (
    { __typename?: 'RatioTrainingSendEmailResult' }
    & Pick<Types.RatioTrainingSendEmailResult, 'draft_link'>
  ) }
);

export type RatioTrainingSyncParticipantsToMailchimpMutationVariables = {
  training_id: Types.Scalars['ID'];
};


export type RatioTrainingSyncParticipantsToMailchimpMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'ratioTrainingSyncParticipantsToMailchimp'>
);

export const TrainingForPickerFragmentDoc = gql`
    fragment TrainingForPicker on RatioTraining {
  id
  slug
  name
}
    `;
export const RatioPaymentFragmentDoc = gql`
    fragment RatioPayment on RatioPayment {
  id
  amount
  payment_type
  status
  fiscalization_status
}
    `;
export const RatioTicketFragmentDoc = gql`
    fragment RatioTicket on RatioTicket {
  id
  email
  first_name
  last_name
  payment_amount
  status
  ticket_type
  payments {
    ...RatioPayment
  }
}
    ${RatioPaymentFragmentDoc}`;
export const RatioTrainingFragmentDoc = gql`
    fragment RatioTraining on RatioTraining {
  id
  slug
  name
  date
  telegram_link
  tickets_count
  total_income
  tickets {
    ...RatioTicket
  }
}
    ${RatioTicketFragmentDoc}`;
export const RatioTrainerFragmentDoc = gql`
    fragment RatioTrainer on RatioTrainer {
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
    ...RatioTrainer
  }
}
    ${RatioTrainerFragmentDoc}`;
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
  ...RatioTraining
  schedule {
    ...TrainingDay
  }
}
    ${RatioTrainingFragmentDoc}
${TrainingDayFragmentDoc}`;
export const RatioTrainingsDocument = gql`
    query RatioTrainings($before: String, $after: String, $first: Int, $last: Int) {
  trainings: ratioTrainings(before: $before, after: $after, first: $first, last: $last) {
    pageInfo {
      ...PageInfo
    }
    edges {
      node {
        ...RatioTraining
      }
    }
  }
}
    ${PageInfoFragmentDoc}
${RatioTrainingFragmentDoc}`;

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
 *      first: // value for 'first'
 *      last: // value for 'last'
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
    query RatioTrainingsForPicker($before: String, $after: String, $first: Int, $last: Int) {
  trainings: ratioTrainings(before: $before, after: $after, first: $first, last: $last) {
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
 *      first: // value for 'first'
 *      last: // value for 'last'
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
    ...RatioTraining
  }
}
    ${RatioTrainingFragmentDoc}`;

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
    ...RatioTrainer
  }
}
    ${RatioTrainerFragmentDoc}`;

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
export const RatioTrainingEmailPrototypeDocument = gql`
    query RatioTrainingEmailPrototype($training_id: ID!, $type: String!) {
  content: ratioTrainingEmailPrototype(training_id: $training_id, type: $type)
}
    `;

/**
 * __useRatioTrainingEmailPrototypeQuery__
 *
 * To run a query within a React component, call `useRatioTrainingEmailPrototypeQuery` and pass it any options that fit your needs.
 * When your component renders, `useRatioTrainingEmailPrototypeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRatioTrainingEmailPrototypeQuery({
 *   variables: {
 *      training_id: // value for 'training_id'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useRatioTrainingEmailPrototypeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RatioTrainingEmailPrototypeQuery, RatioTrainingEmailPrototypeQueryVariables>) {
        return ApolloReactHooks.useQuery<RatioTrainingEmailPrototypeQuery, RatioTrainingEmailPrototypeQueryVariables>(RatioTrainingEmailPrototypeDocument, baseOptions);
      }
export function useRatioTrainingEmailPrototypeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RatioTrainingEmailPrototypeQuery, RatioTrainingEmailPrototypeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<RatioTrainingEmailPrototypeQuery, RatioTrainingEmailPrototypeQueryVariables>(RatioTrainingEmailPrototypeDocument, baseOptions);
        }
export type RatioTrainingEmailPrototypeQueryHookResult = ReturnType<typeof useRatioTrainingEmailPrototypeQuery>;
export type RatioTrainingEmailPrototypeLazyQueryHookResult = ReturnType<typeof useRatioTrainingEmailPrototypeLazyQuery>;
export type RatioTrainingEmailPrototypeQueryResult = ApolloReactCommon.QueryResult<RatioTrainingEmailPrototypeQuery, RatioTrainingEmailPrototypeQueryVariables>;
export const RatioAddTrainingDocument = gql`
    mutation RatioAddTraining($params: RatioAddTrainingInput!) {
  ratioAddTraining(params: $params) {
    ...RatioTraining
  }
}
    ${RatioTrainingFragmentDoc}`;
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
    ...RatioTicket
  }
}
    ${RatioTicketFragmentDoc}`;
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
export const RatioPaymentAddDocument = gql`
    mutation RatioPaymentAdd($params: RatioPaymentAddInput!) {
  ratioPaymentAdd(input: $params) {
    payment {
      ...RatioPayment
    }
  }
}
    ${RatioPaymentFragmentDoc}`;
export type RatioPaymentAddMutationFn = ApolloReactCommon.MutationFunction<RatioPaymentAddMutation, RatioPaymentAddMutationVariables>;

/**
 * __useRatioPaymentAddMutation__
 *
 * To run a mutation, you first call `useRatioPaymentAddMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatioPaymentAddMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratioPaymentAddMutation, { data, loading, error }] = useRatioPaymentAddMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useRatioPaymentAddMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RatioPaymentAddMutation, RatioPaymentAddMutationVariables>) {
        return ApolloReactHooks.useMutation<RatioPaymentAddMutation, RatioPaymentAddMutationVariables>(RatioPaymentAddDocument, baseOptions);
      }
export type RatioPaymentAddMutationHookResult = ReturnType<typeof useRatioPaymentAddMutation>;
export type RatioPaymentAddMutationResult = ApolloReactCommon.MutationResult<RatioPaymentAddMutation>;
export type RatioPaymentAddMutationOptions = ApolloReactCommon.BaseMutationOptions<RatioPaymentAddMutation, RatioPaymentAddMutationVariables>;
export const RatioPaymentDeleteDocument = gql`
    mutation RatioPaymentDelete($payment_id: ID!) {
  ratioPaymentDelete(payment_id: $payment_id) {
    ok
  }
}
    `;
export type RatioPaymentDeleteMutationFn = ApolloReactCommon.MutationFunction<RatioPaymentDeleteMutation, RatioPaymentDeleteMutationVariables>;

/**
 * __useRatioPaymentDeleteMutation__
 *
 * To run a mutation, you first call `useRatioPaymentDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatioPaymentDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratioPaymentDeleteMutation, { data, loading, error }] = useRatioPaymentDeleteMutation({
 *   variables: {
 *      payment_id: // value for 'payment_id'
 *   },
 * });
 */
export function useRatioPaymentDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RatioPaymentDeleteMutation, RatioPaymentDeleteMutationVariables>) {
        return ApolloReactHooks.useMutation<RatioPaymentDeleteMutation, RatioPaymentDeleteMutationVariables>(RatioPaymentDeleteDocument, baseOptions);
      }
export type RatioPaymentDeleteMutationHookResult = ReturnType<typeof useRatioPaymentDeleteMutation>;
export type RatioPaymentDeleteMutationResult = ApolloReactCommon.MutationResult<RatioPaymentDeleteMutation>;
export type RatioPaymentDeleteMutationOptions = ApolloReactCommon.BaseMutationOptions<RatioPaymentDeleteMutation, RatioPaymentDeleteMutationVariables>;
export const RatioPaymentSetStatusDocument = gql`
    mutation RatioPaymentSetStatus($input: RatioPaymentSetStatusInput!) {
  ratioPaymentSetStatus(input: $input) {
    payment {
      ...RatioPayment
    }
  }
}
    ${RatioPaymentFragmentDoc}`;
export type RatioPaymentSetStatusMutationFn = ApolloReactCommon.MutationFunction<RatioPaymentSetStatusMutation, RatioPaymentSetStatusMutationVariables>;

/**
 * __useRatioPaymentSetStatusMutation__
 *
 * To run a mutation, you first call `useRatioPaymentSetStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatioPaymentSetStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratioPaymentSetStatusMutation, { data, loading, error }] = useRatioPaymentSetStatusMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRatioPaymentSetStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RatioPaymentSetStatusMutation, RatioPaymentSetStatusMutationVariables>) {
        return ApolloReactHooks.useMutation<RatioPaymentSetStatusMutation, RatioPaymentSetStatusMutationVariables>(RatioPaymentSetStatusDocument, baseOptions);
      }
export type RatioPaymentSetStatusMutationHookResult = ReturnType<typeof useRatioPaymentSetStatusMutation>;
export type RatioPaymentSetStatusMutationResult = ApolloReactCommon.MutationResult<RatioPaymentSetStatusMutation>;
export type RatioPaymentSetStatusMutationOptions = ApolloReactCommon.BaseMutationOptions<RatioPaymentSetStatusMutation, RatioPaymentSetStatusMutationVariables>;
export const RatioPaymentFiscalizeDocument = gql`
    mutation RatioPaymentFiscalize($payment_id: ID!) {
  ratioPaymentFiscalize(payment_id: $payment_id)
}
    `;
export type RatioPaymentFiscalizeMutationFn = ApolloReactCommon.MutationFunction<RatioPaymentFiscalizeMutation, RatioPaymentFiscalizeMutationVariables>;

/**
 * __useRatioPaymentFiscalizeMutation__
 *
 * To run a mutation, you first call `useRatioPaymentFiscalizeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatioPaymentFiscalizeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratioPaymentFiscalizeMutation, { data, loading, error }] = useRatioPaymentFiscalizeMutation({
 *   variables: {
 *      payment_id: // value for 'payment_id'
 *   },
 * });
 */
export function useRatioPaymentFiscalizeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RatioPaymentFiscalizeMutation, RatioPaymentFiscalizeMutationVariables>) {
        return ApolloReactHooks.useMutation<RatioPaymentFiscalizeMutation, RatioPaymentFiscalizeMutationVariables>(RatioPaymentFiscalizeDocument, baseOptions);
      }
export type RatioPaymentFiscalizeMutationHookResult = ReturnType<typeof useRatioPaymentFiscalizeMutation>;
export type RatioPaymentFiscalizeMutationResult = ApolloReactCommon.MutationResult<RatioPaymentFiscalizeMutation>;
export type RatioPaymentFiscalizeMutationOptions = ApolloReactCommon.BaseMutationOptions<RatioPaymentFiscalizeMutation, RatioPaymentFiscalizeMutationVariables>;
export const RatioPaymentFiscalizedManuallyDocument = gql`
    mutation RatioPaymentFiscalizedManually($payment_id: ID!) {
  ratioPaymentFiscalizedManually(payment_id: $payment_id) {
    payment {
      ...RatioPayment
    }
  }
}
    ${RatioPaymentFragmentDoc}`;
export type RatioPaymentFiscalizedManuallyMutationFn = ApolloReactCommon.MutationFunction<RatioPaymentFiscalizedManuallyMutation, RatioPaymentFiscalizedManuallyMutationVariables>;

/**
 * __useRatioPaymentFiscalizedManuallyMutation__
 *
 * To run a mutation, you first call `useRatioPaymentFiscalizedManuallyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatioPaymentFiscalizedManuallyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratioPaymentFiscalizedManuallyMutation, { data, loading, error }] = useRatioPaymentFiscalizedManuallyMutation({
 *   variables: {
 *      payment_id: // value for 'payment_id'
 *   },
 * });
 */
export function useRatioPaymentFiscalizedManuallyMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RatioPaymentFiscalizedManuallyMutation, RatioPaymentFiscalizedManuallyMutationVariables>) {
        return ApolloReactHooks.useMutation<RatioPaymentFiscalizedManuallyMutation, RatioPaymentFiscalizedManuallyMutationVariables>(RatioPaymentFiscalizedManuallyDocument, baseOptions);
      }
export type RatioPaymentFiscalizedManuallyMutationHookResult = ReturnType<typeof useRatioPaymentFiscalizedManuallyMutation>;
export type RatioPaymentFiscalizedManuallyMutationResult = ApolloReactCommon.MutationResult<RatioPaymentFiscalizedManuallyMutation>;
export type RatioPaymentFiscalizedManuallyMutationOptions = ApolloReactCommon.BaseMutationOptions<RatioPaymentFiscalizedManuallyMutation, RatioPaymentFiscalizedManuallyMutationVariables>;
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
export const RatioTrainingSendEmailDocument = gql`
    mutation RatioTrainingSendEmail($input: RatioTrainingSendEmailInput!) {
  email: ratioTrainingSendEmail(input: $input) {
    draft_link
  }
}
    `;
export type RatioTrainingSendEmailMutationFn = ApolloReactCommon.MutationFunction<RatioTrainingSendEmailMutation, RatioTrainingSendEmailMutationVariables>;

/**
 * __useRatioTrainingSendEmailMutation__
 *
 * To run a mutation, you first call `useRatioTrainingSendEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatioTrainingSendEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratioTrainingSendEmailMutation, { data, loading, error }] = useRatioTrainingSendEmailMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRatioTrainingSendEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RatioTrainingSendEmailMutation, RatioTrainingSendEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<RatioTrainingSendEmailMutation, RatioTrainingSendEmailMutationVariables>(RatioTrainingSendEmailDocument, baseOptions);
      }
export type RatioTrainingSendEmailMutationHookResult = ReturnType<typeof useRatioTrainingSendEmailMutation>;
export type RatioTrainingSendEmailMutationResult = ApolloReactCommon.MutationResult<RatioTrainingSendEmailMutation>;
export type RatioTrainingSendEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<RatioTrainingSendEmailMutation, RatioTrainingSendEmailMutationVariables>;
export const RatioTrainingSyncParticipantsToMailchimpDocument = gql`
    mutation RatioTrainingSyncParticipantsToMailchimp($training_id: ID!) {
  ratioTrainingSyncParticipantsToMailchimp(training_id: $training_id)
}
    `;
export type RatioTrainingSyncParticipantsToMailchimpMutationFn = ApolloReactCommon.MutationFunction<RatioTrainingSyncParticipantsToMailchimpMutation, RatioTrainingSyncParticipantsToMailchimpMutationVariables>;

/**
 * __useRatioTrainingSyncParticipantsToMailchimpMutation__
 *
 * To run a mutation, you first call `useRatioTrainingSyncParticipantsToMailchimpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRatioTrainingSyncParticipantsToMailchimpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [ratioTrainingSyncParticipantsToMailchimpMutation, { data, loading, error }] = useRatioTrainingSyncParticipantsToMailchimpMutation({
 *   variables: {
 *      training_id: // value for 'training_id'
 *   },
 * });
 */
export function useRatioTrainingSyncParticipantsToMailchimpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RatioTrainingSyncParticipantsToMailchimpMutation, RatioTrainingSyncParticipantsToMailchimpMutationVariables>) {
        return ApolloReactHooks.useMutation<RatioTrainingSyncParticipantsToMailchimpMutation, RatioTrainingSyncParticipantsToMailchimpMutationVariables>(RatioTrainingSyncParticipantsToMailchimpDocument, baseOptions);
      }
export type RatioTrainingSyncParticipantsToMailchimpMutationHookResult = ReturnType<typeof useRatioTrainingSyncParticipantsToMailchimpMutation>;
export type RatioTrainingSyncParticipantsToMailchimpMutationResult = ApolloReactCommon.MutationResult<RatioTrainingSyncParticipantsToMailchimpMutation>;
export type RatioTrainingSyncParticipantsToMailchimpMutationOptions = ApolloReactCommon.BaseMutationOptions<RatioTrainingSyncParticipantsToMailchimpMutation, RatioTrainingSyncParticipantsToMailchimpMutationVariables>;