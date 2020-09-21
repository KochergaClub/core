import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BasicTextBlockFragment = (
  { __typename: 'BasicTextBlock' }
  & Pick<Types.BasicTextBlock, 'id'>
  & { basic_text: (
    { __typename: 'BasicTextBlockValue' }
    & Pick<Types.BasicTextBlockValue, 'text' | 'centered'>
  ) }
);

export const BasicTextBlockFragmentDoc: DocumentNode<BasicTextBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicTextBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicTextBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"basic_text"},"name":{"kind":"Name","value":"value"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"centered"},"arguments":[],"directives":[]}]}}]}}]};