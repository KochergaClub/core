import * as Types from '../../apollo/types.generated';

import { CommonWagtailPage_RatioPresentationIndexPage_Fragment, CommonWagtailPage_RatioSectionPage_Fragment, CommonWagtailPage_RatioSectionIndexPage_Fragment, CommonWagtailPage_RatioNotebookPage_Fragment, CommonWagtailPage_RatioNotebookIndexPage_Fragment, CommonWagtailPage_ProjectPage_Fragment, CommonWagtailPage_ProjectIndexPage_Fragment, CommonWagtailPage_FreeFormPage_Fragment, CommonWagtailPage_FolderPage_Fragment, CommonWagtailPage_BlogPostPage_Fragment, CommonWagtailPage_BlogIndexPage_Fragment, CommonWagtailPage_FaqPage_Fragment, CommonWagtailPage_PresentationPage_Fragment } from '../../cms/queries.generated';
import { RatioHeaderBlockFragment, RatioParagraphBlockFragment, RatioInsetBlockFragment, RatioExerciseBlockFragment, RatioExerciseOnelineBlockFragment, RatioBriefingBlockFragment, RatioMathBlockFragment } from '../components/RatioWagtailBlocks/fragments.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { CommonWagtailPageFragmentDoc } from '../../cms/queries.generated';
import { RatioHeaderBlockFragmentDoc, RatioParagraphBlockFragmentDoc, RatioInsetBlockFragmentDoc, RatioExerciseBlockFragmentDoc, RatioExerciseOnelineBlockFragmentDoc, RatioBriefingBlockFragmentDoc, RatioMathBlockFragmentDoc } from '../components/RatioWagtailBlocks/fragments.generated';
export type RatioSectionIndexPageFragment = (
  { __typename: 'RatioSectionIndexPage' }
  & CommonWagtailPage_RatioSectionIndexPage_Fragment
);

export type RatioSectionPageFragment = (
  { __typename: 'RatioSectionPage' }
  & { body: Array<(
    { __typename: 'RatioNotebookSectionBlock' }
    & Pick<Types.RatioNotebookSectionBlock, 'id'>
  ) | (
    { __typename: 'RatioHeaderBlock' }
    & Pick<Types.RatioHeaderBlock, 'id'>
    & RatioHeaderBlockFragment
  ) | (
    { __typename: 'RatioParagraphBlock' }
    & Pick<Types.RatioParagraphBlock, 'id'>
    & RatioParagraphBlockFragment
  ) | (
    { __typename: 'RatioInsetBlock' }
    & Pick<Types.RatioInsetBlock, 'id'>
    & RatioInsetBlockFragment
  ) | (
    { __typename: 'RatioExerciseBlock' }
    & Pick<Types.RatioExerciseBlock, 'id'>
    & RatioExerciseBlockFragment
  ) | (
    { __typename: 'RatioExerciseOnelineBlock' }
    & Pick<Types.RatioExerciseOnelineBlock, 'id'>
    & RatioExerciseOnelineBlockFragment
  ) | (
    { __typename: 'RatioBriefingBlock' }
    & Pick<Types.RatioBriefingBlock, 'id'>
    & RatioBriefingBlockFragment
  ) | (
    { __typename: 'RatioMathBlock' }
    & Pick<Types.RatioMathBlock, 'id'>
    & RatioMathBlockFragment
  ) | (
    { __typename: 'BasicTextBlock' }
    & Pick<Types.BasicTextBlock, 'id'>
  ) | (
    { __typename: 'BasicCardBlock' }
    & Pick<Types.BasicCardBlock, 'id'>
  ) | (
    { __typename: 'SectionHeaderBlock' }
    & Pick<Types.SectionHeaderBlock, 'id'>
  ) | (
    { __typename: 'ColumnsBasicBlock' }
    & Pick<Types.ColumnsBasicBlock, 'id'>
  ) | (
    { __typename: 'ColumnsButtonsBlock' }
    & Pick<Types.ColumnsButtonsBlock, 'id'>
  ) | (
    { __typename: 'BigContactsBlock' }
    & Pick<Types.BigContactsBlock, 'id'>
  ) | (
    { __typename: 'MailchimpSubscribeBlock' }
    & Pick<Types.MailchimpSubscribeBlock, 'id'>
  ) | (
    { __typename: 'HeroFrontBlock' }
    & Pick<Types.HeroFrontBlock, 'id'>
  ) | (
    { __typename: 'LandingHeroBlock' }
    & Pick<Types.LandingHeroBlock, 'id'>
  ) | (
    { __typename: 'FrontPartnersBlock' }
    & Pick<Types.FrontPartnersBlock, 'id'>
  ) | (
    { __typename: 'EventsListBlock' }
    & Pick<Types.EventsListBlock, 'id'>
  ) | (
    { __typename: 'PhotoRibbonBlock' }
    & Pick<Types.PhotoRibbonBlock, 'id'>
  ) | (
    { __typename: 'HrBlock' }
    & Pick<Types.HrBlock, 'id'>
  ) | (
    { __typename: 'FrontSocialLinksBlock' }
    & Pick<Types.FrontSocialLinksBlock, 'id'>
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

export const RatioSectionIndexPageFragmentDoc: DocumentNode<RatioSectionIndexPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioSectionIndexPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioSectionIndexPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}}]}},...CommonWagtailPageFragmentDoc.definitions]};
export const RatioNotebookIndexPageFragmentDoc: DocumentNode<RatioNotebookIndexPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioNotebookIndexPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioNotebookIndexPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}}]}},...CommonWagtailPageFragmentDoc.definitions]};
export const RatioSectionPageFragmentDoc: DocumentNode<RatioSectionPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioSectionPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioSectionPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}},{"kind":"Field","name":{"kind":"Name","value":"body"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioHeaderBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioParagraphBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioInsetBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioExerciseBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioExerciseOnelineBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioBriefingBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioMathBlock"}}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...RatioHeaderBlockFragmentDoc.definitions,...RatioParagraphBlockFragmentDoc.definitions,...RatioInsetBlockFragmentDoc.definitions,...RatioExerciseBlockFragmentDoc.definitions,...RatioExerciseOnelineBlockFragmentDoc.definitions,...RatioBriefingBlockFragmentDoc.definitions,...RatioMathBlockFragmentDoc.definitions]};
export const RatioNotebookPageFragmentDoc: DocumentNode<RatioNotebookPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioNotebookPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioNotebookPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}},{"kind":"Field","name":{"kind":"Name","value":"sections"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioNotebookSectionBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioSectionPage"}}]}}]}}]}}]}},...CommonWagtailPageFragmentDoc.definitions,...RatioSectionPageFragmentDoc.definitions]};
export const RatioPresentationIndexPageFragmentDoc: DocumentNode<RatioPresentationIndexPageFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioPresentationIndexPage"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioPresentationIndexPage"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"CommonWagtailPage"}},{"kind":"Field","name":{"kind":"Name","value":"presentations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"meta"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}},...CommonWagtailPageFragmentDoc.definitions]};