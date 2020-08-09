import * as Types from '../../apollo/types.generated';

import gql from 'graphql-tag';

export type SlideTitleBlockFragment = (
  { __typename?: 'SlideTitleBlock' }
  & Pick<Types.SlideTitleBlock, 'id'>
  & { title: Types.SlideTitleBlock['value'] }
);

export type SlideRichTextBlockFragment = (
  { __typename?: 'SlideRichTextBlock' }
  & Pick<Types.SlideRichTextBlock, 'id' | 'value'>
);

export type SlideRawHtmlBlockFragment = (
  { __typename?: 'SlideRawHtmlBlock' }
  & Pick<Types.SlideRawHtmlBlock, 'id' | 'value'>
);

export type SlideFragmentRichTextFragment = (
  { __typename?: 'SlideFragmentsBlock_RichTextBlock' }
  & Pick<Types.SlideFragmentsBlock_RichTextBlock, 'id' | 'value'>
);

export type SlideFragmentRawHtmlFragment = (
  { __typename?: 'SlideFragmentsBlock_RawHtmlBlock' }
  & Pick<Types.SlideFragmentsBlock_RawHtmlBlock, 'id' | 'value'>
);

export type SlideFragmentsBlockFragment = (
  { __typename?: 'SlideFragmentsBlock' }
  & Pick<Types.SlideFragmentsBlock, 'id'>
  & { fragments: Array<(
    { __typename?: 'SlideFragmentsBlock_RichTextBlock' }
    & SlideFragmentRichTextFragment
  ) | (
    { __typename?: 'SlideFragmentsBlock_RawHtmlBlock' }
    & SlideFragmentRawHtmlFragment
  )> }
);

export type PresentationPageFragment = (
  { __typename?: 'PresentationPage' }
  & Pick<Types.PresentationPage, 'id' | 'title'>
  & { slides: Array<(
    { __typename: 'BasicLeadBlock' }
    & Pick<Types.BasicLeadBlock, 'id'>
  ) | (
    { __typename: 'BasicParagraphBlock' }
    & Pick<Types.BasicParagraphBlock, 'id'>
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
    { __typename: 'ColumnsMembershipsBlock' }
    & Pick<Types.ColumnsMembershipsBlock, 'id'>
  ) | (
    { __typename: 'EventsListBlock' }
    & Pick<Types.EventsListBlock, 'id'>
  ) | (
    { __typename: 'GreyBlock' }
    & Pick<Types.GreyBlock, 'id'>
  ) | (
    { __typename: 'HeroFrontBlock' }
    & Pick<Types.HeroFrontBlock, 'id'>
  ) | (
    { __typename: 'MailchimpSubscribeBlock' }
    & Pick<Types.MailchimpSubscribeBlock, 'id'>
  ) | (
    { __typename: 'PhotoRibbonBlock' }
    & Pick<Types.PhotoRibbonBlock, 'id'>
  ) | (
    { __typename: 'RatioBriefingBlock' }
    & Pick<Types.RatioBriefingBlock, 'id'>
  ) | (
    { __typename: 'RatioExerciseBlock' }
    & Pick<Types.RatioExerciseBlock, 'id'>
  ) | (
    { __typename: 'RatioExerciseOnelineBlock' }
    & Pick<Types.RatioExerciseOnelineBlock, 'id'>
  ) | (
    { __typename: 'RatioHeaderBlock' }
    & Pick<Types.RatioHeaderBlock, 'id'>
  ) | (
    { __typename: 'RatioInsetBlock' }
    & Pick<Types.RatioInsetBlock, 'id'>
  ) | (
    { __typename: 'RatioMathBlock' }
    & Pick<Types.RatioMathBlock, 'id'>
  ) | (
    { __typename: 'RatioNotebookSectionBlock' }
    & Pick<Types.RatioNotebookSectionBlock, 'id'>
  ) | (
    { __typename: 'RatioParagraphBlock' }
    & Pick<Types.RatioParagraphBlock, 'id'>
  ) | (
    { __typename: 'SlideFragmentsBlock' }
    & Pick<Types.SlideFragmentsBlock, 'id'>
    & SlideFragmentsBlockFragment
  ) | (
    { __typename: 'SlideFragmentsBlock_RawHtmlBlock' }
    & Pick<Types.SlideFragmentsBlock_RawHtmlBlock, 'id'>
  ) | (
    { __typename: 'SlideFragmentsBlock_RichTextBlock' }
    & Pick<Types.SlideFragmentsBlock_RichTextBlock, 'id'>
  ) | (
    { __typename: 'SlideRawHtmlBlock' }
    & Pick<Types.SlideRawHtmlBlock, 'id'>
    & SlideRawHtmlBlockFragment
  ) | (
    { __typename: 'SlideRichTextBlock' }
    & Pick<Types.SlideRichTextBlock, 'id'>
    & SlideRichTextBlockFragment
  ) | (
    { __typename: 'SlideTitleBlock' }
    & Pick<Types.SlideTitleBlock, 'id'>
    & SlideTitleBlockFragment
  )> }
);

export const SlideTitleBlockFragmentDoc = gql`
    fragment SlideTitleBlock on SlideTitleBlock {
  id
  title: value
}
    `;
export const SlideRichTextBlockFragmentDoc = gql`
    fragment SlideRichTextBlock on SlideRichTextBlock {
  id
  value
}
    `;
export const SlideRawHtmlBlockFragmentDoc = gql`
    fragment SlideRawHtmlBlock on SlideRawHtmlBlock {
  id
  value
}
    `;
export const SlideFragmentRichTextFragmentDoc = gql`
    fragment SlideFragmentRichText on SlideFragmentsBlock_RichTextBlock {
  id
  value
}
    `;
export const SlideFragmentRawHtmlFragmentDoc = gql`
    fragment SlideFragmentRawHtml on SlideFragmentsBlock_RawHtmlBlock {
  id
  value
}
    `;
export const SlideFragmentsBlockFragmentDoc = gql`
    fragment SlideFragmentsBlock on SlideFragmentsBlock {
  id
  fragments: value {
    ...SlideFragmentRichText
    ...SlideFragmentRawHtml
  }
}
    ${SlideFragmentRichTextFragmentDoc}
${SlideFragmentRawHtmlFragmentDoc}`;
export const PresentationPageFragmentDoc = gql`
    fragment PresentationPage on PresentationPage {
  id
  title
  slides {
    __typename
    id
    ...SlideTitleBlock
    ...SlideRichTextBlock
    ...SlideRawHtmlBlock
    ...SlideFragmentsBlock
  }
}
    ${SlideTitleBlockFragmentDoc}
${SlideRichTextBlockFragmentDoc}
${SlideRawHtmlBlockFragmentDoc}
${SlideFragmentsBlockFragmentDoc}`;