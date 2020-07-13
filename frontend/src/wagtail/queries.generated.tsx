import * as Types from '../apollo/types.generated';

import { BasicLeadBlockFragment, BasicParagraphBlockFragment, GreyBlockFragment, ColumnsBasicBlockFragment, ColumnsMembershipsBlockFragment, ColumnsButtonsBlockFragment, EventsListBlockFragment, BigContactsBlockFragment, PhotoRibbonBlockFragment, MailchimpSubscribeBlockFragment, HeroFrontBlockFragment } from './blocks/fragments.generated';
import gql from 'graphql-tag';
import { BasicLeadBlockFragmentDoc, BasicParagraphBlockFragmentDoc, GreyBlockFragmentDoc, ColumnsBasicBlockFragmentDoc, ColumnsMembershipsBlockFragmentDoc, ColumnsButtonsBlockFragmentDoc, EventsListBlockFragmentDoc, BigContactsBlockFragmentDoc, PhotoRibbonBlockFragmentDoc, MailchimpSubscribeBlockFragmentDoc, HeroFrontBlockFragmentDoc } from './blocks/fragments.generated';

export type FreeFormPageFragment = (
  { __typename?: 'FreeFormPage' }
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
    { __typename: 'ColumnsMembershipsBlock' }
    & Pick<Types.ColumnsMembershipsBlock, 'id'>
    & ColumnsMembershipsBlockFragment
  ) | (
    { __typename: 'EventsListBlock' }
    & Pick<Types.EventsListBlock, 'id'>
    & EventsListBlockFragment
  ) | (
    { __typename: 'GreyBlock' }
    & Pick<Types.GreyBlock, 'id'>
    & GreyBlockFragment
  ) | (
    { __typename: 'HeroFrontBlock' }
    & Pick<Types.HeroFrontBlock, 'id'>
    & HeroFrontBlockFragment
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