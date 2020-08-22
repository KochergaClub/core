import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type BasicTextBlockFragment = (
  { __typename: 'BasicTextBlock' }
  & Pick<Types.BasicTextBlock, 'id'>
  & { basic_text: (
    { __typename: 'BasicTextBlockValue' }
    & Pick<Types.BasicTextBlockValue, 'text' | 'centered'>
  ) }
);

export const BasicTextBlockFragmentDoc = gql`
    fragment BasicTextBlock on BasicTextBlock {
  id
  basic_text: value {
    text
    centered
  }
}
    `;