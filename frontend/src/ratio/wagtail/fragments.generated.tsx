import * as Types from '../../apollo/types.generated';

import { CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_PresentationPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment } from '../../cms/queries.generated';
import { RatioHeaderBlockFragment, RatioParagraphBlockFragment, RatioInsetBlockFragment, RatioExerciseBlockFragment, RatioExerciseOnelineBlockFragment, RatioBriefingBlockFragment, RatioMathBlockFragment } from '../components/RatioWagtailBlocks/fragments.generated';
import gql from 'graphql-tag';
import { CommonWagtailPageFragmentDoc } from '../../cms/queries.generated';
import { RatioHeaderBlockFragmentDoc, RatioParagraphBlockFragmentDoc, RatioInsetBlockFragmentDoc, RatioExerciseBlockFragmentDoc, RatioExerciseOnelineBlockFragmentDoc, RatioBriefingBlockFragmentDoc, RatioMathBlockFragmentDoc } from '../components/RatioWagtailBlocks/fragments.generated';

export type RatioSectionIndexPageFragment = (
  { __typename: 'RatioSectionIndexPage' }
  & CommonWagtailPage_RatioSectionIndexPage_Fragment
);

export type RatioSectionPageFragment = (
  { __typename: 'RatioSectionPage' }
  & { body: Array<(
    { __typename: 'BasicCardBlock' }
    & Pick<Types.BasicCardBlock, 'id'>
  ) | (
    { __typename: 'BasicLeadBlock' }
    & Pick<Types.BasicLeadBlock, 'id'>
  ) | (
    { __typename: 'BasicTextBlock' }
    & Pick<Types.BasicTextBlock, 'id'>
  ) | (
    { __typename: 'BigContactsBlock' }
    & Pick<Types.BigContactsBlock, 'id'>
  ) | (
    { __typename: 'ColumnsBasicBlock' }
    & Pick<Types.ColumnsBasicBlock, 'id'>
  ) | (
    { __typename: 'ColumnsButtonsBlock' }
    & Pick<Types.ColumnsButtonsBlock, 'id'>
  ) | (
    { __typename: 'EventsListBlock' }
    & Pick<Types.EventsListBlock, 'id'>
  ) | (
    { __typename: 'FrontPartnersBlock' }
    & Pick<Types.FrontPartnersBlock, 'id'>
  ) | (
    { __typename: 'FrontSocialLinksBlock' }
    & Pick<Types.FrontSocialLinksBlock, 'id'>
  ) | (
    { __typename: 'GreyBlock' }
    & Pick<Types.GreyBlock, 'id'>
  ) | (
    { __typename: 'HeroFrontBlock' }
    & Pick<Types.HeroFrontBlock, 'id'>
  ) | (
    { __typename: 'HrBlock' }
    & Pick<Types.HrBlock, 'id'>
  ) | (
    { __typename: 'MailchimpSubscribeBlock' }
    & Pick<Types.MailchimpSubscribeBlock, 'id'>
  ) | (
    { __typename: 'PhotoRibbonBlock' }
    & Pick<Types.PhotoRibbonBlock, 'id'>
  ) | (
    { __typename: 'RatioBriefingBlock' }
    & Pick<Types.RatioBriefingBlock, 'id'>
    & RatioBriefingBlockFragment
  ) | (
    { __typename: 'RatioExerciseBlock' }
    & Pick<Types.RatioExerciseBlock, 'id'>
    & RatioExerciseBlockFragment
  ) | (
    { __typename: 'RatioExerciseOnelineBlock' }
    & Pick<Types.RatioExerciseOnelineBlock, 'id'>
    & RatioExerciseOnelineBlockFragment
  ) | (
    { __typename: 'RatioHeaderBlock' }
    & Pick<Types.RatioHeaderBlock, 'id'>
    & RatioHeaderBlockFragment
  ) | (
    { __typename: 'RatioInsetBlock' }
    & Pick<Types.RatioInsetBlock, 'id'>
    & RatioInsetBlockFragment
  ) | (
    { __typename: 'RatioMathBlock' }
    & Pick<Types.RatioMathBlock, 'id'>
    & RatioMathBlockFragment
  ) | (
    { __typename: 'RatioNotebookSectionBlock' }
    & Pick<Types.RatioNotebookSectionBlock, 'id'>
  ) | (
    { __typename: 'RatioParagraphBlock' }
    & Pick<Types.RatioParagraphBlock, 'id'>
    & RatioParagraphBlockFragment
  ) | (
    { __typename: 'SectionHeaderBlock' }
    & Pick<Types.SectionHeaderBlock, 'id'>
  ) | (
    { __typename: 'SlideFragmentsBlock' }
    & Pick<Types.SlideFragmentsBlock, 'id'>
  ) | (
    { __typename: 'SlideFragmentsBlock_RawHtmlBlock' }
    & Pick<Types.SlideFragmentsBlock_RawHtmlBlock, 'id'>
  ) | (
    { __typename: 'SlideFragmentsBlock_RichTextBlock' }
    & Pick<Types.SlideFragmentsBlock_RichTextBlock, 'id'>
  ) | (
    { __typename: 'SlideRawHtmlBlock' }
    & Pick<Types.SlideRawHtmlBlock, 'id'>
  ) | (
    { __typename: 'SlideRichTextBlock' }
    & Pick<Types.SlideRichTextBlock, 'id'>
  ) | (
    { __typename: 'SlideTitleBlock' }
    & Pick<Types.SlideTitleBlock, 'id'>
  )> }
  & CommonWagtailPage_RatioSectionPage_Fragment
);

export type RatioNotebookIndexPageFragment = (
  { __typename: 'RatioNotebookIndexPage' }
  & CommonWagtailPage_RatioNotebookIndexPage_Fragment
);

export type RatioNotebookPageFragment = (
  { __typename: 'RatioNotebookPage' }
  & { sections: Array<(
    { __typename: 'RatioNotebookSectionBlock' }
    & Pick<Types.RatioNotebookSectionBlock, 'id'>
    & { value: (
      { __typename: 'RatioSectionPage' }
      & RatioSectionPageFragment
    ) }
  )> }
  & CommonWagtailPage_RatioNotebookPage_Fragment
);

export type RatioPresentationIndexPageFragment = (
  { __typename: 'RatioPresentationIndexPage' }
  & { presentations: Array<(
    { __typename: 'PresentationPage' }
    & Pick<Types.PresentationPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'url'>
    ) }
  )> }
  & CommonWagtailPage_RatioPresentationIndexPage_Fragment
);

export const RatioSectionIndexPageFragmentDoc = gql`
    fragment RatioSectionIndexPage on RatioSectionIndexPage {
  ...CommonWagtailPage
}
    ${CommonWagtailPageFragmentDoc}`;
export const RatioNotebookIndexPageFragmentDoc = gql`
    fragment RatioNotebookIndexPage on RatioNotebookIndexPage {
  ...CommonWagtailPage
}
    ${CommonWagtailPageFragmentDoc}`;
export const RatioSectionPageFragmentDoc = gql`
    fragment RatioSectionPage on RatioSectionPage {
  ...CommonWagtailPage
  body {
    __typename
    id
    ...RatioHeaderBlock
    ...RatioParagraphBlock
    ...RatioInsetBlock
    ...RatioExerciseBlock
    ...RatioExerciseOnelineBlock
    ...RatioBriefingBlock
    ...RatioMathBlock
  }
}
    ${CommonWagtailPageFragmentDoc}
${RatioHeaderBlockFragmentDoc}
${RatioParagraphBlockFragmentDoc}
${RatioInsetBlockFragmentDoc}
${RatioExerciseBlockFragmentDoc}
${RatioExerciseOnelineBlockFragmentDoc}
${RatioBriefingBlockFragmentDoc}
${RatioMathBlockFragmentDoc}`;
export const RatioNotebookPageFragmentDoc = gql`
    fragment RatioNotebookPage on RatioNotebookPage {
  ...CommonWagtailPage
  sections {
    ... on RatioNotebookSectionBlock {
      id
      value {
        ...RatioSectionPage
      }
    }
  }
}
    ${CommonWagtailPageFragmentDoc}
${RatioSectionPageFragmentDoc}`;
export const RatioPresentationIndexPageFragmentDoc = gql`
    fragment RatioPresentationIndexPage on RatioPresentationIndexPage {
  ...CommonWagtailPage
  presentations {
    id
    title
    meta {
      url
    }
  }
}
    ${CommonWagtailPageFragmentDoc}`;