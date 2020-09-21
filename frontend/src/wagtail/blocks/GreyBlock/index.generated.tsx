import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type GreyBlockFragment = (
  { __typename: 'GreyBlock' }
  & Pick<Types.GreyBlock, 'id'>
  & { grey_value: (
    { __typename: 'GreyBlockValue' }
    & Pick<Types.GreyBlockValue, 'header' | 'text'>
  ) }
);

export const GreyBlockFragmentDoc: DocumentNode<GreyBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GreyBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GreyBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"grey_value"},"name":{"kind":"Name","value":"value"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"header"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"text"},"arguments":[],"directives":[]}]}}]}}]};