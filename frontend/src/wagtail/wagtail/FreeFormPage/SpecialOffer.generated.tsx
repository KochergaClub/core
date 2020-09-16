import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type SpecialOfferQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SpecialOfferQuery = (
  { __typename: 'Query' }
  & { specialOffer?: Types.Maybe<(
    { __typename: 'SpecialOffer' }
    & Pick<Types.SpecialOffer, 'text' | 'link' | 'button_text' | 'until' | 'hide_duration'>
  )> }
);


export const SpecialOfferDocument = gql`
    query SpecialOffer {
  specialOffer {
    text
    link
    button_text
    until
    hide_duration
  }
}
    `;

/**
 * __useSpecialOfferQuery__
 *
 * To run a query within a React component, call `useSpecialOfferQuery` and pass it any options that fit your needs.
 * When your component renders, `useSpecialOfferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSpecialOfferQuery({
 *   variables: {
 *   },
 * });
 */
export function useSpecialOfferQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<SpecialOfferQuery, SpecialOfferQueryVariables>) {
        return ApolloReactHooks.useQuery<SpecialOfferQuery, SpecialOfferQueryVariables>(SpecialOfferDocument, baseOptions);
      }
export function useSpecialOfferLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<SpecialOfferQuery, SpecialOfferQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<SpecialOfferQuery, SpecialOfferQueryVariables>(SpecialOfferDocument, baseOptions);
        }
export type SpecialOfferQueryHookResult = ReturnType<typeof useSpecialOfferQuery>;
export type SpecialOfferLazyQueryHookResult = ReturnType<typeof useSpecialOfferLazyQuery>;
export type SpecialOfferQueryResult = ApolloReactCommon.QueryResult<SpecialOfferQuery, SpecialOfferQueryVariables>;