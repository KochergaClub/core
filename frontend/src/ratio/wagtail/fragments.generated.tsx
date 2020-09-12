import * as Types from '../../apollo/types.generated';

import { RatioHeaderBlockFragment, RatioParagraphBlockFragment, RatioInsetBlockFragment, RatioExerciseBlockFragment, RatioExerciseOnelineBlockFragment, RatioBriefingBlockFragment, RatioMathBlockFragment } from '../components/RatioWagtailBlocks/fragments.generated';
import gql from 'graphql-tag';
import { RatioHeaderBlockFragmentDoc, RatioParagraphBlockFragmentDoc, RatioInsetBlockFragmentDoc, RatioExerciseBlockFragmentDoc, RatioExerciseOnelineBlockFragmentDoc, RatioBriefingBlockFragmentDoc, RatioMathBlockFragmentDoc } from '../components/RatioWagtailBlocks/fragments.generated';

export type RatioSectionIndexPageFragment = (
  { __typename: 'RatioSectionIndexPage' }
  & Pick<Types.RatioSectionIndexPage, 'id' | 'title'>
);

export type RatioSectionPageFragment = (
  { __typename: 'RatioSectionPage' }
  & Pick<Types.RatioSectionPage, 'id' | 'title'>
  & { meta: (
    { __typename: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug'>
  ), body: Array<(
    { __typename: 'BasicLeadBlock' }
    & Pick<Types.BasicLeadBlock, 'id'>
  ) | (
    { __typename: 'BasicParagraphBlock' }
    & Pick<Types.BasicParagraphBlock, 'id'>
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
);

export type RatioNotebookIndexPageFragment = (
  { __typename: 'RatioNotebookIndexPage' }
  & Pick<Types.RatioNotebookIndexPage, 'id' | 'title'>
);

export type RatioNotebookPageFragment = (
  { __typename: 'RatioNotebookPage' }
  & Pick<Types.RatioNotebookPage, 'id' | 'title'>
  & { sections: Array<(
    { __typename: 'RatioNotebookSectionBlock' }
    & Pick<Types.RatioNotebookSectionBlock, 'id'>
    & { value: (
      { __typename: 'RatioSectionPage' }
      & RatioSectionPageFragment
    ) }
  )> }
);

export type RatioPresentationIndexPageFragment = (
  { __typename: 'RatioPresentationIndexPage' }
  & Pick<Types.RatioPresentationIndexPage, 'id' | 'title'>
  & { presentations: Array<(
    { __typename: 'PresentationPage' }
    & Pick<Types.PresentationPage, 'id' | 'title'>
    & { meta: (
      { __typename: 'WagtailPageMeta' }
      & Pick<Types.WagtailPageMeta, 'html_url'>
    ) }
  )> }
);

export const RatioSectionIndexPageFragmentDoc = gql`
    fragment RatioSectionIndexPage on RatioSectionIndexPage {
  id
  title
}
    `;
export const RatioNotebookIndexPageFragmentDoc = gql`
    fragment RatioNotebookIndexPage on RatioNotebookIndexPage {
  id
  title
}
    `;
export const RatioSectionPageFragmentDoc = gql`
    fragment RatioSectionPage on RatioSectionPage {
  id
  meta {
    slug
  }
  title
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
    ${RatioHeaderBlockFragmentDoc}
${RatioParagraphBlockFragmentDoc}
${RatioInsetBlockFragmentDoc}
${RatioExerciseBlockFragmentDoc}
${RatioExerciseOnelineBlockFragmentDoc}
${RatioBriefingBlockFragmentDoc}
${RatioMathBlockFragmentDoc}`;
export const RatioNotebookPageFragmentDoc = gql`
    fragment RatioNotebookPage on RatioNotebookPage {
  id
  title
  sections {
    ... on RatioNotebookSectionBlock {
      id
      value {
        ...RatioSectionPage
      }
    }
  }
}
    ${RatioSectionPageFragmentDoc}`;
export const RatioPresentationIndexPageFragmentDoc = gql`
    fragment RatioPresentationIndexPage on RatioPresentationIndexPage {
  id
  title
  presentations {
    id
    title
    meta {
      html_url
    }
  }
}
    `;