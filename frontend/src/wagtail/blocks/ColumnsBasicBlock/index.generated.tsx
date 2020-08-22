import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type ColumnsBasicBlockFragment = (
  { __typename: 'ColumnsBasicBlock' }
  & Pick<Types.ColumnsBasicBlock, 'id'>
  & { basic_columns: Array<(
    { __typename: 'ColumnsBasicBlockValue' }
    & Pick<Types.ColumnsBasicBlockValue, 'header' | 'text'>
  )> }
);

export const ColumnsBasicBlockFragmentDoc = gql`
    fragment ColumnsBasicBlock on ColumnsBasicBlock {
  id
  basic_columns: value {
    header
    text
  }
}
    `;