import * as Types from '../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type KkmRegisterCheckMutationVariables = Types.Exact<{
  params: Types.KkmRegisterCheckInput;
}>;


export type KkmRegisterCheckMutation = (
  { __typename: 'Mutation' }
  & { kkmRegisterCheck: (
    { __typename: 'KkmRegisterCheckResult' }
    & Pick<Types.KkmRegisterCheckResult, 'url' | 'error' | 'status'>
  ) }
);


export const KkmRegisterCheckDocument: DocumentNode<KkmRegisterCheckMutation, KkmRegisterCheckMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"KkmRegisterCheck"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"params"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"KkmRegisterCheckInput"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"kkmRegisterCheck"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"params"},"value":{"kind":"Variable","name":{"kind":"Name","value":"params"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"url"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"error"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"status"},"arguments":[],"directives":[]}]}}]}}]};