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

export const HeroFrontBlockFragmentDoc: DocumentNode<HeroFrontBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HeroFrontBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HeroFrontBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"hero"},"name":{"kind":"Name","value":"value"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"buttons"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"title"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"highlight"},"arguments":[],"directives":[]}]}}]}}]}}]};