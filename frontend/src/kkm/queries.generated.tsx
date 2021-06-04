import * as Types from '../apollo/types.generated';

import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type KkmRegisterCheckMutationVariables = Types.Exact<{
  params: Types.KkmRegisterCheckInput;
}>;


export type KkmRegisterCheckMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'KkmRegisterCheckOkResult' }
    & Pick<Types.KkmRegisterCheckOkResult, 'url'>
  ) | (
    { __typename: 'GenericError' }
    & Pick<Types.GenericError, 'message'>
  ) }
);


export const KkmRegisterCheckDocument: DocumentNode<KkmRegisterCheckMutation, KkmRegisterCheckMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "KkmRegisterCheck" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "KkmRegisterCheckInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "kkmRegisterCheck" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "params" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "KkmRegisterCheckOkResult" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "url" } }] } }, { "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "GenericError" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "message" } }] } }] } }] } }] });
