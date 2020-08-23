import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type WagtailUploadImageFromUrlMutationVariables = Types.Exact<{
  input: Types.WagtailUploadImageFromUrlInput;
}>;


export type WagtailUploadImageFromUrlMutation = (
  { __typename?: 'Mutation' }
  & { result: (
    { __typename?: 'WagtailUploadImageFromUrlResult' }
    & { image: (
      { __typename?: 'WagtailImage' }
      & Pick<Types.WagtailImage, 'id'>
    ) }
  ) }
);


export const WagtailUploadImageFromUrlDocument = gql`
    mutation WagtailUploadImageFromUrl($input: WagtailUploadImageFromUrlInput!) {
  result: wagtailUploadImageFromUrl(input: $input) {
    image {
      id
    }
  }
}
    `;
export type WagtailUploadImageFromUrlMutationFn = ApolloReactCommon.MutationFunction<WagtailUploadImageFromUrlMutation, WagtailUploadImageFromUrlMutationVariables>;

/**
 * __useWagtailUploadImageFromUrlMutation__
 *
 * To run a mutation, you first call `useWagtailUploadImageFromUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWagtailUploadImageFromUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [wagtailUploadImageFromUrlMutation, { data, loading, error }] = useWagtailUploadImageFromUrlMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useWagtailUploadImageFromUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<WagtailUploadImageFromUrlMutation, WagtailUploadImageFromUrlMutationVariables>) {
        return ApolloReactHooks.useMutation<WagtailUploadImageFromUrlMutation, WagtailUploadImageFromUrlMutationVariables>(WagtailUploadImageFromUrlDocument, baseOptions);
      }
export type WagtailUploadImageFromUrlMutationHookResult = ReturnType<typeof useWagtailUploadImageFromUrlMutation>;
export type WagtailUploadImageFromUrlMutationResult = ApolloReactCommon.MutationResult<WagtailUploadImageFromUrlMutation>;
export type WagtailUploadImageFromUrlMutationOptions = ApolloReactCommon.BaseMutationOptions<WagtailUploadImageFromUrlMutation, WagtailUploadImageFromUrlMutationVariables>;