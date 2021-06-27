import * as Types from '../apollo/types.generated';

import { BasicTextBlockFragment } from './blocks/BasicTextBlock/index.generated';
import { SectionHeaderBlockFragment } from './blocks/SectionHeaderBlock/index.generated';
import { BasicCardBlockFragment } from './blocks/BasicCardBlock/index.generated';
import { ColumnsBasicBlockFragment } from './blocks/ColumnsBasicBlock/index.generated';
import { ColumnsButtonsBlockFragment } from './blocks/ColumnsButtonsBlock/index.generated';
import { EventsListBlockFragment } from './blocks/EventsListBlock/index.generated';
import { BigContactsBlockFragment } from './blocks/BigContactsBlock/index.generated';
import { PhotoRibbonBlockFragment } from './blocks/PhotoRibbonBlock/index.generated';
import { MailchimpSubscribeBlockFragment } from './blocks/MailchimpSubscribeBlock/index.generated';
import { HeroFrontBlockFragment } from './blocks/HeroFrontBlock/index.generated';
import { HrBlockFragment } from './blocks/HrBlock/index.generated';
import { AnchorBlockFragment } from './blocks/AnchorBlock/index.generated';
import { FrontPartnersBlockFragment } from './blocks/FrontPartnersBlock/index.generated';
import { FrontSocialLinksBlockFragment } from './blocks/FrontSocialLinksBlock/index.generated';
import { LandingHeroBlockFragment } from './blocks/LandingHeroBlock/index.generated';
import { LandingTextBlockFragment } from './blocks/LandingTextBlock/index.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { BasicTextBlockFragmentDoc } from './blocks/BasicTextBlock/index.generated';
import { SectionHeaderBlockFragmentDoc } from './blocks/SectionHeaderBlock/index.generated';
import { BasicCardBlockFragmentDoc } from './blocks/BasicCardBlock/index.generated';
import { ColumnsBasicBlockFragmentDoc } from './blocks/ColumnsBasicBlock/index.generated';
import { ColumnsButtonsBlockFragmentDoc } from './blocks/ColumnsButtonsBlock/index.generated';
import { EventsListBlockFragmentDoc } from './blocks/EventsListBlock/index.generated';
import { BigContactsBlockFragmentDoc } from './blocks/BigContactsBlock/index.generated';
import { PhotoRibbonBlockFragmentDoc } from './blocks/PhotoRibbonBlock/index.generated';
import { MailchimpSubscribeBlockFragmentDoc } from './blocks/MailchimpSubscribeBlock/index.generated';
import { HeroFrontBlockFragmentDoc } from './blocks/HeroFrontBlock/index.generated';
import { HrBlockFragmentDoc } from './blocks/HrBlock/index.generated';
import { AnchorBlockFragmentDoc } from './blocks/AnchorBlock/index.generated';
import { FrontPartnersBlockFragmentDoc } from './blocks/FrontPartnersBlock/index.generated';
import { FrontSocialLinksBlockFragmentDoc } from './blocks/FrontSocialLinksBlock/index.generated';
import { LandingHeroBlockFragmentDoc } from './blocks/LandingHeroBlock/index.generated';
import { LandingTextBlockFragmentDoc } from './blocks/LandingTextBlock/index.generated';
export type AnyWagtailBlock_RatioNotebookSectionBlock_Fragment = (
  { __typename: 'RatioNotebookSectionBlock' }
  & Pick<Types.RatioNotebookSectionBlock, 'id'>
);

export type AnyWagtailBlock_RatioHeaderBlock_Fragment = (
  { __typename: 'RatioHeaderBlock' }
  & Pick<Types.RatioHeaderBlock, 'id'>
);

export type AnyWagtailBlock_RatioParagraphBlock_Fragment = (
  { __typename: 'RatioParagraphBlock' }
  & Pick<Types.RatioParagraphBlock, 'id'>
);

export type AnyWagtailBlock_RatioInsetBlock_Fragment = (
  { __typename: 'RatioInsetBlock' }
  & Pick<Types.RatioInsetBlock, 'id'>
);

export type AnyWagtailBlock_RatioExerciseBlock_Fragment = (
  { __typename: 'RatioExerciseBlock' }
  & Pick<Types.RatioExerciseBlock, 'id'>
);

export type AnyWagtailBlock_RatioExerciseOnelineBlock_Fragment = (
  { __typename: 'RatioExerciseOnelineBlock' }
  & Pick<Types.RatioExerciseOnelineBlock, 'id'>
);

export type AnyWagtailBlock_RatioBriefingBlock_Fragment = (
  { __typename: 'RatioBriefingBlock' }
  & Pick<Types.RatioBriefingBlock, 'id'>
);

export type AnyWagtailBlock_RatioMathBlock_Fragment = (
  { __typename: 'RatioMathBlock' }
  & Pick<Types.RatioMathBlock, 'id'>
);

export type AnyWagtailBlock_BasicTextBlock_Fragment = (
  { __typename: 'BasicTextBlock' }
  & Pick<Types.BasicTextBlock, 'id'>
  & BasicTextBlockFragment
);

export type AnyWagtailBlock_BasicCardBlock_Fragment = (
  { __typename: 'BasicCardBlock' }
  & Pick<Types.BasicCardBlock, 'id'>
  & BasicCardBlockFragment
);

export type AnyWagtailBlock_SectionHeaderBlock_Fragment = (
  { __typename: 'SectionHeaderBlock' }
  & Pick<Types.SectionHeaderBlock, 'id'>
  & SectionHeaderBlockFragment
);

export type AnyWagtailBlock_AnchorBlock_Fragment = (
  { __typename: 'AnchorBlock' }
  & Pick<Types.AnchorBlock, 'id'>
  & AnchorBlockFragment
);

export type AnyWagtailBlock_ColumnsBasicBlock_Fragment = (
  { __typename: 'ColumnsBasicBlock' }
  & Pick<Types.ColumnsBasicBlock, 'id'>
  & ColumnsBasicBlockFragment
);

export type AnyWagtailBlock_ColumnsButtonsBlock_Fragment = (
  { __typename: 'ColumnsButtonsBlock' }
  & Pick<Types.ColumnsButtonsBlock, 'id'>
  & ColumnsButtonsBlockFragment
);

export type AnyWagtailBlock_BigContactsBlock_Fragment = (
  { __typename: 'BigContactsBlock' }
  & Pick<Types.BigContactsBlock, 'id'>
  & BigContactsBlockFragment
);

export type AnyWagtailBlock_MailchimpSubscribeBlock_Fragment = (
  { __typename: 'MailchimpSubscribeBlock' }
  & Pick<Types.MailchimpSubscribeBlock, 'id'>
  & MailchimpSubscribeBlockFragment
);

export type AnyWagtailBlock_HeroFrontBlock_Fragment = (
  { __typename: 'HeroFrontBlock' }
  & Pick<Types.HeroFrontBlock, 'id'>
  & HeroFrontBlockFragment
);

export type AnyWagtailBlock_LandingHeroBlock_Fragment = (
  { __typename: 'LandingHeroBlock' }
  & Pick<Types.LandingHeroBlock, 'id'>
  & LandingHeroBlockFragment
);

export type AnyWagtailBlock_LandingTextBlock_Fragment = (
  { __typename: 'LandingTextBlock' }
  & Pick<Types.LandingTextBlock, 'id'>
  & LandingTextBlockFragment
);

export type AnyWagtailBlock_FrontPartnersBlock_Fragment = (
  { __typename: 'FrontPartnersBlock' }
  & Pick<Types.FrontPartnersBlock, 'id'>
  & FrontPartnersBlockFragment
);

export type AnyWagtailBlock_EventsListBlock_Fragment = (
  { __typename: 'EventsListBlock' }
  & Pick<Types.EventsListBlock, 'id'>
  & EventsListBlockFragment
);

export type AnyWagtailBlock_PhotoRibbonBlock_Fragment = (
  { __typename: 'PhotoRibbonBlock' }
  & Pick<Types.PhotoRibbonBlock, 'id'>
  & PhotoRibbonBlockFragment
);

export type AnyWagtailBlock_HrBlock_Fragment = (
  { __typename: 'HrBlock' }
  & Pick<Types.HrBlock, 'id'>
  & HrBlockFragment
);

export type AnyWagtailBlock_FrontSocialLinksBlock_Fragment = (
  { __typename: 'FrontSocialLinksBlock' }
  & Pick<Types.FrontSocialLinksBlock, 'id'>
  & FrontSocialLinksBlockFragment
);

export type AnyWagtailBlock_SlideTitleBlock_Fragment = (
  { __typename: 'SlideTitleBlock' }
  & Pick<Types.SlideTitleBlock, 'id'>
);

export type AnyWagtailBlock_SlideRichTextBlock_Fragment = (
  { __typename: 'SlideRichTextBlock' }
  & Pick<Types.SlideRichTextBlock, 'id'>
);

export type AnyWagtailBlock_SlideRawHtmlBlock_Fragment = (
  { __typename: 'SlideRawHtmlBlock' }
  & Pick<Types.SlideRawHtmlBlock, 'id'>
);

export type AnyWagtailBlock_SlideFragmentsBlock_Fragment = (
  { __typename: 'SlideFragmentsBlock' }
  & Pick<Types.SlideFragmentsBlock, 'id'>
);

export type AnyWagtailBlock_SlideFragmentsBlock_RichTextBlock_Fragment = (
  { __typename: 'SlideFragmentsBlock_RichTextBlock' }
  & Pick<Types.SlideFragmentsBlock_RichTextBlock, 'id'>
);

export type AnyWagtailBlock_SlideFragmentsBlock_RawHtmlBlock_Fragment = (
  { __typename: 'SlideFragmentsBlock_RawHtmlBlock' }
  & Pick<Types.SlideFragmentsBlock_RawHtmlBlock, 'id'>
);

export type AnyWagtailBlockFragment = AnyWagtailBlock_RatioNotebookSectionBlock_Fragment | AnyWagtailBlock_RatioHeaderBlock_Fragment | AnyWagtailBlock_RatioParagraphBlock_Fragment | AnyWagtailBlock_RatioInsetBlock_Fragment | AnyWagtailBlock_RatioExerciseBlock_Fragment | AnyWagtailBlock_RatioExerciseOnelineBlock_Fragment | AnyWagtailBlock_RatioBriefingBlock_Fragment | AnyWagtailBlock_RatioMathBlock_Fragment | AnyWagtailBlock_BasicTextBlock_Fragment | AnyWagtailBlock_BasicCardBlock_Fragment | AnyWagtailBlock_SectionHeaderBlock_Fragment | AnyWagtailBlock_AnchorBlock_Fragment | AnyWagtailBlock_ColumnsBasicBlock_Fragment | AnyWagtailBlock_ColumnsButtonsBlock_Fragment | AnyWagtailBlock_BigContactsBlock_Fragment | AnyWagtailBlock_MailchimpSubscribeBlock_Fragment | AnyWagtailBlock_HeroFrontBlock_Fragment | AnyWagtailBlock_LandingHeroBlock_Fragment | AnyWagtailBlock_LandingTextBlock_Fragment | AnyWagtailBlock_FrontPartnersBlock_Fragment | AnyWagtailBlock_EventsListBlock_Fragment | AnyWagtailBlock_PhotoRibbonBlock_Fragment | AnyWagtailBlock_HrBlock_Fragment | AnyWagtailBlock_FrontSocialLinksBlock_Fragment | AnyWagtailBlock_SlideTitleBlock_Fragment | AnyWagtailBlock_SlideRichTextBlock_Fragment | AnyWagtailBlock_SlideRawHtmlBlock_Fragment | AnyWagtailBlock_SlideFragmentsBlock_Fragment | AnyWagtailBlock_SlideFragmentsBlock_RichTextBlock_Fragment | AnyWagtailBlock_SlideFragmentsBlock_RawHtmlBlock_Fragment;

export const AnyWagtailBlockFragmentDoc: DocumentNode<AnyWagtailBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnyWagtailBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"__typename"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicTextBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"SectionHeaderBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BasicCardBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnsBasicBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ColumnsButtonsBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventsListBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"BigContactsBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"PhotoRibbonBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"MailchimpSubscribeBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HeroFrontBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"HrBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"AnchorBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontPartnersBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"FrontSocialLinksBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LandingHeroBlock"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"LandingTextBlock"}}]}},...BasicTextBlockFragmentDoc.definitions,...SectionHeaderBlockFragmentDoc.definitions,...BasicCardBlockFragmentDoc.definitions,...ColumnsBasicBlockFragmentDoc.definitions,...ColumnsButtonsBlockFragmentDoc.definitions,...EventsListBlockFragmentDoc.definitions,...BigContactsBlockFragmentDoc.definitions,...PhotoRibbonBlockFragmentDoc.definitions,...MailchimpSubscribeBlockFragmentDoc.definitions,...HeroFrontBlockFragmentDoc.definitions,...HrBlockFragmentDoc.definitions,...AnchorBlockFragmentDoc.definitions,...FrontPartnersBlockFragmentDoc.definitions,...FrontSocialLinksBlockFragmentDoc.definitions,...LandingHeroBlockFragmentDoc.definitions,...LandingTextBlockFragmentDoc.definitions]};