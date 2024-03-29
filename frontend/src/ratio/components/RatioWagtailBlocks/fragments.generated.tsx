import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type RatioHeaderBlockFragment = (
  { __typename: 'RatioHeaderBlock' }
  & Pick<Types.RatioHeaderBlock, 'id' | 'value'>
);

export type RatioParagraphBlockFragment = (
  { __typename: 'RatioParagraphBlock' }
  & Pick<Types.RatioParagraphBlock, 'id' | 'value'>
);

export type RatioInsetBlockFragment = (
  { __typename: 'RatioInsetBlock' }
  & Pick<Types.RatioInsetBlock, 'id' | 'value'>
);

export type RatioExerciseBlockFragment = (
  { __typename: 'RatioExerciseBlock' }
  & Pick<Types.RatioExerciseBlock, 'id'>
  & { exercise: (
    { __typename: 'RatioExerciseBlockValue' }
    & Pick<Types.RatioExerciseBlockValue, 'enumerate' | 'header' | 'lines_count'>
  ) }
);

export type RatioExerciseOnelineBlockFragment = (
  { __typename: 'RatioExerciseOnelineBlock' }
  & Pick<Types.RatioExerciseOnelineBlock, 'id'>
  & { exercise_oneline: (
    { __typename: 'RatioExerciseOnelineBlockValue' }
    & Pick<Types.RatioExerciseOnelineBlockValue, 'text'>
  ) }
);

export type RatioBriefingBlockFragment = (
  { __typename: 'RatioBriefingBlock' }
  & Pick<Types.RatioBriefingBlock, 'id' | 'value'>
);

export type RatioMathBlockFragment = (
  { __typename: 'RatioMathBlock' }
  & Pick<Types.RatioMathBlock, 'id' | 'value'>
);

export const RatioHeaderBlockFragmentDoc: DocumentNode<RatioHeaderBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioHeaderBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioHeaderBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]};
export const RatioParagraphBlockFragmentDoc: DocumentNode<RatioParagraphBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioParagraphBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioParagraphBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]};
export const RatioInsetBlockFragmentDoc: DocumentNode<RatioInsetBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioInsetBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioInsetBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]};
export const RatioExerciseBlockFragmentDoc: DocumentNode<RatioExerciseBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioExerciseBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioExerciseBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"exercise"},"name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"enumerate"}},{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"lines_count"}}]}}]}}]};
export const RatioExerciseOnelineBlockFragmentDoc: DocumentNode<RatioExerciseOnelineBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioExerciseOnelineBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioExerciseOnelineBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"exercise_oneline"},"name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]};
export const RatioBriefingBlockFragmentDoc: DocumentNode<RatioBriefingBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioBriefingBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioBriefingBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]};
export const RatioMathBlockFragmentDoc: DocumentNode<RatioMathBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioMathBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioMathBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]};