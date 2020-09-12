import * as Types from '../../../apollo/types.generated';

import gql from 'graphql-tag';

export type WagtailImage_ForEditorFragment = (
  { __typename: 'WagtailImage' }
  & Pick<Types.WagtailImage, 'id' | 'url'>
  & { rendition: (
    { __typename: 'WagtailImageRendition' }
    & Pick<Types.WagtailImageRendition, 'id' | 'url'>
  ) }
);

export const WagtailImage_ForEditorFragmentDoc = gql`
    fragment WagtailImage_ForEditor on WagtailImage {
  id
  url
  rendition(spec: "width-240") {
    id
    url
  }
}
    `;