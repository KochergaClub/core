import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type WagtailImageRendition_ForEditorFragment = (
  { __typename: 'WagtailImageRendition' }
  & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  & { original_image: (
    { __typename: 'WagtailImage' }
    & Pick<Types.WagtailImage, 'id' | 'url'>
  ) }
);

export const WagtailImageRendition_ForEditorFragmentDoc = gql`
    fragment WagtailImageRendition_ForEditor on WagtailImageRendition {
  id
  url
  original_image {
    id
    url
  }
}
    `;