import * as Types from '../../../apollo/types.generated';

import { RatioTicketFragment } from '../../queries.generated';
import { PageInfoFragment } from '../../../apollo/queries.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { RatioTicketFragmentDoc } from '../../queries.generated';
import { PageInfoFragmentDoc } from '../../../apollo/queries.generated';
export type RatioTicketWithTrainingFragment = (
  { __typename: 'RatioTicket' }
  & { training: (
    { __typename: 'RatioTraining' }
    & Pick<Types.RatioTraining, 'id' | 'slug' | 'name'>
  ) }
  & RatioTicketFragment
);

export type RatioTicketsQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  filter?: Types.Maybe<Types.RatioTicketsFilterInput>;
}>;


export type RatioTicketsQuery = (
  { __typename: 'Query' }
  & { tickets: (
    { __typename: 'RatioTicketConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<(
      { __typename: 'RatioTicketEdge' }
      & { node: (
        { __typename: 'RatioTicket' }
        & RatioTicketWithTrainingFragment
      ) }
    )> }
  ) }
);

export type RatioTicketByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type RatioTicketByIdQuery = (
  { __typename: 'Query' }
  & { ticket: (
    { __typename: 'RatioTicket' }
    & RatioTicketWithTrainingFragment
  ) }
);

export type SetRatioTicketNotionLinkMutationVariables = Types.Exact<{
  input: Types.SetRatioTicketNotionLinkInput;
}>;


export type SetRatioTicketNotionLinkMutation = (
  { __typename: 'Mutation' }
  & { setRatioTicketNotionLink: (
    { __typename: 'RatioTicket' }
    & RatioTicketFragment
  ) }
);

export const RatioTicketWithTrainingFragmentDoc: DocumentNode<RatioTicketWithTrainingFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioTicketWithTraining"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTicket"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioTicket"},"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"training"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"slug"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]}]}}]}},...RatioTicketFragmentDoc.definitions]};
export const RatioTicketsDocument: DocumentNode<RatioTicketsQuery, RatioTicketsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTickets" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "filter" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioTicketsFilterInput" } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "tickets" }, "name": { "kind": "Name", "value": "ratioTickets" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "filter" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "filter" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "PageInfo" }, "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicketWithTraining" }, "directives": [] }] } }] } }] } }] } }, ...PageInfoFragmentDoc.definitions, ...RatioTicketWithTrainingFragmentDoc.definitions] });

export const RatioTicketByIdDocument: DocumentNode<RatioTicketByIdQuery, RatioTicketByIdQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTicketById" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "ticket" }, "name": { "kind": "Name", "value": "ratioTicket" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicketWithTraining" }, "directives": [] }] } }] } }, ...RatioTicketWithTrainingFragmentDoc.definitions] });

export const SetRatioTicketNotionLinkDocument: DocumentNode<SetRatioTicketNotionLinkMutation, SetRatioTicketNotionLinkMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "SetRatioTicketNotionLink" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "SetRatioTicketNotionLinkInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "setRatioTicketNotionLink" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicket" }, "directives": [] }] } }] } }, ...RatioTicketFragmentDoc.definitions] });
