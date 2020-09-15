import * as Types from '../../apollo/types.generated';

import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';

export type WagtailStreamFieldValidationErrorFragment = (
  { __typename: 'WagtailStreamFieldValidationError' }
  & Pick<Types.WagtailStreamFieldValidationError, 'non_block_error'>
  & { block_errors: Array<(
    { __typename: 'WagtailStreamBlockValidationError' }
    & Pick<Types.WagtailStreamBlockValidationError, 'block_id'>
    & { error?: Types.Maybe<(
      { __typename: 'WagtailAnyBlockValidationError' }
      & Pick<Types.WagtailAnyBlockValidationError, 'error_message'>
    ) | (
      { __typename: 'WagtailListBlockValidationError' }
      & Pick<Types.WagtailListBlockValidationError, 'error_message'>
    ) | (
      { __typename: 'WagtailStructBlockValidationError' }
      & Pick<Types.WagtailStructBlockValidationError, 'error_message'>
    )> }
  )> }
);

export type StructureCommon_WagtailBooleanBlockStructure_Fragment = (
  { __typename: 'WagtailBooleanBlockStructure' }
  & Pick<Types.WagtailBooleanBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailCharBlockStructure_Fragment = (
  { __typename: 'WagtailCharBlockStructure' }
  & Pick<Types.WagtailCharBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailImageBlockStructure_Fragment = (
  { __typename: 'WagtailImageBlockStructure' }
  & Pick<Types.WagtailImageBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailListBlockStructure_Fragment = (
  { __typename: 'WagtailListBlockStructure' }
  & Pick<Types.WagtailListBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailRichTextBlockStructure_Fragment = (
  { __typename: 'WagtailRichTextBlockStructure' }
  & Pick<Types.WagtailRichTextBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailStaticBlockStructure_Fragment = (
  { __typename: 'WagtailStaticBlockStructure' }
  & Pick<Types.WagtailStaticBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailStructBlockStructure_Fragment = (
  { __typename: 'WagtailStructBlockStructure' }
  & Pick<Types.WagtailStructBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailUrlBlockStructure_Fragment = (
  { __typename: 'WagtailURLBlockStructure' }
  & Pick<Types.WagtailUrlBlockStructure, 'label' | 'required'>
);

export type StructureCommonFragment = StructureCommon_WagtailBooleanBlockStructure_Fragment | StructureCommon_WagtailCharBlockStructure_Fragment | StructureCommon_WagtailImageBlockStructure_Fragment | StructureCommon_WagtailListBlockStructure_Fragment | StructureCommon_WagtailRichTextBlockStructure_Fragment | StructureCommon_WagtailStaticBlockStructure_Fragment | StructureCommon_WagtailStructBlockStructure_Fragment | StructureCommon_WagtailUrlBlockStructure_Fragment;

export type StructureL1_WagtailBooleanBlockStructure_Fragment = (
  { __typename: 'WagtailBooleanBlockStructure' }
  & StructureCommon_WagtailBooleanBlockStructure_Fragment
);

export type StructureL1_WagtailCharBlockStructure_Fragment = (
  { __typename: 'WagtailCharBlockStructure' }
  & StructureCommon_WagtailCharBlockStructure_Fragment
);

export type StructureL1_WagtailImageBlockStructure_Fragment = (
  { __typename: 'WagtailImageBlockStructure' }
  & StructureCommon_WagtailImageBlockStructure_Fragment
);

export type StructureL1_WagtailListBlockStructure_Fragment = (
  { __typename: 'WagtailListBlockStructure' }
  & { child_block: (
    { __typename: 'WagtailBooleanBlockStructure' }
    & StructureCommon_WagtailBooleanBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailCharBlockStructure' }
    & StructureCommon_WagtailCharBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailImageBlockStructure' }
    & StructureCommon_WagtailImageBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailListBlockStructure' }
    & StructureCommon_WagtailListBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailRichTextBlockStructure' }
    & StructureCommon_WagtailRichTextBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStaticBlockStructure' }
    & StructureCommon_WagtailStaticBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStructBlockStructure' }
    & StructureCommon_WagtailStructBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailURLBlockStructure' }
    & StructureCommon_WagtailUrlBlockStructure_Fragment
  ) }
  & StructureCommon_WagtailListBlockStructure_Fragment
);

export type StructureL1_WagtailRichTextBlockStructure_Fragment = (
  { __typename: 'WagtailRichTextBlockStructure' }
  & StructureCommon_WagtailRichTextBlockStructure_Fragment
);

export type StructureL1_WagtailStaticBlockStructure_Fragment = (
  { __typename: 'WagtailStaticBlockStructure' }
  & StructureCommon_WagtailStaticBlockStructure_Fragment
);

export type StructureL1_WagtailStructBlockStructure_Fragment = (
  { __typename: 'WagtailStructBlockStructure' }
  & { child_blocks: Array<(
    { __typename: 'WagtailStructBlockChildStructure' }
    & Pick<Types.WagtailStructBlockChildStructure, 'name'>
    & { definition: (
      { __typename: 'WagtailBooleanBlockStructure' }
      & StructureCommon_WagtailBooleanBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailCharBlockStructure' }
      & StructureCommon_WagtailCharBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailImageBlockStructure' }
      & StructureCommon_WagtailImageBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailListBlockStructure' }
      & StructureCommon_WagtailListBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailRichTextBlockStructure' }
      & StructureCommon_WagtailRichTextBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailStaticBlockStructure' }
      & StructureCommon_WagtailStaticBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailStructBlockStructure' }
      & StructureCommon_WagtailStructBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailURLBlockStructure' }
      & StructureCommon_WagtailUrlBlockStructure_Fragment
    ) }
  )> }
  & StructureCommon_WagtailStructBlockStructure_Fragment
);

export type StructureL1_WagtailUrlBlockStructure_Fragment = (
  { __typename: 'WagtailURLBlockStructure' }
  & StructureCommon_WagtailUrlBlockStructure_Fragment
);

export type StructureL1Fragment = StructureL1_WagtailBooleanBlockStructure_Fragment | StructureL1_WagtailCharBlockStructure_Fragment | StructureL1_WagtailImageBlockStructure_Fragment | StructureL1_WagtailListBlockStructure_Fragment | StructureL1_WagtailRichTextBlockStructure_Fragment | StructureL1_WagtailStaticBlockStructure_Fragment | StructureL1_WagtailStructBlockStructure_Fragment | StructureL1_WagtailUrlBlockStructure_Fragment;

export type StructureL2_WagtailBooleanBlockStructure_Fragment = (
  { __typename: 'WagtailBooleanBlockStructure' }
  & StructureCommon_WagtailBooleanBlockStructure_Fragment
);

export type StructureL2_WagtailCharBlockStructure_Fragment = (
  { __typename: 'WagtailCharBlockStructure' }
  & StructureCommon_WagtailCharBlockStructure_Fragment
);

export type StructureL2_WagtailImageBlockStructure_Fragment = (
  { __typename: 'WagtailImageBlockStructure' }
  & StructureCommon_WagtailImageBlockStructure_Fragment
);

export type StructureL2_WagtailListBlockStructure_Fragment = (
  { __typename: 'WagtailListBlockStructure' }
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
  & StructureCommon_WagtailListBlockStructure_Fragment
);

export type StructureL2_WagtailRichTextBlockStructure_Fragment = (
  { __typename: 'WagtailRichTextBlockStructure' }
  & StructureCommon_WagtailRichTextBlockStructure_Fragment
);

export type StructureL2_WagtailStaticBlockStructure_Fragment = (
  { __typename: 'WagtailStaticBlockStructure' }
  & StructureCommon_WagtailStaticBlockStructure_Fragment
);

export type StructureL2_WagtailStructBlockStructure_Fragment = (
  { __typename: 'WagtailStructBlockStructure' }
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
  & StructureCommon_WagtailStructBlockStructure_Fragment
);

export type StructureL2_WagtailUrlBlockStructure_Fragment = (
  { __typename: 'WagtailURLBlockStructure' }
  & StructureCommon_WagtailUrlBlockStructure_Fragment
);

export type StructureL2Fragment = StructureL2_WagtailBooleanBlockStructure_Fragment | StructureL2_WagtailCharBlockStructure_Fragment | StructureL2_WagtailImageBlockStructure_Fragment | StructureL2_WagtailListBlockStructure_Fragment | StructureL2_WagtailRichTextBlockStructure_Fragment | StructureL2_WagtailStaticBlockStructure_Fragment | StructureL2_WagtailStructBlockStructure_Fragment | StructureL2_WagtailUrlBlockStructure_Fragment;

export type StructureL3_WagtailBooleanBlockStructure_Fragment = (
  { __typename: 'WagtailBooleanBlockStructure' }
  & StructureCommon_WagtailBooleanBlockStructure_Fragment
);

export type StructureL3_WagtailCharBlockStructure_Fragment = (
  { __typename: 'WagtailCharBlockStructure' }
  & StructureCommon_WagtailCharBlockStructure_Fragment
);

export type StructureL3_WagtailImageBlockStructure_Fragment = (
  { __typename: 'WagtailImageBlockStructure' }
  & StructureCommon_WagtailImageBlockStructure_Fragment
);

export type StructureL3_WagtailListBlockStructure_Fragment = (
  { __typename: 'WagtailListBlockStructure' }
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
  & StructureCommon_WagtailListBlockStructure_Fragment
);

export type StructureL3_WagtailRichTextBlockStructure_Fragment = (
  { __typename: 'WagtailRichTextBlockStructure' }
  & StructureCommon_WagtailRichTextBlockStructure_Fragment
);

export type StructureL3_WagtailStaticBlockStructure_Fragment = (
  { __typename: 'WagtailStaticBlockStructure' }
  & StructureCommon_WagtailStaticBlockStructure_Fragment
);

export type StructureL3_WagtailStructBlockStructure_Fragment = (
  { __typename: 'WagtailStructBlockStructure' }
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
  & StructureCommon_WagtailStructBlockStructure_Fragment
);

export type StructureL3_WagtailUrlBlockStructure_Fragment = (
  { __typename: 'WagtailURLBlockStructure' }
  & StructureCommon_WagtailUrlBlockStructure_Fragment
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

export type WagtailPageRevisionsQueryVariables = Types.Exact<{
  page_id: Types.Scalars['ID'];
}>;


export type WagtailPageRevisionsQuery = (
  { __typename: 'Query' }
  & { result?: Types.Maybe<(
    { __typename: 'BlogIndexPage' }
    & Pick<Types.BlogIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  ) | (
    { __typename: 'BlogPostPage' }
    & Pick<Types.BlogPostPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  ) | (
    { __typename: 'FaqPage' }
    & Pick<Types.FaqPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  ) | (
    { __typename: 'FolderPage' }
    & Pick<Types.FolderPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  ) | (
    { __typename: 'FreeFormPage' }
    & Pick<Types.FreeFormPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  ) | (
    { __typename: 'PresentationPage' }
    & Pick<Types.PresentationPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  ) | (
    { __typename: 'ProjectIndexPage' }
    & Pick<Types.ProjectIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  ) | (
    { __typename: 'ProjectPage' }
    & Pick<Types.ProjectPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  ) | (
    { __typename: 'RatioNotebookIndexPage' }
    & Pick<Types.RatioNotebookIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  ) | (
    { __typename: 'RatioNotebookPage' }
    & Pick<Types.RatioNotebookPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  ) | (
    { __typename: 'RatioPresentationIndexPage' }
    & Pick<Types.RatioPresentationIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  ) | (
    { __typename: 'RatioSectionIndexPage' }
    & Pick<Types.RatioSectionIndexPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  ) | (
    { __typename: 'RatioSectionPage' }
    & Pick<Types.RatioSectionPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  )> }
);

export const WagtailStreamFieldValidationErrorFragmentDoc = gql`
    fragment WagtailStreamFieldValidationError on WagtailStreamFieldValidationError {
  non_block_error
  block_errors {
    block_id
    error {
      error_message
    }
  }
}
    `;
export const StructureCommonFragmentDoc = gql`
    fragment StructureCommon on WagtailBlockStructure {
  label
  required
}
    `;
export const StructureL1FragmentDoc = gql`
    fragment StructureL1 on WagtailBlockStructure {
  ...StructureCommon
  ... on WagtailListBlockStructure {
    child_block {
      ...StructureCommon
    }
  }
  ... on WagtailStructBlockStructure {
    child_blocks {
      name
      definition {
        ...StructureCommon
      }
    }
  }
}
    ${StructureCommonFragmentDoc}`;
export const StructureL2FragmentDoc = gql`
    fragment StructureL2 on WagtailBlockStructure {
  ...StructureCommon
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
    ${StructureCommonFragmentDoc}
${StructureL1FragmentDoc}`;
export const StructureL3FragmentDoc = gql`
    fragment StructureL3 on WagtailBlockStructure {
  ...StructureCommon
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
    ${StructureCommonFragmentDoc}
${StructureL2FragmentDoc}`;
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
export const WagtailPageRevisionsDocument = gql`
    query WagtailPageRevisions($page_id: ID!) {
  result: wagtailPage(page_id: $page_id) {
    id
    meta {
      revisions {
        id
        created_at
      }
    }
  }
}
    `;

/**
 * __useWagtailPageRevisionsQuery__
 *
 * To run a query within a React component, call `useWagtailPageRevisionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWagtailPageRevisionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWagtailPageRevisionsQuery({
 *   variables: {
 *      page_id: // value for 'page_id'
 *   },
 * });
 */
export function useWagtailPageRevisionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WagtailPageRevisionsQuery, WagtailPageRevisionsQueryVariables>) {
        return ApolloReactHooks.useQuery<WagtailPageRevisionsQuery, WagtailPageRevisionsQueryVariables>(WagtailPageRevisionsDocument, baseOptions);
      }
export function useWagtailPageRevisionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WagtailPageRevisionsQuery, WagtailPageRevisionsQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<WagtailPageRevisionsQuery, WagtailPageRevisionsQueryVariables>(WagtailPageRevisionsDocument, baseOptions);
        }
export type WagtailPageRevisionsQueryHookResult = ReturnType<typeof useWagtailPageRevisionsQuery>;
export type WagtailPageRevisionsLazyQueryHookResult = ReturnType<typeof useWagtailPageRevisionsLazyQuery>;
export type WagtailPageRevisionsQueryResult = ApolloReactCommon.QueryResult<WagtailPageRevisionsQuery, WagtailPageRevisionsQueryVariables>;