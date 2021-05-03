import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type HrBlockFragment = (
  { __typename: 'HrBlock' }
  & Pick<Types.HrBlock, 'id'>
);

export const HrBlockFragmentDoc: DocumentNode<HrBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"HrBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"HrBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]};