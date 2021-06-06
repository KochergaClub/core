import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type LandingHeroBlockFragment = (
  { __typename: 'LandingHeroBlock' }
  & Pick<Types.LandingHeroBlock, 'id'>
  & { landing_hero: (
    { __typename: 'LandingHeroBlockValue' }
    & Pick<Types.LandingHeroBlockValue, 'title' | 'text'>
    & { image: (
      { __typename: 'WagtailImageRendition' }
      & Pick<Types.WagtailImageRendition, 'id' | 'url'>
      & { original_image: (
        { __typename: 'WagtailImage' }
        & Pick<Types.WagtailImage, 'id'>
      ) }
    ) }
  ) }
);

export const LandingHeroBlockFragmentDoc: DocumentNode<LandingHeroBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LandingHeroBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LandingHeroBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"landing_hero"},"name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"image"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"spec"},"value":{"kind":"StringValue","value":"fill-1200x400","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"url"}},{"kind":"Field","name":{"kind":"Name","value":"original_image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}}]};