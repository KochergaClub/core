import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type RatioHeaderBlockFragment = (
  { __typename?: 'RatioHeaderBlock' }
  & Pick<Types.RatioHeaderBlock, 'id' | 'value'>
);

export type RatioParagraphBlockFragment = (
  { __typename?: 'RatioParagraphBlock' }
  & Pick<Types.RatioParagraphBlock, 'id' | 'value'>
);

export type RatioInsetBlockFragment = (
  { __typename?: 'RatioInsetBlock' }
  & Pick<Types.RatioInsetBlock, 'id' | 'value'>
);

export type RatioExerciseBlockFragment = (
  { __typename?: 'RatioExerciseBlock' }
  & Pick<Types.RatioExerciseBlock, 'id'>
  & { exercise: (
    { __typename?: 'RatioExerciseBlockValue' }
    & Pick<Types.RatioExerciseBlockValue, 'enumerate' | 'header' | 'lines_count'>
  ) }
);

export type RatioExerciseOnelineBlockFragment = (
  { __typename?: 'RatioExerciseOnelineBlock' }
  & Pick<Types.RatioExerciseOnelineBlock, 'id'>
  & { exercise_oneline: (
    { __typename?: 'RatioExerciseOnelineBlockValue' }
    & Pick<Types.RatioExerciseOnelineBlockValue, 'text'>
  ) }
);

export type RatioBriefingBlockFragment = (
  { __typename?: 'RatioBriefingBlock' }
  & Pick<Types.RatioBriefingBlock, 'id' | 'value'>
);

export type RatioMathBlockFragment = (
  { __typename?: 'RatioMathBlock' }
  & Pick<Types.RatioMathBlock, 'id' | 'value'>
);

export const RatioHeaderBlockFragmentDoc = gql`
    fragment RatioHeaderBlock on RatioHeaderBlock {
  id
  value
}
    `;
export const RatioParagraphBlockFragmentDoc = gql`
    fragment RatioParagraphBlock on RatioParagraphBlock {
  id
  value
}
    `;
export const RatioInsetBlockFragmentDoc = gql`
    fragment RatioInsetBlock on RatioInsetBlock {
  id
  value
}
    `;
export const RatioExerciseBlockFragmentDoc = gql`
    fragment RatioExerciseBlock on RatioExerciseBlock {
  id
  exercise: value {
    enumerate
    header
    lines_count
  }
}
    `;
export const RatioExerciseOnelineBlockFragmentDoc = gql`
    fragment RatioExerciseOnelineBlock on RatioExerciseOnelineBlock {
  id
  exercise_oneline: value {
    text
  }
}
    `;
export const RatioBriefingBlockFragmentDoc = gql`
    fragment RatioBriefingBlock on RatioBriefingBlock {
  id
  value
}
    `;
export const RatioMathBlockFragmentDoc = gql`
    fragment RatioMathBlock on RatioMathBlock {
  id
  value
}
    `;