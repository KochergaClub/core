import * as Types from '../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type AuthCurrentUserFragment = (
  { __typename?: 'AuthCurrentUser' }
  & Pick<Types.AuthCurrentUser, 'id' | 'is_authenticated' | 'is_staff' | 'permissions' | 'email'>
);

export type CurrentUserQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = (
  { __typename?: 'Query' }
  & { my: (
    { __typename?: 'My' }
    & { user: (
      { __typename?: 'AuthCurrentUser' }
      & AuthCurrentUserFragment
    ) }
  ) }
);

export type LoginMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  password: Types.Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'AuthLoginResult' }
    & Pick<Types.AuthLoginResult, 'error'>
    & { user?: Types.Maybe<(
      { __typename?: 'AuthCurrentUser' }
      & AuthCurrentUserFragment
    )> }
  ) }
);

export type TokenLoginMutationVariables = Types.Exact<{
  token: Types.Scalars['String'];
}>;


export type TokenLoginMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'AuthLoginResult' }
    & Pick<Types.AuthLoginResult, 'error'>
    & { user?: Types.Maybe<(
      { __typename?: 'AuthCurrentUser' }
      & AuthCurrentUserFragment
    )> }
  ) }
);

export type SendMagicLinkMutationVariables = Types.Exact<{
  email: Types.Scalars['String'];
  next?: Types.Maybe<Types.Scalars['String']>;
}>;


export type SendMagicLinkMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'AuthSendMagicLinkResult' }
    & Pick<Types.AuthSendMagicLinkResult, 'ok' | 'error'>
  ) }
);

export const AuthCurrentUserFragmentDoc = gql`
    fragment AuthCurrentUser on AuthCurrentUser {
  id
  is_authenticated
  is_staff
  permissions
  email
}
    `;
export const CurrentUserDocument = gql`
    query CurrentUser {
  my {
    user {
      ...AuthCurrentUser
    }
  }
}
    ${AuthCurrentUserFragmentDoc}`;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        return ApolloReactHooks.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
      }
export function useCurrentUserLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, baseOptions);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = ApolloReactCommon.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  result: authLogin(input: {credentials: {email: $email, password: $password}, result: "cookie"}) {
    error
    user {
      ...AuthCurrentUser
    }
  }
}
    ${AuthCurrentUserFragmentDoc}`;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const TokenLoginDocument = gql`
    mutation TokenLogin($token: String!) {
  result: authLogin(input: {credentials: {token: $token}, result: "cookie"}) {
    error
    user {
      ...AuthCurrentUser
    }
  }
}
    ${AuthCurrentUserFragmentDoc}`;
export type TokenLoginMutationFn = ApolloReactCommon.MutationFunction<TokenLoginMutation, TokenLoginMutationVariables>;

/**
 * __useTokenLoginMutation__
 *
 * To run a mutation, you first call `useTokenLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenLoginMutation, { data, loading, error }] = useTokenLoginMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useTokenLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TokenLoginMutation, TokenLoginMutationVariables>) {
        return ApolloReactHooks.useMutation<TokenLoginMutation, TokenLoginMutationVariables>(TokenLoginDocument, baseOptions);
      }
export type TokenLoginMutationHookResult = ReturnType<typeof useTokenLoginMutation>;
export type TokenLoginMutationResult = ApolloReactCommon.MutationResult<TokenLoginMutation>;
export type TokenLoginMutationOptions = ApolloReactCommon.BaseMutationOptions<TokenLoginMutation, TokenLoginMutationVariables>;
export const SendMagicLinkDocument = gql`
    mutation SendMagicLink($email: String!, $next: String) {
  result: authSendMagicLink(input: {email: $email, next: $next}) {
    ok
    error
  }
}
    `;
export type SendMagicLinkMutationFn = ApolloReactCommon.MutationFunction<SendMagicLinkMutation, SendMagicLinkMutationVariables>;

/**
 * __useSendMagicLinkMutation__
 *
 * To run a mutation, you first call `useSendMagicLinkMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendMagicLinkMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendMagicLinkMutation, { data, loading, error }] = useSendMagicLinkMutation({
 *   variables: {
 *      email: // value for 'email'
 *      next: // value for 'next'
 *   },
 * });
 */
export function useSendMagicLinkMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SendMagicLinkMutation, SendMagicLinkMutationVariables>) {
        return ApolloReactHooks.useMutation<SendMagicLinkMutation, SendMagicLinkMutationVariables>(SendMagicLinkDocument, baseOptions);
      }
export type SendMagicLinkMutationHookResult = ReturnType<typeof useSendMagicLinkMutation>;
export type SendMagicLinkMutationResult = ApolloReactCommon.MutationResult<SendMagicLinkMutation>;
export type SendMagicLinkMutationOptions = ApolloReactCommon.BaseMutationOptions<SendMagicLinkMutation, SendMagicLinkMutationVariables>;