import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type MailchimpInterestFragment = (
  { __typename?: 'EmailMailchimpInterest' }
  & Pick<Types.EmailMailchimpInterest, 'id' | 'name'>
);

export type SubscribeChannelFragment = (
  { __typename?: 'EmailSubscribeChannel' }
  & Pick<Types.EmailSubscribeChannel, 'id' | 'slug'>
  & { interests: Array<(
    { __typename?: 'EmailMailchimpInterest' }
    & MailchimpInterestFragment
  )> }
);

export type MailchimpCategoryFragment = (
  { __typename?: 'EmailMailchimpCategory' }
  & Pick<Types.EmailMailchimpCategory, 'id' | 'title'>
  & { interests: Array<(
    { __typename?: 'EmailMailchimpInterest' }
    & MailchimpInterestFragment
  )> }
);

export type EmailSubscribeChannelsQueryVariables = {};


export type EmailSubscribeChannelsQuery = (
  { __typename?: 'Query' }
  & { subscribeChannels: Array<(
    { __typename?: 'EmailSubscribeChannel' }
    & SubscribeChannelFragment
  )> }
);

export type EmailMailchimpCategoriesQueryVariables = {};


export type EmailMailchimpCategoriesQuery = (
  { __typename?: 'Query' }
  & { mailchimpCategories: Array<(
    { __typename?: 'EmailMailchimpCategory' }
    & MailchimpCategoryFragment
  )> }
);

export type EmailSubscribeChannelDeleteMutationVariables = {
  slug: Types.Scalars['String'];
};


export type EmailSubscribeChannelDeleteMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'emailSubscribeChannelDelete'>
);

export type EmailSubscribeChannelAddEmailMutationVariables = {
  slug: Types.Scalars['String'];
  email: Types.Scalars['String'];
};


export type EmailSubscribeChannelAddEmailMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'emailSubscribeChannelAddEmail'>
);

export type EmailSubscribeChannelCreateMutationVariables = {
  params: Types.EmailSubscribeChannelCreateInput;
};


export type EmailSubscribeChannelCreateMutation = (
  { __typename?: 'Mutation' }
  & Pick<Types.Mutation, 'emailSubscribeChannelCreate'>
);

export const MailchimpInterestFragmentDoc = gql`
    fragment MailchimpInterest on EmailMailchimpInterest {
  id
  name
}
    `;
export const SubscribeChannelFragmentDoc = gql`
    fragment SubscribeChannel on EmailSubscribeChannel {
  id
  slug
  interests {
    ...MailchimpInterest
  }
}
    ${MailchimpInterestFragmentDoc}`;
export const MailchimpCategoryFragmentDoc = gql`
    fragment MailchimpCategory on EmailMailchimpCategory {
  id
  title
  interests {
    ...MailchimpInterest
  }
}
    ${MailchimpInterestFragmentDoc}`;
export const EmailSubscribeChannelsDocument = gql`
    query EmailSubscribeChannels {
  subscribeChannels: emailSubscribeChannelsAll {
    ...SubscribeChannel
  }
}
    ${SubscribeChannelFragmentDoc}`;

/**
 * __useEmailSubscribeChannelsQuery__
 *
 * To run a query within a React component, call `useEmailSubscribeChannelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmailSubscribeChannelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmailSubscribeChannelsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEmailSubscribeChannelsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EmailSubscribeChannelsQuery, EmailSubscribeChannelsQueryVariables>) {
        return ApolloReactHooks.useQuery<EmailSubscribeChannelsQuery, EmailSubscribeChannelsQueryVariables>(EmailSubscribeChannelsDocument, baseOptions);
      }
export function useEmailSubscribeChannelsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EmailSubscribeChannelsQuery, EmailSubscribeChannelsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EmailSubscribeChannelsQuery, EmailSubscribeChannelsQueryVariables>(EmailSubscribeChannelsDocument, baseOptions);
        }
export type EmailSubscribeChannelsQueryHookResult = ReturnType<typeof useEmailSubscribeChannelsQuery>;
export type EmailSubscribeChannelsLazyQueryHookResult = ReturnType<typeof useEmailSubscribeChannelsLazyQuery>;
export type EmailSubscribeChannelsQueryResult = ApolloReactCommon.QueryResult<EmailSubscribeChannelsQuery, EmailSubscribeChannelsQueryVariables>;
export const EmailMailchimpCategoriesDocument = gql`
    query EmailMailchimpCategories {
  mailchimpCategories: emailMailchimpCategoriesAll {
    ...MailchimpCategory
  }
}
    ${MailchimpCategoryFragmentDoc}`;

/**
 * __useEmailMailchimpCategoriesQuery__
 *
 * To run a query within a React component, call `useEmailMailchimpCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useEmailMailchimpCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEmailMailchimpCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useEmailMailchimpCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EmailMailchimpCategoriesQuery, EmailMailchimpCategoriesQueryVariables>) {
        return ApolloReactHooks.useQuery<EmailMailchimpCategoriesQuery, EmailMailchimpCategoriesQueryVariables>(EmailMailchimpCategoriesDocument, baseOptions);
      }
export function useEmailMailchimpCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EmailMailchimpCategoriesQuery, EmailMailchimpCategoriesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EmailMailchimpCategoriesQuery, EmailMailchimpCategoriesQueryVariables>(EmailMailchimpCategoriesDocument, baseOptions);
        }
export type EmailMailchimpCategoriesQueryHookResult = ReturnType<typeof useEmailMailchimpCategoriesQuery>;
export type EmailMailchimpCategoriesLazyQueryHookResult = ReturnType<typeof useEmailMailchimpCategoriesLazyQuery>;
export type EmailMailchimpCategoriesQueryResult = ApolloReactCommon.QueryResult<EmailMailchimpCategoriesQuery, EmailMailchimpCategoriesQueryVariables>;
export const EmailSubscribeChannelDeleteDocument = gql`
    mutation EmailSubscribeChannelDelete($slug: String!) {
  emailSubscribeChannelDelete(slug: $slug)
}
    `;
export type EmailSubscribeChannelDeleteMutationFn = ApolloReactCommon.MutationFunction<EmailSubscribeChannelDeleteMutation, EmailSubscribeChannelDeleteMutationVariables>;

/**
 * __useEmailSubscribeChannelDeleteMutation__
 *
 * To run a mutation, you first call `useEmailSubscribeChannelDeleteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmailSubscribeChannelDeleteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emailSubscribeChannelDeleteMutation, { data, loading, error }] = useEmailSubscribeChannelDeleteMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useEmailSubscribeChannelDeleteMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EmailSubscribeChannelDeleteMutation, EmailSubscribeChannelDeleteMutationVariables>) {
        return ApolloReactHooks.useMutation<EmailSubscribeChannelDeleteMutation, EmailSubscribeChannelDeleteMutationVariables>(EmailSubscribeChannelDeleteDocument, baseOptions);
      }
export type EmailSubscribeChannelDeleteMutationHookResult = ReturnType<typeof useEmailSubscribeChannelDeleteMutation>;
export type EmailSubscribeChannelDeleteMutationResult = ApolloReactCommon.MutationResult<EmailSubscribeChannelDeleteMutation>;
export type EmailSubscribeChannelDeleteMutationOptions = ApolloReactCommon.BaseMutationOptions<EmailSubscribeChannelDeleteMutation, EmailSubscribeChannelDeleteMutationVariables>;
export const EmailSubscribeChannelAddEmailDocument = gql`
    mutation EmailSubscribeChannelAddEmail($slug: String!, $email: String!) {
  emailSubscribeChannelAddEmail(slug: $slug, email: $email)
}
    `;
export type EmailSubscribeChannelAddEmailMutationFn = ApolloReactCommon.MutationFunction<EmailSubscribeChannelAddEmailMutation, EmailSubscribeChannelAddEmailMutationVariables>;

/**
 * __useEmailSubscribeChannelAddEmailMutation__
 *
 * To run a mutation, you first call `useEmailSubscribeChannelAddEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmailSubscribeChannelAddEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emailSubscribeChannelAddEmailMutation, { data, loading, error }] = useEmailSubscribeChannelAddEmailMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      email: // value for 'email'
 *   },
 * });
 */
export function useEmailSubscribeChannelAddEmailMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EmailSubscribeChannelAddEmailMutation, EmailSubscribeChannelAddEmailMutationVariables>) {
        return ApolloReactHooks.useMutation<EmailSubscribeChannelAddEmailMutation, EmailSubscribeChannelAddEmailMutationVariables>(EmailSubscribeChannelAddEmailDocument, baseOptions);
      }
export type EmailSubscribeChannelAddEmailMutationHookResult = ReturnType<typeof useEmailSubscribeChannelAddEmailMutation>;
export type EmailSubscribeChannelAddEmailMutationResult = ApolloReactCommon.MutationResult<EmailSubscribeChannelAddEmailMutation>;
export type EmailSubscribeChannelAddEmailMutationOptions = ApolloReactCommon.BaseMutationOptions<EmailSubscribeChannelAddEmailMutation, EmailSubscribeChannelAddEmailMutationVariables>;
export const EmailSubscribeChannelCreateDocument = gql`
    mutation EmailSubscribeChannelCreate($params: EmailSubscribeChannelCreateInput!) {
  emailSubscribeChannelCreate(params: $params)
}
    `;
export type EmailSubscribeChannelCreateMutationFn = ApolloReactCommon.MutationFunction<EmailSubscribeChannelCreateMutation, EmailSubscribeChannelCreateMutationVariables>;

/**
 * __useEmailSubscribeChannelCreateMutation__
 *
 * To run a mutation, you first call `useEmailSubscribeChannelCreateMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEmailSubscribeChannelCreateMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [emailSubscribeChannelCreateMutation, { data, loading, error }] = useEmailSubscribeChannelCreateMutation({
 *   variables: {
 *      params: // value for 'params'
 *   },
 * });
 */
export function useEmailSubscribeChannelCreateMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<EmailSubscribeChannelCreateMutation, EmailSubscribeChannelCreateMutationVariables>) {
        return ApolloReactHooks.useMutation<EmailSubscribeChannelCreateMutation, EmailSubscribeChannelCreateMutationVariables>(EmailSubscribeChannelCreateDocument, baseOptions);
      }
export type EmailSubscribeChannelCreateMutationHookResult = ReturnType<typeof useEmailSubscribeChannelCreateMutation>;
export type EmailSubscribeChannelCreateMutationResult = ApolloReactCommon.MutationResult<EmailSubscribeChannelCreateMutation>;
export type EmailSubscribeChannelCreateMutationOptions = ApolloReactCommon.BaseMutationOptions<EmailSubscribeChannelCreateMutation, EmailSubscribeChannelCreateMutationVariables>;