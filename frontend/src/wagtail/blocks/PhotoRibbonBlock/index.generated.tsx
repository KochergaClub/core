import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type PhotoRibbonBlockFragment = (
  { __typename: 'PhotoRibbonBlock' }
  & Pick<Types.PhotoRibbonBlock, 'id'>
  & { photos: Array<(
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  )> }
);

export const PhotoRibbonBlockFragmentDoc = gql`
    fragment PhotoRibbonBlock on PhotoRibbonBlock {
  id
  photos: value(spec: "min-400x320") {
    id
    url
  }
}
    `;