import * as Types from './types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type PageInfoFragment = (
  { __typename: 'PageInfo' }
  & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
);

export type GenericErrorFragment = (
  { __typename: 'GenericError' }
  & Pick<Types.GenericError, 'message'>
);

export type ValidationErrorFragment = (
  { __typename: 'ValidationError' }
  & { errors: Array<(
    { __typename: 'ValidationErrorItem' }
    & Pick<Types.ValidationErrorItem, 'name' | 'messages'>
  )> }
);

export const PageInfoFragmentDoc: DocumentNode<PageInfoFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PageInfo"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"PageInfo"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}}]};
export const GenericErrorFragmentDoc: DocumentNode<GenericErrorFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"GenericError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"GenericError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"message"}}]}}]};
export const ValidationErrorFragmentDoc: DocumentNode<ValidationErrorFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"ValidationError"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"ValidationError"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"errors"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"messages"}}]}}]}}]};