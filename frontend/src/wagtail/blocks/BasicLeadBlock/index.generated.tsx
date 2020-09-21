import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BasicLeadBlockFragment = (
  { __typename: 'BasicLeadBlock' }
  & Pick<Types.BasicLeadBlock, 'id' | 'value'>
);

export const BasicLeadBlockFragmentDoc: DocumentNode<BasicLeadBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BasicLeadBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BasicLeadBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"value"},"arguments":[],"directives":[]}]}}]};