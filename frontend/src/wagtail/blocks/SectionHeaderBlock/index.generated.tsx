import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type SectionHeaderBlockFragment = (
  { __typename: 'SectionHeaderBlock' }
  & Pick<Types.SectionHeaderBlock, 'id'>
  & { section_header_value: (
    { __typename: 'SectionHeaderBlockValue' }
    & Pick<Types.SectionHeaderBlockValue, 'header' | 'text'>
  ) }
);

export const SectionHeaderBlockFragmentDoc: DocumentNode<SectionHeaderBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionHeaderBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionHeaderBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"section_header_value"},"name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"header"}},{"kind":"Field","name":{"kind":"Name","value":"text"}}]}}]}}]};