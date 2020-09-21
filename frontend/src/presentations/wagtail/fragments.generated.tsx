import * as Types from '../../apollo/types.generated';

import { CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_PresentationPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment } from '../../cms/queries.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { CommonWagtailPageFragmentDoc } from '../../cms/queries.generated';
export type SlideTitleBlockFragment = (
  { __typename: 'SlideTitleBlock' }
  & Pick<Types.SlideTitleBlock, 'id'>
  & { title: Types.SlideTitleBlock['value'] }
);

export type SlideRichTextBlockFragment = (
  { __typename: 'SlideRichTextBlock' }
  & Pick<Types.SlideRichTextBlock, 'id' | 'value'>
);

export type SlideRawHtmlBlockFragment = (
  { __typename: 'SlideRawHtmlBlock' }
  & Pick<Types.SlideRawHtmlBlock, 'id' | 'value'>
);

export type SlideFragmentRichTextFragment = (
  { __typename: 'SlideFragmentsBlock_RichTextBlock' }
  & Pick<Types.SlideFragmentsBlock_RichTextBlock, 'id' | 'value'>
);

export type SlideFragmentRawHtmlFragment = (
  { __typename: 'SlideFragmentsBlock_RawHtmlBlock' }
  & Pick<Types.SlideFragmentsBlock_RawHtmlBlock, 'id' | 'value'>
);

export type SlideFragmentsBlockFragment = (
  { __typename: 'SlideFragmentsBlock' }
  & Pick<Types.SlideFragmentsBlock, 'id'>
  & { fragments: Array<(
    { __typename: 'SlideFragmentsBlock_RichTextBlock' }
    & SlideFragmentRichTextFragment
  ) | (
    { __typename: 'SlideFragmentsBlock_RawHtmlBlock' }
    & SlideFragmentRawHtmlFragment
  )> }
);

export type PresentationPageFragment = (
  { __typename: 'PresentationPage' }
  & { slides: Array<(
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
  & CommonWagtailPage_PresentationPage_Fragment
);

export const SlideTitleBlockFragmentDoc: DocumentNode<SlideTitleBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SlideTitleBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SlideTitleBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"title"},"name":{"kind":"Name","value":"value"},"arguments":[],"directives":[]}]}}]};
export const SlideRichTextBlockFragmentDoc: DocumentNode<SlideRichTextBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SlideRichTextBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SlideRichTextBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"value"},"arguments":[],"directives":[]}]}}]};
export const SlideRawHtmlBlockFragmentDoc: DocumentNode<SlideRawHtmlBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SlideRawHtmlBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SlideRawHtmlBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"value"},"arguments":[],"directives":[]}]}}]};
export const SlideFragmentRichTextFragmentDoc: DocumentNode<SlideFragmentRichTextFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SlideFragmentRichText"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SlideFragmentsBlock_RichTextBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"value"},"arguments":[],"directives":[]}]}}]};
export const SlideFragmentRawHtmlFragmentDoc: DocumentNode<SlideFragmentRawHtmlFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SlideFragmentRawHtml"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SlideFragmentsBlock_RawHtmlBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"value"},"arguments":[],"directives":[]}]}}]};
export const SlideFragmentsBlockFragmentDoc: DocumentNode<SlideFragmentsBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SlideFragmentsBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SlideFragmentsBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"fragments"},"name":{"kind":"Name","value":"value"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"SlideFragmentRichText"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SlideFragmentRawHtml"},"directives":[]}]}}]}},...SlideFragmentRichTextFragmentDoc.definitions,...SlideFragmentRawHtmlFragmentDoc.definitions]};
export const PresentationPageFragmentDoc: DocumentNode<PresentationPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PresentationPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PresentationPage"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"},"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"slides"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SlideTitleBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SlideRichTextBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SlideRawHtmlBlock"},"directives":[]},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SlideFragmentsBlock"},"directives":[]}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...SlideTitleBlockFragmentDoc.definitions,...SlideRichTextBlockFragmentDoc.definitions,...SlideRawHtmlBlockFragmentDoc.definitions,...SlideFragmentsBlockFragmentDoc.definitions]};