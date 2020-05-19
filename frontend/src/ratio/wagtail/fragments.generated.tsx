import * as Types from '../../apollo/types.generated';

import { RatioHeaderBlockFragment, RatioParagraphBlockFragment, RatioInsetBlockFragment, RatioExerciseBlockFragment, RatioExerciseOnelineBlockFragment, RatioBriefingBlockFragment, RatioMathBlockFragment } from '../components/RatioWagtailBlocks/fragments.generated';
import gql from 'graphql-tag';
import { RatioHeaderBlockFragmentDoc, RatioParagraphBlockFragmentDoc, RatioInsetBlockFragmentDoc, RatioExerciseBlockFragmentDoc, RatioExerciseOnelineBlockFragmentDoc, RatioBriefingBlockFragmentDoc, RatioMathBlockFragmentDoc } from '../components/RatioWagtailBlocks/fragments.generated';

export type RatioSectionIndexPageFragment = (
  { __typename?: 'RatioSectionIndexPage' }
  & Pick<Types.RatioSectionIndexPage, 'id' | 'title'>
);

export type RatioSectionPageFragment = (
  { __typename?: 'RatioSectionPage' }
  & Pick<Types.RatioSectionPage, 'id' | 'title'>
  & { meta: (
    { __typename?: 'WagtailPageMeta' }
    & Pick<Types.WagtailPageMeta, 'slug'>
  ), body: Array<(
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
    { __typename: 'GreyBlock' }
    & Pick<Types.GreyBlock, 'id'>
  ) | (
    { __typename: 'BasicLeadBlock' }
    & Pick<Types.BasicLeadBlock, 'id'>
  ) | (
    { __typename: 'BasicParagraphBlock' }
    & Pick<Types.BasicParagraphBlock, 'id'>
  ) | (
    { __typename: 'ColumnsBasicBlock' }
    & Pick<Types.ColumnsBasicBlock, 'id'>
  ) | (
    { __typename: 'ColumnsMembershipsBlock' }
    & Pick<Types.ColumnsMembershipsBlock, 'id'>
  ) | (
    { __typename: 'ColumnsButtonsBlock' }
    & Pick<Types.ColumnsButtonsBlock, 'id'>
  ) | (
    { __typename: 'EventsListBlock' }
    & Pick<Types.EventsListBlock, 'id'>
  ) | (
    { __typename: 'BigContactsBlock' }
    & Pick<Types.BigContactsBlock, 'id'>
  ) | (
    { __typename: 'PhotoRibbonBlock' }
    & Pick<Types.PhotoRibbonBlock, 'id'>
  ) | (
    { __typename: 'MailchimpSubscribeBlock' }
    & Pick<Types.MailchimpSubscribeBlock, 'id'>
  ) | (
    { __typename: 'HeroFrontBlock' }
    & Pick<Types.HeroFrontBlock, 'id'>
  )> }
);

export type RatioNotebookPageFragment = (
  { __typename?: 'RatioNotebookPage' }
  & Pick<Types.RatioNotebookPage, 'id' | 'title'>
  & { sections: Array<(
    { __typename?: 'RatioNotebookSectionBlock' }
    & Pick<Types.RatioNotebookSectionBlock, 'id'>
    & { value: (
      { __typename?: 'RatioSectionPage' }
      & RatioSectionPageFragment
    ) }
  )> }
);

export const RatioSectionIndexPageFragmentDoc = gql`
    fragment RatioSectionIndexPage on RatioSectionIndexPage {
  id
  title
}
    `;
export const RatioSectionPageFragmentDoc = gql`
    fragment RatioSectionPage on RatioSectionPage {
  id
  meta {
    slug
  }
  title
  body {
    __typename
    id
    ...RatioHeaderBlock
    ...RatioParagraphBlock
    ...RatioInsetBlock
    ...RatioExerciseBlock
    ...RatioExerciseOnelineBlock
    ...RatioBriefingBlock
    ...RatioMathBlock
  }
}
    ${RatioHeaderBlockFragmentDoc}
${RatioParagraphBlockFragmentDoc}
${RatioInsetBlockFragmentDoc}
${RatioExerciseBlockFragmentDoc}
${RatioExerciseOnelineBlockFragmentDoc}
${RatioBriefingBlockFragmentDoc}
${RatioMathBlockFragmentDoc}`;
export const RatioNotebookPageFragmentDoc = gql`
    fragment RatioNotebookPage on RatioNotebookPage {
  id
  title
  sections {
    ... on RatioNotebookSectionBlock {
      id
      value {
        ...RatioSectionPage
      }
    }
  }
}
    ${RatioSectionPageFragmentDoc}`;