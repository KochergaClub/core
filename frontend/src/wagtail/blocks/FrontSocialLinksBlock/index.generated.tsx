import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type FrontSocialLinksBlockFragment = (
  { __typename: 'FrontSocialLinksBlock' }
  & Pick<Types.FrontSocialLinksBlock, 'id'>
);

export const FrontSocialLinksBlockFragmentDoc: DocumentNode<FrontSocialLinksBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"FrontSocialLinksBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"FrontSocialLinksBlock"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]}]}}]};