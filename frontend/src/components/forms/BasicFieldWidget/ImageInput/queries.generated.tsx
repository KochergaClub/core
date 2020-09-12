import * as Types from '../../../../apollo/types.generated';

import { WagtailImage_ForEditorFragment } from '../../../images/ImageEditor/fragments.generated';
import gql from 'graphql-tag';
import { WagtailImage_ForEditorFragmentDoc } from '../../../images/ImageEditor/fragments.generated';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type WagtailImageQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type WagtailImageQuery = (
  { __typename: 'Query' }
  & { result?: Types.Maybe<(
    { __typename: 'WagtailImage' }
    & WagtailImage_ForEditorFragment
  )> }
);


export const WagtailImageDocument = gql`
    query WagtailImage($id: ID!) {
  result: wagtailImage(input: {id: $id}) {
    ...WagtailImage_ForEditor
  }
}
    ${WagtailImage_ForEditorFragmentDoc}`;

/**
 * __useWagtailImageQuery__
 *
 * To run a query within a React component, call `useWagtailImageQuery` and pass it any options that fit your needs.
 * When your component renders, `useWagtailImageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWagtailImageQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWagtailImageQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WagtailImageQuery, WagtailImageQueryVariables>) {
        return ApolloReactHooks.useQuery<WagtailImageQuery, WagtailImageQueryVariables>(WagtailImageDocument, baseOptions);
      }
export function useWagtailImageLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WagtailImageQuery, WagtailImageQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WagtailImageQuery, WagtailImageQueryVariables>(WagtailImageDocument, baseOptions);
        }
export type WagtailImageQueryHookResult = ReturnType<typeof useWagtailImageQuery>;
export type WagtailImageLazyQueryHookResult = ReturnType<typeof useWagtailImageLazyQuery>;
export type WagtailImageQueryResult = ApolloReactCommon.QueryResult<WagtailImageQuery, WagtailImageQueryVariables>;