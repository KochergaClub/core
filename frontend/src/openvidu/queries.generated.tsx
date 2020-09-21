import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type OpenviduGenerateRoomTokenMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type OpenviduGenerateRoomTokenMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'OpenviduGenerateRoomTokenResult' }
    & Pick<Types.OpenviduGenerateRoomTokenResult, 'token'>
  ) }
);


export const OpenviduGenerateRoomTokenDocument: DocumentNode<OpenviduGenerateRoomTokenMutation, OpenviduGenerateRoomTokenMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "OpenviduGenerateRoomToken" }, "variableDefinitions": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "openviduGenerateRoomToken" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "token" }, "arguments": [], "directives": [] }] } }] } }] });
