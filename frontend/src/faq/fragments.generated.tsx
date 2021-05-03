import * as Types from '../apollo/types.generated';

import { CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_PresentationPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment } from '../cms/queries.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { CommonWagtailPageFragmentDoc } from '../cms/queries.generated';
export type FaqPage_SummaryFragment = (
  { __typename: 'FaqPage' }
  & Pick<Types.FaqPage, 'id' | 'summary' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'url'>
  ) }
);

export type FaqEntryFragment = (
  { __typename: 'FaqEntry' }
  & Pick<Types.FaqEntry, 'id' | 'question' | 'answer'>
);

export type FaqPageFragment = (
  { __typename: 'FaqPage' }
  & Pick<Types.FaqPage, 'summary'>
  & { next_page?: Types.Maybe<(
    { __typename: 'FaqPage' }
    & FaqPage_SummaryFragment
  )>, prev_page?: Types.Maybe<(
    { __typename: 'FaqPage' }
    & FaqPage_SummaryFragment
  )>, subpages: Array<(
    { __typename: 'FaqPage' }
    & FaqPage_SummaryFragment
  )>, entries: Array<(
    { __typename: 'FaqEntry' }
    & FaqEntryFragment
  )> }
  & CommonWagtailPage_FaqPage_Fragment
);

export const FaqPage_SummaryFragmentDoc: DocumentNode<FaqPage_SummaryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FaqPage_summary"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FaqPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]};
export const FaqEntryFragmentDoc: DocumentNode<FaqEntryFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FaqEntry"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FaqEntry"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answer"}}]}}]};
export const FaqPageFragmentDoc: DocumentNode<FaqPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FaqPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FaqPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}},{"kind":"Field","name":{"kind":"Name","value":"summary"}},{"kind":"Field","name":{"kind":"Name","value":"next_page"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FaqPage_summary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"prev_page"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FaqPage_summary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"subpages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FaqPage_summary"}}]}},{"kind":"Field","name":{"kind":"Name","value":"entries"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"FaqEntry"}}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...FaqPage_SummaryFragmentDoc.definitions,...FaqEntryFragmentDoc.definitions]};