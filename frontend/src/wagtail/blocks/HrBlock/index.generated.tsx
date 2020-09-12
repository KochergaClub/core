import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type HrBlockFragment = (
  { __typename: 'HrBlock' }
  & Pick<Types.HrBlock, 'id'>
);

export const HrBlockFragmentDoc = gql`
    fragment HrBlock on HrBlock {
  id
}
    `;