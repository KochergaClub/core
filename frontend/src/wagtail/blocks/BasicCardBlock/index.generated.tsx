import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type BasicCardBlockFragment = (
  { __typename: 'BasicCardBlock' }
  & Pick<Types.BasicCardBlock, 'id' | 'value'>
);

export const BasicCardBlockFragmentDoc = gql`
    fragment BasicCardBlock on BasicCardBlock {
  id
  value
}
    `;