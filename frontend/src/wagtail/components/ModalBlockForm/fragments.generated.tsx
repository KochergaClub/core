import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type WagtailBlockValidationError_L0_WagtailAnyBlockValidationError_Fragment = (
  { __typename: 'WagtailAnyBlockValidationError' }
  & Pick<Types.WagtailAnyBlockValidationError, 'error_message'>
);

export type WagtailBlockValidationError_L0_WagtailListBlockValidationError_Fragment = (
  { __typename: 'WagtailListBlockValidationError' }
  & Pick<Types.WagtailListBlockValidationError, 'error_message'>
);

export type WagtailBlockValidationError_L0_WagtailStructBlockValidationError_Fragment = (
  { __typename: 'WagtailStructBlockValidationError' }
  & Pick<Types.WagtailStructBlockValidationError, 'error_message'>
);

export type WagtailBlockValidationError_L0Fragment = WagtailBlockValidationError_L0_WagtailAnyBlockValidationError_Fragment | WagtailBlockValidationError_L0_WagtailListBlockValidationError_Fragment | WagtailBlockValidationError_L0_WagtailStructBlockValidationError_Fragment;

export type WagtailBlockValidationError_L1_WagtailAnyBlockValidationError_Fragment = (
  { __typename: 'WagtailAnyBlockValidationError' }
  & Pick<Types.WagtailAnyBlockValidationError, 'error_message'>
);

export type WagtailBlockValidationError_L1_WagtailListBlockValidationError_Fragment = (
  { __typename: 'WagtailListBlockValidationError' }
  & Pick<Types.WagtailListBlockValidationError, 'error_message'>
  & { list_errors: Array<Types.Maybe<(
    { __typename: 'WagtailAnyBlockValidationError' }
    & WagtailBlockValidationError_L0_WagtailAnyBlockValidationError_Fragment
  ) | (
    { __typename: 'WagtailListBlockValidationError' }
    & WagtailBlockValidationError_L0_WagtailListBlockValidationError_Fragment
  ) | (
    { __typename: 'WagtailStructBlockValidationError' }
    & WagtailBlockValidationError_L0_WagtailStructBlockValidationError_Fragment
  )>> }
);

export type WagtailBlockValidationError_L1_WagtailStructBlockValidationError_Fragment = (
  { __typename: 'WagtailStructBlockValidationError' }
  & Pick<Types.WagtailStructBlockValidationError, 'error_message'>
  & { errors: Array<(
    { __typename: 'WagtailStructBlockFieldValidationError' }
    & Pick<Types.WagtailStructBlockFieldValidationError, 'name'>
    & { error?: Types.Maybe<(
      { __typename: 'WagtailAnyBlockValidationError' }
      & WagtailBlockValidationError_L0_WagtailAnyBlockValidationError_Fragment
    ) | (
      { __typename: 'WagtailListBlockValidationError' }
      & WagtailBlockValidationError_L0_WagtailListBlockValidationError_Fragment
    ) | (
      { __typename: 'WagtailStructBlockValidationError' }
      & WagtailBlockValidationError_L0_WagtailStructBlockValidationError_Fragment
    )> }
  )> }
);

export type WagtailBlockValidationError_L1Fragment = WagtailBlockValidationError_L1_WagtailAnyBlockValidationError_Fragment | WagtailBlockValidationError_L1_WagtailListBlockValidationError_Fragment | WagtailBlockValidationError_L1_WagtailStructBlockValidationError_Fragment;

export type WagtailBlockValidationError_L2_WagtailAnyBlockValidationError_Fragment = (
  { __typename: 'WagtailAnyBlockValidationError' }
  & Pick<Types.WagtailAnyBlockValidationError, 'error_message'>
);

export type WagtailBlockValidationError_L2_WagtailListBlockValidationError_Fragment = (
  { __typename: 'WagtailListBlockValidationError' }
  & Pick<Types.WagtailListBlockValidationError, 'error_message'>
  & { list_errors: Array<Types.Maybe<(
    { __typename: 'WagtailAnyBlockValidationError' }
    & WagtailBlockValidationError_L1_WagtailAnyBlockValidationError_Fragment
  ) | (
    { __typename: 'WagtailListBlockValidationError' }
    & WagtailBlockValidationError_L1_WagtailListBlockValidationError_Fragment
  ) | (
    { __typename: 'WagtailStructBlockValidationError' }
    & WagtailBlockValidationError_L1_WagtailStructBlockValidationError_Fragment
  )>> }
);

export type WagtailBlockValidationError_L2_WagtailStructBlockValidationError_Fragment = (
  { __typename: 'WagtailStructBlockValidationError' }
  & Pick<Types.WagtailStructBlockValidationError, 'error_message'>
  & { errors: Array<(
    { __typename: 'WagtailStructBlockFieldValidationError' }
    & Pick<Types.WagtailStructBlockFieldValidationError, 'name'>
    & { error?: Types.Maybe<(
      { __typename: 'WagtailAnyBlockValidationError' }
      & WagtailBlockValidationError_L1_WagtailAnyBlockValidationError_Fragment
    ) | (
      { __typename: 'WagtailListBlockValidationError' }
      & WagtailBlockValidationError_L1_WagtailListBlockValidationError_Fragment
    ) | (
      { __typename: 'WagtailStructBlockValidationError' }
      & WagtailBlockValidationError_L1_WagtailStructBlockValidationError_Fragment
    )> }
  )> }
);

export type WagtailBlockValidationError_L2Fragment = WagtailBlockValidationError_L2_WagtailAnyBlockValidationError_Fragment | WagtailBlockValidationError_L2_WagtailListBlockValidationError_Fragment | WagtailBlockValidationError_L2_WagtailStructBlockValidationError_Fragment;

export type WagtailBlockValidationError_L3_WagtailAnyBlockValidationError_Fragment = (
  { __typename: 'WagtailAnyBlockValidationError' }
  & Pick<Types.WagtailAnyBlockValidationError, 'error_message'>
);

export type WagtailBlockValidationError_L3_WagtailListBlockValidationError_Fragment = (
  { __typename: 'WagtailListBlockValidationError' }
  & Pick<Types.WagtailListBlockValidationError, 'error_message'>
  & { list_errors: Array<Types.Maybe<(
    { __typename: 'WagtailAnyBlockValidationError' }
    & WagtailBlockValidationError_L2_WagtailAnyBlockValidationError_Fragment
  ) | (
    { __typename: 'WagtailListBlockValidationError' }
    & WagtailBlockValidationError_L2_WagtailListBlockValidationError_Fragment
  ) | (
    { __typename: 'WagtailStructBlockValidationError' }
    & WagtailBlockValidationError_L2_WagtailStructBlockValidationError_Fragment
  )>> }
);

export type WagtailBlockValidationError_L3_WagtailStructBlockValidationError_Fragment = (
  { __typename: 'WagtailStructBlockValidationError' }
  & Pick<Types.WagtailStructBlockValidationError, 'error_message'>
  & { errors: Array<(
    { __typename: 'WagtailStructBlockFieldValidationError' }
    & Pick<Types.WagtailStructBlockFieldValidationError, 'name'>
    & { error?: Types.Maybe<(
      { __typename: 'WagtailAnyBlockValidationError' }
      & WagtailBlockValidationError_L2_WagtailAnyBlockValidationError_Fragment
    ) | (
      { __typename: 'WagtailListBlockValidationError' }
      & WagtailBlockValidationError_L2_WagtailListBlockValidationError_Fragment
    ) | (
      { __typename: 'WagtailStructBlockValidationError' }
      & WagtailBlockValidationError_L2_WagtailStructBlockValidationError_Fragment
    )> }
  )> }
);

export type WagtailBlockValidationError_L3Fragment = WagtailBlockValidationError_L3_WagtailAnyBlockValidationError_Fragment | WagtailBlockValidationError_L3_WagtailListBlockValidationError_Fragment | WagtailBlockValidationError_L3_WagtailStructBlockValidationError_Fragment;

export const WagtailBlockValidationError_L0FragmentDoc = gql`
    fragment WagtailBlockValidationError_L0 on WagtailBlockValidationError {
  error_message
}
    `;
export const WagtailBlockValidationError_L1FragmentDoc = gql`
    fragment WagtailBlockValidationError_L1 on WagtailBlockValidationError {
  error_message
  ... on WagtailStructBlockValidationError {
    errors {
      name
      error {
        ...WagtailBlockValidationError_L0
      }
    }
  }
  ... on WagtailListBlockValidationError {
    list_errors: errors {
      ...WagtailBlockValidationError_L0
    }
  }
}
    ${WagtailBlockValidationError_L0FragmentDoc}`;
export const WagtailBlockValidationError_L2FragmentDoc = gql`
    fragment WagtailBlockValidationError_L2 on WagtailBlockValidationError {
  error_message
  ... on WagtailStructBlockValidationError {
    errors {
      name
      error {
        ...WagtailBlockValidationError_L1
      }
    }
  }
  ... on WagtailListBlockValidationError {
    list_errors: errors {
      ...WagtailBlockValidationError_L1
    }
  }
}
    ${WagtailBlockValidationError_L1FragmentDoc}`;
export const WagtailBlockValidationError_L3FragmentDoc = gql`
    fragment WagtailBlockValidationError_L3 on WagtailBlockValidationError {
  error_message
  ... on WagtailStructBlockValidationError {
    errors {
      name
      error {
        ...WagtailBlockValidationError_L2
      }
    }
  }
  ... on WagtailListBlockValidationError {
    list_errors: errors {
      ...WagtailBlockValidationError_L2
    }
  }
}
    ${WagtailBlockValidationError_L2FragmentDoc}`;