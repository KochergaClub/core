import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type ColumnsButtonsBlockFragment = (
  { __typename: 'ColumnsButtonsBlock' }
  & Pick<Types.ColumnsButtonsBlock, 'id'>
  & { button_columns: Array<(
    { __typename: 'ColumnsButtonsBlockValue' }
    & Pick<Types.ColumnsButtonsBlockValue, 'title' | 'text' | 'caption' | 'link'>
    & { image: (
      { __typename: 'WagtailImageRendition' }
      & Pick<Types.WagtailImageRendition, 'id' | 'url'>
      & { original_image: (
        { __typename: 'WagtailImage' }
        & Pick<Types.WagtailImage, 'id'>
      ) }
    ) }
  )> }
);

export const ColumnsButtonsBlockFragmentDoc = gql`
    fragment ColumnsButtonsBlock on ColumnsButtonsBlock {
  id
  button_columns: value {
    title
    text
    image(spec: "original") {
      id
      url
      original_image {
        id
      }
    }
    caption
    link
  }
}
    `;