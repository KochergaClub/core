import * as Types from '../apollo/gen-types';

import gql from 'graphql-tag';

export type FaqPage_SummaryFragment = (
  { __typename?: 'FaqPage' }
  & Pick<Types.FaqPage, 'id' | 'summary' | 'title'>
  & { meta: (
    { __typename?: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'html_url'>
  ) }
);

export type FaqEntryFragment = (
  { __typename?: 'FaqEntry' }
  & Pick<Types.FaqEntry, 'id' | 'question' | 'answer'>
);

export type FaqPageFragment = (
  { __typename?: 'FaqPage' }
  & Pick<Types.FaqPage, 'id' | 'title' | 'summary'>
  & { meta: (
    { __typename?: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'html_url'>
  ), next_page: Types.Maybe<(
    { __typename?: 'FaqPage' }
    & FaqPage_SummaryFragment
  )>, prev_page: Types.Maybe<(
    { __typename?: 'FaqPage' }
    & FaqPage_SummaryFragment
  )>, subpages: Array<(
    { __typename?: 'FaqPage' }
    & FaqPage_SummaryFragment
  )>, entries: Array<(
    { __typename?: 'FaqEntry' }
    & FaqEntryFragment
  )> }
);

export const FaqPage_SummaryFragmentDoc = gql`
    fragment FaqPage_summary on FaqPage {
  id
  summary
  title
  meta {
    html_url
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
  id
  meta {
    html_url
  }
  title
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
    ${FaqPage_SummaryFragmentDoc}
${FaqEntryFragmentDoc}`;