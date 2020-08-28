import * as Types from '../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type WagtailBlockValidationErrorFragment = (
  { __typename: 'WagtailBlockValidationError' }
  & Pick<Types.WagtailBlockValidationError, 'block_id' | 'error_message'>
);

export type WagtailStreamFieldValidationErrorFragment = (
  { __typename: 'WagtailStreamFieldValidationError' }
  & { block_errors: Array<(
    { __typename: 'WagtailBlockValidationError' }
    & WagtailBlockValidationErrorFragment
  )> }
);

export type WagtailSavePageMutationVariables = Types.Exact<{
  input: Types.WagtailEditPageBodyBlocksInput;
}>;


export type WagtailSavePageMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'WagtailEditPageBodyBlocksResult' }
    & { page?: Types.Maybe<(
      { __typename: 'BlogIndexPage' }
      & Pick<Types.BlogIndexPage, 'id'>
    ) | (
      { __typename: 'BlogPostPage' }
      & Pick<Types.BlogPostPage, 'id'>
    ) | (
      { __typename: 'FaqPage' }
      & Pick<Types.FaqPage, 'id'>
    ) | (
      { __typename: 'FolderPage' }
      & Pick<Types.FolderPage, 'id'>
    ) | (
      { __typename: 'FreeFormPage' }
      & Pick<Types.FreeFormPage, 'id'>
    ) | (
      { __typename: 'PresentationPage' }
      & Pick<Types.PresentationPage, 'id'>
    ) | (
      { __typename: 'ProjectIndexPage' }
      & Pick<Types.ProjectIndexPage, 'id'>
    ) | (
      { __typename: 'ProjectPage' }
      & Pick<Types.ProjectPage, 'id'>
    ) | (
      { __typename: 'RatioNotebookIndexPage' }
      & Pick<Types.RatioNotebookIndexPage, 'id'>
    ) | (
      { __typename: 'RatioNotebookPage' }
      & Pick<Types.RatioNotebookPage, 'id'>
    ) | (
      { __typename: 'RatioPresentationIndexPage' }
      & Pick<Types.RatioPresentationIndexPage, 'id'>
    ) | (
      { __typename: 'RatioSectionIndexPage' }
      & Pick<Types.RatioSectionIndexPage, 'id'>
    ) | (
      { __typename: 'RatioSectionPage' }
      & Pick<Types.RatioSectionPage, 'id'>
    )>, validation_error?: Types.Maybe<(
      { __typename: 'WagtailStreamFieldValidationError' }
      & WagtailStreamFieldValidationErrorFragment
    )> }
  ) }
);

export const WagtailBlockValidationErrorFragmentDoc = gql`
    fragment WagtailBlockValidationError on WagtailBlockValidationError {
  block_id
  error_message
}
    `;
export const WagtailStreamFieldValidationErrorFragmentDoc = gql`
    fragment WagtailStreamFieldValidationError on WagtailStreamFieldValidationError {
  block_errors {
    ...WagtailBlockValidationError
  }
}
    ${WagtailBlockValidationErrorFragmentDoc}`;
export const WagtailSavePageDocument = gql`
    mutation WagtailSavePage($input: WagtailEditPageBodyBlocksInput!) {
  result: wagtailEditPageBodyBlocks(input: $input) {
    page {
      id
    }
    validation_error {
      ...WagtailStreamFieldValidationError
    }
  }
}
    ${WagtailStreamFieldValidationErrorFragmentDoc}`;
export type WagtailSavePageMutationFn = ApolloReactCommon.MutationFunction<WagtailSavePageMutation, WagtailSavePageMutationVariables>;

/**
 * __useWagtailSavePageMutation__
 *
 * To run a mutation, you first call `useWagtailSavePageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useWagtailSavePageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [wagtailSavePageMutation, { data, loading, error }] = useWagtailSavePageMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useWagtailSavePageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<WagtailSavePageMutation, WagtailSavePageMutationVariables>) {
        return ApolloReactHooks.useMutation<WagtailSavePageMutation, WagtailSavePageMutationVariables>(WagtailSavePageDocument, baseOptions);
      }
export type WagtailSavePageMutationHookResult = ReturnType<typeof useWagtailSavePageMutation>;
export type WagtailSavePageMutationResult = ApolloReactCommon.MutationResult<WagtailSavePageMutation>;
export type WagtailSavePageMutationOptions = ApolloReactCommon.BaseMutationOptions<WagtailSavePageMutation, WagtailSavePageMutationVariables>;