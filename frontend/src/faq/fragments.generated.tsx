import * as Types from '../apollo/types.generated';

import { CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_PresentationPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment } from '../cms/queries.generated';
import gql from 'graphql-tag';
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

export const FaqPage_SummaryFragmentDoc = gql`
    fragment FaqPage_summary on FaqPage {
  id
  summary
  title
  meta {
    url
  }
}
    `;
export const FaqEntryFragmentDoc = gql`
    fragment FaqEntry on FaqEntry {
  id
  question
  answer
}
    `;
export const FaqPageFragmentDoc = gql`
    fragment FaqPage on FaqPage {
  ...CommonWagtailPage
  summary
  next_page {
    ...FaqPage_summary
  }
  prev_page {
    ...FaqPage_summary
  }
  subpages {
    ...FaqPage_summary
  }
  entries {
    ...FaqEntry
  }
}
    ${CommonWagtailPageFragmentDoc}
${FaqPage_SummaryFragmentDoc}
${FaqEntryFragmentDoc}`;