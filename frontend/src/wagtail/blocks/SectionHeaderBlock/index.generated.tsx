import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type SectionHeaderBlockFragment = (
  { __typename: 'SectionHeaderBlock' }
  & Pick<Types.SectionHeaderBlock, 'id'>
  & { section_header_value: (
    { __typename: 'SectionHeaderBlockValue' }
    & Pick<Types.SectionHeaderBlockValue, 'header' | 'text'>
  ) }
);

export const SectionHeaderBlockFragmentDoc = gql`
    fragment SectionHeaderBlock on SectionHeaderBlock {
  id
  section_header_value: value {
    header
    text
  }
}
    `;