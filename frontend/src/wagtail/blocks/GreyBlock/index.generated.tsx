import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type GreyBlockFragment = (
  { __typename: 'GreyBlock' }
  & Pick<Types.GreyBlock, 'id'>
  & { grey_value: (
    { __typename: 'GreyBlockValue' }
    & Pick<Types.GreyBlockValue, 'header' | 'text'>
  ) }
);

export const GreyBlockFragmentDoc = gql`
    fragment GreyBlock on GreyBlock {
  id
  grey_value: value {
    header
    text
  }
}
    `;