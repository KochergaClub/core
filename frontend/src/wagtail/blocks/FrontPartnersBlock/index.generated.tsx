import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type FrontPartnersBlockFragment = (
  { __typename: 'FrontPartnersBlock' }
  & Pick<Types.FrontPartnersBlock, 'id'>
  & { partners: Array<(
    { __typename: 'FrontPartnersBlockValue' }
    & Pick<Types.FrontPartnersBlockValue, 'link'>
    & { image: (
      { __typename: 'WagtailImageRendition' }
      & Pick<Types.WagtailImageRendition, 'id' | 'url'>
      & { original_image: (
        { __typename: 'WagtailImage' }
        & Pick<Types.WagtailImage, 'id'>
      ) }
    ), image_x2: (
      { __typename: 'WagtailImageRendition' }
      & Pick<Types.WagtailImageRendition, 'id' | 'url'>
      & { original_image: (
        { __typename: 'WagtailImage' }
        & Pick<Types.WagtailImage, 'id'>
      ) }
    ) }
  )> }
);

export const FrontPartnersBlockFragmentDoc = gql`
    fragment FrontPartnersBlock on FrontPartnersBlock {
  id
  partners: value {
    link
    image(spec: "width-160") {
      id
      url
      original_image {
        id
      }
    }
    image_x2: image(spec: "width-320") {
      id
      url
      original_image {
        id
      }
    }
  }
}
    `;