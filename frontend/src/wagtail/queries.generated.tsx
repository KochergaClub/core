import gql from 'graphql-tag';
import * as Types from '../apollo/types.generated';

import { BasicTextBlockFragment } from './blocks/BasicTextBlock/index.generated';
import { GreyBlockFragment } from './blocks/GreyBlock/index.generated';
import { ColumnsBasicBlockFragment } from './blocks/ColumnsBasicBlock/index.generated';
import { ColumnsButtonsBlockFragment } from './blocks/ColumnsButtonsBlock/index.generated';
import { EventsListBlockFragment } from './blocks/EventsListBlock/index.generated';
import { BigContactsBlockFragment } from './blocks/BigContactsBlock/index.generated';
import { PhotoRibbonBlockFragment } from './blocks/PhotoRibbonBlock/index.generated';
import { MailchimpSubscribeBlockFragment } from './blocks/MailchimpSubscribeBlock/index.generated';
import { HeroFrontBlockFragment } from './blocks/HeroFrontBlock/index.generated';
import { HrBlockFragment } from './blocks/HrBlock/index.generated';
import { FrontPartnersBlockFragment } from './blocks/FrontPartnersBlock/index.generated';
import { FrontSocialLinksBlockFragment } from './blocks/FrontSocialLinksBlock/index.generated';
import { BasicLeadBlockFragment } from './blocks/BasicLeadBlock/index.generated';
import { BasicLeadBlockFragmentDoc } from './blocks/BasicLeadBlock/index.generated';
import { BasicTextBlockFragmentDoc } from './blocks/BasicTextBlock/index.generated';
import { GreyBlockFragmentDoc } from './blocks/GreyBlock/index.generated';
import { ColumnsBasicBlockFragmentDoc } from './blocks/ColumnsBasicBlock/index.generated';
import { ColumnsButtonsBlockFragmentDoc } from './blocks/ColumnsButtonsBlock/index.generated';
import { EventsListBlockFragmentDoc } from './blocks/EventsListBlock/index.generated';
import { BigContactsBlockFragmentDoc } from './blocks/BigContactsBlock/index.generated';
import { PhotoRibbonBlockFragmentDoc } from './blocks/PhotoRibbonBlock/index.generated';
import { MailchimpSubscribeBlockFragmentDoc } from './blocks/MailchimpSubscribeBlock/index.generated';
import { HeroFrontBlockFragmentDoc } from './blocks/HeroFrontBlock/index.generated';
import { HrBlockFragmentDoc } from './blocks/HrBlock/index.generated';
import { FrontPartnersBlockFragmentDoc } from './blocks/FrontPartnersBlock/index.generated';
import { FrontSocialLinksBlockFragmentDoc } from './blocks/FrontSocialLinksBlock/index.generated';

export type FreeFormPageFragment = (
  { __typename: 'FreeFormPage' }
  & Pick<Types.FreeFormPage, 'id' | 'title'>
  & { body: Array<(
    { __typename: 'BasicCardBlock' }
    & Pick<Types.BasicCardBlock, 'id'>
  ) | (
    { __typename: 'BasicLeadBlock' }
    & Pick<Types.BasicLeadBlock, 'id'>
    & BasicLeadBlockFragment
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
);

export const FreeFormPageFragmentDoc = gql`
    fragment FreeFormPage on FreeFormPage {
  id
  title
  body {
    __typename
    id
    ...BasicLeadBlock
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