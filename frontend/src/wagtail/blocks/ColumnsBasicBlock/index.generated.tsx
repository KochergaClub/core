import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type ColumnsBasicBlockFragment = (
  { __typename: 'ColumnsBasicBlock' }
  & Pick<Types.ColumnsBasicBlock, 'id'>
  & { basic_columns: Array<(
    { __typename: 'ColumnsBasicBlockValue' }
    & Pick<Types.ColumnsBasicBlockValue, 'header' | 'text'>
  )> }
);

export const ColumnsBasicBlockFragmentDoc: DocumentNode<ColumnsBasicBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ColumnsBasicBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ColumnsBasicBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"basic_columns"},"name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]};