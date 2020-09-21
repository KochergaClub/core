import * as Types from '../../../apollo/types.generated';

import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type EventsTicketFragment = (
  { __typename: 'EventsTicket' }
  & Pick<Types.EventsTicket, 'id' | 'status'>
  & { user: (
    { __typename: 'AuthUser' }
    & Pick<Types.AuthUser, 'email'>
  ) }
);

export type GetEventTicketsQueryVariables = Types.Exact<{
  event_id: Types.Scalars['ID'];
}>;


export type GetEventTicketsQuery = (
  { __typename: 'Query' }
  & { event?: Types.Maybe<(
    { __typename: 'Event' }
    & Pick<Types.Event, 'id'>
    & { tickets: Array<(
      { __typename: 'EventsTicket' }
      & EventsTicketFragment
    )> }
  )> }
);

export const EventsTicketFragmentDoc: DocumentNode<EventsTicketFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EventsTicket"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"EventsTicket"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"status"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"user"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"},"arguments":[],"directives":[]}]}}]}}]};
export const GetEventTicketsDocument: DocumentNode<GetEventTicketsQuery, GetEventTicketsQueryVariables> = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetEventTickets"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"event"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"event_id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"event_id"}}}],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"tickets"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"EventsTicket"},"directives":[]}]}}]}}]}},...EventsTicketFragmentDoc.definitions]};