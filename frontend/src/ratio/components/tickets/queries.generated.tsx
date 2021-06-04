import * as Types from '../../../apollo/types.generated';

import { RatioTicketFragment } from '../../queries.generated';
import { PageInfoFragment, GenericErrorFragment, ValidationErrorFragment } from '../../../apollo/common-fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { RatioTicketFragmentDoc } from '../../queries.generated';
import { PageInfoFragmentDoc, GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../../../apollo/common-fragments.generated';
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

export type ReplaceRatioTicketNotionLinkMutationVariables = Types.Exact<{
  input: Types.ReplaceRatioTicketNotionLinkInput;
}>;


export type ReplaceRatioTicketNotionLinkMutation = (
  { __typename: 'Mutation' }
  & { replaceRatioTicketNotionLink: (
    { __typename: 'RatioTicket' }
    & RatioTicketFragment
  ) }
);

export const RatioTicketWithTrainingFragmentDoc: DocumentNode<RatioTicketWithTrainingFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"RatioTicketWithTraining"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"RatioTicket"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"RatioTicket"}},{"kind":"Field","name":{"kind":"Name","value":"training"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"slug"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},...RatioTicketFragmentDoc.definitions]};
export const RatioTicketsDocument: DocumentNode<RatioTicketsQuery, RatioTicketsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTickets" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "filter" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RatioTicketsFilterInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "tickets" }, "name": { "kind": "Name", "value": "ratioTickets" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "filter" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "filter" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "PageInfo" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicketWithTraining" } }] } }] } }] } }] } }, ...PageInfoFragmentDoc.definitions, ...RatioTicketWithTrainingFragmentDoc.definitions] });

export const RatioTicketByIdDocument: DocumentNode<RatioTicketByIdQuery, RatioTicketByIdQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTicketById" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "ticket" }, "name": { "kind": "Name", "value": "ratioTicket" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicketWithTraining" } }] } }] } }, ...RatioTicketWithTrainingFragmentDoc.definitions] });

export const SetRatioTicketNotionLinkDocument: DocumentNode<SetRatioTicketNotionLinkMutation, SetRatioTicketNotionLinkMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "SetRatioTicketNotionLink" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "SetRatioTicketNotionLinkInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "setRatioTicketNotionLink" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicket" } }] } }] } }, ...RatioTicketFragmentDoc.definitions] });

export const ReplaceRatioTicketNotionLinkDocument: DocumentNode<ReplaceRatioTicketNotionLinkMutation, ReplaceRatioTicketNotionLinkMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "ReplaceRatioTicketNotionLink" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ReplaceRatioTicketNotionLinkInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "replaceRatioTicketNotionLink" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTicket" } }] } }] } }, ...RatioTicketFragmentDoc.definitions] });
