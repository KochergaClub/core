import * as Types from '../../../../apollo/types.generated';

import { GenericErrorFragment, ValidationErrorFragment } from '../../../../apollo/common-fragments.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../../../../apollo/common-fragments.generated';
export type RatioOrder_CreatedFragment = (
  { __typename: 'RatioOrder' }
  & Pick<Types.RatioOrder, 'id' | 'confirmation_token'>
);

export type RatioCreateOrderMutationVariables = Types.Exact<{
  input: Types.RatioCreateOrderInput;
}>;


export type RatioCreateOrderMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'RatioOrder' }
    & RatioOrder_CreatedFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);

export type RatioTicketType_ForPickerFragment = (
  { __typename: 'RatioTicketType' }
  & Pick<Types.RatioTicketType, 'id' | 'price' | 'name'>
);

export type RatioTicketTypesQueryVariables = Types.Exact<{
  input: Types.RatioTicketTypesInput;
}>;


export type RatioTicketTypesQuery = (
  { __typename: 'Query' }
  & { result: Array<(
    { __typename: 'RatioTicketType' }
    & RatioTicketType_ForPickerFragment
  )> }
);

export type CheckRatioPromocodeMutationVariables = Types.Exact<{
  input: Types.CheckRatioPromocodeInput;
}>;


export type CheckRatioPromocodeMutation = (
  { __typename: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename: 'CheckRatioPromocodeResult' }
    & Pick<Types.CheckRatioPromocodeResult, 'discounted_price'>
  )> }
);

export const RatioOrder_CreatedFragmentDoc: DocumentNode<RatioOrder_CreatedFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioOrder_Created"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"confirmation_token"}}]}}]};
export const RatioTicketType_ForPickerFragmentDoc: DocumentNode<RatioTicketType_ForPickerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioTicketType_ForPicker"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTicketType"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]};
export const RatioCreateOrderDocument: DocumentNode<RatioCreateOrderMutation, RatioCreateOrderMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RatioCreateOrder"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RatioCreateOrderInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"ratioCreateOrder"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioOrder_Created"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"GenericError"}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"ValidationError"}}]}}]}},...RatioOrder_CreatedFragmentDoc.definitions,...GenericErrorFragmentDoc.definitions,...ValidationErrorFragmentDoc.definitions]};
export const RatioTicketTypesDocument: DocumentNode<RatioTicketTypesQuery, RatioTicketTypesQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RatioTicketTypes"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTicketTypesInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"ratioTicketTypes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioTicketType_ForPicker"}}]}}]}},...RatioTicketType_ForPickerFragmentDoc.definitions]};
export const CheckRatioPromocodeDocument: DocumentNode<CheckRatioPromocodeMutation, CheckRatioPromocodeMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CheckRatioPromocode"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CheckRatioPromocodeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"checkRatioPromocode"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"discounted_price"}}]}}]}}]};