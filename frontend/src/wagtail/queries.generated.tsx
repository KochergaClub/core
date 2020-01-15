import gql from 'graphql-tag';
import * as Types from '../apollo/types.generated';

import { MailchimpSubscribeBlockFragment } from './blocks/fragments.generated';
import { PhotoRibbonBlockFragment } from './blocks/fragments.generated';
import { BigContactsBlockFragment } from './blocks/fragments.generated';
import { EventsListBlockFragment } from './blocks/fragments.generated';
import { ColumnsButtonsBlockFragment } from './blocks/fragments.generated';
import { ColumnsMembershipsBlockFragment } from './blocks/fragments.generated';
import { ColumnsBasicBlockFragment } from './blocks/fragments.generated';
import { GreyBlockFragment } from './blocks/fragments.generated';
import { BasicParagraphBlockFragment } from './blocks/fragments.generated';
import { BasicLeadBlockFragment } from './blocks/fragments.generated';
import { HeroFrontBlockFragment } from './blocks/fragments.generated';
import { BasicLeadBlockFragmentDoc } from './blocks/fragments.generated';
import { BasicParagraphBlockFragmentDoc } from './blocks/fragments.generated';
import { GreyBlockFragmentDoc } from './blocks/fragments.generated';
import { ColumnsBasicBlockFragmentDoc } from './blocks/fragments.generated';
import { ColumnsMembershipsBlockFragmentDoc } from './blocks/fragments.generated';
import { ColumnsButtonsBlockFragmentDoc } from './blocks/fragments.generated';
import { EventsListBlockFragmentDoc } from './blocks/fragments.generated';
import { BigContactsBlockFragmentDoc } from './blocks/fragments.generated';
import { PhotoRibbonBlockFragmentDoc } from './blocks/fragments.generated';
import { MailchimpSubscribeBlockFragmentDoc } from './blocks/fragments.generated';
import { HeroFrontBlockFragmentDoc } from './blocks/fragments.generated';












export type FreeFormPageFragment = (
  { __typename?: 'FreeFormPage' }
  & Pick<Types.FreeFormPage, 'id' | 'title'>
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
    { __typename: 'GreyBlock' }
    & Pick<Types.GreyBlock, 'id'>
    & GreyBlockFragment
  ) | (
    { __typename: 'BasicLeadBlock' }
    & Pick<Types.BasicLeadBlock, 'id'>
    & BasicLeadBlockFragment
  ) | (
    { __typename: 'BasicParagraphBlock' }
    & Pick<Types.BasicParagraphBlock, 'id'>
    & BasicParagraphBlockFragment
  ) | (
    { __typename: 'ColumnsBasicBlock' }
    & Pick<Types.ColumnsBasicBlock, 'id'>
    & ColumnsBasicBlockFragment
  ) | (
    { __typename: 'ColumnsMembershipsBlock' }
    & Pick<Types.ColumnsMembershipsBlock, 'id'>
    & ColumnsMembershipsBlockFragment
  ) | (
    { __typename: 'ColumnsButtonsBlock' }
    & Pick<Types.ColumnsButtonsBlock, 'id'>
    & ColumnsButtonsBlockFragment
  ) | (
    { __typename: 'EventsListBlock' }
    & Pick<Types.EventsListBlock, 'id'>
    & EventsListBlockFragment
  ) | (
    { __typename: 'BigContactsBlock' }
    & Pick<Types.BigContactsBlock, 'id'>
    & BigContactsBlockFragment
  ) | (
    { __typename: 'PhotoRibbonBlock' }
    & Pick<Types.PhotoRibbonBlock, 'id'>
    & PhotoRibbonBlockFragment
  ) | (
    { __typename: 'MailchimpSubscribeBlock' }
    & Pick<Types.MailchimpSubscribeBlock, 'id'>
    & MailchimpSubscribeBlockFragment
  ) | (
    { __typename: 'HeroFrontBlock' }
    & Pick<Types.HeroFrontBlock, 'id'>
    & HeroFrontBlockFragment
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
    ...GreyBlock
    ...ColumnsBasicBlock
    ...ColumnsMembershipsBlock
    ...ColumnsButtonsBlock
    ...EventsListBlock
    ...BigContactsBlock
    ...PhotoRibbonBlock
    ...MailchimpSubscribeBlock
    ...HeroFrontBlock
  }
}
    ${BasicLeadBlockFragmentDoc}
${BasicParagraphBlockFragmentDoc}
${GreyBlockFragmentDoc}
${ColumnsBasicBlockFragmentDoc}
${ColumnsMembershipsBlockFragmentDoc}
${ColumnsButtonsBlockFragmentDoc}
${EventsListBlockFragmentDoc}
${BigContactsBlockFragmentDoc}
${PhotoRibbonBlockFragmentDoc}
${MailchimpSubscribeBlockFragmentDoc}
${HeroFrontBlockFragmentDoc}`;