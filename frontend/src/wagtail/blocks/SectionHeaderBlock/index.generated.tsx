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

export const SectionHeaderBlockFragmentDoc: DocumentNode<SectionHeaderBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"SectionHeaderBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"SectionHeaderBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"section_header_value"},"name":{"kind":"Name","value":"value"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"header"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"text"},"arguments":[],"directives":[]}]}}]}}]};