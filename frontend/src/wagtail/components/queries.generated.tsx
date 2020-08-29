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
  & Pick<Types.WagtailStreamFieldValidationError, 'non_block_error'>
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

export type WagtailBlockStructureQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type WagtailBlockStructureQuery = (
  { __typename: 'Query' }
  & { result: (
    { __typename: 'WagtailBooleanBlockStructure' }
    & Pick<Types.WagtailBooleanBlockStructure, 'label'>
  ) | (
    { __typename: 'WagtailCharBlockStructure' }
    & Pick<Types.WagtailCharBlockStructure, 'label'>
  ) | (
    { __typename: 'WagtailImageBlockStructure' }
    & Pick<Types.WagtailImageBlockStructure, 'label'>
  ) | (
    { __typename: 'WagtailListBlockStructure' }
    & Pick<Types.WagtailListBlockStructure, 'label'>
    & { child_block: (
      { __typename: 'WagtailBooleanBlockStructure' }
      & Pick<Types.WagtailBooleanBlockStructure, 'label'>
    ) | (
      { __typename: 'WagtailCharBlockStructure' }
      & Pick<Types.WagtailCharBlockStructure, 'label'>
    ) | (
      { __typename: 'WagtailImageBlockStructure' }
      & Pick<Types.WagtailImageBlockStructure, 'label'>
    ) | (
      { __typename: 'WagtailListBlockStructure' }
      & Pick<Types.WagtailListBlockStructure, 'label'>
    ) | (
      { __typename: 'WagtailRichTextBlockStructure' }
      & Pick<Types.WagtailRichTextBlockStructure, 'label'>
    ) | (
      { __typename: 'WagtailStaticBlockStructure' }
      & Pick<Types.WagtailStaticBlockStructure, 'label'>
    ) | (
      { __typename: 'WagtailStructBlockStructure' }
      & Pick<Types.WagtailStructBlockStructure, 'label'>
      & { child_blocks: Array<(
        { __typename: 'WagtailStructBlockChildStructure' }
        & Pick<Types.WagtailStructBlockChildStructure, 'name'>
        & { definition: (
          { __typename: 'WagtailBooleanBlockStructure' }
          & Pick<Types.WagtailBooleanBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailCharBlockStructure' }
          & Pick<Types.WagtailCharBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailImageBlockStructure' }
          & Pick<Types.WagtailImageBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailListBlockStructure' }
          & Pick<Types.WagtailListBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailRichTextBlockStructure' }
          & Pick<Types.WagtailRichTextBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailStaticBlockStructure' }
          & Pick<Types.WagtailStaticBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailStructBlockStructure' }
          & Pick<Types.WagtailStructBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailURLBlockStructure' }
          & Pick<Types.WagtailUrlBlockStructure, 'label'>
        ) }
      )> }
    ) | (
      { __typename: 'WagtailURLBlockStructure' }
      & Pick<Types.WagtailUrlBlockStructure, 'label'>
    ) }
  ) | (
    { __typename: 'WagtailRichTextBlockStructure' }
    & Pick<Types.WagtailRichTextBlockStructure, 'label'>
  ) | (
    { __typename: 'WagtailStaticBlockStructure' }
    & Pick<Types.WagtailStaticBlockStructure, 'label'>
  ) | (
    { __typename: 'WagtailStructBlockStructure' }
    & Pick<Types.WagtailStructBlockStructure, 'label'>
    & { child_blocks: Array<(
      { __typename: 'WagtailStructBlockChildStructure' }
      & Pick<Types.WagtailStructBlockChildStructure, 'name'>
      & { definition: (
        { __typename: 'WagtailBooleanBlockStructure' }
        & Pick<Types.WagtailBooleanBlockStructure, 'label'>
      ) | (
        { __typename: 'WagtailCharBlockStructure' }
        & Pick<Types.WagtailCharBlockStructure, 'label'>
      ) | (
        { __typename: 'WagtailImageBlockStructure' }
        & Pick<Types.WagtailImageBlockStructure, 'label'>
      ) | (
        { __typename: 'WagtailListBlockStructure' }
        & Pick<Types.WagtailListBlockStructure, 'label'>
        & { child_block: (
          { __typename: 'WagtailBooleanBlockStructure' }
          & Pick<Types.WagtailBooleanBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailCharBlockStructure' }
          & Pick<Types.WagtailCharBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailImageBlockStructure' }
          & Pick<Types.WagtailImageBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailListBlockStructure' }
          & Pick<Types.WagtailListBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailRichTextBlockStructure' }
          & Pick<Types.WagtailRichTextBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailStaticBlockStructure' }
          & Pick<Types.WagtailStaticBlockStructure, 'label'>
        ) | (
          { __typename: 'WagtailStructBlockStructure' }
          & Pick<Types.WagtailStructBlockStructure, 'label'>
          & { child_blocks: Array<(
            { __typename: 'WagtailStructBlockChildStructure' }
            & Pick<Types.WagtailStructBlockChildStructure, 'name'>
            & { definition: (
              { __typename: 'WagtailBooleanBlockStructure' }
              & Pick<Types.WagtailBooleanBlockStructure, 'label'>
            ) | (
              { __typename: 'WagtailCharBlockStructure' }
              & Pick<Types.WagtailCharBlockStructure, 'label'>
            ) | (
              { __typename: 'WagtailImageBlockStructure' }
              & Pick<Types.WagtailImageBlockStructure, 'label'>
            ) | (
              { __typename: 'WagtailListBlockStructure' }
              & Pick<Types.WagtailListBlockStructure, 'label'>
            ) | (
              { __typename: 'WagtailRichTextBlockStructure' }
              & Pick<Types.WagtailRichTextBlockStructure, 'label'>
            ) | (
              { __typename: 'WagtailStaticBlockStructure' }
              & Pick<Types.WagtailStaticBlockStructure, 'label'>
            ) | (
              { __typename: 'WagtailStructBlockStructure' }
              & Pick<Types.WagtailStructBlockStructure, 'label'>
            ) | (
              { __typename: 'WagtailURLBlockStructure' }
              & Pick<Types.WagtailUrlBlockStructure, 'label'>
            ) }
          )> }
        ) | (
          { __typename: 'WagtailURLBlockStructure' }
          & Pick<Types.WagtailUrlBlockStructure, 'label'>
        ) }
      ) | (
        { __typename: 'WagtailRichTextBlockStructure' }
        & Pick<Types.WagtailRichTextBlockStructure, 'label'>
      ) | (
        { __typename: 'WagtailStaticBlockStructure' }
        & Pick<Types.WagtailStaticBlockStructure, 'label'>
      ) | (
        { __typename: 'WagtailStructBlockStructure' }
        & Pick<Types.WagtailStructBlockStructure, 'label'>
        & { child_blocks: Array<(
          { __typename: 'WagtailStructBlockChildStructure' }
          & Pick<Types.WagtailStructBlockChildStructure, 'name'>
          & { definition: (
            { __typename: 'WagtailBooleanBlockStructure' }
            & Pick<Types.WagtailBooleanBlockStructure, 'label'>
          ) | (
            { __typename: 'WagtailCharBlockStructure' }
            & Pick<Types.WagtailCharBlockStructure, 'label'>
          ) | (
            { __typename: 'WagtailImageBlockStructure' }
            & Pick<Types.WagtailImageBlockStructure, 'label'>
          ) | (
            { __typename: 'WagtailListBlockStructure' }
            & Pick<Types.WagtailListBlockStructure, 'label'>
          ) | (
            { __typename: 'WagtailRichTextBlockStructure' }
            & Pick<Types.WagtailRichTextBlockStructure, 'label'>
          ) | (
            { __typename: 'WagtailStaticBlockStructure' }
            & Pick<Types.WagtailStaticBlockStructure, 'label'>
          ) | (
            { __typename: 'WagtailStructBlockStructure' }
            & Pick<Types.WagtailStructBlockStructure, 'label'>
          ) | (
            { __typename: 'WagtailURLBlockStructure' }
            & Pick<Types.WagtailUrlBlockStructure, 'label'>
          ) }
        )> }
      ) | (
        { __typename: 'WagtailURLBlockStructure' }
        & Pick<Types.WagtailUrlBlockStructure, 'label'>
      ) }
    )> }
  ) | (
    { __typename: 'WagtailURLBlockStructure' }
    & Pick<Types.WagtailUrlBlockStructure, 'label'>
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
  non_block_error
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
export const WagtailBlockStructureDocument = gql`
    query WagtailBlockStructure($name: String!) {
  result: wagtailBlockStructure(input: {name: $name}) {
    label
    ... on WagtailListBlockStructure {
      child_block {
        label
        ... on WagtailStructBlockStructure {
          child_blocks {
            name
            definition {
              label
            }
          }
        }
      }
    }
    ... on WagtailStructBlockStructure {
      child_blocks {
        name
        definition {
          label
          ... on WagtailListBlockStructure {
            child_block {
              label
              ... on WagtailStructBlockStructure {
                child_blocks {
                  name
                  definition {
                    label
                  }
                }
              }
            }
          }
          ... on WagtailStructBlockStructure {
            child_blocks {
              name
              definition {
                label
              }
            }
          }
        }
      }
    }
  }
}
    `;

/**
 * __useWagtailBlockStructureQuery__
 *
 * To run a query within a React component, call `useWagtailBlockStructureQuery` and pass it any options that fit your needs.
 * When your component renders, `useWagtailBlockStructureQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWagtailBlockStructureQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useWagtailBlockStructureQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WagtailBlockStructureQuery, WagtailBlockStructureQueryVariables>) {
        return ApolloReactHooks.useQuery<WagtailBlockStructureQuery, WagtailBlockStructureQueryVariables>(WagtailBlockStructureDocument, baseOptions);
      }
export function useWagtailBlockStructureLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WagtailBlockStructureQuery, WagtailBlockStructureQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WagtailBlockStructureQuery, WagtailBlockStructureQueryVariables>(WagtailBlockStructureDocument, baseOptions);
        }
export type WagtailBlockStructureQueryHookResult = ReturnType<typeof useWagtailBlockStructureQuery>;
export type WagtailBlockStructureLazyQueryHookResult = ReturnType<typeof useWagtailBlockStructureLazyQuery>;
export type WagtailBlockStructureQueryResult = ApolloReactCommon.QueryResult<WagtailBlockStructureQuery, WagtailBlockStructureQueryVariables>;