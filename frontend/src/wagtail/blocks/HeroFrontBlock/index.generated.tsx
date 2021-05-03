import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type HeroFrontBlockFragment = (
  { __typename: 'HeroFrontBlock' }
  & Pick<Types.HeroFrontBlock, 'id'>
  & { hero: (
    { __typename: 'HeroFrontBlockValue' }
    & Pick<Types.HeroFrontBlockValue, 'title'>
    & { buttons: Array<(
      { __typename: 'HeroFrontBlock_buttonsValue' }
      & Pick<Types.HeroFrontBlock_ButtonsValue, 'title' | 'link' | 'highlight'>
    )> }
  ) }
);

export const HeroFrontBlockFragmentDoc: DocumentNode<HeroFrontBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeroFrontBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HeroFrontBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"hero"},"name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"buttons"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"highlight"}}]}}]}}]}}]};