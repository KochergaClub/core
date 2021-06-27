import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type AnchorBlockFragment = (
  { __typename: 'AnchorBlock' }
  & Pick<Types.AnchorBlock, 'id'>
  & { anchor: Types.AnchorBlock['value'] }
);

export const AnchorBlockFragmentDoc: DocumentNode<AnchorBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"AnchorBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AnchorBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"anchor"},"name":{"kind":"Name","value":"value"}}]}}]};