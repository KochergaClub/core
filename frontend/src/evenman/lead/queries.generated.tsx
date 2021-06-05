import * as Types from '../../apollo/types.generated';

import { UserFragment } from '../../components/UserLink/fragments.generated';
import { Commentable_CommunityInitiative_Fragment, Commentable_CommunityLead_Fragment } from './CommentsList/queries.generated';
import { GenericErrorFragment, ValidationErrorFragment } from '../../apollo/common-fragments.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { UserFragmentDoc } from '../../components/UserLink/fragments.generated';
import { CommentableFragmentDoc } from './CommentsList/queries.generated';
import { GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../../apollo/common-fragments.generated';
export type EvenmanLeadFragment = (
  { __typename: 'CommunityLead' }
  & Pick<Types.CommunityLead, 'id' | 'created' | 'updated' | 'name' | 'description' | 'status'>
  & { created_by?: Types.Maybe<(
    { __typename: 'AuthUser' }
    & UserFragment
  )>, curated_by?: Types.Maybe<(
    { __typename: 'AuthUser' }
    & UserFragment
  )>, events: Array<(
    { __typename: 'Event' }
    & Pick<Types.Event, 'id' | 'title' | 'start' | 'published'>
  )>, initiatives: Array<(
    { __typename: 'CommunityInitiative' }
    & Pick<Types.CommunityInitiative, 'id' | 'title'>
  )> }
  & Commentable_CommunityLead_Fragment
);

export type EvenmanLeadsQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  filter?: Types.Maybe<Types.CommunityLeadsFilterInput>;
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

export type EvenmanLeadDetailsQueryVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type EvenmanLeadDetailsQuery = (
  { __typename: 'Query' }
  & { communityLead: (
    { __typename: 'CommunityLead' }
    & EvenmanLeadFragment
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

export type BecomeEvenmanLeadCuratorMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type BecomeEvenmanLeadCuratorMutation = (
  { __typename: 'Mutation' }
  & { becomeCommunityLeadCurator: (
    { __typename: 'CommunityLead' }
    & EvenmanLeadFragment
  ) }
);

export type ClearEvenmanLeadCuratorMutationVariables = Types.Exact<{
  id: Types.Scalars['ID'];
}>;


export type ClearEvenmanLeadCuratorMutation = (
  { __typename: 'Mutation' }
  & { clearCommunityLeadCurator: (
    { __typename: 'CommunityLead' }
    & EvenmanLeadFragment
  ) }
);

export type CommentOnCommunityLeadMutationVariables = Types.Exact<{
  input: Types.CommentOnCommunityLeadInput;
}>;


export type CommentOnCommunityLeadMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'CommunityLead' }
    & EvenmanLeadFragment
  ) }
);

export type AddEventToCommunityLeadMutationVariables = Types.Exact<{
  input: Types.AddEventToCommunityLeadInput;
}>;


export type AddEventToCommunityLeadMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'CommunityLead' }
    & EvenmanLeadFragment
  ) }
);

export type RemoveEventFromCommunityLeadMutationVariables = Types.Exact<{
  input: Types.RemoveEventFromCommunityLeadInput;
}>;


export type RemoveEventFromCommunityLeadMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'CommunityLead' }
    & EvenmanLeadFragment
  ) }
);

export const EvenmanLeadFragmentDoc: DocumentNode<EvenmanLeadFragment, unknown> = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"EvenmanLead"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"CommunityLead"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"created"}},{"kind":"Field","name":{"kind":"Name","value":"updated"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"created_by"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}},{"kind":"Field","name":{"kind":"Name","value":"curated_by"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"User"}}]}},{"kind":"Field","name":{"kind":"Name","value":"events"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"start"}},{"kind":"Field","name":{"kind":"Name","value":"published"}}]}},{"kind":"Field","name":{"kind":"Name","value":"initiatives"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}}]}},{"kind":"FragmentSpread","name":{"kind":"Name","value":"Commentable"}}]}},...UserFragmentDoc.definitions,...CommentableFragmentDoc.definitions]};
export const EvenmanLeadsDocument: DocumentNode<EvenmanLeadsQuery, EvenmanLeadsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanLeads" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } } }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "filter" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CommunityLeadsFilterInput" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "communityLeads" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "filter" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "filter" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "hasNextPage" } }, { "kind": "Field", "name": { "kind": "Name", "value": "hasPreviousPage" } }, { "kind": "Field", "name": { "kind": "Name", "value": "startCursor" } }, { "kind": "Field", "name": { "kind": "Name", "value": "endCursor" } }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanLead" } }] } }] } }] } }] } }, ...EvenmanLeadFragmentDoc.definitions] });

export const EvenmanLeadDetailsDocument: DocumentNode<EvenmanLeadDetailsQuery, EvenmanLeadDetailsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "EvenmanLeadDetails" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "communityLead" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanLead" } }] } }] } }, ...EvenmanLeadFragmentDoc.definitions] });

export const CreateEvenmanLeadDocument: DocumentNode<CreateEvenmanLeadMutation, CreateEvenmanLeadMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateEvenmanLead" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateCommunityLeadInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "createCommunityLead" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanLead" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" } }] } }] } }, ...EvenmanLeadFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions] });

export const UpdateEvenmanLeadDocument: DocumentNode<UpdateEvenmanLeadMutation, UpdateEvenmanLeadMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateEvenmanLead" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UpdateCommunityLeadInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "updateCommunityLead" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanLead" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" } }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" } }] } }] } }, ...EvenmanLeadFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions] });

export const DeleteEvenmanLeadDocument: DocumentNode<DeleteEvenmanLeadMutation, DeleteEvenmanLeadMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteEvenmanLead" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "deleteCommunityLead" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "InlineFragment", "typeCondition": { "kind": "NamedType", "name": { "kind": "Name", "value": "BasicResult" } }, "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" } }] } }] } }] } }] });

export const BecomeEvenmanLeadCuratorDocument: DocumentNode<BecomeEvenmanLeadCuratorMutation, BecomeEvenmanLeadCuratorMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "BecomeEvenmanLeadCurator" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "becomeCommunityLeadCurator" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanLead" } }] } }] } }, ...EvenmanLeadFragmentDoc.definitions] });

export const ClearEvenmanLeadCuratorDocument: DocumentNode<ClearEvenmanLeadCuratorMutation, ClearEvenmanLeadCuratorMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "ClearEvenmanLeadCurator" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "ID" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "clearCommunityLeadCurator" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "id" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "id" } } }] } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanLead" } }] } }] } }, ...EvenmanLeadFragmentDoc.definitions] });

export const CommentOnCommunityLeadDocument: DocumentNode<CommentOnCommunityLeadMutation, CommentOnCommunityLeadMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CommentOnCommunityLead" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CommentOnCommunityLeadInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "commentOnCommunityLead" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanLead" } }] } }] } }, ...EvenmanLeadFragmentDoc.definitions] });

export const AddEventToCommunityLeadDocument: DocumentNode<AddEventToCommunityLeadMutation, AddEventToCommunityLeadMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "AddEventToCommunityLead" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "AddEventToCommunityLeadInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "addEventToCommunityLead" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanLead" } }] } }] } }, ...EvenmanLeadFragmentDoc.definitions] });

export const RemoveEventFromCommunityLeadDocument: DocumentNode<RemoveEventFromCommunityLeadMutation, RemoveEventFromCommunityLeadMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "RemoveEventFromCommunityLead" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "RemoveEventFromCommunityLeadInput" } } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "removeEventFromCommunityLead" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "EvenmanLead" } }] } }] } }, ...EvenmanLeadFragmentDoc.definitions] });
