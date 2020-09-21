import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type BigContactsBlockFragment = (
  { __typename: 'BigContactsBlock' }
  & Pick<Types.BigContactsBlock, 'id'>
  & { contacts: (
    { __typename: 'BigContactsBlockValue' }
    & Pick<Types.BigContactsBlockValue, 'address' | 'phone' | 'email' | 'text'>
    & { map: (
      { __typename: 'WagtailGeo' }
      & Pick<Types.WagtailGeo, 'lat' | 'lng'>
    ) }
  ) }
);

export const BigContactsBlockFragmentDoc: DocumentNode<BigContactsBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BigContactsBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"BigContactsBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","alias":{"kind":"Name","value":"contacts"},"name":{"kind":"Name","value":"value"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"map"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"lat"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"lng"},"arguments":[],"directives":[]}]}},{"kind":"Field","name":{"kind":"Name","value":"address"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"phone"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"email"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"text"},"arguments":[],"directives":[]}]}}]}}]};