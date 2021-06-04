import * as Types from '../../../apollo/types.generated';

import { PageInfoFragment, GenericErrorFragment, ValidationErrorFragment } from '../../../apollo/common-fragments.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { PageInfoFragmentDoc, GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../../../apollo/common-fragments.generated';
export type PaymentForOrderFragment = (
  { __typename: 'YandexKassaPayment' }
  & Pick<Types.YandexKassaPayment, 'id' | 'status'>
);

export type RatioOrderFragment = (
  { __typename: 'RatioOrder' }
  & Pick<Types.RatioOrder, 'id' | 'created' | 'fulfilled' | 'email' | 'first_name' | 'last_name' | 'city' | 'price'>
  & { ticket_type: (
    { __typename: 'RatioTicketType' }
    & Pick<Types.RatioTicketType, 'id' | 'price' | 'name'>
    & { training: (
      { __typename: 'RatioTraining' }
      & Pick<Types.RatioTraining, 'id' | 'slug' | 'name'>
    ) }
  ), promocode?: Types.Maybe<(
    { __typename: 'RatioPromocode' }
    & Pick<Types.RatioPromocode, 'id' | 'code' | 'discount'>
  )>, payment: (
    { __typename: 'YandexKassaPayment' }
    & PaymentForOrderFragment
  ) }
);

export type RatioOrdersQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type RatioOrdersQuery = (
  { __typename: 'Query' }
  & { orders: (
    { __typename: 'RatioOrderConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<(
      { __typename: 'RatioOrderEdge' }
      & { node: (
        { __typename: 'RatioOrder' }
        & RatioOrderFragment
      ) }
    )> }
  ) }
);

export type UpdateYandexKassaPaymentMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type UpdateYandexKassaPaymentMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'YandexKassaPayment' }
    & PaymentForOrderFragment
  ) | { __typename: 'GenericError' } }
);

export type CancelYandexKassaPaymentMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type CancelYandexKassaPaymentMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'YandexKassaPayment' }
    & PaymentForOrderFragment
  ) | { __typename: 'GenericError' } }
);

export const PaymentForOrderFragmentDoc: DocumentNode<PaymentForOrderFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"PaymentForOrder"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"YandexKassaPayment"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]};
export const RatioOrderFragmentDoc: DocumentNode<RatioOrderFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioOrder"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioOrder"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"fulfilled"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"first_name"}},{"kind":"Field","name":{"kind":"Name","value":"last_name"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"ticket_type"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"training"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"promocode"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"discount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"payment"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PaymentForOrder"}}]}}]}},...PaymentForOrderFragmentDoc.definitions]};
export const RatioOrdersDocument: DocumentNode<RatioOrdersQuery, RatioOrdersQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RatioOrders"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"orders"},"name":{"kind":"Name","value":"ratioOrders"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PageInfo"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioOrder"}}]}}]}}]}}]}},...PageInfoFragmentDoc.definitions,...RatioOrderFragmentDoc.definitions]};
export const UpdateYandexKassaPaymentDocument: DocumentNode<UpdateYandexKassaPaymentMutation, UpdateYandexKassaPaymentMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateYandexKassaPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"updateYandexKassaPayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PaymentForOrder"}}]}}]}},...PaymentForOrderFragmentDoc.definitions]};
export const CancelYandexKassaPaymentDocument: DocumentNode<CancelYandexKassaPaymentMutation, CancelYandexKassaPaymentMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CancelYandexKassaPayment"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"cancelYandexKassaPayment"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"PaymentForOrder"}}]}}]}},...PaymentForOrderFragmentDoc.definitions]};