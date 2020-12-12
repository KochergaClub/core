import * as Types from '../../../apollo/types.generated';

import { PageInfoFragment, GenericErrorFragment, ValidationErrorFragment } from '../../../apollo/common-fragments.generated';
import { RatioTraining_SummaryFragment, RatioTrainingFragment, RatioPromocodeConnectionFragment } from '../../queries.generated';
import { dedupeFragments } from '~/common/dedupeFragments';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import { PageInfoFragmentDoc, GenericErrorFragmentDoc, ValidationErrorFragmentDoc } from '../../../apollo/common-fragments.generated';
import { RatioTraining_SummaryFragmentDoc, RatioTrainingFragmentDoc, RatioPromocodeConnectionFragmentDoc } from '../../queries.generated';
export type RatioTrainingsQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  eternal?: Types.Maybe<Types.Scalars['Boolean']>;
}>;


export type RatioTrainingsQuery = (
  { __typename: 'Query' }
  & { trainings: (
    { __typename: 'RatioTrainingConnection' }
    & { pageInfo: (
      { __typename: 'PageInfo' }
      & PageInfoFragment
    ), edges: Array<(
      { __typename: 'RatioTrainingEdge' }
      & { node: (
        { __typename: 'RatioTraining' }
        & RatioTraining_SummaryFragment
      ) }
    )> }
  ) }
);

export type RatioTrainingBySlugQueryVariables = Types.Exact<{
  slug: Types.Scalars['String'];
}>;


export type RatioTrainingBySlugQuery = (
  { __typename: 'Query' }
  & { training: (
    { __typename: 'RatioTraining' }
    & RatioTrainingFragment
  ) }
);

export type CreateRatioTrainingMutationVariables = Types.Exact<{
  input: Types.CreateRatioTrainingInput;
}>;


export type CreateRatioTrainingMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'RatioTraining' }
    & RatioTrainingFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);

export type DeleteRatioTrainingMutationVariables = Types.Exact<{
  slug: Types.Scalars['String'];
}>;


export type DeleteRatioTrainingMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'BasicResult' }
    & Pick<Types.BasicResult, 'ok'>
  ) }
);

export type RatioTrainingPromocodesPageQueryVariables = Types.Exact<{
  before?: Types.Maybe<Types.Scalars['String']>;
  after?: Types.Maybe<Types.Scalars['String']>;
  first?: Types.Maybe<Types.Scalars['Int']>;
  last?: Types.Maybe<Types.Scalars['Int']>;
  slug: Types.Scalars['String'];
}>;


export type RatioTrainingPromocodesPageQuery = (
  { __typename: 'Query' }
  & { training: (
    { __typename: 'RatioTraining' }
    & Pick<Types.RatioTraining, 'id'>
    & { promocodes: (
      { __typename: 'RatioPromocodeConnection' }
      & RatioPromocodeConnectionFragment
    ) }
  ) }
);

export type UpdateRatioTrainingMutationVariables = Types.Exact<{
  input: Types.UpdateRatioTrainingInput;
}>;


export type UpdateRatioTrainingMutation = (
  { __typename: 'Mutation' }
  & { result: (
    { __typename: 'RatioTraining' }
    & RatioTrainingFragment
  ) | (
    { __typename: 'ValidationError' }
    & ValidationErrorFragment
  ) | (
    { __typename: 'GenericError' }
    & GenericErrorFragment
  ) }
);


export const RatioTrainingsDocument: DocumentNode<RatioTrainingsQuery, RatioTrainingsQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTrainings" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "eternal" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Boolean" } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "trainings" }, "name": { "kind": "Name", "value": "ratioTrainings" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "filter" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "eternal" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "eternal" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "pageInfo" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "PageInfo" }, "directives": [] }] } }, { "kind": "Field", "name": { "kind": "Name", "value": "edges" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "node" }, "arguments": [], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTraining_Summary" }, "directives": [] }] } }] } }] } }] } }, ...PageInfoFragmentDoc.definitions, ...RatioTraining_SummaryFragmentDoc.definitions] });

export const RatioTrainingBySlugDocument: DocumentNode<RatioTrainingBySlugQuery, RatioTrainingBySlugQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTrainingBySlug" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "training" }, "name": { "kind": "Name", "value": "ratioTrainingBySlug" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "slug" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTraining" }, "directives": [] }] } }] } }, ...RatioTrainingFragmentDoc.definitions] });

export const CreateRatioTrainingDocument: DocumentNode<CreateRatioTrainingMutation, CreateRatioTrainingMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "CreateRatioTraining" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "CreateRatioTrainingInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "createRatioTraining" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTraining" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" }, "directives": [] }] } }] } }, ...RatioTrainingFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions] });

export const DeleteRatioTrainingDocument: DocumentNode<DeleteRatioTrainingMutation, DeleteRatioTrainingMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "DeleteRatioTraining" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "ratioDeleteTraining" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "ObjectValue", "fields": [{ "kind": "ObjectField", "name": { "kind": "Name", "value": "slug" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } } }] } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "ok" }, "arguments": [], "directives": [] }] } }] } }] });

export const RatioTrainingPromocodesPageDocument: DocumentNode<RatioTrainingPromocodesPageQuery, RatioTrainingPromocodesPageQueryVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "query", "name": { "kind": "Name", "value": "RatioTrainingPromocodesPage" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } }, "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "Int" } }, "directives": [] }, { "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "String" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "training" }, "name": { "kind": "Name", "value": "ratioTrainingBySlug" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "slug" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "slug" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "name": { "kind": "Name", "value": "id" }, "arguments": [], "directives": [] }, { "kind": "Field", "name": { "kind": "Name", "value": "promocodes" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "before" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "before" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "after" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "after" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "first" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "first" } } }, { "kind": "Argument", "name": { "kind": "Name", "value": "last" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "last" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioPromocodeConnection" }, "directives": [] }] } }] } }] } }, ...RatioPromocodeConnectionFragmentDoc.definitions] });

export const UpdateRatioTrainingDocument: DocumentNode<UpdateRatioTrainingMutation, UpdateRatioTrainingMutationVariables> = dedupeFragments({ "kind": "Document", "definitions": [{ "kind": "OperationDefinition", "operation": "mutation", "name": { "kind": "Name", "value": "UpdateRatioTraining" }, "variableDefinitions": [{ "kind": "VariableDefinition", "variable": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } }, "type": { "kind": "NonNullType", "type": { "kind": "NamedType", "name": { "kind": "Name", "value": "UpdateRatioTrainingInput" } } }, "directives": [] }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "Field", "alias": { "kind": "Name", "value": "result" }, "name": { "kind": "Name", "value": "updateRatioTraining" }, "arguments": [{ "kind": "Argument", "name": { "kind": "Name", "value": "input" }, "value": { "kind": "Variable", "name": { "kind": "Name", "value": "input" } } }], "directives": [], "selectionSet": { "kind": "SelectionSet", "selections": [{ "kind": "FragmentSpread", "name": { "kind": "Name", "value": "RatioTraining" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "GenericError" }, "directives": [] }, { "kind": "FragmentSpread", "name": { "kind": "Name", "value": "ValidationError" }, "directives": [] }] } }] } }, ...RatioTrainingFragmentDoc.definitions, ...GenericErrorFragmentDoc.definitions, ...ValidationErrorFragmentDoc.definitions] });
