import * as Types from '../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type OpenviduGenerateRoomTokenMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type OpenviduGenerateRoomTokenMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'OpenviduGenerateRoomTokenResult' }
    & Pick<Types.OpenviduGenerateRoomTokenResult, 'token'>
  ) }
);


export const OpenviduGenerateRoomTokenDocument: DocumentNode<OpenviduGenerateRoomTokenMutation, OpenviduGenerateRoomTokenMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"OpenviduGenerateRoomToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"openviduGenerateRoomToken"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]};