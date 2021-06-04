import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type SpecialOfferQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type SpecialOfferQuery = (
  { __typename: 'Query' }
  & { specialOffer?: Types.Maybe<(
    { __typename: 'SpecialOffer' }
    & Pick<Types.SpecialOffer, 'text' | 'link' | 'button_text' | 'until' | 'hide_duration'>
  )> }
);


export const SpecialOfferDocument: DocumentNode<SpecialOfferQuery, SpecialOfferQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SpecialOffer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"specialOffer"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"link"}},{"kind":"Field","name":{"kind":"Name","value":"button_text"}},{"kind":"Field","name":{"kind":"Name","value":"until"}},{"kind":"Field","name":{"kind":"Name","value":"hide_duration"}}]}}]}}]};