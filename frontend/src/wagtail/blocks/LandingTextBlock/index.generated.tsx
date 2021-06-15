import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type LandingTextBlockFragment = (
  { __typename: 'LandingTextBlock' }
  & Pick<Types.LandingTextBlock, 'id'>
  & { landing_text: (
    { __typename: 'LandingTextBlockValue' }
    & Pick<Types.LandingTextBlockValue, 'text' | 'centered' | 'large' | 'gray'>
  ) }
);

export const LandingTextBlockFragmentDoc: DocumentNode<LandingTextBlockFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LandingTextBlock"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"LandingTextBlock"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","alias":{"kind":"Name","value":"landing_text"},"name":{"kind":"Name","value":"value"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"centered"}},{"kind":"Field","name":{"kind":"Name","value":"large"}},{"kind":"Field","name":{"kind":"Name","value":"gray"}}]}}]}}]};