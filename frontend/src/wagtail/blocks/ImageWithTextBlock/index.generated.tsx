import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ImageWithTextBlockFragment = (
  { __typename: 'ImageWithTextBlock' }
  & Pick<Types.ImageWithTextBlock, 'id'>
  & { image_with_text: (
    { __typename: 'ImageWithTextBlockValue' }
    & Pick<Types.ImageWithTextBlockValue, 'text'>
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
    ) }
  ) }
);

export const ImageWithTextBlockFragmentDoc: DocumentNode<ImageWithTextBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ImageWithTextBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ImageWithTextBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"image_with_text"},"name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"width-512","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"original_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","alias":{"kind":"Name","value":"image_x2"},"name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"width-1024","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]}}]}}]};