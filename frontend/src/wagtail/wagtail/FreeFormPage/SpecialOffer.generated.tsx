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


export const SpecialOfferDocument: DocumentNode<SpecialOfferQuery, SpecialOfferQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SpecialOffer"},"variableDefinitions":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"specialOffer"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"text"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"link"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"button_text"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"until"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"hide_duration"},"arguments":[],"directives":[]}]}}]}}]};