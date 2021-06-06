import * as Types from '../../apollo/types.generated';

import { Commentable_CommunityLead_Fragment, Commentable_CommunityInitiative_Fragment } from '../lead/CommentsList/queries.generated';
import { GenericErrorFragment, ValidationErrorFragment } from '../../apollo/common-fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { CommentableFragmentDoc } from '../lead/CommentsList/queries.generated';
import { GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../../apollo/common-fragments.generated';
export type EvenmanInitiativeFragment = (
  { __typename: 'CommunityInitiative' }
  & Pick<Types.CommunityInitiative, 'id' | 'created' | 'updated' | 'status' | 'title' | 'description'>
  & { leads: Array<(
    { __typename: 'CommunityLead' }
    & Pick<Types.CommunityLead, 'id' | 'name'>
  )> }
  & Commentable_CommunityInitiative_Fragment
);

export type LeadForPickerFragment = (
  { __typename: 'CommunityLead' }
  & Pick<Types.CommunityLead, 'id' | 'name'>
);

export type SearchLeadsForPickerQueryVariables = Types.Exact<{
  query: Types.Scalars['String'];
}>;


export type SearchLeadsForPickerQuery = (
  { __typename: 'Query' }
  & { communityLeads: (
    { __typename: 'CommunityLeadConnection' }
    & { edges: Array<(
      { __typename: 'CommunityLeadEdge' }
      & { node: (
        { __typename: 'CommunityLead' }
        & LeadForPickerFragment
      ) }
    )> }
  ) }
);

export type EvenmanInitiativesQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  filter?: Types.Maybe<Types.CommunityInitiativesFilterInput>;
}>;


export type EvenmanInitiativesQuery = (
  { __typename: 'Query' }
  & { communityInitiatives: (
    { __typename: 'CommunityInitiativeConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & Pick<Types.PageInfo, 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | 'endCursor'>
    ), edges: Array<(
      { __typename: 'CommunityInitiativeEdge' }
      & { node: (
        { __typename: 'CommunityInitiative' }
        & EvenmanInitiativeFragment
      ) }
    )> }
  ) }
);

export type EvenmanInitiativeDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type EvenmanInitiativeDetailsQuery = (
  { __typename: 'Query' }
  & { result: (
    { __typename: 'CommunityInitiative' }
    & EvenmanInitiativeFragment
  ) }
);

export type CreateEvenmanInitiativeMutationVariables = Types.Exact<{
  input: Types.CreateCommunityInitiativeInput;
}>;


export type CreateEvenmanInitiativeMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'CommunityInitiative' }
    & EvenmanInitiativeFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);

export type UpdateEvenmanInitiativeMutationVariables = Types.Exact<{
  input: Types.UpdateCommunityInitiativeInput;
}>;


export type UpdateEvenmanInitiativeMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'CommunityInitiative' }
    & EvenmanInitiativeFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);

export type DeleteEvenmanInitiativeMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type DeleteEvenmanInitiativeMutation = (
  { __typename: 'Mutation' }
  & { deleteCommunityInitiative: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type AddLeadToCommunityInitiativeMutationVariables = Types.Exact<{
  input: Types.AddLeadToCommunityInitiativeInput;
}>;


export type AddLeadToCommunityInitiativeMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'CommunityInitiative' }
    & EvenmanInitiativeFragment
  ) | { __typename: 'GenericError' } | { __typename: 'ValidationError' } }
);

export type RemoveLeadFromCommunityInitiativeMutationVariables = Types.Exact<{
  input: Types.RemoveLeadFromCommunityInitiativeInput;
}>;


export type RemoveLeadFromCommunityInitiativeMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'CommunityInitiative' }
    & EvenmanInitiativeFragment
  ) | { __typename: 'GenericError' } | { __typename: 'ValidationError' } }
);

export type CommentOnCommunityInitiativeMutationVariables = Types.Exact<{
  input: Types.CommentOnCommunityInitiativeInput;
}>;


export type CommentOnCommunityInitiativeMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'CommunityInitiative' }
    & EvenmanInitiativeFragment
  ) }
);

export const EvenmanInitiativeFragmentDoc: DocumentNode<EvenmanInitiativeFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvenmanInitiative"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommunityInitiative"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"leads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Commentable"}}]}},...CommentableFragmentDoc.definitions]};
export const LeadForPickerFragmentDoc: DocumentNode<LeadForPickerFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"LeadForPicker"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommunityLead"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]};
export const SearchLeadsForPickerDocument: DocumentNode<SearchLeadsForPickerQuery, SearchLeadsForPickerQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "SearchLeadsForPicker" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "query" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "communityLeads" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "IntValue", "value": "20" } }, { "kind": "Argument", "name": { "kind": "Name", "value": "filter" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "search" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "query" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "LeadForPicker" } }] } }] } }] } }] } }, ...LeadForPickerFragmentDoc.definitions] });

export const EvenmanInitiativesDocument: DocumentNode<EvenmanInitiativesQuery, EvenmanInitiativesQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanInitiatives" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "filter" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CommunityInitiativesFilterInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "communityInitiatives" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "filter" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "filter" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "hasNextPage" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hasPreviousPage" } }, { "kind": "Field", "name": { "kind": "Name", "value": "startCursor" } }, { "kind": "Field", "name": { "kind": "Name", "value": "endCursor" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanInitiative" } }] } }] } }] } }] } }, ...EvenmanInitiativeFragmentDoc.definitions] });

export const EvenmanInitiativeDetailsDocument: DocumentNode<EvenmanInitiativeDetailsQuery, EvenmanInitiativeDetailsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanInitiativeDetails" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "communityInitiative" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanInitiative" } }] } }] } }, ...EvenmanInitiativeFragmentDoc.definitions] });

export const CreateEvenmanInitiativeDocument: DocumentNode<CreateEvenmanInitiativeMutation, CreateEvenmanInitiativeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateEvenmanInitiative" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateCommunityInitiativeInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "createCommunityInitiative" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanInitiative" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" } }] } }] } }, ...EvenmanInitiativeFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions] });

export const UpdateEvenmanInitiativeDocument: DocumentNode<UpdateEvenmanInitiativeMutation, UpdateEvenmanInitiativeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateEvenmanInitiative" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UpdateCommunityInitiativeInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "updateCommunityInitiative" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanInitiative" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" } }] } }] } }, ...EvenmanInitiativeFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions] });

export const DeleteEvenmanInitiativeDocument: DocumentNode<DeleteEvenmanInitiativeMutation, DeleteEvenmanInitiativeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteEvenmanInitiative" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deleteCommunityInitiative" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "BasicResult" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }] } }] } }] } }] });

export const AddLeadToCommunityInitiativeDocument: DocumentNode<AddLeadToCommunityInitiativeMutation, AddLeadToCommunityInitiativeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AddLeadToCommunityInitiative" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "AddLeadToCommunityInitiativeInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "addLeadToCommunityInitiative" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanInitiative" } }] } }] } }, ...EvenmanInitiativeFragmentDoc.definitions] });

export const RemoveLeadFromCommunityInitiativeDocument: DocumentNode<RemoveLeadFromCommunityInitiativeMutation, RemoveLeadFromCommunityInitiativeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RemoveLeadFromCommunityInitiative" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RemoveLeadFromCommunityInitiativeInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "removeLeadFromCommunityInitiative" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanInitiative" } }] } }] } }, ...EvenmanInitiativeFragmentDoc.definitions] });

export const CommentOnCommunityInitiativeDocument: DocumentNode<CommentOnCommunityInitiativeMutation, CommentOnCommunityInitiativeMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CommentOnCommunityInitiative" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CommentOnCommunityInitiativeInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "commentOnCommunityInitiative" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanInitiative" } }] } }] } }, ...EvenmanInitiativeFragmentDoc.definitions] });
