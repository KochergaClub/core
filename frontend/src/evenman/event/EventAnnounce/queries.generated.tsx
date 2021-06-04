import * as Types from '../../../apollo/types.generated';

import { EvenmanEvent_DetailsFragment } from '../queries.generated';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { EvenmanEvent_DetailsFragmentDoc } from '../queries.generated';
export type EvenmanTimepadAnnouncementUpdateMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
  category_code?: Types.Maybe<Types.Scalars['String']>;
  prepaid_tickets?: Types.Maybe<Types.Scalars['Boolean']>;
}>;


export type EvenmanTimepadAnnouncementUpdateMutation = (
  { __typename: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & EvenmanEvent_DetailsFragment
    ) }
  )> }
);

export type EvenmanVkAnnouncementUpdateMutationVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
  group?: Types.Maybe<Types.Scalars['String']>;
}>;


export type EvenmanVkAnnouncementUpdateMutation = (
  { __typename: 'Mutation' }
  & { result?: Types.Maybe<(
    { __typename: 'EventUpdateResult' }
    & Pick<Types.EventUpdateResult, 'ok'>
    & { event: (
      { __typename: 'Event' }
      & EvenmanEvent_DetailsFragment
    ) }
  )> }
);


export const EvenmanTimepadAnnouncementUpdateDocument: DocumentNode<EvenmanTimepadAnnouncementUpdateMutation, EvenmanTimepadAnnouncementUpdateMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanTimepadAnnouncementUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"category_code"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"prepaid_tickets"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Boolean"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventTimepadAnnouncementUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"category_code"},"value":{"kind":"Variable","name":{"kind":"Name","value":"category_code"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"prepaid_tickets"},"value":{"kind":"Variable","name":{"kind":"Name","value":"prepaid_tickets"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanEvent_Details"}}]}}]}}]}},...EvenmanEvent_DetailsFragmentDoc.definitions]};
export const EvenmanVkAnnouncementUpdateDocument: DocumentNode<EvenmanVkAnnouncementUpdateMutation, EvenmanVkAnnouncementUpdateMutationVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"EvenmanVkAnnouncementUpdate"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"group"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"result"},"name":{"kind":"Name","value":"eventVkAnnouncementUpdate"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"group"},"value":{"kind":"Variable","name":{"kind":"Name","value":"group"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ok"}},{"kind":"Field","name":{"kind":"Name","value":"event"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EvenmanEvent_Details"}}]}}]}}]}},...EvenmanEvent_DetailsFragmentDoc.definitions]};