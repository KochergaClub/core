import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type WagtailBlockValidationError_L0_WagtailStructBlockValidationError_Fragment = (
  { __typename: 'WagtailStructBlockValidationError' }
  & Pick<Types.WagtailStructBlockValidationError, 'error_message'>
);

export type WagtailBlockValidationError_L0_WagtailListBlockValidationError_Fragment = (
  { __typename: 'WagtailListBlockValidationError' }
  & Pick<Types.WagtailListBlockValidationError, 'error_message'>
);

export type WagtailBlockValidationError_L0_WagtailAnyBlockValidationError_Fragment = (
  { __typename: 'WagtailAnyBlockValidationError' }
  & Pick<Types.WagtailAnyBlockValidationError, 'error_message'>
);

export type WagtailBlockValidationError_L0Fragment = WagtailBlockValidationError_L0_WagtailStructBlockValidationError_Fragment | WagtailBlockValidationError_L0_WagtailListBlockValidationError_Fragment | WagtailBlockValidationError_L0_WagtailAnyBlockValidationError_Fragment;

export type WagtailBlockValidationError_L1_WagtailStructBlockValidationError_Fragment = (
  { __typename: 'WagtailStructBlockValidationError' }
  & Pick<Types.WagtailStructBlockValidationError, 'error_message'>
  & { errors: Array<(
    { __typename: 'WagtailStructBlockFieldValidationError' }
    & Pick<Types.WagtailStructBlockFieldValidationError, 'name'>
    & { error?: Types.Maybe<(
      { __typename: 'WagtailStructBlockValidationError' }
      & WagtailBlockValidationError_L0_WagtailStructBlockValidationError_Fragment
    ) | (
      { __typename: 'WagtailListBlockValidationError' }
      & WagtailBlockValidationError_L0_WagtailListBlockValidationError_Fragment
    ) | (
      { __typename: 'WagtailAnyBlockValidationError' }
      & WagtailBlockValidationError_L0_WagtailAnyBlockValidationError_Fragment
    )> }
  )> }
);

export type WagtailBlockValidationError_L1_WagtailListBlockValidationError_Fragment = (
  { __typename: 'WagtailListBlockValidationError' }
  & Pick<Types.WagtailListBlockValidationError, 'error_message'>
  & { list_errors: Array<Types.Maybe<(
    { __typename: 'WagtailStructBlockValidationError' }
    & WagtailBlockValidationError_L0_WagtailStructBlockValidationError_Fragment
  ) | (
    { __typename: 'WagtailListBlockValidationError' }
    & WagtailBlockValidationError_L0_WagtailListBlockValidationError_Fragment
  ) | (
    { __typename: 'WagtailAnyBlockValidationError' }
    & WagtailBlockValidationError_L0_WagtailAnyBlockValidationError_Fragment
  )>> }
);

export type WagtailBlockValidationError_L1_WagtailAnyBlockValidationError_Fragment = (
  { __typename: 'WagtailAnyBlockValidationError' }
  & Pick<Types.WagtailAnyBlockValidationError, 'error_message'>
);

export type WagtailBlockValidationError_L1Fragment = WagtailBlockValidationError_L1_WagtailStructBlockValidationError_Fragment | WagtailBlockValidationError_L1_WagtailListBlockValidationError_Fragment | WagtailBlockValidationError_L1_WagtailAnyBlockValidationError_Fragment;

export type WagtailBlockValidationError_L2_WagtailStructBlockValidationError_Fragment = (
  { __typename: 'WagtailStructBlockValidationError' }
  & Pick<Types.WagtailStructBlockValidationError, 'error_message'>
  & { errors: Array<(
    { __typename: 'WagtailStructBlockFieldValidationError' }
    & Pick<Types.WagtailStructBlockFieldValidationError, 'name'>
    & { error?: Types.Maybe<(
      { __typename: 'WagtailStructBlockValidationError' }
      & WagtailBlockValidationError_L1_WagtailStructBlockValidationError_Fragment
    ) | (
      { __typename: 'WagtailListBlockValidationError' }
      & WagtailBlockValidationError_L1_WagtailListBlockValidationError_Fragment
    ) | (
      { __typename: 'WagtailAnyBlockValidationError' }
      & WagtailBlockValidationError_L1_WagtailAnyBlockValidationError_Fragment
    )> }
  )> }
);

export type WagtailBlockValidationError_L2_WagtailListBlockValidationError_Fragment = (
  { __typename: 'WagtailListBlockValidationError' }
  & Pick<Types.WagtailListBlockValidationError, 'error_message'>
  & { list_errors: Array<Types.Maybe<(
    { __typename: 'WagtailStructBlockValidationError' }
    & WagtailBlockValidationError_L1_WagtailStructBlockValidationError_Fragment
  ) | (
    { __typename: 'WagtailListBlockValidationError' }
    & WagtailBlockValidationError_L1_WagtailListBlockValidationError_Fragment
  ) | (
    { __typename: 'WagtailAnyBlockValidationError' }
    & WagtailBlockValidationError_L1_WagtailAnyBlockValidationError_Fragment
  )>> }
);

export type WagtailBlockValidationError_L2_WagtailAnyBlockValidationError_Fragment = (
  { __typename: 'WagtailAnyBlockValidationError' }
  & Pick<Types.WagtailAnyBlockValidationError, 'error_message'>
);

export type WagtailBlockValidationError_L2Fragment = WagtailBlockValidationError_L2_WagtailStructBlockValidationError_Fragment | WagtailBlockValidationError_L2_WagtailListBlockValidationError_Fragment | WagtailBlockValidationError_L2_WagtailAnyBlockValidationError_Fragment;

export type WagtailBlockValidationError_L3_WagtailStructBlockValidationError_Fragment = (
  { __typename: 'WagtailStructBlockValidationError' }
  & Pick<Types.WagtailStructBlockValidationError, 'error_message'>
  & { errors: Array<(
    { __typename: 'WagtailStructBlockFieldValidationError' }
    & Pick<Types.WagtailStructBlockFieldValidationError, 'name'>
    & { error?: Types.Maybe<(
      { __typename: 'WagtailStructBlockValidationError' }
      & WagtailBlockValidationError_L2_WagtailStructBlockValidationError_Fragment
    ) | (
      { __typename: 'WagtailListBlockValidationError' }
      & WagtailBlockValidationError_L2_WagtailListBlockValidationError_Fragment
    ) | (
      { __typename: 'WagtailAnyBlockValidationError' }
      & WagtailBlockValidationError_L2_WagtailAnyBlockValidationError_Fragment
    )> }
  )> }
);

export type WagtailBlockValidationError_L3_WagtailListBlockValidationError_Fragment = (
  { __typename: 'WagtailListBlockValidationError' }
  & Pick<Types.WagtailListBlockValidationError, 'error_message'>
  & { list_errors: Array<Types.Maybe<(
    { __typename: 'WagtailStructBlockValidationError' }
    & WagtailBlockValidationError_L2_WagtailStructBlockValidationError_Fragment
  ) | (
    { __typename: 'WagtailListBlockValidationError' }
    & WagtailBlockValidationError_L2_WagtailListBlockValidationError_Fragment
  ) | (
    { __typename: 'WagtailAnyBlockValidationError' }
    & WagtailBlockValidationError_L2_WagtailAnyBlockValidationError_Fragment
  )>> }
);

export type WagtailBlockValidationError_L3_WagtailAnyBlockValidationError_Fragment = (
  { __typename: 'WagtailAnyBlockValidationError' }
  & Pick<Types.WagtailAnyBlockValidationError, 'error_message'>
);

export type WagtailBlockValidationError_L3Fragment = WagtailBlockValidationError_L3_WagtailStructBlockValidationError_Fragment | WagtailBlockValidationError_L3_WagtailListBlockValidationError_Fragment | WagtailBlockValidationError_L3_WagtailAnyBlockValidationError_Fragment;

export const WagtailBlockValidationError_L0FragmentDoc: DocumentNode<WagtailBlockValidationError_L0Fragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WagtailBlockValidationError_L0"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailBlockValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error_message"}}]}}]};
export const WagtailBlockValidationError_L1FragmentDoc: DocumentNode<WagtailBlockValidationError_L1Fragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WagtailBlockValidationError_L1"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailBlockValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error_message"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailStructBlockValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailBlockValidationError_L0"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailListBlockValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"list_errors"},"name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailBlockValidationError_L0"}}]}}]}}]}},...WagtailBlockValidationError_L0FragmentDoc.definitions]};
export const WagtailBlockValidationError_L2FragmentDoc: DocumentNode<WagtailBlockValidationError_L2Fragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WagtailBlockValidationError_L2"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailBlockValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error_message"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailStructBlockValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailBlockValidationError_L1"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailListBlockValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"list_errors"},"name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailBlockValidationError_L1"}}]}}]}}]}},...WagtailBlockValidationError_L1FragmentDoc.definitions]};
export const WagtailBlockValidationError_L3FragmentDoc: DocumentNode<WagtailBlockValidationError_L3Fragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WagtailBlockValidationError_L3"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailBlockValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"error_message"}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailStructBlockValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"error"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailBlockValidationError_L2"}}]}}]}}]}},{"kind":"InlineFragment","typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailListBlockValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"list_errors"},"name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailBlockValidationError_L2"}}]}}]}}]}},...WagtailBlockValidationError_L2FragmentDoc.definitions]};