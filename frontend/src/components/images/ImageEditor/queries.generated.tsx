import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type WagtailUploadImageFromUrlMutationVariables = Types.Exact<{
  input: Types.WagtailUploadImageFromUrlInput;
}>;


export type WagtailUploadImageFromUrlMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'WagtailUploadImageFromUrlResult' }
    & { image: (
      { __typename: 'WagtailImage' }
      & Pick<Types.WagtailImage, 'id'>
    ) }
  ) }
);

export type WagtailCollection_ForImageUploadFragment = (
  { __typename: 'WagtailCollection' }
  & Pick<Types.WagtailCollection, 'id' | 'name'>
);

export type WagtailCollectionsForImageUploadQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type WagtailCollectionsForImageUploadQuery = (
  { __typename: 'Query' }
  & { result: Array<(
    { __typename: 'WagtailCollection' }
    & WagtailCollection_ForImageUploadFragment
  )> }
);

export const WagtailCollection_ForImageUploadFragmentDoc: DocumentNode<WagtailCollection_ForImageUploadFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"WagtailCollection_ForImageUpload"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailCollection"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]};
export const WagtailUploadImageFromUrlDocument: DocumentNode<WagtailUploadImageFromUrlMutation, WagtailUploadImageFromUrlMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"WagtailUploadImageFromUrl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WagtailUploadImageFromUrlInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"wagtailUploadImageFromUrl"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]};
export const WagtailCollectionsForImageUploadDocument: DocumentNode<WagtailCollectionsForImageUploadQuery, WagtailCollectionsForImageUploadQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"WagtailCollectionsForImageUpload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"wagtailCollectionsForImageUpload"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"WagtailCollection_ForImageUpload"}}]}}]}},...WagtailCollection_ForImageUploadFragmentDoc.definitions]};