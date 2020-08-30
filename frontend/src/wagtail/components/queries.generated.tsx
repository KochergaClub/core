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

export type StructureL0_WagtailBooleanBlockStructure_Fragment = (
  { __typename: 'WagtailBooleanBlockStructure' }
  & Pick<Types.WagtailBooleanBlockStructure, 'label'>
);

export type StructureL0_WagtailCharBlockStructure_Fragment = (
  { __typename: 'WagtailCharBlockStructure' }
  & Pick<Types.WagtailCharBlockStructure, 'label'>
);

export type StructureL0_WagtailImageBlockStructure_Fragment = (
  { __typename: 'WagtailImageBlockStructure' }
  & Pick<Types.WagtailImageBlockStructure, 'label'>
);

export type StructureL0_WagtailListBlockStructure_Fragment = (
  { __typename: 'WagtailListBlockStructure' }
  & Pick<Types.WagtailListBlockStructure, 'label'>
);

export type StructureL0_WagtailRichTextBlockStructure_Fragment = (
  { __typename: 'WagtailRichTextBlockStructure' }
  & Pick<Types.WagtailRichTextBlockStructure, 'label'>
);

export type StructureL0_WagtailStaticBlockStructure_Fragment = (
  { __typename: 'WagtailStaticBlockStructure' }
  & Pick<Types.WagtailStaticBlockStructure, 'label'>
);

export type StructureL0_WagtailStructBlockStructure_Fragment = (
  { __typename: 'WagtailStructBlockStructure' }
  & Pick<Types.WagtailStructBlockStructure, 'label'>
);

export type StructureL0_WagtailUrlBlockStructure_Fragment = (
  { __typename: 'WagtailURLBlockStructure' }
  & Pick<Types.WagtailUrlBlockStructure, 'label'>
);

export type StructureL0Fragment = StructureL0_WagtailBooleanBlockStructure_Fragment | StructureL0_WagtailCharBlockStructure_Fragment | StructureL0_WagtailImageBlockStructure_Fragment | StructureL0_WagtailListBlockStructure_Fragment | StructureL0_WagtailRichTextBlockStructure_Fragment | StructureL0_WagtailStaticBlockStructure_Fragment | StructureL0_WagtailStructBlockStructure_Fragment | StructureL0_WagtailUrlBlockStructure_Fragment;

export type StructureL1_WagtailBooleanBlockStructure_Fragment = (
  { __typename: 'WagtailBooleanBlockStructure' }
  & Pick<Types.WagtailBooleanBlockStructure, 'label'>
);

export type StructureL1_WagtailCharBlockStructure_Fragment = (
  { __typename: 'WagtailCharBlockStructure' }
  & Pick<Types.WagtailCharBlockStructure, 'label'>
);

export type StructureL1_WagtailImageBlockStructure_Fragment = (
  { __typename: 'WagtailImageBlockStructure' }
  & Pick<Types.WagtailImageBlockStructure, 'label'>
);

export type StructureL1_WagtailListBlockStructure_Fragment = (
  { __typename: 'WagtailListBlockStructure' }
  & Pick<Types.WagtailListBlockStructure, 'label'>
  & { child_block: (
    { __typename: 'WagtailBooleanBlockStructure' }
    & StructureL0_WagtailBooleanBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailCharBlockStructure' }
    & StructureL0_WagtailCharBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailImageBlockStructure' }
    & StructureL0_WagtailImageBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailListBlockStructure' }
    & StructureL0_WagtailListBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailRichTextBlockStructure' }
    & StructureL0_WagtailRichTextBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStaticBlockStructure' }
    & StructureL0_WagtailStaticBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStructBlockStructure' }
    & StructureL0_WagtailStructBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailURLBlockStructure' }
    & StructureL0_WagtailUrlBlockStructure_Fragment
  ) }
);

export type StructureL1_WagtailRichTextBlockStructure_Fragment = (
  { __typename: 'WagtailRichTextBlockStructure' }
  & Pick<Types.WagtailRichTextBlockStructure, 'label'>
);

export type StructureL1_WagtailStaticBlockStructure_Fragment = (
  { __typename: 'WagtailStaticBlockStructure' }
  & Pick<Types.WagtailStaticBlockStructure, 'label'>
);

export type StructureL1_WagtailStructBlockStructure_Fragment = (
  { __typename: 'WagtailStructBlockStructure' }
  & Pick<Types.WagtailStructBlockStructure, 'label'>
  & { child_blocks: Array<(
    { __typename: 'WagtailStructBlockChildStructure' }
    & Pick<Types.WagtailStructBlockChildStructure, 'name'>
    & { definition: (
      { __typename: 'WagtailBooleanBlockStructure' }
      & StructureL0_WagtailBooleanBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailCharBlockStructure' }
      & StructureL0_WagtailCharBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailImageBlockStructure' }
      & StructureL0_WagtailImageBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailListBlockStructure' }
      & StructureL0_WagtailListBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailRichTextBlockStructure' }
      & StructureL0_WagtailRichTextBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailStaticBlockStructure' }
      & StructureL0_WagtailStaticBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailStructBlockStructure' }
      & StructureL0_WagtailStructBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailURLBlockStructure' }
      & StructureL0_WagtailUrlBlockStructure_Fragment
    ) }
  )> }
);

export type StructureL1_WagtailUrlBlockStructure_Fragment = (
  { __typename: 'WagtailURLBlockStructure' }
  & Pick<Types.WagtailUrlBlockStructure, 'label'>
);

export type StructureL1Fragment = StructureL1_WagtailBooleanBlockStructure_Fragment | StructureL1_WagtailCharBlockStructure_Fragment | StructureL1_WagtailImageBlockStructure_Fragment | StructureL1_WagtailListBlockStructure_Fragment | StructureL1_WagtailRichTextBlockStructure_Fragment | StructureL1_WagtailStaticBlockStructure_Fragment | StructureL1_WagtailStructBlockStructure_Fragment | StructureL1_WagtailUrlBlockStructure_Fragment;

export type StructureL2_WagtailBooleanBlockStructure_Fragment = (
  { __typename: 'WagtailBooleanBlockStructure' }
  & Pick<Types.WagtailBooleanBlockStructure, 'label'>
);

export type StructureL2_WagtailCharBlockStructure_Fragment = (
  { __typename: 'WagtailCharBlockStructure' }
  & Pick<Types.WagtailCharBlockStructure, 'label'>
);

export type StructureL2_WagtailImageBlockStructure_Fragment = (
  { __typename: 'WagtailImageBlockStructure' }
  & Pick<Types.WagtailImageBlockStructure, 'label'>
);

export type StructureL2_WagtailListBlockStructure_Fragment = (
  { __typename: 'WagtailListBlockStructure' }
  & Pick<Types.WagtailListBlockStructure, 'label'>
  & { child_block: (
    { __typename: 'WagtailBooleanBlockStructure' }
    & StructureL1_WagtailBooleanBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailCharBlockStructure' }
    & StructureL1_WagtailCharBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailImageBlockStructure' }
    & StructureL1_WagtailImageBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailListBlockStructure' }
    & StructureL1_WagtailListBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailRichTextBlockStructure' }
    & StructureL1_WagtailRichTextBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStaticBlockStructure' }
    & StructureL1_WagtailStaticBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStructBlockStructure' }
    & StructureL1_WagtailStructBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailURLBlockStructure' }
    & StructureL1_WagtailUrlBlockStructure_Fragment
  ) }
);

export type StructureL2_WagtailRichTextBlockStructure_Fragment = (
  { __typename: 'WagtailRichTextBlockStructure' }
  & Pick<Types.WagtailRichTextBlockStructure, 'label'>
);

export type StructureL2_WagtailStaticBlockStructure_Fragment = (
  { __typename: 'WagtailStaticBlockStructure' }
  & Pick<Types.WagtailStaticBlockStructure, 'label'>
);

export type StructureL2_WagtailStructBlockStructure_Fragment = (
  { __typename: 'WagtailStructBlockStructure' }
  & Pick<Types.WagtailStructBlockStructure, 'label'>
  & { child_blocks: Array<(
    { __typename: 'WagtailStructBlockChildStructure' }
    & Pick<Types.WagtailStructBlockChildStructure, 'name'>
    & { definition: (
      { __typename: 'WagtailBooleanBlockStructure' }
      & StructureL1_WagtailBooleanBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailCharBlockStructure' }
      & StructureL1_WagtailCharBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailImageBlockStructure' }
      & StructureL1_WagtailImageBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailListBlockStructure' }
      & StructureL1_WagtailListBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailRichTextBlockStructure' }
      & StructureL1_WagtailRichTextBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailStaticBlockStructure' }
      & StructureL1_WagtailStaticBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailStructBlockStructure' }
      & StructureL1_WagtailStructBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailURLBlockStructure' }
      & StructureL1_WagtailUrlBlockStructure_Fragment
    ) }
  )> }
);

export type StructureL2_WagtailUrlBlockStructure_Fragment = (
  { __typename: 'WagtailURLBlockStructure' }
  & Pick<Types.WagtailUrlBlockStructure, 'label'>
);

export type StructureL2Fragment = StructureL2_WagtailBooleanBlockStructure_Fragment | StructureL2_WagtailCharBlockStructure_Fragment | StructureL2_WagtailImageBlockStructure_Fragment | StructureL2_WagtailListBlockStructure_Fragment | StructureL2_WagtailRichTextBlockStructure_Fragment | StructureL2_WagtailStaticBlockStructure_Fragment | StructureL2_WagtailStructBlockStructure_Fragment | StructureL2_WagtailUrlBlockStructure_Fragment;

export type StructureL3_WagtailBooleanBlockStructure_Fragment = (
  { __typename: 'WagtailBooleanBlockStructure' }
  & Pick<Types.WagtailBooleanBlockStructure, 'label'>
);

export type StructureL3_WagtailCharBlockStructure_Fragment = (
  { __typename: 'WagtailCharBlockStructure' }
  & Pick<Types.WagtailCharBlockStructure, 'label'>
);

export type StructureL3_WagtailImageBlockStructure_Fragment = (
  { __typename: 'WagtailImageBlockStructure' }
  & Pick<Types.WagtailImageBlockStructure, 'label'>
);

export type StructureL3_WagtailListBlockStructure_Fragment = (
  { __typename: 'WagtailListBlockStructure' }
  & Pick<Types.WagtailListBlockStructure, 'label'>
  & { child_block: (
    { __typename: 'WagtailBooleanBlockStructure' }
    & StructureL2_WagtailBooleanBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailCharBlockStructure' }
    & StructureL2_WagtailCharBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailImageBlockStructure' }
    & StructureL2_WagtailImageBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailListBlockStructure' }
    & StructureL2_WagtailListBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailRichTextBlockStructure' }
    & StructureL2_WagtailRichTextBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStaticBlockStructure' }
    & StructureL2_WagtailStaticBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStructBlockStructure' }
    & StructureL2_WagtailStructBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailURLBlockStructure' }
    & StructureL2_WagtailUrlBlockStructure_Fragment
  ) }
);

export type StructureL3_WagtailRichTextBlockStructure_Fragment = (
  { __typename: 'WagtailRichTextBlockStructure' }
  & Pick<Types.WagtailRichTextBlockStructure, 'label'>
);

export type StructureL3_WagtailStaticBlockStructure_Fragment = (
  { __typename: 'WagtailStaticBlockStructure' }
  & Pick<Types.WagtailStaticBlockStructure, 'label'>
);

export type StructureL3_WagtailStructBlockStructure_Fragment = (
  { __typename: 'WagtailStructBlockStructure' }
  & Pick<Types.WagtailStructBlockStructure, 'label'>
  & { child_blocks: Array<(
    { __typename: 'WagtailStructBlockChildStructure' }
    & Pick<Types.WagtailStructBlockChildStructure, 'name'>
    & { definition: (
      { __typename: 'WagtailBooleanBlockStructure' }
      & StructureL2_WagtailBooleanBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailCharBlockStructure' }
      & StructureL2_WagtailCharBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailImageBlockStructure' }
      & StructureL2_WagtailImageBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailListBlockStructure' }
      & StructureL2_WagtailListBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailRichTextBlockStructure' }
      & StructureL2_WagtailRichTextBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailStaticBlockStructure' }
      & StructureL2_WagtailStaticBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailStructBlockStructure' }
      & StructureL2_WagtailStructBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailURLBlockStructure' }
      & StructureL2_WagtailUrlBlockStructure_Fragment
    ) }
  )> }
);

export type StructureL3_WagtailUrlBlockStructure_Fragment = (
  { __typename: 'WagtailURLBlockStructure' }
  & Pick<Types.WagtailUrlBlockStructure, 'label'>
);

export type StructureL3Fragment = StructureL3_WagtailBooleanBlockStructure_Fragment | StructureL3_WagtailCharBlockStructure_Fragment | StructureL3_WagtailImageBlockStructure_Fragment | StructureL3_WagtailListBlockStructure_Fragment | StructureL3_WagtailRichTextBlockStructure_Fragment | StructureL3_WagtailStaticBlockStructure_Fragment | StructureL3_WagtailStructBlockStructure_Fragment | StructureL3_WagtailUrlBlockStructure_Fragment;

export type WagtailBlockStructureQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type WagtailBlockStructureQuery = (
  { __typename: 'Query' }
  & { result: (
    { __typename: 'WagtailBooleanBlockStructure' }
    & StructureL3_WagtailBooleanBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailCharBlockStructure' }
    & StructureL3_WagtailCharBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailImageBlockStructure' }
    & StructureL3_WagtailImageBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailListBlockStructure' }
    & StructureL3_WagtailListBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailRichTextBlockStructure' }
    & StructureL3_WagtailRichTextBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStaticBlockStructure' }
    & StructureL3_WagtailStaticBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStructBlockStructure' }
    & StructureL3_WagtailStructBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailURLBlockStructure' }
    & StructureL3_WagtailUrlBlockStructure_Fragment
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
export const StructureL0FragmentDoc = gql`
    fragment StructureL0 on WagtailBlockStructure {
  label
}
    `;
export const StructureL1FragmentDoc = gql`
    fragment StructureL1 on WagtailBlockStructure {
  label
  ... on WagtailListBlockStructure {
    child_block {
      ...StructureL0
    }
  }
  ... on WagtailStructBlockStructure {
    child_blocks {
      name
      definition {
        ...StructureL0
      }
    }
  }
}
    ${StructureL0FragmentDoc}`;
export const StructureL2FragmentDoc = gql`
    fragment StructureL2 on WagtailBlockStructure {
  label
  ... on WagtailListBlockStructure {
    child_block {
      ...StructureL1
    }
  }
  ... on WagtailStructBlockStructure {
    child_blocks {
      name
      definition {
        ...StructureL1
      }
    }
  }
}
    ${StructureL1FragmentDoc}`;
export const StructureL3FragmentDoc = gql`
    fragment StructureL3 on WagtailBlockStructure {
  label
  ... on WagtailListBlockStructure {
    child_block {
      ...StructureL2
    }
  }
  ... on WagtailStructBlockStructure {
    child_blocks {
      name
      definition {
        ...StructureL2
      }
    }
  }
}
    ${StructureL2FragmentDoc}`;
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
    ...StructureL3
  }
}
    ${StructureL3FragmentDoc}`;

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