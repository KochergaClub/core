import * as Types from '../apollo/types.generated';

import { BasicLeadBlockFragment, BasicParagraphBlockFragment, BasicTextBlockFragment, GreyBlockFragment, ColumnsBasicBlockFragment, ColumnsButtonsBlockFragment, EventsListBlockFragment, BigContactsBlockFragment, PhotoRibbonBlockFragment, MailchimpSubscribeBlockFragment, HeroFrontBlockFragment, HrBlockFragment, FrontPartnersBlockFragment, FrontSocialLinksBlockFragment } from './blocks/fragments.generated';
import gql from 'graphql-tag';
import { BasicLeadBlockFragmentDoc, BasicParagraphBlockFragmentDoc, BasicTextBlockFragmentDoc, GreyBlockFragmentDoc, ColumnsBasicBlockFragmentDoc, ColumnsButtonsBlockFragmentDoc, EventsListBlockFragmentDoc, BigContactsBlockFragmentDoc, PhotoRibbonBlockFragmentDoc, MailchimpSubscribeBlockFragmentDoc, HeroFrontBlockFragmentDoc, HrBlockFragmentDoc, FrontPartnersBlockFragmentDoc, FrontSocialLinksBlockFragmentDoc } from './blocks/fragments.generated';

export type FreeFormPageFragment = (
  { __typename: 'FreeFormPage' }
  & Pick<Types.FreeFormPage, 'id' | 'title'>
  & { body: Array<(
    { __typename: 'BasicLeadBlock' }
    & Pick<Types.BasicLeadBlock, 'id'>
    & BasicLeadBlockFragment
  ) | (
    { __typename: 'BasicParagraphBlock' }
    & Pick<Types.BasicParagraphBlock, 'id'>
    & BasicParagraphBlockFragment
  ) | (
    { __typename: 'BasicTextBlock' }
    & Pick<Types.BasicTextBlock, 'id'>
    & BasicTextBlockFragment
  ) | (
    { __typename: 'BigContactsBlock' }
    & Pick<Types.BigContactsBlock, 'id'>
    & BigContactsBlockFragment
  ) | (
    { __typename: 'ColumnsBasicBlock' }
    & Pick<Types.ColumnsBasicBlock, 'id'>
    & ColumnsBasicBlockFragment
  ) | (
    { __typename: 'ColumnsButtonsBlock' }
    & Pick<Types.ColumnsButtonsBlock, 'id'>
    & ColumnsButtonsBlockFragment
  ) | (
    { __typename: 'EventsListBlock' }
    & Pick<Types.EventsListBlock, 'id'>
    & EventsListBlockFragment
  ) | (
    { __typename: 'FrontPartnersBlock' }
    & Pick<Types.FrontPartnersBlock, 'id'>
    & FrontPartnersBlockFragment
  ) | (
    { __typename: 'FrontSocialLinksBlock' }
    & Pick<Types.FrontSocialLinksBlock, 'id'>
    & FrontSocialLinksBlockFragment
  ) | (
    { __typename: 'GreyBlock' }
    & Pick<Types.GreyBlock, 'id'>
    & GreyBlockFragment
  ) | (
    { __typename: 'HeroFrontBlock' }
    & Pick<Types.HeroFrontBlock, 'id'>
    & HeroFrontBlockFragment
  ) | (
    { __typename: 'HrBlock' }
    & Pick<Types.HrBlock, 'id'>
    & HrBlockFragment
  ) | (
    { __typename: 'MailchimpSubscribeBlock' }
    & Pick<Types.MailchimpSubscribeBlock, 'id'>
    & MailchimpSubscribeBlockFragment
  ) | (
    { __typename: 'PhotoRibbonBlock' }
    & Pick<Types.PhotoRibbonBlock, 'id'>
    & PhotoRibbonBlockFragment
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

export const FreeFormPageFragmentDoc = gql`
    fragment FreeFormPage on FreeFormPage {
  id
  title
  body {
    __typename
    id
    ...BasicLeadBlock
    ...BasicParagraphBlock
    ...BasicTextBlock
    ...GreyBlock
    ...ColumnsBasicBlock
    ...ColumnsButtonsBlock
    ...EventsListBlock
    ...BigContactsBlock
    ...PhotoRibbonBlock
    ...MailchimpSubscribeBlock
    ...HeroFrontBlock
    ...HrBlock
    ...FrontPartnersBlock
    ...FrontSocialLinksBlock
  }
}
    ${BasicLeadBlockFragmentDoc}
${BasicParagraphBlockFragmentDoc}
${BasicTextBlockFragmentDoc}
${GreyBlockFragmentDoc}
${ColumnsBasicBlockFragmentDoc}
${ColumnsButtonsBlockFragmentDoc}
${EventsListBlockFragmentDoc}
${BigContactsBlockFragmentDoc}
${PhotoRibbonBlockFragmentDoc}
${MailchimpSubscribeBlockFragmentDoc}
${HeroFrontBlockFragmentDoc}
${HrBlockFragmentDoc}
${FrontPartnersBlockFragmentDoc}
${FrontSocialLinksBlockFragmentDoc}`;