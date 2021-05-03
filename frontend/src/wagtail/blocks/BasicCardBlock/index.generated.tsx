import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BasicCardBlockFragment = (
  { __typename: 'BasicCardBlock' }
  & Pick<Types.BasicCardBlock, 'id' | 'value'>
);

export const BasicCardBlockFragmentDoc: DocumentNode<BasicCardBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicCardBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicCardBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]};