import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import * as Types from '../../../apollo/types.generated';

import { BasicLeadBlockFragment } from '../../blocks/BasicLeadBlock/index.generated';
import { BasicTextBlockFragment } from '../../blocks/BasicTextBlock/index.generated';
import { SectionHeaderBlockFragment } from '../../blocks/SectionHeaderBlock/index.generated';
import { BasicCardBlockFragment } from '../../blocks/BasicCardBlock/index.generated';
import { GreyBlockFragment } from '../../blocks/GreyBlock/index.generated';
import { ColumnsBasicBlockFragment } from '../../blocks/ColumnsBasicBlock/index.generated';
import { ColumnsButtonsBlockFragment } from '../../blocks/ColumnsButtonsBlock/index.generated';
import { EventsListBlockFragment } from '../../blocks/EventsListBlock/index.generated';
import { BigContactsBlockFragment } from '../../blocks/BigContactsBlock/index.generated';
import { PhotoRibbonBlockFragment } from '../../blocks/PhotoRibbonBlock/index.generated';
import { MailchimpSubscribeBlockFragment } from '../../blocks/MailchimpSubscribeBlock/index.generated';
import { HeroFrontBlockFragment } from '../../blocks/HeroFrontBlock/index.generated';
import { HrBlockFragment } from '../../blocks/HrBlock/index.generated';
import { FrontPartnersBlockFragment } from '../../blocks/FrontPartnersBlock/index.generated';
import { FrontSocialLinksBlockFragment } from '../../blocks/FrontSocialLinksBlock/index.generated';
import { CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_PresentationPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment } from '../../../cms/queries.generated';
import { CommonWagtailPageFragmentDoc } from '../../../cms/queries.generated';
import { BasicLeadBlockFragmentDoc } from '../../blocks/BasicLeadBlock/index.generated';
import { BasicTextBlockFragmentDoc } from '../../blocks/BasicTextBlock/index.generated';
import { SectionHeaderBlockFragmentDoc } from '../../blocks/SectionHeaderBlock/index.generated';
import { BasicCardBlockFragmentDoc } from '../../blocks/BasicCardBlock/index.generated';
import { GreyBlockFragmentDoc } from '../../blocks/GreyBlock/index.generated';
import { ColumnsBasicBlockFragmentDoc } from '../../blocks/ColumnsBasicBlock/index.generated';
import { ColumnsButtonsBlockFragmentDoc } from '../../blocks/ColumnsButtonsBlock/index.generated';
import { EventsListBlockFragmentDoc } from '../../blocks/EventsListBlock/index.generated';
import { BigContactsBlockFragmentDoc } from '../../blocks/BigContactsBlock/index.generated';
import { PhotoRibbonBlockFragmentDoc } from '../../blocks/PhotoRibbonBlock/index.generated';
import { MailchimpSubscribeBlockFragmentDoc } from '../../blocks/MailchimpSubscribeBlock/index.generated';
import { HeroFrontBlockFragmentDoc } from '../../blocks/HeroFrontBlock/index.generated';
import { HrBlockFragmentDoc } from '../../blocks/HrBlock/index.generated';
import { FrontPartnersBlockFragmentDoc } from '../../blocks/FrontPartnersBlock/index.generated';
import { FrontSocialLinksBlockFragmentDoc } from '../../blocks/FrontSocialLinksBlock/index.generated';
export type FreeFormPageFragment = (
  { __typename: 'FreeFormPage' }
  & { body: Array<(
    { __typename: 'BasicCardBlock' }
    & Pick<Types.BasicCardBlock, 'id'>
    & BasicCardBlockFragment
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
    & SectionHeaderBlockFragment
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
  & CommonWagtailPage_FreeFormPage_Fragment
);

export const FreeFormPageFragmentDoc: DocumentNode<FreeFormPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeFormPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeFormPage"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"},"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"body"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicLeadBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicTextBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionHeaderBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicCardBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GreyBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnsBasicBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnsButtonsBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventsListBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BigContactsBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhotoRibbonBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MailchimpSubscribeBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HeroFrontBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HrBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontPartnersBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontSocialLinksBlock"},"directives":[]}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...BasicLeadBlockFragmentDoc.definitions,...BasicTextBlockFragmentDoc.definitions,...SectionHeaderBlockFragmentDoc.definitions,...BasicCardBlockFragmentDoc.definitions,...GreyBlockFragmentDoc.definitions,...ColumnsBasicBlockFragmentDoc.definitions,...ColumnsButtonsBlockFragmentDoc.definitions,...EventsListBlockFragmentDoc.definitions,...BigContactsBlockFragmentDoc.definitions,...PhotoRibbonBlockFragmentDoc.definitions,...MailchimpSubscribeBlockFragmentDoc.definitions,...HeroFrontBlockFragmentDoc.definitions,...HrBlockFragmentDoc.definitions,...FrontPartnersBlockFragmentDoc.definitions,...FrontSocialLinksBlockFragmentDoc.definitions]};