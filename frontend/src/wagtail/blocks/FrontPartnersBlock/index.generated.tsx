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
      & Pick<Types.WagtailImageRendition, 'url'>
    ), image_x2: (
      { __typename: 'WagtailImageRendition' }
      & Pick<Types.WagtailImageRendition, 'url'>
    ) }
  )> }
);

export const FrontPartnersBlockFragmentDoc = gql`
    fragment FrontPartnersBlock on FrontPartnersBlock {
  id
  partners: value {
    link
    image(spec: "width-160") {
      url
    }
    image_x2: image(spec: "width-320") {
      url
    }
  }
}
    `;