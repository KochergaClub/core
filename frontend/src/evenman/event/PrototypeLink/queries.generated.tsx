import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';

export type EvenmanPrototypesForPickerQueryVariables = {};


export type EvenmanPrototypesForPickerQuery = (
  { __typename?: 'Query' }
  & { prototypes: Array<(
    { __typename?: 'EventsPrototype' }
    & Pick<Types.EventsPrototype, 'id' | 'title'>
  )> }
);


export const EvenmanPrototypesForPickerDocument = gql`
    query EvenmanPrototypesForPicker {
  prototypes: eventsPrototypes {
    id
    title
  }
}
    `;

/**
 * __useEvenmanPrototypesForPickerQuery__
 *
 * To run a query within a React component, call `useEvenmanPrototypesForPickerQuery` and pass it any options that fit your needs.
 * When your component renders, `useEvenmanPrototypesForPickerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEvenmanPrototypesForPickerQuery({
 *   variables: {
 *   },
 * });
 */
export function useEvenmanPrototypesForPickerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EvenmanPrototypesForPickerQuery, EvenmanPrototypesForPickerQueryVariables>) {
        return ApolloReactHooks.useQuery<EvenmanPrototypesForPickerQuery, EvenmanPrototypesForPickerQueryVariables>(EvenmanPrototypesForPickerDocument, baseOptions);
      }
export function useEvenmanPrototypesForPickerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EvenmanPrototypesForPickerQuery, EvenmanPrototypesForPickerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<EvenmanPrototypesForPickerQuery, EvenmanPrototypesForPickerQueryVariables>(EvenmanPrototypesForPickerDocument, baseOptions);
        }
export type EvenmanPrototypesForPickerQueryHookResult = ReturnType<typeof useEvenmanPrototypesForPickerQuery>;
export type EvenmanPrototypesForPickerLazyQueryHookResult = ReturnType<typeof useEvenmanPrototypesForPickerLazyQuery>;
export type EvenmanPrototypesForPickerQueryResult = ApolloReactCommon.QueryResult<EvenmanPrototypesForPickerQuery, EvenmanPrototypesForPickerQueryVariables>;