import * as Types from '../../../apollo/types.generated';

import { RatioTicketTypeFragment, RatioPromocodeConnectionFragment } from '../../queries.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { RatioTicketTypeFragmentDoc, RatioPromocodeConnectionFragmentDoc } from '../../queries.generated';
export type CreateRatioTicketTypeMutationVariables = Types.Exact<{
  input: Types.CreateRatioTicketTypeInput;
}>;


export type CreateRatioTicketTypeMutation = (
  { __typename: 'Mutation' }
  & { createRatioTicketType: (
    { __typename: 'RatioTicketType' }
    & RatioTicketTypeFragment
  ) }
);

export type UpdateRatioTicketTypeMutationVariables = Types.Exact<{
  input: Types.UpdateRatioTicketTypeInput;
}>;


export type UpdateRatioTicketTypeMutation = (
  { __typename: 'Mutation' }
  & { updateRatioTicketType: (
    { __typename: 'RatioTicketType' }
    & RatioTicketTypeFragment
  ) }
);

export type DeleteRatioTicketTypeMutationVariables = Types.Exact<{
  input: Types.DeleteRatioTicketTypeInput;
}>;


export type DeleteRatioTicketTypeMutation = (
  { __typename: 'Mutation' }
  & { deleteRatioTicketType: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type RatioTicketTypePromocodesPageQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  ticket_type_id: Types.Scalars['ID'];
}>;


export type RatioTicketTypePromocodesPageQuery = (
  { __typename: 'Query' }
  & { ratioTicketType: (
    { __typename: 'RatioTicketType' }
    & Pick<Types.RatioTicketType, 'id'>
    & { promocodes: (
      { __typename: 'RatioPromocodeConnection' }
      & RatioPromocodeConnectionFragment
    ) }
  ) }
);


export const CreateRatioTicketTypeDocument: DocumentNode<CreateRatioTicketTypeMutation, CreateRatioTicketTypeMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateRatioTicketType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateRatioTicketTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createRatioTicketType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioTicketType"}}]}}]}},...RatioTicketTypeFragmentDoc.definitions]};
export const UpdateRatioTicketTypeDocument: DocumentNode<UpdateRatioTicketTypeMutation, UpdateRatioTicketTypeMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateRatioTicketType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateRatioTicketTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateRatioTicketType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioTicketType"}}]}}]}},...RatioTicketTypeFragmentDoc.definitions]};
export const DeleteRatioTicketTypeDocument: DocumentNode<DeleteRatioTicketTypeMutation, DeleteRatioTicketTypeMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteRatioTicketType"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"DeleteRatioTicketTypeInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteRatioTicketType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}}]}}]}}]};
export const RatioTicketTypePromocodesPageDocument: DocumentNode<RatioTicketTypePromocodesPageQuery, RatioTicketTypePromocodesPageQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"RatioTicketTypePromocodesPage"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"before"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"last"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"ticket_type_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ratioTicketType"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"ticket_type_id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"promocodes"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"before"},"value":{"kind":"Variable","name":{"kind":"Name","value":"before"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"last"},"value":{"kind":"Variable","name":{"kind":"Name","value":"last"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioPromocodeConnection"}}]}}]}}]}},...RatioPromocodeConnectionFragmentDoc.definitions]};