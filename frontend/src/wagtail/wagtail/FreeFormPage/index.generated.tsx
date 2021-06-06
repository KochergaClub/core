import * as Types from '../../../apollo/types.generated';

import { CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_PresentationPage_Fragment } from '../../../cms/queries.generated';
import { BasicTextBlockFragment } from '../../blocks/BasicTextBlock/index.generated';
import { SectionHeaderBlockFragment } from '../../blocks/SectionHeaderBlock/index.generated';
import { BasicCardBlockFragment } from '../../blocks/BasicCardBlock/index.generated';
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
import { LandingHeroBlockFragment } from '../../blocks/LandingHeroBlock/index.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { CommonWagtailPageFragmentDoc } from '../../../cms/queries.generated';
import { BasicTextBlockFragmentDoc } from '../../blocks/BasicTextBlock/index.generated';
import { SectionHeaderBlockFragmentDoc } from '../../blocks/SectionHeaderBlock/index.generated';
import { BasicCardBlockFragmentDoc } from '../../blocks/BasicCardBlock/index.generated';
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
import { LandingHeroBlockFragmentDoc } from '../../blocks/LandingHeroBlock/index.generated';
export type FreeFormPageFragment = (
  { __typename: 'FreeFormPage' }
  & { body: Array<(
    { __typename: 'RatioNotebookSectionBlock' }
    & Pick<Types.RatioNotebookSectionBlock, 'id'>
  ) | (
    { __typename: 'RatioHeaderBlock' }
    & Pick<Types.RatioHeaderBlock, 'id'>
  ) | (
    { __typename: 'RatioParagraphBlock' }
    & Pick<Types.RatioParagraphBlock, 'id'>
  ) | (
    { __typename: 'RatioInsetBlock' }
    & Pick<Types.RatioInsetBlock, 'id'>
  ) | (
    { __typename: 'RatioExerciseBlock' }
    & Pick<Types.RatioExerciseBlock, 'id'>
  ) | (
    { __typename: 'RatioExerciseOnelineBlock' }
    & Pick<Types.RatioExerciseOnelineBlock, 'id'>
  ) | (
    { __typename: 'RatioBriefingBlock' }
    & Pick<Types.RatioBriefingBlock, 'id'>
  ) | (
    { __typename: 'RatioMathBlock' }
    & Pick<Types.RatioMathBlock, 'id'>
  ) | (
    { __typename: 'BasicTextBlock' }
    & Pick<Types.BasicTextBlock, 'id'>
    & BasicTextBlockFragment
  ) | (
    { __typename: 'BasicCardBlock' }
    & Pick<Types.BasicCardBlock, 'id'>
    & BasicCardBlockFragment
  ) | (
    { __typename: 'SectionHeaderBlock' }
    & Pick<Types.SectionHeaderBlock, 'id'>
    & SectionHeaderBlockFragment
  ) | (
    { __typename: 'ColumnsBasicBlock' }
    & Pick<Types.ColumnsBasicBlock, 'id'>
    & ColumnsBasicBlockFragment
  ) | (
    { __typename: 'ColumnsButtonsBlock' }
    & Pick<Types.ColumnsButtonsBlock, 'id'>
    & ColumnsButtonsBlockFragment
  ) | (
    { __typename: 'BigContactsBlock' }
    & Pick<Types.BigContactsBlock, 'id'>
    & BigContactsBlockFragment
  ) | (
    { __typename: 'MailchimpSubscribeBlock' }
    & Pick<Types.MailchimpSubscribeBlock, 'id'>
    & MailchimpSubscribeBlockFragment
  ) | (
    { __typename: 'HeroFrontBlock' }
    & Pick<Types.HeroFrontBlock, 'id'>
    & HeroFrontBlockFragment
  ) | (
    { __typename: 'LandingHeroBlock' }
    & Pick<Types.LandingHeroBlock, 'id'>
    & LandingHeroBlockFragment
  ) | (
    { __typename: 'FrontPartnersBlock' }
    & Pick<Types.FrontPartnersBlock, 'id'>
    & FrontPartnersBlockFragment
  ) | (
    { __typename: 'EventsListBlock' }
    & Pick<Types.EventsListBlock, 'id'>
    & EventsListBlockFragment
  ) | (
    { __typename: 'PhotoRibbonBlock' }
    & Pick<Types.PhotoRibbonBlock, 'id'>
    & PhotoRibbonBlockFragment
  ) | (
    { __typename: 'HrBlock' }
    & Pick<Types.HrBlock, 'id'>
    & HrBlockFragment
  ) | (
    { __typename: 'FrontSocialLinksBlock' }
    & Pick<Types.FrontSocialLinksBlock, 'id'>
    & FrontSocialLinksBlockFragment
  ) | (
    { __typename: 'SlideTitleBlock' }
    & Pick<Types.SlideTitleBlock, 'id'>
  ) | (
    { __typename: 'SlideRichTextBlock' }
    & Pick<Types.SlideRichTextBlock, 'id'>
  ) | (
    { __typename: 'SlideRawHtmlBlock' }
    & Pick<Types.SlideRawHtmlBlock, 'id'>
  ) | (
    { __typename: 'SlideFragmentsBlock' }
    & Pick<Types.SlideFragmentsBlock, 'id'>
  ) | (
    { __typename: 'SlideFragmentsBlock_RichTextBlock' }
    & Pick<Types.SlideFragmentsBlock_RichTextBlock, 'id'>
  ) | (
    { __typename: 'SlideFragmentsBlock_RawHtmlBlock' }
    & Pick<Types.SlideFragmentsBlock_RawHtmlBlock, 'id'>
  )> }
  & CommonWagtailPage_FreeFormPage_Fragment
);

export const FreeFormPageFragmentDoc: DocumentNode<FreeFormPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeFormPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeFormPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicTextBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionHeaderBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicCardBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnsBasicBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnsButtonsBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventsListBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BigContactsBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhotoRibbonBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MailchimpSubscribeBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HeroFrontBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HrBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontPartnersBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontSocialLinksBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LandingHeroBlock"}}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...BasicTextBlockFragmentDoc.definitions,...SectionHeaderBlockFragmentDoc.definitions,...BasicCardBlockFragmentDoc.definitions,...ColumnsBasicBlockFragmentDoc.definitions,...ColumnsButtonsBlockFragmentDoc.definitions,...EventsListBlockFragmentDoc.definitions,...BigContactsBlockFragmentDoc.definitions,...PhotoRibbonBlockFragmentDoc.definitions,...MailchimpSubscribeBlockFragmentDoc.definitions,...HeroFrontBlockFragmentDoc.definitions,...HrBlockFragmentDoc.definitions,...FrontPartnersBlockFragmentDoc.definitions,...FrontSocialLinksBlockFragmentDoc.definitions,...LandingHeroBlockFragmentDoc.definitions]};