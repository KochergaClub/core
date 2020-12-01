import * as Types from '../../apollo/types.generated';

import { GenericErrorFragment, ValidationErrorFragment } from '../../apollo/common-fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../../apollo/common-fragments.generated';
export type EvenmanLeadFragment = (
  { __typename: 'CommunityLead' }
  & Pick<Types.CommunityLead, 'id' | 'created' | 'updated' | 'name' | 'description'>
  & { created_by?: Types.Maybe<(
    { __typename: 'AuthUser' }
    & Pick<Types.AuthUser, 'id' | 'first_name' | 'last_name'>
  )> }
);

export type EvenmanLeadsQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
}>;


export type EvenmanLeadsQuery = (
  { __typename: 'Query' }
  & { communityLeads: (
    { __typename: 'CommunityLeadConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ), edges: Array<(
      { __typename: 'CommunityLeadEdge' }
      & { node: (
        { __typename: 'CommunityLead' }
        & EvenmanLeadFragment
      ) }
    )> }
  ) }
);

export type CreateEvenmanLeadMutationVariables = Types.Exact<{
  input: Types.CreateCommunityLeadInput;
}>;


export type CreateEvenmanLeadMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'CommunityLead' }
    & EvenmanLeadFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);

export type UpdateEvenmanLeadMutationVariables = Types.Exact<{
  input: Types.UpdateCommunityLeadInput;
}>;


export type UpdateEvenmanLeadMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'CommunityLead' }
    & EvenmanLeadFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);

export type DeleteEvenmanLeadMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteEvenmanLeadMutation = (
  { __typename: 'Mutation' }
  & { deleteCommunityLead: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export const EvenmanLeadFragmentDoc: DocumentNode<EvenmanLeadFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvenmanLead"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommunityLead"}},"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"created"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"updated"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"description"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"created_by"},"arguments":[],"directives":[],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"first_name"},"arguments":[],"directives":[]},{"kind":"Field","name":{"kind":"Name","value":"last_name"},"arguments":[],"directives":[]}]}}]}}]};
export const EvenmanLeadsDocument: DocumentNode<EvenmanLeadsQuery, EvenmanLeadsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanLeads" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "communityLeads" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "hasNextPage" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "hasPreviousPage" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "startCursor" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "endCursor" }, "arguments": [], "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanLead" }, "directives": [] }] } }] } }] } }] } }, ...EvenmanLeadFragmentDoc.definitions] });

export const CreateEvenmanLeadDocument: DocumentNode<CreateEvenmanLeadMutation, CreateEvenmanLeadMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateEvenmanLead" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateCommunityLeadInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "createCommunityLead" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanLead" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" }, "directives": [] }] } }] } }, ...EvenmanLeadFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions] });

export const UpdateEvenmanLeadDocument: DocumentNode<UpdateEvenmanLeadMutation, UpdateEvenmanLeadMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateEvenmanLead" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UpdateCommunityLeadInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "updateCommunityLead" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanLead" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" }, "directives": [] }] } }] } }, ...EvenmanLeadFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions] });

export const DeleteEvenmanLeadDocument: DocumentNode<DeleteEvenmanLeadMutation, DeleteEvenmanLeadMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteEvenmanLead" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deleteCommunityLead" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "BasicResult" } }, "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] } }] });
