import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type RatioConfirmOrderMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type RatioConfirmOrderMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'RatioConfirmOrderResult' }
    & Pick<Types.RatioConfirmOrderResult, 'outcome'>
  ) }
);


export const RatioConfirmOrderDocument: DocumentNode<RatioConfirmOrderMutation, RatioConfirmOrderMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RatioConfirmOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"ratioConfirmOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"order_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"outcome"}}]}}]}}]};