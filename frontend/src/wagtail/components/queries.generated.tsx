import * as Types from '../../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type WagtailStreamFieldValidationErrorFragment = (
  { __typename: 'WagtailStreamFieldValidationError' }
  & Pick<Types.WagtailStreamFieldValidationError, 'non_block_error'>
  & { block_errors: Array<(
    { __typename: 'WagtailStreamBlockValidationError' }
    & Pick<Types.WagtailStreamBlockValidationError, 'block_id'>
    & { error?: Types.Maybe<(
      { __typename: 'WagtailStructBlockValidationError' }
      & Pick<Types.WagtailStructBlockValidationError, 'error_message'>
    ) | (
      { __typename: 'WagtailListBlockValidationError' }
      & Pick<Types.WagtailListBlockValidationError, 'error_message'>
    ) | (
      { __typename: 'WagtailAnyBlockValidationError' }
      & Pick<Types.WagtailAnyBlockValidationError, 'error_message'>
    )> }
  )> }
);

export type StructureCommon_WagtailStructBlockStructure_Fragment = (
  { __typename: 'WagtailStructBlockStructure' }
  & Pick<Types.WagtailStructBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailListBlockStructure_Fragment = (
  { __typename: 'WagtailListBlockStructure' }
  & Pick<Types.WagtailListBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailCharBlockStructure_Fragment = (
  { __typename: 'WagtailCharBlockStructure' }
  & Pick<Types.WagtailCharBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailRichTextBlockStructure_Fragment = (
  { __typename: 'WagtailRichTextBlockStructure' }
  & Pick<Types.WagtailRichTextBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailBooleanBlockStructure_Fragment = (
  { __typename: 'WagtailBooleanBlockStructure' }
  & Pick<Types.WagtailBooleanBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailStaticBlockStructure_Fragment = (
  { __typename: 'WagtailStaticBlockStructure' }
  & Pick<Types.WagtailStaticBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailImageBlockStructure_Fragment = (
  { __typename: 'WagtailImageBlockStructure' }
  & Pick<Types.WagtailImageBlockStructure, 'label' | 'required'>
);

export type StructureCommon_WagtailUrlBlockStructure_Fragment = (
  { __typename: 'WagtailURLBlockStructure' }
  & Pick<Types.WagtailUrlBlockStructure, 'label' | 'required'>
);

export type StructureCommonFragment = StructureCommon_WagtailStructBlockStructure_Fragment | StructureCommon_WagtailListBlockStructure_Fragment | StructureCommon_WagtailCharBlockStructure_Fragment | StructureCommon_WagtailRichTextBlockStructure_Fragment | StructureCommon_WagtailBooleanBlockStructure_Fragment | StructureCommon_WagtailStaticBlockStructure_Fragment | StructureCommon_WagtailImageBlockStructure_Fragment | StructureCommon_WagtailUrlBlockStructure_Fragment;

export type StructureL1_WagtailStructBlockStructure_Fragment = (
  { __typename: 'WagtailStructBlockStructure' }
  & { child_blocks: Array<(
    { __typename: 'WagtailStructBlockChildStructure' }
    & Pick<Types.WagtailStructBlockChildStructure, 'name'>
    & { definition: (
      { __typename: 'WagtailStructBlockStructure' }
      & StructureCommon_WagtailStructBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailListBlockStructure' }
      & StructureCommon_WagtailListBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailCharBlockStructure' }
      & StructureCommon_WagtailCharBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailRichTextBlockStructure' }
      & StructureCommon_WagtailRichTextBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailBooleanBlockStructure' }
      & StructureCommon_WagtailBooleanBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailStaticBlockStructure' }
      & StructureCommon_WagtailStaticBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailImageBlockStructure' }
      & StructureCommon_WagtailImageBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailURLBlockStructure' }
      & StructureCommon_WagtailUrlBlockStructure_Fragment
    ) }
  )> }
  & StructureCommon_WagtailStructBlockStructure_Fragment
);

export type StructureL1_WagtailListBlockStructure_Fragment = (
  { __typename: 'WagtailListBlockStructure' }
  & { child_block: (
    { __typename: 'WagtailStructBlockStructure' }
    & StructureCommon_WagtailStructBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailListBlockStructure' }
    & StructureCommon_WagtailListBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailCharBlockStructure' }
    & StructureCommon_WagtailCharBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailRichTextBlockStructure' }
    & StructureCommon_WagtailRichTextBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailBooleanBlockStructure' }
    & StructureCommon_WagtailBooleanBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStaticBlockStructure' }
    & StructureCommon_WagtailStaticBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailImageBlockStructure' }
    & StructureCommon_WagtailImageBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailURLBlockStructure' }
    & StructureCommon_WagtailUrlBlockStructure_Fragment
  ) }
  & StructureCommon_WagtailListBlockStructure_Fragment
);

export type StructureL1_WagtailCharBlockStructure_Fragment = (
  { __typename: 'WagtailCharBlockStructure' }
  & StructureCommon_WagtailCharBlockStructure_Fragment
);

export type StructureL1_WagtailRichTextBlockStructure_Fragment = (
  { __typename: 'WagtailRichTextBlockStructure' }
  & StructureCommon_WagtailRichTextBlockStructure_Fragment
);

export type StructureL1_WagtailBooleanBlockStructure_Fragment = (
  { __typename: 'WagtailBooleanBlockStructure' }
  & StructureCommon_WagtailBooleanBlockStructure_Fragment
);

export type StructureL1_WagtailStaticBlockStructure_Fragment = (
  { __typename: 'WagtailStaticBlockStructure' }
  & StructureCommon_WagtailStaticBlockStructure_Fragment
);

export type StructureL1_WagtailImageBlockStructure_Fragment = (
  { __typename: 'WagtailImageBlockStructure' }
  & StructureCommon_WagtailImageBlockStructure_Fragment
);

export type StructureL1_WagtailUrlBlockStructure_Fragment = (
  { __typename: 'WagtailURLBlockStructure' }
  & StructureCommon_WagtailUrlBlockStructure_Fragment
);

export type StructureL1Fragment = StructureL1_WagtailStructBlockStructure_Fragment | StructureL1_WagtailListBlockStructure_Fragment | StructureL1_WagtailCharBlockStructure_Fragment | StructureL1_WagtailRichTextBlockStructure_Fragment | StructureL1_WagtailBooleanBlockStructure_Fragment | StructureL1_WagtailStaticBlockStructure_Fragment | StructureL1_WagtailImageBlockStructure_Fragment | StructureL1_WagtailUrlBlockStructure_Fragment;

export type StructureL2_WagtailStructBlockStructure_Fragment = (
  { __typename: 'WagtailStructBlockStructure' }
  & { child_blocks: Array<(
    { __typename: 'WagtailStructBlockChildStructure' }
    & Pick<Types.WagtailStructBlockChildStructure, 'name'>
    & { definition: (
      { __typename: 'WagtailStructBlockStructure' }
      & StructureL1_WagtailStructBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailListBlockStructure' }
      & StructureL1_WagtailListBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailCharBlockStructure' }
      & StructureL1_WagtailCharBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailRichTextBlockStructure' }
      & StructureL1_WagtailRichTextBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailBooleanBlockStructure' }
      & StructureL1_WagtailBooleanBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailStaticBlockStructure' }
      & StructureL1_WagtailStaticBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailImageBlockStructure' }
      & StructureL1_WagtailImageBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailURLBlockStructure' }
      & StructureL1_WagtailUrlBlockStructure_Fragment
    ) }
  )> }
  & StructureCommon_WagtailStructBlockStructure_Fragment
);

export type StructureL2_WagtailListBlockStructure_Fragment = (
  { __typename: 'WagtailListBlockStructure' }
  & { child_block: (
    { __typename: 'WagtailStructBlockStructure' }
    & StructureL1_WagtailStructBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailListBlockStructure' }
    & StructureL1_WagtailListBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailCharBlockStructure' }
    & StructureL1_WagtailCharBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailRichTextBlockStructure' }
    & StructureL1_WagtailRichTextBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailBooleanBlockStructure' }
    & StructureL1_WagtailBooleanBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStaticBlockStructure' }
    & StructureL1_WagtailStaticBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailImageBlockStructure' }
    & StructureL1_WagtailImageBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailURLBlockStructure' }
    & StructureL1_WagtailUrlBlockStructure_Fragment
  ) }
  & StructureCommon_WagtailListBlockStructure_Fragment
);

export type StructureL2_WagtailCharBlockStructure_Fragment = (
  { __typename: 'WagtailCharBlockStructure' }
  & StructureCommon_WagtailCharBlockStructure_Fragment
);

export type StructureL2_WagtailRichTextBlockStructure_Fragment = (
  { __typename: 'WagtailRichTextBlockStructure' }
  & StructureCommon_WagtailRichTextBlockStructure_Fragment
);

export type StructureL2_WagtailBooleanBlockStructure_Fragment = (
  { __typename: 'WagtailBooleanBlockStructure' }
  & StructureCommon_WagtailBooleanBlockStructure_Fragment
);

export type StructureL2_WagtailStaticBlockStructure_Fragment = (
  { __typename: 'WagtailStaticBlockStructure' }
  & StructureCommon_WagtailStaticBlockStructure_Fragment
);

export type StructureL2_WagtailImageBlockStructure_Fragment = (
  { __typename: 'WagtailImageBlockStructure' }
  & StructureCommon_WagtailImageBlockStructure_Fragment
);

export type StructureL2_WagtailUrlBlockStructure_Fragment = (
  { __typename: 'WagtailURLBlockStructure' }
  & StructureCommon_WagtailUrlBlockStructure_Fragment
);

export type StructureL2Fragment = StructureL2_WagtailStructBlockStructure_Fragment | StructureL2_WagtailListBlockStructure_Fragment | StructureL2_WagtailCharBlockStructure_Fragment | StructureL2_WagtailRichTextBlockStructure_Fragment | StructureL2_WagtailBooleanBlockStructure_Fragment | StructureL2_WagtailStaticBlockStructure_Fragment | StructureL2_WagtailImageBlockStructure_Fragment | StructureL2_WagtailUrlBlockStructure_Fragment;

export type StructureL3_WagtailStructBlockStructure_Fragment = (
  { __typename: 'WagtailStructBlockStructure' }
  & { child_blocks: Array<(
    { __typename: 'WagtailStructBlockChildStructure' }
    & Pick<Types.WagtailStructBlockChildStructure, 'name'>
    & { definition: (
      { __typename: 'WagtailStructBlockStructure' }
      & StructureL2_WagtailStructBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailListBlockStructure' }
      & StructureL2_WagtailListBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailCharBlockStructure' }
      & StructureL2_WagtailCharBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailRichTextBlockStructure' }
      & StructureL2_WagtailRichTextBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailBooleanBlockStructure' }
      & StructureL2_WagtailBooleanBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailStaticBlockStructure' }
      & StructureL2_WagtailStaticBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailImageBlockStructure' }
      & StructureL2_WagtailImageBlockStructure_Fragment
    ) | (
      { __typename: 'WagtailURLBlockStructure' }
      & StructureL2_WagtailUrlBlockStructure_Fragment
    ) }
  )> }
  & StructureCommon_WagtailStructBlockStructure_Fragment
);

export type StructureL3_WagtailListBlockStructure_Fragment = (
  { __typename: 'WagtailListBlockStructure' }
  & { child_block: (
    { __typename: 'WagtailStructBlockStructure' }
    & StructureL2_WagtailStructBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailListBlockStructure' }
    & StructureL2_WagtailListBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailCharBlockStructure' }
    & StructureL2_WagtailCharBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailRichTextBlockStructure' }
    & StructureL2_WagtailRichTextBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailBooleanBlockStructure' }
    & StructureL2_WagtailBooleanBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStaticBlockStructure' }
    & StructureL2_WagtailStaticBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailImageBlockStructure' }
    & StructureL2_WagtailImageBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailURLBlockStructure' }
    & StructureL2_WagtailUrlBlockStructure_Fragment
  ) }
  & StructureCommon_WagtailListBlockStructure_Fragment
);

export type StructureL3_WagtailCharBlockStructure_Fragment = (
  { __typename: 'WagtailCharBlockStructure' }
  & StructureCommon_WagtailCharBlockStructure_Fragment
);

export type StructureL3_WagtailRichTextBlockStructure_Fragment = (
  { __typename: 'WagtailRichTextBlockStructure' }
  & StructureCommon_WagtailRichTextBlockStructure_Fragment
);

export type StructureL3_WagtailBooleanBlockStructure_Fragment = (
  { __typename: 'WagtailBooleanBlockStructure' }
  & StructureCommon_WagtailBooleanBlockStructure_Fragment
);

export type StructureL3_WagtailStaticBlockStructure_Fragment = (
  { __typename: 'WagtailStaticBlockStructure' }
  & StructureCommon_WagtailStaticBlockStructure_Fragment
);

export type StructureL3_WagtailImageBlockStructure_Fragment = (
  { __typename: 'WagtailImageBlockStructure' }
  & StructureCommon_WagtailImageBlockStructure_Fragment
);

export type StructureL3_WagtailUrlBlockStructure_Fragment = (
  { __typename: 'WagtailURLBlockStructure' }
  & StructureCommon_WagtailUrlBlockStructure_Fragment
);

export type StructureL3Fragment = StructureL3_WagtailStructBlockStructure_Fragment | StructureL3_WagtailListBlockStructure_Fragment | StructureL3_WagtailCharBlockStructure_Fragment | StructureL3_WagtailRichTextBlockStructure_Fragment | StructureL3_WagtailBooleanBlockStructure_Fragment | StructureL3_WagtailStaticBlockStructure_Fragment | StructureL3_WagtailImageBlockStructure_Fragment | StructureL3_WagtailUrlBlockStructure_Fragment;

export type WagtailBlockStructureQueryVariables = Types.Exact<{
  name: Types.Scalars['String'];
}>;


export type WagtailBlockStructureQuery = (
  { __typename: 'Query' }
  & { result: (
    { __typename: 'WagtailStructBlockStructure' }
    & StructureL3_WagtailStructBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailListBlockStructure' }
    & StructureL3_WagtailListBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailCharBlockStructure' }
    & StructureL3_WagtailCharBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailRichTextBlockStructure' }
    & StructureL3_WagtailRichTextBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailBooleanBlockStructure' }
    & StructureL3_WagtailBooleanBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailStaticBlockStructure' }
    & StructureL3_WagtailStaticBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailImageBlockStructure' }
    & StructureL3_WagtailImageBlockStructure_Fragment
  ) | (
    { __typename: 'WagtailURLBlockStructure' }
    & StructureL3_WagtailUrlBlockStructure_Fragment
  ) }
);

export type WagtailAllBlockStructuresQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WagtailAllBlockStructuresQuery = (
  { __typename: 'Query' }
  & { result: Array<(
    { __typename: 'WagtailBlockStructureWithName' }
    & Pick<Types.WagtailBlockStructureWithName, 'typename'>
    & { structure: (
      { __typename: 'WagtailStructBlockStructure' }
      & Pick<Types.WagtailStructBlockStructure, 'label' | 'group'>
    ) | (
      { __typename: 'WagtailListBlockStructure' }
      & Pick<Types.WagtailListBlockStructure, 'label' | 'group'>
    ) | (
      { __typename: 'WagtailCharBlockStructure' }
      & Pick<Types.WagtailCharBlockStructure, 'label' | 'group'>
    ) | (
      { __typename: 'WagtailRichTextBlockStructure' }
      & Pick<Types.WagtailRichTextBlockStructure, 'label' | 'group'>
    ) | (
      { __typename: 'WagtailBooleanBlockStructure' }
      & Pick<Types.WagtailBooleanBlockStructure, 'label' | 'group'>
    ) | (
      { __typename: 'WagtailStaticBlockStructure' }
      & Pick<Types.WagtailStaticBlockStructure, 'label' | 'group'>
    ) | (
      { __typename: 'WagtailImageBlockStructure' }
      & Pick<Types.WagtailImageBlockStructure, 'label' | 'group'>
    ) | (
      { __typename: 'WagtailURLBlockStructure' }
      & Pick<Types.WagtailUrlBlockStructure, 'label' | 'group'>
    ) }
  )> }
);

export type WagtailPageRevisionsQueryVariables = Types.Exact<{
  page_id: Types.Scalars['ID'];
}>;


export type WagtailPageRevisionsQuery = (
  { __typename: 'Query' }
  & { result?: Types.Maybe<(
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
    { __typename: 'RatioSectionPage' }
    & Pick<Types.RatioSectionPage, 'id'>
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
    { __typename: 'PresentationPage' }
    & Pick<Types.PresentationPage, 'id'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & { revisions: Array<(
        { __typename: 'WagtailPageRevision' }
        & Pick<Types.WagtailPageRevision, 'id' | 'created_at'>
      )> }
    ) }
  )> }
);

export const WagtailStreamFieldValidationErrorFragmentDoc: DocumentNode<WagtailStreamFieldValidationErrorFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WagtailStreamFieldValidationError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailStreamFieldValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"non_block_error"}},{"kind":"Field","name":{"kind":"Name","value":"block_errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"block_id"}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error_message"}}]}}]}}]}}]};
export const StructureCommonFragmentDoc: DocumentNode<StructureCommonFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StructureCommon"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailBlockStructure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"label"}},{"kind":"Field","name":{"kind":"Name","value":"required"}}]}}]};
export const StructureL1FragmentDoc: DocumentNode<StructureL1Fragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StructureL1"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailBlockStructure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StructureCommon"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailListBlockStructure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"child_block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StructureCommon"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailStructBlockStructure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"child_blocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"definition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StructureCommon"}}]}}]}}]}}]}},...StructureCommonFragmentDoc.definitions]};
export const StructureL2FragmentDoc: DocumentNode<StructureL2Fragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StructureL2"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailBlockStructure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StructureCommon"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailListBlockStructure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"child_block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StructureL1"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailStructBlockStructure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"child_blocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"definition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StructureL1"}}]}}]}}]}}]}},...StructureCommonFragmentDoc.definitions,...StructureL1FragmentDoc.definitions]};
export const StructureL3FragmentDoc: DocumentNode<StructureL3Fragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"StructureL3"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailBlockStructure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StructureCommon"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailListBlockStructure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"child_block"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StructureL2"}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailStructBlockStructure"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"child_blocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"definition"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"StructureL2"}}]}}]}}]}}]}},...StructureCommonFragmentDoc.definitions,...StructureL2FragmentDoc.definitions]};
export const WagtailBlockStructureDocument: DocumentNode<WagtailBlockStructureQuery, WagtailBlockStructureQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "WagtailBlockStructure" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "wagtailBlockStructure" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "name" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "name" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "StructureL3" } }] } }] } }, ...StructureL3FragmentDoc.definitions] });

export const WagtailAllBlockStructuresDocument: DocumentNode<WagtailAllBlockStructuresQuery, WagtailAllBlockStructuresQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "WagtailAllBlockStructures" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "wagtailAllBlockStructures" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "typename" } }, { "kind": "Field", "name": { "kind": "Name", "value": "structure" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "WagtailBlockStructure" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "label" } }, { "kind": "Field", "name": { "kind": "Name", "value": "group" } }] } }] } }] } }] } }] });

export const WagtailPageRevisionsDocument: DocumentNode<WagtailPageRevisionsQuery, WagtailPageRevisionsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "WagtailPageRevisions" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "page_id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "wagtailPage" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "page_id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "page_id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "meta" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "revisions" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" } }, { "kind": "Field", "name": { "kind": "Name", "value": "created_at" } }] } }] } }] } }] } }] });
