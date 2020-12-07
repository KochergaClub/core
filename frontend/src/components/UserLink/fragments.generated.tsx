import * as Types from '../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type UserFragment = (
  { __typename: 'AuthUser' }
  & Pick<Types.AuthUser, 'id' | 'first_name' | 'last_name'>
);

export const UserFragmentDoc: DocumentNode<UserFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"User"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"AuthUser"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"first_name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"last_name"},"arguments":[],"directives":[]}]}}]};