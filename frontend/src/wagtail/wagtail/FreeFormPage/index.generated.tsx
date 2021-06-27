import * as Types from '../../../apollo/types.generated';

import { CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_PresentationPage_Fragment } from '../../../cms/queries.generated';
import { AnyWagtailBlock_RatioNotebookSectionBlock_Fragment, AnyWagtailBlock_RatioHeaderBlock_Fragment, AnyWagtailBlock_RatioParagraphBlock_Fragment, AnyWagtailBlock_RatioInsetBlock_Fragment, AnyWagtailBlock_RatioExerciseBlock_Fragment, AnyWagtailBlock_RatioExerciseOnelineBlock_Fragment, AnyWagtailBlock_RatioBriefingBlock_Fragment, AnyWagtailBlock_RatioMathBlock_Fragment, AnyWagtailBlock_BasicTextBlock_Fragment, AnyWagtailBlock_BasicCardBlock_Fragment, AnyWagtailBlock_SectionHeaderBlock_Fragment, AnyWagtailBlock_AnchorBlock_Fragment, AnyWagtailBlock_ColumnsBasicBlock_Fragment, AnyWagtailBlock_ColumnsButtonsBlock_Fragment, AnyWagtailBlock_BigContactsBlock_Fragment, AnyWagtailBlock_MailchimpSubscribeBlock_Fragment, AnyWagtailBlock_HeroFrontBlock_Fragment, AnyWagtailBlock_LandingHeroBlock_Fragment, AnyWagtailBlock_LandingTextBlock_Fragment, AnyWagtailBlock_FrontPartnersBlock_Fragment, AnyWagtailBlock_EventsListBlock_Fragment, AnyWagtailBlock_PhotoRibbonBlock_Fragment, AnyWagtailBlock_HrBlock_Fragment, AnyWagtailBlock_FrontSocialLinksBlock_Fragment, AnyWagtailBlock_SlideTitleBlock_Fragment, AnyWagtailBlock_SlideRichTextBlock_Fragment, AnyWagtailBlock_SlideRawHtmlBlock_Fragment, AnyWagtailBlock_SlideFragmentsBlock_Fragment, AnyWagtailBlock_SlideFragmentsBlock_RichTextBlock_Fragment, AnyWagtailBlock_SlideFragmentsBlock_RawHtmlBlock_Fragment } from '../../fragments.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { CommonWagtailPageFragmentDoc } from '../../../cms/queries.generated';
import { AnyWagtailBlockFragmentDoc } from '../../fragments.generated';
export type FreeFormPageFragment = (
  { __typename: 'FreeFormPage' }
  & { body: Array<(
    { __typename: 'RatioNotebookSectionBlock' }
    & AnyWagtailBlock_RatioNotebookSectionBlock_Fragment
  ) | (
    { __typename: 'RatioHeaderBlock' }
    & AnyWagtailBlock_RatioHeaderBlock_Fragment
  ) | (
    { __typename: 'RatioParagraphBlock' }
    & AnyWagtailBlock_RatioParagraphBlock_Fragment
  ) | (
    { __typename: 'RatioInsetBlock' }
    & AnyWagtailBlock_RatioInsetBlock_Fragment
  ) | (
    { __typename: 'RatioExerciseBlock' }
    & AnyWagtailBlock_RatioExerciseBlock_Fragment
  ) | (
    { __typename: 'RatioExerciseOnelineBlock' }
    & AnyWagtailBlock_RatioExerciseOnelineBlock_Fragment
  ) | (
    { __typename: 'RatioBriefingBlock' }
    & AnyWagtailBlock_RatioBriefingBlock_Fragment
  ) | (
    { __typename: 'RatioMathBlock' }
    & AnyWagtailBlock_RatioMathBlock_Fragment
  ) | (
    { __typename: 'BasicTextBlock' }
    & AnyWagtailBlock_BasicTextBlock_Fragment
  ) | (
    { __typename: 'BasicCardBlock' }
    & AnyWagtailBlock_BasicCardBlock_Fragment
  ) | (
    { __typename: 'SectionHeaderBlock' }
    & AnyWagtailBlock_SectionHeaderBlock_Fragment
  ) | (
    { __typename: 'AnchorBlock' }
    & AnyWagtailBlock_AnchorBlock_Fragment
  ) | (
    { __typename: 'ColumnsBasicBlock' }
    & AnyWagtailBlock_ColumnsBasicBlock_Fragment
  ) | (
    { __typename: 'ColumnsButtonsBlock' }
    & AnyWagtailBlock_ColumnsButtonsBlock_Fragment
  ) | (
    { __typename: 'BigContactsBlock' }
    & AnyWagtailBlock_BigContactsBlock_Fragment
  ) | (
    { __typename: 'MailchimpSubscribeBlock' }
    & AnyWagtailBlock_MailchimpSubscribeBlock_Fragment
  ) | (
    { __typename: 'HeroFrontBlock' }
    & AnyWagtailBlock_HeroFrontBlock_Fragment
  ) | (
    { __typename: 'LandingHeroBlock' }
    & AnyWagtailBlock_LandingHeroBlock_Fragment
  ) | (
    { __typename: 'LandingTextBlock' }
    & AnyWagtailBlock_LandingTextBlock_Fragment
  ) | (
    { __typename: 'FrontPartnersBlock' }
    & AnyWagtailBlock_FrontPartnersBlock_Fragment
  ) | (
    { __typename: 'EventsListBlock' }
    & AnyWagtailBlock_EventsListBlock_Fragment
  ) | (
    { __typename: 'PhotoRibbonBlock' }
    & AnyWagtailBlock_PhotoRibbonBlock_Fragment
  ) | (
    { __typename: 'HrBlock' }
    & AnyWagtailBlock_HrBlock_Fragment
  ) | (
    { __typename: 'FrontSocialLinksBlock' }
    & AnyWagtailBlock_FrontSocialLinksBlock_Fragment
  ) | (
    { __typename: 'SlideTitleBlock' }
    & AnyWagtailBlock_SlideTitleBlock_Fragment
  ) | (
    { __typename: 'SlideRichTextBlock' }
    & AnyWagtailBlock_SlideRichTextBlock_Fragment
  ) | (
    { __typename: 'SlideRawHtmlBlock' }
    & AnyWagtailBlock_SlideRawHtmlBlock_Fragment
  ) | (
    { __typename: 'SlideFragmentsBlock' }
    & AnyWagtailBlock_SlideFragmentsBlock_Fragment
  ) | (
    { __typename: 'SlideFragmentsBlock_RichTextBlock' }
    & AnyWagtailBlock_SlideFragmentsBlock_RichTextBlock_Fragment
  ) | (
    { __typename: 'SlideFragmentsBlock_RawHtmlBlock' }
    & AnyWagtailBlock_SlideFragmentsBlock_RawHtmlBlock_Fragment
  )> }
  & CommonWagtailPage_FreeFormPage_Fragment
);

export const FreeFormPageFragmentDoc: DocumentNode<FreeFormPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FreeFormPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FreeFormPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnyWagtailBlock"}}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...AnyWagtailBlockFragmentDoc.definitions]};