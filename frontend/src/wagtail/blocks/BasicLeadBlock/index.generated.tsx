import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type BasicLeadBlockFragment = (
  { __typename: 'BasicLeadBlock' }
  & Pick<Types.BasicLeadBlock, 'id' | 'value'>
);

export const BasicLeadBlockFragmentDoc = gql`
    fragment BasicLeadBlock on BasicLeadBlock {
  id
  value
}
    `;